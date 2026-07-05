<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { getMobileTrainingState, submitTrainingApplication } from '../../../domain/training'

const trainingState = getMobileTrainingState()

const recommendTrainings = computed(() => trainingState.resources.map((item, index) => ({
  id: item.id,
  title: item.title,
  meta: item.meta,
  reason: item.reason,
  action: item.action,
  icon: index === 0 ? 'video' : 'classroom',
  primary: item.action === '直接学习',
})))

const myTrainings = computed(() => trainingState.records.map((item, index) => ({
  id: item.id,
  title: item.title,
  status: item.status,
  desc: item.desc,
  action: item.status === '学习中' ? '记录学习' : '整理总结',
  icon: index === 0 ? 'book' : 'summary',
  active: item.status === '学习中',
})))

function goBack() {
  uni.navigateBack()
}

function goDemand() {
  uni.navigateTo({ url: '/pages/activity/training-demand/index' })
}

function goApplication(planId = 'project-course-workshop') {
  const application = submitTrainingApplication(planId)
  uni.navigateTo({ url: `/pages/activity/training-application/index?applicationId=${application.id}` })
}

function goSummary(recordId = 'digital-teaching-record') {
  uni.navigateTo({ url: `/pages/activity/training-summary/index?recordId=${recordId}` })
}

function startLearning(recordId = 'digital-teaching-record') {
  uni.navigateTo({ url: `/pages/activity/training-summary/index?recordId=${recordId}` })
}
</script>

<template>
  <view class="training-list-page">
    <view class="hero">
      <MobileNavbar title="培训进修" size="compact" @back="goBack" />
      <text class="hero__subtitle">查看适合你的培训，申请参加或记录学习过程</text>
      <view class="hero-art" aria-hidden="true">
        <view class="hero-art__book"></view>
        <view class="hero-art__leaf hero-art__leaf--one"></view>
        <view class="hero-art__leaf hero-art__leaf--two"></view>
        <view class="hero-art__dot"></view>
      </view>
    </view>

    <view class="content">
      <MobileCard class="recommend-card">
        <view class="section-head">
          <view class="section-icon section-icon--bookmark"></view>
          <view class="section-copy">
            <text class="section-title">适合你的培训</text>
            <text class="section-subtitle">根据你的能力画像和当前发展要求推荐</text>
          </view>
        </view>

        <view v-for="item in recommendTrainings" :key="item.title" class="recommend-item">
          <view class="course-icon" :class="`course-icon--${item.icon}`"></view>
          <view class="recommend-item__body">
            <text class="item-title">{{ item.title }}</text>
            <text class="item-meta">{{ item.meta }}</text>
            <view class="reason-line">
              <text class="reason-line__label">推荐原因：</text>
              <text class="reason-line__text">{{ item.reason }}</text>
            </view>
          </view>
          <MobileActionButton
            class="recommend-item__button"
            :variant="item.primary ? 'primary' : 'outline'"
            arrow
            @tap="item.primary ? startLearning() : goApplication(item.id)"
          >
            {{ item.action }}
          </MobileActionButton>
        </view>
      </MobileCard>

      <MobileCard class="mine-card">
        <view class="section-head section-head--compact">
          <view class="section-icon section-icon--cap"></view>
          <text class="section-title">我的培训</text>
        </view>

        <view v-for="(item, index) in myTrainings" :key="item.title" class="mine-item">
          <view class="course-icon course-icon--small" :class="`course-icon--${item.icon}`"></view>
          <view class="mine-item__body">
            <text class="item-title item-title--small">{{ item.title }}</text>
            <view class="mine-meta">
              <text class="mine-state" :class="{ 'mine-state--active': item.active }">{{ item.status }}</text>
              <text class="mine-divider">|</text>
              <text>{{ item.desc }}</text>
            </view>
          </view>
          <MobileActionButton
            class="mine-item__button"
            variant="outline"
            arrow
            @tap="goSummary(item.id)"
          >
            {{ item.action }}
          </MobileActionButton>
          <view v-if="index === 0" class="mine-separator"></view>
        </view>
      </MobileCard>

      <MobileCard class="empty-card">
        <view class="empty-card__icon">?</view>
        <view class="empty-card__copy">
          <text class="empty-card__title">没有合适培训？</text>
          <text class="empty-card__desc">可以提交培训需求，业务部门审核后纳入培训安排</text>
        </view>
        <MobileActionButton class="empty-card__button" variant="outline" arrow @tap="goDemand">提交培训需求</MobileActionButton>
      </MobileCard>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.training-list-page {
  min-height: 100vh;
  padding-bottom: calc(168rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 12% 0%, rgba(220, 252, 236, 0.9), transparent 32%),
    linear-gradient(180deg, #fbfffd 0%, #f7fbff 48%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  position: relative;
  min-height: 250rpx;
  padding: calc(var(--status-bar-height) + 18rpx) 28rpx 34rpx;
  overflow: hidden;
}

.hero__subtitle {
  position: relative;
  z-index: 1;
  display: block;
  max-width: 620rpx;
  margin: 12rpx auto 0;
  color: #4b5873;
  font-size: 28rpx;
  font-weight: 500;
  line-height: 1.45;
  text-align: center;
}

.hero-art {
  position: absolute;
  right: -12rpx;
  bottom: 12rpx;
  z-index: 0;
  width: 238rpx;
  height: 146rpx;
  opacity: 0.62;
}

.hero-art__book {
  position: absolute;
  right: 18rpx;
  bottom: 10rpx;
  width: 154rpx;
  height: 90rpx;
  border: 9rpx solid rgba(95, 205, 151, 0.28);
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.48);
  transform: rotate(-30deg);
}

.hero-art__book::before,
.hero-art__book::after {
  position: absolute;
  left: 30rpx;
  height: 8rpx;
  border-radius: 10rpx;
  background: rgba(95, 205, 151, 0.28);
  content: '';
}

.hero-art__book::before {
  top: 24rpx;
  width: 82rpx;
}

.hero-art__book::after {
  top: 50rpx;
  width: 56rpx;
}

.hero-art__leaf {
  position: absolute;
  border-radius: 100% 0;
  background: rgba(78, 199, 134, 0.42);
}

.hero-art__leaf--one {
  top: 0;
  right: 24rpx;
  width: 52rpx;
  height: 78rpx;
  transform: rotate(-28deg);
}

.hero-art__leaf--two {
  top: 44rpx;
  right: -2rpx;
  width: 46rpx;
  height: 70rpx;
  transform: rotate(24deg);
}

.hero-art__dot {
  position: absolute;
  top: 38rpx;
  left: 42rpx;
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  background: rgba(63, 199, 126, 0.18);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 28rpx;
  padding: 0 28rpx;
}

.recommend-card,
.mine-card,
.empty-card {
  padding: 30rpx;
}

.section-head,
.section-head--compact,
.recommend-item,
.mine-item,
.empty-card,
.reason-line,
.mine-meta {
  display: flex;
  align-items: center;
}

.section-head {
  gap: 20rpx;
  margin-bottom: 28rpx;
}

.section-head--compact {
  margin-bottom: 22rpx;
}

.section-copy {
  min-width: 0;
}

.section-title {
  display: block;
  color: #10172d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.2;
}

.section-subtitle {
  display: block;
  margin-top: 12rpx;
  color: #53627d;
  font-size: 26rpx;
  line-height: 1.35;
}

.section-icon {
  position: relative;
  width: 54rpx;
  height: 54rpx;
  flex: 0 0 auto;
  color: $teacher-mobile-primary;
}

.section-icon--bookmark {
  border-radius: 8rpx 8rpx 2rpx 2rpx;
  background: currentColor;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 76%, 0 100%);
}

.section-icon--bookmark::before {
  position: absolute;
  top: 14rpx;
  left: 16rpx;
  width: 22rpx;
  height: 22rpx;
  background: #fff;
  clip-path: polygon(50% 0, 63% 35%, 100% 35%, 70% 56%, 82% 94%, 50% 70%, 18% 94%, 30% 56%, 0 35%, 37% 35%);
  content: '';
}

.section-icon--cap {
  height: 42rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 100% 36%, 50% 72%, 0 36%);
}

.section-icon--cap::after {
  position: absolute;
  right: 10rpx;
  bottom: -4rpx;
  width: 34rpx;
  height: 18rpx;
  border-radius: 0 0 28rpx 28rpx;
  background: currentColor;
  content: '';
}

.recommend-item {
  position: relative;
  gap: 30rpx;
  min-height: 240rpx;
  padding: 36rpx 30rpx 112rpx;
  border: 1rpx solid rgba(232, 237, 245, 0.95);
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 16rpx 40rpx rgba(31, 49, 86, 0.07);
}

.recommend-item + .recommend-item {
  margin-top: 26rpx;
}

.recommend-item__body,
.mine-item__body,
.empty-card__copy {
  min-width: 0;
  flex: 1;
}

.item-title {
  display: block;
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.item-title--small {
  font-size: 30rpx;
}

.item-meta {
  display: block;
  margin-top: 20rpx;
  color: #53627d;
  font-size: 26rpx;
  line-height: 1.35;
}

.reason-line {
  margin-top: 18rpx;
  color: #4d5c77;
  font-size: 25rpx;
  line-height: 1.35;
}

.reason-line__label {
  flex: 0 0 auto;
  color: $teacher-mobile-primary-dark;
  font-weight: 900;
}

.reason-line__text {
  min-width: 0;
}

.recommend-item__button {
  position: absolute;
  right: 28rpx;
  bottom: 30rpx;
  width: 178rpx;
  height: 64rpx;
  gap: 12rpx;
  font-size: 28rpx;
}

.course-icon {
  position: relative;
  width: 122rpx;
  height: 122rpx;
  flex: 0 0 auto;
  border-radius: 28rpx;
  background: linear-gradient(135deg, #e6fff0, #dff8eb);
  color: $teacher-mobile-primary;
}

.course-icon--small {
  width: 86rpx;
  height: 86rpx;
  border-radius: 20rpx;
}

.course-icon::before,
.course-icon::after {
  position: absolute;
  content: '';
}

.course-icon--video::before {
  inset: 34rpx 26rpx 30rpx;
  border: 8rpx solid currentColor;
  border-radius: 8rpx;
}

.course-icon--video::after {
  top: 48rpx;
  left: 55rpx;
  width: 0;
  height: 0;
  border-top: 16rpx solid transparent;
  border-bottom: 16rpx solid transparent;
  border-left: 24rpx solid currentColor;
}

.course-icon--classroom::before {
  top: 28rpx;
  left: 26rpx;
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 42rpx 0 currentColor, 30rpx 42rpx 0 currentColor, 60rpx 42rpx 0 currentColor;
}

.course-icon--classroom::after {
  top: 28rpx;
  right: 20rpx;
  width: 44rpx;
  height: 34rpx;
  border: 7rpx solid currentColor;
  border-radius: 6rpx;
}

.course-icon--book::before {
  top: 22rpx;
  left: 20rpx;
  width: 48rpx;
  height: 50rpx;
  border: 6rpx solid currentColor;
  border-radius: 8rpx 2rpx 2rpx 8rpx;
  box-shadow: 28rpx 0 0 -6rpx #dff8eb, 28rpx 0 0 0 currentColor;
}

.course-icon--book::after {
  right: 22rpx;
  bottom: 20rpx;
  width: 7rpx;
  height: 50rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.course-icon--small.course-icon--book::before {
  top: 18rpx;
  left: 16rpx;
  width: 34rpx;
  height: 36rpx;
  border-width: 5rpx;
  box-shadow: 22rpx 0 0 -5rpx #dff8eb, 22rpx 0 0 0 currentColor;
}

.course-icon--small.course-icon--book::after {
  right: 16rpx;
  bottom: 16rpx;
  width: 6rpx;
  height: 36rpx;
}

.course-icon--summary::before {
  inset: 18rpx 24rpx;
  border: 7rpx solid currentColor;
  border-radius: 8rpx;
}

.course-icon--summary::after {
  right: 14rpx;
  bottom: 12rpx;
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: inset 0 0 0 7rpx #dff8eb;
}

.course-icon--small.course-icon--summary::before {
  inset: 16rpx 20rpx;
  border-width: 5rpx;
}

.course-icon--small.course-icon--summary::after {
  right: 10rpx;
  bottom: 10rpx;
  width: 24rpx;
  height: 24rpx;
  box-shadow: inset 0 0 0 6rpx #dff8eb;
}

.mine-item {
  position: relative;
  gap: 24rpx;
  min-height: 116rpx;
}

.mine-item + .mine-item {
  margin-top: 28rpx;
  padding-top: 28rpx;
  border-top: 1rpx solid #edf1f7;
}

.mine-meta {
  gap: 14rpx;
  margin-top: 12rpx;
  color: #53627d;
  font-size: 25rpx;
  line-height: 1.35;
}

.mine-state {
  color: #53627d;
}

.mine-state--active {
  color: $teacher-mobile-primary-dark;
  font-weight: 900;
}

.mine-divider {
  color: #9ca7ba;
}

.mine-item__button {
  width: 174rpx;
  height: 60rpx;
  gap: 10rpx;
  flex: 0 0 auto;
  font-size: 28rpx;
}

.empty-card {
  gap: 24rpx;
  min-height: 144rpx;
}

.empty-card__icon {
  display: flex;
  width: 82rpx;
  height: 82rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #e8fff0;
  color: $teacher-mobile-primary-dark;
  font-size: 54rpx;
  font-weight: 900;
}

.empty-card__title {
  display: block;
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.empty-card__desc {
  display: block;
  margin-top: 10rpx;
  color: #53627d;
  font-size: 26rpx;
  line-height: 1.45;
}

.empty-card__button {
  width: 212rpx;
  height: 64rpx;
  gap: 10rpx;
  flex: 0 0 auto;
  font-size: 27rpx;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .recommend-card,
  .mine-card,
  .empty-card {
    padding: 22rpx;
  }

  .recommend-item {
    gap: 18rpx;
    padding: 26rpx 22rpx 104rpx;
  }

  .course-icon {
    width: 96rpx;
    height: 96rpx;
  }

  .course-icon--small {
    width: 72rpx;
    height: 72rpx;
  }

  .item-title {
    font-size: 29rpx;
  }

  .item-meta,
  .reason-line,
  .mine-meta,
  .empty-card__desc {
    font-size: 23rpx;
  }

  .recommend-item__button {
    right: 22rpx;
    bottom: 24rpx;
  }

  .mine-item {
    gap: 16rpx;
  }

  .mine-item__button {
    width: 150rpx;
    font-size: 25rpx;
  }

  .empty-card {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .empty-card__button {
    width: 100%;
  }
}
</style>
