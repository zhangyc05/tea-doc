<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import MobileActionButton from '../../../../components/MobileActionButton.vue'
import MobileCard from '../../../../components/MobileCard.vue'
import MobileNavbar from '../../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../../components/MobileStatusTag.vue'
import { archiveRecords, findArchiveCorrectionById, findArchiveRecordById, updateArchiveCorrectionStatus } from '../../../../domain/archive'

type ProgressQuery = {
  recordId?: string
  correctionId?: string
  reason?: string
  status?: 'pending-verify' | 'supplemented'
}

const query = ref<ProgressQuery>({})

onLoad((options) => {
  query.value = options as ProgressQuery
})

const record = computed(() => findArchiveRecordById(query.value.recordId) || archiveRecords[0])
const correction = computed(() => findArchiveCorrectionById(query.value.correctionId))
const reason = computed(() => correction.value?.reason || (query.value.reason ? decodeURIComponent(query.value.reason) : '字段信息有误'))
const progressStatus = computed(() => query.value.status || 'pending-verify')
const statusLabel = computed(() => progressStatus.value === 'supplemented' ? '已补充' : '待核验')
const statusDesc = computed(() => progressStatus.value === 'supplemented'
  ? '补充材料已提交，等待再次核验。'
  : '更正申请已进入待核验队列，正式档案事实暂不改写。')

function goBack() {
  uni.navigateBack()
}

function goRecordDetail() {
  uni.navigateTo({
    url: `/pages/archive/record-detail/index?recordId=${record.value.id}`,
  })
}

function goCorrectionResult() {
  if (correction.value) updateArchiveCorrectionStatus(correction.value.id, 'need-supplement')
  uni.navigateTo({
    url: `/pages/archive/correction/result/index?recordId=${record.value.id}&correctionId=${correction.value?.id || query.value.correctionId}&result=need-supplement`,
  })
}

</script>

<template>
  <MobilePageShell class="archive-correction-progress-page" active="archive">
    <MobileNavbar title="更正进度" size="compact" @back="goBack" />

    <MobileCard class="summary-card">
      <view class="summary-icon">
        <view class="summary-icon__clock"></view>
      </view>
      <view class="summary-body">
        <MobileStatusTag tone="orange">{{ statusLabel }}</MobileStatusTag>
        <text class="summary-title">{{ record.title }}</text>
        <text class="summary-desc">{{ statusDesc }}</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">申请信息</text>
      <view class="info-row">
        <text class="info-label">档案分类</text>
        <text class="info-value">{{ record.categoryName }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">更正原因</text>
        <text class="info-value">{{ reason }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">来源记录</text>
        <text class="info-value">{{ record.source }}</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">处理进度</text>
      <view class="timeline">
        <view class="timeline-item">
          <view class="timeline-dot timeline-dot--done"></view>
          <view class="timeline-body">
            <view class="timeline-head">
              <text class="timeline-title">提交更正申请</text>
              <text class="timeline-time">已完成</text>
            </view>
            <text class="timeline-desc">教师已提交更正原因和说明，原档案仍保持当前状态。</text>
          </view>
        </view>
        <view v-if="progressStatus === 'supplemented'" class="timeline-item">
          <view class="timeline-dot timeline-dot--done"></view>
          <view class="timeline-body">
            <view class="timeline-head">
              <text class="timeline-title">补充材料</text>
              <text class="timeline-time">已完成</text>
            </view>
            <text class="timeline-desc">补充材料已提交，等待审核人员再次核验。</text>
          </view>
        </view>
        <view class="timeline-item">
          <view class="timeline-dot timeline-dot--active"></view>
          <view class="timeline-body">
            <view class="timeline-head">
              <text class="timeline-title">等待核验</text>
              <text class="timeline-time">进行中</text>
            </view>
            <text class="timeline-desc">后续由管理端或接口返回核验结果，本页不直接改写正式档案。</text>
          </view>
        </view>
        <view class="timeline-item">
          <view class="timeline-dot"></view>
          <view class="timeline-body">
            <view class="timeline-head">
              <text class="timeline-title">结果回写</text>
              <text class="timeline-time">待完成</text>
            </view>
            <text class="timeline-desc">可查看本地模拟处理结果，确认是否需要补充材料。</text>
          </view>
        </view>
      </view>
    </MobileCard>

    <view class="footer-actions">
      <MobileActionButton class="footer-button" variant="outline" @tap="goRecordDetail">
        查看原档案
      </MobileActionButton>
      <MobileActionButton class="footer-button" variant="primary" @tap="goCorrectionResult">
        查看处理结果
      </MobileActionButton>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../../styles/tokens.scss';

.archive-correction-progress-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 4rpx) 30rpx calc(220rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 13% 2%, rgba(232, 241, 255, 0.86), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 50%, #f7faf8 100%);
  color: #10172d;
}

.summary-card,
.section-card {
  border-radius: 30rpx;
  box-shadow: 0 22rpx 52rpx rgba(35, 51, 87, 0.07);
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 24rpx;
  margin-top: 28rpx;
  padding: 32rpx;
  border: 2rpx solid rgba(199, 222, 255, 0.94);
  background: linear-gradient(112deg, #eff6ff 0%, #ffffff 100%);
}

.summary-icon {
  position: relative;
  width: 118rpx;
  height: 118rpx;
  flex: 0 0 118rpx;
  border-radius: 34rpx;
  background: #1677ff;
  box-shadow: 0 20rpx 38rpx rgba(22, 119, 255, 0.2);
}

.summary-icon__clock {
  position: absolute;
  inset: 28rpx;
  border: 7rpx solid #fff;
  border-radius: 999rpx;
}

.summary-icon__clock::before,
.summary-icon__clock::after {
  position: absolute;
  left: 29rpx;
  bottom: 28rpx;
  border-radius: 999rpx;
  background: #fff;
  transform-origin: bottom center;
  content: '';
}

.summary-icon__clock::before {
  width: 6rpx;
  height: 24rpx;
}

.summary-icon__clock::after {
  width: 6rpx;
  height: 20rpx;
  transform: rotate(48deg);
}

.summary-body {
  min-width: 0;
  flex: 1;
}

.summary-title {
  display: block;
  margin-top: 16rpx;
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.3;
}

.summary-desc,
.info-label,
.timeline-time,
.timeline-desc {
  color: #66728a;
  font-size: 24rpx;
  line-height: 1.42;
}

.summary-desc {
  display: block;
  margin-top: 10rpx;
}

.section-card {
  margin-top: 18rpx;
  padding: 30rpx;
}

.section-title {
  display: block;
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.3;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 24rpx;
  padding: 22rpx 0;
  border-bottom: 1rpx solid $teacher-mobile-card-border;
}

.info-row:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.info-value {
  max-width: 430rpx;
  color: #10172d;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.36;
  text-align: right;
}

.timeline {
  margin-top: 22rpx;
}

.timeline-item {
  position: relative;
  display: flex;
  gap: 18rpx;
  padding-bottom: 26rpx;
}

.timeline-item::before {
  position: absolute;
  top: 42rpx;
  bottom: 0;
  left: 19rpx;
  width: 4rpx;
  border-radius: 999rpx;
  background: #e2e8f0;
  content: '';
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-item:last-child::before {
  display: none;
}

.timeline-dot {
  position: relative;
  z-index: 1;
  width: 42rpx;
  height: 42rpx;
  flex: 0 0 42rpx;
  border: 6rpx solid #e2e8f0;
  border-radius: 999rpx;
  background: #fff;
}

.timeline-dot--done {
  border-color: #13a95b;
  background: #13a95b;
}

.timeline-dot--active {
  border-color: #ff8a2a;
  background: #fff0e6;
}

.timeline-body {
  min-width: 0;
  flex: 1;
}

.timeline-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
}

.timeline-title {
  color: #10172d;
  font-size: 27rpx;
  font-weight: 900;
  line-height: 1.3;
}

.timeline-desc {
  display: block;
  margin-top: 8rpx;
}

.footer-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
  padding: 20rpx 32rpx calc(20rpx + env(safe-area-inset-bottom));
  border: 1rpx solid rgba(226, 232, 240, 0.9);
  border-radius: 28rpx;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 20rpx 50rpx rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(16rpx);
}

.footer-button {
  height: 82rpx;
  flex: 1;
  font-size: 28rpx;
}
</style>
