<script setup lang="ts">
import MobileActionButton from '../../components/MobileActionButton.vue'
import MobileCard from '../../components/MobileCard.vue'
import MobilePageShell from '../../components/MobilePageShell.vue'
import {
  getArchiveCategorySummary,
  getArchiveOverviewStats,
  getArchiveRecordStatusLabel,
  getPendingArchiveRecords,
  getRecentArchiveRecords,
  type ConcreteArchiveCategoryKey,
} from '../../domain/archive'

type CategoryIcon = 'id' | 'book' | 'lab' | 'briefcase' | 'heart' | 'cup' | 'growth' | 'check'

const categories: Array<{
  key: ConcreteArchiveCategoryKey
  name: string
  icon: CategoryIcon
}> = [
  { key: 'basic-info', name: '基本信息', icon: 'id' },
  { key: 'teaching', name: '教学工作', icon: 'book' },
  { key: 'research', name: '教研科研', icon: 'lab' },
  { key: 'enterprise-practice', name: '企业实践', icon: 'briefcase' },
  { key: 'social-service', name: '社会服务', icon: 'heart' },
  { key: 'honor', name: '成果荣誉', icon: 'cup' },
  { key: 'personal-development', name: '个人发展', icon: 'growth' },
  { key: 'assessment', name: '考核评价', icon: 'check' },
]

const recentRecords = getRecentArchiveRecords()
const pendingRecords = getPendingArchiveRecords()
const stats = getArchiveOverviewStats()

function goArchiveQuery() {
  uni.navigateTo({ url: '/pages/archive/record-query/index' })
}

function goArchiveCategory(category: ConcreteArchiveCategoryKey) {
  uni.navigateTo({ url: `/pages/archive/category/index?category=${category}` })
}

function goArchiveList() {
  uni.navigateTo({ url: '/pages/archive/record-list/index?category=all' })
}

function goArchiveDraftList() {
  uni.navigateTo({ url: '/pages/archive/draft-list/index' })
}

function goArchiveRecord(record: { id: string }) {
  uni.navigateTo({
    url: `/pages/archive/record-detail/index?recordId=${record.id}`,
  })
}
</script>

<template>
  <MobilePageShell class="archive-page" active="archive">
    <view class="system-status" aria-hidden="true">
      <text class="system-status__time">9:41</text>
      <view class="system-status__icons">
        <view class="status-signal"></view>
        <view class="status-wifi"></view>
        <view class="status-battery"></view>
      </view>
    </view>

    <view class="page-head">
      <view class="page-head__copy">
        <text class="page-head__title">档案</text>
        <text class="page-head__subtitle">系统已帮你整理个人成长记录</text>
      </view>
      <button class="notice-button" aria-label="消息通知" @tap="goArchiveQuery">
        <view class="notice-button__bell">
          <view class="notice-button__badge">5</view>
        </view>
      </button>
      <view class="leaf-ghost" aria-hidden="true"></view>
    </view>

    <view class="search-card" @tap="goArchiveQuery">
      <view class="search-icon"></view>
      <text class="search-placeholder">输入关键词，或点右侧麦克风语音搜索</text>
      <view class="mic-icon"></view>
    </view>

    <MobileCard class="section-card overview-card">
      <text class="section-title">档案概览</text>
      <view class="overview-metrics">
        <view class="overview-item">
          <view class="metric-icon metric-icon--folder"></view>
          <view class="metric-copy">
            <text class="metric-number">{{ stats.archivedCount }}</text>
            <text class="metric-label">条已入档</text>
          </view>
        </view>
        <view class="overview-item">
          <view class="metric-icon metric-icon--grid"></view>
          <view class="metric-copy">
            <text class="metric-number">{{ stats.categoryCount }}</text>
            <text class="metric-label">类档案</text>
          </view>
        </view>
        <view class="overview-item overview-item--date" @tap="goArchiveDraftList">
          <view class="metric-icon metric-icon--clock"></view>
          <view class="metric-copy">
            <text class="metric-label">待确认</text>
            <text class="metric-number metric-number--date">{{ stats.pendingCount }}</text>
          </view>
        </view>
      </view>
      <text class="overview-desc">正式入档的记录会用于能力画像、岗位/聘期对照和个人报告。</text>
    </MobileCard>

    <MobileCard class="section-card category-card">
      <text class="section-title">档案分类</text>
      <view class="category-grid">
        <view
          v-for="item in categories"
          :key="item.key"
          class="category-item"
          @tap="goArchiveCategory(item.key)"
        >
          <view class="category-icon" :class="`category-icon--${item.icon}`"></view>
          <view class="category-title-line">
          <text class="category-name">{{ item.name }}</text>
            <view class="chevron"></view>
          </view>
          <text class="category-count">{{ getArchiveCategorySummary(item.key).count }} 条已入档</text>
          <text class="category-updated">最近更新 {{ getArchiveCategorySummary(item.key).updated }}</text>
        </view>
      </view>
    </MobileCard>

    <MobileCard class="section-card recent-card">
      <view class="section-head">
        <text class="section-title">最近入档</text>
        <MobileActionButton class="all-link" variant="link" arrow @tap="goArchiveList">
          查看全部
        </MobileActionButton>
      </view>
      <view
        v-for="record in recentRecords"
        :key="record.title"
        class="record-row"
        @tap="goArchiveRecord(record)"
      >
        <view class="record-icon"></view>
        <view class="record-body">
          <text class="record-title">{{ record.title }}</text>
          <text class="record-meta">{{ record.categoryName }} ｜ {{ record.date }} ｜ {{ getArchiveRecordStatusLabel(record.status) }}</text>
        </view>
        <view class="record-arrow"></view>
      </view>
    </MobileCard>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../styles/tokens.scss';

.archive-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 16rpx) 28rpx calc(150rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 14% 4%, rgba(223, 252, 239, 0.86), transparent 32%),
    linear-gradient(180deg, #fbfffd 0%, #f7fbff 52%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.system-status,
.system-status__icons,
.page-head,
.search-card,
.overview-metrics,
.overview-item,
.category-title-line,
.section-head,
.record-row {
  display: flex;
  align-items: center;
}

.system-status {
  height: 42rpx;
  justify-content: space-between;
  padding: 0 18rpx;
}

.system-status__time {
  color: #050812;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1;
}

.system-status__icons {
  gap: 14rpx;
}

.status-signal {
  width: 38rpx;
  height: 26rpx;
  background: #050812;
  clip-path: polygon(0 70%, 18% 70%, 18% 100%, 0 100%, 0 70%, 27% 52%, 45% 52%, 45% 100%, 27% 100%, 27% 52%, 54% 32%, 72% 32%, 72% 100%, 54% 100%, 54% 32%, 82% 10%, 100% 10%, 100% 100%, 82% 100%, 82% 10%);
}

.status-wifi {
  position: relative;
  width: 36rpx;
  height: 26rpx;
  border: 8rpx solid #050812;
  border-color: #050812 transparent transparent;
  border-radius: 50%;
}

.status-wifi::after {
  position: absolute;
  right: 7rpx;
  bottom: -9rpx;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #050812;
  content: '';
}

.status-battery {
  position: relative;
  width: 52rpx;
  height: 26rpx;
  border: 4rpx solid #050812;
  border-radius: 8rpx;
}

.status-battery::before {
  position: absolute;
  top: 4rpx;
  left: 4rpx;
  width: 38rpx;
  height: 10rpx;
  border-radius: 4rpx;
  background: #050812;
  content: '';
}

.status-battery::after {
  position: absolute;
  top: 6rpx;
  right: -9rpx;
  width: 5rpx;
  height: 12rpx;
  border-radius: 0 4rpx 4rpx 0;
  background: #050812;
  content: '';
}

.page-head {
  position: relative;
  justify-content: space-between;
  gap: 28rpx;
  padding: 42rpx 10rpx 34rpx;
}

.page-head__copy {
  position: relative;
  z-index: 1;
  min-width: 0;
  flex: 1;
}

.page-head__title {
  display: block;
  color: #080d1f;
  font-size: 68rpx;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.04;
}

.page-head__subtitle {
  display: block;
  margin-top: 14rpx;
  color: #35425e;
  font-size: 27rpx;
  line-height: 1.35;
}

.leaf-ghost {
  position: absolute;
  right: 70rpx;
  bottom: 6rpx;
  width: 210rpx;
  height: 126rpx;
  opacity: 0.12;
}

.leaf-ghost::before,
.leaf-ghost::after {
  position: absolute;
  bottom: 0;
  width: 78rpx;
  height: 126rpx;
  border-radius: 60rpx 60rpx 8rpx 60rpx;
  background: #55c78a;
  content: '';
}

.leaf-ghost::before {
  left: 34rpx;
  transform: rotate(-28deg);
}

.leaf-ghost::after {
  right: 22rpx;
  transform: rotate(24deg);
}

.notice-button,
.all-link {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.notice-button::after,
.all-link::after {
  display: none;
  border: 0;
}

.notice-button {
  position: relative;
  z-index: 1;
  width: 88rpx;
  height: 88rpx;
  flex: 0 0 88rpx;
}

.notice-button__bell {
  position: absolute;
  right: 8rpx;
  bottom: 8rpx;
  width: 58rpx;
  height: 58rpx;
  border: 6rpx solid #0d1430;
  border-top-color: transparent;
  border-radius: 50% 50% 20rpx 20rpx;
}

.notice-button__bell::before {
  position: absolute;
  top: -13rpx;
  left: 17rpx;
  width: 18rpx;
  height: 12rpx;
  border: 5rpx solid #0d1430;
  border-bottom: 0;
  border-radius: 18rpx 18rpx 0 0;
  content: '';
}

.notice-button__bell::after {
  position: absolute;
  right: 14rpx;
  bottom: -13rpx;
  width: 20rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #0d1430;
  content: '';
}

.notice-button__badge {
  position: absolute;
  top: -30rpx;
  right: -25rpx;
  display: flex;
  width: 48rpx;
  height: 48rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ff1f39;
  color: #fff;
  font-size: 27rpx;
  font-weight: 900;
}

.search-card {
  height: 76rpx;
  gap: 24rpx;
  padding: 0 34rpx;
  border: 1rpx solid rgba(231, 236, 246, 0.95);
  border-radius: 28rpx;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 18rpx 42rpx rgba(35, 51, 87, 0.06);
}

.search-placeholder {
  min-width: 0;
  flex: 1;
  overflow: hidden;
  color: #5e6982;
  font-size: 27rpx;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-icon {
  position: relative;
  width: 42rpx;
  height: 42rpx;
  flex: 0 0 42rpx;
  border: 5rpx solid #69738a;
  border-radius: 50%;
}

.search-icon::after {
  position: absolute;
  right: -11rpx;
  bottom: -8rpx;
  width: 18rpx;
  height: 5rpx;
  border-radius: 6rpx;
  background: #69738a;
  content: '';
  transform: rotate(45deg);
}

.mic-icon {
  position: relative;
  width: 36rpx;
  height: 46rpx;
  flex: 0 0 36rpx;
  border: 5rpx solid #69738a;
  border-top-width: 8rpx;
  border-radius: 20rpx;
}

.mic-icon::before {
  position: absolute;
  right: -11rpx;
  bottom: -8rpx;
  left: -11rpx;
  height: 26rpx;
  border: 5rpx solid #69738a;
  border-top: 0;
  border-radius: 0 0 20rpx 20rpx;
  content: '';
}

.mic-icon::after {
  position: absolute;
  bottom: -18rpx;
  left: 10rpx;
  width: 16rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #69738a;
  content: '';
}

.section-card {
  margin-top: 18rpx;
  padding: 26rpx 32rpx;
  border: 1rpx solid rgba(231, 236, 246, 0.95);
  border-radius: 32rpx;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 22rpx 52rpx rgba(35, 51, 87, 0.07);
}

.section-title {
  display: block;
  color: $teacher-mobile-text-primary;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.2;
}

.overview-metrics {
  justify-content: space-between;
  margin-top: 22rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid $teacher-mobile-card-border;
}

.overview-item {
  position: relative;
  flex: 1 1 0;
  gap: 20rpx;
  min-width: 0;
}

.overview-item + .overview-item {
  padding-left: 28rpx;
}

.overview-item + .overview-item::before {
  position: absolute;
  top: 11rpx;
  bottom: 11rpx;
  left: 0;
  width: 1rpx;
  background: $teacher-mobile-card-border;
  content: '';
}

.metric-icon {
  position: relative;
  display: flex;
  width: 64rpx;
  height: 64rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 64rpx;
  border-radius: 50%;
  background: #dff8eb;
  color: $teacher-mobile-primary;
}

.metric-icon::before {
  width: 34rpx;
  height: 28rpx;
  border-radius: 6rpx;
  background: currentColor;
  content: '';
}

.metric-icon--grid::before {
  width: 34rpx;
  height: 34rpx;
  border-radius: 4rpx;
  background:
    linear-gradient(currentColor 0 0) 0 0 / 14rpx 14rpx no-repeat,
    linear-gradient(currentColor 0 0) 20rpx 0 / 14rpx 14rpx no-repeat,
    linear-gradient(currentColor 0 0) 0 20rpx / 14rpx 14rpx no-repeat,
    linear-gradient(currentColor 0 0) 20rpx 20rpx / 14rpx 14rpx no-repeat;
}

.metric-icon--clock::before {
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
}

.metric-icon--clock::after {
  position: absolute;
  top: 22rpx;
  left: 34rpx;
  width: 5rpx;
  height: 22rpx;
  border-radius: 5rpx;
  background: #fff;
  box-shadow: 9rpx 15rpx 0 -2rpx #fff;
  content: '';
}

.metric-copy {
  min-width: 0;
}

.metric-number,
.metric-label {
  display: block;
}

.metric-number {
  color: #091024;
  font-size: 38rpx;
  font-weight: 500;
  line-height: 1.08;
}

.metric-number--date {
  margin-top: 8rpx;
  font-size: 32rpx;
}

.metric-label {
  margin-top: 8rpx;
  color: #4f5b74;
  font-size: 23rpx;
  line-height: 1.2;
}

.overview-desc {
  display: block;
  margin-top: 18rpx;
  color: #526079;
  font-size: 24rpx;
  line-height: 1.35;
}

.category-card {
  padding: 24rpx;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14rpx;
  margin-top: 22rpx;
}

.category-item {
  position: relative;
  min-width: 0;
  min-height: 158rpx;
  padding: 18rpx 10rpx 13rpx;
  border: 1rpx solid rgba(231, 236, 246, 0.95);
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 12rpx 30rpx rgba(35, 51, 87, 0.05);
}

.category-icon {
  position: relative;
  width: 58rpx;
  height: 58rpx;
  margin: 0 auto 17rpx;
  border-radius: 50%;
  background: #dff8eb;
  color: $teacher-mobile-primary;
}

.category-icon::before {
  position: absolute;
  top: 17rpx;
  left: 17rpx;
  width: 25rpx;
  height: 23rpx;
  border-radius: 6rpx;
  background: currentColor;
  content: '';
}

.category-icon--book::before {
  width: 25rpx;
  height: 25rpx;
  border-radius: 4rpx 12rpx 12rpx 4rpx;
  box-shadow: -9rpx 0 0 -2rpx currentColor;
}

.category-icon--lab::before {
  top: 13rpx;
  height: 34rpx;
  clip-path: polygon(35% 0, 65% 0, 65% 40%, 100% 100%, 0 100%, 35% 40%);
}

.category-icon--heart::before {
  top: 24rpx;
  clip-path: polygon(50% 100%, 8% 54%, 8% 22%, 28% 4%, 50% 20%, 72% 4%, 92% 22%, 92% 54%);
}

.category-icon--cup::before {
  border-radius: 6rpx 6rpx 12rpx 12rpx;
}

.category-icon--growth::before {
  clip-path: polygon(0 76%, 18% 76%, 18% 52%, 38% 52%, 38% 32%, 58% 32%, 58% 12%, 100% 12%, 100% 32%, 75% 32%, 75% 100%, 0 100%);
}

.category-icon--check::before {
  border-radius: 8rpx;
}

.category-title-line {
  justify-content: space-between;
  gap: 4rpx;
}

.category-name {
  overflow: hidden;
  color: #12182a;
  font-size: 23rpx;
  font-weight: 900;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chevron,
.record-arrow {
  width: 16rpx;
  height: 16rpx;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.chevron {
  flex: 0 0 16rpx;
  color: #7d8799;
}

.category-count,
.category-updated {
  display: block;
  color: #526079;
  font-size: 20rpx;
  line-height: 1.2;
}

.category-count {
  margin-top: 10rpx;
}

.category-updated {
  margin-top: 7rpx;
  color: #778197;
}

.section-head {
  justify-content: space-between;
  gap: 20rpx;
}

.all-link {
  gap: 8rpx;
  color: $teacher-mobile-primary-dark;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1;
}

.record-row {
  gap: 24rpx;
  min-height: 76rpx;
  padding: 17rpx 0;
  border-bottom: 1rpx solid $teacher-mobile-card-border;
}

.record-row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.record-icon {
  position: relative;
  width: 54rpx;
  height: 54rpx;
  flex: 0 0 54rpx;
  border-radius: 50%;
  background: #dff8eb;
}

.record-icon::before {
  position: absolute;
  top: 12rpx;
  left: 16rpx;
  width: 24rpx;
  height: 30rpx;
  border: 5rpx solid $teacher-mobile-primary;
  border-radius: 4rpx;
  content: '';
}

.record-icon::after {
  position: absolute;
  top: 22rpx;
  left: 25rpx;
  width: 16rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: $teacher-mobile-primary;
  box-shadow: 0 11rpx 0 $teacher-mobile-primary;
  content: '';
}

.record-body {
  min-width: 0;
  flex: 1;
}

.record-title {
  display: block;
  overflow: hidden;
  color: #12182a;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.record-meta {
  display: block;
  margin-top: 10rpx;
  color: #526079;
  font-size: 22rpx;
  line-height: 1.2;
}

.record-arrow {
  flex: 0 0 18rpx;
  color: #8b94a5;
}

@media (max-width: 374px) {
  .archive-page {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .overview-item {
    gap: 14rpx;
  }

  .overview-item + .overview-item {
    padding-left: 18rpx;
  }

  .metric-icon {
    width: 56rpx;
    height: 56rpx;
    flex-basis: 56rpx;
  }

  .metric-number {
    font-size: 34rpx;
  }

  .metric-label {
    font-size: 21rpx;
  }

  .category-grid {
    gap: 12rpx;
  }

  .category-item {
    min-height: 180rpx;
    padding-right: 8rpx;
    padding-left: 8rpx;
  }

  .category-name {
    font-size: 21rpx;
  }

  .category-count,
  .category-updated {
    font-size: 18rpx;
  }
}
</style>
