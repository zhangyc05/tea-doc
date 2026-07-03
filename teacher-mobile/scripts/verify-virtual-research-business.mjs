import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const projectRoot = resolve(root, '..')
const files = {
  domain: resolve(root, 'src/domain/virtualResearch.ts'),
  archiveDomain: resolve(root, 'src/domain/archive.ts'),
  room: resolve(root, 'src/pages/activity/virtual-research-room/index.vue'),
  invitation: resolve(root, 'src/pages/activity/virtual-research-invitation/index.vue'),
  activityList: resolve(root, 'src/pages/activity/virtual-research-activity-list/index.vue'),
  ongoingDetail: resolve(root, 'src/pages/activity/virtual-research-activity-detail-ongoing/index.vue'),
  contributionDetail: resolve(root, 'src/pages/activity/virtual-research-contribution-detail/index.vue'),
  stageMaterial: resolve(root, 'src/pages/activity/virtual-research-award-management/index.vue'),
  stageSubmitted: resolve(root, 'src/pages/activity/virtual-research-stage-submitted/index.vue'),
  contributionConfirm: resolve(root, 'src/pages/activity/virtual-research-confirm-contribution/index.vue'),
  contributionSubmitted: resolve(root, 'src/pages/activity/virtual-research-contribution-submitted/index.vue'),
  supplement: resolve(root, 'src/pages/activity/virtual-research-supplement-material/index.vue'),
  resubmitted: resolve(root, 'src/pages/activity/virtual-research-resubmitted/index.vue'),
  profileIntroEdit: resolve(root, 'src/pages/activity/virtual-research-profile-intro-edit/index.vue'),
  positionManagement: resolve(root, 'src/pages/activity/virtual-research-position-management/index.vue'),
  workExperienceManagement: resolve(root, 'src/pages/activity/virtual-research-work-experience-management/index.vue'),
  skillManagement: resolve(root, 'src/pages/activity/virtual-research-skill-management/index.vue'),
  roleAssignment: resolve(root, 'src/pages/activity/virtual-research-role-assignment/index.vue'),
  advancedSettings: resolve(root, 'src/pages/activity/virtual-research-advanced-settings/index.vue'),
  archiveResult: resolve(root, 'src/pages/activity/virtual-research-archive-result/index.vue'),
  archiveResultV1: resolve(root, 'src/pages/activity/virtual-research-archive-result-v1/index.vue'),
  archivedConfirmed: resolve(root, 'src/pages/activity/virtual-research-archived-confirmed/index.vue'),
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

const domain = source(files.domain)
const archiveDomain = source(files.archiveDomain)
mustInclude('virtual research domain', domain, 'getMobileVirtualResearchState')
mustInclude('virtual research domain', domain, 'setVirtualResearchFilter')
mustInclude('virtual research domain', domain, 'confirmResearchInvitation')
mustInclude('virtual research domain', domain, 'declineResearchInvitation')
mustInclude('virtual research domain', domain, 'saveStageMaterialDraft')
mustInclude('virtual research domain', domain, 'submitStageMaterial')
mustInclude('virtual research domain', domain, 'confirmContribution')
mustInclude('virtual research domain', domain, 'rejectContribution')
mustInclude('virtual research domain', domain, 'saveSupplementDraft')
mustInclude('virtual research domain', domain, 'submitSupplementMaterial')
mustInclude('virtual research domain', domain, 'submitVirtualResearchArchive')
mustInclude('virtual research domain', domain, 'previewVirtualResearchMaterial')
mustInclude('virtual research domain', domain, 'VirtualResearchMemberProfileScope')
mustInclude('virtual research domain', domain, 'memberProfileScope')
mustInclude('virtual research domain', domain, '虚拟教研成员资料')
mustInclude('virtual research domain', domain, 'VirtualResearchContributionPageState')
mustInclude('virtual research domain', domain, 'contributionPageStateMap')
mustInclude('virtual research domain', domain, 'virtual-research-confirm-contribution')
mustInclude('virtual research domain', domain, 'virtual-research-contribution-confirm')
mustInclude('virtual research domain', domain, 'virtual-research-activity-detail-confirm')
mustInclude('virtual research domain', domain, 'createVirtualResearchArchiveRecord')
mustInclude('virtual research domain', domain, 'virtualLabStore.rooms')
mustInclude('virtual research domain', domain, 'virtualLabStore.activities')
mustInclude('virtual research domain', domain, 'virtualLabStore.records')
mustInclude('virtual research domain', domain, 'archiveStore.processingRecords')
mustInclude('archive domain', archiveDomain, 'createVirtualResearchArchiveRecord')
mustInclude('archive domain', archiveDomain, "}, '虚拟教研归档', '待确认')")

const room = source(files.room)
mustInclude('room page', room, 'getMobileVirtualResearchState')
mustInclude('room page', room, 'goResearchInvitation')
mustInclude('room page', room, 'goContributionConfirm')
mustInclude('room page', room, 'goResearchRoom')
mustInclude('room page', room, 'goResearchActivityList')

const invitation = source(files.invitation)
mustInclude('invitation page', invitation, 'confirmResearchInvitation')
mustInclude('invitation page', invitation, 'declineResearchInvitation')

const activityList = source(files.activityList)
mustInclude('activity list page', activityList, 'setVirtualResearchFilter')
mustInclude('activity list page', activityList, 'filteredResearchActivities')
mustInclude('activity list page', activityList, 'goContributionConfirm')
mustInclude('activity list page', activityList, 'goSupplementMaterial')
mustInclude('activity list page', activityList, 'goActivityDetail')

const ongoingDetail = source(files.ongoingDetail)
mustInclude('ongoing detail page', ongoingDetail, 'goResearchRoom')
mustInclude('ongoing detail page', ongoingDetail, 'goStageMaterial')
mustInclude('ongoing detail page', ongoingDetail, 'previewVirtualResearchMaterial')
mustInclude('ongoing detail page', ongoingDetail, 'previewMaterial')

const stageMaterial = source(files.stageMaterial)
mustInclude('stage material page', stageMaterial, 'saveStageMaterialDraft')
mustInclude('stage material page', stageMaterial, 'submitStageMaterial')

const stageSubmitted = source(files.stageSubmitted)
mustInclude('stage submitted page', stageSubmitted, 'goResearchRoom')
mustInclude('stage submitted page', stageSubmitted, 'goActivityDetail')

const contributionConfirm = source(files.contributionConfirm)
mustInclude('contribution confirm page', contributionConfirm, 'confirmContribution')
mustInclude('contribution confirm page', contributionConfirm, 'rejectContribution')
mustInclude('contribution confirm page', contributionConfirm, 'goSupplementContribution')
mustInclude('contribution confirm page', contributionConfirm, '待确认动作页')

const contributionConfirmVisual = source(resolve(root, 'src/pages/activity/virtual-research-contribution-confirm/index.vue'))
mustInclude('contribution confirm visual page', contributionConfirmVisual, '待确认详情页')

const activityDetailConfirm = source(resolve(root, 'src/pages/activity/virtual-research-activity-detail-confirm/index.vue'))
mustInclude('activity detail confirm page', activityDetailConfirm, '完整贡献确认页')

const contributionSubmitted = source(files.contributionSubmitted)
mustInclude('contribution submitted page', contributionSubmitted, 'goResearchRoom')
mustInclude('contribution submitted page', contributionSubmitted, 'goContributionDetail')

const contributionDetail = source(files.contributionDetail)
mustInclude('contribution detail page', contributionDetail, 'previewVirtualResearchMaterial')
mustInclude('contribution detail page', contributionDetail, 'previewMaterial')
mustInclude('contribution detail page', contributionDetail, '真实附件服务后续接入')

const supplement = source(files.supplement)
mustInclude('supplement page', supplement, 'saveSupplementDraft')
mustInclude('supplement page', supplement, 'submitSupplementMaterial')

const resubmitted = source(files.resubmitted)
mustInclude('resubmitted page', resubmitted, 'goResearchRoom')
mustInclude('resubmitted page', resubmitted, 'goContributionDetail')

for (const [label, file] of [
  ['profile intro edit page', files.profileIntroEdit],
  ['position management page', files.positionManagement],
  ['work experience management page', files.workExperienceManagement],
  ['skill management page', files.skillManagement],
  ['role assignment page', files.roleAssignment],
]) {
  const pageSource = source(file)
  mustInclude(label, pageSource, '虚拟教研成员资料')
}

const advancedSettings = source(files.advancedSettings)
mustInclude('advanced settings page', advancedSettings, '个人发展报告')
mustInclude('advanced settings page', advancedSettings, '我的资料')

const archiveResult = source(files.archiveResult)
mustInclude('archive result page', archiveResult, 'submitVirtualResearchArchive')
mustInclude('archive result page', archiveResult, 'goResearchRoom')

for (const [label, file] of [
  ['archive result page', files.archiveResult],
  ['archive result v1 page', files.archiveResultV1],
  ['archived confirmed page', files.archivedConfirmed],
]) {
  const pageSource = source(file)
  mustInclude(label, pageSource, '档案待确认')
  mustInclude(label, pageSource, 'archiveStore.processingRecords')
  for (const legacyText of ['正式事实', '正式入档', '沉淀到成长档案中']) {
    if (pageSource.includes(legacyText)) {
      failures.push(`${label} still presents virtual research archive result as ${legacyText}`)
    }
  }
}

const archivedConfirmed = source(files.archivedConfirmed)
mustInclude('archived confirmed page', archivedConfirmed, 'goResearchRoom')
mustInclude('archived confirmed page', archivedConfirmed, 'goResearchRecord')

const businessMap = source(files.businessMap)
mustInclude('business logic map', businessMap, '手机端虚拟教研闭环已接入')
mustInclude('business logic map', businessMap, 'virtualLabStore.records')
mustInclude('business logic map', businessMap, 'archiveStore.processingRecords')
mustInclude('business logic map', businessMap, '虚拟教研材料预览降级入口')
mustInclude('business logic map', businessMap, '虚拟教研成员资料归属已判定')
mustInclude('business logic map', businessMap, '虚拟教研贡献确认页状态机已明确')

const coverageLedger = source(files.coverageLedger)
mustInclude('page coverage ledger', coverageLedger, '手机端虚拟教研闭环')
mustInclude('page coverage ledger', coverageLedger, '虚拟教研材料预览降级入口')
mustInclude('page coverage ledger', coverageLedger, '虚拟教研成员资料归属已判定')
mustInclude('page coverage ledger', coverageLedger, '虚拟教研贡献确认页状态机已明确')

if (failures.length > 0) {
  console.error(`Virtual research business verification failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Virtual research business verification passed.')
