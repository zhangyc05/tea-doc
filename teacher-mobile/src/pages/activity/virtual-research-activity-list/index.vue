<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import {
  filteredResearchActivities,
  getMobileVirtualResearchState,
  setVirtualResearchFilter,
  type VirtualResearchActivity,
  type VirtualResearchFilter,
} from '../../../domain/virtualResearch'

const summaryStats = [
  { value: '2', label: '待确认贡献', tone: 'orange' },
  { value: '1', label: '进行中', tone: 'blue' },
  { value: '1', label: '需补充材料', tone: 'amber' },
  { value: '2', label: '已归档', tone: 'green' },
]

const filters: Array<{ label: string; value: VirtualResearchFilter }> = [
  { label: '全部 (4)', value: '全部' },
  { label: '待确认 (2)', value: '待确认' },
  { label: '进行中 (1)', value: '进行中' },
  { label: '需补充 (1)', value: '需补充' },
  { label: '已归档 (2)', value: '已归档' },
]

const virtualResearchState = getMobileVirtualResearchState()
const activities = computed(() => filteredResearchActivities().map(toActivityView))
const activeFilter = computed({
  get: () => virtualResearchState.selectedFilter,
  set: (filter: VirtualResearchFilter) => setVirtualResearchFilter(filter),
})

function goBack() {
  uni.navigateBack()
}

function showFilterFeedback() {
  setVirtualResearchFilter('全部')
  uni.showToast({
    title: '活动筛选已重置为全部',
    icon: 'none',
  })
}

function showResearchRule() {
  uni.showModal({
    title: '贡献识别规则',
    content: '当前为本地 mock 规则说明：系统根据会议纪要、任务分工和材料来源识别贡献，真实规则服务后续接入。',
    showCancel: false,
  })
}

function goContributionConfirm() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-confirm-contribution/index' })
}

function goSupplementMaterial() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-supplement-material/index' })
}

function goActivityDetail(activityId = 'virtual-research-course-reform') {
  uni.navigateTo({ url: `/pages/activity/virtual-research-activity-detail-ongoing/index?activityId=${activityId}` })
}

function handleActivityAction(item: ReturnType<typeof toActivityView>) {
  if (item.status === '待确认') {
    goContributionConfirm()
    return
  }
  if (item.status === '需补充') {
    goSupplementMaterial()
    return
  }
  if (item.status === '进行中') {
    goActivityDetail(item.id)
    return
  }
  uni.navigateTo({ url: '/pages/archive/record-detail/index?recordId=virtual-research-course-resource-coconstruction' })
}

function toActivityView(activity: VirtualResearchActivity) {
  return {
    id: activity.id,
    status: activity.status,
    tone: getTone(activity.status),
    title: activity.title,
    time: '2026-05-22　14:00-16:30',
    team: '教研团队：智能制造专业群',
    detail: activity.detail,
    chip: activity.status === '待确认' ? '设备调试案例整理' : activity.status,
    tip: activity.status === '待确认' ? '请确认系统识别的贡献是否准确' : activity.status === '需补充' ? '补充后可提交入档' : '',
    next: activity.status === '进行中' ? '下次会议：2026-06-03（周二）14:00' : '',
    action: getAction(activity.status),
    icon: activity.status === '已归档' ? 'archive' : activity.status === '需补充' ? 'upload' : activity.status === '进行中' ? 'chart' : 'group',
  }
}

function getAction(status: VirtualResearchActivity['status']): string {
  if (status === '待确认') return '确认贡献'
  if (status === '需补充') return '补充材料'
  if (status === '已归档') return '查看记录'
  return '查看详情'
}

function getTone(status: VirtualResearchActivity['status']): string {
  if (status === '待确认') return 'orange'
  if (status === '需补充') return 'amber'
  if (status === '已归档') return 'green'
  return 'blue'
}
</script>

<template>
  <view class="activity-list-page">
    <MobileNavbar title="虚拟教研" size="compact" @back="goBack">
      <template #right>
        <button class="filter-button" @tap="showFilterFeedback">
          <view class="filter-icon"></view>
          <text>筛选</text>
        </button>
      </template>
    </MobileNavbar>

    <view class="content">
      <MobileCard class="summary-card">
        <view class="summary-illustration">
          <view class="board"></view>
          <view class="teacher"></view>
          <view class="student student--left"></view>
          <view class="student student--right"></view>
        </view>
        <view class="summary-main">
          <text class="summary-title">本学期参与 <text class="summary-count">4</text> 次教研活动</text>
          <view class="date-row">
            <text>时间范围：2026-03-01 至 2026-06-30</text>
            <view class="info-dot">i</view>
          </view>
          <view class="stat-grid">
            <view v-for="item in summaryStats" :key="item.label" class="stat-item">
              <text class="stat-value" :class="`stat-value--${item.tone}`">{{ item.value }}</text>
              <text class="stat-label">{{ item.label }}</text>
            </view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="todo-card">
        <view class="todo-title-row">
          <view class="todo-icon"></view>
          <text class="todo-title">当前需要处理</text>
        </view>
        <text class="todo-desc">系统已根据会议纪要识别出你的 2 项贡献，请确认是否准确。</text>
        <MobileActionButton class="todo-action" variant="primary" arrow @tap="goContributionConfirm">
          去确认
        </MobileActionButton>
      </MobileCard>

      <wd-tabs v-model="activeFilter" class="filter-tabs" color="#10b966" inactive-color="#344560" slidable="always" :line-width="0">
        <wd-tab
          v-for="item in filters"
          :key="item.value"
          :name="item.value"
          :title="item.label"
        />
      </wd-tabs>

      <view class="card-list">
        <MobileCard v-for="item in activities" :key="item.id" class="activity-card">
          <view class="status-ribbon" :class="`status-ribbon--${item.tone}`">{{ item.status }}</view>
          <view class="activity-icon" :class="[`activity-icon--${item.icon}`, `activity-icon--${item.tone}`]"></view>
          <view class="activity-body">
            <view class="activity-head">
              <text class="activity-title">{{ item.title }}</text>
              <wd-icon class="row-arrow" name="chevron-right" size="22rpx" color="#344560" />
            </view>
            <view class="meta-line">
              <view class="mini-icon mini-icon--calendar"></view>
              <text>{{ item.time }}</text>
              <text class="divider">|</text>
              <view class="mini-icon mini-icon--video"></view>
              <text>腾讯会议</text>
            </view>
            <view class="meta-line">
              <view class="mini-icon mini-icon--team"></view>
              <text>{{ item.team }}</text>
            </view>
            <view class="meta-line">
              <view class="mini-icon mini-icon--task"></view>
              <text>{{ item.detail }}</text>
              <text v-if="item.chip" class="inline-chip" :class="`inline-chip--${item.tone}`">{{ item.chip }}</text>
            </view>
            <view v-if="item.next" class="meta-line">
              <view class="mini-icon mini-icon--next"></view>
              <text>{{ item.next }}</text>
            </view>
            <view v-if="item.tip" class="tip-row" :class="`tip-row--${item.tone}`">
              <view class="tip-icon"></view>
              <text>{{ item.tip }}</text>
            </view>
            <MobileActionButton class="card-action" variant="outline" @tap="handleActivityAction(item)">
              {{ item.action }}
            </MobileActionButton>
          </view>
        </MobileCard>
      </view>

      <MobileCard class="rule-card">
        <view class="robot-icon"></view>
        <text class="rule-text">系统已从会议纪要、任务分工和成果材料中识别教研贡献，请确认并补充关键材料，形成可归档记录。</text>
        <button class="rule-link" @tap="showResearchRule">
          <text>了解规则</text>
          <wd-icon class="link-arrow" name="chevron-right" size="18rpx" color="#079653" />
        </button>
      </MobileCard>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.activity-list-page {
  min-height: 100vh;
  padding-bottom: calc(70rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 83% 6%, rgba(220, 249, 234, 0.68), transparent 26%),
    linear-gradient(180deg, #fdfffe 0%, #fff 42%, #f7fbfa 100%);
  color: #10172d;
}

.filter-button {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin: 0;
  padding: 0 28rpx 0 0;
  border: 0;
  background: transparent;
  color: #0b122a;
  font-size: 29rpx;
  font-weight: 700;
}

.filter-button::after {
  display: none;
}

.filter-icon {
  width: 34rpx;
  height: 30rpx;
  border: 4rpx solid currentColor;
  border-bottom: 0;
  clip-path: polygon(0 0, 100% 0, 62% 48%, 62% 100%, 38% 100%, 38% 48%);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding: 0 34rpx;
}

.summary-card {
  display: flex;
  gap: 34rpx;
  padding: 36rpx 32rpx 32rpx;
  border-radius: 18rpx;
  background: linear-gradient(108deg, rgba(245, 253, 249, 0.98), rgba(248, 253, 251, 0.9));
}

.summary-illustration {
  position: relative;
  flex: 0 0 auto;
  width: 150rpx;
  height: 150rpx;
  border-radius: 18rpx;
  background: linear-gradient(145deg, #f1fbf6, #e6f8ef);
}

.board,
.teacher,
.student,
.activity-icon,
.mini-icon,
.todo-icon,
.robot-icon,
.summary-illustration::before,
.summary-illustration::after,
.activity-icon::before,
.activity-icon::after,
.mini-icon::before,
.mini-icon::after,
.todo-icon::before,
.todo-icon::after,
.robot-icon::before,
.robot-icon::after {
  position: absolute;
  content: '';
}

.summary-illustration::before {
  right: 22rpx;
  top: 30rpx;
  width: 70rpx;
  height: 52rpx;
  border-radius: 8rpx;
  background: linear-gradient(180deg, #55d88a, #0caf58);
}

.summary-illustration::after {
  right: 38rpx;
  top: 48rpx;
  width: 34rpx;
  height: 20rpx;
  border-top: 6rpx solid #fff;
  border-right: 6rpx solid #fff;
  transform: rotate(45deg);
}

.teacher {
  left: 26rpx;
  bottom: 34rpx;
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  background: #29c76e;
  box-shadow: 0 38rpx 0 11rpx rgba(41, 199, 110, 0.95);
}

.student {
  bottom: 30rpx;
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  background: #65d996;
}

.student--left {
  left: 58rpx;
}

.student--right {
  right: 28rpx;
}

.board {
  right: 12rpx;
  bottom: 22rpx;
  left: 20rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #12a957;
}

.summary-main {
  min-width: 0;
  flex: 1;
}

.summary-title,
.summary-count,
.date-row,
.stat-value,
.stat-label,
.todo-title,
.todo-desc,
.activity-title,
.rule-text {
  display: block;
}

.summary-title {
  color: #10172d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.25;
}

.summary-count {
  display: inline;
  color: #079653;
  font-size: 42rpx;
}

.date-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-top: 22rpx;
  color: #344560;
  font-size: 25rpx;
  line-height: 1.3;
}

.info-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 28rpx;
  height: 28rpx;
  border: 3rpx solid #6b7690;
  border-radius: 50%;
  color: #6b7690;
  font-size: 20rpx;
  font-weight: 900;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 24rpx;
}

.stat-item {
  min-width: 0;
  border-left: 1rpx solid #dbe4ed;
  text-align: center;
}

.stat-item:first-child {
  border-left: 0;
}

.stat-value {
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1;
}

.stat-value--orange {
  color: #f97316;
}

.stat-value--blue {
  color: #1677ff;
}

.stat-value--amber {
  color: #f0a000;
}

.stat-value--green {
  color: #079653;
}

.stat-label {
  margin-top: 14rpx;
  color: #111827;
  font-size: 24rpx;
  font-weight: 700;
  line-height: 1.2;
}

.todo-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 24rpx;
  padding: 28rpx 32rpx;
  border-color: #d6efe3;
  border-radius: 18rpx;
  background: linear-gradient(105deg, #f2fcf7, #fbfffd);
}

.todo-title-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  color: #079653;
  white-space: nowrap;
}

.todo-icon {
  position: relative;
  width: 28rpx;
  height: 28rpx;
  border-radius: 6rpx;
  background: #14b866;
}

.todo-icon::after {
  left: 9rpx;
  top: 6rpx;
  width: 8rpx;
  height: 14rpx;
  border-right: 4rpx solid #fff;
  border-bottom: 4rpx solid #fff;
  transform: rotate(45deg);
}

.todo-title {
  font-size: 27rpx;
  font-weight: 900;
}

.todo-desc {
  color: #111827;
  font-size: 29rpx;
  line-height: 1.55;
}

.todo-action {
  min-width: 132rpx;
  height: 66rpx;
  border-radius: 10rpx;
  font-size: 27rpx;
}

.filter-tabs {
  padding: 2rpx 0 4rpx;
}

.filter-tabs :deep(.wd-tabs__nav) {
  gap: 18rpx;
}

.filter-tabs :deep(.wd-tabs__nav-container) {
  background: transparent;
}

.filter-tabs :deep(.wd-tabs__nav-item) {
  flex: 0 0 auto;
  height: 60rpx;
  margin: 0;
  padding: 0 28rpx;
  border: 0;
  border-radius: 18rpx;
  background: #f3f5f8;
  color: #344560;
  font-size: 27rpx;
  font-weight: 700;
  line-height: 60rpx;
}

.filter-tabs :deep(.wd-tabs__container),
.filter-tabs :deep(.wd-tabs__line) {
  display: none;
}

.filter-tabs :deep(.wd-tabs__nav-item.is-active) {
  border: 2rpx solid #10b966;
  background: #f3fff8;
  color: #079653;
  line-height: 56rpx;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.activity-card {
  position: relative;
  display: grid;
  grid-template-columns: 132rpx minmax(0, 1fr);
  gap: 24rpx;
  padding: 36rpx 28rpx 28rpx 150rpx;
  overflow: hidden;
  border-radius: 18rpx;
}

.status-ribbon {
  position: absolute;
  left: 0;
  top: 0;
  min-width: 110rpx;
  height: 62rpx;
  padding: 0 22rpx;
  border-radius: 0 0 18rpx 0;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 62rpx;
}

.status-ribbon--orange {
  background: #fff1e8;
  color: #f97316;
}

.status-ribbon--blue {
  background: #eaf3ff;
  color: #1677ff;
}

.status-ribbon--green {
  background: #eaf8f0;
  color: #079653;
}

.status-ribbon--amber {
  background: #fff4db;
  color: #f59e0b;
}

.activity-icon {
  left: 44rpx;
  top: 116rpx;
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
}

.activity-icon--orange {
  background: #eaf8f0;
  color: #10b966;
}

.activity-icon--blue {
  background: #eef5ff;
  color: #4f8ff7;
}

.activity-icon--green {
  background: #eaf8f0;
  color: #0ea85c;
}

.activity-icon--amber {
  background: #fff5df;
  color: #f6aa13;
}

.activity-icon--group::before {
  left: 30rpx;
  top: 24rpx;
  width: 36rpx;
  height: 28rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.activity-icon--group::after {
  left: 22rpx;
  bottom: 20rpx;
  width: 52rpx;
  height: 30rpx;
  border-radius: 24rpx 24rpx 8rpx 8rpx;
  background: currentColor;
}

.activity-icon--chart::before {
  left: 26rpx;
  top: 22rpx;
  width: 44rpx;
  height: 52rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.activity-icon--chart::after {
  left: 34rpx;
  top: 48rpx;
  width: 36rpx;
  height: 20rpx;
  border-top: 6rpx solid #fff;
  border-right: 6rpx solid #fff;
  transform: rotate(-12deg);
}

.activity-icon--archive::before {
  left: 26rpx;
  top: 28rpx;
  width: 46rpx;
  height: 38rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.activity-icon--archive::after {
  left: 42rpx;
  top: 36rpx;
  width: 14rpx;
  height: 24rpx;
  border-right: 6rpx solid #fff;
  border-bottom: 6rpx solid #fff;
  transform: rotate(45deg);
}

.activity-icon--upload::before {
  left: 26rpx;
  top: 34rpx;
  width: 44rpx;
  height: 34rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.activity-icon--upload::after {
  left: 43rpx;
  top: 22rpx;
  width: 12rpx;
  height: 34rpx;
  background: currentColor;
  box-shadow: -11rpx 7rpx 0 -4rpx currentColor, 11rpx 7rpx 0 -4rpx currentColor;
}

.activity-body {
  grid-column: 1 / -1;
  min-width: 0;
}

.activity-head {
  display: flex;
  align-items: center;
  gap: 18rpx;
}

.activity-title {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.24;
}

.row-arrow,
.link-arrow {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}

.meta-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 20rpx;
  color: #52617c;
  font-size: 27rpx;
  line-height: 1.28;
}

.mini-icon {
  position: relative;
  flex: 0 0 auto;
  width: 26rpx;
  height: 26rpx;
  color: #69748c;
}

.mini-icon--calendar::before,
.mini-icon--team::before,
.mini-icon--task::before,
.mini-icon--next::before {
  inset: 3rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.mini-icon--calendar::after {
  left: 6rpx;
  right: 6rpx;
  top: 10rpx;
  height: 3rpx;
  background: currentColor;
}

.mini-icon--video::before {
  left: 2rpx;
  top: 7rpx;
  width: 15rpx;
  height: 12rpx;
  border: 3rpx solid currentColor;
  border-radius: 3rpx;
}

.mini-icon--video::after {
  right: 1rpx;
  top: 9rpx;
  border-top: 6rpx solid transparent;
  border-bottom: 6rpx solid transparent;
  border-left: 7rpx solid currentColor;
}

.inline-chip {
  display: inline-flex;
  align-items: center;
  min-height: 40rpx;
  padding: 0 14rpx;
  border-radius: 12rpx;
  font-size: 22rpx;
  font-weight: 900;
}

.inline-chip--orange,
.inline-chip--green {
  background: #eaf8f0;
  color: #079653;
}

.inline-chip--blue {
  background: #eaf3ff;
  color: #1677ff;
}

.inline-chip--amber {
  background: #fff4db;
  color: #f59e0b;
}

.tip-row {
  display: inline-flex;
  align-items: center;
  gap: 10rpx;
  max-width: 100%;
  margin-top: 22rpx;
  padding: 14rpx 20rpx;
  border-radius: 10rpx;
  font-size: 25rpx;
  font-weight: 800;
  line-height: 1.25;
}

.tip-row--orange,
.tip-row--amber {
  background: #fff5e9;
  color: #f97316;
}

.tip-icon {
  flex: 0 0 auto;
  width: 26rpx;
  height: 26rpx;
  border: 3rpx solid currentColor;
  border-radius: 50%;
}

.card-action {
  float: right;
  min-width: 148rpx;
  height: 64rpx;
  margin-top: 18rpx;
  border-color: #10b966;
  border-radius: 10rpx;
  color: #079653;
  font-size: 27rpx;
}

.rule-card {
  display: grid;
  grid-template-columns: 64rpx minmax(0, 1fr) auto;
  align-items: center;
  gap: 22rpx;
  padding: 24rpx 28rpx;
  border-radius: 18rpx;
  background: linear-gradient(105deg, #f2fcf8, #fbfffd);
}

.robot-icon {
  position: relative;
  width: 50rpx;
  height: 42rpx;
  border-radius: 12rpx;
  background: #15b968;
}

.robot-icon::before {
  left: 11rpx;
  top: 14rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 20rpx 0 0 #fff;
}

.robot-icon::after {
  left: 21rpx;
  top: -10rpx;
  width: 8rpx;
  height: 10rpx;
  border-radius: 8rpx 8rpx 0 0;
  background: #15b968;
}

.rule-text {
  color: #10172d;
  font-size: 27rpx;
  line-height: 1.45;
}

.rule-link {
  display: flex;
  align-items: center;
  gap: 14rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #079653;
  font-size: 27rpx;
  font-weight: 900;
  white-space: nowrap;
}

.rule-link::after {
  display: none;
}

.link-arrow {
  width: 18rpx;
  height: 18rpx;
}

@media (max-width: 430px) {
  .content {
    gap: 20rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .summary-card {
    gap: 20rpx;
    padding: 28rpx 22rpx;
  }

  .summary-illustration {
    width: 126rpx;
    height: 126rpx;
  }

  .summary-title {
    font-size: 29rpx;
  }

  .summary-count {
    font-size: 36rpx;
  }

  .date-row {
    margin-top: 18rpx;
    font-size: 22rpx;
  }

  .stat-grid {
    margin-top: 20rpx;
  }

  .stat-value {
    font-size: 34rpx;
  }

  .stat-label {
    font-size: 21rpx;
  }

  .todo-card {
    gap: 18rpx;
    padding: 20rpx 22rpx;
  }

  .todo-desc {
    font-size: 25rpx;
  }

  .filter-tabs :deep(.wd-tabs__nav-item) {
    height: 56rpx;
    padding: 0 24rpx;
    font-size: 24rpx;
    line-height: 56rpx;
  }

  .filter-tabs :deep(.wd-tabs__nav-item.is-active) {
    line-height: 52rpx;
  }

  .activity-card {
    padding: 30rpx 18rpx 20rpx 134rpx;
  }

  .activity-title {
    font-size: 29rpx;
  }

  .activity-icon {
    left: 36rpx;
    top: 104rpx;
    width: 84rpx;
    height: 84rpx;
  }

  .meta-line {
    gap: 8rpx;
    margin-top: 17rpx;
    font-size: 23rpx;
  }

  .rule-card {
    grid-template-columns: 54rpx minmax(0, 1fr) auto;
    gap: 16rpx;
    padding: 22rpx;
  }

  .rule-text,
  .rule-link {
    font-size: 23rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .summary-card {
    align-items: flex-start;
    gap: 16rpx;
  }

  .summary-illustration {
    width: 104rpx;
    height: 104rpx;
  }

  .summary-title {
    font-size: 26rpx;
  }

  .stat-label {
    font-size: 19rpx;
  }

  .todo-card {
    grid-template-columns: 1fr auto;
  }

  .todo-title-row,
  .todo-desc {
    grid-column: 1 / -1;
  }

  .todo-action {
    grid-column: 2 / 3;
  }

  .activity-card {
    padding-left: 104rpx;
  }

  .activity-icon {
    left: 26rpx;
    width: 64rpx;
    height: 64rpx;
  }

  .status-ribbon {
    min-width: 94rpx;
    height: 54rpx;
    padding: 0 16rpx;
    font-size: 25rpx;
    line-height: 54rpx;
  }

  .card-action {
    min-width: 128rpx;
    font-size: 24rpx;
  }
}
</style>
