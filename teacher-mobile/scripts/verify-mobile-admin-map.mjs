import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const files = {
  businessMap: resolve(root, '../docs/business-logic-map.md'),
  ledger: resolve(root, '../docs/page-coverage-ledger.md'),
  archiveDomain: resolve(root, 'src/domain/archive.ts'),
  trainingDomain: resolve(root, 'src/domain/training.ts'),
  enterpriseDomain: resolve(root, 'src/domain/enterprise.ts'),
  virtualResearchDomain: resolve(root, 'src/domain/virtualResearch.ts'),
  reflectionDomain: resolve(root, 'src/domain/reflection.ts'),
  todoStore: resolve(root, 'src/stores/todoStore.ts'),
}

const failures = []

function source(label, file) {
  if (!existsSync(file)) {
    failures.push(`${label} file does not exist: ${file}`)
    return ''
  }
  return readFileSync(file, 'utf8')
}

function mustInclude(label, content, text) {
  if (!content.includes(text)) failures.push(`${label} does not include ${text}`)
}

const businessMap = source('business map', files.businessMap)
const ledger = source('coverage ledger', files.ledger)
const mobileSources = [
  source('archive domain', files.archiveDomain),
  source('training domain', files.trainingDomain),
  source('enterprise domain', files.enterpriseDomain),
  source('virtual research domain', files.virtualResearchDomain),
  source('reflection domain', files.reflectionDomain),
  source('todo store', files.todoStore),
].join('\n')

mustInclude('business map', businessMap, '手机端与管理端统一接入策略已补第一版')
mustInclude('business map', businessMap, '不直接复用管理端 store')
mustInclude('business map', businessMap, '手机端 domain/store')

for (const status of ['待处理', '待核验', '待确认', '需补充', '已归档', '已入档', '已移出']) {
  mustInclude('business map', businessMap, status)
}

for (const ref of [
  'archiveStore.processingRecords',
  'teacherArchiveFacts',
  'trainingStore',
  'practiceStore',
  'virtualLabStore',
  'reflectionStore.records',
]) {
  mustInclude('business map', businessMap, ref)
  mustInclude('mobile domain/store sources', mobileSources, ref)
}

mustInclude('business map', businessMap, 'todoStore')

if (mobileSources.includes('frontend/src/stores/admin') || mobileSources.includes('stores/admin/')) {
  failures.push('mobile sources directly reference admin stores instead of adminStoreRefs')
}

for (const item of [
  'G13-01 | 建立手机端到管理端对象映射表 | 已补',
  'G13-02 | 建立手机端提交材料统一口径 | 已补',
  'G13-03 | 建立审批结果统一口径 | 已补',
  'G13-04 | 建立入档结果统一口径 | 已补',
]) {
  mustInclude('coverage ledger', ledger, item)
}

if (failures.length > 0) {
  console.error(`Mobile admin map verification failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Mobile admin map verification passed.')
