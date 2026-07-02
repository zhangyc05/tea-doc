<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

const baseFields = [
  { label: '实践单位：', value: '济南智能制造实训基地' },
  { label: '实践岗位/内容：', value: '设备调试与产线观察' },
  { label: '实践时间：', value: '2026-03-01 至 2026-03-08' },
  { label: '预计计入天数：', value: '8 天' },
]

const practiceRows = [
  { label: '实践任务：', value: '设备调试流程学习、产线运行观察、现场安全规范记录' },
  { label: '实践收获：', value: '了解企业产线运行和设备调试流程' },
  { label: '教学转化方向：', value: '可用于智能制造课程中的设备调试案例' },
]

function goBack() {
  uni.navigateBack()
}

function saveDraft() {
  uni.showToast({ title: '草稿已保存', icon: 'none' })
}

function goConfirmed() {
  uni.navigateTo({ url: '/pages/activity/enterprise-history-confirmed/index' })
}
</script>

<template>
  <view class="history-supplement-page">
    <view class="hero">
      <view class="hero-leaf"></view>
      <MobileNavbar title="" size="compact" @back="goBack" />
      <text class="hero-title">企业实践</text>
      <text class="hero-subtitle">补充已完成但平台暂未记录的企业实践</text>
    </view>

    <view class="content">
      <MobileCard class="requirement-card">
        <view class="requirement-copy">
          <text class="requirement-title">本年度企业实践要求</text>
          <view class="days-line">
            <text class="days-number">30</text>
            <text class="days-unit">天</text>
          </view>
          <view class="archive-line">
            <text>已归档</text>
            <text class="green-text">20 天</text>
            <text>，还差</text>
            <text class="orange-text">10 天</text>
          </view>
          <text class="requirement-desc">补充确认通过后，将计入年度企业实践记录。</text>
        </view>
        <view class="requirement-art">
          <view class="calendar-art"></view>
          <view class="folder-art"></view>
        </view>
      </MobileCard>

      <MobileCard class="input-card">
        <text class="card-title">输入历史实践信息</text>
        <text class="card-desc">可以输入、语音说明、拍照或上传实践证明，AI 会自动识别并整理。</text>
        <view class="prompt-box">
          <text class="prompt-text">2026 年 3 月 1 日至 3 月 8 日，我在济南智能制造实训基地参加设备调试与产线观察实践，主要学习设备调试流程、产线运行记录和现场安全规范，并形成了实践证明材料。</text>
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
              <text>上传资料</text>
            </view>
          </view>
        </view>
        <view class="file-chip">
          <view class="pdf-icon">PDF</view>
          <text>实践证明.pdf</text>
          <text class="close">x</text>
        </view>
      </MobileCard>

      <MobileCard class="ai-card">
        <view class="ai-head">
          <view class="robot-icon"></view>
          <text class="ai-title">AI 已整理历史实践记录</text>
        </view>

        <view class="section-band">基础信息</view>
        <view class="field-list">
          <view v-for="item in baseFields" :key="item.label" class="field-row">
            <text class="field-label">{{ item.label }}</text>
            <text class="field-value">{{ item.value }}</text>
          </view>
        </view>

        <view class="section-band section-band--content">实践内容</view>
        <view class="field-list">
          <view v-for="item in practiceRows" :key="item.label" class="field-row field-row--long">
            <text class="field-label">{{ item.label }}</text>
            <text class="field-value">{{ item.value }}</text>
          </view>
        </view>

        <view class="ai-actions">
          <MobileActionButton class="ai-action-button" variant="outline">修改内容</MobileActionButton>
          <MobileActionButton class="ai-action-button" variant="outline">重新整理</MobileActionButton>
        </view>
      </MobileCard>

      <MobileCard class="material-card">
        <view class="material-main">
          <view class="material-icon"></view>
          <view class="material-copy">
            <text class="card-title">证明材料</text>
            <text class="material-status">已上传 <text class="green-text">1</text> 份：实践证明.pdf</text>
            <text class="material-tip">建议补充：单位盖章证明、过程照片、成果材料等</text>
          </view>
        </view>
        <MobileActionButton class="material-button" variant="outline">补充资料</MobileActionButton>
      </MobileCard>

      <view class="notice-card">
        <view class="info-dot">i</view>
        <view>
          <text class="notice-title">提交后说明</text>
          <text class="notice-desc">提交后将进入学院确认，确认通过后才会计入年度企业实践记录。</text>
        </view>
      </view>
    </view>

    <view class="bottom-actions">
      <MobileActionButton class="bottom-button bottom-button--draft" variant="outline" @tap="saveDraft">保存草稿</MobileActionButton>
      <MobileActionButton class="bottom-button" variant="primary" @tap="goConfirmed">提交确认</MobileActionButton>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.history-supplement-page {
  min-height: 100vh;
  padding-bottom: calc(330rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 86% 5%, rgba(190, 246, 218, 0.72), transparent 25%),
    linear-gradient(180deg, #f9fffc 0%, #ffffff 28%, #f6fbf8 100%);
  color: #10172d;
}

.hero {
  position: relative;
  padding: calc(var(--status-bar-height) + 14rpx) 28rpx 28rpx;
  overflow: hidden;
}

.hero-title,
.hero-subtitle,
.requirement-title,
.requirement-desc,
.card-title,
.card-desc,
.prompt-text,
.field-label,
.field-value,
.material-status,
.material-tip,
.notice-title,
.notice-desc {
  display: block;
}

.hero-title {
  margin-left: 62rpx;
  font-size: 58rpx;
  font-weight: 900;
  line-height: 1.12;
}

.hero-subtitle {
  margin: 10rpx 0 0 62rpx;
  color: #263b67;
  font-size: 28rpx;
  line-height: 1.42;
}

.hero-leaf {
  position: absolute;
  right: 28rpx;
  top: 44rpx;
  width: 168rpx;
  height: 128rpx;
  opacity: 0.48;
}

.hero-leaf::before,
.hero-leaf::after {
  position: absolute;
  border-radius: 999rpx 999rpx 0 999rpx;
  background: #a5ecc6;
  content: '';
}

.hero-leaf::before {
  right: 18rpx;
  width: 64rpx;
  height: 112rpx;
  transform: rotate(42deg);
}

.hero-leaf::after {
  right: 92rpx;
  top: 48rpx;
  width: 58rpx;
  height: 82rpx;
  transform: rotate(-54deg);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 28rpx;
}

.requirement-card,
.input-card,
.ai-card,
.material-card {
  padding: 30rpx;
  border-radius: 24rpx;
}

.requirement-card {
  position: relative;
  min-height: 236rpx;
  overflow: hidden;
}

.requirement-copy {
  position: relative;
  z-index: 1;
  padding-right: 282rpx;
}

.requirement-title {
  font-size: 32rpx;
  font-weight: 900;
}

.days-line,
.archive-line,
.prompt-tools,
.tool-item,
.file-chip,
.ai-head,
.field-row,
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
  margin-top: 22rpx;
}

.days-number {
  color: #08b85a;
  font-size: 78rpx;
  font-weight: 900;
  line-height: 1;
}

.days-unit {
  font-size: 36rpx;
  font-weight: 900;
}

.archive-line {
  flex-wrap: wrap;
  gap: 11rpx;
  margin-top: 14rpx;
  color: #344054;
  font-size: 29rpx;
  font-weight: 800;
}

.green-text {
  color: #08a85c;
  font-weight: 900;
}

.orange-text {
  color: #ff5a18;
  font-weight: 900;
}

.requirement-desc {
  margin-top: 20rpx;
  color: #53617b;
  font-size: 26rpx;
  line-height: 1.45;
}

.requirement-art {
  position: absolute;
  right: 30rpx;
  bottom: 24rpx;
  width: 250rpx;
  height: 170rpx;
}

.calendar-art {
  position: absolute;
  left: 0;
  top: 8rpx;
  width: 126rpx;
  height: 126rpx;
  border-radius: 20rpx;
  background: #f2fff8;
  box-shadow: 0 18rpx 40rpx rgba(30, 64, 43, 0.08);
}

.calendar-art::before {
  position: absolute;
  inset: 0 0 auto;
  height: 38rpx;
  border-radius: 20rpx 20rpx 0 0;
  background: #8ee8ad;
  content: '';
}

.calendar-art::after {
  position: absolute;
  inset: 56rpx 24rpx 20rpx;
  background:
    linear-gradient(#cff5dc, #cff5dc) 0 0 / 18rpx 18rpx no-repeat,
    linear-gradient(#cff5dc, #cff5dc) 34rpx 0 / 18rpx 18rpx no-repeat,
    linear-gradient(#cff5dc, #cff5dc) 68rpx 0 / 18rpx 18rpx no-repeat,
    linear-gradient(#cff5dc, #cff5dc) 0 34rpx / 18rpx 18rpx no-repeat,
    linear-gradient(#cff5dc, #cff5dc) 34rpx 34rpx / 18rpx 18rpx no-repeat;
  content: '';
}

.folder-art {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 122rpx;
  height: 86rpx;
  border-radius: 16rpx;
  background: linear-gradient(135deg, #6bdd9e, #16b96a);
  box-shadow: 0 18rpx 36rpx rgba(3, 177, 84, 0.2);
}

.folder-art::before {
  position: absolute;
  left: 22rpx;
  top: 40rpx;
  width: 44rpx;
  height: 8rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.58);
  box-shadow: 54rpx 0 0 rgba(255, 255, 255, 0.58);
  content: '';
}

.card-title {
  font-size: 33rpx;
  font-weight: 900;
}

.card-desc {
  margin-top: 8rpx;
  color: #53617b;
  font-size: 26rpx;
  line-height: 1.4;
}

.prompt-box {
  margin-top: 20rpx;
  padding: 24rpx 26rpx;
  border: 2rpx solid #08b85a;
  border-radius: 16rpx;
}

.prompt-text {
  color: #10172d;
  font-size: 31rpx;
  font-weight: 800;
  line-height: 1.7;
}

.prompt-tools {
  justify-content: flex-end;
  gap: 34rpx;
  margin-top: 28rpx;
  color: #08a85c;
  font-size: 27rpx;
  font-weight: 800;
}

.tool-item {
  flex-direction: column;
  gap: 7rpx;
}

.tool-icon {
  position: relative;
  width: 58rpx;
  height: 58rpx;
  border: 2rpx solid #ddf7e9;
  border-radius: 50%;
  background: #fafffd;
}

.tool-icon::before,
.tool-icon::after {
  position: absolute;
  content: '';
}

.tool-icon--voice::before {
  left: 21rpx;
  top: 10rpx;
  width: 16rpx;
  height: 26rpx;
  border: 5rpx solid currentColor;
  border-radius: 999rpx;
}

.tool-icon--voice::after {
  left: 16rpx;
  bottom: 10rpx;
  width: 26rpx;
  height: 14rpx;
  border-bottom: 5rpx solid currentColor;
  border-left: 5rpx solid currentColor;
  border-right: 5rpx solid currentColor;
  border-radius: 0 0 999rpx 999rpx;
}

.tool-icon--camera::before {
  inset: 17rpx 11rpx 12rpx;
  border: 5rpx solid currentColor;
  border-radius: 8rpx;
}

.tool-icon--camera::after {
  left: 23rpx;
  top: 24rpx;
  width: 12rpx;
  height: 12rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.tool-icon--upload::before {
  left: 13rpx;
  right: 13rpx;
  bottom: 13rpx;
  height: 16rpx;
  border: 5rpx solid currentColor;
  border-top: 0;
  border-radius: 0 0 8rpx 8rpx;
}

.tool-icon--upload::after {
  left: 21rpx;
  top: 12rpx;
  width: 16rpx;
  height: 16rpx;
  border-top: 5rpx solid currentColor;
  border-left: 5rpx solid currentColor;
  transform: rotate(45deg);
}

.file-chip {
  width: fit-content;
  gap: 14rpx;
  margin-top: 18rpx;
  padding: 12rpx 20rpx;
  border: 1rpx solid #dde5f0;
  border-radius: 13rpx;
  background: #fafcff;
  color: #53617b;
  font-size: 26rpx;
}

.pdf-icon {
  padding: 4rpx 7rpx;
  border-radius: 5rpx;
  background: #ef4444;
  color: #fff;
  font-size: 18rpx;
  font-weight: 900;
}

.close {
  margin-left: 10rpx;
  color: #74809a;
  font-size: 32rpx;
}

.ai-head {
  gap: 18rpx;
}

.robot-icon {
  position: relative;
  width: 50rpx;
  height: 42rpx;
  flex: 0 0 auto;
  border-radius: 16rpx;
  background: #08b85a;
}

.robot-icon::before {
  position: absolute;
  top: -12rpx;
  left: 20rpx;
  width: 10rpx;
  height: 14rpx;
  border-radius: 999rpx;
  background: #08b85a;
  content: '';
}

.robot-icon::after {
  position: absolute;
  left: 13rpx;
  top: 17rpx;
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: #eafff2;
  box-shadow: 17rpx 0 0 #eafff2;
  content: '';
}

.ai-title {
  font-size: 33rpx;
  font-weight: 900;
}

.section-band {
  margin-top: 22rpx;
  padding: 10rpx 24rpx;
  border-radius: 12rpx 12rpx 0 0;
  background: linear-gradient(90deg, #e6f8ef, #f4fff9);
  color: #1f2a44;
  font-size: 28rpx;
  font-weight: 800;
}

.section-band--content {
  margin-top: 24rpx;
}

.field-list {
  padding: 0 2rpx;
}

.field-row {
  gap: 20rpx;
  padding: 15rpx 24rpx;
  border-bottom: 1rpx solid #e6ebf2;
}

.field-row--long {
  align-items: flex-start;
}

.field-label {
  width: 182rpx;
  flex: 0 0 auto;
  color: #53617b;
  font-size: 28rpx;
  line-height: 1.38;
}

.field-value {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 28rpx;
  line-height: 1.46;
}

.ai-actions {
  gap: 30rpx;
  margin-top: 24rpx;
}

.ai-action-button {
  height: 68rpx;
  flex: 1;
  font-size: 29rpx;
}

.material-card {
  justify-content: space-between;
  gap: 18rpx;
}

.material-main {
  min-width: 0;
  flex: 1;
  gap: 20rpx;
}

.material-icon {
  position: relative;
  width: 48rpx;
  height: 48rpx;
  flex: 0 0 auto;
  border-radius: 8rpx;
  background: #10b96a;
}

.material-icon::before {
  position: absolute;
  left: 15rpx;
  top: 14rpx;
  width: 18rpx;
  height: 5rpx;
  border-radius: 999rpx;
  background: #eafff2;
  box-shadow: 0 11rpx 0 #eafff2;
  content: '';
}

.material-copy {
  min-width: 0;
}

.material-status {
  margin-top: 14rpx;
  color: #10172d;
  font-size: 28rpx;
}

.material-tip {
  margin-top: 10rpx;
  color: #53617b;
  font-size: 25rpx;
  line-height: 1.4;
}

.material-button {
  width: 164rpx;
  height: 66rpx;
  flex: 0 0 auto;
  font-size: 27rpx;
}

.notice-card {
  gap: 18rpx;
  padding: 24rpx 30rpx;
  border: 1rpx solid rgba(14, 193, 101, 0.16);
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.94);
}

.info-dot {
  display: flex;
  width: 38rpx;
  height: 38rpx;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #08b85a;
  color: #fff;
  font-size: 25rpx;
  font-weight: 900;
}

.notice-title {
  font-size: 32rpx;
  font-weight: 900;
}

.notice-desc {
  margin-top: 8rpx;
  color: #53617b;
  font-size: 26rpx;
  line-height: 1.42;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: calc(164rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 6;
  gap: 32rpx;
  padding: 22rpx 28rpx;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(16rpx);
}

.bottom-button {
  height: 84rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 31rpx;
}

.bottom-button--draft {
  background: #fff;
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
    padding-right: 152rpx;
  }

  .requirement-art {
    right: 4rpx;
    bottom: 12rpx;
    width: 176rpx;
    opacity: 0.58;
  }

  .prompt-text {
    font-size: 27rpx;
  }

  .prompt-tools {
    gap: 18rpx;
    font-size: 23rpx;
  }

  .field-row {
    gap: 10rpx;
    padding-right: 12rpx;
    padding-left: 12rpx;
  }

  .field-label {
    width: 152rpx;
    font-size: 24rpx;
  }

  .field-value {
    font-size: 24rpx;
  }

  .material-card {
    align-items: flex-start;
  }

  .material-button {
    width: 136rpx;
    font-size: 23rpx;
  }

  .bottom-actions {
    gap: 22rpx;
    padding-right: 18rpx;
    padding-left: 18rpx;
  }
}
</style>
