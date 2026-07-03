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
  contributionSupplement: resolve(root, 'src/pages/activity/virtual-research-skill-management/index.vue'),
  contributionSupplementSubmitted: resolve(root, 'src/pages/activity/virtual-research-activity-detail-supplement-submitted/index.vue'),
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
const mustNotInclude = (label, text, needle) => {
  if (text.includes(needle)) failures.push(`${label} should not include ${needle}`)
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
mustInclude('virtual research domain', domain, 'VirtualResearchStageMaterial')
mustInclude('virtual research domain', domain, 'VirtualResearchEvidenceSourceKey')
mustInclude('virtual research domain', domain, 'VirtualResearchSourceTrace')
mustInclude('virtual research domain', domain, 'virtualResearchSourceTraceMap')
mustInclude('virtual research domain', domain, 'getVirtualResearchSourceTraces')
mustInclude('virtual research domain', domain, 'formatVirtualResearchSourceLine')
mustInclude('virtual research domain', domain, "'meeting-minutes'")
mustInclude('virtual research domain', domain, "'task-assignment'")
mustInclude('virtual research domain', domain, "'speech-excerpt'")
mustInclude('virtual research domain', domain, "'stage-material'")
mustInclude('virtual research domain', domain, "'personal-contribution'")
mustInclude('virtual research domain', domain, "'语音'")
mustInclude('virtual research domain', domain, 'stageMaterials')
mustInclude('virtual research domain', domain, 'addStageMaterial')
mustInclude('virtual research domain', domain, 'confirmContribution')
mustInclude('virtual research domain', domain, 'rejectContribution')
mustInclude('virtual research domain', domain, 'saveSupplementDraft')
mustInclude('virtual research domain', domain, 'submitSupplementMaterial')
mustInclude('virtual research domain', domain, 'supplementMaterials')
mustInclude('virtual research domain', domain, 'addSupplementMaterial')
mustInclude('virtual research domain', domain, 'submitVirtualResearchArchive')
mustInclude('virtual research domain', domain, 'previewVirtualResearchMaterial')
mustInclude('virtual research domain', domain, 'openVirtualResearchMeeting')
mustInclude('virtual research domain', domain, 'VirtualResearchMemberProfileScope')
mustInclude('virtual research domain', domain, 'memberProfileScope')
mustInclude('virtual research domain', domain, 'recordMemberProfileAction')
mustInclude('virtual research domain', domain, 'memberProfileLastAction')
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
mustInclude('archive domain', archiveDomain, 'VirtualResearchArchiveSourceTrace')
mustInclude('archive domain', archiveDomain, '来源材料')
mustInclude('archive domain', archiveDomain, 'sourceTraces.map')

const room = source(files.room)
mustInclude('room page', room, 'getMobileVirtualResearchState')
mustInclude('room page', room, 'goResearchInvitation')
mustInclude('room page', room, 'goContributionConfirm')
mustInclude('room page', room, 'goResearchRoom')
mustInclude('room page', room, 'goResearchActivityList')

const invitation = source(files.invitation)
mustInclude('invitation page', invitation, 'confirmResearchInvitation')
mustInclude('invitation page', invitation, 'declineResearchInvitation')
mustInclude('invitation page', invitation, 'goActivityList')
mustInclude('invitation page', invitation, 'goContributionConfirm')
mustNotInclude('invitation page', invitation, 'showToast(item.title)')
mustNotInclude('invitation page', invitation, "showToast('贡献待确认')")

const activityList = source(files.activityList)
mustInclude('activity list page', activityList, 'setVirtualResearchFilter')
mustInclude('activity list page', activityList, 'filteredResearchActivities')
mustInclude('activity list page', activityList, 'goContributionConfirm')
mustInclude('activity list page', activityList, 'goSupplementMaterial')
mustInclude('activity list page', activityList, 'goActivityDetail')
mustInclude('activity list page', activityList, 'showAllActivities')
mustInclude('activity list page', activityList, 'showResearchRule')
mustNotInclude('activity list page', activityList, "showToast('筛选')")
mustNotInclude('activity list page', activityList, "showToast('了解规则')")

const ongoingDetail = source(files.ongoingDetail)
mustInclude('ongoing detail page', ongoingDetail, 'goResearchRoom')
mustInclude('ongoing detail page', ongoingDetail, 'goStageMaterial')
mustInclude('ongoing detail page', ongoingDetail, 'openVirtualResearchMeeting')
mustInclude('ongoing detail page', ongoingDetail, 'joinMeeting')
mustInclude('ongoing detail page', ongoingDetail, '@tap="joinMeeting"')
mustInclude('ongoing detail page', ongoingDetail, 'previewVirtualResearchMaterial')
mustInclude('ongoing detail page', ongoingDetail, 'previewMaterial')

const stageMaterial = source(files.stageMaterial)
mustInclude('stage material page', stageMaterial, 'getMobileVirtualResearchState')
mustInclude('stage material page', stageMaterial, 'addStageMaterial')
mustInclude('stage material page', stageMaterial, 'handleUploadAction')
mustInclude('stage material page', stageMaterial, '@tap="handleUploadAction(item.title)"')
mustInclude('stage material page', stageMaterial, 'virtualResearchState.stageMaterials')
mustInclude('stage material page', stageMaterial, 'saveStageMaterialDraft')
mustInclude('stage material page', stageMaterial, 'submitStageMaterial')

const stageSubmitted = source(files.stageSubmitted)
mustInclude('stage submitted page', stageSubmitted, 'goResearchRoom')
mustInclude('stage submitted page', stageSubmitted, 'goActivityDetail')

const contributionConfirm = source(files.contributionConfirm)
mustInclude('contribution confirm page', contributionConfirm, 'confirmContribution')
mustInclude('contribution confirm page', contributionConfirm, 'formatVirtualResearchSourceLine')
mustInclude('contribution confirm page', contributionConfirm, 'sourceKeys')
mustInclude('contribution confirm page', contributionConfirm, 'rejectContribution')
mustInclude('contribution confirm page', contributionConfirm, 'addSupplementMaterial')
mustInclude('contribution confirm page', contributionConfirm, 'addVoiceMaterial')
mustInclude('contribution confirm page', contributionConfirm, 'addPhotoMaterial')
mustInclude('contribution confirm page', contributionConfirm, 'addUploadMaterial')
mustInclude('contribution confirm page', contributionConfirm, 'getMobileVirtualResearchState')
mustInclude('contribution confirm page', contributionConfirm, 'goSupplementContribution')
mustInclude('contribution confirm page', contributionConfirm, '待确认动作页')
mustNotInclude('contribution confirm page', contributionConfirm, "showToast('语音')")
mustNotInclude('contribution confirm page', contributionConfirm, "showToast('拍照')")
mustNotInclude('contribution confirm page', contributionConfirm, "showToast('上传')")

const contributionSupplement = source(files.contributionSupplement)
mustInclude('contribution supplement page', contributionSupplement, 'getMobileVirtualResearchState')
mustInclude('contribution supplement page', contributionSupplement, 'addSupplementMaterial')
mustInclude('contribution supplement page', contributionSupplement, 'saveSupplementDraft')
mustInclude('contribution supplement page', contributionSupplement, 'submitSupplementMaterial')
mustInclude('contribution supplement page', contributionSupplement, 'handleSupplementMaterialAction')
mustInclude('contribution supplement page', contributionSupplement, 'saveContributionDraft')
mustInclude('contribution supplement page', contributionSupplement, 'submitContributionSupplement')
mustInclude('contribution supplement page', contributionSupplement, '@tap="handleSupplementMaterialAction(item.title)"')
mustInclude('contribution supplement page', contributionSupplement, '@tap="saveContributionDraft"')
mustInclude('contribution supplement page', contributionSupplement, '@tap="submitContributionSupplement"')
mustInclude('contribution supplement page', contributionSupplement, 'virtualResearchState.supplementMaterials')

const contributionSupplementSubmitted = source(files.contributionSupplementSubmitted)
mustInclude('contribution supplement submitted page', contributionSupplementSubmitted, 'goSupplementContribution')
mustInclude('contribution supplement submitted page', contributionSupplementSubmitted, 'goContributionConfirm')
mustInclude('contribution supplement submitted page', contributionSupplementSubmitted, '@tap="goSupplementContribution"')
mustInclude('contribution supplement submitted page', contributionSupplementSubmitted, '@tap="goContributionConfirm"')

const contributionConfirmVisual = source(resolve(root, 'src/pages/activity/virtual-research-contribution-confirm/index.vue'))
mustInclude('contribution confirm visual page', contributionConfirmVisual, '待确认详情页')
mustInclude('contribution confirm visual page', contributionConfirmVisual, 'formatVirtualResearchSourceLine')
mustInclude('contribution confirm visual page', contributionConfirmVisual, 'sourceKeys')
mustInclude('contribution confirm visual page', contributionConfirmVisual, 'confirmContribution')
mustInclude('contribution confirm visual page', contributionConfirmVisual, 'goSupplementContribution')
mustInclude('contribution confirm visual page', contributionConfirmVisual, 'submitContribution')
mustInclude('contribution confirm visual page', contributionConfirmVisual, '@tap="submitContribution"')
mustInclude('contribution confirm visual page', contributionConfirmVisual, '@tap="goSupplementContribution"')

const activityDetailConfirm = source(resolve(root, 'src/pages/activity/virtual-research-activity-detail-confirm/index.vue'))
mustInclude('activity detail confirm page', activityDetailConfirm, '完整贡献确认页')
mustInclude('activity detail confirm page', activityDetailConfirm, 'formatVirtualResearchSourceLine')
mustInclude('activity detail confirm page', activityDetailConfirm, 'sourceKeys')
mustInclude('activity detail confirm page', activityDetailConfirm, 'confirmContribution')
mustInclude('activity detail confirm page', activityDetailConfirm, 'previewVirtualResearchMaterial')
mustInclude('activity detail confirm page', activityDetailConfirm, 'previewMaterial')
mustInclude('activity detail confirm page', activityDetailConfirm, 'goContributionDetail')
mustInclude('activity detail confirm page', activityDetailConfirm, 'goContributionConfirm')
mustInclude('activity detail confirm page', activityDetailConfirm, 'goSupplementContribution')
mustInclude('activity detail confirm page', activityDetailConfirm, 'submitContribution')
mustInclude('activity detail confirm page', activityDetailConfirm, '@tap="submitContribution"')
mustInclude('activity detail confirm page', activityDetailConfirm, '@tap="goSupplementContribution"')
mustNotInclude('activity detail confirm page', activityDetailConfirm, "showToast('更多')")
mustNotInclude('activity detail confirm page', activityDetailConfirm, 'showToast(item.title)')
mustNotInclude('activity detail confirm page', activityDetailConfirm, "showToast('查看全部')")
mustNotInclude('activity detail confirm page', activityDetailConfirm, 'showToast(file.name)')

const contributionSubmitted = source(files.contributionSubmitted)
mustInclude('contribution submitted page', contributionSubmitted, 'goResearchRoom')
mustInclude('contribution submitted page', contributionSubmitted, 'goContributionDetail')

const contributionDetail = source(files.contributionDetail)
mustInclude('contribution detail page', contributionDetail, 'previewVirtualResearchMaterial')
mustInclude('contribution detail page', contributionDetail, 'previewMaterial')
mustInclude('contribution detail page', contributionDetail, 'goResearchRecord')
mustInclude('contribution detail page', contributionDetail, '/pages/archive/record-detail/index?recordId=virtual-research-course-case-meeting')
mustInclude('contribution detail page', contributionDetail, '真实附件服务后续接入')

const workExperienceManagement = source(files.workExperienceManagement)
mustInclude('work experience management page', workExperienceManagement, 'previewVirtualResearchMaterial')
mustInclude('work experience management page', workExperienceManagement, 'previewMaterial')
mustInclude('work experience management page', workExperienceManagement, 'goResearchRecord')
mustInclude('work experience management page', workExperienceManagement, '/pages/archive/record-detail/index?recordId=virtual-research-course-case-meeting')
mustInclude('work experience management page', workExperienceManagement, '真实附件服务后续接入')

const supplement = source(files.supplement)
mustInclude('supplement page', supplement, 'getMobileVirtualResearchState')
mustInclude('supplement page', supplement, 'addSupplementMaterial')
mustInclude('supplement page', supplement, 'handleSupplementUpload')
mustInclude('supplement page', supplement, '@tap="handleSupplementUpload')
mustInclude('supplement page', supplement, 'virtualResearchState.supplementMaterials')
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

const profileIntroEdit = source(files.profileIntroEdit)
mustInclude('profile intro edit page', profileIntroEdit, 'recordMemberProfileAction')
mustInclude('profile intro edit page', profileIntroEdit, 'previewVirtualResearchMaterial')
mustInclude('profile intro edit page', profileIntroEdit, 'goResearchRoom')
mustInclude('profile intro edit page', profileIntroEdit, 'goContributionDetail')
mustInclude('profile intro edit page', profileIntroEdit, 'goProgressTrack')
mustInclude('profile intro edit page', profileIntroEdit, '/pages/activity/virtual-research-room/index')
mustInclude('profile intro edit page', profileIntroEdit, '/pages/activity/virtual-research-contribution-detail/index')
mustInclude('profile intro edit page', profileIntroEdit, '/pages/activity/virtual-research-activity-detail-confirm/index')
mustNotInclude('profile intro edit page', profileIntroEdit, "showToast('进度跟踪')")
mustNotInclude('profile intro edit page', profileIntroEdit, "showToast('返回教研室')")
mustNotInclude('profile intro edit page', profileIntroEdit, "showToast('查看提交内容')")
mustNotInclude('profile intro edit page', profileIntroEdit, 'showToast(item.title)')
mustNotInclude('profile intro edit page', profileIntroEdit, 'showToast(file.name)')

const roleAssignment = source(files.roleAssignment)
mustInclude('role assignment page', roleAssignment, 'goResearchInvitation')
mustInclude('role assignment page', roleAssignment, 'goContributionConfirm')
mustInclude('role assignment page', roleAssignment, 'goResearchRoom')
mustInclude('role assignment page', roleAssignment, 'goResearchActivityList')
mustInclude('role assignment page', roleAssignment, 'handleTodoAction')
mustInclude('role assignment page', roleAssignment, '/pages/activity/virtual-research-invitation/index')
mustInclude('role assignment page', roleAssignment, '/pages/activity/virtual-research-confirm-contribution/index')
mustInclude('role assignment page', roleAssignment, '/pages/activity/virtual-research-profile-complete/index')
mustInclude('role assignment page', roleAssignment, '/pages/activity/virtual-research-activity-list/index')

const positionManagement = source(files.positionManagement)
mustInclude('position management page', positionManagement, 'recordMemberProfileAction')
mustInclude('position management page', positionManagement, 'goResearchRoom')
mustInclude('position management page', positionManagement, 'goContributionConfirm')
mustInclude('position management page', positionManagement, 'goMemberEntry')
mustInclude('position management page', positionManagement, '/pages/activity/virtual-research-room/index')
mustInclude('position management page', positionManagement, '/pages/activity/virtual-research-confirm-contribution/index')
mustInclude('position management page', positionManagement, '/pages/activity/virtual-research-activity-list/index')
mustInclude('position management page', positionManagement, '/pages/activity/virtual-research-activity-detail-ongoing/index')
mustInclude('position management page', positionManagement, '/pages/activity/virtual-research-skill-management/index')
mustInclude('position management page', positionManagement, '/pages/activity/virtual-research-contribution-detail/index')
mustNotInclude('position management page', positionManagement, 'showToast(entry.title)')

const skillManagement = source(files.skillManagement)
mustInclude('skill management page', skillManagement, 'recordMemberProfileAction')
mustInclude('skill management page', skillManagement, "addSupplementMaterial('语音')")
mustInclude('skill management page', skillManagement, 'handleEvidenceAction')
mustNotInclude('skill management page', skillManagement, "showToast('语音说明入口待接入')")
mustNotInclude('skill management page', skillManagement, 'showToast(item.title)')

const advancedSettings = source(files.advancedSettings)
mustInclude('advanced settings page', advancedSettings, '个人发展报告')
mustInclude('advanced settings page', advancedSettings, '我的资料')

const archiveResult = source(files.archiveResult)
mustInclude('archive result page', archiveResult, 'submitVirtualResearchArchive')
mustInclude('archive result page', archiveResult, 'formatVirtualResearchSourceLine')
mustInclude('archive result page', archiveResult, 'sourceKeys')
mustInclude('archive result page', archiveResult, 'goResearchRoom')

const archivedConfirmed = source(files.archivedConfirmed)
mustInclude('archived confirmed page', archivedConfirmed, 'formatVirtualResearchSourceLine')
mustInclude('archived confirmed page', archivedConfirmed, 'sourceKeys')

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

mustInclude('archived confirmed page', archivedConfirmed, 'goResearchRoom')
mustInclude('archived confirmed page', archivedConfirmed, 'goResearchRecord')

const businessMap = source(files.businessMap)
mustInclude('business logic map', businessMap, '手机端虚拟教研闭环已接入')
mustInclude('business logic map', businessMap, 'virtualLabStore.records')
mustInclude('business logic map', businessMap, 'archiveStore.processingRecords')
mustInclude('business logic map', businessMap, '虚拟教研材料预览降级入口')
mustInclude('business logic map', businessMap, '虚拟教研成员资料归属和动作边界已判定')
mustInclude('business logic map', businessMap, '虚拟教研贡献确认页状态机已明确')
mustInclude('business logic map', businessMap, '已加入教研室返回和待确认贡献入口已接真实路由')
mustInclude('business logic map', businessMap, '贡献详情和记录详情材料预览及返回教研记录已接真实入口')
mustInclude('business logic map', businessMap, '进入会议调用 `openVirtualResearchMeeting()`')
mustInclude('business logic map', businessMap, '上传 / 拍照调用 `addStageMaterial()` 写入阶段材料集合')
mustInclude('business logic map', businessMap, '补充材料上传 / 拍照调用 `addSupplementMaterial()` 写入补充材料集合')
mustInclude('business logic map', businessMap, '待确认详情页和完整贡献确认页已接同一贡献确认状态机')
mustInclude('business logic map', businessMap, '补充遗漏贡献页已接补充材料集合、草稿和提交状态')
mustInclude('business logic map', businessMap, '我的教研室看板状态页入口已接真实路由')
mustInclude('business logic map', businessMap, '虚拟教研材料来源模型已补')

const coverageLedger = source(files.coverageLedger)
mustInclude('page coverage ledger', coverageLedger, '手机端虚拟教研闭环')
mustInclude('page coverage ledger', coverageLedger, '虚拟教研材料预览降级入口')
mustInclude('page coverage ledger', coverageLedger, '虚拟教研成员资料归属和动作边界已判定')
mustInclude('page coverage ledger', coverageLedger, '虚拟教研贡献确认页状态机已明确')
mustInclude('page coverage ledger', coverageLedger, '已加入教研室返回和待确认贡献入口已接真实路由')
mustInclude('page coverage ledger', coverageLedger, '贡献详情和记录详情材料预览及返回教研记录已接真实入口')
mustInclude('page coverage ledger', coverageLedger, '补活动进行中会议入口')
mustInclude('page coverage ledger', coverageLedger, '补阶段材料上传和拍照集合')
mustInclude('page coverage ledger', coverageLedger, '补补充材料上传和拍照集合')
mustInclude('page coverage ledger', coverageLedger, '补贡献确认视觉页统一状态机动作')
mustInclude('page coverage ledger', coverageLedger, '补补充遗漏贡献页状态动作')
mustInclude('page coverage ledger', coverageLedger, '补我的教研室看板状态页入口')
mustInclude('page coverage ledger', coverageLedger, '虚拟教研材料来源模型已补')

if (failures.length > 0) {
  console.error(`Virtual research business verification failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Virtual research business verification passed.')
