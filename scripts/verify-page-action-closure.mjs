#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(scriptDir, '..')

const defaultRoots = [
  'frontend/src/pages',
  'teacher-mobile/src/pages',
]

export function analyzeVueFileContent(filePath, content) {
  const handlers = collectHandlers(content)
  const findings = []
  const lines = content.split(/\r?\n/)

  lines.forEach((line, index) => {
    const lineNumber = index + 1
    collectClickBindings(line).forEach((binding) => {
      const handler = normalizeHandlerName(binding.expression)
      const body = handler ? handlers.get(handler) : ''
      const defined = Boolean(handler && handlers.has(handler))
      const classification = classifyAction(binding.expression, body)
      const severity = getSeverity({ defined, classification, expression: binding.expression })
      findings.push({
        filePath,
        line: lineNumber,
        marker: binding.marker,
        handler,
        expression: binding.expression,
        classification,
        severity,
        reason: getReason({ defined, classification, expression: binding.expression }),
      })
    })

    if (/\bhref=["']#["']/.test(line)) {
      findings.push({
        filePath,
        line: lineNumber,
        marker: 'href="#"',
        handler: '',
        expression: '#',
        classification: 'empty',
        severity: 'critical',
        reason: 'placeholder href',
      })
    }
  })

  return findings
}

export function scanRoots(roots = defaultRoots, rootDir = process.cwd()) {
  return roots.flatMap((root) => {
    const absoluteRoot = join(rootDir, root)
    if (!existsSync(absoluteRoot)) return []
    return listVueFiles(absoluteRoot).flatMap((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return analyzeVueFileContent(relative(rootDir, filePath), content)
    })
  })
}

export function summarizeFindings(findings) {
  const summary = {
    total: findings.length,
    critical: findings.filter(item => item.severity === 'critical').length,
    warning: findings.filter(item => item.severity === 'warning').length,
    navigation: findings.filter(item => item.classification === 'navigation').length,
    state: findings.filter(item => item.classification === 'state').length,
    downgrade: findings.filter(item => item.classification === 'downgrade').length,
  }
  return summary
}

function collectHandlers(content) {
  const handlers = new Map()
  const patterns = [
    /function\s+([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{/g,
    /const\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>\s*\{/g,
  ]

  patterns.forEach((pattern) => {
    let match
    while ((match = pattern.exec(content)) !== null) {
      handlers.set(match[1], readBlock(content, pattern.lastIndex - 1))
    }
  })

  return handlers
}

function readBlock(content, openBraceIndex) {
  let depth = 0
  for (let index = openBraceIndex; index < content.length; index += 1) {
    const char = content[index]
    if (char === '{') depth += 1
    if (char === '}') {
      depth -= 1
      if (depth === 0) return content.slice(openBraceIndex + 1, index)
    }
  }
  return ''
}

function collectClickBindings(line) {
  const bindings = []
  const regex = /(@(?:click|tap)|v-on:(?:click|tap))\s*=\s*["']([^"']+)["']/g
  let match
  while ((match = regex.exec(line)) !== null) {
    bindings.push({ marker: match[1], expression: match[2].trim() })
  }
  return bindings
}

function normalizeHandlerName(expression) {
  const direct = expression.match(/^([A-Za-z_$][\w$]*)$/)
  if (direct) return direct[1]
  const call = expression.match(/^([A-Za-z_$][\w$]*)\s*\(/)
  if (call) return call[1]
  return ''
}

function classifyAction(expression, body) {
  const text = `${expression}\n${body}`
  if (/(router\.push|router\.replace|navigateTo|redirectTo|switchTab|reLaunch|RouterLink|window\.location)/.test(text)) {
    return 'navigation'
  }
  if (/(showModal|showToast|operationMessage\.set|暂未|降级|mock|本地模拟|不生成真实|暂不)/.test(text)) {
    return 'downgrade'
  }
  if (/(=|\+\+|--|\.push\(|\.unshift\(|\.splice\(|\.set\(|\.delete\(|Store|store|State|state|create[A-Z]|update[A-Z]|reset[A-Z]|confirm[A-Z]|submit[A-Z]|save[A-Z]|add[A-Z]|remove[A-Z]|fail[A-Z]|complete[A-Z])/.test(text)) {
    return 'state'
  }
  if (/console\.log/.test(text) || text.trim() === '') {
    return 'empty'
  }
  return 'unknown'
}

function getSeverity({ defined, classification, expression }) {
  if (!expression || expression === '#') return 'critical'
  if (!defined && /^[A-Za-z_$][\w$]*(?:\(|$)/.test(expression)) return 'critical'
  if (classification === 'empty') return 'critical'
  if (classification === 'unknown') return 'warning'
  if (classification === 'downgrade') return 'warning'
  return 'ok'
}

function getReason({ defined, classification, expression }) {
  if (!expression || expression === '#') return 'empty binding'
  if (!defined && /^[A-Za-z_$][\w$]*(?:\(|$)/.test(expression)) return 'handler not defined in file'
  if (classification === 'empty') return 'console-only or empty handler'
  if (classification === 'unknown') return 'handler needs manual classification'
  if (classification === 'downgrade') return 'explicit downgrade or toast/modal feedback'
  return classification
}

function listVueFiles(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name)
    if (entry.isDirectory()) return listVueFiles(path)
    return extname(entry.name) === '.vue' ? [path] : []
  })
}

function printReport(findings) {
  const summary = summarizeFindings(findings)
  console.log(`Page action closure scan: ${summary.total} actions, ${summary.critical} critical, ${summary.warning} warning`)
  findings
    .filter(item => item.severity === 'critical' || item.severity === 'warning')
    .slice(0, 120)
    .forEach((item) => {
      console.log(`${item.severity.toUpperCase()} ${item.filePath}:${item.line} ${item.reason} (${item.expression})`)
    })
  if (summary.critical + summary.warning > 120) {
    console.log(`... ${summary.critical + summary.warning - 120} more findings omitted`)
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const roots = process.argv.slice(2)
  const findings = scanRoots(roots.length > 0 ? roots : defaultRoots, repoRoot)
  printReport(findings)
  process.exitCode = summarizeFindings(findings).critical > 0 ? 1 : 0
}
