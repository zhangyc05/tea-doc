<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'
import {
  archiveCategorySummaries,
  getArchiveCategorySummary,
  getArchiveRecordsByCategory,
  getArchiveRecordStatusLabel,
  type ArchiveCategoryKey,
  type MobileArchiveRecord,
} from '../../../domain/archive'

const category = ref<ArchiveCategoryKey>('all')

onLoad((options) => {
  const input = options?.category as ArchiveCategoryKey | undefined
  if (input && archiveCategorySummaries[input]) {
    category.value = input
  }
})

const pageTitle = computed(() => getArchiveCategorySummary(category.value).title)

const filteredRecords = computed(() => getArchiveRecordsByCategory(category.value))

function goBack() {
  uni.navigateBack()
}

function goArchiveQuery() {
  uni.navigateTo({ url: '/pages/archive/record-query/index' })
}

function goRecord(record: MobileArchiveRecord) {
  uni.navigateTo({
    url: `/pages/archive/record-detail/index?recordId=${record.id}`,
  })
}
</script>

<template>
  <MobilePageShell class="archive-record-list-page" active="archive">
    <MobileNavbar :title="pageTitle" size="compact" @back="goBack" />

    <MobileCard class="summary-card">
      <view class="summary-copy">
        <text class="summary-title">{{ pageTitle }}</text>
        <text class="summary-desc">按入档事实查看记录，详情页承接来源、材料和引用用途。</text>
      </view>
      <view class="summary-count">
        <text class="summary-number">{{ filteredRecords.length }}</text>
        <text class="summary-label">条</text>
      </view>
    </MobileCard>

    <view class="toolbar">
      <view class="toolbar-chip toolbar-chip--active">全部状态</view>
      <view class="toolbar-chip">已入档</view>
      <view class="toolbar-chip">待确认</view>
      <MobileActionButton class="toolbar-search" variant="link" arrow @tap="goArchiveQuery">
        搜索
      </MobileActionButton>
    </view>

    <view class="record-list">
      <MobileCard
        v-for="record in filteredRecords"
        :key="record.id"
        class="record-card"
        @tap="goRecord(record)"
      >
        <view class="record-head">
          <MobileStatusTag :tone="record.status === 'archived' ? 'green' : 'orange'">
            {{ getArchiveRecordStatusLabel(record.status) }}
          </MobileStatusTag>
          <text class="record-date">{{ record.updatedAt }}</text>
        </view>
        <text class="record-title">{{ record.title }}</text>
        <view class="record-meta-grid">
          <view class="record-meta">
            <text class="record-meta-label">分类</text>
            <text class="record-meta-value">{{ record.categoryName }}</text>
          </view>
          <view class="record-meta">
            <text class="record-meta-label">类型</text>
            <text class="record-meta-value">{{ record.type }}</text>
          </view>
          <view class="record-meta record-meta--wide">
            <text class="record-meta-label">来源</text>
            <text class="record-meta-value">{{ record.source }}</text>
          </view>
        </view>
        <view class="record-foot">
          <text class="record-foot-text">查看档案详情</text>
          <view class="record-arrow"></view>
        </view>
      </MobileCard>

      <MobileCard v-if="filteredRecords.length === 0" class="empty-card">
        <text class="empty-title">该分类暂无记录</text>
        <text class="empty-desc">可以通过搜索查看跨分类记录，或等待待办、活动结果写入档案。</text>
        <MobileActionButton class="empty-button" variant="outline" @tap="goArchiveQuery">
          去搜索档案
        </MobileActionButton>
      </MobileCard>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.archive-record-list-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 4rpx) 30rpx calc(150rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 12% 2%, rgba(224, 250, 237, 0.82), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 50%, #f6fbf9 100%);
  color: #10172d;
}

.summary-card,
.record-card,
.empty-card {
  border-radius: 30rpx;
  box-shadow: 0 22rpx 52rpx rgba(35, 51, 87, 0.07);
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 22rpx;
  margin-top: 28rpx;
  padding: 30rpx;
  border-color: rgba(184, 239, 211, 0.92);
  background: linear-gradient(112deg, #edfff5 0%, #f8fffb 100%);
}

.summary-copy {
  min-width: 0;
  flex: 1;
}

.summary-title {
  display: block;
  color: #10172d;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.2;
}

.summary-desc,
.record-date,
.record-meta-label,
.empty-desc {
  color: #66728a;
  font-size: 24rpx;
  line-height: 1.38;
}

.summary-desc {
  display: block;
  margin-top: 12rpx;
}

.summary-count {
  display: flex;
  width: 112rpx;
  height: 112rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 112rpx;
  flex-direction: column;
  border-radius: 32rpx;
  background: #13a95b;
  color: #fff;
}

.summary-number {
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1;
}

.summary-label {
  margin-top: 6rpx;
  font-size: 22rpx;
  font-weight: 900;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 14rpx;
  margin-top: 18rpx;
  overflow-x: auto;
  padding-bottom: 4rpx;
}

.toolbar-chip {
  height: 54rpx;
  flex: 0 0 auto;
  padding: 0 20rpx;
  border: 1rpx solid rgba(224, 232, 244, 0.95);
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.9);
  color: #526079;
  font-size: 24rpx;
  font-weight: 900;
  line-height: 54rpx;
}

.toolbar-chip--active {
  border-color: #13a95b;
  background: #e7faef;
  color: #13864b;
}

.toolbar-search {
  height: 54rpx;
  flex: 0 0 auto;
  padding: 0 6rpx;
  font-size: 24rpx;
}

.record-list {
  margin-top: 16rpx;
}

.record-card {
  padding: 28rpx 30rpx;
}

.record-card + .record-card,
.empty-card {
  margin-top: 18rpx;
}

.record-head,
.record-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
}

.record-title {
  display: block;
  margin-top: 18rpx;
  color: #10172d;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.32;
}

.record-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16rpx;
  margin-top: 22rpx;
}

.record-meta {
  min-width: 0;
  padding: 18rpx;
  border-radius: 18rpx;
  background: #f7fafc;
}

.record-meta--wide {
  grid-column: 1 / -1;
}

.record-meta-label,
.record-meta-value {
  display: block;
}

.record-meta-value {
  margin-top: 8rpx;
  overflow: hidden;
  color: #10172d;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 1.26;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.record-foot {
  margin-top: 22rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid $teacher-mobile-card-border;
}

.record-foot-text {
  color: #13864b;
  font-size: 25rpx;
  font-weight: 900;
}

.record-arrow {
  width: 18rpx;
  height: 18rpx;
  border-top: 5rpx solid #13a95b;
  border-right: 5rpx solid #13a95b;
  transform: rotate(45deg);
}

.empty-card {
  padding: 42rpx 34rpx;
  text-align: center;
}

.empty-title {
  display: block;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
}

.empty-desc {
  display: block;
  margin-top: 12rpx;
}

.empty-button {
  height: 72rpx;
  margin-top: 28rpx;
  font-size: 28rpx;
}
</style>
