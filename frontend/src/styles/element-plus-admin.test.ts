import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const frontendSrcRoot = fileURLToPath(new URL('..', import.meta.url))
const repoRoot = fileURLToPath(new URL('../../..', import.meta.url))

function readProjectFile(path: string) {
  return readFileSync(`${repoRoot}/${path}`, 'utf8')
}

function collectVueFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const filePath = `${dir}/${name}`
    if (statSync(filePath).isDirectory()) return collectVueFiles(filePath)
    return filePath.endsWith('.vue') ? [filePath] : []
  })
}

describe('Element Plus admin integration', () => {
  it('installs Element Plus and loads its styles through the app entry', () => {
    const packageJson = JSON.parse(readProjectFile('frontend/package.json'))
    const mainTs = readProjectFile('frontend/src/main.ts')

    expect(packageJson.dependencies).toHaveProperty('element-plus')
    expect(mainTs).toContain("import 'element-plus/dist/index.css'")
    expect(mainTs).toContain("import './styles/element-plus-admin.css'")
    expect(mainTs).not.toContain("import ElementPlus from 'element-plus'")
    expect(mainTs).not.toContain('.use(ElementPlus)')
  })

  it('bridges Element Plus theme variables to admin design tokens', () => {
    const bridgeCss = readProjectFile('frontend/src/styles/element-plus-admin.css')

    expect(bridgeCss).toContain('--el-color-primary: var(--color-admin-primary);')
    expect(bridgeCss).toContain('--el-border-color: var(--color-admin-border);')
    expect(bridgeCss).toContain('--el-border-radius-base: var(--radius-admin-panel);')
  })

  it('documents Element Plus as a complex-control base instead of a page-level style system', () => {
    const guide = readProjectFile('frontend/docs/admin-design-system-guide.md')

    expect(guide).toContain('Element Plus')
    expect(guide).toContain('复杂控件底座')
    expect(guide).toContain('不得在管理端页面中直接散用')
  })

  it('keeps admin pages behind local component and business wrappers', () => {
    const adminPageFiles = collectVueFiles(`${frontendSrcRoot}/pages/admin`)
    const directImports = adminPageFiles.filter((filePath) => {
      return /from ['"]element-plus['"]/.test(readFileSync(filePath, 'utf8'))
    })

    expect(directImports).toEqual([])
  })
})
