<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { findTrainingDemandById, submitTrainingDemand } from '../../../domain/training'

type TrainingDemandResultQuery = {
  demandId?: string
}

const query = ref<TrainingDemandResultQuery>({})

onLoad((options) => {
  query.value = options as TrainingDemandResultQuery
})

const demand = computed(() => findTrainingDemandById(query.value.demandId) || submitTrainingDemand('found-training'))

const submitRows = [
  ['需求类型：', '我已找到想参加的培训'],
  ['培训名称：', '全国职业院校数字化教学能力提升研修班'],
  ['举办单位：', '职业教育教师发展中心'],
  ['培训时间：', '2026-06-18  至  2026-06-20'],
  ['培训地点 / 方式：', '南京  |  线下培训'],
  ['需求说明：', '希望参加本次研修班，重点学习数字化教学资源设计、课堂互动工具应用与学习数据反馈方法，后续结合《智能制造基础》课程进行实践。'],
]

function goBack() {
  uni.navigateBack()
}

function goTraining() {
  uni.navigateTo({ url: '/pages/activity/training/index' })
}

function goActivityHome() {
  uni.switchTab?.({ url: '/pages/activity/index' })
  uni.redirectTo({ url: '/pages/activity/index' })
}
</script>

<template>
  <view class="demand-result-page">
    <view class="page-head">
      <MobileNavbar title="培训需求" size="compact" @back="goBack" />
    </view>

    <view class="content">
      <MobileCard class="success-card">
        <view class="success-mark">
          <view class="success-mark__ring"></view>
          <view class="success-mark__check"></view>
        </view>
        <view class="success-card__copy">
          <text class="success-card__title">培训需求已提交</text>
          <text class="success-card__desc">你想参加的培训已提交给业务部门确认</text>
          <text class="status-pill">{{ demand.status }}</text>
        </view>
      </MobileCard>

      <MobileCard class="info-card">
        <view class="section-head">
          <view class="section-icon section-icon--doc"></view>
          <text class="section-title">提交内容</text>
        </view>
        <view class="submit-table">
          <view v-for="row in submitRows" :key="row[0]" class="submit-row">
            <text class="submit-row__label">{{ row[0] }}</text>
            <text class="submit-row__value">{{ row[1] }}</text>
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
          <view class="timeline-step timeline-step--done">
            <view class="timeline-step__dot">1</view>
            <view class="timeline-step__body">
              <text class="timeline-step__title">需求已提交</text>
              <text class="timeline-step__time">2026-03-08 10:30</text>
            </view>
          </view>
          <view class="timeline-step">
            <view class="timeline-step__dot">2</view>
            <view class="timeline-step__body">
              <text class="timeline-step__title">部门确认中</text>
              <text class="timeline-step__desc">{{ demand.nextStep }} 当前状态：待匹配</text>
            </view>
          </view>
          <view class="timeline-step">
            <view class="timeline-step__dot">3</view>
            <view class="timeline-step__body">
              <text class="timeline-step__title">匹配培训资源 / 确认结果</text>
              <text class="timeline-step__desc">确认结果将通过系统消息通知你</text>
            </view>
          </view>
        </view>
      </MobileCard>

      <view class="notice-box">
        <view class="notice-box__icon"></view>
        <view class="notice-box__copy">
          <text>确认结果会通过系统消息提醒你。</text>
          <text>确认前，这条需求不会作为正式培训记录进入成长档案。</text>
        </view>
      </view>

      <view class="page-actions">
        <MobileActionButton class="page-actions__button" variant="outline">查看提交内容</MobileActionButton>
        <MobileActionButton class="page-actions__button" variant="primary" @tap="goTraining">返回培训进修</MobileActionButton>
      </view>

      <button class="home-link" @tap="goActivityHome">返回活动首页</button>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.demand-result-page {
  min-height: 100vh;
  padding-bottom: calc(166rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 16% 2%, rgba(222, 252, 237, 0.78), transparent 30%),
    linear-gradient(180deg, #fbfffd 0%, #f7fbff 50%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.page-head {
  padding: calc(var(--status-bar-height) + 12rpx) 28rpx 8rpx;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 0 28rpx;
}

.success-card,
.info-card,
.progress-card {
  padding: 28rpx;
}

.success-card,
.section-head,
.submit-row,
.timeline-step,
.notice-box,
.page-actions {
  display: flex;
  align-items: center;
}

.success-card {
  gap: 32rpx;
  min-height: 176rpx;
}

.success-mark {
  position: relative;
  width: 142rpx;
  height: 142rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: rgba(14, 193, 101, 0.08);
}

.success-mark__ring {
  position: absolute;
  inset: 18rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #20ce72, #0aa956);
  box-shadow: 0 18rpx 42rpx rgba(7, 178, 86, 0.22);
}

.success-mark__check {
  position: absolute;
  top: 57rpx;
  left: 48rpx;
  width: 44rpx;
  height: 24rpx;
  border-bottom: 9rpx solid #fff;
  border-left: 9rpx solid #fff;
  transform: rotate(-45deg);
}

.success-card__copy {
  min-width: 0;
  flex: 1;
}

.success-card__title {
  display: block;
  color: #086238;
  font-size: 45rpx;
  font-weight: 900;
  line-height: 1.16;
}

.success-card__desc {
  display: block;
  margin-top: 12rpx;
  color: #4f5d78;
  font-size: 27rpx;
  line-height: 1.35;
}

.status-pill {
  display: inline-flex;
  height: 42rpx;
  align-items: center;
  margin-top: 16rpx;
  padding: 0 22rpx;
  border-radius: 14rpx;
  background: #e8f9ef;
  color: $teacher-mobile-primary-dark;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 42rpx;
}

.section-head {
  gap: 16rpx;
  margin-bottom: 22rpx;
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

.submit-table {
  border-top: 1rpx solid #e1e6ef;
}

.submit-row {
  align-items: flex-start;
  gap: 24rpx;
  padding: 18rpx 0;
  border-bottom: 1rpx solid #e1e6ef;
}

.submit-row__label {
  width: 170rpx;
  flex: 0 0 auto;
  color: #687287;
  font-size: 27rpx;
  line-height: 1.45;
}

.submit-row__value {
  min-width: 0;
  flex: 1;
  color: #11182f;
  font-size: 28rpx;
  font-weight: 700;
  line-height: 1.45;
}

.timeline {
  position: relative;
  padding: 2rpx 0 0 42rpx;
}

.timeline__track {
  position: absolute;
  top: 30rpx;
  bottom: 34rpx;
  left: 26rpx;
  width: 2rpx;
  background: #cad2de;
}

.timeline-step {
  position: relative;
  align-items: flex-start;
  gap: 28rpx;
  padding-bottom: 32rpx;
}

.timeline-step:last-child {
  padding-bottom: 0;
}

.timeline-step__dot {
  position: relative;
  z-index: 1;
  display: flex;
  width: 46rpx;
  height: 46rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border: 3rpx solid #cbd3de;
  border-radius: 50%;
  background: #fff;
  color: #1d2940;
  font-size: 24rpx;
  font-weight: 800;
}

.timeline-step--done .timeline-step__dot {
  border-color: $teacher-mobile-primary;
  background: $teacher-mobile-primary;
  color: #fff;
}

.timeline-step__title {
  display: block;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.35;
}

.timeline-step--done .timeline-step__title {
  color: $teacher-mobile-primary-dark;
}

.timeline-step__time,
.timeline-step__desc {
  display: block;
  margin-top: 6rpx;
  color: #657089;
  font-size: 26rpx;
  line-height: 1.38;
}

.notice-box {
  gap: 24rpx;
  padding: 22rpx 26rpx;
  border: 2rpx dashed rgba(14, 193, 101, 0.55);
  border-radius: 20rpx;
  background: rgba(235, 255, 243, 0.62);
}

.notice-box__icon {
  position: relative;
  width: 70rpx;
  height: 70rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #dff9e9;
}

.notice-box__icon::before {
  position: absolute;
  inset: 19rpx 22rpx;
  border: 5rpx solid $teacher-mobile-primary;
  border-top-color: transparent;
  border-radius: 17rpx 17rpx 10rpx 10rpx;
  content: '';
}

.notice-box__copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 8rpx;
  color: #1f7d4d;
  font-size: 27rpx;
  font-weight: 800;
  line-height: 1.45;
}

.page-actions {
  gap: 26rpx;
}

.page-actions__button {
  height: 68rpx;
  flex: 1;
  font-size: 30rpx;
}

.home-link {
  display: block;
  width: fit-content;
  margin: -2rpx auto 8rpx;
  padding: 0;
  border: 0;
  background: transparent;
  color: $teacher-mobile-primary-dark;
  font-size: 28rpx;
  font-weight: 700;
}

.home-link::after {
  display: none;
}

@media (max-width: 374px) {
  .page-head,
  .content {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .success-card,
  .info-card,
  .progress-card {
    padding: 24rpx;
  }

  .success-card {
    gap: 22rpx;
  }

  .success-mark {
    width: 112rpx;
    height: 112rpx;
  }

  .success-mark__check {
    top: 46rpx;
    left: 39rpx;
    width: 35rpx;
    height: 19rpx;
  }

  .success-card__title {
    font-size: 38rpx;
  }

  .submit-row__label {
    width: 140rpx;
  }

  .page-actions {
    gap: 18rpx;
  }

  .page-actions__button {
    font-size: 27rpx;
  }
}
</style>
