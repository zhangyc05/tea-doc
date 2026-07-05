import { readdirSync, readFileSync, statSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const frontendRoot = resolve(new URL('..', import.meta.url).pathname)
const adminPagesRoot = resolve(frontendRoot, 'src/pages/admin')
const componentsRoot = resolve(frontendRoot, 'src/components')

const patterns = [
  { key: 'native-select', pattern: /<select[\s>]/g },
  { key: 'native-input', pattern: /<input[\s>]/g },
  { key: 'native-textarea', pattern: /<textarea[\s>]/g },
  { key: 'native-table', pattern: /<table[\s>]/g },
  { key: 'native-dialog', pattern: /<dialog[\s>]/g },
  { key: 'custom-drawer', pattern: /(?:drawer|sheet)/gi },
  { key: 'manual-pagination', pattern: /(?:page-button|page-input|上一页|下一页)/gi },
  { key: 'file-upload', pattern: /type=["']file["']/g },
  { key: 'tree-control', pattern: /(?:tree|expanded|node-key|defaultExpandedKeys)/g },
]

function collectVueFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const filePath = resolve(dir, name)
    if (statSync(filePath).isDirectory()) return collectVueFiles(filePath)
    return filePath.endsWith('.vue') ? [filePath] : []
  })
}

function auditFile(filePath) {
  const content = readFileSync(filePath, 'utf8')
  const matches = patterns.flatMap(({ key, pattern }) => {
    const count = Array.from(content.matchAll(pattern)).length
    return count > 0 ? [{ key, count }] : []
  })

  return {
    file: relative(frontendRoot, filePath),
    matches,
  }
}

const results = [...collectVueFiles(adminPagesRoot), ...collectVueFiles(componentsRoot)]
  .map(auditFile)
  .filter((result) => result.matches.length > 0)

for (const result of results) {
  const summary = result.matches.map((match) => `${match.key}:${match.count}`).join(', ')
  console.log(`${result.file} | ${summary}`)
}
