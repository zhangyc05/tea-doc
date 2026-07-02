<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const practiceRows = [
  { label: '实践单位', value: '济南智能制造实训基地', type: 'building' },
  { label: '实践岗位/内容', value: '设备调试与产线观察', type: 'bag' },
  { label: '实践时间', value: '2026-03-01 至 2026-03-08', type: 'calendar' },
  { label: '计入天数', value: '8 天', type: 'clock' },
  { label: '提交时间', value: '2026-05-28 09:41', type: 'check' },
]

const materialRows = [
  {
    title: '企业实践证明（需单位盖章）',
    desc: '请上传加盖企业公章的实践证明材料',
  },
  {
    title: '过程材料（选填，但建议提供）',
    desc: '如实践过程照片、任务成果、实践记录等',
  },
]

function goBack() {
  uni.navigateBack()
}

function showHelp() {
  uni.showToast({ title: '请补充盖章证明后重新提交', icon: 'none' })
}

function showUploadTip() {
  uni.showToast({ title: '请选择补充材料上传', icon: 'none' })
}

function saveDraft() {
  uni.showToast({ title: '草稿已保存', icon: 'none' })
}

function submitAgain() {
  uni.showToast({ title: '补充后可重新提交', icon: 'none' })
}
</script>

<template>
  <view class="history-needed-page">
    <MobileNavbar title="企业实践" size="regular" @back="goBack">
      <template #right>
        <button class="help-button" @tap="showHelp">帮助</button>
      </template>
    </MobileNavbar>

    <view class="hero">
      <view class="warning-art">
        <text>!</text>
        <view class="spark spark--one"></view>
        <view class="spark spark--two"></view>
        <view class="spark spark--three"></view>
      </view>
      <view class="hero-copy">
        <text class="hero-title">历史实践需补充材料</text>
        <text class="hero-desc">学院已退回，请补充材料或完善信息后重新提交</text>
        <text class="status-pill">待补充</text>
      </view>
    </view>

    <view class="content">
      <MobileCard class="return-card">
        <text class="card-title">退回信息</text>
        <view class="return-grid">
          <view class="return-item">
            <text class="return-label">退回人：</text>
            <text class="return-value">智能制造学院教学办公室</text>
          </view>
          <view class="return-item">
            <text class="return-label">退回时间：</text>
            <text class="return-value">2026-05-29 14:32</text>
          </view>
        </view>
        <view class="reason-row">
          <text class="return-label">退回原因：</text>
          <text class="reason-text">证明材料不完整</text>
        </view>
        <view class="opinion-block">
          <text class="opinion-title">退回意见：</text>
          <text class="opinion-text">未提供单位盖章的实践证明，无法核实实践真实性；建议补充企业实践证明（需单位盖章）和过程照片等材料。</text>
        </view>
      </MobileCard>

      <MobileCard class="practice-card">
        <view class="card-head">
          <text class="card-title">本次历史实践</text>
          <text class="muted-title">（已提交内容）</text>
          <button class="detail-button" @tap="showHelp">查看详情</button>
          <view class="chevron"></view>
        </view>
        <view class="practice-list">
          <view v-for="item in practiceRows" :key="item.label" class="practice-row">
            <view class="row-icon" :class="`row-icon--${item.type}`"></view>
            <text class="practice-label">{{ item.label }}</text>
            <text class="practice-value">{{ item.value }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="material-card">
        <text class="card-title">需补充的材料</text>
        <view class="warn-strip">请补充以下材料，或完善相关信息后重新提交。</view>
        <view class="material-list">
          <view v-for="item in materialRows" :key="item.title" class="material-row" @tap="showUploadTip">
            <view class="required-icon">!</view>
            <view class="material-copy">
              <text class="material-title">{{ item.title }}</text>
              <text class="material-desc">{{ item.desc }}</text>
            </view>
            <text class="missing-text">未上传</text>
            <view class="chevron chevron--orange"></view>
          </view>
        </view>

        <view class="upload-section">
          <text class="upload-title">补充材料上传</text>
          <view class="upload-box" @tap="showUploadTip">
            <view class="upload-plus">+</view>
            <text>上传材料</text>
          </view>
          <text class="upload-desc">支持 PDF、JPG、PNG 格式，单个文件不超过 20MB 可上传多份材料</text>
        </view>
      </MobileCard>
    </view>

    <view class="bottom-actions">
      <MobileActionButton class="action-button action-button--draft" variant="outline" @tap="saveDraft">保存草稿</MobileActionButton>
      <MobileActionButton class="action-button" variant="primary" @tap="submitAgain">补充后重新提交</MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.history-needed-page {
  min-height: 100vh;
  padding-bottom: calc(164rpx + env(safe-area-inset-bottom));
  background:
    linear-gradient(180deg, #fff3e9 0, #fff9f4 292rpx, #f7f8fb 292rpx, #f7f8fb 100%);
  color: #10172d;
}

.help-button {
  margin: 0 24rpx 0 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #10172d;
  font-size: 29rpx;
  font-weight: 800;
  line-height: 1;
}

.help-button::after,
.detail-button::after {
  display: none;
}

.hero,
.card-head,
.return-grid,
.return-item,
.reason-row,
.practice-row,
.material-row,
.bottom-actions {
  display: flex;
  align-items: center;
}

.hero {
  gap: 42rpx;
  padding: 42rpx 64rpx 44rpx;
}

.warning-art {
  position: relative;
  display: flex;
  width: 118rpx;
  height: 118rpx;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(145deg, #ff8b2f, #ff5b13);
  color: #fff;
  font-size: 76rpx;
  font-weight: 900;
  box-shadow: 0 36rpx 42rpx rgba(255, 92, 19, 0.16);
}

.warning-art::after {
  position: absolute;
  right: -28rpx;
  bottom: -28rpx;
  left: -28rpx;
  height: 40rpx;
  border-radius: 50%;
  background: rgba(255, 107, 26, 0.12);
  content: '';
}

.spark {
  position: absolute;
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #ffb38b;
}

.spark--one {
  left: -36rpx;
  top: 28rpx;
}

.spark--two {
  right: -32rpx;
  top: 22rpx;
}

.spark--three {
  left: -18rpx;
  bottom: 24rpx;
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.hero-title,
.hero-desc,
.card-title,
.return-label,
.return-value,
.opinion-title,
.opinion-text,
.practice-label,
.practice-value,
.material-title,
.material-desc,
.upload-title,
.upload-desc {
  display: block;
}

.hero-title {
  font-size: 45rpx;
  font-weight: 900;
  line-height: 1.18;
}

.hero-desc {
  margin-top: 18rpx;
  color: #526079;
  font-size: 28rpx;
  line-height: 1.42;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  margin-top: 16rpx;
  padding: 8rpx 20rpx;
  border-radius: 999rpx;
  background: linear-gradient(135deg, #ff8128, #ff5b13);
  color: #fff;
  font-size: 25rpx;
  font-weight: 900;
}

.status-pill::before {
  width: 18rpx;
  height: 18rpx;
  margin-right: 8rpx;
  border: 3rpx solid #fff;
  border-radius: 50%;
  content: '';
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 36rpx;
}

.return-card,
.practice-card,
.material-card {
  padding: 28rpx 28rpx 30rpx;
  border-radius: 22rpx;
  box-shadow: 0 18rpx 46rpx rgba(35, 51, 87, 0.08);
}

.card-title {
  font-size: 32rpx;
  font-weight: 900;
}

.return-grid {
  justify-content: space-between;
  gap: 26rpx;
  margin-top: 30rpx;
}

.return-item {
  min-width: 0;
  flex: 1;
  gap: 8rpx;
}

.return-label,
.return-value {
  color: #526079;
  font-size: 27rpx;
  line-height: 1.35;
}

.return-label {
  flex: 0 0 auto;
}

.return-value {
  min-width: 0;
  flex: 1;
}

.reason-row {
  gap: 8rpx;
  margin-top: 26rpx;
}

.reason-text {
  color: #ff5b13;
  font-size: 28rpx;
  font-weight: 900;
}

.opinion-block {
  margin-top: 28rpx;
}

.opinion-title {
  font-size: 28rpx;
  font-weight: 900;
}

.opinion-text {
  margin-top: 12rpx;
  color: #344054;
  font-size: 27rpx;
  line-height: 1.55;
}

.card-head {
  gap: 8rpx;
}

.muted-title {
  color: #8a94a6;
  font-size: 30rpx;
  font-weight: 900;
}

.detail-button {
  margin: 0 0 0 auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: #08a85c;
  font-size: 27rpx;
  font-weight: 800;
  line-height: 1;
}

.chevron {
  width: 18rpx;
  height: 18rpx;
  flex: 0 0 auto;
  border-top: 4rpx solid #8a94a6;
  border-right: 4rpx solid #8a94a6;
  transform: rotate(45deg);
}

.practice-list {
  margin-top: 26rpx;
}

.practice-row {
  gap: 24rpx;
  padding: 14rpx 0;
}

.row-icon {
  position: relative;
  width: 36rpx;
  height: 36rpx;
  flex: 0 0 auto;
  border-radius: 10rpx;
  background: #e8f8ef;
  color: #08a85c;
}

.row-icon::before,
.row-icon::after {
  position: absolute;
  content: '';
}

.row-icon--building::before {
  inset: 8rpx 9rpx 5rpx;
  border-radius: 3rpx;
  background: currentColor;
  box-shadow: 10rpx 8rpx 0 -2rpx currentColor;
}

.row-icon--bag::before {
  left: 9rpx;
  top: 13rpx;
  width: 19rpx;
  height: 16rpx;
  border-radius: 4rpx;
  background: currentColor;
}

.row-icon--bag::after {
  left: 14rpx;
  top: 8rpx;
  width: 8rpx;
  height: 7rpx;
  border: 3rpx solid currentColor;
  border-bottom: 0;
  border-radius: 8rpx 8rpx 0 0;
}

.row-icon--calendar::before {
  inset: 7rpx 6rpx 5rpx;
  border: 3rpx solid currentColor;
  border-radius: 5rpx;
}

.row-icon--calendar::after {
  top: 16rpx;
  right: 6rpx;
  left: 6rpx;
  border-top: 3rpx solid currentColor;
}

.row-icon--clock::before {
  inset: 6rpx;
  border: 3rpx solid currentColor;
  border-radius: 50%;
}

.row-icon--clock::after {
  left: 17rpx;
  top: 10rpx;
  width: 3rpx;
  height: 12rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: 6rpx 9rpx 0 -1rpx currentColor;
}

.row-icon--check::before {
  left: 8rpx;
  top: 8rpx;
  width: 20rpx;
  height: 20rpx;
  border: 3rpx solid currentColor;
  border-radius: 50%;
}

.row-icon--check::after {
  left: 14rpx;
  top: 17rpx;
  width: 10rpx;
  height: 6rpx;
  border-bottom: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
  transform: rotate(-45deg);
}

.practice-label {
  width: 180rpx;
  flex: 0 0 auto;
  color: #344054;
  font-size: 28rpx;
}

.practice-value {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 29rpx;
  line-height: 1.35;
}

.warn-strip {
  margin-top: 26rpx;
  padding: 19rpx 22rpx;
  border-radius: 12rpx;
  background: linear-gradient(90deg, #fff0f0, #fff4f4);
  color: #ef3333;
  font-size: 27rpx;
  line-height: 1.35;
}

.material-list {
  margin-top: 20rpx;
}

.material-row {
  position: relative;
  gap: 20rpx;
  padding: 22rpx 0;
}

.material-row + .material-row {
  border-top: 1rpx solid #edf1f4;
}

.required-icon {
  width: 28rpx;
  height: 28rpx;
  flex: 0 0 auto;
  border: 4rpx solid #ef3333;
  border-radius: 50%;
  color: #ef3333;
  font-size: 21rpx;
  font-weight: 900;
  line-height: 20rpx;
  text-align: center;
}

.material-copy {
  min-width: 0;
  flex: 1;
}

.material-title {
  font-size: 29rpx;
  font-weight: 800;
  line-height: 1.35;
}

.material-desc {
  margin-top: 9rpx;
  color: #8a94a6;
  font-size: 25rpx;
  line-height: 1.35;
}

.missing-text {
  flex: 0 0 auto;
  color: #ff5b13;
  font-size: 27rpx;
}

.upload-section {
  margin-top: 10rpx;
  padding-top: 26rpx;
  border-top: 1rpx solid #edf1f4;
}

.upload-title {
  font-size: 29rpx;
  font-weight: 900;
}

.upload-box {
  display: flex;
  min-height: 104rpx;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8rpx;
  margin-top: 24rpx;
  border: 2rpx dashed #dce3eb;
  border-radius: 12rpx;
  background: #fff;
  color: #6b7588;
  font-size: 25rpx;
}

.upload-plus {
  color: #08a85c;
  font-size: 54rpx;
  font-weight: 300;
  line-height: 1;
}

.upload-desc {
  margin-top: 18rpx;
  color: #7c8798;
  font-size: 25rpx;
  line-height: 1.45;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 6;
  gap: 28rpx;
  padding: 24rpx 36rpx calc(26rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(16rpx);
}

.action-button {
  height: 84rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 31rpx;
}

.action-button--draft {
  background: #fff;
}

@media (max-width: 374px) {
  .hero {
    gap: 24rpx;
    padding-right: 28rpx;
    padding-left: 28rpx;
  }

  .warning-art {
    width: 96rpx;
    height: 96rpx;
    font-size: 62rpx;
  }

  .hero-title {
    font-size: 36rpx;
  }

  .content {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .return-card,
  .practice-card,
  .material-card {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .return-grid {
    align-items: flex-start;
    flex-direction: column;
    gap: 12rpx;
  }

  .practice-row {
    gap: 14rpx;
  }

  .practice-label {
    width: 144rpx;
    font-size: 25rpx;
  }

  .practice-value,
  .material-title {
    font-size: 25rpx;
  }

  .missing-text {
    font-size: 24rpx;
  }

  .bottom-actions {
    gap: 18rpx;
    padding-right: 24rpx;
    padding-left: 24rpx;
  }
}
</style>
