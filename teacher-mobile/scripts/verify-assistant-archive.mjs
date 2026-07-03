import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const files = {
  archiveDomain: resolve(root, 'src/domain/archive.ts'),
  supplement: resolve(root, 'src/pages/assistant/archive-supplement/index.vue'),
  submitted: resolve(root, 'src/pages/assistant/archive-supplement-submitted/index.vue'),
  draftList: resolve(root, 'src/pages/archive/draft-list/index.vue'),
  detail: resolve(root, 'src/pages/archive/record-detail/index.vue'),
  docsLedger: resolve(root, '../docs/page-coverage-ledger.md'),
}

const failures = []
const source = (file) => existsSync(file) ? readFileSync(file, 'utf8') : ''

for (const [name, file] of Object.entries(files)) {
  if (!existsSync(file)) {
    failures.push(`${name} file does not exist: ${file}`)
  }
}

const archiveDomainSource = source(files.archiveDomain)
if (!archiveDomainSource.includes('createArchiveSupplementRecord')) {
  failures.push('archive domain does not expose createArchiveSupplementRecord')
}

if (!archiveDomainSource.includes("source: 'AI 助手补充'")) {
  failures.push('archive supplement record source is not AI assistant supplement')
}

if (!archiveDomainSource.includes("status: 'pending-verify'")) {
  failures.push('archive supplement record is not created as pending verification')
}

if (!archiveDomainSource.includes('archiveRecords.unshift')) {
  failures.push('archive supplement record is not inserted into archiveRecords')
}

const supplementSource = source(files.supplement)
if (!supplementSource.includes('createArchiveSupplementRecord')) {
  failures.push('archive supplement page does not create a pending archive record')
}

if (!supplementSource.includes('recordId=')) {
  failures.push('archive supplement page does not pass recordId to submitted page')
}

const submittedSource = source(files.submitted)
if (!submittedSource.includes('onLoad')) {
  failures.push('archive supplement submitted page does not read route recordId')
}

if (!submittedSource.includes('findArchiveRecordById')) {
  failures.push('archive supplement submitted page does not read created archive record')
}

if (!submittedSource.includes('/pages/archive/record-detail/index?recordId=')) {
  failures.push('archive supplement submitted page does not navigate to created record detail')
}

if (!submittedSource.includes('/pages/archive/draft-list/index')) {
  failures.push('archive supplement submitted page does not expose archive pending list entry')
}

const ledgerDoc = source(files.docsLedger)
const completedTaskList = ledgerDoc.split('### 已完成任务编号')[1] || ''
if (!ledgerDoc.includes('| M-14 | 补 AI 助手补充档案待核验记录 | 已补：')) {
  failures.push('coverage ledger does not mark M-14 assistant archive pending record as implemented')
}

if (!completedTaskList.includes('M-14')) {
  failures.push('coverage ledger completed task list does not include M-14')
}

if (failures.length > 0) {
  console.error(`Assistant archive verification failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Assistant archive verification passed.')
