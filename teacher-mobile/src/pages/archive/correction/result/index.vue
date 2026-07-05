<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import MobileActionButton from '../../../../components/MobileActionButton.vue'
import MobileCard from '../../../../components/MobileCard.vue'
import MobileNavbar from '../../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../../components/MobileStatusTag.vue'
import { archiveRecords, findArchiveCorrectionById, findArchiveRecordById } from '../../../../domain/archive'

type CorrectionResult = 'approved' | 'rejected' | 'need-supplement'

type ResultQuery = {
  recordId?: string
  correctionId?: string
  reason?: string
  result?: CorrectionResult
}

const query = ref<ResultQuery>({})

onLoad((options) => {
  query.value = options as ResultQuery
})

const record = computed(() => findArchiveRecordById(query.value.recordId) || archiveRecords[0])
const correction = computed(() => findArchiveCorrectionById(query.value.correctionId))
const reason = computed(() => correction.value?.reason || (query.value.reason ? decodeURIComponent(query.value.reason) : '字段信息有误'))
const result = computed<CorrectionResult>(() => query.value.result || 'need-supplement')

const resultView = computed(() => {
  if (result.value === 'approved') {
    return {
      tag: '已通过',
      tone: 'green' as const,
      title: '更正申请已通过',
      desc: '核验通过后，正式档案事实保持当前模拟结果态，后续以管理端核验结果同步为准。',
      action: '查看原档案',
    }
  }

  if (result.value === 'rejected') {
    return {
      tag: '未通过',
      tone: 'orange' as const,
      title: '更正申请未通过',
      desc: '本次申请未通过核验，原档案事实暂不调整。如仍有疑问，可后续重新发起申请。',
      action: '查看原档案',
    }
  }

  return {
      tag: '需补充',
      tone: 'orange' as const,
      title: '需要补充材料',
      desc: '审核人员需要更多材料佐证。请补充证明材料后再次提交核验。',
      action: '补充材料',
  }
})

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
    url: `/pages/archive/correction/progress/index?recordId=${record.value.id}&correctionId=${correction.value?.id || query.value.correctionId}&status=supplemented`,
  })
}

function goCorrectionSupplement() {
  uni.navigateTo({
    url: `/pages/archive/correction/supplement/index?recordId=${record.value.id}&correctionId=${correction.value?.id || query.value.correctionId}`,
  })
}

function goPrimaryAction() {
  if (result.value === 'need-supplement') {
    goCorrectionSupplement()
    return
  }

  goRecordDetail()
}
</script>

<template>
  <MobilePageShell class="archive-correction-result-page" active="archive">
    <MobileNavbar title="更正结果" size="compact" @back="goBack" />

    <MobileCard class="result-card" :class="`result-card--${result}`">
      <view class="result-mark" :class="`result-mark--${result}`">
        <view class="result-mark__symbol"></view>
      </view>
      <MobileStatusTag :tone="resultView.tone">{{ resultView.tag }}</MobileStatusTag>
      <text class="result-title">{{ resultView.title }}</text>
      <text class="result-desc">{{ resultView.desc }}</text>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">关联档案</text>
      <view class="info-row">
        <text class="info-label">档案名称</text>
        <text class="info-value">{{ record.title }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">档案分类</text>
        <text class="info-value">{{ record.categoryName }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">更正原因</text>
        <text class="info-value">{{ reason }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">处理口径</text>
        <text class="info-value">不直接改写正式档案事实</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">结果说明</text>
      <view class="notice-row">
        <view class="notice-dot"></view>
        <text class="notice-text">更正结果当前为本地模拟状态，正式档案状态以管理端核验结果为准。</text>
      </view>
      <view class="notice-row">
        <view class="notice-dot"></view>
        <text class="notice-text">“需补充”状态只表示材料不足，不代表原档案已经被修改。</text>
      </view>
    </MobileCard>

    <view class="footer-actions">
      <MobileActionButton class="footer-button" variant="outline" @tap="goRecordDetail">
        查看原档案
      </MobileActionButton>
      <MobileActionButton class="footer-button" variant="primary" @tap="goPrimaryAction">
        {{ resultView.action }}
      </MobileActionButton>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../../styles/tokens.scss';

.archive-correction-result-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 4rpx) 30rpx calc(206rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 14% 2%, rgba(255, 238, 214, 0.78), transparent 30%),
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
  border: 2rpx solid rgba(255, 213, 176, 0.9);
  background: linear-gradient(112deg, #fff5ec 0%, #ffffff 100%);
  flex-direction: column;
  text-align: center;
}

.result-card--approved {
  border-color: rgba(184, 239, 211, 0.94);
  background: linear-gradient(112deg, #edfff5 0%, #ffffff 100%);
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

.result-mark--approved {
  background: #13a95b;
  box-shadow: 0 22rpx 44rpx rgba(19, 169, 91, 0.22);
}

.result-mark__symbol {
  position: absolute;
  top: 48rpx;
  left: 42rpx;
  width: 42rpx;
  height: 22rpx;
  border-bottom: 8rpx solid #fff;
  border-left: 8rpx solid #fff;
  transform: rotate(-45deg);
}

.result-mark--need-supplement .result-mark__symbol,
.result-mark--rejected .result-mark__symbol {
  top: 34rpx;
  left: 60rpx;
  width: 8rpx;
  height: 54rpx;
  border: 0;
  border-radius: 999rpx;
  background: #fff;
  transform: none;
}

.result-mark--need-supplement .result-mark__symbol::after,
.result-mark--rejected .result-mark__symbol::after {
  position: absolute;
  bottom: -18rpx;
  left: -1rpx;
  width: 10rpx;
  height: 10rpx;
  border-radius: 999rpx;
  background: #fff;
  content: '';
}

.result-title {
  display: block;
  margin-top: 18rpx;
  color: #10172d;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.22;
}

.result-desc,
.info-label,
.notice-text {
  color: #66728a;
  font-size: 24rpx;
  line-height: 1.44;
}

.result-desc {
  display: block;
  margin-top: 12rpx;
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

.info-value {
  max-width: 430rpx;
  color: #10172d;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.36;
  text-align: right;
}

.notice-row {
  display: flex;
  gap: 14rpx;
  margin-top: 20rpx;
}

.notice-dot {
  width: 14rpx;
  height: 14rpx;
  flex: 0 0 14rpx;
  margin-top: 10rpx;
  border-radius: 999rpx;
  background: #ff8a2a;
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
