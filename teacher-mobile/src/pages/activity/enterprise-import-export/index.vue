<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

const planRows = [
  { label: '实践单位：', value: '山东智联装备有限公司' },
  { label: '实践岗位：', value: '现场工程师助理' },
  { label: '计划时间：', value: '2026-06-03 至 2026-06-14' },
  { label: '预计实践天数：', value: '10 天' },
  { label: '提交时间：', value: '2026-05-28 09:41' },
]

const aiItems = [
  { title: '基础信息', status: '已提交', type: 'info' },
  { title: '实践目标', status: '已提交', type: 'target' },
  { title: '实践内容', status: '已提交', type: 'content' },
  { title: '附件资料', status: '已提交 1 份', type: 'attach' },
]

function goBack() {
  uni.navigateBack()
}

function viewSubmit() {
  uni.showToast({ title: '查看提交内容', icon: 'none' })
}

function backToList() {
  uni.showToast({ title: '返回实践列表', icon: 'none' })
}
</script>

<template>
  <view class="import-export-page">
    <MobileNavbar title="企业实践" size="regular" @back="goBack" />

    <view class="content">
      <MobileCard class="success-card">
        <view class="success-orb">
          <view class="spark spark--one"></view>
          <view class="spark spark--two"></view>
          <view class="success-check"></view>
        </view>
        <view class="success-copy">
          <text class="success-title">实践计划已提交</text>
          <text class="success-desc">你的实践计划已提交至学院确认</text>
          <text class="success-tag">等待确认</text>
        </view>
      </MobileCard>

      <MobileCard class="plan-card">
        <view class="section-head">
          <view class="section-icon section-icon--file"></view>
          <text class="section-title">本次实践计划</text>
        </view>

        <view class="plan-list">
          <view v-for="item in planRows" :key="item.label" class="plan-row">
            <text class="plan-label">{{ item.label }}</text>
            <text class="plan-value">{{ item.value }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="ai-card">
        <view class="section-head">
          <view class="section-icon section-icon--bot"></view>
          <text class="section-title">AI 已整理内容</text>
        </view>

        <view class="ai-list">
          <view v-for="item in aiItems" :key="item.title" class="ai-row">
            <view class="ai-icon" :class="`ai-icon--${item.type}`"></view>
            <text class="ai-title">{{ item.title }}</text>
            <text class="ai-status">{{ item.status }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="status-card">
        <view class="section-head">
          <view class="section-icon section-icon--bell"></view>
          <text class="section-title">当前状态</text>
        </view>
        <text class="status-title">学院确认中</text>
        <text class="status-desc">确认通过后，你可以开始记录实践日志。</text>
      </MobileCard>
    </view>

    <view class="bottom-actions">
      <MobileActionButton class="action-button" variant="outline" @tap="viewSubmit">查看提交内容</MobileActionButton>
      <MobileActionButton class="action-button" variant="primary" @tap="backToList">返回实践列表</MobileActionButton>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.import-export-page {
  min-height: 100vh;
  padding-bottom: calc(360rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 18% 9%, rgba(224, 248, 235, 0.76), transparent 25%),
    radial-gradient(circle at 92% 4%, rgba(222, 248, 233, 0.62), transparent 18%),
    linear-gradient(180deg, #fbfffd 0%, #f7fbf8 54%, #f5f9f6 100%);
  color: #111827;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  padding: 16rpx 30rpx 0;
}

.success-card,
.plan-card,
.ai-card,
.status-card {
  border-radius: 28rpx;
  box-shadow: 0 18rpx 46rpx rgba(28, 62, 52, 0.09);
}

.success-card {
  display: flex;
  min-height: 200rpx;
  align-items: center;
  gap: 48rpx;
  padding: 34rpx 52rpx;
}

.success-orb {
  position: relative;
  width: 142rpx;
  height: 142rpx;
  flex: 0 0 auto;
  border: 20rpx solid rgba(231, 248, 238, 0.94);
  border-radius: 50%;
  background: linear-gradient(135deg, #62dc91 0%, #18bc62 100%);
  box-shadow:
    0 0 0 30rpx rgba(230, 247, 237, 0.54),
    0 26rpx 58rpx rgba(18, 180, 91, 0.21);
}

.success-check {
  position: absolute;
  left: 35rpx;
  top: 42rpx;
  width: 58rpx;
  height: 33rpx;
  border-bottom: 12rpx solid #fff;
  border-left: 12rpx solid #fff;
  border-radius: 4rpx;
  transform: rotate(-45deg);
}

.spark {
  position: absolute;
  border-radius: 4rpx;
  background: #9be9bd;
  transform: rotate(45deg);
}

.spark--one {
  left: -88rpx;
  top: -10rpx;
  width: 18rpx;
  height: 18rpx;
}

.spark--two {
  left: -54rpx;
  top: -46rpx;
  width: 16rpx;
  height: 16rpx;
}

.success-copy {
  min-width: 0;
  flex: 1;
}

.success-title,
.success-desc,
.success-tag,
.section-title,
.plan-label,
.plan-value,
.ai-title,
.ai-status,
.status-title,
.status-desc {
  display: block;
}

.success-title {
  color: #0a6a39;
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1.22;
}

.success-desc {
  margin-top: 14rpx;
  color: #5a6474;
  font-size: 30rpx;
  line-height: 1.38;
}

.success-tag {
  width: fit-content;
  margin-top: 16rpx;
  padding: 10rpx 28rpx;
  border-radius: 999rpx;
  background: #e6faee;
  color: #07934c;
  font-size: 28rpx;
  font-weight: 800;
}

.plan-card,
.ai-card,
.status-card {
  padding: 28rpx 32rpx 30rpx;
}

.section-head,
.plan-row,
.ai-row,
.bottom-actions {
  display: flex;
  align-items: center;
}

.section-head {
  gap: 18rpx;
}

.section-icon {
  position: relative;
  width: 48rpx;
  height: 48rpx;
  flex: 0 0 auto;
  color: #10b868;
}

.section-icon::before,
.section-icon::after {
  position: absolute;
  content: '';
}

.section-icon--file::before {
  inset: 3rpx 7rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.section-icon--file::after {
  left: 18rpx;
  top: 16rpx;
  width: 20rpx;
  height: 5rpx;
  border-radius: 999rpx;
  background: #fff;
  box-shadow: 0 12rpx 0 #fff;
}

.section-icon--bot::before {
  left: 7rpx;
  right: 7rpx;
  bottom: 6rpx;
  height: 27rpx;
  border-radius: 14rpx 14rpx 12rpx 12rpx;
  background: currentColor;
}

.section-icon--bot::after {
  left: 20rpx;
  top: 4rpx;
  width: 8rpx;
  height: 15rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: -12rpx 22rpx 0 -2rpx #fff, 12rpx 22rpx 0 -2rpx #fff;
}

.section-icon--bell::before {
  left: 10rpx;
  top: 7rpx;
  width: 28rpx;
  height: 30rpx;
  border-radius: 16rpx 16rpx 8rpx 8rpx;
  background: currentColor;
}

.section-icon--bell::after {
  left: 17rpx;
  bottom: 4rpx;
  width: 14rpx;
  height: 8rpx;
  border-radius: 0 0 999rpx 999rpx;
  background: currentColor;
}

.section-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
}

.plan-list {
  margin-top: 18rpx;
  border-top: 1rpx solid #e4e9ee;
}

.plan-row {
  min-height: 58rpx;
  border-bottom: 1rpx solid #e4e9ee;
}

.plan-row:last-child {
  border-bottom: 0;
}

.plan-label {
  width: 252rpx;
  flex: 0 0 auto;
  color: #6b7280;
  font-size: 29rpx;
  line-height: 1.28;
}

.plan-value {
  min-width: 0;
  flex: 1;
  color: #111827;
  font-size: 29rpx;
  font-weight: 700;
  line-height: 1.34;
}

.ai-list {
  margin-top: 18rpx;
  overflow: hidden;
  border: 1rpx solid #dee6ef;
  border-radius: 14rpx;
  background: rgba(255, 255, 255, 0.64);
}

.ai-row {
  min-height: 64rpx;
  padding: 0 24rpx 0 20rpx;
  border-bottom: 1rpx solid #e5ebf1;
}

.ai-row:last-child {
  border-bottom: 0;
}

.ai-icon {
  position: relative;
  width: 40rpx;
  height: 40rpx;
  flex: 0 0 auto;
  margin-right: 26rpx;
  color: #12b966;
}

.ai-icon::before,
.ai-icon::after {
  position: absolute;
  content: '';
}

.ai-icon--info {
  border-radius: 50%;
  background: currentColor;
}

.ai-icon--info::before {
  left: 18rpx;
  top: 15rpx;
  width: 5rpx;
  height: 16rpx;
  border-radius: 999rpx;
  background: #fff;
}

.ai-icon--info::after {
  left: 17rpx;
  top: 8rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: #fff;
}

.ai-icon--target::before {
  inset: 3rpx;
  border: 6rpx solid currentColor;
  border-radius: 50%;
}

.ai-icon--target::after {
  right: 0;
  top: 5rpx;
  width: 20rpx;
  height: 20rpx;
  border-top: 6rpx solid currentColor;
  border-right: 6rpx solid currentColor;
  transform: rotate(45deg);
}

.ai-icon--content::before {
  inset: 4rpx 8rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.ai-icon--content::after {
  left: 17rpx;
  top: 13rpx;
  width: 14rpx;
  height: 4rpx;
  border-radius: 999rpx;
  background: #fff;
  box-shadow: 0 10rpx 0 #fff;
}

.ai-icon--attach::before {
  left: 12rpx;
  top: 3rpx;
  width: 17rpx;
  height: 34rpx;
  border: 6rpx solid currentColor;
  border-radius: 16rpx;
  transform: rotate(42deg);
}

.ai-title {
  min-width: 0;
  flex: 1;
  color: #111827;
  font-size: 30rpx;
  font-weight: 800;
}

.ai-status {
  flex: 0 0 auto;
  color: #0b9d51;
  font-size: 28rpx;
  font-weight: 800;
}

.status-card {
  padding-bottom: 30rpx;
}

.status-title {
  margin-top: 16rpx;
  color: #111827;
  font-size: 34rpx;
  font-weight: 800;
  line-height: 1.32;
}

.status-desc {
  margin-top: 10rpx;
  color: #6b7280;
  font-size: 28rpx;
  line-height: 1.46;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: calc(138rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 6;
  gap: 28rpx;
  padding: 18rpx 30rpx 20rpx;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(18rpx);
}

.action-button {
  height: 74rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 30rpx;
}

@media (max-width: 430px) {
  .content {
    gap: 16rpx;
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .success-card {
    gap: 24rpx;
    min-height: 174rpx;
    padding: 26rpx 28rpx;
  }

  .success-orb {
    width: 122rpx;
    height: 122rpx;
    border-width: 18rpx;
    box-shadow:
      0 0 0 20rpx rgba(230, 247, 237, 0.54),
      0 20rpx 42rpx rgba(18, 180, 91, 0.19);
  }

  .success-check {
    left: 31rpx;
    top: 37rpx;
    width: 48rpx;
    height: 27rpx;
    border-bottom-width: 10rpx;
    border-left-width: 10rpx;
  }

  .spark--one {
    left: -56rpx;
  }

  .spark--two {
    left: -32rpx;
    top: -34rpx;
  }

  .success-title {
    font-size: 36rpx;
  }

  .success-desc,
  .section-title,
  .status-title {
    font-size: 28rpx;
  }

  .success-tag,
  .plan-label,
  .plan-value,
  .ai-title,
  .ai-status,
  .status-desc {
    font-size: 24rpx;
  }

  .plan-card,
  .ai-card,
  .status-card {
    padding: 22rpx 24rpx 24rpx;
  }

  .plan-label {
    width: 168rpx;
  }

  .plan-row {
    min-height: 52rpx;
  }

  .ai-row {
    min-height: 56rpx;
    padding-right: 16rpx;
  }

  .ai-icon {
    margin-right: 18rpx;
  }

  .bottom-actions {
    gap: 18rpx;
    padding: 14rpx 18rpx 16rpx;
  }

  .action-button {
    height: 64rpx;
    font-size: 26rpx;
  }
}
</style>
