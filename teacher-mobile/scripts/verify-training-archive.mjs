import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const files = {
  archiveDomain: resolve(root, 'src/domain/archive.ts'),
  trainingSummary: resolve(root, 'src/pages/activity/training-summary/index.vue'),
  trainingArchiveResult: resolve(root, 'src/pages/activity/training-archive-result/index.vue'),
}

const failures = []
const source = (file) => existsSync(file) ? readFileSync(file, 'utf8') : ''

for (const [name, file] of Object.entries(files)) {
  if (!existsSync(file)) {
    failures.push(`${name} file does not exist: ${file}`)
  }
}

const archiveDomainSource = source(files.archiveDomain)
if (!archiveDomainSource.includes('createTrainingArchiveRecord')) {
  failures.push('archive domain does not expose createTrainingArchiveRecord')
}

if (!archiveDomainSource.includes("source: '培训归档'")) {
  failures.push('training archive record source is not training archive')
}

if (!archiveDomainSource.includes("status: 'pending-verify'")) {
  failures.push('training archive record is not pending verification')
}

if (!archiveDomainSource.includes('createArchiveProcessingQueueTrace')) {
  failures.push('archive domain does not expose archive processing queue trace helper')
}

if (!archiveDomainSource.includes("}, '培训归档', '待确认')")) {
  failures.push('training archive record does not attach a training archive queue trace')
}

const summarySource = source(files.trainingSummary)
if (!summarySource.includes('submitTrainingArchive')) {
  failures.push('training summary submit does not update training record and create archive trace')
}

if (!summarySource.includes('recordId=')) {
  failures.push('training summary submit does not pass recordId to archive result page')
}

const resultSource = source(files.trainingArchiveResult)
if (!resultSource.includes('onLoad')) {
  failures.push('training archive result page does not read route recordId')
}

if (!resultSource.includes('findArchiveRecordById')) {
  failures.push('training archive result page does not read archive record by id')
}

if (!resultSource.includes('/pages/archive/record-detail/index?recordId=')) {
  failures.push('training archive result page does not navigate to created archive record detail')
}

if (!resultSource.includes('/pages/archive/draft-list/index')) {
  failures.push('training archive result page does not expose archive pending list entry')
}

if (failures.length > 0) {
  console.error(`Training archive verification failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Training archive verification passed.')
