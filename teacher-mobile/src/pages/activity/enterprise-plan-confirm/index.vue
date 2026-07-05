<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { submitEnterprisePlan } from '../../../domain/enterprise'

const submitRows = [
  { label: '档案类型：', value: '企业实践 ｜ 行业实践' },
  { label: '记录名称：', value: '山东某软件科技有限公司企业实践' },
  { label: '实践单位：', value: '山东某软件科技有限公司' },
  { label: '实践岗位：', value: '软件开发工程师' },
  { label: '实践时间：', value: '2023.07 - 2023.12' },
]

const processSteps = [
  '所在学院或相关部门将进行核验',
  '审核通过后，实践计划进入企业实践记录',
  '如需补充，系统会通过待办提醒你',
]

function goBack() {
  uni.navigateBack()
}

function submitPlan() {
  submitEnterprisePlan()
  uni.navigateTo({ url: '/pages/activity/enterprise-import-export/index' })
}
</script>

<template>
  <view class="plan-confirm-page">
    <view class="hero">
      <MobileNavbar title="" size="compact" @back="goBack" />
      <text class="hero-title">确认提交</text>
      <text class="hero-subtitle">提交后，实践计划将进入待审核状态</text>
    </view>

    <view class="content">
      <MobileCard class="summary-card">
        <view class="summary-icon">
          <view class="summary-file"></view>
          <view class="summary-check"></view>
        </view>
        <view class="summary-copy">
          <text class="summary-title">实践计划将提交部门审核</text>
          <view class="tag-row">
            <text>企业实践</text>
            <text>行业实践</text>
          </view>
          <text class="summary-desc">审核通过后会生成企业实践记录，归档仍需后续确认。</text>
        </view>
      </MobileCard>

      <MobileCard class="info-card">
        <view class="section-head">
          <view class="green-bar"></view>
          <text class="section-title">提交信息</text>
        </view>
        <view class="info-list">
          <view v-for="item in submitRows" :key="item.label" class="info-row">
            <text class="info-label">{{ item.label }}</text>
            <text class="info-value">{{ item.value }}</text>
          </view>
          <view class="info-row info-row--status">
            <text class="info-label">材料状态：</text>
            <view class="status-copy">
              <text class="info-value">暂未上传证明材料</text>
              <text class="warning-text">当前未上传材料，提交后可能需要后续补充。</text>
            </view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="process-card">
        <view class="section-head">
          <view class="green-bar"></view>
          <text class="section-title">提交后会发生什么</text>
        </view>
        <view class="process-list">
          <view v-for="(item, index) in processSteps" :key="item" class="process-row">
            <view class="process-icon" :class="`process-icon--${index}`"></view>
            <text>{{ item }}</text>
          </view>
        </view>
      </MobileCard>

      <view class="notice-card">
        <view class="shield-icon"></view>
        <view class="notice-copy">
          <text class="notice-title">温馨提示</text>
          <text class="notice-desc">当前暂未上传证明材料。若部门核验需要补充佐证，系统会及时提醒你继续完善。</text>
        </view>
        <view class="leaf-art"></view>
      </view>

      <view class="bottom-actions">
        <MobileActionButton class="bottom-button" variant="outline" @tap="goBack">返回修改</MobileActionButton>
        <MobileActionButton class="bottom-button" variant="primary" @tap="submitPlan">提交核验</MobileActionButton>
      </view>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.plan-confirm-page {
  min-height: 100vh;
  padding-bottom: calc(304rpx + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 44%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  padding: calc(var(--status-bar-height) + 14rpx) 28rpx 24rpx;
  text-align: center;
}

.hero-title,
.hero-subtitle,
.summary-title,
.summary-desc,
.section-title,
.info-label,
.info-value,
.warning-text,
.notice-title,
.notice-desc {
  display: block;
}

.hero-title {
  color: #10172d;
  font-size: 46rpx;
  font-weight: 900;
  line-height: 1.16;
}

.hero-subtitle {
  margin-top: 18rpx;
  color: #53617b;
  font-size: 28rpx;
  line-height: 1.42;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 28rpx;
}

.summary-card,
.info-card,
.process-card {
  padding: 36rpx;
}

.summary-card,
.tag-row,
.section-head,
.info-row,
.process-row,
.notice-card,
.bottom-actions {
  display: flex;
  align-items: center;
}

.summary-card {
  gap: 38rpx;
  min-height: 190rpx;
}

.summary-icon {
  position: relative;
  width: 136rpx;
  height: 136rpx;
  flex: 0 0 auto;
}

.summary-file {
  position: absolute;
  left: 2rpx;
  top: 4rpx;
  width: 88rpx;
  height: 116rpx;
  border-radius: 14rpx;
  background: linear-gradient(180deg, #dff8ea, #f4fff9);
}

.summary-file::before {
  position: absolute;
  right: 0;
  top: 0;
  width: 34rpx;
  height: 34rpx;
  border-radius: 0 14rpx 0 16rpx;
  background: #58d28c;
  content: '';
}

.summary-file::after {
  position: absolute;
  left: 20rpx;
  top: 44rpx;
  width: 46rpx;
  height: 8rpx;
  border-radius: 999rpx;
  background: $teacher-mobile-primary;
  box-shadow: 0 28rpx 0 $teacher-mobile-primary, 0 56rpx 0 $teacher-mobile-primary;
  content: '';
}

.summary-check {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 78rpx;
  height: 78rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.summary-check::before {
  position: absolute;
  left: 22rpx;
  top: 28rpx;
  width: 34rpx;
  height: 18rpx;
  border-left: 8rpx solid #fff;
  border-bottom: 8rpx solid #fff;
  border-radius: 3rpx;
  content: '';
  transform: rotate(-45deg);
}

.summary-copy {
  min-width: 0;
  flex: 1;
}

.summary-title {
  color: #10172d;
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1.28;
}

.tag-row {
  gap: 22rpx;
  margin-top: 22rpx;
}

.tag-row text {
  padding: 12rpx 34rpx;
  border-radius: 999rpx;
  background: #e8fbf1;
  color: $teacher-mobile-primary-dark;
  font-size: 29rpx;
  font-weight: 900;
}

.summary-desc {
  margin-top: 20rpx;
  color: #53617b;
  font-size: 28rpx;
  line-height: 1.45;
}

.section-head {
  gap: 18rpx;
}

.green-bar {
  width: 10rpx;
  height: 44rpx;
  border-radius: 999rpx;
  background: $teacher-mobile-primary;
}

.section-title {
  color: #10172d;
  font-size: 38rpx;
  font-weight: 900;
}

.info-list {
  margin-top: 26rpx;
}

.info-row {
  min-height: 74rpx;
  border-bottom: 1rpx solid #e7edf5;
}

.info-row:last-child {
  border-bottom: 0;
}

.info-label {
  width: 190rpx;
  flex: 0 0 auto;
  color: #53617b;
  font-size: 28rpx;
  line-height: 1.35;
}

.info-value {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 28rpx;
  font-weight: 700;
  line-height: 1.35;
}

.info-row--status {
  align-items: flex-start;
  padding-top: 18rpx;
  padding-bottom: 10rpx;
}

.status-copy {
  min-width: 0;
  flex: 1;
}

.warning-text {
  margin-top: 10rpx;
  color: #ff6b1a;
  font-size: 25rpx;
  line-height: 1.35;
}

.process-list {
  position: relative;
  margin-top: 28rpx;
  padding-left: 38rpx;
}

.process-list::before {
  position: absolute;
  left: 66rpx;
  top: 58rpx;
  bottom: 58rpx;
  width: 5rpx;
  border-radius: 999rpx;
  background: repeating-linear-gradient(180deg, $teacher-mobile-primary 0 10rpx, transparent 10rpx 20rpx);
  content: '';
}

.process-row {
  position: relative;
  z-index: 1;
  gap: 42rpx;
  min-height: 100rpx;
  margin-bottom: 18rpx;
  padding: 0 28rpx;
  border-radius: 14rpx;
  background: linear-gradient(90deg, #f4fbf7, #ffffff);
  color: #263b67;
  font-size: 29rpx;
  font-weight: 700;
}

.process-row:last-child {
  margin-bottom: 0;
}

.process-icon {
  position: relative;
  width: 64rpx;
  height: 64rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #dff8ea;
  color: $teacher-mobile-primary-dark;
}

.process-icon::before {
  position: absolute;
  left: 18rpx;
  top: 18rpx;
  width: 28rpx;
  height: 28rpx;
  background: currentColor;
  content: '';
}

.process-icon--0::before {
  clip-path: polygon(50% 0, 100% 32%, 88% 32%, 88% 100%, 12% 100%, 12% 32%, 0 32%);
}

.process-icon--1::before {
  border-radius: 6rpx;
}

.process-icon--2::before {
  border-radius: 50% 50% 44% 44%;
}

.notice-card {
  position: relative;
  gap: 26rpx;
  min-height: 142rpx;
  padding: 26rpx 32rpx;
  border: 1rpx solid rgba(14, 193, 101, 0.22);
  border-radius: 20rpx;
  overflow: hidden;
  background: linear-gradient(90deg, #f0fff6, #ffffff);
}

.shield-icon {
  position: relative;
  width: 92rpx;
  height: 104rpx;
  flex: 0 0 auto;
  border-radius: 44rpx 44rpx 34rpx 34rpx;
  background: linear-gradient(135deg, $teacher-mobile-primary, #0aa94f);
  clip-path: polygon(50% 0, 92% 18%, 84% 78%, 50% 100%, 16% 78%, 8% 18%);
}

.shield-icon::before {
  position: absolute;
  left: 34rpx;
  top: 32rpx;
  width: 24rpx;
  height: 38rpx;
  border-radius: 999rpx 999rpx 10rpx 10rpx;
  background: #fff;
  content: '';
}

.notice-copy {
  position: relative;
  z-index: 1;
  min-width: 0;
  flex: 1;
}

.notice-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
}

.notice-desc {
  margin-top: 12rpx;
  color: #53617b;
  font-size: 27rpx;
  line-height: 1.5;
}

.leaf-art {
  position: absolute;
  right: 28rpx;
  bottom: 18rpx;
  width: 120rpx;
  height: 90rpx;
  opacity: 0.28;
}

.leaf-art::before,
.leaf-art::after {
  position: absolute;
  border-radius: 999rpx 999rpx 0 999rpx;
  background: #a5ecc6;
  content: '';
}

.leaf-art::before {
  right: 16rpx;
  width: 42rpx;
  height: 72rpx;
  transform: rotate(32deg);
}

.leaf-art::after {
  right: 66rpx;
  top: 34rpx;
  width: 38rpx;
  height: 58rpx;
  transform: rotate(-52deg);
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

  .summary-card,
  .info-card,
  .process-card {
    padding: 24rpx;
  }

  .summary-card {
    gap: 22rpx;
    align-items: flex-start;
  }

  .summary-icon {
    width: 100rpx;
    height: 108rpx;
  }

  .summary-file {
    width: 72rpx;
    height: 94rpx;
  }

  .summary-check {
    width: 58rpx;
    height: 58rpx;
  }

  .summary-title {
    font-size: 31rpx;
  }

  .tag-row {
    gap: 10rpx;
  }

  .tag-row text {
    padding: 10rpx 18rpx;
    font-size: 24rpx;
  }

  .summary-desc,
  .hero-subtitle,
  .info-label,
  .info-value,
  .process-row,
  .notice-desc {
    font-size: 24rpx;
  }

  .info-label {
    width: 142rpx;
  }

  .process-list {
    padding-left: 12rpx;
  }

  .process-list::before {
    left: 40rpx;
  }

  .process-row {
    gap: 22rpx;
    padding: 0 18rpx;
  }

  .notice-card {
    padding: 24rpx;
  }

  .shield-icon {
    width: 68rpx;
    height: 78rpx;
  }
}
</style>
