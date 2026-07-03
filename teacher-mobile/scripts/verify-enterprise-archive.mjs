import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const files = {
  archiveDomain: resolve(root, 'src/domain/archive.ts'),
  archiveResult: resolve(root, 'src/pages/activity/enterprise-archive-result/index.vue'),
  archiveSuccess: resolve(root, 'src/pages/activity/enterprise-archive-success/index.vue'),
  supplementSubmitted: resolve(root, 'src/pages/activity/enterprise-supplement-submitted/index.vue'),
  businessMap: resolve(root, '../docs/business-logic-map.md'),
  coverageLedger: resolve(root, '../docs/page-coverage-ledger.md'),
}

const failures = []
const source = (file) => existsSync(file) ? readFileSync(file, 'utf8') : ''

for (const [name, file] of Object.entries(files)) {
  if (!existsSync(file)) {
    failures.push(`${name} file does not exist: ${file}`)
  }
}

const archiveDomainSource = source(files.archiveDomain)
if (!archiveDomainSource.includes('createEnterprisePracticeArchiveRecord')) {
  failures.push('archive domain does not expose createEnterprisePracticeArchiveRecord')
}

if (!archiveDomainSource.includes("source: '企业实践归档'")) {
  failures.push('enterprise archive record source is not enterprise practice archive')
}

if (!archiveDomainSource.includes("status: 'pending-verify'")) {
  failures.push('enterprise archive record is not pending verification')
}

for (const [label, file] of [
  ['enterprise archive result', files.archiveResult],
  ['enterprise supplement submitted', files.supplementSubmitted],
]) {
  const pageSource = source(file)
  if (!pageSource.includes('createEnterprisePracticeArchiveRecord')) {
    failures.push(`${label} page does not create or locate enterprise archive record`)
  }

  if (!pageSource.includes('findArchiveRecordById')) {
    failures.push(`${label} page does not read enterprise archive record by id`)
  }

  if (!pageSource.includes('/pages/archive/record-detail/index?recordId=')) {
    failures.push(`${label} page does not navigate to enterprise archive detail`)
  }

  if (!pageSource.includes('/pages/archive/draft-list/index')) {
    failures.push(`${label} page does not expose archive pending list entry`)
  }

  for (const legacyText of ['正式入档', '将正式入档']) {
    if (pageSource.includes(legacyText)) {
      failures.push(`${label} page still presents pending verification as ${legacyText}`)
    }
  }
}

const archiveSuccessSource = source(files.archiveSuccess)
for (const legacyText of ['已入档', '正式入档', '系统已整理', '已作为正式材料入档']) {
  if (archiveSuccessSource.includes(legacyText)) {
    failures.push(`enterprise archive success page still presents mobile result as ${legacyText}`)
  }
}

if (!archiveSuccessSource.includes('createEnterprisePracticeArchiveRecord')) {
  failures.push('enterprise archive success page does not create or locate pending archive record')
}

if (!archiveSuccessSource.includes('/pages/archive/draft-list/index')) {
  failures.push('enterprise archive success page does not expose archive pending list entry')
}

const businessMapSource = source(files.businessMap)
if (businessMapSource.includes('企业实践旧成功页仍需继续统一') || businessMapSource.includes('企业实践遗留结果页后续继续收敛')) {
  failures.push('business map still marks enterprise archive success page as an unresolved old direct-archive result')
}

const coverageLedgerSource = source(files.coverageLedger)
if (!coverageLedgerSource.includes('企业实践等待入档确认页')) {
  failures.push('coverage ledger does not record enterprise archive success page as pending archive confirmation')
}

if (failures.length > 0) {
  console.error(`Enterprise archive verification failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Enterprise archive verification passed.')
