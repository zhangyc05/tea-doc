import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const projectRoot = resolve(root, '..')
const files = {
  domain: resolve(root, 'src/domain/reflection.ts'),
  archiveDomain: resolve(root, 'src/domain/archive.ts'),
  start: resolve(root, 'src/pages/activity/reflection-start/index.vue'),
  course: resolve(root, 'src/pages/activity/reflection-course/index.vue'),
  evidence: resolve(root, 'src/pages/activity/reflection-evidence/index.vue'),
  scope: resolve(root, 'src/pages/activity/reflection-scope/index.vue'),
  self: resolve(root, 'src/pages/activity/reflection-self/index.vue'),
  guideChat: resolve(root, 'src/pages/activity/reflection-guide-chat/index.vue'),
  aiChat: resolve(root, 'src/pages/activity/reflection-ai-chat/index.vue'),
  draft: resolve(root, 'src/pages/activity/reflection-draft/index.vue'),
  success: resolve(root, 'src/pages/activity/reflection-success/index.vue'),
  businessMap: resolve(projectRoot, 'docs/business-logic-map.md'),
  coverageLedger: resolve(projectRoot, 'docs/page-coverage-ledger.md'),
}

const failures = []
const source = (file) => existsSync(file) ? readFileSync(file, 'utf8') : ''
const mustInclude = (label, text, needle) => {
  if (!text.includes(needle)) failures.push(`${label} missing ${needle}`)
}
const mustNotInclude = (label, text, needle) => {
  if (text.includes(needle)) failures.push(`${label} should not include ${needle}`)
}

for (const [name, file] of Object.entries(files)) {
  if (!existsSync(file)) failures.push(`${name} file does not exist: ${file}`)
}

const domain = source(files.domain)
mustInclude('reflection domain', domain, 'getMobileReflectionState')
mustInclude('reflection domain', domain, 'startReflection')
mustInclude('reflection domain', domain, 'selectReflectionCourse')
mustInclude('reflection domain', domain, 'selectReflectionLesson')
mustInclude('reflection domain', domain, 'selectReflectionEvidence')
mustInclude('reflection domain', domain, 'addReflectionMaterial')
mustInclude('reflection domain', domain, 'startReflectionAiSession')
mustInclude('reflection domain', domain, 'saveReflectionDraft')
mustInclude('reflection domain', domain, 'optimizeReflectionDraft')
mustInclude('reflection domain', domain, 'confirmReflection')
mustInclude('reflection domain', domain, 'reflectionStore.records')
mustInclude('reflection domain', domain, 'archiveStore.processingRecords')

const archiveDomain = source(files.archiveDomain)
mustInclude('archive domain', archiveDomain, 'createTeachingReflectionArchiveRecord')
mustInclude('archive domain', archiveDomain, 'createArchiveProcessingQueueTrace')
mustInclude('archive domain', archiveDomain, "}, '教学反思确认', '待确认')")

const start = source(files.start)
mustInclude('reflection start page', start, 'startReflection')
mustInclude('reflection start page', start, 'continueReflectionDraft')

const course = source(files.course)
mustInclude('reflection course page', course, 'selectReflectionCourse')
mustInclude('reflection course page', course, 'addReflectionMaterial')
mustInclude('reflection course page', course, 'getMobileReflectionState')
mustNotInclude('reflection course page', course, "uni.showToast({ title: '教学资料已加入依据'")
mustNotInclude('reflection course page', course, "uni.showToast({ title: '课堂音频已加入依据'")

const evidence = source(files.evidence)
mustInclude('reflection evidence page', evidence, 'selectReflectionLesson')
mustInclude('reflection evidence page', evidence, 'selectReflectionEvidence')
mustInclude('reflection evidence page', evidence, 'getMobileReflectionState')
mustNotInclude('reflection evidence page', evidence, "uni.showToast({ title: '教学资料已加入依据'")
mustNotInclude('reflection evidence page', evidence, "uni.showToast({ title: '课堂音频已加入依据'")

const scope = source(files.scope)
mustInclude('reflection scope page', scope, 'selectReflectionEvidence')
mustInclude('reflection scope page', scope, 'getMobileReflectionState')
mustNotInclude('reflection scope page', scope, "uni.showToast({ title: '阶段材料已加入依据'")
mustNotInclude('reflection scope page', scope, "uni.showToast({ title: '课堂音频已加入依据'")

const self = source(files.self)
mustInclude('reflection self page', self, 'getMobileReflectionState')
mustInclude('reflection self page', self, 'addReflectionMaterial')
mustInclude('reflection self page', self, 'startReflectionAiSession')
mustInclude('reflection self page', self, 'materialCount')
mustNotInclude('reflection self page', self, "uni.showToast({ title: '材料已加入依据'")

const guideChat = source(files.guideChat)
mustInclude('reflection guide chat page', guideChat, 'startReflectionAiSession')
mustInclude('reflection guide chat page', guideChat, 'saveReflectionDraft')

const aiChat = source(files.aiChat)
mustInclude('reflection ai chat page', aiChat, 'getMobileReflectionState')
mustInclude('reflection ai chat page', aiChat, 'startReflectionAiSession')
mustInclude('reflection ai chat page', aiChat, 'saveReflectionDraft')
mustInclude('reflection ai chat page', aiChat, 'materialCount')
mustNotInclude('reflection ai chat page', aiChat, "uni.showToast({ title: '材料已加入依据'")

const draft = source(files.draft)
mustInclude('reflection draft page', draft, 'getMobileReflectionState')
mustInclude('reflection draft page', draft, 'reflectionRecord')
mustInclude('reflection draft page', draft, 'selectedEvidence')
mustInclude('reflection draft page', draft, 'selectedEvidence.length')
mustInclude('reflection draft page', draft, 'reflectionRecord.course')
mustInclude('reflection draft page', draft, 'saveReflectionDraft')
mustInclude('reflection draft page', draft, 'optimizeReflectionDraft')
mustInclude('reflection draft page', draft, 'confirmReflection')

const success = source(files.success)
mustInclude('reflection success page', success, 'confirmReflection')
mustInclude('reflection success page', success, 'goReflectionDetail')
mustInclude('reflection success page', success, 'goNewReflection')

const businessMap = source(files.businessMap)
mustInclude('business logic map', businessMap, '手机端教学反思闭环已接入')
mustInclude('business logic map', businessMap, 'reflectionStore.records')
mustInclude('business logic map', businessMap, 'archiveStore.processingRecords')

const coverageLedger = source(files.coverageLedger)
mustInclude('page coverage ledger', coverageLedger, '手机端教学反思闭环')

if (failures.length > 0) {
  console.error(`Reflection business verification failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Reflection business verification passed.')
