<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileIcon from '../../../components/MobileIcon.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { submitTrainingDemand } from '../../../domain/training'

const recognizedInfo = [
  ['培训名称：', '全国职业院校数字化教学能力提升研修班'],
  ['举办单位：', '职业教育教师发展中心'],
  ['培训时间：', '2026-06-18  至  2026-06-20'],
  ['培训地点 / 方式：', '南京  |  线下培训'],
  ['来源材料：', '通知截图 1 张、培训链接 1 条'],
]

function goBack() {
  uni.navigateBack()
}

function submitDemand() {
  const demand = submitTrainingDemand('found-training')
  uni.navigateTo({ url: `/pages/activity/training-demand-result/index?demandId=${demand.id}` })
}

function showDraftFeedback(action: string) {
  uni.showToast({ title: `${action}为本地模拟操作，后续接入真实编辑能力`, icon: 'none' })
}

function saveDraft() {
  uni.showToast({ title: '草稿已保存，本地模拟数据可继续提交', icon: 'none' })
}
</script>

<template>
  <view class="training-demand-page">
    <view class="hero">
      <MobileNavbar title="提交培训需求" size="compact" @back="goBack" />
      <text class="hero__subtitle">没有找到合适资源？可以告诉学校你的培训需求</text>
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

        <wd-radio-group class="mode-group" model-value="found-training" checked-color="#04a851">
        <view class="mode-option">
          <view class="option-icon option-icon--person"></view>
          <view class="mode-option__body">
            <text class="mode-option__title">我想提升某项能力</text>
            <text class="mode-option__desc">还没确定具体培训，系统帮你整理需求说明</text>
          </view>
          <wd-radio class="mode-radio" value="ability-demand" />
        </view>

        <view class="mode-option mode-option--active">
          <view class="option-icon option-icon--doc"></view>
          <view class="mode-option__body">
            <text class="mode-option__title">我已找到想参加的培训</text>
            <text class="mode-option__desc">填写培训名称、地点或链接，提交学校确认</text>
          </view>
          <wd-radio class="mode-radio" value="found-training" />
        </view>
        </wd-radio-group>
      </MobileCard>

      <MobileCard class="form-card">
        <view class="section-head">
          <view class="section-icon section-icon--doc"></view>
          <text class="section-title">培训信息</text>
        </view>
        <text class="section-desc">把培训通知、链接或想参加的信息告诉 AI，系统会自动帮你整理</text>
        <view class="input-box">
          <wd-textarea
            class="input-box__textarea"
            :maxlength="300"
            model-value=""
            placeholder="说说你想参加的培训，或粘贴通知内容..."
            placeholder-class="input-box__placeholder"
            show-word-limit
            no-border
          />
          <view class="input-actions">
            <view class="input-action">
              <MobileIcon class="input-action__icon" name="mic" tone="dark" size="plain" shape="none" />
              <text>语音</text>
            </view>
            <view class="input-action">
              <MobileIcon class="input-action__icon" name="camera" tone="dark" size="plain" shape="none" />
              <text>拍照</text>
            </view>
            <view class="input-action">
              <MobileIcon class="input-action__icon" name="upload" tone="dark" size="plain" shape="none" />
              <text>上传</text>
            </view>
            <view class="input-action">
              <MobileIcon class="input-action__icon" name="link" tone="dark" size="plain" shape="none" />
              <text>链接</text>
            </view>
          </view>
        </view>
        <text class="example-text">例如：我想参加 6 月在南京举办的数字化教学研修班</text>
      </MobileCard>

      <MobileCard class="ai-card">
        <view class="section-head">
          <view class="section-icon section-icon--spark"></view>
          <text class="section-title">AI 已识别培训信息</text>
        </view>
        <view class="ai-panel">
          <view v-for="row in recognizedInfo" :key="row[0]" class="info-row">
            <text class="info-row__label">{{ row[0] }}</text>
            <text class="info-row__value">{{ row[1] }}</text>
          </view>
          <view class="panel-actions">
            <MobileActionButton class="panel-action" variant="outline" @tap="showDraftFeedback('修改信息')">修改信息</MobileActionButton>
            <MobileActionButton class="panel-action" variant="outline" @tap="showDraftFeedback('重新识别')">重新识别</MobileActionButton>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="ai-card">
        <view class="section-head">
          <view class="section-icon section-icon--spark"></view>
          <text class="section-title">AI 申请说明</text>
        </view>
        <view class="ai-panel">
          <text class="ai-text">系统已结合已识别的培训信息、当前任课课程信息以及你上传的头像/图像建议，生成下方申请说明，可直接提交或修改后提交。</text>
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

.training-demand-page {
  min-height: 100vh;
  padding-bottom: calc(300rpx + env(safe-area-inset-bottom));
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
  color: #4e5a74;
  font-size: 27rpx;
  font-weight: 600;
  line-height: 1.45;
  text-align: center;
}

.hero-art {
  position: absolute;
  top: 52rpx;
  right: 20rpx;
  z-index: 0;
  width: 176rpx;
  height: 118rpx;
  opacity: 0.72;
}

.hero-art__paper {
  position: absolute;
  right: 12rpx;
  bottom: 0;
  width: 116rpx;
  height: 74rpx;
  border: 7rpx solid rgba(92, 205, 146, 0.34);
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.62);
  transform: rotate(-28deg);
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
  width: 68rpx;
}

.hero-art__paper::after {
  top: 40rpx;
  width: 52rpx;
}

.hero-art__leaf {
  position: absolute;
  border-radius: 100% 0;
  background: rgba(62, 196, 124, 0.46);
}

.hero-art__leaf--one {
  top: 2rpx;
  right: 2rpx;
  width: 48rpx;
  height: 34rpx;
  transform: rotate(38deg);
}

.hero-art__leaf--two {
  top: 38rpx;
  right: 34rpx;
  width: 40rpx;
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
.form-card,
.ai-card,
.after-card {
  padding: 28rpx;
}

.section-head,
.mode-option,
.input-actions,
.panel-actions,
.info-row,
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

.section-desc,
.example-text,
.after-card__desc {
  display: block;
  color: #4f5d78;
  font-size: 25rpx;
  line-height: 1.5;
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

.section-icon--spark {
  border-radius: 50%;
  background: currentColor;
}

.section-icon--spark::before {
  position: absolute;
  top: 9rpx;
  left: 9rpx;
  width: 16rpx;
  height: 16rpx;
  background: #fff;
  clip-path: polygon(50% 0, 64% 36%, 100% 50%, 64% 64%, 50% 100%, 36% 64%, 0 50%, 36% 36%);
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
  box-shadow: 0 10rpx 0 0 #fff, 0 15rpx 0 0 #fff;
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
  line-height: 1.25;
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

.mode-radio {
  flex: 0 0 auto;
}

.mode-radio :deep(.wd-radio__label) {
  display: none;
}

.mode-radio :deep(.wd-radio__shape) {
  width: 34rpx;
  height: 34rpx;
}

.input-box {
  margin-top: 16rpx;
  padding: 18rpx;
  border: 2rpx solid #d5deeb;
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.9);
}

.input-box__textarea {
  display: block;
}

.input-box__textarea :deep(.wd-textarea) {
  padding: 0;
  background: transparent;
}

.input-box__textarea :deep(.wd-textarea__inner) {
  min-height: 126rpx;
  color: #10172d;
  font-size: 27rpx;
  line-height: 1.45;
}

:deep(.input-box__placeholder) {
  color: #98a3b6;
}

.input-box__textarea :deep(.wd-textarea__count) {
  padding: 0;
  color: #7a8597;
  font-size: 22rpx;
}

.input-actions {
  justify-content: flex-end;
  gap: 26rpx;
  margin-top: 10rpx;
  color: #31405e;
}

.input-action {
  display: flex;
  align-items: center;
  gap: 6rpx;
  font-size: 24rpx;
  font-weight: 800;
}

.input-action__icon {
  width: 20rpx;
  height: 20rpx;
}

.example-text {
  margin-top: 14rpx;
}

.ai-panel {
  padding: 16rpx 20rpx;
  border: 2rpx solid rgba(14, 193, 101, 0.28);
  border-radius: 16rpx;
  background: rgba(236, 255, 244, 0.42);
}

.info-row {
  align-items: flex-start;
  gap: 16rpx;
  padding: 11rpx 0;
  border-bottom: 1rpx solid rgba(135, 206, 170, 0.4);
  font-size: 24rpx;
  line-height: 1.35;
}

.info-row__label {
  width: 162rpx;
  flex: 0 0 auto;
  color: #1b2943;
  font-weight: 900;
}

.info-row__value {
  min-width: 0;
  flex: 1;
  color: #34415d;
}

.ai-text {
  display: block;
  color: #34415d;
  font-size: 25rpx;
  line-height: 1.55;
}

.panel-actions {
  gap: 22rpx;
  margin-top: 16rpx;
}

.panel-action {
  height: 52rpx;
  flex: 1;
  font-size: 25rpx;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: calc(138rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 48;
  gap: 22rpx;
  padding: 14rpx 28rpx 16rpx;
  background: rgba(248, 252, 255, 0.88);
  backdrop-filter: blur(12rpx);
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

  .hero-art {
    right: 8rpx;
    transform: scale(0.86);
    transform-origin: top right;
  }

  .mode-card,
  .form-card,
  .ai-card,
  .after-card {
    padding: 22rpx;
  }

  .mode-option {
    padding: 18rpx;
  }

  .input-actions {
    gap: 16rpx;
  }

  .input-action {
    padding-left: 24rpx;
    font-size: 22rpx;
  }

  .info-row__label {
    width: 138rpx;
  }

  .bottom-actions {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }
}
</style>
