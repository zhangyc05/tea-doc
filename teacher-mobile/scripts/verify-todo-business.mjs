import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const files = {
  store: resolve(root, 'src/stores/todoStore.ts'),
  todoIndex: resolve(root, 'src/pages/todo/index.vue'),
  todoAll: resolve(root, 'src/pages/todo/all/index.vue'),
  detail: resolve(root, 'src/pages/todo/certificate-detail/index.vue'),
  edit: resolve(root, 'src/pages/todo/certificate-edit/index.vue'),
  submit: resolve(root, 'src/pages/todo/certificate-submit/index.vue'),
  archiveSuccess: resolve(root, 'src/pages/todo/certificate-archive-success/index.vue'),
  removed: resolve(root, 'src/pages/todo/certificate-removed/index.vue'),
  dynamics: resolve(root, 'src/pages/todo/dynamics/index.vue'),
  docsBusiness: resolve(root, '../docs/business-logic-map.md'),
  docsLedger: resolve(root, '../docs/page-coverage-ledger.md'),
}

const failures = []

for (const [name, file] of Object.entries(files)) {
  if (!existsSync(file)) {
    failures.push(`${name} file does not exist: ${file}`)
  }
}

const source = (file) => existsSync(file) ? readFileSync(file, 'utf8') : ''
const storeSource = source(files.store)

if (!storeSource.includes('confirmTodoCertificate')) {
  failures.push('todo store does not expose confirmTodoCertificate')
}

if (!storeSource.includes('submitTodoCertificateCorrection')) {
  failures.push('todo store does not expose submitTodoCertificateCorrection')
}

if (!storeSource.includes('removeTodoCertificate')) {
  failures.push('todo store does not expose removeTodoCertificate')
}

if (!storeSource.includes('confirmTodoCertificateArchivedByAdmin')) {
  failures.push('todo store does not expose admin-side archive confirmation sync action')
}

if (!storeSource.includes('previewTodoCertificateMaterial')) {
  failures.push('todo store does not expose previewTodoCertificateMaterial')
}

if (!storeSource.includes('replaceTodoCertificateMaterial')) {
  failures.push('todo store does not expose replaceTodoCertificateMaterial')
}

if (!storeSource.includes('todoDynamics')) {
  failures.push('todo store does not keep dynamic events in shared state')
}

for (const apiName of [
  'dynamicFilter',
  'setTodoDynamicFilter',
  'resetTodoDynamicFilter',
  'getFilteredTodoDynamics',
]) {
  if (!storeSource.includes(apiName)) {
    failures.push(`todo store does not expose ${apiName} for dynamic filtering`)
  }
}

if (!storeSource.includes('submissionRecords')) {
  failures.push('todo store does not keep traceable submission records')
}

if (!storeSource.includes('removeReason')) {
  failures.push('todo store does not keep certificate removal reason')
}

if (!storeSource.includes('archiveStore.processingRecords')) {
  failures.push('todo store does not align todo records with archiveStore.processingRecords')
}

if (!storeSource.includes('getTodoActionUrl')) {
  failures.push('todo store does not expose action routes for non-certificate todos')
}

if (storeSource.includes("actionUrl: ''")) {
  failures.push('todo store contains todo action without a concrete route')
}

if (!storeSource.includes("'pending-verify'")) {
  failures.push('todo store does not represent pending verification status')
}

if (!storeSource.includes("'archived'")) {
  failures.push('todo store does not represent archived status')
}

if (!storeSource.includes("'removed'")) {
  failures.push('todo store does not represent removed status')
}

if (!storeSource.includes("'入档确认'")) {
  failures.push('todo store does not record archive confirmation dynamics')
}

const confirmTodoCertificateBlock = storeSource.match(/export function confirmTodoCertificate[\s\S]*?export function submitTodoCertificateCorrection/)?.[0] || ''
if (!confirmTodoCertificateBlock.includes("todo.status = 'pending-verify'")) {
  failures.push('certificate confirmation should move the todo to pending verification instead of direct archive')
}

if (confirmTodoCertificateBlock.includes("todo.status = 'archived'") || confirmTodoCertificateBlock.includes("state.certificate.status = 'archived'")) {
  failures.push('certificate confirmation still marks mobile todo or certificate as archived before admin confirmation')
}

const adminArchiveConfirmBlock = storeSource.match(/export function confirmTodoCertificateArchivedByAdmin[\s\S]*?function addTodoDynamic/)?.[0] || ''
if (!adminArchiveConfirmBlock.includes("todo.status = 'archived'")) {
  failures.push('admin archive confirmation sync should move the todo to archived')
}

if (!adminArchiveConfirmBlock.includes("state.certificate.status = 'archived'")) {
  failures.push('admin archive confirmation sync should move certificate to archived')
}

if (!adminArchiveConfirmBlock.includes("state.certificate.material.status = 'confirmed'")) {
  failures.push('admin archive confirmation sync should confirm certificate material')
}

if (!adminArchiveConfirmBlock.includes("type: '入档确认'")) {
  failures.push('admin archive confirmation sync should generate archive confirmation dynamic')
}

const pagesThatMustReadStore = [
  ['todo index', files.todoIndex],
  ['todo all', files.todoAll],
  ['certificate detail', files.detail],
  ['certificate edit', files.edit],
  ['certificate submit result', files.submit],
  ['archive success result', files.archiveSuccess],
  ['removed result', files.removed],
]

for (const [label, file] of pagesThatMustReadStore) {
  const pageSource = source(file)
  if (!pageSource.includes('stores/todoStore')) {
    failures.push(`${label} page does not read shared todo store`)
  }
}

if (!source(files.detail).includes('confirmTodoCertificate(')) {
  failures.push('certificate detail confirmation does not update shared todo state')
}

if (!source(files.detail).includes('removeTodoCertificate(')) {
  failures.push('certificate detail removal does not update shared todo state')
}

if (!source(files.detail).includes('previewTodoCertificateMaterial(')) {
  failures.push('certificate detail material preview does not use shared material state')
}

if (!source(files.edit).includes('submitTodoCertificateCorrection(')) {
  failures.push('certificate edit submit does not update shared todo state')
}

if (!source(files.edit).includes('replaceTodoCertificateMaterial(')) {
  failures.push('certificate edit material replacement does not update shared material state')
}

if (!source(files.edit).includes('updateTodoCertificateField(')) {
  failures.push('certificate edit fields do not write shared form values')
}

if (!source(files.submit).includes('submissionRecords')) {
  failures.push('certificate submit result does not show traceable submission records')
}

const archiveSuccessSource = source(files.archiveSuccess)
if (archiveSuccessSource.includes('已入档成功') || archiveSuccessSource.includes('系统已入档')) {
  failures.push('certificate confirmation result page still presents teacher confirmation as formal archive success')
}

if (!source(files.removed).includes('removeReason')) {
  failures.push('certificate removed result does not show removal reason')
}

if (!source(files.todoIndex).includes('visibleTodoItems')) {
  failures.push('todo index does not derive visible todos from shared state')
}

if (!source(files.todoIndex).includes('todoDynamics')) {
  failures.push('todo index does not derive recent dynamics from shared state')
}

if (!source(files.todoAll).includes('visibleTodos')) {
  failures.push('all todo page does not derive visible todos from shared state')
}

if (!source(files.todoAll).includes('getTodoActionUrl')) {
  failures.push('all todo page does not route non-certificate todos through shared action map')
}

const todoIndexSource = source(files.todoIndex)
const todoAllSource = source(files.todoAll)
if (todoIndexSource.includes('uni.showToast({ title: item.action')) {
  failures.push('todo index action button still falls back to action text toast')
}

if (todoAllSource.includes('uni.showToast({ title: item.action')) {
  failures.push('all todo action button still falls back to action text toast')
}

if (!source(files.dynamics).includes('todoDynamics')) {
  failures.push('dynamics page does not derive events from shared state')
}

const dynamicsSource = source(files.dynamics)
const dynamicsFilterSource = source(resolve(root, 'src/pages/todo/dynamics-filter/index.vue'))
if (!dynamicsSource.includes('getFilteredTodoDynamics')) {
  failures.push('dynamics page does not read filtered todo dynamics')
}

if (!dynamicsSource.includes('setTodoDynamicFilter')) {
  failures.push('dynamics page filter drawer does not update shared dynamic filter')
}

if (!dynamicsSource.includes('resetTodoDynamicFilter')) {
  failures.push('dynamics page filter drawer does not reset shared dynamic filter')
}

if (!dynamicsFilterSource.includes('getFilteredTodoDynamics')) {
  failures.push('standalone dynamics filter page does not read filtered todo dynamics')
}

if (!dynamicsFilterSource.includes('setTodoDynamicFilter')) {
  failures.push('standalone dynamics filter page does not update shared dynamic filter')
}

if (!dynamicsFilterSource.includes('resetTodoDynamicFilter')) {
  failures.push('standalone dynamics filter page does not reset shared dynamic filter')
}

if (dynamicsFilterSource.includes('showToast(') || dynamicsFilterSource.includes('uni.showToast')) {
  failures.push('standalone dynamics filter page still uses toast for filter actions')
}

const businessDoc = source(files.docsBusiness)
if (!businessDoc.includes('手机端待办闭环已补第一版')) {
  failures.push('business map does not mark mobile todo closure implementation status')
}

if (!businessDoc.includes('archiveStore.processingRecords')) {
  failures.push('business map does not document todo alignment with archiveStore.processingRecords')
}

if (businessDoc.includes('教师本人确认后直接入档口径') || businessDoc.includes('同步为 `archived`')) {
  failures.push('business map still documents direct mobile confirmation to archived status')
}

if (!businessDoc.includes('confirmTodoCertificateArchivedByAdmin()')) {
  failures.push('business map does not document admin-side archive confirmation sync action')
}

const ledgerDoc = source(files.docsLedger)
const completedTaskList = ledgerDoc.split('### 已完成任务编号')[1] || ''
if (!ledgerDoc.includes('手机端待办闭环已补第一版')) {
  failures.push('coverage ledger does not mark mobile todo closure implementation status')
}

if (!ledgerDoc.includes('| M-13 | 补待办证书共享状态 | 已补：')) {
  failures.push('coverage ledger does not mark M-13 todo certificate shared state as implemented')
}

if (!ledgerDoc.includes('管理端确认入档同步动作')) {
  failures.push('coverage ledger does not record admin archive confirmation sync coverage')
}

if (!completedTaskList.includes('M-13')) {
  failures.push('coverage ledger completed task list does not include M-13')
}

if (failures.length > 0) {
  console.error(`Todo business verification failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Todo business verification passed.')
