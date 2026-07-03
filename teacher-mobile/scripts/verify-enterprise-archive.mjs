import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const files = {
  archiveDomain: resolve(root, 'src/domain/archive.ts'),
  archiveResult: resolve(root, 'src/pages/activity/enterprise-archive-result/index.vue'),
  supplementSubmitted: resolve(root, 'src/pages/activity/enterprise-supplement-submitted/index.vue'),
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
}

if (failures.length > 0) {
  console.error(`Enterprise archive verification failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Enterprise archive verification passed.')
