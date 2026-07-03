import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const projectRoot = resolve(root, '..')
const files = {
  enterpriseDomain: resolve(root, 'src/domain/enterprise.ts'),
  overview: resolve(root, 'src/pages/activity/enterprise-overview/index.vue'),
  list: resolve(root, 'src/pages/activity/enterprise-list/index.vue'),
  planSubmit: resolve(root, 'src/pages/activity/enterprise-plan-submit/index.vue'),
  planConfirm: resolve(root, 'src/pages/activity/enterprise-plan-confirm/index.vue'),
  importExport: resolve(root, 'src/pages/activity/enterprise-import-export/index.vue'),
  logRecord: resolve(root, 'src/pages/activity/enterprise-log-record/index.vue'),
  archiveEdit: resolve(root, 'src/pages/activity/enterprise-archive-edit/index.vue'),
  historySupplement: resolve(root, 'src/pages/activity/enterprise-history-supplement/index.vue'),
  historyConfirmed: resolve(root, 'src/pages/activity/enterprise-history-confirmed/index.vue'),
  businessMap: resolve(projectRoot, 'docs/business-logic-map.md'),
  coverageLedger: resolve(projectRoot, 'docs/page-coverage-ledger.md'),
}

const failures = []
const source = (file) => existsSync(file) ? readFileSync(file, 'utf8') : ''
const mustInclude = (label, text, needle) => {
  if (!text.includes(needle)) failures.push(`${label} missing ${needle}`)
}

for (const [name, file] of Object.entries(files)) {
  if (!existsSync(file)) failures.push(`${name} file does not exist: ${file}`)
}

const domain = source(files.enterpriseDomain)
mustInclude('enterprise domain', domain, 'getMobileEnterpriseState')
mustInclude('enterprise domain', domain, 'setEnterpriseFilter')
mustInclude('enterprise domain', domain, 'saveEnterprisePlanDraft')
mustInclude('enterprise domain', domain, 'submitEnterprisePlan')
mustInclude('enterprise domain', domain, "status: '待审核'")
mustInclude('enterprise domain', domain, 'approveEnterprisePlan')
mustInclude('enterprise domain', domain, 'rejectEnterprisePlan')
mustInclude('enterprise domain', domain, 'saveEnterpriseLogDraft')
mustInclude('enterprise domain', domain, 'saveEnterpriseLog')
mustInclude('enterprise domain', domain, 'saveEnterpriseArchiveDraft')
mustInclude('enterprise domain', domain, 'submitEnterpriseArchive')
mustInclude('enterprise domain', domain, 'submitEnterpriseSupplement')
mustInclude('enterprise domain', domain, 'MobileEnterpriseMaterial')
mustInclude('enterprise domain', domain, 'MobileEnterpriseVerificationHistory')
mustInclude('enterprise domain', domain, 'EnterpriseMaterialUploadStatus')
mustInclude('enterprise domain', domain, 'EnterpriseVerificationStatus')
mustInclude('enterprise domain', domain, 'materials: MobileEnterpriseMaterial[]')
mustInclude('enterprise domain', domain, 'verificationHistory: MobileEnterpriseVerificationHistory[]')
mustInclude('enterprise domain', domain, 'uploadStatus')
mustInclude('enterprise domain', domain, 'verificationStatus')
mustInclude('enterprise domain', domain, '补充材料已提交')
mustInclude('enterprise domain', domain, 'submitEnterpriseHistory')
mustInclude('enterprise domain', domain, 'practiceStore.applications')
mustInclude('enterprise domain', domain, 'practiceStore.records')
mustInclude('enterprise domain', domain, 'archiveStore.processingRecords')

const overview = source(files.overview)
mustInclude('overview page', overview, 'getMobileEnterpriseState')
mustInclude('overview page', overview, 'setEnterpriseFilter')
mustInclude('overview page', overview, 'goLogRecord')
mustInclude('overview page', overview, 'goSupplement')
mustInclude('overview page', overview, 'goHistorySupplement')

const list = source(files.list)
mustInclude('list page', list, 'getMobileEnterpriseState')
mustInclude('list page', list, 'setEnterpriseFilter')
mustInclude('list page', list, 'filteredEnterpriseRecords')

const planSubmit = source(files.planSubmit)
mustInclude('plan submit page', planSubmit, 'saveEnterprisePlanDraft')
mustInclude('plan submit page', planSubmit, 'submitEnterprisePlan')

const planConfirm = source(files.planConfirm)
mustInclude('plan confirm page', planConfirm, 'submitEnterprisePlan')
for (const legacyText of ['这条档案', '正式入档', '将正式入档']) {
  if (planConfirm.includes(legacyText)) {
    failures.push(`plan confirm page still presents enterprise plan submission as ${legacyText}`)
  }
}

const importExport = source(files.importExport)
mustInclude('waiting page', importExport, 'goEnterpriseList')
mustInclude('waiting page', importExport, '实践计划已提交')
mustInclude('waiting page', importExport, '学院确认中')
mustInclude('waiting page', importExport, '/pages/activity/enterprise-plan-confirm/index')

const logRecord = source(files.logRecord)
mustInclude('log record page', logRecord, 'saveEnterpriseLogDraft')
mustInclude('log record page', logRecord, 'saveEnterpriseLog')

const workflowConfig = source(resolve(root, 'src/pages/activity/enterprise-workflow-config/index.vue'))
mustInclude('workflow config route page', workflowConfig, '日志详情')
mustInclude('workflow config route page', workflowConfig, '所属实践')
mustInclude('workflow config route page', workflowConfig, '附件资料')
mustInclude('workflow config route page', workflowConfig, '归档说明')

const archiveEdit = source(files.archiveEdit)
mustInclude('archive edit page', archiveEdit, 'saveEnterpriseArchiveDraft')
mustInclude('archive edit page', archiveEdit, 'submitEnterpriseArchive')

const historySupplement = source(files.historySupplement)
mustInclude('history supplement page', historySupplement, 'submitEnterpriseHistory')

const historyConfirmed = source(files.historyConfirmed)
mustInclude('history confirmed page', historyConfirmed, 'goEnterpriseList')
mustInclude('history confirmed page', historyConfirmed, 'goEnterpriseArchive')

const businessMap = source(files.businessMap)
mustInclude('business logic map', businessMap, '手机端企业实践闭环已接入')
mustInclude('business logic map', businessMap, 'practiceStore.applications')
mustInclude('business logic map', businessMap, 'archiveStore.processingRecords')
mustInclude('business logic map', businessMap, '企业实践补充材料对象和核验历史已接入')
mustInclude('business logic map', businessMap, '企业实践兼容路由名边界已核对')

const coverageLedger = source(files.coverageLedger)
mustInclude('page coverage ledger', coverageLedger, '手机端企业实践闭环')
mustInclude('page coverage ledger', coverageLedger, '补充材料对象、核验状态和处理历史')
mustInclude('page coverage ledger', coverageLedger, '企业实践兼容路由名边界已核对')

if (failures.length > 0) {
  console.error(`Enterprise business verification failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Enterprise business verification passed.')
