<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { findTrainingApplicationById, submitTrainingApplication, syncMobileTrainingApplicationResult } from '../../../domain/training'

type TrainingApplicationQuery = {
  applicationId?: string
  mode?: string
  result?: 'approved' | 'rejected'
}

const query = ref<TrainingApplicationQuery>({})

onLoad((options) => {
  query.value = options as TrainingApplicationQuery
  if (query.value.applicationId && query.value.result) {
    syncMobileTrainingApplicationResult(query.value.applicationId, query.value.result)
  }
})

const application = computed(() => findTrainingApplicationById(query.value.applicationId) || submitTrainingApplication())
const statusText = computed(() => {
  if (application.value.status === '已同意') return '已通过'
  if (application.value.status === '未同意') return '未通过'
  return '等待确认'
})
const progressSubText = computed(() => {
  if (query.value.result === 'approved' || application.value.status === '已同意') return '已同意，已进入我的培训'
  if (query.value.result === 'rejected' || application.value.status === '未同意') return '未同意，可查看申请详情'
  return '当前待处理'
})

const summaryRows = [
  { icon: 'type', text: '线下培训  |  需申请  |  3 天  |  24 学时' },
  { icon: 'date', text: '2026-04-12 至 2026-04-14' },
  { icon: 'place', text: '校内教师发展中心' },
  { icon: 'org', text: '组织单位：教师发展中心' },
]

const submittedItems = [
  'AI 申请理由',
  '当前任课信息  |  《智能制造基础》',
  '画像提升建议  |  项目化教学、课堂案例设计',
  '个人发展记录  |  已归档培训 2 条',
]

function goBack() {
  uni.navigateBack()
}

function goTraining() {
  uni.navigateTo({ url: '/pages/activity/training-list/index' })
}

function goActivityHome() {
  uni.redirectTo({ url: '/pages/activity/index' })
}

function goApplicationDetail() {
  uni.navigateTo({ url: `/pages/activity/training-application/index?applicationId=${application.value.id}&mode=detail` })
}
</script>

<template>
  <view class="application-page">
    <view class="hero">
      <MobileNavbar title="培训申请" size="compact" @back="goBack" />
      <text class="hero__subtitle">申请已提交，后续结果会通过系统消息提醒你</text>
      <view class="hero-art" aria-hidden="true">
        <view class="hero-art__paper"></view>
        <view class="hero-art__leaf hero-art__leaf--one"></view>
        <view class="hero-art__leaf hero-art__leaf--two"></view>
      </view>
    </view>

    <view class="content">
      <MobileCard class="success-card">
        <view class="success-badge">
          <view class="success-badge__check"></view>
          <view class="success-badge__leaf"></view>
        </view>
        <view class="success-copy">
          <text class="success-title">培训申请已提交</text>
          <text class="success-desc">你的申请已提交给业务部门确认</text>
          <view class="wait-tag">
            <view class="wait-tag__clock"></view>
            <text>{{ statusText }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="summary-card">
        <view class="section-head">
          <view class="section-icon section-icon--doc"></view>
          <text class="section-title">申请摘要</text>
        </view>
        <view class="summary-title-row">
          <view class="mini-icon mini-icon--file"></view>
          <text class="summary-title">{{ application.trainingName }}</text>
        </view>
        <view v-for="row in summaryRows" :key="row.text" class="summary-row">
          <view class="mini-icon" :class="`mini-icon--${row.icon}`"></view>
          <text>{{ row.text }}</text>
        </view>
        <text class="summary-note">申请理由已随申请一并提交</text>
      </MobileCard>

      <MobileCard class="submitted-card">
        <view class="section-head">
          <view class="section-icon section-icon--doc"></view>
          <text class="section-title">已提交内容</text>
        </view>
        <view v-for="item in submittedItems" :key="item" class="submitted-row">
          <view class="check-dot"></view>
          <text>{{ item }}</text>
        </view>
      </MobileCard>

      <MobileCard class="progress-card">
        <view class="section-head">
          <view class="section-icon section-icon--progress"></view>
          <text class="section-title">当前进度</text>
        </view>
        <wd-steps class="steps" :active="1" align-center>
          <wd-step title="申请已提交" description="已完成" status="finished" />
          <wd-step title="业务部门确认" :description="progressSubText" status="process" />
          <wd-step title="通过后参加培训" description="后续" />
        </wd-steps>
        <text class="progress-desc">确认结果会通过系统消息提醒你。通过后，可在“我的培训”中查看培训安排并记录学习过程。</text>
      </MobileCard>
    </view>

    <view class="bottom-actions">
        <MobileActionButton class="bottom-actions__button" variant="outline" @tap="goApplicationDetail">查看申请详情</MobileActionButton>
      <MobileActionButton class="bottom-actions__button bottom-actions__button--primary" variant="primary" @tap="goTraining">返回培训进修</MobileActionButton>
      <MobileActionButton class="bottom-actions__button bottom-actions__button--link" variant="link" @tap="goActivityHome">返回活动首页</MobileActionButton>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.application-page {
  min-height: 100vh;
  padding-bottom: calc(344rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 14% 0%, rgba(220, 252, 236, 0.9), transparent 32%),
    linear-gradient(180deg, #fbfffd 0%, #f7fbff 48%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  position: relative;
  min-height: 220rpx;
  padding: calc(var(--status-bar-height) + 14rpx) 28rpx 24rpx;
  overflow: hidden;
}

.hero__subtitle {
  position: relative;
  z-index: 1;
  display: block;
  max-width: 620rpx;
  margin: 8rpx auto 0;
  color: #4e5a74;
  font-size: 27rpx;
  font-weight: 600;
  line-height: 1.45;
  text-align: center;
}

.hero-art {
  position: absolute;
  right: 2rpx;
  bottom: 10rpx;
  z-index: 0;
  width: 210rpx;
  height: 132rpx;
  opacity: 0.62;
}

.hero-art__paper {
  position: absolute;
  right: 14rpx;
  bottom: 0;
  width: 132rpx;
  height: 82rpx;
  border: 8rpx solid rgba(92, 205, 146, 0.32);
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.58);
  transform: rotate(-28deg);
}

.hero-art__paper::before,
.hero-art__paper::after {
  position: absolute;
  left: 24rpx;
  height: 7rpx;
  border-radius: 10rpx;
  background: rgba(92, 205, 146, 0.34);
  content: '';
}

.hero-art__paper::before {
  top: 22rpx;
  width: 72rpx;
}

.hero-art__paper::after {
  top: 46rpx;
  width: 52rpx;
}

.hero-art__leaf {
  position: absolute;
  border-radius: 100% 0;
  background: rgba(62, 196, 124, 0.42);
}

.hero-art__leaf--one {
  top: 0;
  right: 18rpx;
  width: 50rpx;
  height: 72rpx;
  transform: rotate(-28deg);
}

.hero-art__leaf--two {
  top: 36rpx;
  right: -4rpx;
  width: 44rpx;
  height: 66rpx;
  transform: rotate(22deg);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 0 28rpx;
}

.success-card,
.summary-card,
.submitted-card,
.progress-card {
  padding: 30rpx;
}

.success-card,
.section-head,
.summary-title-row,
.summary-row,
.submitted-row,
.steps,
.bottom-actions,
.wait-tag {
  display: flex;
  align-items: center;
}

.success-card {
  gap: 34rpx;
  min-height: 186rpx;
}

.success-badge {
  position: relative;
  width: 112rpx;
  height: 112rpx;
  flex: 0 0 auto;
  border: 6rpx solid rgba(22, 201, 108, 0.34);
  border-radius: 50%;
  background: linear-gradient(135deg, #21d477, #0cb65b);
  box-shadow: 0 20rpx 42rpx rgba(13, 183, 91, 0.22);
}

.success-badge__check {
  position: absolute;
  top: 38rpx;
  left: 31rpx;
  width: 48rpx;
  height: 26rpx;
  border-bottom: 12rpx solid #fff;
  border-left: 12rpx solid #fff;
  border-radius: 3rpx;
  transform: rotate(-45deg);
}

.success-badge__leaf {
  position: absolute;
  right: -18rpx;
  bottom: -10rpx;
  width: 32rpx;
  height: 22rpx;
  border-radius: 100% 0;
  background: rgba(78, 199, 134, 0.38);
  transform: rotate(-25deg);
}

.success-copy {
  min-width: 0;
  flex: 1;
}

.success-title {
  display: block;
  color: #10172d;
  font-size: 44rpx;
  font-weight: 900;
  line-height: 1.2;
}

.success-desc {
  display: block;
  margin-top: 12rpx;
  color: #3e4c68;
  font-size: 28rpx;
  line-height: 1.35;
}

.wait-tag {
  width: fit-content;
  gap: 10rpx;
  margin-top: 18rpx;
  padding: 9rpx 18rpx;
  border-radius: 10rpx;
  background: #e8f9ef;
  color: $teacher-mobile-primary-dark;
  font-size: 26rpx;
  font-weight: 800;
}

.wait-tag__clock {
  position: relative;
  width: 25rpx;
  height: 25rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.wait-tag__clock::before {
  position: absolute;
  top: 4rpx;
  left: 9rpx;
  width: 4rpx;
  height: 9rpx;
  border-radius: 4rpx;
  background: currentColor;
  content: '';
}

.wait-tag__clock::after {
  position: absolute;
  top: 10rpx;
  left: 9rpx;
  width: 8rpx;
  height: 4rpx;
  border-radius: 4rpx;
  background: currentColor;
  content: '';
}

.section-head {
  gap: 16rpx;
  margin-bottom: 22rpx;
}

.section-title {
  color: #10172d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.2;
}

.section-icon {
  position: relative;
  width: 38rpx;
  height: 38rpx;
  flex: 0 0 auto;
  border-radius: 8rpx;
  background: $teacher-mobile-primary;
}

.section-icon::before {
  position: absolute;
  top: 10rpx;
  left: 10rpx;
  width: 18rpx;
  height: 5rpx;
  border-radius: 6rpx;
  background: #fff;
  box-shadow: 0 11rpx 0 #fff;
  content: '';
}

.section-icon--progress {
  border: 4rpx solid $teacher-mobile-primary;
  border-radius: 50%;
  background: #fff;
}

.section-icon--progress::before {
  top: 9rpx;
  left: 9rpx;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
  box-shadow: none;
}

.summary-title-row {
  gap: 18rpx;
  margin-bottom: 20rpx;
}

.summary-title {
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.3;
}

.summary-row {
  gap: 18rpx;
  min-height: 46rpx;
  color: #41506c;
  font-size: 27rpx;
  line-height: 1.45;
}

.summary-row + .summary-row {
  margin-top: 12rpx;
}

.summary-note {
  display: block;
  margin-top: 22rpx;
  color: #748098;
  font-size: 26rpx;
}

.mini-icon {
  position: relative;
  width: 28rpx;
  height: 28rpx;
  flex: 0 0 auto;
  color: #273a61;
}

.mini-icon--file {
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.mini-icon--file::before {
  position: absolute;
  top: 6rpx;
  left: 5rpx;
  width: 13rpx;
  height: 4rpx;
  border-radius: 4rpx;
  background: currentColor;
  box-shadow: 0 9rpx 0 currentColor;
  content: '';
}

.mini-icon--type {
  border: 4rpx solid $teacher-mobile-primary;
  border-radius: 50%;
}

.mini-icon--type::before {
  position: absolute;
  right: -3rpx;
  bottom: -3rpx;
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
  content: '';
}

.mini-icon--date {
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.mini-icon--date::before {
  position: absolute;
  top: 6rpx;
  right: 3rpx;
  left: 3rpx;
  height: 4rpx;
  background: currentColor;
  content: '';
}

.mini-icon--place::before {
  position: absolute;
  top: 1rpx;
  left: 4rpx;
  width: 18rpx;
  height: 18rpx;
  border: 4rpx solid currentColor;
  border-radius: 50% 50% 50% 0;
  content: '';
  transform: rotate(-45deg);
}

.mini-icon--org::before {
  position: absolute;
  top: 2rpx;
  left: 8rpx;
  width: 12rpx;
  height: 12rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
  content: '';
}

.mini-icon--org::after {
  position: absolute;
  right: 2rpx;
  bottom: 1rpx;
  left: 2rpx;
  height: 12rpx;
  border: 4rpx solid currentColor;
  border-top: 0;
  border-radius: 0 0 18rpx 18rpx;
  content: '';
}

.submitted-row {
  gap: 22rpx;
  min-height: 50rpx;
  color: #1f2c46;
  font-size: 27rpx;
  line-height: 1.45;
}

.submitted-row + .submitted-row {
  margin-top: 12rpx;
}

.check-dot {
  position: relative;
  width: 34rpx;
  height: 34rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.check-dot::before {
  position: absolute;
  top: 10rpx;
  left: 8rpx;
  width: 15rpx;
  height: 8rpx;
  border-bottom: 4rpx solid #fff;
  border-left: 4rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.progress-card {
  padding-bottom: 34rpx;
}

.steps {
  margin-top: 8rpx;
}

.steps :deep(.wd-step__title) {
  color: #19243a;
  font-size: 23rpx;
  font-weight: 800;
  line-height: 1.25;
}

.steps :deep(.wd-step__description) {
  margin-top: 8rpx;
  color: #8a94a8;
  font-size: 22rpx;
  line-height: 1.25;
}

.steps :deep(.wd-step.is-process .wd-step__description) {
  color: $teacher-mobile-primary-dark;
  font-weight: 900;
}

.steps :deep(.wd-step__icon) {
  color: $teacher-mobile-primary;
}

.progress-desc {
  display: block;
  margin-top: 34rpx;
  color: #42516e;
  font-size: 26rpx;
  line-height: 1.55;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: calc(138rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 45;
  gap: 22rpx;
  padding: 20rpx 28rpx 22rpx;
  border-radius: 28rpx 28rpx 0 0;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 -16rpx 42rpx rgba(31, 49, 86, 0.08);
}

.bottom-actions__button {
  height: 66rpx;
  flex: 1;
  font-size: 27rpx;
}

.bottom-actions__button--primary {
  flex: 1.18;
}

.bottom-actions__button--link {
  color: $teacher-mobile-primary-dark;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .success-card,
  .summary-card,
  .submitted-card,
  .progress-card {
    padding: 22rpx;
  }

  .success-card {
    gap: 22rpx;
  }

  .success-badge {
    width: 92rpx;
    height: 92rpx;
  }

  .success-badge__check {
    top: 31rpx;
    left: 25rpx;
    width: 40rpx;
    height: 22rpx;
    border-width: 10rpx;
  }

  .success-title {
    font-size: 34rpx;
  }

  .success-desc,
  .summary-row,
  .submitted-row,
  .progress-desc {
    font-size: 24rpx;
  }

  .steps {
    margin-top: 4rpx;
  }

  .steps :deep(.wd-step__title) {
    font-size: 21rpx;
  }

  .bottom-actions {
    gap: 12rpx;
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .bottom-actions__button {
    font-size: 23rpx;
  }
}
</style>
