import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const projectRoot = resolve(root, '..')
const files = {
  archiveDomain: resolve(root, 'src/domain/archive.ts'),
  archiveIndex: resolve(root, 'src/pages/archive/index.vue'),
  draftList: resolve(root, 'src/pages/archive/draft-list/index.vue'),
  recordQuery: resolve(root, 'src/pages/archive/record-query/index.vue'),
  correctionApply: resolve(root, 'src/pages/archive/correction/apply/index.vue'),
  correctionSubmitted: resolve(root, 'src/pages/archive/correction/submitted/index.vue'),
  correctionProgress: resolve(root, 'src/pages/archive/correction/progress/index.vue'),
  correctionResult: resolve(root, 'src/pages/archive/correction/result/index.vue'),
  correctionSupplement: resolve(root, 'src/pages/archive/correction/supplement/index.vue'),
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

const archiveDomain = source(files.archiveDomain)
mustInclude('archive domain', archiveDomain, 'MobileArchiveRecordStatus')
mustInclude('archive domain', archiveDomain, "'pending-verify'")
mustInclude('archive domain', archiveDomain, "'need-supplement'")
mustInclude('archive domain', archiveDomain, "'archived'")
mustInclude('archive domain', archiveDomain, "'removed'")
mustInclude('archive domain', archiveDomain, 'getArchiveOverviewStats')
mustInclude('archive domain', archiveDomain, 'searchArchiveRecords')
mustInclude('archive domain', archiveDomain, 'submitArchiveCorrection')
mustInclude('archive domain', archiveDomain, 'updateArchiveCorrectionStatus')
mustInclude('archive domain', archiveDomain, 'submitArchiveCorrectionSupplement')
mustInclude('archive domain', archiveDomain, 'adminStoreRefs')
mustInclude('archive domain', archiveDomain, 'archiveStore.processingRecords')
mustInclude('archive domain', archiveDomain, 'teacherArchiveFacts')

const archiveIndex = source(files.archiveIndex)
mustInclude('archive index page', archiveIndex, 'getArchiveOverviewStats')
mustInclude('archive index page', archiveIndex, 'stats.archivedCount')
mustInclude('archive index page', archiveIndex, 'stats.pendingCount')

const draftList = source(files.draftList)
mustInclude('draft list page', draftList, 'getPendingArchiveRecords')
mustInclude('draft list page', draftList, 'need-supplement')

const recordQuery = source(files.recordQuery)
mustInclude('record query page', recordQuery, 'searchArchiveRecords')
mustInclude('record query page', recordQuery, 'queryText')
mustInclude('record query page', recordQuery, 'empty-card')

const correctionApply = source(files.correctionApply)
mustInclude('correction apply page', correctionApply, 'submitArchiveCorrection')
mustInclude('correction apply page', correctionApply, 'correctionId')

const correctionSubmitted = source(files.correctionSubmitted)
mustInclude('correction submitted page', correctionSubmitted, 'findArchiveCorrectionById')
mustInclude('correction submitted page', correctionSubmitted, 'correctionId')

const correctionProgress = source(files.correctionProgress)
mustInclude('correction progress page', correctionProgress, 'findArchiveCorrectionById')
mustInclude('correction progress page', correctionProgress, 'updateArchiveCorrectionStatus')

const correctionResult = source(files.correctionResult)
mustInclude('correction result page', correctionResult, 'findArchiveCorrectionById')
mustInclude('correction result page', correctionResult, '需补充')

const correctionSupplement = source(files.correctionSupplement)
mustInclude('correction supplement page', correctionSupplement, 'findArchiveCorrectionById')
mustInclude('correction supplement page', correctionSupplement, 'submitArchiveCorrectionSupplement')

const businessMap = source(files.businessMap)
mustInclude('business logic map', businessMap, '手机端档案真实状态回写已接入')
mustInclude('business logic map', businessMap, 'archiveStore.processingRecords')
mustInclude('business logic map', businessMap, 'teacherArchiveFacts')

const coverageLedger = source(files.coverageLedger)
mustInclude('page coverage ledger', coverageLedger, '手机端档案真实状态回写')

if (failures.length > 0) {
  console.error(`Archive business verification failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Archive business verification passed.')
