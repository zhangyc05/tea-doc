import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const projectRoot = resolve(root, '..')
const files = {
  trainingDomain: resolve(root, 'src/domain/training.ts'),
  archiveDomain: resolve(root, 'src/domain/archive.ts'),
  trainingIndex: resolve(root, 'src/pages/activity/training/index.vue'),
  trainingList: resolve(root, 'src/pages/activity/training-list/index.vue'),
  trainingApplication: resolve(root, 'src/pages/activity/training-application/index.vue'),
  trainingSummary: resolve(root, 'src/pages/activity/training-summary/index.vue'),
  trainingDemand: resolve(root, 'src/pages/activity/training-demand/index.vue'),
  trainingDemandResult: resolve(root, 'src/pages/activity/training-demand-result/index.vue'),
  trainingNeedResult: resolve(root, 'src/pages/activity/training-need-result/index.vue'),
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

const trainingDomain = source(files.trainingDomain)
mustInclude('training domain', trainingDomain, 'getMobileTrainingState')
mustInclude('training domain', trainingDomain, 'submitTrainingApplication')
mustInclude('training domain', trainingDomain, 'approveMobileTrainingApplication')
mustInclude('training domain', trainingDomain, 'rejectMobileTrainingApplication')
mustInclude('training domain', trainingDomain, 'syncMobileTrainingApplicationResult')
mustInclude('training domain', trainingDomain, 'submitTrainingArchive')
mustInclude('training domain', trainingDomain, 'submitTrainingDemand')
mustInclude('training domain', trainingDomain, 'syncMobileTrainingDemandResult')
mustInclude('training domain', trainingDomain, "adminStoreRefs")
mustInclude('training domain', trainingDomain, "trainingStore.applications")
mustInclude('training domain', trainingDomain, "archiveStore.processingRecords")
mustInclude('training domain', trainingDomain, "status: '待处理'")
mustInclude('training domain', trainingDomain, "status: '待确认'")
mustInclude('training domain', trainingDomain, "status: '待匹配'")

const archiveDomain = source(files.archiveDomain)
mustInclude('archive domain', archiveDomain, 'createTrainingArchiveRecord')
mustInclude('archive domain', archiveDomain, "status: 'pending-verify'")

const trainingIndex = source(files.trainingIndex)
mustInclude('training index page', trainingIndex, 'getMobileTrainingState')
mustInclude('training index page', trainingIndex, 'goSummary')
mustInclude('training index page', trainingIndex, 'openLearningResource')

const trainingList = source(files.trainingList)
mustInclude('training list page', trainingList, 'getMobileTrainingState')
mustInclude('training list page', trainingList, 'startLearning')
mustInclude('training list page', trainingList, 'submitTrainingApplication')

const trainingApplication = source(files.trainingApplication)
mustInclude('training application page', trainingApplication, 'submitTrainingApplication')
mustInclude('training application page', trainingApplication, 'findTrainingApplicationById')
mustInclude('training application page', trainingApplication, 'syncMobileTrainingApplicationResult')
mustInclude('training application page', trainingApplication, "result === 'approved'")
mustInclude('training application page', trainingApplication, "result === 'rejected'")
mustInclude('training application page', trainingApplication, 'goApplicationDetail')

const trainingSummary = source(files.trainingSummary)
mustInclude('training summary page', trainingSummary, 'getTrainingSummaryDraft')
mustInclude('training summary page', trainingSummary, 'saveTrainingSummaryDraft')
mustInclude('training summary page', trainingSummary, 'optimizeTrainingSummary')
mustInclude('training summary page', trainingSummary, 'uploadTrainingMaterial')
mustInclude('training summary page', trainingSummary, 'submitTrainingArchive')

const trainingDemand = source(files.trainingDemand)
mustInclude('training demand page', trainingDemand, 'submitTrainingDemand')

const demandResult = source(files.trainingDemandResult)
mustInclude('training demand result page', demandResult, 'findTrainingDemandById')
mustInclude('training demand result page', demandResult, 'syncMobileTrainingDemandResult')
mustInclude('training demand result page', demandResult, "result?: 'matched' | 'deferred' | 'application'")
mustInclude('training demand result page', demandResult, '待匹配')

const needResult = source(files.trainingNeedResult)
mustInclude('training need result page', needResult, 'findTrainingDemandById')
mustInclude('training need result page', needResult, 'syncMobileTrainingDemandResult')
mustInclude('training need result page', needResult, "result?: 'matched' | 'deferred' | 'application'")
mustInclude('training need result page', needResult, '待匹配')

const businessMap = source(files.businessMap)
mustInclude('business logic map', businessMap, '手机端培训活动闭环已接入')
mustInclude('business logic map', businessMap, 'syncMobileTrainingApplicationResult()')
mustInclude('business logic map', businessMap, 'syncMobileTrainingDemandResult()')
mustInclude('business logic map', businessMap, 'trainingStore.applications')
mustInclude('business logic map', businessMap, 'archiveStore.processingRecords')

const coverageLedger = source(files.coverageLedger)
mustInclude('page coverage ledger', coverageLedger, '手机端培训活动闭环')
mustInclude('page coverage ledger', coverageLedger, '管理端同意 / 未同意回写')
mustInclude('page coverage ledger', coverageLedger, '培训需求匹配结果回写')

if (failures.length > 0) {
  console.error(`Training business verification failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Training business verification passed.')
