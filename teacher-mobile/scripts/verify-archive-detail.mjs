import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const pagesJson = JSON.parse(readFileSync(resolve(root, 'src/pages.json'), 'utf8'))
const route = 'pages/archive/record-detail/index'
const categoryRoute = 'pages/archive/category/index'
const recordListRoute = 'pages/archive/record-list/index'
const draftListRoute = 'pages/archive/draft-list/index'
const correctionApplyRoute = 'pages/archive/correction/apply/index'
const pageFile = resolve(root, 'src/pages/archive/record-detail/index.vue')
const categoryPageFile = resolve(root, 'src/pages/archive/category/index.vue')
const recordListPageFile = resolve(root, 'src/pages/archive/record-list/index.vue')
const draftListPageFile = resolve(root, 'src/pages/archive/draft-list/index.vue')
const correctionApplyPageFile = resolve(root, 'src/pages/archive/correction/apply/index.vue')
const archiveIndexFile = resolve(root, 'src/pages/archive/index.vue')
const queryFile = resolve(root, 'src/pages/archive/record-query/index.vue')
const archiveDomainFile = resolve(root, 'src/domain/archive.ts')
const successFile = resolve(root, 'src/pages/todo/certificate-archive-success/index.vue')
const trainingArchiveResultFile = resolve(root, 'src/pages/activity/training-archive-result/index.vue')
const enterpriseArchiveSuccessFile = resolve(root, 'src/pages/activity/enterprise-archive-success/index.vue')
const virtualArchiveResultFile = resolve(root, 'src/pages/activity/virtual-research-archive-result/index.vue')
const virtualArchiveResultV1File = resolve(root, 'src/pages/activity/virtual-research-archive-result-v1/index.vue')

const failures = []

if (!pagesJson.pages.some((page) => page.path === route)) {
  failures.push(`${route} is not registered in src/pages.json`)
}

if (!pagesJson.pages.some((page) => page.path === categoryRoute)) {
  failures.push(`${categoryRoute} is not registered in src/pages.json`)
}

if (!pagesJson.pages.some((page) => page.path === recordListRoute)) {
  failures.push(`${recordListRoute} is not registered in src/pages.json`)
}

if (!pagesJson.pages.some((page) => page.path === draftListRoute)) {
  failures.push(`${draftListRoute} is not registered in src/pages.json`)
}

if (!pagesJson.pages.some((page) => page.path === correctionApplyRoute)) {
  failures.push(`${correctionApplyRoute} is not registered in src/pages.json`)
}

if (!existsSync(pageFile)) {
  failures.push(`${route}.vue does not exist`)
}

if (!existsSync(categoryPageFile)) {
  failures.push(`${categoryRoute}.vue does not exist`)
}

if (!existsSync(recordListPageFile)) {
  failures.push(`${recordListRoute}.vue does not exist`)
}

if (!existsSync(draftListPageFile)) {
  failures.push(`${draftListRoute}.vue does not exist`)
}

if (!existsSync(correctionApplyPageFile)) {
  failures.push(`${correctionApplyRoute}.vue does not exist`)
}

if (!existsSync(archiveDomainFile)) {
  failures.push('src/domain/archive.ts does not exist')
}

if (existsSync(archiveDomainFile)) {
  const archiveDomainSource = readFileSync(archiveDomainFile, 'utf8')
  if (!archiveDomainSource.includes('getPendingArchiveRecords')) {
    failures.push('archive domain does not expose pending archive records helper')
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

  if (!detailSource.includes('/pages/archive/correction/apply/index')) {
    failures.push('archive record detail page does not navigate to correction apply page')
  }

  if (!detailSource.includes('recordId=')) {
    failures.push('archive record detail page does not pass recordId to correction apply page')
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
  if (!categorySource.includes('/pages/archive/record-list/index')) {
    failures.push('archive category page does not navigate to record-list')
  }

  if (!categorySource.includes('domain/archive')) {
    failures.push('archive category page does not read archive records from shared domain')
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

  if (!draftListSource.includes('recordId=')) {
    failures.push('archive draft-list page does not navigate to detail by recordId')
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

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log('archive detail route and entry guardrails passed')
