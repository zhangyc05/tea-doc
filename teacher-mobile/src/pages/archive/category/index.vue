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
  type ArchiveCategoryKey,
} from '../../../domain/archive'

const category = ref<ArchiveCategoryKey>('personal-development')

onLoad((options) => {
  const input = options?.category as ArchiveCategoryKey | undefined
  if (input && archiveCategorySummaries[input]) {
    category.value = input
  }
})

const current = computed(() => getArchiveCategorySummary(category.value))

const records = computed(() => getArchiveRecordsByCategory(category.value))

function goBack() {
  uni.navigateBack()
}

function goRecordList() {
  uni.navigateTo({ url: `/pages/archive/record-list/index?category=${category.value}` })
}

function goRecord(recordId: string) {
  if (category.value === 'basic-info') {
    uni.navigateTo({
      url: `/pages/archive/basic-info-detail/index?recordId=${recordId}`,
    })
    return
  }

  uni.navigateTo({
    url: `/pages/archive/record-detail/index?recordId=${recordId}`,
  })
}
</script>

<template>
  <MobilePageShell class="archive-category-page" active="archive">
    <MobileNavbar title="档案分类" size="compact" @back="goBack" />

    <MobileCard class="hero-card">
      <view class="hero-copy">
        <MobileStatusTag tone="green">已入档</MobileStatusTag>
        <text class="hero-title">{{ current.title }}</text>
        <text class="hero-subtitle">{{ current.subtitle }}</text>
      </view>
      <view class="hero-metric">
        <text class="hero-number">{{ current.count }}</text>
        <text class="hero-label">条记录</text>
      </view>
    </MobileCard>

    <view class="metric-grid">
      <MobileCard class="metric-card">
        <text class="metric-label">最近更新</text>
        <text class="metric-value">{{ current.updated }}</text>
      </MobileCard>
      <MobileCard class="metric-card">
        <text class="metric-label">覆盖情况</text>
        <text class="metric-value metric-value--small">{{ current.coverage }}</text>
      </MobileCard>
    </view>

    <MobileCard class="section-card">
      <view class="section-head">
        <text class="section-title">重点内容</text>
        <MobileActionButton class="section-link" variant="link" arrow @tap="goRecordList">
          查看列表
        </MobileActionButton>
      </view>
      <view class="focus-list">
        <view v-for="item in current.focus" :key="item" class="focus-pill">{{ item }}</view>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <view class="section-head">
        <text class="section-title">近期记录</text>
        <text class="section-meta">{{ records.length }} 条</text>
      </view>
      <view
        v-for="record in records"
        :key="record.id"
        class="record-row"
        @tap="goRecord(record.id)"
      >
        <view class="record-dot"></view>
        <view class="record-body">
          <text class="record-title">{{ record.title }}</text>
          <text class="record-meta">{{ record.type }} ｜ {{ record.date }}</text>
        </view>
        <view class="record-arrow"></view>
      </view>
      <view v-if="records.length === 0" class="empty-state">
        <text class="empty-title">暂无近期记录</text>
        <text class="empty-desc">该分类的历史记录可先通过档案查询检索。</text>
      </view>
    </MobileCard>

    <MobileActionButton class="footer-button" variant="primary" @tap="goRecordList">
      查看全部记录
    </MobileActionButton>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.archive-category-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 4rpx) 30rpx calc(176rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 12% 2%, rgba(224, 250, 237, 0.86), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #f7fbff 52%, #f6fbf9 100%);
  color: #10172d;
}

.hero-card,
.section-card,
.metric-card {
  border-radius: 30rpx;
  box-shadow: 0 22rpx 52rpx rgba(35, 51, 87, 0.07);
}

.hero-card {
  display: flex;
  align-items: center;
  gap: 24rpx;
  margin-top: 28rpx;
  padding: 32rpx;
  border-color: rgba(184, 239, 211, 0.92);
  background: linear-gradient(112deg, #edfff5 0%, #f8fffb 100%);
}

.hero-copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 12rpx;
}

.hero-title {
  color: #10172d;
  font-size: 44rpx;
  font-weight: 900;
  line-height: 1.18;
}

.hero-subtitle {
  color: #526079;
  font-size: 26rpx;
  line-height: 1.42;
}

.hero-metric {
  display: flex;
  width: 128rpx;
  height: 128rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 128rpx;
  flex-direction: column;
  border-radius: 36rpx;
  background: #13a95b;
  color: #fff;
}

.hero-number {
  font-size: 44rpx;
  font-weight: 900;
  line-height: 1;
}

.hero-label {
  margin-top: 8rpx;
  font-size: 22rpx;
  font-weight: 800;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18rpx;
  margin-top: 18rpx;
}

.metric-card {
  padding: 24rpx 26rpx;
}

.metric-label,
.section-meta,
.record-meta,
.empty-desc {
  color: #66728a;
  font-size: 24rpx;
  line-height: 1.35;
}

.metric-value {
  display: block;
  margin-top: 10rpx;
  color: #10172d;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.08;
}

.metric-value--small {
  font-size: 30rpx;
  line-height: 1.22;
}

.section-card {
  margin-top: 18rpx;
  padding: 28rpx 30rpx;
}

.section-head,
.record-row {
  display: flex;
  align-items: center;
}

.section-head {
  justify-content: space-between;
  gap: 20rpx;
}

.section-title {
  color: #10172d;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.2;
}

.section-link {
  height: 44rpx;
  font-size: 25rpx;
}

.focus-list {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 22rpx;
}

.focus-pill {
  padding: 12rpx 18rpx;
  border-radius: 999rpx;
  background: #eef8f3;
  color: #14884d;
  font-size: 24rpx;
  font-weight: 900;
}

.record-row {
  gap: 20rpx;
  padding: 24rpx 0;
}

.record-row + .record-row {
  border-top: 1rpx solid $teacher-mobile-card-border;
}

.record-dot {
  width: 18rpx;
  height: 18rpx;
  flex: 0 0 18rpx;
  border-radius: 50%;
  background: #13a95b;
  box-shadow: 0 0 0 10rpx #e7faef;
}

.record-body {
  min-width: 0;
  flex: 1;
}

.record-title {
  display: block;
  overflow: hidden;
  color: #10172d;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.32;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.record-meta {
  display: block;
  margin-top: 8rpx;
}

.record-arrow {
  width: 20rpx;
  height: 20rpx;
  flex: 0 0 20rpx;
  border-top: 5rpx solid #9aa4b6;
  border-right: 5rpx solid #9aa4b6;
  transform: rotate(45deg);
}

.empty-state {
  padding: 34rpx 0 8rpx;
  text-align: center;
}

.empty-title {
  display: block;
  color: #10172d;
  font-size: 28rpx;
  font-weight: 900;
}

.empty-desc {
  display: block;
  margin-top: 10rpx;
}

.footer-button {
  position: fixed;
  right: 30rpx;
  bottom: calc(42rpx + env(safe-area-inset-bottom));
  left: 30rpx;
  height: 88rpx;
  font-size: 30rpx;
}
</style>
