import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const projectRoot = resolve(root, '..')
const files = {
  domain: resolve(root, 'src/domain/virtualResearch.ts'),
  room: resolve(root, 'src/pages/activity/virtual-research-room/index.vue'),
  invitation: resolve(root, 'src/pages/activity/virtual-research-invitation/index.vue'),
  activityList: resolve(root, 'src/pages/activity/virtual-research-activity-list/index.vue'),
  ongoingDetail: resolve(root, 'src/pages/activity/virtual-research-activity-detail-ongoing/index.vue'),
  stageMaterial: resolve(root, 'src/pages/activity/virtual-research-award-management/index.vue'),
  stageSubmitted: resolve(root, 'src/pages/activity/virtual-research-stage-submitted/index.vue'),
  contributionConfirm: resolve(root, 'src/pages/activity/virtual-research-confirm-contribution/index.vue'),
  contributionSubmitted: resolve(root, 'src/pages/activity/virtual-research-contribution-submitted/index.vue'),
  supplement: resolve(root, 'src/pages/activity/virtual-research-supplement-material/index.vue'),
  resubmitted: resolve(root, 'src/pages/activity/virtual-research-resubmitted/index.vue'),
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
mustInclude('virtual research domain', domain, 'virtualLabStore.rooms')
mustInclude('virtual research domain', domain, 'virtualLabStore.activities')
mustInclude('virtual research domain', domain, 'virtualLabStore.records')
mustInclude('virtual research domain', domain, 'archiveStore.processingRecords')

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

const contributionSubmitted = source(files.contributionSubmitted)
mustInclude('contribution submitted page', contributionSubmitted, 'goResearchRoom')
mustInclude('contribution submitted page', contributionSubmitted, 'goContributionDetail')

const supplement = source(files.supplement)
mustInclude('supplement page', supplement, 'saveSupplementDraft')
mustInclude('supplement page', supplement, 'submitSupplementMaterial')

const resubmitted = source(files.resubmitted)
mustInclude('resubmitted page', resubmitted, 'goResearchRoom')
mustInclude('resubmitted page', resubmitted, 'goContributionDetail')

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

const coverageLedger = source(files.coverageLedger)
mustInclude('page coverage ledger', coverageLedger, '手机端虚拟教研闭环')

if (failures.length > 0) {
  console.error(`Virtual research business verification failed with ${failures.length} issue(s):`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Virtual research business verification passed.')
