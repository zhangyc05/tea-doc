import { reactive } from 'vue'
import { findArchiveRecordById, type MobileArchiveRecord } from './archive'

export type VirtualResearchActivityStatus = '待确认' | '进行中' | '需补充' | '已归档'
export type VirtualResearchFilter = '全部' | VirtualResearchActivityStatus
export type VirtualResearchInvitationStatus = '待确认' | '已加入' | '暂不加入'
export type VirtualResearchContributionStatus = '待确认' | '已确认' | '不是我的' | '需补充' | '已提交'
export type VirtualResearchMaterialStatus = '草稿' | '已提交' | '需补充'

export type VirtualResearchActivity = {
  id: string
  title: string
  status: VirtualResearchActivityStatus
  detail: string
  adminStoreRefs: string[]
}

export type VirtualResearchContribution = {
  id: string
  activityId: string
  title: string
  status: VirtualResearchContributionStatus
  adminStoreRefs: string[]
}

export type MobileVirtualResearchState = {
  selectedFilter: VirtualResearchFilter
  invitationStatus: VirtualResearchInvitationStatus
  memberStatus: '已加入' | '未加入'
  roomAdminStoreRefs: string[]
  materialStatus: VirtualResearchMaterialStatus
  activities: VirtualResearchActivity[]
  contributions: VirtualResearchContribution[]
  operationMessage: string
}

const defaultActivityId = 'virtual-research-course-resource'
const defaultContributionId = 'virtual-research-course-resource-contribution'

const state = reactive<MobileVirtualResearchState>({
  selectedFilter: '全部',
  invitationStatus: '待确认',
  memberStatus: '未加入',
  roomAdminStoreRefs: ['virtualLabStore.rooms'],
  materialStatus: '草稿',
  activities: [
    {
      id: defaultActivityId,
      title: '智能制造课程资源共建研讨',
      status: '待确认',
      detail: 'AI 已识别你的 1 项贡献',
      adminStoreRefs: ['virtualLabStore.activities', 'virtualLabStore.records'],
    },
    {
      id: 'virtual-research-course-reform',
      title: '《智能制造基础》课程改革小组',
      status: '进行中',
      detail: '阶段任务：案例素材整理中',
      adminStoreRefs: ['virtualLabStore.activities'],
    },
    {
      id: 'virtual-research-digital-resource',
      title: '数字化教学资源建设研讨',
      status: '已归档',
      detail: '会议纪要已归档，个人贡献已确认',
      adminStoreRefs: ['virtualLabStore.records', 'teacherArchiveFacts'],
    },
    {
      id: 'virtual-research-industry-case',
      title: '产教融合案例开发讨论',
      status: '需补充',
      detail: '缺少阶段材料：案例附件',
      adminStoreRefs: ['virtualLabStore.activities', 'archiveStore.processingRecords'],
    },
  ],
  contributions: [
    {
      id: defaultContributionId,
      activityId: defaultActivityId,
      title: '设备调试案例整理',
      status: '待确认',
      adminStoreRefs: ['virtualLabStore.records'],
    },
  ],
  operationMessage: '',
})

export function getMobileVirtualResearchState(): MobileVirtualResearchState {
  return state
}

export function setVirtualResearchFilter(filter: VirtualResearchFilter): VirtualResearchFilter {
  state.selectedFilter = filter
  return filter
}

export function filteredResearchActivities(): VirtualResearchActivity[] {
  if (state.selectedFilter === '全部') return state.activities
  return state.activities.filter((activity) => activity.status === state.selectedFilter)
}

export function confirmResearchInvitation(): void {
  state.invitationStatus = '已加入'
  state.memberStatus = '已加入'
  state.operationMessage = '已加入虚拟教研室'
}

export function declineResearchInvitation(): void {
  state.invitationStatus = '暂不加入'
  state.operationMessage = '已暂不加入虚拟教研室'
}

export function saveStageMaterialDraft(activityId = defaultActivityId): VirtualResearchActivity {
  const activity = ensureActivity(activityId)
  state.materialStatus = '草稿'
  state.operationMessage = '阶段材料草稿已保存'
  return activity
}

export function submitStageMaterial(activityId = defaultActivityId): VirtualResearchActivity {
  const activity = ensureActivity(activityId)
  state.materialStatus = '已提交'
  activity.status = '待确认'
  activity.adminStoreRefs = ['virtualLabStore.activities', 'virtualLabStore.records']
  state.operationMessage = '阶段材料已提交，等待贡献识别'
  return activity
}

export function confirmContribution(contributionId = defaultContributionId): VirtualResearchContribution {
  const contribution = ensureContribution(contributionId)
  contribution.status = '已确认'
  contribution.adminStoreRefs = ['virtualLabStore.records']
  state.operationMessage = '个人贡献已确认'
  return contribution
}

export function rejectContribution(contributionId = defaultContributionId): VirtualResearchContribution {
  const contribution = ensureContribution(contributionId)
  contribution.status = '不是我的'
  contribution.adminStoreRefs = ['virtualLabStore.records']
  state.operationMessage = '已记录不是我的贡献'
  return contribution
}

export function saveSupplementDraft(activityId = 'virtual-research-industry-case'): VirtualResearchActivity {
  const activity = ensureActivity(activityId)
  state.materialStatus = '草稿'
  activity.status = '需补充'
  state.operationMessage = '补充材料草稿已保存'
  return activity
}

export function submitSupplementMaterial(activityId = 'virtual-research-industry-case'): VirtualResearchActivity {
  const activity = ensureActivity(activityId)
  state.materialStatus = '已提交'
  activity.status = '待确认'
  activity.adminStoreRefs = ['virtualLabStore.activities', 'virtualLabStore.records', 'archiveStore.processingRecords']
  state.operationMessage = '补充材料已重新提交'
  return activity
}

export function submitVirtualResearchArchive(): MobileArchiveRecord {
  const activity = ensureActivity(defaultActivityId)
  const contribution = ensureContribution(defaultContributionId)
  activity.status = '已归档'
  contribution.status = '已提交'
  activity.adminStoreRefs = ['virtualLabStore.records', 'archiveStore.processingRecords']
  contribution.adminStoreRefs = ['virtualLabStore.records']
  state.operationMessage = '教研记录已形成，等待成长档案确认'
  return findArchiveRecordById('virtual-research-smart-manufacturing') || findArchiveRecordById('virtual-research-course-resource-coconstruction')!
}

function ensureActivity(activityId: string): VirtualResearchActivity {
  const existing = state.activities.find((activity) => activity.id === activityId)
  if (existing) return existing

  const activity: VirtualResearchActivity = {
    id: activityId,
    title: '智能制造课程资源共建研讨',
    status: '进行中',
    detail: '阶段任务：案例素材整理中',
    adminStoreRefs: ['virtualLabStore.activities'],
  }
  state.activities.unshift(activity)
  return activity
}

function ensureContribution(contributionId: string): VirtualResearchContribution {
  const existing = state.contributions.find((contribution) => contribution.id === contributionId)
  if (existing) return existing

  const contribution: VirtualResearchContribution = {
    id: contributionId,
    activityId: defaultActivityId,
    title: '设备调试案例整理',
    status: '待确认',
    adminStoreRefs: ['virtualLabStore.records'],
  }
  state.contributions.unshift(contribution)
  return contribution
}
