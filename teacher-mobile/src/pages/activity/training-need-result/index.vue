<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { findTrainingDemandById, submitTrainingDemand, syncMobileTrainingDemandResult } from '../../../domain/training'

type TrainingNeedResultQuery = {
  demandId?: string
  result?: 'matched' | 'deferred' | 'application'
}

const query = ref<TrainingNeedResultQuery>({})
const pendingStatusLabel = '待匹配'

onLoad((options) => {
  query.value = options as TrainingNeedResultQuery
  if (query.value.demandId && query.value.result) {
    syncMobileTrainingDemandResult(query.value.demandId, query.value.result)
  }
})

const demand = computed(() => findTrainingDemandById(query.value.demandId) || submitTrainingDemand('ability-improvement'))
const demandProgressText = computed(() => `${demand.value.nextStep} 当前状态：${demand.value.status}`)

const submitRows = [
  { icon: 'person', label: '需求类型', value: '我想提升某项能力' },
  { icon: 'compass', label: '提升方向', value: '数字化教学应用' },
  {
    icon: 'doc',
    label: '需求说明',
    value: '希望参加数字化教学应用相关培训，重点学习在线测验、课堂互动工具的使用。',
  },
]

const progressSteps = [
  { title: '需求已提交', desc: '2026-03-08 10:30', done: true },
  { title: '部门确认中', desc: '业务部门将尽快确认你的需求' },
  { title: '匹配培训资源 / 确认结果', desc: '确认结果将通过系统消息通知你' },
]

function goBack() {
  uni.navigateBack()
}

function goTraining() {
  uni.navigateTo({ url: '/pages/activity/training/index' })
}

function goHome() {
  uni.switchTab?.({ url: '/pages/activity/index' })
  uni.redirectTo({ url: '/pages/activity/index' })
}
</script>

<template>
  <view class="need-result-page">
    <view class="hero">
      <MobileNavbar title="培训需求" size="compact" @back="goBack" />
      <view class="hero-art" aria-hidden="true">
        <view class="hero-art__paper"></view>
        <view class="hero-art__leaf hero-art__leaf--one"></view>
        <view class="hero-art__leaf hero-art__leaf--two"></view>
      </view>
    </view>

    <view class="content">
      <MobileCard class="success-card">
        <view class="success-mark"></view>
        <view class="success-copy">
          <text class="success-title">培训需求已提交</text>
          <text class="success-desc">你的需求已提交给业务部门确认</text>
          <view class="status-pill">
            <view class="clock-icon"></view>
            <text>{{ demand.status || pendingStatusLabel }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="submit-card">
        <view class="section-head">
          <view class="section-icon section-icon--doc"></view>
          <text class="section-title">提交内容</text>
        </view>
        <view class="submit-list">
          <view v-for="row in submitRows" :key="row.label" class="submit-row">
            <view class="row-icon" :class="`row-icon--${row.icon}`"></view>
            <text class="submit-row__label">{{ row.label }}</text>
            <text class="submit-row__value">{{ row.value }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="progress-card">
        <view class="section-head">
          <view class="section-icon section-icon--chart"></view>
          <text class="section-title">当前进度</text>
        </view>
        <view class="timeline">
          <view class="timeline__track"></view>
          <view v-for="(step, index) in progressSteps" :key="step.title" class="timeline-step" :class="{ 'timeline-step--done': step.done }">
            <view class="timeline-step__state">
              <view v-if="step.done" class="timeline-check"></view>
              <text v-else>{{ index + 1 }}</text>
            </view>
            <view class="timeline-step__dot"></view>
            <view class="timeline-step__body">
              <text class="timeline-step__title">{{ step.title }}</text>
              <text class="timeline-step__desc">{{ index === 1 ? demandProgressText : step.desc }}</text>
            </view>
          </view>
        </view>
      </MobileCard>

      <view class="notice-box">
        <view class="notice-icon"></view>
        <view class="notice-copy">
          <text>确认结果会通过系统消息提醒你。</text>
          <text>确认前，这条需求不会作为正式培训记录进入成长档案。</text>
        </view>
      </view>

      <view class="page-actions">
        <MobileActionButton class="page-action" variant="outline">查看提交内容</MobileActionButton>
        <MobileActionButton class="page-action" variant="primary" @tap="goTraining">返回培训进修</MobileActionButton>
      </view>
      <button class="home-link" @tap="goHome">返回活动首页</button>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.need-result-page {
  min-height: 100vh;
  padding-bottom: calc(330rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 16% 0%, rgba(220, 252, 236, 0.78), transparent 32%),
    linear-gradient(180deg, #fbfffd 0%, #f7fbff 48%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  position: relative;
  min-height: 164rpx;
  padding: calc(var(--status-bar-height) + 14rpx) 28rpx 18rpx;
  overflow: hidden;
}

.hero-art {
  position: absolute;
  top: 54rpx;
  right: 20rpx;
  width: 172rpx;
  height: 120rpx;
  opacity: 0.62;
}

.hero-art__paper {
  position: absolute;
  right: 16rpx;
  bottom: 6rpx;
  width: 116rpx;
  height: 72rpx;
  border: 8rpx solid rgba(90, 211, 148, 0.34);
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 0.62);
  transform: rotate(-28deg);
}

.hero-art__paper::before,
.hero-art__paper::after {
  position: absolute;
  left: 22rpx;
  height: 7rpx;
  border-radius: 10rpx;
  background: rgba(90, 211, 148, 0.42);
  content: '';
}

.hero-art__paper::before {
  top: 18rpx;
  width: 74rpx;
}

.hero-art__paper::after {
  top: 40rpx;
  width: 54rpx;
}

.hero-art__leaf {
  position: absolute;
  border-radius: 100% 0;
  background: rgba(64, 205, 130, 0.5);
}

.hero-art__leaf--one {
  top: 0;
  right: 8rpx;
  width: 48rpx;
  height: 34rpx;
  transform: rotate(36deg);
}

.hero-art__leaf--two {
  top: 32rpx;
  right: 46rpx;
  width: 42rpx;
  height: 30rpx;
  transform: rotate(72deg);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding: 0 28rpx;
}

.success-card,
.submit-card,
.progress-card {
  padding: 30rpx;
}

.success-card,
.section-head,
.submit-row,
.timeline-step,
.notice-box,
.page-actions,
.status-pill {
  display: flex;
  align-items: center;
}

.success-card {
  gap: 34rpx;
  min-height: 210rpx;
}

.success-mark {
  position: relative;
  width: 116rpx;
  height: 116rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: linear-gradient(135deg, #20ce72, #0aa956);
  box-shadow: 0 18rpx 40rpx rgba(7, 178, 86, 0.24);
}

.success-mark::before {
  position: absolute;
  top: 43rpx;
  left: 33rpx;
  width: 45rpx;
  height: 25rpx;
  border-bottom: 10rpx solid #fff;
  border-left: 10rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.success-copy {
  min-width: 0;
  flex: 1;
}

.success-title,
.success-desc,
.section-title,
.submit-row__label,
.submit-row__value,
.timeline-step__title,
.timeline-step__desc,
.notice-copy text {
  display: block;
}

.success-title {
  color: #10172d;
  font-size: 45rpx;
  font-weight: 900;
  line-height: 1.18;
}

.success-desc {
  margin-top: 16rpx;
  color: #52607a;
  font-size: 29rpx;
  line-height: 1.35;
}

.status-pill {
  width: fit-content;
  gap: 12rpx;
  margin-top: 20rpx;
  padding: 12rpx 22rpx;
  border-radius: 12rpx;
  background: #e8f9ef;
  color: $teacher-mobile-primary-dark;
  font-size: 28rpx;
  font-weight: 900;
}

.clock-icon {
  position: relative;
  width: 30rpx;
  height: 30rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.clock-icon::before {
  position: absolute;
  top: 6rpx;
  left: 12rpx;
  width: 4rpx;
  height: 10rpx;
  border-radius: 4rpx;
  background: currentColor;
  box-shadow: 6rpx 7rpx 0 -1rpx currentColor;
  content: '';
}

.section-head {
  gap: 16rpx;
  margin-bottom: 26rpx;
}

.section-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.section-icon {
  position: relative;
  width: 34rpx;
  height: 34rpx;
  flex: 0 0 auto;
  color: $teacher-mobile-primary;
}

.section-icon--doc {
  border-radius: 8rpx;
  background: currentColor;
}

.section-icon--doc::before {
  position: absolute;
  top: 8rpx;
  left: 9rpx;
  width: 16rpx;
  height: 4rpx;
  background: #fff;
  box-shadow: 0 10rpx 0 #fff, 0 20rpx 0 #fff;
  content: '';
}

.section-icon--chart::before {
  position: absolute;
  bottom: 2rpx;
  left: 2rpx;
  width: 7rpx;
  height: 18rpx;
  border-radius: 6rpx;
  background: currentColor;
  box-shadow: 12rpx -10rpx 0 currentColor, 24rpx -22rpx 0 currentColor;
  content: '';
}

.submit-row {
  gap: 24rpx;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #e1e6ef;
}

.submit-row:first-child {
  padding-top: 0;
}

.submit-row:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.row-icon {
  position: relative;
  width: 54rpx;
  height: 54rpx;
  flex: 0 0 auto;
  border-radius: 12rpx;
  background: #e9fbf1;
  color: $teacher-mobile-primary;
}

.row-icon::before {
  position: absolute;
  content: '';
}

.row-icon--person::before {
  top: 12rpx;
  left: 18rpx;
  width: 17rpx;
  height: 17rpx;
  border: 5rpx solid currentColor;
  border-radius: 50%;
}

.row-icon--person::after {
  position: absolute;
  right: 13rpx;
  bottom: 11rpx;
  left: 13rpx;
  height: 16rpx;
  border: 5rpx solid currentColor;
  border-top: 0;
  border-radius: 0 0 20rpx 20rpx;
  content: '';
}

.row-icon--compass::before {
  inset: 11rpx;
  border: 5rpx solid currentColor;
  border-radius: 50%;
}

.row-icon--compass::after {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  width: 16rpx;
  height: 16rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 100% 100%, 0 70%);
  content: '';
}

.row-icon--doc::before {
  inset: 12rpx 16rpx;
  border-radius: 4rpx;
  background: currentColor;
}

.submit-row__label {
  width: 140rpx;
  flex: 0 0 auto;
  color: #6c7891;
  font-size: 28rpx;
  line-height: 1.45;
}

.submit-row__value {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 29rpx;
  font-weight: 800;
  line-height: 1.45;
}

.timeline {
  position: relative;
  padding-left: 84rpx;
}

.timeline__track {
  position: absolute;
  top: 52rpx;
  bottom: 52rpx;
  left: 31rpx;
  width: 2rpx;
  border-left: 3rpx dashed #d4dbe6;
}

.timeline-step {
  position: relative;
  align-items: flex-start;
  gap: 26rpx;
  padding-bottom: 38rpx;
}

.timeline-step:last-child {
  padding-bottom: 0;
}

.timeline-step__state {
  display: flex;
  width: 48rpx;
  height: 48rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #eef3f9;
  color: #6c7891;
  font-size: 28rpx;
  font-weight: 900;
}

.timeline-step--done .timeline-step__state {
  background: $teacher-mobile-primary;
}

.timeline-check {
  width: 22rpx;
  height: 13rpx;
  border-bottom: 6rpx solid #fff;
  border-left: 6rpx solid #fff;
  transform: rotate(-45deg);
}

.timeline-step__dot {
  position: absolute;
  top: 61rpx;
  left: -57rpx;
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background: #d4dbe6;
}

.timeline-step__title {
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.35;
}

.timeline-step__desc {
  margin-top: 8rpx;
  color: #52607a;
  font-size: 26rpx;
  line-height: 1.4;
}

.notice-box {
  gap: 24rpx;
  padding: 28rpx;
  border: 2rpx solid rgba(14, 193, 101, 0.32);
  border-radius: 18rpx;
  background: rgba(245, 255, 250, 0.72);
}

.notice-icon {
  position: relative;
  width: 54rpx;
  height: 54rpx;
  flex: 0 0 auto;
  color: $teacher-mobile-primary;
}

.notice-icon::before {
  position: absolute;
  top: 12rpx;
  left: 16rpx;
  width: 22rpx;
  height: 25rpx;
  border: 5rpx solid currentColor;
  border-top-left-radius: 14rpx;
  border-top-right-radius: 14rpx;
  content: '';
}

.notice-icon::after {
  position: absolute;
  bottom: 6rpx;
  left: 21rpx;
  width: 12rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: currentColor;
  box-shadow: 0 8rpx 0 currentColor;
  content: '';
}

.notice-copy {
  min-width: 0;
  flex: 1;
  color: #24304a;
  font-size: 28rpx;
  line-height: 1.55;
}

.notice-copy text + text {
  margin-top: 8rpx;
}

.page-actions {
  position: fixed;
  right: 0;
  bottom: calc(198rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 48;
  gap: 34rpx;
  padding: 14rpx 28rpx;
  background: rgba(248, 252, 255, 0.88);
  backdrop-filter: blur(12rpx);
}

.page-action {
  height: 78rpx;
  flex: 1;
  border-radius: 16rpx;
  font-size: 31rpx;
}

.home-link {
  position: fixed;
  right: 0;
  bottom: calc(148rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 48;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #6d7891;
  font-size: 28rpx;
  font-weight: 700;
}

.home-link::after {
  display: none;
}

.home-link::before {
  order: 2;
  width: 14rpx;
  height: 14rpx;
  margin-left: 16rpx;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  content: '';
  transform: rotate(45deg);
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .success-card,
  .submit-card,
  .progress-card {
    padding: 24rpx;
  }

  .success-card {
    gap: 22rpx;
  }

  .success-mark {
    width: 90rpx;
    height: 90rpx;
  }

  .success-mark::before {
    top: 33rpx;
    left: 25rpx;
    width: 36rpx;
    height: 20rpx;
  }

  .success-title {
    font-size: 39rpx;
  }

  .success-desc,
  .submit-row__value {
    font-size: 26rpx;
  }

  .submit-row {
    gap: 16rpx;
  }

  .submit-row__label {
    width: 120rpx;
  }

  .timeline {
    padding-left: 70rpx;
  }

  .page-actions {
    gap: 20rpx;
  }

  .page-action {
    font-size: 28rpx;
  }
}
</style>
