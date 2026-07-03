import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const pagesJson = JSON.parse(readFileSync(resolve(root, 'src/pages.json'), 'utf8'))
const route = 'pages/archive/record-detail/index'
const categoryRoute = 'pages/archive/category/index'
const basicInfoDetailRoute = 'pages/archive/basic-info-detail/index'
const recordListRoute = 'pages/archive/record-list/index'
const draftListRoute = 'pages/archive/draft-list/index'
const developmentPlanEditRoute = 'pages/archive/development-plan-edit/index'
const correctionApplyRoute = 'pages/archive/correction/apply/index'
const correctionSubmittedRoute = 'pages/archive/correction/submitted/index'
const correctionProgressRoute = 'pages/archive/correction/progress/index'
const correctionResultRoute = 'pages/archive/correction/result/index'
const correctionSupplementRoute = 'pages/archive/correction/supplement/index'
const pageFile = resolve(root, 'src/pages/archive/record-detail/index.vue')
const categoryPageFile = resolve(root, 'src/pages/archive/category/index.vue')
const basicInfoDetailPageFile = resolve(root, 'src/pages/archive/basic-info-detail/index.vue')
const recordListPageFile = resolve(root, 'src/pages/archive/record-list/index.vue')
const draftListPageFile = resolve(root, 'src/pages/archive/draft-list/index.vue')
const developmentPlanEditPageFile = resolve(root, 'src/pages/archive/development-plan-edit/index.vue')
const correctionApplyPageFile = resolve(root, 'src/pages/archive/correction/apply/index.vue')
const correctionSubmittedPageFile = resolve(root, 'src/pages/archive/correction/submitted/index.vue')
const correctionProgressPageFile = resolve(root, 'src/pages/archive/correction/progress/index.vue')
const correctionResultPageFile = resolve(root, 'src/pages/archive/correction/result/index.vue')
const correctionSupplementPageFile = resolve(root, 'src/pages/archive/correction/supplement/index.vue')
const archiveIndexFile = resolve(root, 'src/pages/archive/index.vue')
const queryFile = resolve(root, 'src/pages/archive/record-query/index.vue')
const profileFile = resolve(root, 'src/pages/profile/index.vue')
const archiveDomainFile = resolve(root, 'src/domain/archive.ts')
const successFile = resolve(root, 'src/pages/todo/certificate-archive-success/index.vue')
const trainingArchiveResultFile = resolve(root, 'src/pages/activity/training-archive-result/index.vue')
const enterpriseArchiveSuccessFile = resolve(root, 'src/pages/activity/enterprise-archive-success/index.vue')
const virtualArchiveResultFile = resolve(root, 'src/pages/activity/virtual-research-archive-result/index.vue')
const virtualArchiveResultV1File = resolve(root, 'src/pages/activity/virtual-research-archive-result-v1/index.vue')
const docsLedgerFile = resolve(root, '../docs/page-coverage-ledger.md')

const failures = []

if (!pagesJson.pages.some((page) => page.path === route)) {
  failures.push(`${route} is not registered in src/pages.json`)
}

if (!pagesJson.pages.some((page) => page.path === categoryRoute)) {
  failures.push(`${categoryRoute} is not registered in src/pages.json`)
}

if (!pagesJson.pages.some((page) => page.path === basicInfoDetailRoute)) {
  failures.push(`${basicInfoDetailRoute} is not registered in src/pages.json`)
}

if (!pagesJson.pages.some((page) => page.path === recordListRoute)) {
  failures.push(`${recordListRoute} is not registered in src/pages.json`)
}

if (!pagesJson.pages.some((page) => page.path === draftListRoute)) {
  failures.push(`${draftListRoute} is not registered in src/pages.json`)
}

if (!pagesJson.pages.some((page) => page.path === developmentPlanEditRoute)) {
  failures.push(`${developmentPlanEditRoute} is not registered in src/pages.json`)
}

if (!pagesJson.pages.some((page) => page.path === correctionApplyRoute)) {
  failures.push(`${correctionApplyRoute} is not registered in src/pages.json`)
}

if (!pagesJson.pages.some((page) => page.path === correctionSubmittedRoute)) {
  failures.push(`${correctionSubmittedRoute} is not registered in src/pages.json`)
}

if (!pagesJson.pages.some((page) => page.path === correctionProgressRoute)) {
  failures.push(`${correctionProgressRoute} is not registered in src/pages.json`)
}

if (!pagesJson.pages.some((page) => page.path === correctionResultRoute)) {
  failures.push(`${correctionResultRoute} is not registered in src/pages.json`)
}

if (!pagesJson.pages.some((page) => page.path === correctionSupplementRoute)) {
  failures.push(`${correctionSupplementRoute} is not registered in src/pages.json`)
}

if (!existsSync(pageFile)) {
  failures.push(`${route}.vue does not exist`)
}

if (!existsSync(categoryPageFile)) {
  failures.push(`${categoryRoute}.vue does not exist`)
}

if (!existsSync(basicInfoDetailPageFile)) {
  failures.push(`${basicInfoDetailRoute}.vue does not exist`)
}

if (!existsSync(recordListPageFile)) {
  failures.push(`${recordListRoute}.vue does not exist`)
}

if (!existsSync(draftListPageFile)) {
  failures.push(`${draftListRoute}.vue does not exist`)
}

if (!existsSync(developmentPlanEditPageFile)) {
  failures.push(`${developmentPlanEditRoute}.vue does not exist`)
}

if (!existsSync(correctionApplyPageFile)) {
  failures.push(`${correctionApplyRoute}.vue does not exist`)
}

if (!existsSync(correctionSubmittedPageFile)) {
  failures.push(`${correctionSubmittedRoute}.vue does not exist`)
}

if (!existsSync(correctionProgressPageFile)) {
  failures.push(`${correctionProgressRoute}.vue does not exist`)
}

if (!existsSync(correctionResultPageFile)) {
  failures.push(`${correctionResultRoute}.vue does not exist`)
}

if (!existsSync(correctionSupplementPageFile)) {
  failures.push(`${correctionSupplementRoute}.vue does not exist`)
}

if (!existsSync(archiveDomainFile)) {
  failures.push('src/domain/archive.ts does not exist')
}

if (existsSync(archiveDomainFile)) {
  const archiveDomainSource = readFileSync(archiveDomainFile, 'utf8')
  if (!archiveDomainSource.includes('basic-info-teacher-profile')) {
    failures.push('archive domain does not include a basic information archive fact record')
  }

  if (!archiveDomainSource.includes('getPendingArchiveRecords')) {
    failures.push('archive domain does not expose pending archive records helper')
  }

  if (!archiveDomainSource.includes('ArchiveDevelopmentPlanDraft')) {
    failures.push('archive domain does not define development plan draft records')
  }

  if (!archiveDomainSource.includes('ArchiveCorrectionMaterialUploadStatus')) {
    failures.push('archive domain does not define correction supplement material upload status')
  }

  if (!archiveDomainSource.includes('getArchiveDraftRecords')) {
    failures.push('archive domain does not expose draft archive records helper')
  }

  if (!archiveDomainSource.includes('saveArchiveDevelopmentPlanDraft')) {
    failures.push('archive domain does not expose development plan draft save action')
  }

  if (!archiveDomainSource.includes('submitArchiveDevelopmentPlanDraft')) {
    failures.push('archive domain does not expose development plan draft submit action')
  }

  if (!archiveDomainSource.includes('uploadStatus')) {
    failures.push('archive domain does not write upload status for correction supplement materials')
  }

  if (!archiveDomainSource.includes('previewArchiveMaterial')) {
    failures.push('archive domain does not expose archive material preview action')
  }

  for (const field of ['status:', 'source:', 'fallback:']) {
    if (!archiveDomainSource.includes(field)) {
      failures.push(`archive domain material preview model missing ${field}`)
    }
  }

  if (!archiveDomainSource.includes('真实附件服务后续接入')) {
    failures.push('archive domain does not define material preview fallback copy')
  }

  if (!archiveDomainSource.includes("record.status === 'pending-verify'")) {
    failures.push('archive domain does not filter pending verification records')
  }
}

if (existsSync(pageFile)) {
  const detailSource = readFileSync(pageFile, 'utf8')
  if (!detailSource.includes('pending-verify')) {
    failures.push('archive record detail page does not support pending verification records')
  }

  if (!detailSource.includes('findArchiveRecordById')) {
    failures.push('archive record detail page does not read records from archive domain by recordId')
  }

  if (!detailSource.includes('previewArchiveMaterial')) {
    failures.push('archive record detail page does not expose material preview action')
  }

  if (!detailSource.includes('preview.status') || !detailSource.includes('preview.source') || !detailSource.includes('preview.fallback')) {
    failures.push('archive record detail page does not use unified material preview status/source/fallback fields')
  }

  if (!detailSource.includes('@tap=\"previewMaterial(material)\"')) {
    failures.push('archive record detail page material rows do not trigger preview action')
  }

  if (!detailSource.includes('/pages/archive/correction/apply/index')) {
    failures.push('archive record detail page does not navigate to correction apply page')
  }

  if (!detailSource.includes('recordId=')) {
    failures.push('archive record detail page does not pass recordId to correction apply page')
  }
}

if (existsSync(basicInfoDetailPageFile)) {
  const basicInfoDetailSource = readFileSync(basicInfoDetailPageFile, 'utf8')
  if (!basicInfoDetailSource.includes('previewArchiveMaterial')) {
    failures.push('basic info detail page does not expose material preview action')
  }

  if (!basicInfoDetailSource.includes('preview.status') || !basicInfoDetailSource.includes('preview.source') || !basicInfoDetailSource.includes('preview.fallback')) {
    failures.push('basic info detail page does not use unified material preview status/source/fallback fields')
  }

  if (!basicInfoDetailSource.includes('@tap=\"previewMaterial(material)\"')) {
    failures.push('basic info detail page material rows do not trigger preview action')
  }
}

const archiveIndexSource = readFileSync(archiveIndexFile, 'utf8')
if (!archiveIndexSource.includes('/pages/archive/category/index')) {
  failures.push('archive index page does not navigate to archive category')
}

if (!archiveIndexSource.includes('/pages/archive/draft-list/index')) {
  failures.push('archive index page does not navigate to archive draft-list')
}

if (!archiveIndexSource.includes('domain/archive')) {
  failures.push('archive index page does not read archive records from shared domain')
}

if (existsSync(categoryPageFile)) {
  const categorySource = readFileSync(categoryPageFile, 'utf8')
  if (!categorySource.includes('/pages/archive/basic-info-detail/index')) {
    failures.push('archive category page does not navigate basic-info records to basic-info detail')
  }

  if (!categorySource.includes('/pages/archive/record-list/index')) {
    failures.push('archive category page does not navigate to record-list')
  }

  if (!categorySource.includes('domain/archive')) {
    failures.push('archive category page does not read archive records from shared domain')
  }

  if (!categorySource.includes('isPersonalDevelopmentCategory')) {
    failures.push('archive category page does not explicitly handle personal-development category')
  }

  if (!categorySource.includes('/pages/archive/development-plan-edit/index')) {
    failures.push('archive personal-development category does not provide development plan edit entry')
  }
}

if (existsSync(basicInfoDetailPageFile)) {
  const basicInfoDetailSource = readFileSync(basicInfoDetailPageFile, 'utf8')
  if (!basicInfoDetailSource.includes('domain/archive')) {
    failures.push('archive basic-info detail page does not read archive records from shared domain')
  }

  if (!basicInfoDetailSource.includes('findArchiveRecordById')) {
    failures.push('archive basic-info detail page does not locate the basic information record by recordId')
  }

  if (!basicInfoDetailSource.includes('basic-info-teacher-profile')) {
    failures.push('archive basic-info detail page does not use the basic information archive fact record')
  }

  if (!basicInfoDetailSource.includes('previewArchiveMaterial')) {
    failures.push('archive basic-info detail page does not expose material preview action')
  }

  if (!basicInfoDetailSource.includes('@tap=\"previewMaterial(material)\"')) {
    failures.push('archive basic-info detail page material rows do not trigger preview action')
  }

  if (!basicInfoDetailSource.includes('/pages/archive/record-detail/index')) {
    failures.push('archive basic-info detail page does not provide source record detail entry')
  }

  if (!basicInfoDetailSource.includes('/pages/archive/correction/apply/index')) {
    failures.push('archive basic-info detail page does not provide correction entry')
  }

  if (!basicInfoDetailSource.includes('recordId=')) {
    failures.push('archive basic-info detail page does not preserve recordId in navigation')
  }
}

if (existsSync(recordListPageFile)) {
  const recordListSource = readFileSync(recordListPageFile, 'utf8')
  if (!recordListSource.includes('/pages/archive/record-detail/index')) {
    failures.push('archive record-list page does not navigate to record-detail')
  }

  if (!recordListSource.includes('domain/archive')) {
    failures.push('archive record-list page does not read archive records from shared domain')
  }

  if (!recordListSource.includes('recordId=')) {
    failures.push('archive record-list page does not navigate to detail by recordId')
  }
}

if (existsSync(draftListPageFile)) {
  const draftListSource = readFileSync(draftListPageFile, 'utf8')
  if (!draftListSource.includes('domain/archive')) {
    failures.push('archive draft-list page does not read archive records from shared domain')
  }

  if (!draftListSource.includes('getPendingArchiveRecords')) {
    failures.push('archive draft-list page does not use pending verification records helper')
  }

  if (!draftListSource.includes('getArchiveDraftRecords')) {
    failures.push('archive draft-list page does not use archive draft records helper')
  }

  if (!draftListSource.includes('/pages/archive/development-plan-edit/index')) {
    failures.push('archive draft-list page does not navigate to development plan draft edit page')
  }

  if (!draftListSource.includes('recordId=')) {
    failures.push('archive draft-list page does not navigate to detail by recordId')
  }
}

if (existsSync(developmentPlanEditPageFile)) {
  const developmentPlanEditSource = readFileSync(developmentPlanEditPageFile, 'utf8')
  if (!developmentPlanEditSource.includes('domain/archive')) {
    failures.push('archive development plan edit page does not read archive draft records from shared domain')
  }

  if (!developmentPlanEditSource.includes('saveArchiveDevelopmentPlanDraft')) {
    failures.push('archive development plan edit page does not save draft state')
  }

  if (!developmentPlanEditSource.includes('submitArchiveDevelopmentPlanDraft')) {
    failures.push('archive development plan edit page does not submit draft into pending archive record')
  }

  if (!developmentPlanEditSource.includes('/pages/archive/record-detail/index')) {
    failures.push('archive development plan edit page does not navigate to submitted archive record detail')
  }

  if (!developmentPlanEditSource.includes('/pages/archive/draft-list/index')) {
    failures.push('archive development plan edit page does not navigate back to draft list')
  }
}

if (existsSync(correctionApplyPageFile)) {
  const correctionApplySource = readFileSync(correctionApplyPageFile, 'utf8')
  if (!correctionApplySource.includes('domain/archive')) {
    failures.push('archive correction apply page does not read archive records from shared domain')
  }

  if (!correctionApplySource.includes('findArchiveRecordById')) {
    failures.push('archive correction apply page does not locate records by recordId')
  }

  if (!correctionApplySource.includes('/pages/archive/record-detail/index')) {
    failures.push('archive correction apply page does not navigate back to record-detail')
  }

  if (!correctionApplySource.includes('recordId=')) {
    failures.push('archive correction apply page does not preserve recordId in navigation')
  }

  if (!correctionApplySource.includes('/pages/archive/correction/submitted/index')) {
    failures.push('archive correction apply page does not navigate to correction submitted page')
  }
}

if (existsSync(correctionSubmittedPageFile)) {
  const correctionSubmittedSource = readFileSync(correctionSubmittedPageFile, 'utf8')
  if (!correctionSubmittedSource.includes('domain/archive')) {
    failures.push('archive correction submitted page does not read archive records from shared domain')
  }

  if (!correctionSubmittedSource.includes('findArchiveRecordById')) {
    failures.push('archive correction submitted page does not locate records by recordId')
  }

  if (!correctionSubmittedSource.includes('/pages/archive/record-detail/index')) {
    failures.push('archive correction submitted page does not navigate back to record-detail')
  }

  if (!correctionSubmittedSource.includes('/pages/archive/correction/progress/index')) {
    failures.push('archive correction submitted page does not navigate to correction progress page')
  }

  if (!correctionSubmittedSource.includes('recordId=')) {
    failures.push('archive correction submitted page does not preserve recordId in navigation')
  }
}

if (existsSync(correctionProgressPageFile)) {
  const correctionProgressSource = readFileSync(correctionProgressPageFile, 'utf8')
  if (!correctionProgressSource.includes('domain/archive')) {
    failures.push('archive correction progress page does not read archive records from shared domain')
  }

  if (!correctionProgressSource.includes('findArchiveRecordById')) {
    failures.push('archive correction progress page does not locate records by recordId')
  }

  if (!correctionProgressSource.includes('/pages/archive/record-detail/index')) {
    failures.push('archive correction progress page does not navigate back to record-detail')
  }

  if (!correctionProgressSource.includes('/pages/archive/correction/result/index')) {
    failures.push('archive correction progress page does not navigate to correction result page')
  }

  if (!correctionProgressSource.includes('recordId=')) {
    failures.push('archive correction progress page does not preserve recordId in navigation')
  }
}

if (existsSync(correctionResultPageFile)) {
  const correctionResultSource = readFileSync(correctionResultPageFile, 'utf8')
  if (!correctionResultSource.includes('domain/archive')) {
    failures.push('archive correction result page does not read archive records from shared domain')
  }

  if (!correctionResultSource.includes('findArchiveRecordById')) {
    failures.push('archive correction result page does not locate records by recordId')
  }

  if (!correctionResultSource.includes('/pages/archive/record-detail/index')) {
    failures.push('archive correction result page does not navigate back to record-detail')
  }

  if (!correctionResultSource.includes('/pages/archive/correction/progress/index')) {
    failures.push('archive correction result page does not navigate back to correction progress')
  }

  if (!correctionResultSource.includes('/pages/archive/correction/supplement/index')) {
    failures.push('archive correction result page does not navigate to correction supplement page')
  }

  if (!correctionResultSource.includes('recordId=')) {
    failures.push('archive correction result page does not preserve recordId in navigation')
  }
}

if (existsSync(correctionSupplementPageFile)) {
  const correctionSupplementSource = readFileSync(correctionSupplementPageFile, 'utf8')
  if (!correctionSupplementSource.includes('domain/archive')) {
    failures.push('archive correction supplement page does not read archive records from shared domain')
  }

  if (!correctionSupplementSource.includes('findArchiveRecordById')) {
    failures.push('archive correction supplement page does not locate records by recordId')
  }

  if (!correctionSupplementSource.includes('/pages/archive/correction/progress/index')) {
    failures.push('archive correction supplement page does not navigate back to correction progress')
  }

  if (!correctionSupplementSource.includes('/pages/archive/record-detail/index')) {
    failures.push('archive correction supplement page does not navigate back to record-detail')
  }

  if (!correctionSupplementSource.includes('recordId=')) {
    failures.push('archive correction supplement page does not preserve recordId in navigation')
  }

  if (!correctionSupplementSource.includes('uploadStatus')) {
    failures.push('archive correction supplement page does not expose material upload status')
  }

  if (!correctionSupplementSource.includes('supplementMaterials')) {
    failures.push('archive correction supplement page does not keep editable supplement material state')
  }

  if (!correctionSupplementSource.includes('submitArchiveCorrectionSupplement(correction.value.id, supplementMaterials.value')) {
    failures.push('archive correction supplement page does not submit material upload state to archive domain')
  }
}

const profileSource = readFileSync(profileFile, 'utf8')
if (!profileSource.includes('/pages/archive/correction/progress/index')) {
  failures.push('profile page does not navigate information correction progress to correction progress page')
}

const querySource = readFileSync(queryFile, 'utf8')
if (!querySource.includes('/pages/archive/record-detail/index')) {
  failures.push('archive record query page does not navigate to record-detail')
}

if (!querySource.includes('domain/archive')) {
  failures.push('archive record query page does not read archive records from shared domain')
}

if (!querySource.includes('recordId=')) {
  failures.push('archive record query page does not navigate to detail by recordId')
}

const successSource = readFileSync(successFile, 'utf8')
if (!successSource.includes('/pages/archive/record-detail/index')) {
  failures.push('certificate archive success page does not navigate to record-detail')
}

if (!successSource.includes('recordId=')) {
  failures.push('certificate archive success page does not navigate to detail by recordId')
}

const archiveEntryFiles = [
  [trainingArchiveResultFile, 'training archive result page'],
  [enterpriseArchiveSuccessFile, 'enterprise archive success page'],
  [virtualArchiveResultFile, 'virtual research archive result page'],
  [virtualArchiveResultV1File, 'virtual research archive result v1 page'],
]

for (const [file, label] of archiveEntryFiles) {
  const source = readFileSync(file, 'utf8')
  if (!source.includes('/pages/archive/record-detail/index')) {
    failures.push(`${label} does not navigate to record-detail`)
  }

  if (!source.includes('recordId=')) {
    failures.push(`${label} does not navigate to record-detail by recordId`)
  }
}

const ledgerSource = readFileSync(docsLedgerFile, 'utf8')
const completedTaskList = ledgerSource.split('### 已完成任务编号')[1] || ''
if (!ledgerSource.includes('| V-02a | 手机端档案入口守卫 | 已补：')) {
  failures.push('coverage ledger does not mark V-02a archive entry guard as implemented')
}

if (!ledgerSource.includes('基本信息详情页第一版已落地')) {
  failures.push('coverage ledger does not mark the basic information detail page as implemented')
}

if (!ledgerSource.includes('发展计划草稿编辑页第一版已落地')) {
  failures.push('coverage ledger does not mark the development plan draft edit page as implemented')
}

if (!ledgerSource.includes('个人发展分类页已由统一分类页承接')) {
  failures.push('coverage ledger does not mark personal-development category as covered by archive category page')
}

if (!ledgerSource.includes('档案材料预览统一降级模型已补')) {
  failures.push('coverage ledger does not mark archive material preview fallback model as implemented')
}

if (!completedTaskList.includes('V-02a')) {
  failures.push('coverage ledger completed task list does not include V-02a')
}

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log('archive detail route and entry guardrails passed')
