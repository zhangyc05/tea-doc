<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import MobileActionButton from '../../../../components/MobileActionButton.vue'
import MobileCard from '../../../../components/MobileCard.vue'
import MobileNavbar from '../../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../../components/MobileStatusTag.vue'
import { archiveRecords, findArchiveCorrectionById, findArchiveRecordById } from '../../../../domain/archive'

type SubmittedQuery = {
  recordId?: string
  correctionId?: string
  reason?: string
}

const query = ref<SubmittedQuery>({})

onLoad((options) => {
  query.value = options as SubmittedQuery
})

const record = computed(() => findArchiveRecordById(query.value.recordId) || archiveRecords[0])
const correction = computed(() => findArchiveCorrectionById(query.value.correctionId))
const reason = computed(() => correction.value?.reason || (query.value.reason ? decodeURIComponent(query.value.reason) : '字段信息有误'))

function goBack() {
  uni.navigateBack()
}

function goRecordDetail() {
  uni.navigateTo({
    url: `/pages/archive/record-detail/index?recordId=${record.value.id}`,
  })
}

function goCorrectionProgress() {
  uni.navigateTo({
    url: `/pages/archive/correction/progress/index?recordId=${record.value.id}&correctionId=${correction.value?.id || query.value.correctionId}&status=pending-verify`,
  })
}
</script>

<template>
  <MobilePageShell class="archive-correction-submitted-page" active="archive">
    <MobileNavbar title="更正已提交" size="compact" @back="goBack" />

    <MobileCard class="result-card">
      <view class="result-mark">
        <view class="result-mark__ring"></view>
        <view class="result-mark__check"></view>
      </view>
      <MobileStatusTag tone="orange">待核验</MobileStatusTag>
      <text class="result-title">更正申请已提交</text>
      <text class="result-desc">申请进入档案待核验队列，核验通过前不会直接改写正式档案事实。</text>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">申请记录</text>
      <view class="info-row">
        <text class="info-label">档案名称</text>
        <text class="info-value">{{ record.title }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">更正原因</text>
        <text class="info-value">{{ reason }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">当前状态</text>
        <text class="info-value">待核验</text>
      </view>
      <view class="info-row">
        <text class="info-label">档案分类</text>
        <text class="info-value">{{ record.categoryName }}</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">后续处理</text>
      <view class="progress-row">
        <view class="progress-index progress-index--done">1</view>
        <view class="progress-body">
          <text class="progress-title">提交申请</text>
          <text class="progress-desc">教师已提交更正原因和说明。</text>
        </view>
      </view>
      <view class="progress-row">
        <view class="progress-index progress-index--active">2</view>
        <view class="progress-body">
          <text class="progress-title">等待核验</text>
          <text class="progress-desc">后续由管理端或真实接口回写核验进度。</text>
        </view>
      </view>
      <view class="progress-row">
        <view class="progress-index">3</view>
        <view class="progress-body">
          <text class="progress-title">结果回写</text>
          <text class="progress-desc">通过、退回或需补充材料的结果页后续补齐。</text>
        </view>
      </view>
    </MobileCard>

    <view class="footer-actions">
      <MobileActionButton class="footer-button" variant="outline" @tap="goRecordDetail">
        查看原档案
      </MobileActionButton>
      <MobileActionButton class="footer-button" variant="primary" @tap="goCorrectionProgress">
        查看进度
      </MobileActionButton>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../../styles/tokens.scss';

.archive-correction-submitted-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 4rpx) 30rpx calc(206rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 15% 2%, rgba(255, 238, 214, 0.78), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 52%, #f7faf8 100%);
  color: #10172d;
}

.result-card,
.section-card {
  border-radius: 30rpx;
  box-shadow: 0 22rpx 52rpx rgba(35, 51, 87, 0.07);
}

.result-card {
  display: flex;
  align-items: center;
  margin-top: 28rpx;
  padding: 42rpx 34rpx;
  border: 2rpx solid rgba(255, 213, 176, 0.92);
  background: linear-gradient(112deg, #fff5ec 0%, #ffffff 100%);
  flex-direction: column;
  text-align: center;
}

.result-mark {
  position: relative;
  width: 128rpx;
  height: 128rpx;
  margin-bottom: 24rpx;
  border-radius: 38rpx;
  background: #ff8a2a;
  box-shadow: 0 22rpx 44rpx rgba(255, 138, 42, 0.24);
}

.result-mark__ring {
  position: absolute;
  inset: 22rpx;
  border: 6rpx solid rgba(255, 255, 255, 0.38);
  border-radius: 999rpx;
}

.result-mark__check {
  position: absolute;
  top: 48rpx;
  left: 42rpx;
  width: 42rpx;
  height: 22rpx;
  border-bottom: 8rpx solid #fff;
  border-left: 8rpx solid #fff;
  transform: rotate(-45deg);
}

.result-title {
  display: block;
  margin-top: 18rpx;
  color: #10172d;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.22;
}

.result-desc {
  display: block;
  margin-top: 12rpx;
  color: #526079;
  font-size: 26rpx;
  line-height: 1.46;
}

.section-card {
  margin-top: 18rpx;
  padding: 30rpx;
}

.section-title {
  display: block;
  color: #10172d;
  font-size: 30rpx;
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

.info-label,
.progress-desc {
  color: #66728a;
  font-size: 24rpx;
  line-height: 1.4;
}

.info-value {
  max-width: 430rpx;
  color: #10172d;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.36;
  text-align: right;
}

.progress-row {
  display: flex;
  gap: 18rpx;
  margin-top: 24rpx;
}

.progress-index {
  display: flex;
  width: 46rpx;
  height: 46rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 46rpx;
  border-radius: 16rpx;
  background: #edf2f7;
  color: #66728a;
  font-size: 22rpx;
  font-weight: 900;
}

.progress-index--done {
  background: #e7faef;
  color: #13a95b;
}

.progress-index--active {
  background: #fff0e6;
  color: #ff6c1a;
}

.progress-body {
  min-width: 0;
  flex: 1;
}

.progress-title {
  display: block;
  color: #10172d;
  font-size: 27rpx;
  font-weight: 900;
  line-height: 1.3;
}

.progress-desc {
  display: block;
  margin-top: 6rpx;
}

.footer-actions {
  position: fixed;
  right: 30rpx;
  bottom: calc(26rpx + env(safe-area-inset-bottom));
  left: 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
  padding: 18rpx;
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
