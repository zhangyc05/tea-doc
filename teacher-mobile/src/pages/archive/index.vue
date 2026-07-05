<script setup lang="ts">
import MobileActionButton from '../../components/MobileActionButton.vue'
import MobileCard from '../../components/MobileCard.vue'
import MobileIcon from '../../components/MobileIcon.vue'
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
    <view class="page-head">
      <view class="page-head__copy">
        <text class="page-head__title">档案</text>
        <text class="page-head__subtitle">系统已帮你整理个人成长记录</text>
      </view>
      <button class="notice-button" aria-label="消息通知" @tap="goArchiveQuery">
        <wd-badge class="notice-button__badge-wrap" :model-value="5" type="danger" :top="4" :right="4">
          <MobileIcon class="notice-button__icon" name="bell" tone="dark" size="md" shape="none" />
        </wd-badge>
      </button>
      <view class="leaf-ghost" aria-hidden="true"></view>
    </view>

    <view class="search-card" @tap="goArchiveQuery">
      <MobileIcon class="search-icon" name="search" tone="gray" size="plain" shape="none" />
      <text class="search-placeholder">输入关键词，或点右侧麦克风语音搜索</text>
      <MobileIcon class="mic-icon" name="sound" tone="gray" size="plain" shape="none" />
    </view>

    <MobileCard class="section-card overview-card">
      <text class="section-title">档案概览</text>
      <view class="overview-metrics">
        <view class="overview-item">
          <MobileIcon class="metric-icon" name="folder" tone="green" size="sm" shape="circle" />
          <view class="metric-copy">
            <text class="metric-number">{{ stats.archivedCount }}</text>
            <text class="metric-label">条已入档</text>
          </view>
        </view>
        <view class="overview-item">
          <MobileIcon class="metric-icon" name="grid" tone="green" size="sm" shape="circle" />
          <view class="metric-copy">
            <text class="metric-number">{{ stats.categoryCount }}</text>
            <text class="metric-label">类档案</text>
          </view>
        </view>
        <view class="overview-item overview-item--date" @tap="goArchiveDraftList">
          <MobileIcon class="metric-icon" name="clock" tone="green" size="sm" shape="circle" />
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
          <MobileIcon class="category-icon" :name="item.icon" tone="green" size="sm" shape="circle" />
          <view class="category-title-line">
          <text class="category-name">{{ item.name }}</text>
            <wd-icon class="chevron" name="chevron-right" size="24rpx" color="#7d8799" />
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
        <MobileIcon class="record-icon" name="file" tone="green" size="sm" shape="circle" />
        <view class="record-body">
          <text class="record-title">{{ record.title }}</text>
          <text class="record-meta">{{ record.categoryName }} ｜ {{ record.date }} ｜ {{ getArchiveRecordStatusLabel(record.status) }}</text>
        </view>
        <wd-icon class="record-arrow" name="chevron-right" size="28rpx" color="#8b94a5" />
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

.notice-button__badge-wrap {
  position: absolute;
  top: 16rpx;
  right: 14rpx;
  width: 58rpx;
  height: 58rpx;
}

.notice-button__icon {
  width: 58rpx;
  height: 58rpx;
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
  width: 42rpx;
  height: 42rpx;
  flex: 0 0 42rpx;
}

.mic-icon {
  width: 36rpx;
  height: 46rpx;
  flex: 0 0 36rpx;
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
  width: 64rpx;
  height: 64rpx;
  flex: 0 0 64rpx;
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
  width: 58rpx;
  height: 58rpx;
  margin: 0 auto 17rpx;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 54rpx;
  height: 54rpx;
  flex: 0 0 54rpx;
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
