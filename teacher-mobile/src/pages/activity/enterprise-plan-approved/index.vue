<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { approveEnterprisePlan } from '../../../domain/enterprise'

const planRows = [
  { label: '实践单位：', value: '山东智联装备有限公司' },
  { label: '实践岗位：', value: '现场工程师助理' },
  { label: '计划时间：', value: '2026-06-03  至  2026-06-14' },
  { label: '预计实践天数：', value: '10 天' },
  { label: '确认时间：', value: '2026-05-29 14:20' },
]

const confirmedRows = [
  { title: '基础信息', value: '已确认', tone: 'green' },
  { title: '实践目标', value: '已确认', tone: 'green' },
  { title: '实践内容', value: '已确认', tone: 'green' },
  { title: '附件资料', value: '已确认 1 份', tone: 'green' },
]

function goBack() {
  uni.navigateBack()
}

function goEnterpriseList() {
  approveEnterprisePlan()
  uni.navigateTo({ url: '/pages/activity/enterprise-list/index' })
}

function goLogRecord() {
  approveEnterprisePlan()
  uni.navigateTo({ url: '/pages/activity/enterprise-log-record/index?recordId=enterprise-new-plan' })
}
</script>

<template>
  <view class="plan-approved-page">
    <view class="hero">
      <view class="hero-leaf"></view>
      <MobileNavbar title="" size="compact" @back="goBack" />
      <text class="hero-title">企业实践</text>
      <text class="hero-subtitle">实践计划已确认通过，可开始记录实践过程</text>
    </view>

    <view class="content">
      <MobileCard class="success-card">
        <view class="success-orb">
          <view class="success-check"></view>
        </view>
        <view class="success-copy">
          <text class="success-title">实践计划已确认通过</text>
          <text class="success-desc">你可以开始记录实践过程</text>
          <text class="success-tag">已确认通过</text>
        </view>
      </MobileCard>

      <MobileCard class="plan-card">
        <view class="section-head">
          <view class="section-icon section-icon--file"></view>
          <text class="section-title">本次实践计划</text>
        </view>
        <view class="detail-list">
          <view v-for="item in planRows" :key="item.label" class="detail-row">
            <text class="detail-label">{{ item.label }}</text>
            <text class="detail-value">{{ item.value }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="confirmed-card">
        <view class="section-head">
          <view class="section-icon section-icon--bot"></view>
          <text class="section-title">已确认内容</text>
        </view>
        <view class="confirmed-list">
          <view v-for="item in confirmedRows" :key="item.title" class="confirmed-row">
            <view class="confirmed-icon"></view>
            <text class="confirmed-title">{{ item.title }}</text>
            <text class="confirmed-value">{{ item.value }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="next-card">
        <view class="next-copy">
          <view class="next-head">
            <view class="next-icon"></view>
            <text class="section-title">下一步</text>
          </view>
          <text class="next-desc">实践过程中可随时记录日志，后续系统会根据日志和附件整理实践总结草稿。</text>
          <MobileActionButton class="next-button" variant="outline" @tap="goLogRecord">开始记录日志</MobileActionButton>
        </view>
        <view class="next-art"></view>
      </MobileCard>

      <view class="bottom-actions">
        <MobileActionButton class="bottom-button" variant="outline" @tap="goEnterpriseList">返回实践列表</MobileActionButton>
        <MobileActionButton class="bottom-button" variant="primary" @tap="goLogRecord">开始记录日志</MobileActionButton>
      </view>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.plan-approved-page {
  min-height: 100vh;
  padding-bottom: calc(190rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 84% 7%, rgba(210, 250, 228, 0.7), transparent 22%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 42%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  position: relative;
  padding: calc(var(--status-bar-height) + 14rpx) 28rpx 24rpx;
  overflow: hidden;
  text-align: center;
}

.hero-title,
.hero-subtitle,
.success-title,
.success-desc,
.success-tag,
.section-title,
.detail-label,
.detail-value,
.next-desc {
  display: block;
}

.hero-title {
  color: #10172d;
  font-size: 50rpx;
  font-weight: 900;
  line-height: 1.16;
}

.hero-subtitle {
  margin-top: 8rpx;
  color: #263b67;
  font-size: 30rpx;
  font-weight: 700;
  line-height: 1.38;
}

.hero-leaf {
  position: absolute;
  right: 34rpx;
  top: 36rpx;
  width: 154rpx;
  height: 126rpx;
  opacity: 0.42;
}

.hero-leaf::before,
.hero-leaf::after {
  position: absolute;
  border-radius: 999rpx 999rpx 0 999rpx;
  background: #a5ecc6;
  content: '';
}

.hero-leaf::before {
  right: 8rpx;
  width: 62rpx;
  height: 106rpx;
  transform: rotate(35deg);
}

.hero-leaf::after {
  right: 82rpx;
  top: 44rpx;
  width: 54rpx;
  height: 78rpx;
  transform: rotate(-56deg);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 28rpx;
}

.success-card,
.plan-card,
.confirmed-card,
.next-card {
  padding: 34rpx;
}

.success-card,
.section-head,
.detail-row,
.confirmed-row,
.next-card,
.next-head,
.bottom-actions {
  display: flex;
  align-items: center;
}

.success-card {
  gap: 46rpx;
  min-height: 220rpx;
}

.success-orb {
  position: relative;
  width: 154rpx;
  height: 154rpx;
  flex: 0 0 auto;
  border: 22rpx solid #e5f8ee;
  border-radius: 50%;
  background: linear-gradient(135deg, #5de493, $teacher-mobile-primary);
  box-shadow: 0 22rpx 48rpx rgba(0, 185, 95, 0.18);
}

.success-orb::before,
.success-orb::after {
  position: absolute;
  border-radius: 50%;
  background: #8ee9b4;
  content: '';
}

.success-orb::before {
  left: -48rpx;
  top: -18rpx;
  width: 16rpx;
  height: 16rpx;
}

.success-orb::after {
  left: -32rpx;
  top: 18rpx;
  width: 12rpx;
  height: 12rpx;
}

.success-check {
  position: absolute;
  left: 40rpx;
  top: 48rpx;
  width: 62rpx;
  height: 34rpx;
  border-left: 12rpx solid #fff;
  border-bottom: 12rpx solid #fff;
  border-radius: 4rpx;
  transform: rotate(-45deg);
}

.success-copy {
  min-width: 0;
  flex: 1;
}

.success-title {
  color: #0b713f;
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1.24;
}

.success-desc {
  margin-top: 20rpx;
  color: #53617b;
  font-size: 33rpx;
  line-height: 1.35;
}

.success-tag {
  width: fit-content;
  margin-top: 22rpx;
  padding: 12rpx 24rpx;
  border-radius: 999rpx;
  background: #e8fbf1;
  color: $teacher-mobile-primary-dark;
  font-size: 29rpx;
  font-weight: 900;
}

.section-head {
  gap: 18rpx;
}

.section-icon {
  position: relative;
  width: 48rpx;
  height: 48rpx;
  flex: 0 0 auto;
  color: $teacher-mobile-primary-dark;
}

.section-icon--file::before {
  position: absolute;
  inset: 4rpx 8rpx;
  border-radius: 7rpx;
  background: currentColor;
  content: '';
}

.section-icon--file::after {
  position: absolute;
  left: 18rpx;
  top: 17rpx;
  width: 22rpx;
  height: 4rpx;
  border-radius: 999rpx;
  background: #fff;
  box-shadow: 0 12rpx 0 #fff;
  content: '';
}

.section-icon--bot::before {
  position: absolute;
  left: 8rpx;
  top: 12rpx;
  width: 32rpx;
  height: 26rpx;
  border-radius: 12rpx;
  background: currentColor;
  content: '';
}

.section-icon--bot::after {
  position: absolute;
  left: 20rpx;
  top: 4rpx;
  width: 8rpx;
  height: 12rpx;
  border-radius: 999rpx;
  background: currentColor;
  content: '';
}

.section-title {
  color: #10172d;
  font-size: 36rpx;
  font-weight: 900;
}

.detail-list {
  margin-top: 24rpx;
  border-top: 1rpx solid #e7edf5;
}

.detail-row {
  min-height: 72rpx;
  border-bottom: 1rpx solid #e7edf5;
}

.detail-row:last-child {
  border-bottom: 0;
}

.detail-label {
  width: 230rpx;
  flex: 0 0 auto;
  color: #53617b;
  font-size: 30rpx;
  line-height: 1.35;
}

.detail-value {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 700;
  line-height: 1.35;
}

.confirmed-list {
  margin-top: 24rpx;
  border: 1rpx solid #e1e8f2;
  border-radius: 14rpx;
  overflow: hidden;
}

.confirmed-row {
  min-height: 76rpx;
  padding: 0 22rpx;
  border-bottom: 1rpx solid #e7edf5;
}

.confirmed-row:last-child {
  border-bottom: 0;
}

.confirmed-icon {
  position: relative;
  width: 44rpx;
  height: 44rpx;
  flex: 0 0 auto;
  margin-right: 22rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.confirmed-icon::before {
  position: absolute;
  inset: 17rpx 18rpx 15rpx;
  border-radius: 50%;
  background: #fff;
  content: '';
}

.confirmed-title {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 800;
}

.confirmed-value {
  flex: 0 0 auto;
  color: $teacher-mobile-primary-dark;
  font-size: 30rpx;
  font-weight: 900;
}

.next-card {
  justify-content: space-between;
  gap: 20rpx;
}

.next-copy {
  min-width: 0;
  flex: 1;
}

.next-head {
  gap: 16rpx;
}

.next-icon {
  position: relative;
  width: 46rpx;
  height: 46rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.next-icon::before {
  position: absolute;
  left: 14rpx;
  top: 12rpx;
  width: 14rpx;
  height: 14rpx;
  border-top: 8rpx solid #fff;
  border-right: 8rpx solid #fff;
  content: '';
  transform: rotate(45deg);
}

.next-desc {
  margin-top: 20rpx;
  color: #53617b;
  font-size: 28rpx;
  line-height: 1.46;
}

.next-button {
  width: 198rpx;
  height: 58rpx;
  margin-top: 20rpx;
  font-size: 27rpx;
}

.next-art {
  position: relative;
  width: 152rpx;
  height: 126rpx;
  flex: 0 0 auto;
  border-radius: 14rpx;
  background: linear-gradient(180deg, #e6faf0, #f5fff9);
  opacity: 0.9;
}

.next-art::before {
  position: absolute;
  left: 28rpx;
  top: 34rpx;
  width: 64rpx;
  height: 8rpx;
  border-radius: 999rpx;
  background: #a8ecc4;
  box-shadow: 0 24rpx 0 #a8ecc4, 0 48rpx 0 #a8ecc4;
  content: '';
}

.next-art::after {
  position: absolute;
  right: 6rpx;
  bottom: 18rpx;
  width: 58rpx;
  height: 20rpx;
  border-radius: 999rpx;
  background: $teacher-mobile-primary;
  content: '';
  transform: rotate(-45deg);
}

.bottom-actions {
  gap: 28rpx;
}

.bottom-button {
  height: 76rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 30rpx;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .hero-title {
    font-size: 44rpx;
  }

  .hero-subtitle {
    font-size: 25rpx;
  }

  .success-card,
  .plan-card,
  .confirmed-card,
  .next-card {
    padding: 24rpx;
  }

  .success-card {
    gap: 22rpx;
    align-items: flex-start;
  }

  .success-orb {
    width: 104rpx;
    height: 104rpx;
    border-width: 14rpx;
  }

  .success-check {
    left: 28rpx;
    top: 32rpx;
    width: 42rpx;
    height: 24rpx;
    border-left-width: 9rpx;
    border-bottom-width: 9rpx;
  }

  .success-title {
    font-size: 32rpx;
  }

  .success-desc {
    font-size: 26rpx;
  }

  .success-tag {
    font-size: 24rpx;
  }

  .detail-label {
    width: 150rpx;
    font-size: 24rpx;
  }

  .detail-value,
  .confirmed-title,
  .confirmed-value,
  .next-desc {
    font-size: 24rpx;
  }

  .confirmed-row {
    padding: 0 16rpx;
  }

  .next-art {
    width: 100rpx;
    height: 92rpx;
  }

  .next-button {
    width: 174rpx;
    font-size: 24rpx;
  }
}
</style>
