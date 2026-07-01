<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

const baseFields = [
  { label: '实践单位', value: '山东智联装备有限公司' },
  { label: '实践岗位', value: '现场工程师助理' },
  { label: '计划时间', value: '2026-06-03  至  2026-06-14', calendar: true },
  { label: '预计实践天数', value: '10 天' },
]

const planRows = [
  { label: '实践目标', value: '了解智能装备产线数字化改造流程，提升现场工程项目理解能力。' },
  { label: '实践内容', value: '参与产线流程观察、设备调试记录、项目文档学习和现场工程师交流。' },
  { label: '教学转化方向', value: '后续可转化为《智能制造基础》课程案例，用于课堂项目化教学。' },
]

function goBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="plan-submit-page">
    <view class="hero">
      <MobileNavbar title="" size="compact" @back="goBack" />
      <text class="hero-title">企业实践</text>
      <text class="hero-subtitle">提交实践计划，确认后即可开始记录实践过程</text>
    </view>

    <view class="content">
      <MobileCard class="requirement-card">
        <view class="requirement-copy">
          <text class="requirement-title">本年度企业实践要求</text>
          <view class="days-line">
            <text class="days-number">30</text>
            <text class="days-unit">天</text>
          </view>
          <text class="days-desc">已归档 20 天，还差 10 天</text>
          <view class="requirement-tip">
            <view class="dot"></view>
            <text>当前没有进行中的企业实践，可发起新的实践计划。</text>
          </view>
        </view>
        <view class="requirement-art">
          <view class="calendar"></view>
          <view class="building"></view>
          <view class="hill"></view>
        </view>
      </MobileCard>

      <MobileCard class="input-card">
        <view class="card-head">
          <view class="head-icon head-icon--edit"></view>
          <view>
            <text class="card-title">输入实践计划信息</text>
            <text class="card-desc">可输入、语音说明、拍照或上传实践安排，AI 会自动识别并整理。</text>
          </view>
        </view>
        <view class="prompt-box">
          <text class="prompt-text">计划前往山东智联装备有限公司开展实践，岗位为现场工程师助理，时间 2026-06-03 至 2026-06-14，主要参与产线流程观察、设备调试记录、项目文档学习和现场工程师交流，希望提升现场工程项目理解能力。</text>
          <view class="prompt-tools">
            <view class="tool-item">
              <view class="tool-icon tool-icon--voice"></view>
              <text>语音</text>
            </view>
            <view class="tool-item">
              <view class="tool-icon tool-icon--camera"></view>
              <text>拍照</text>
            </view>
            <view class="tool-item">
              <view class="tool-icon tool-icon--upload"></view>
              <text>上传</text>
            </view>
          </view>
        </view>
        <view class="file-chip">
          <view class="pdf-icon">PDF</view>
          <text>企业邀请函.pdf</text>
          <text class="close">×</text>
        </view>
      </MobileCard>

      <MobileCard class="ai-card">
        <view class="card-head">
          <view class="head-icon head-icon--spark"></view>
          <text class="card-title">AI 已识别并整理实践计划</text>
        </view>

        <view class="timeline-section">
          <view class="timeline-dot"></view>
          <text class="section-label">基本信息</text>
        </view>
        <view class="field-list">
          <view v-for="item in baseFields" :key="item.label" class="field-row">
            <text class="field-label">{{ item.label }}</text>
            <view class="field-value">
              <text>{{ item.value }}</text>
              <view v-if="item.calendar" class="calendar-icon"></view>
            </view>
          </view>
        </view>

        <view class="timeline-section timeline-section--content">
          <view class="timeline-dot"></view>
          <text class="section-label">计划内容</text>
        </view>
        <view class="plan-table">
          <view v-for="item in planRows" :key="item.label" class="plan-row">
            <view class="small-ring"></view>
            <text class="plan-label">{{ item.label }}</text>
            <text class="plan-value">{{ item.value }}</text>
          </view>
        </view>

        <view class="ai-actions">
          <MobileActionButton class="ai-action-button" variant="outline">修改草稿</MobileActionButton>
          <MobileActionButton class="ai-action-button" variant="outline">重新整理</MobileActionButton>
        </view>
      </MobileCard>

      <MobileCard class="material-card">
        <view class="material-main">
          <view class="head-icon head-icon--clip"></view>
          <view>
            <text class="card-title">补充资料（选填）</text>
            <text class="card-desc">可上传企业简介、实践安排表、单位联系人说明等材料。</text>
          </view>
        </view>
        <MobileActionButton class="material-button" variant="outline">补充资料</MobileActionButton>
      </MobileCard>

      <view class="notice-card">
        <view class="info-dot">i</view>
        <view>
          <text class="notice-title">提交后说明</text>
          <text class="notice-desc">提交后将进入学院确认，确认通过后可开始记录实践日志。</text>
        </view>
      </view>

      <view class="bottom-actions">
        <MobileActionButton class="bottom-button" variant="outline">保存草稿</MobileActionButton>
        <MobileActionButton class="bottom-button" variant="primary">提交计划</MobileActionButton>
      </view>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.plan-submit-page {
  min-height: 100vh;
  padding-bottom: calc(190rpx + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 44%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  padding: calc(var(--status-bar-height) + 14rpx) 28rpx 24rpx;
}

.hero-title,
.hero-subtitle,
.requirement-title,
.days-desc,
.card-title,
.card-desc,
.prompt-text,
.section-label,
.field-label,
.notice-title,
.notice-desc {
  display: block;
}

.hero-title {
  margin-left: 62rpx;
  color: #10172d;
  font-size: 58rpx;
  font-weight: 900;
  line-height: 1.12;
}

.hero-subtitle {
  margin: 10rpx 0 0 62rpx;
  color: #53617b;
  font-size: 28rpx;
  line-height: 1.42;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  padding: 0 28rpx;
}

.requirement-card,
.input-card,
.ai-card,
.material-card {
  padding: 30rpx;
}

.requirement-card {
  position: relative;
  overflow: hidden;
  min-height: 252rpx;
}

.requirement-copy {
  position: relative;
  z-index: 1;
  padding-right: 260rpx;
}

.requirement-title {
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
}

.days-line,
.requirement-tip,
.card-head,
.prompt-tools,
.tool-item,
.file-chip,
.timeline-section,
.field-row,
.field-value,
.plan-row,
.ai-actions,
.material-card,
.material-main,
.notice-card,
.bottom-actions {
  display: flex;
  align-items: center;
}

.days-line {
  gap: 14rpx;
  margin-top: 12rpx;
}

.days-number {
  color: $teacher-mobile-primary;
  font-size: 76rpx;
  font-weight: 900;
  line-height: 1;
}

.days-unit {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
}

.days-desc {
  margin-top: 10rpx;
  color: #53617b;
  font-size: 27rpx;
}

.requirement-tip {
  position: relative;
  z-index: 1;
  gap: 16rpx;
  margin-top: 32rpx;
  color: #53617b;
  font-size: 26rpx;
  line-height: 1.4;
}

.dot {
  width: 14rpx;
  height: 14rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.requirement-art {
  position: absolute;
  right: 24rpx;
  bottom: 0;
  width: 300rpx;
  height: 186rpx;
  opacity: 0.74;
}

.hill {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 58rpx;
  border-radius: 100% 0 0 0;
  background: linear-gradient(90deg, #dff7e9, #effbf5);
}

.calendar {
  position: absolute;
  right: 112rpx;
  top: 24rpx;
  width: 112rpx;
  height: 100rpx;
  border-radius: 16rpx;
  background: #f4fff9;
}

.calendar::before {
  position: absolute;
  inset: 0 0 auto;
  height: 28rpx;
  border-radius: 16rpx 16rpx 0 0;
  background: #9deab9;
  content: '';
}

.calendar::after {
  position: absolute;
  inset: 42rpx 20rpx 18rpx;
  background:
    linear-gradient(#cef5dc, #cef5dc) 0 0 / 20rpx 18rpx no-repeat,
    linear-gradient(#cef5dc, #cef5dc) 34rpx 0 / 20rpx 18rpx no-repeat,
    linear-gradient(#cef5dc, #cef5dc) 68rpx 0 / 20rpx 18rpx no-repeat,
    linear-gradient(#cef5dc, #cef5dc) 0 30rpx / 20rpx 18rpx no-repeat,
    linear-gradient(#cef5dc, #cef5dc) 34rpx 30rpx / 20rpx 18rpx no-repeat,
    linear-gradient(#cef5dc, #cef5dc) 68rpx 30rpx / 20rpx 18rpx no-repeat;
  content: '';
}

.building {
  position: absolute;
  right: 56rpx;
  top: 74rpx;
  width: 68rpx;
  height: 64rpx;
  border-radius: 10rpx;
  background: #b7efcd;
}

.input-card,
.ai-card,
.material-card {
  box-shadow: 0 20rpx 50rpx rgba(35, 51, 87, 0.06);
}

.card-head {
  gap: 18rpx;
}

.head-icon {
  position: relative;
  width: 46rpx;
  height: 46rpx;
  flex: 0 0 auto;
  color: $teacher-mobile-primary-dark;
}

.head-icon--edit::before {
  position: absolute;
  inset: 8rpx;
  border: 5rpx solid currentColor;
  border-radius: 10rpx;
  content: '';
}

.head-icon--edit::after {
  position: absolute;
  right: 2rpx;
  top: 4rpx;
  width: 26rpx;
  height: 8rpx;
  border-radius: 999rpx;
  background: currentColor;
  content: '';
  transform: rotate(-45deg);
}

.head-icon--spark::before,
.head-icon--spark::after {
  position: absolute;
  border-radius: 50%;
  background: currentColor;
  content: '';
}

.head-icon--spark::before {
  left: 6rpx;
  top: 8rpx;
  width: 14rpx;
  height: 14rpx;
  box-shadow: 20rpx 18rpx 0 currentColor;
}

.head-icon--spark::after {
  right: 4rpx;
  top: 2rpx;
  width: 8rpx;
  height: 36rpx;
  border-radius: 999rpx;
  transform: rotate(38deg);
}

.head-icon--clip::before {
  position: absolute;
  inset: 7rpx 12rpx;
  border: 5rpx solid currentColor;
  border-left-color: transparent;
  border-radius: 999rpx;
  content: '';
  transform: rotate(-45deg);
}

.card-title {
  color: #10172d;
  font-size: 33rpx;
  font-weight: 900;
}

.card-desc {
  margin-top: 8rpx;
  color: #53617b;
  font-size: 25rpx;
  line-height: 1.4;
}

.prompt-box {
  margin-top: 24rpx;
  padding: 24rpx 26rpx;
  border: 2rpx solid $teacher-mobile-primary;
  border-radius: 14rpx;
}

.prompt-text {
  color: #10172d;
  font-size: 30rpx;
  font-weight: 700;
  line-height: 1.72;
}

.prompt-tools {
  justify-content: flex-end;
  gap: 36rpx;
  margin-top: 28rpx;
  color: $teacher-mobile-primary-dark;
  font-size: 27rpx;
  font-weight: 800;
}

.tool-item {
  gap: 10rpx;
}

.tool-icon {
  position: relative;
  width: 32rpx;
  height: 32rpx;
}

.tool-icon--voice::before {
  position: absolute;
  left: 10rpx;
  top: 0;
  width: 12rpx;
  height: 22rpx;
  border: 4rpx solid currentColor;
  border-radius: 999rpx;
  content: '';
}

.tool-icon--voice::after {
  position: absolute;
  left: 6rpx;
  bottom: 0;
  width: 20rpx;
  height: 14rpx;
  border-bottom: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  border-radius: 0 0 999rpx 999rpx;
  content: '';
}

.tool-icon--camera::before {
  position: absolute;
  inset: 7rpx 2rpx 4rpx;
  border: 4rpx solid currentColor;
  border-radius: 7rpx;
  content: '';
}

.tool-icon--camera::after {
  position: absolute;
  left: 11rpx;
  top: 13rpx;
  width: 10rpx;
  height: 10rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
  content: '';
}

.tool-icon--upload::before {
  position: absolute;
  left: 5rpx;
  right: 5rpx;
  bottom: 4rpx;
  height: 16rpx;
  border: 4rpx solid currentColor;
  border-top: 0;
  border-radius: 0 0 8rpx 8rpx;
  content: '';
}

.tool-icon--upload::after {
  position: absolute;
  left: 9rpx;
  top: 3rpx;
  width: 14rpx;
  height: 14rpx;
  border-top: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
  content: '';
  transform: rotate(45deg);
}

.file-chip {
  width: fit-content;
  gap: 14rpx;
  margin-top: 18rpx;
  padding: 12rpx 20rpx;
  border: 1rpx solid #e4e9f2;
  border-radius: 12rpx;
  background: #f7f9fc;
  color: #53617b;
  font-size: 26rpx;
}

.pdf-icon {
  padding: 4rpx 6rpx;
  border-radius: 5rpx;
  background: #ff4545;
  color: #fff;
  font-size: 18rpx;
  font-weight: 900;
}

.close {
  margin-left: 8rpx;
}

.ai-card {
  position: relative;
}

.timeline-section {
  gap: 16rpx;
  margin-top: 28rpx;
}

.timeline-section--content {
  margin-top: 30rpx;
}

.timeline-dot {
  width: 12rpx;
  height: 12rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.section-label {
  color: #10172d;
  font-size: 28rpx;
  font-weight: 900;
}

.field-list {
  margin-top: 16rpx;
  padding-left: 38rpx;
  border-left: 2rpx solid #abf0c6;
}

.field-row {
  gap: 20rpx;
  margin-bottom: 14rpx;
}

.field-label {
  width: 156rpx;
  flex: 0 0 auto;
  color: #10172d;
  font-size: 26rpx;
  font-weight: 900;
}

.field-value {
  min-width: 0;
  min-height: 54rpx;
  flex: 1;
  justify-content: space-between;
  gap: 16rpx;
  padding: 0 18rpx;
  border: 1rpx solid #e4e9f2;
  border-radius: 12rpx;
  color: #263b67;
  font-size: 27rpx;
}

.calendar-icon {
  position: relative;
  width: 32rpx;
  height: 32rpx;
  flex: 0 0 auto;
  border: 4rpx solid #74809a;
  border-radius: 6rpx;
}

.calendar-icon::before {
  position: absolute;
  top: 7rpx;
  right: -4rpx;
  left: -4rpx;
  border-top: 4rpx solid #74809a;
  content: '';
}

.plan-table {
  margin-top: 16rpx;
  border: 1rpx solid #e4e9f2;
  border-radius: 16rpx;
  overflow: hidden;
}

.plan-row {
  gap: 14rpx;
  padding: 20rpx 18rpx;
  border-bottom: 1rpx solid #edf1f6;
}

.plan-row:last-child {
  border-bottom: 0;
}

.small-ring {
  width: 14rpx;
  height: 14rpx;
  flex: 0 0 auto;
  border: 4rpx solid $teacher-mobile-primary;
  border-radius: 50%;
}

.plan-label {
  width: 144rpx;
  flex: 0 0 auto;
  color: #10172d;
  font-size: 25rpx;
  font-weight: 900;
}

.plan-value {
  min-width: 0;
  flex: 1;
  color: #263b67;
  font-size: 25rpx;
  line-height: 1.45;
}

.ai-actions {
  gap: 28rpx;
  margin-top: 24rpx;
}

.ai-action-button {
  height: 62rpx;
  flex: 1;
  font-size: 27rpx;
}

.material-card {
  justify-content: space-between;
  gap: 18rpx;
}

.material-main {
  min-width: 0;
  flex: 1;
  gap: 18rpx;
}

.material-button {
  width: 156rpx;
  height: 60rpx;
  flex: 0 0 auto;
  font-size: 25rpx;
}

.notice-card {
  gap: 18rpx;
  padding: 24rpx 28rpx;
  border: 1rpx solid rgba(14, 193, 101, 0.18);
  border-radius: 18rpx;
  background: linear-gradient(90deg, #e9fbf1, #f7fffb);
}

.info-dot {
  display: flex;
  width: 34rpx;
  height: 34rpx;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 3rpx solid $teacher-mobile-primary;
  border-radius: 50%;
  color: $teacher-mobile-primary-dark;
  font-size: 22rpx;
  font-weight: 900;
}

.notice-title {
  color: $teacher-mobile-primary-dark;
  font-size: 31rpx;
  font-weight: 900;
}

.notice-desc {
  margin-top: 6rpx;
  color: #53617b;
  font-size: 25rpx;
  line-height: 1.35;
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

  .hero-title,
  .hero-subtitle {
    margin-left: 52rpx;
  }

  .hero-title {
    font-size: 48rpx;
  }

  .requirement-card,
  .input-card,
  .ai-card,
  .material-card {
    padding: 22rpx;
  }

  .requirement-copy {
    padding-right: 150rpx;
  }

  .requirement-art {
    right: 0;
    bottom: -30rpx;
    width: 210rpx;
    opacity: 0.42;
  }

  .prompt-text {
    font-size: 26rpx;
  }

  .prompt-tools {
    gap: 18rpx;
    font-size: 23rpx;
  }

  .field-row {
    gap: 12rpx;
  }

  .field-list {
    padding-left: 22rpx;
  }

  .field-label {
    width: 140rpx;
    font-size: 22rpx;
  }

  .field-value {
    padding: 0 12rpx;
    font-size: 22rpx;
  }

  .plan-row {
    gap: 10rpx;
    padding: 18rpx 12rpx;
  }

  .plan-label {
    width: 128rpx;
    font-size: 22rpx;
  }

  .plan-value {
    font-size: 22rpx;
  }

  .material-card {
    align-items: flex-start;
  }

  .material-button {
    width: 132rpx;
    font-size: 22rpx;
  }
}
</style>
