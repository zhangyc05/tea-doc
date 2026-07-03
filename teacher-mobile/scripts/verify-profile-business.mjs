import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const projectRoot = resolve(root, '..')
const files = {
  pagesJson: resolve(root, 'src/pages.json'),
  packageJson: resolve(root, 'package.json'),
  assistantIndex: resolve(root, 'src/pages/assistant/index.vue'),
  profileIndex: resolve(root, 'src/pages/profile/index.vue'),
  abilityProfile: resolve(root, 'src/pages/profile/ability-profile/index.vue'),
  abilityRecords: resolve(root, 'src/pages/profile/ability-profile/records/index.vue'),
  developmentReport: resolve(root, 'src/pages/profile/development-report/index.vue'),
  targetPosition: resolve(root, 'src/pages/profile/target-position/index.vue'),
  tenureRequirement: resolve(root, 'src/pages/profile/tenure-requirement/index.vue'),
  businessMap: resolve(projectRoot, 'docs/business-logic-map.md'),
  coverageLedger: resolve(projectRoot, 'docs/page-coverage-ledger.md'),
}

const failures = []

function source(label, file) {
  if (!existsSync(file)) {
    failures.push(`${label} file does not exist: ${file}`)
    return ''
  }

  return readFileSync(file, 'utf8')
}

function mustInclude(label, content, needle) {
  if (!content.includes(needle)) failures.push(`${label} missing ${needle}`)
}

function mustNotInclude(label, content, needle) {
  if (content.includes(needle)) failures.push(`${label} should not include ${needle}`)
}

for (const [label, file] of Object.entries(files)) {
  source(label, file)
}

const pagesJson = source('pages.json', files.pagesJson)
const packageJson = source('package.json', files.packageJson)
const assistantIndex = source('assistant index page', files.assistantIndex)
const profileIndex = source('profile index page', files.profileIndex)
const abilityProfile = source('ability profile page', files.abilityProfile)
const abilityRecords = source('ability records page', files.abilityRecords)
const developmentReport = source('development report page', files.developmentReport)
const targetPosition = source('target position page', files.targetPosition)
const tenureRequirement = source('tenure requirement page', files.tenureRequirement)
const businessMap = source('business map', files.businessMap)
const coverageLedger = source('coverage ledger', files.coverageLedger)

for (const route of [
  'pages/profile/ability-profile/index',
  'pages/profile/ability-profile/records/index',
  'pages/profile/development-report/index',
  'pages/profile/target-position/index',
  'pages/profile/tenure-requirement/index',
]) {
  mustInclude('pages.json', pagesJson, `"path": "${route}"`)
}

mustInclude('package.json', packageJson, '"test:profile-business": "node scripts/verify-profile-business.mjs"')

mustInclude('assistant index page', assistantIndex, "title: '解读能力画像'")
mustInclude('assistant index page', assistantIndex, "url: '/pages/profile/ability-profile/index?from=assistant'")
if (assistantIndex.includes("uni.showToast({ title: '页面待补齐'")) {
  failures.push('assistant ability profile entry still falls back to page placeholder toast')
}

mustInclude('profile index page', profileIndex, '/pages/profile/ability-profile/index')
mustInclude('profile index page', profileIndex, '/pages/profile/development-report/index')

for (const route of [
  '/pages/profile/ability-profile/records/index',
  '/pages/profile/target-position/index',
  '/pages/profile/tenure-requirement/index',
  '/pages/profile/development-report/index',
]) {
  mustInclude('ability profile page', abilityProfile, route)
}

mustInclude('ability records page', abilityRecords, '/pages/archive/record-detail/index?recordId=')
mustInclude('development report page', developmentReport, '/pages/profile/ability-profile/records/index')
mustInclude('development report page', developmentReport, '/pages/profile/ability-profile/index?from=development-report')
mustInclude('development report page', developmentReport, '/pages/profile/target-position/index')
mustInclude('development report page', developmentReport, '/pages/profile/tenure-requirement/index')
mustInclude('development report page', developmentReport, 'showExportNotice')
mustNotInclude('development report page', developmentReport, 'uni.showToast')
mustInclude('target position page', targetPosition, '/pages/profile/ability-profile/records/index')
mustInclude('target position page', targetPosition, '/pages/archive/record-detail/index?recordId=')
mustInclude('tenure requirement page', tenureRequirement, '/pages/profile/ability-profile/records/index')
mustInclude('tenure requirement page', tenureRequirement, '/pages/archive/record-detail/index?recordId=')
mustInclude('tenure requirement page', tenureRequirement, '/pages/activity/enterprise-advanced-search/index')
mustInclude('tenure requirement page', tenureRequirement, '/pages/activity/virtual-research-activity-list/index')
mustInclude('tenure requirement page', tenureRequirement, '/pages/profile/target-position/index?from=tenure-requirement')
mustNotInclude('tenure requirement page', tenureRequirement, 'showUnavailable')
mustNotInclude('tenure requirement page', tenureRequirement, 'uni.showToast')
mustNotInclude('tenure requirement page', tenureRequirement, '暂未接入真实业务入口')

for (const text of [
  '教师手机端：我的',
  '能力画像',
  '画像用到的记录',
  '个人发展报告',
  '目标岗位对照',
  '聘期要求对照',
]) {
  mustInclude('business map', businessMap, text)
  mustInclude('coverage ledger', coverageLedger, text)
}

if (failures.length > 0) {
  console.error(`Profile business verification failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Profile business verification passed.')
