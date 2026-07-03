<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'
import {
  getArchiveRecordStatusLabel,
  getPendingArchiveRecords,
  type MobileArchiveRecord,
} from '../../../domain/archive'

const pendingRecords = getPendingArchiveRecords()

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
  <MobilePageShell class="archive-draft-list-page" active="archive">
    <MobileNavbar title="待确认档案" size="compact" @back="goBack" />

    <MobileCard class="summary-card">
      <view class="summary-copy">
        <text class="summary-title">待确认 / 待核验</text>
        <text class="summary-desc">这些记录已经由待办或活动流程提交，确认通过后才会成为正式档案事实。</text>
      </view>
      <view class="summary-count">
        <text class="summary-number">{{ pendingRecords.length }}</text>
        <text class="summary-label">条</text>
      </view>
    </MobileCard>

    <view class="record-list">
      <MobileCard
        v-for="record in pendingRecords"
        :key="record.id"
        class="record-card"
        @tap="goRecord(record)"
      >
        <view class="record-head">
          <MobileStatusTag tone="orange">{{ getArchiveRecordStatusLabel(record.status) }}</MobileStatusTag>
          <text class="record-date">{{ record.updatedAt }}</text>
        </view>
        <text class="record-title">{{ record.title }}</text>
        <text class="record-summary">{{ record.summary }}</text>
        <view class="record-meta-grid">
          <view class="record-meta">
            <text class="record-meta-label">分类</text>
            <text class="record-meta-value">{{ record.categoryName }}</text>
          </view>
          <view class="record-meta">
            <text class="record-meta-label">来源</text>
            <text class="record-meta-value">{{ record.source }}</text>
          </view>
        </view>
        <view class="record-foot">
          <text class="record-foot-text">查看确认进度</text>
          <view class="record-arrow"></view>
        </view>
      </MobileCard>

      <MobileCard v-if="pendingRecords.length === 0" class="empty-card">
        <text class="empty-title">暂无待确认记录</text>
        <text class="empty-desc">提交培训、企业实践或教研材料后，可在这里查看归档确认进度。</text>
        <MobileActionButton class="empty-button" variant="outline" @tap="goArchiveQuery">
          去搜索档案
        </MobileActionButton>
      </MobileCard>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.archive-draft-list-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 4rpx) 30rpx calc(150rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 12% 2%, rgba(255, 238, 214, 0.76), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 50%, #f7faf8 100%);
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
  border-color: rgba(255, 213, 176, 0.9);
  background: linear-gradient(112deg, #fff5ec 0%, #fffdf9 100%);
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
  background: #ff8a2a;
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

.record-list {
  margin-top: 18rpx;
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

.record-summary {
  display: block;
  margin-top: 12rpx;
  color: #526079;
  font-size: 25rpx;
  line-height: 1.42;
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
  color: #c95f13;
  font-size: 25rpx;
  font-weight: 900;
}

.record-arrow {
  width: 18rpx;
  height: 18rpx;
  border-top: 5rpx solid #ff8a2a;
  border-right: 5rpx solid #ff8a2a;
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
