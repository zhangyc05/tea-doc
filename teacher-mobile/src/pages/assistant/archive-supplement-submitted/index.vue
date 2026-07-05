<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import { findArchiveRecordById } from '../../../domain/archive'

type SubmittedQuery = {
  recordId?: string
}

const query = ref<SubmittedQuery>({})

onLoad((options) => {
  query.value = options as SubmittedQuery
})

const archiveRecord = computed(() => findArchiveRecordById(query.value.recordId))
const processingQueueTrace = computed(() => archiveRecord.value?.processingQueueTrace)
const processingQueueLabel = computed(() => processingQueueTrace.value ? '档案处理队列' : '档案待确认')

function backAssistant() {
  uni.redirectTo({ url: '/pages/assistant/index' })
}

function goArchive() {
  uni.redirectTo({ url: `/pages/archive/record-detail/index?recordId=${archiveRecord.value?.id || query.value.recordId || 'ai-archive-supplement'}` })
}

function goPendingList() {
  uni.redirectTo({ url: '/pages/archive/draft-list/index' })
}
</script>

<template>
  <MobilePageShell class="submitted-page" active="assistant">
    <MobileCard class="result-card">
      <view class="result-mark">
        <view class="result-mark__check"></view>
      </view>
      <text class="result-title">补充材料已提交</text>
      <text class="result-desc">本次补充已生成待核验记录，确认后才会进入正式成长档案。</text>
    </MobileCard>

    <MobileCard class="status-card">
      <view class="status-row">
        <text>当前状态</text>
        <text>待核验</text>
      </view>
      <view class="status-row">
        <text>记录去向</text>
        <text>{{ archiveRecord?.categoryName || '档案待确认' }}</text>
      </view>
      <view v-if="processingQueueTrace" class="status-row">
        <text>处理队列</text>
        <text>{{ processingQueueLabel }}</text>
      </view>
      <view v-if="processingQueueTrace" class="status-row">
        <text>队列状态</text>
        <text>{{ processingQueueTrace.status }}</text>
      </view>
      <view class="status-row">
        <text>预计处理</text>
        <text>1-2 个工作日</text>
      </view>
    </MobileCard>

    <view class="action-group">
      <MobileActionButton class="action-button" variant="primary" @tap="goArchive">
        查看待核验记录
      </MobileActionButton>
      <MobileActionButton class="action-button" variant="outline" @tap="backAssistant">
        返回 AI 助手
      </MobileActionButton>
      <MobileActionButton class="action-button" variant="outline" @tap="goPendingList">
        查看档案待确认
      </MobileActionButton>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.submitted-page {
  --submitted-ink: #101d2e;
  padding-bottom: calc(170rpx + env(safe-area-inset-bottom));
}

.result-card,
.status-card {
  padding: 34rpx 30rpx;
}

.result-card {
  display: grid;
  justify-items: center;
  gap: 18rpx;
  margin-top: 60rpx;
  text-align: center;
}

.result-mark {
  position: relative;
  width: 132rpx;
  height: 132rpx;
  border-radius: 42rpx;
  background: linear-gradient(135deg, #17cb70, #06ad55);
  box-shadow: 0 24rpx 42rpx rgba(5, 174, 84, 0.24);
}

.result-mark__check {
  position: absolute;
  top: 42rpx;
  left: 38rpx;
  width: 54rpx;
  height: 30rpx;
  border-bottom: 8rpx solid #fff;
  border-left: 8rpx solid #fff;
  transform: rotate(-45deg);
}

.result-title {
  color: var(--submitted-ink);
  font-size: 42rpx;
  font-weight: 900;
}

.result-desc {
  max-width: 560rpx;
  color: $teacher-mobile-text-secondary;
  font-size: 26rpx;
  line-height: 1.5;
}

.status-card {
  margin-top: 24rpx;
}

.status-row {
  display: flex;
  min-height: 68rpx;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
  border-bottom: 1rpx solid rgba(226, 234, 245, 0.8);
  color: $teacher-mobile-text-secondary;
  font-size: 26rpx;
}

.status-row:last-child {
  border-bottom: 0;
}

.status-row text:last-child {
  color: var(--submitted-ink);
  font-weight: 900;
  text-align: right;
}

.action-group {
  display: grid;
  gap: 18rpx;
  margin-top: 30rpx;
}

.action-button {
  width: 100%;
  height: 88rpx;
  font-size: 28rpx;
}
</style>
