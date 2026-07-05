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

function fileExists(path: string) {
  try {
    statSync(path)
    return true
  } catch {
    return false
  }
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
    expect(bridgeCss).toContain('.admin-ui-drawer .el-drawer__header')
    expect(bridgeCss).toContain('margin-bottom: 0;')
  })

  it('documents Element Plus as a complex-control base instead of a page-level style system', () => {
    const guide = readProjectFile('frontend/docs/admin-design-system-guide.md')

    expect(guide).toContain('Element Plus')
    expect(guide).toContain('Element Plus 优先')
    expect(guide).toContain('复杂控件底座')
    expect(guide).toContain('不得在管理端页面中直接散用')
  })

  it('keeps Element Plus usage behind admin-ui adapters', () => {
    expect(fileExists(`${repoRoot}/frontend/src/components/admin-ui/index.ts`)).toBe(true)

    const guide = readProjectFile('frontend/docs/admin-design-system-guide.md')
    const adminUiIndex = readProjectFile('frontend/src/components/admin-ui/index.ts')

    expect(guide).toContain('frontend/src/components/admin-ui')
    expect(guide).toContain('自研只做业务封装和必要适配')
    expect(guide).toContain('AdminTree')
    expect(guide).toContain('DetailSheet` 属于业务抽屉封装，底层使用 `AdminDrawer`')
    expect(adminUiIndex).toContain('AdminDrawer')
    expect(adminUiIndex).toContain('AdminTree')
  })

  it('keeps admin pages behind local component and business wrappers', () => {
    const adminPageFiles = collectVueFiles(`${frontendSrcRoot}/pages/admin`)
    const directImports = adminPageFiles.filter((filePath) => {
      return /from ['"]element-plus['"]/.test(readFileSync(filePath, 'utf8'))
    })

    expect(directImports).toEqual([])
  })

  it('migrates the first training filter batch to admin-ui controls', () => {
    const firstBatchPages = [
      'frontend/src/pages/admin/training/TrainingApplicationPage.vue',
      'frontend/src/pages/admin/training/TrainingDemandPage.vue',
      'frontend/src/pages/admin/training/TrainingPlanPage.vue',
      'frontend/src/pages/admin/training/TrainingRecordPage.vue',
      'frontend/src/pages/admin/training/TrainingResourcePage.vue',
      'frontend/src/pages/admin/virtual-lab/VirtualLabRoomPage.vue',
    ]

    for (const page of firstBatchPages) {
      const source = readProjectFile(page)

      expect(source).toContain('@/components/admin-ui')
      expect(source).not.toMatch(/<select[\s>]/)
      expect(source).not.toMatch(/<input[\s>]/)
      expect(source).not.toMatch(/<textarea[\s>]/)
    }
  })

  it('migrates the second admin filter batch to admin-ui controls', () => {
    const secondBatchPages = [
      'frontend/src/pages/admin/ability-profile/AbilityProfileTeacherPage.vue',
      'frontend/src/pages/admin/archive/ArchiveQueryPage.vue',
      'frontend/src/pages/admin/practice/PracticeApplicationPage.vue',
      'frontend/src/pages/admin/practice/PracticeRecordPage.vue',
      'frontend/src/pages/admin/practice/PracticeTrackingPage.vue',
      'frontend/src/pages/admin/reflection/ReflectionOverviewPage.vue',
      'frontend/src/pages/admin/reports/ReportCenterPage.vue',
      'frontend/src/pages/admin/virtual-lab/VirtualLabRoomPage.vue',
    ]

    for (const page of secondBatchPages) {
      const source = readProjectFile(page)

      expect(source).toContain('@/components/admin-ui')
      expect(source).not.toMatch(/<select[\s>]/)
      expect(source).not.toMatch(/<input[\s>]/)
      expect(source).not.toMatch(/<textarea[\s>]/)
    }
  })

  it('migrates manual pagination surfaces to the admin pagination adapter', () => {
    const paginationPages = [
      'frontend/src/pages/admin/ability-profile/AbilityProfileTeacherPage.vue',
      'frontend/src/pages/admin/practice/PracticeApplicationPage.vue',
      'frontend/src/pages/admin/training/TrainingApplicationPage.vue',
      'frontend/src/pages/admin/training/TrainingRecordPage.vue',
      'frontend/src/pages/admin/training/TrainingResourcePage.vue',
      'frontend/src/pages/admin/virtual-lab/VirtualLabRoomDetailPage.vue',
    ]

    for (const page of paginationPages) {
      const source = readProjectFile(page)

      expect(source).toContain('AdminPagination')
      expect(source).not.toContain('page-button')
      expect(source).not.toContain('.page-size')
      expect(source).not.toContain('class="page-size')
      expect(source).not.toContain('page-input')
    }
  })

  it('migrates archive upload selection to the admin upload adapter', () => {
    const source = readProjectFile('frontend/src/pages/admin/archive/ArchiveImportUploadPage.vue')

    expect(source).toContain('AdminUpload')
    expect(source).not.toMatch(/<input[\s>]/)
    expect(source).not.toContain('type="file"')
  })

  it('migrates archive processing search and record list to admin-ui adapters', () => {
    const source = readProjectFile('frontend/src/pages/admin/archive/ArchiveProcessingPage.vue')

    expect(source).toContain('AdminInput')
    expect(source).toContain('AdminTable')
    expect(source).toContain('AdminTableColumn')
    expect(source).not.toMatch(/<input[\s>]/)
    expect(source).not.toMatch(/<table[\s>]/)
  })

  it('migrates first table pages to the admin table adapter', () => {
    const tablePages = [
      'frontend/src/pages/admin/ability-profile/AbilityProfileGroupPage.vue',
      'frontend/src/pages/admin/ability-profile/AbilityProfileTeacherDetailPage.vue',
      'frontend/src/pages/admin/archive/ArchiveProcessingPage.vue',
      'frontend/src/pages/admin/practice/PracticeApplicationPage.vue',
      'frontend/src/pages/admin/practice/PracticeRecordPage.vue',
      'frontend/src/pages/admin/practice/PracticeTrackingPage.vue',
      'frontend/src/pages/admin/reflection/ReflectionOverviewPage.vue',
      'frontend/src/pages/admin/training/TrainingApplicationPage.vue',
      'frontend/src/pages/admin/training/TrainingDemandPage.vue',
      'frontend/src/pages/admin/training/TrainingPlanPage.vue',
      'frontend/src/pages/admin/training/TrainingRecordPage.vue',
      'frontend/src/pages/admin/training/TrainingResourcePage.vue',
    ]

    for (const page of tablePages) {
      const source = readProjectFile(page)

      expect(source).toContain('AdminTable')
      expect(source).toContain('AdminTableColumn')
      expect(source).not.toMatch(/<table[\s>]/)
    }
  })
})
