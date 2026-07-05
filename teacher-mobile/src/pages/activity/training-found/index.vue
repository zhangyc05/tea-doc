<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { submitTrainingDemand } from '../../../domain/training'

const directions = ['数字化教学应用', '项目化教学实施', '课堂互动设计', '课程资源建设']

function goBack() {
  uni.navigateBack()
}

function submitDemand() {
  const demand = submitTrainingDemand('ability-improvement')
  uni.navigateTo({ url: `/pages/activity/training-need-result/index?demandId=${demand.id}` })
}

function showDraftFeedback(action: string) {
  uni.showToast({ title: `${action}为本地模拟操作，后续接入真实编辑能力`, icon: 'none' })
}

function saveDraft() {
  uni.showToast({ title: '草稿已保存，本地模拟数据可继续提交', icon: 'none' })
}
</script>

<template>
  <view class="found-page">
    <view class="hero">
      <MobileNavbar title="提交培训需求" size="compact" @back="goBack" />
      <text class="hero__subtitle">选择想提升的方向，系统会生成培训需求说明，支持修改后提交</text>
      <view class="hero-art" aria-hidden="true">
        <view class="hero-art__paper"></view>
        <view class="hero-art__leaf hero-art__leaf--one"></view>
        <view class="hero-art__leaf hero-art__leaf--two"></view>
      </view>
    </view>

    <view class="content">
      <MobileCard class="mode-card">
        <view class="section-head">
          <view class="section-icon section-icon--people"></view>
          <text class="section-title">你想怎么提出需求？</text>
        </view>

        <view class="mode-option">
          <view class="option-icon option-icon--person"></view>
          <view class="mode-option__body">
            <text class="mode-option__title">我想提升某项能力</text>
            <text class="mode-option__desc">还没确定具体培训，系统帮你整理需求说明</text>
          </view>
          <view class="radio"></view>
        </view>

        <view class="mode-option mode-option--active">
          <view class="option-icon option-icon--doc"></view>
          <view class="mode-option__body">
            <text class="mode-option__title">我已找到想参加的培训</text>
            <text class="mode-option__desc">填写培训名称、地点或链接，提交学校确认</text>
          </view>
          <view class="radio radio--checked"></view>
        </view>
      </MobileCard>

      <MobileCard class="direction-card">
        <view class="section-head">
          <view class="section-icon section-icon--compass"></view>
          <text class="section-title">想提升的方向</text>
        </view>
        <view class="direction-list">
          <view
            v-for="(item, index) in directions"
            :key="item"
            class="direction-chip"
            :class="{ 'direction-chip--active': index === 0 }"
          >
            <text>{{ item }}</text>
            <view v-if="index === 0" class="chip-check"></view>
          </view>
        </view>
        <text class="direction-tip">系统结合能力画像与当前任课情况推荐</text>
      </MobileCard>

      <MobileCard class="statement-card">
        <view class="section-head">
          <view class="section-icon section-icon--doc"></view>
          <text class="section-title">培训需求说明</text>
        </view>
        <text class="ai-note">AI 已根据你选择的方向生成说明，可直接修改。</text>
        <view class="statement-box">
          <text class="statement-text">我希望参加数字化教学应用相关培训，重点学习在线测验、课堂互动工具和学习数据反馈在课堂教学中的应用方式，后续计划结合《智能制造基础》课程进行尝试。</text>
          <view class="panel-actions">
            <MobileActionButton class="panel-action" variant="outline" @tap="showDraftFeedback('修改说明')">修改说明</MobileActionButton>
            <MobileActionButton class="panel-action" variant="outline" @tap="showDraftFeedback('让 AI 再优化')">让 AI 再优化</MobileActionButton>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="after-card">
        <view class="section-head">
          <view class="section-icon section-icon--info"></view>
          <text class="section-title">提交后</text>
        </view>
        <text class="after-card__desc">业务部门会结合学校培训计划和资源情况确认，确认结果会通过系统消息提醒你。</text>
      </MobileCard>
    </view>

    <view class="bottom-actions">
      <MobileActionButton class="bottom-actions__button" variant="outline" @tap="saveDraft">保存草稿</MobileActionButton>
      <MobileActionButton class="bottom-actions__button" variant="primary" @tap="submitDemand">提交需求</MobileActionButton>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.found-page {
  min-height: 100vh;
  padding-bottom: calc(310rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 16% 2%, rgba(220, 252, 236, 0.86), transparent 30%),
    linear-gradient(180deg, #fbfffd 0%, #f7fbff 48%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  position: relative;
  min-height: 210rpx;
  padding: calc(var(--status-bar-height) + 12rpx) 28rpx 20rpx;
  overflow: hidden;
}

.hero__subtitle {
  position: relative;
  z-index: 1;
  display: block;
  max-width: 620rpx;
  margin: 0 auto;
  color: #4e5a74;
  font-size: 26rpx;
  font-weight: 600;
  line-height: 1.45;
  text-align: center;
}

.hero-art {
  position: absolute;
  top: 54rpx;
  right: 8rpx;
  z-index: 0;
  width: 188rpx;
  height: 126rpx;
  opacity: 0.62;
}

.hero-art__paper {
  position: absolute;
  right: 12rpx;
  bottom: 0;
  width: 124rpx;
  height: 78rpx;
  border: 7rpx solid rgba(92, 205, 146, 0.34);
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.62);
  transform: rotate(28deg);
}

.hero-art__paper::before,
.hero-art__paper::after {
  position: absolute;
  left: 22rpx;
  height: 7rpx;
  border-radius: 10rpx;
  background: rgba(92, 205, 146, 0.36);
  content: '';
}

.hero-art__paper::before {
  top: 20rpx;
  width: 72rpx;
}

.hero-art__paper::after {
  top: 42rpx;
  width: 54rpx;
}

.hero-art__leaf {
  position: absolute;
  border-radius: 100% 0;
  background: rgba(62, 196, 124, 0.44);
}

.hero-art__leaf--one {
  top: 0;
  right: 0;
  width: 50rpx;
  height: 34rpx;
  transform: rotate(38deg);
}

.hero-art__leaf--two {
  top: 38rpx;
  right: 36rpx;
  width: 42rpx;
  height: 28rpx;
  transform: rotate(72deg);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 0 28rpx;
}

.mode-card,
.direction-card,
.statement-card,
.after-card {
  padding: 28rpx;
}

.section-head,
.mode-option,
.direction-list,
.direction-chip,
.panel-actions,
.bottom-actions {
  display: flex;
  align-items: center;
}

.section-head {
  gap: 16rpx;
  margin-bottom: 20rpx;
}

.section-title {
  color: #10172d;
  font-size: 38rpx;
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

.section-icon--people::before,
.section-icon--people::after {
  position: absolute;
  border-radius: 50%;
  background: currentColor;
  content: '';
}

.section-icon--people::before {
  top: 2rpx;
  left: 6rpx;
  width: 14rpx;
  height: 14rpx;
  box-shadow: 14rpx 4rpx 0 rgba(14, 193, 101, 0.75);
}

.section-icon--people::after {
  right: 2rpx;
  bottom: 2rpx;
  left: 2rpx;
  height: 16rpx;
  border-radius: 18rpx 18rpx 8rpx 8rpx;
}

.section-icon--doc,
.section-icon--info {
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

.section-icon--compass {
  border: 5rpx solid currentColor;
  border-radius: 50%;
}

.section-icon--compass::before {
  position: absolute;
  top: 7rpx;
  left: 7rpx;
  width: 12rpx;
  height: 12rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 100% 100%, 0 68%);
  content: '';
}

.section-icon--info::before {
  position: absolute;
  top: 5rpx;
  left: 15rpx;
  width: 5rpx;
  height: 5rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 10rpx 0 #fff, 0 15rpx 0 #fff;
  content: '';
}

.mode-option {
  gap: 22rpx;
  padding: 22rpx 24rpx;
  border: 2rpx solid #dbe3ee;
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.78);
}

.mode-option + .mode-option {
  margin-top: 18rpx;
}

.mode-option--active {
  border-color: $teacher-mobile-primary;
  box-shadow: 0 10rpx 28rpx rgba(14, 193, 101, 0.08);
}

.mode-option__body {
  min-width: 0;
  flex: 1;
}

.mode-option__title {
  display: block;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
}

.mode-option__desc {
  display: block;
  margin-top: 8rpx;
  color: #52607a;
  font-size: 24rpx;
  line-height: 1.35;
}

.option-icon {
  position: relative;
  width: 72rpx;
  height: 72rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #e8fff0;
  color: $teacher-mobile-primary;
}

.option-icon--person::before {
  position: absolute;
  top: 16rpx;
  left: 25rpx;
  width: 22rpx;
  height: 22rpx;
  border: 5rpx solid currentColor;
  border-radius: 50%;
  content: '';
}

.option-icon--person::after {
  position: absolute;
  right: 16rpx;
  bottom: 14rpx;
  left: 16rpx;
  height: 20rpx;
  border: 5rpx solid currentColor;
  border-top: 0;
  border-radius: 0 0 22rpx 22rpx;
  content: '';
}

.option-icon--doc::before {
  position: absolute;
  inset: 17rpx 20rpx;
  border-radius: 7rpx;
  background: currentColor;
  content: '';
}

.option-icon--doc::after {
  position: absolute;
  right: 13rpx;
  bottom: 13rpx;
  width: 22rpx;
  height: 22rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: inset 0 0 0 5rpx #e8fff0;
  content: '';
}

.radio {
  width: 34rpx;
  height: 34rpx;
  flex: 0 0 auto;
  border: 3rpx solid #ccd5e4;
  border-radius: 50%;
}

.radio--checked {
  position: relative;
  border-color: $teacher-mobile-primary;
  background: $teacher-mobile-primary;
}

.radio--checked::before {
  position: absolute;
  top: 8rpx;
  left: 7rpx;
  width: 16rpx;
  height: 9rpx;
  border-bottom: 4rpx solid #fff;
  border-left: 4rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.direction-list {
  flex-wrap: wrap;
  gap: 20rpx;
}

.direction-chip {
  position: relative;
  min-width: 170rpx;
  height: 58rpx;
  justify-content: center;
  padding: 0 22rpx;
  border: 2rpx solid #d9e1ec;
  border-radius: 14rpx;
  background: #fff;
  color: #263552;
  font-size: 26rpx;
  font-weight: 700;
}

.direction-chip--active {
  border-color: $teacher-mobile-primary;
  color: $teacher-mobile-primary-dark;
  font-weight: 900;
}

.chip-check {
  position: absolute;
  right: -9rpx;
  bottom: -9rpx;
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.chip-check::before {
  position: absolute;
  top: 9rpx;
  left: 7rpx;
  width: 14rpx;
  height: 8rpx;
  border-bottom: 4rpx solid #fff;
  border-left: 4rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.direction-tip,
.ai-note,
.after-card__desc {
  display: block;
  color: #4f5d78;
  font-size: 25rpx;
  line-height: 1.5;
}

.direction-tip {
  margin-top: 28rpx;
}

.ai-note {
  width: fit-content;
  margin-bottom: 18rpx;
  padding: 8rpx 14rpx;
  border-radius: 10rpx;
  background: #eefaf3;
}

.statement-box {
  padding: 22rpx;
  border: 2rpx solid rgba(14, 193, 101, 0.28);
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 0.78);
}

.statement-text {
  display: block;
  color: #1d2940;
  font-size: 27rpx;
  line-height: 1.85;
}

.panel-actions {
  gap: 28rpx;
  margin-top: 24rpx;
}

.panel-action {
  height: 54rpx;
  flex: 1;
  font-size: 25rpx;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: calc(138rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 45;
  gap: 22rpx;
  padding: 18rpx 28rpx 20rpx;
  background: linear-gradient(180deg, rgba(247, 251, 255, 0), rgba(247, 251, 255, 0.96) 26%, rgba(247, 251, 255, 0.98));
}

.bottom-actions__button {
  height: 60rpx;
  flex: 1;
  font-size: 28rpx;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .mode-card,
  .direction-card,
  .statement-card,
  .after-card {
    padding: 22rpx;
  }

  .direction-chip {
    min-width: 140rpx;
    font-size: 24rpx;
  }

  .panel-actions {
    gap: 18rpx;
  }

  .bottom-actions {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }
}
</style>
