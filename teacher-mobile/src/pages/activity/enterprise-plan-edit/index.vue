<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { saveEnterprisePlanDraft, submitEnterprisePlan } from '../../../domain/enterprise'

const rejectRows = [
  { label: '退回人：', value: '智能制造学院教学办公室' },
  { label: '退回时间：', value: '2026-05-29 14:32' },
  { label: '退回原因：', value: '部分关键信息需要进一步完善' },
]

const planRows = [
  { label: '实践单位：', value: '山东智联装备有限公司' },
  { label: '实践岗位：', value: '现场工程师助理' },
  { label: '计划时间：', value: '2026-06-03 至 2026-06-14' },
  { label: '预计实践天数：', value: '10 天' },
  { label: '提交时间：', value: '2026-05-28 09:41' },
]

const baseFields = [
  { label: '实践单位：', value: '山东智联装备有限公司' },
  { label: '实践岗位：', value: '现场工程师助理' },
  { label: '计划时间：', value: '2026-06-03 至 2026-06-14' },
  { label: '预计实践天数：', value: '10 天' },
]

const aiRows = [
  { label: '实践目标：', value: '了解智能装备产线数字化改造流程，提升现场工程项目理解能力。' },
  { label: '实践内容：', value: '参与产线流程观察、设备调试记录、项目文档学习和现场工程师交流，并补充更清晰的工作任务说明。' },
  { label: '教学转化方向：', value: '后续可转化为《智能制造基础》课程案例，用于项目化教学与企业场景说明。' },
]

function goBack() {
  uni.navigateBack()
}

function saveDraft() {
  saveEnterprisePlanDraft()
  uni.showToast({ title: '草稿已保存', icon: 'none' })
}

function showDraftFeedback(action: string) {
  uni.showToast({ title: `${action}为本地模拟操作，当前沿用 AI 已整理内容`, icon: 'none' })
}

function resubmitPlan() {
  submitEnterprisePlan()
  uni.navigateTo({ url: '/pages/activity/enterprise-import-export/index' })
}
</script>

<template>
  <view class="plan-edit-page">
    <view class="hero">
      <view class="hero-leaf"></view>
      <MobileNavbar title="" size="compact" @back="goBack" />
      <text class="hero-title">企业实践</text>
      <text class="hero-subtitle">学院已退回，请根据意见修改后重新提交</text>
    </view>

    <view class="content">
      <MobileCard class="status-card">
        <view class="warning-orb">!</view>
        <view class="status-copy">
          <text class="status-title">实践计划需修改</text>
          <text class="status-desc">学院已退回，请根据意见修改后重新提交</text>
          <text class="status-tag">待修改</text>
        </view>
      </MobileCard>

      <view class="summary-grid">
        <MobileCard class="mini-card">
          <view class="mini-head">
            <view class="mini-icon mini-icon--orange"></view>
            <text class="mini-title">退回信息</text>
          </view>
          <view class="mini-list">
            <view v-for="item in rejectRows" :key="item.label" class="mini-row">
              <text class="mini-label">{{ item.label }}</text>
              <text class="mini-value">{{ item.value }}</text>
            </view>
            <view class="opinion">
              <text>• 实践内容描述较笼统，请补充具体参与的工作任务或学习内容</text>
              <text>• 建议补充实践收获与教学转化方向，完善实践与教学关联性</text>
            </view>
          </view>
        </MobileCard>

        <MobileCard class="mini-card">
          <view class="mini-head">
            <view class="mini-icon mini-icon--green"></view>
            <text class="mini-title">本次实践计划</text>
          </view>
          <view class="mini-list">
            <view v-for="item in planRows" :key="item.label" class="mini-row">
              <text class="mini-label">{{ item.label }}</text>
              <text class="mini-value">{{ item.value }}</text>
            </view>
          </view>
        </MobileCard>
      </view>

      <MobileCard class="input-card">
        <view class="card-head">
          <view class="head-icon head-icon--edit"></view>
          <view>
            <text class="card-title">修改实践计划信息</text>
            <text class="card-desc">可直接补充修改后的实践安排、参与任务、学习内容和教学转化想法</text>
          </view>
        </view>
        <view class="prompt-box">
          <text class="prompt-text">计划前往山东智联装备有限公司开展实践，岗位为现场工程师助理，时间 2026-06-03 至 2026-06-14。主要参与产线流程观察、设备调试记录、项目文档学习和现场工程师交流，希望进一步明确具体工作任务，并补充实践收获与教学转化想法。</text>
          <view class="prompt-tools">
            <view class="tool-item"><view class="tool-icon tool-icon--voice"></view><text>语音</text></view>
            <view class="tool-item"><view class="tool-icon tool-icon--camera"></view><text>拍照</text></view>
            <view class="tool-item"><view class="tool-icon tool-icon--upload"></view><text>上传</text></view>
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
          <view class="head-icon head-icon--ai">AI</view>
          <text class="card-title">AI 已整理修改后的实践计划</text>
        </view>
        <view class="ai-box">
          <text class="ai-section">A. 基础信息</text>
          <view class="base-grid">
            <view v-for="item in baseFields" :key="item.label" class="base-row">
              <text class="base-label">{{ item.label }}</text>
              <text class="base-value">{{ item.value }}</text>
            </view>
          </view>
          <view class="divider"></view>
          <text class="ai-section">B. 计划内容</text>
          <view class="ai-list">
            <view v-for="item in aiRows" :key="item.label" class="ai-row">
              <text class="ai-label">{{ item.label }}</text>
              <text class="ai-value">{{ item.value }}</text>
            </view>
          </view>
          <view class="ai-actions">
            <MobileActionButton class="ai-button" variant="outline" @tap="showDraftFeedback('修改内容')">修改内容</MobileActionButton>
            <MobileActionButton class="ai-button" variant="outline" @tap="showDraftFeedback('重新整理')">重新整理</MobileActionButton>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="material-card">
        <view class="material-main">
          <view class="head-icon head-icon--clip"></view>
          <text class="card-title">补充资料（选填）</text>
        </view>
        <MobileActionButton class="material-button" variant="outline" @tap="showDraftFeedback('补充资料')">补充资料</MobileActionButton>
      </MobileCard>

      <view class="bottom-actions">
        <MobileActionButton class="bottom-button" variant="outline" @tap="saveDraft">保存草稿</MobileActionButton>
        <MobileActionButton class="bottom-button" variant="primary" @tap="resubmitPlan">重新提交</MobileActionButton>
      </view>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.plan-edit-page {
  min-height: 100vh;
  padding-bottom: calc(220rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 88% 3%, rgba(203, 248, 224, 0.78), transparent 20%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 45%, #f5f9ff 100%);
  color: #10172d;
}

.hero {
  position: relative;
  padding: calc(var(--status-bar-height) + 12rpx) 28rpx 24rpx;
  overflow: hidden;
  text-align: center;
}

.hero-title,
.hero-subtitle,
.status-title,
.status-desc,
.status-tag,
.mini-title,
.mini-label,
.mini-value,
.opinion text,
.card-title,
.card-desc,
.prompt-text,
.ai-section,
.base-label,
.base-value,
.ai-label,
.ai-value {
  display: block;
}

.hero-title {
  font-size: 52rpx;
  font-weight: 900;
  line-height: 1.12;
}

.hero-subtitle {
  margin-top: 6rpx;
  color: #53617b;
  font-size: 29rpx;
  font-weight: 700;
  line-height: 1.35;
}

.hero-leaf {
  position: absolute;
  right: 28rpx;
  top: 20rpx;
  width: 142rpx;
  height: 132rpx;
  opacity: 0.5;
}

.hero-leaf::before,
.hero-leaf::after {
  position: absolute;
  border-radius: 999rpx 999rpx 0 999rpx;
  background: #a2edc4;
  content: '';
}

.hero-leaf::before {
  right: 20rpx;
  width: 56rpx;
  height: 112rpx;
  transform: rotate(35deg);
}

.hero-leaf::after {
  right: 82rpx;
  top: 50rpx;
  width: 48rpx;
  height: 74rpx;
  transform: rotate(-56deg);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  padding: 0 28rpx;
}

.status-card,
.card-head,
.summary-grid,
.mini-head,
.mini-row,
.prompt-tools,
.tool-item,
.file-chip,
.base-grid,
.base-row,
.ai-row,
.ai-actions,
.material-card,
.material-main,
.bottom-actions {
  display: flex;
  align-items: center;
}

.status-card {
  gap: 56rpx;
  min-height: 190rpx;
  padding: 32rpx 44rpx;
}

.warning-orb {
  width: 130rpx;
  height: 130rpx;
  flex: 0 0 auto;
  border: 18rpx solid #fff0dc;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffad31, #ff7717);
  color: #fff;
  font-size: 82rpx;
  font-weight: 900;
  line-height: 96rpx;
  text-align: center;
  box-shadow: 0 18rpx 42rpx rgba(255, 121, 23, 0.2);
}

.status-title {
  color: #e95516;
  font-size: 42rpx;
  font-weight: 900;
}

.status-desc {
  margin-top: 10rpx;
  color: #53617b;
  font-size: 28rpx;
}

.status-tag {
  width: fit-content;
  margin-top: 14rpx;
  padding: 8rpx 18rpx;
  border-radius: 999rpx;
  background: #fff0e4;
  color: #e95516;
  font-size: 26rpx;
  font-weight: 900;
}

.summary-grid {
  gap: 18rpx;
  align-items: stretch;
}

.mini-card {
  min-width: 0;
  flex: 1;
  padding: 24rpx;
}

.mini-head {
  gap: 14rpx;
  padding-bottom: 14rpx;
  border-bottom: 1rpx solid #e4ebf4;
}

.mini-icon,
.head-icon {
  width: 42rpx;
  height: 42rpx;
  flex: 0 0 auto;
  border-radius: 8rpx;
}

.mini-icon--orange {
  background: #ff861d;
}

.mini-icon--green,
.head-icon--edit,
.head-icon--ai,
.head-icon--clip {
  background: $teacher-mobile-primary;
}

.mini-title,
.card-title {
  font-size: 34rpx;
  font-weight: 900;
}

.mini-list {
  margin-top: 12rpx;
}

.mini-row {
  min-height: 50rpx;
  border-bottom: 1rpx solid #edf1f6;
}

.mini-row:last-child {
  border-bottom: 0;
}

.mini-label {
  width: 142rpx;
  flex: 0 0 auto;
  color: #53617b;
  font-size: 24rpx;
}

.mini-value {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 24rpx;
  line-height: 1.32;
}

.opinion {
  margin-top: 12rpx;
  color: #10172d;
  font-size: 23rpx;
  line-height: 1.45;
}

.input-card,
.ai-card,
.material-card {
  padding: 32rpx;
}

.card-head {
  gap: 18rpx;
}

.head-icon {
  position: relative;
  color: #fff;
  font-size: 23rpx;
  font-weight: 900;
  line-height: 42rpx;
  text-align: center;
}

.head-icon--edit::before,
.head-icon--clip::before {
  position: absolute;
  inset: 10rpx;
  border-left: 5rpx solid #fff;
  border-bottom: 5rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.card-desc {
  margin-top: 8rpx;
  color: #687386;
  font-size: 26rpx;
  line-height: 1.36;
}

.prompt-box {
  margin-top: 20rpx;
  padding: 24rpx;
  border: 2rpx solid #d6deea;
  border-radius: 14rpx;
  background: #fff;
}

.prompt-text {
  color: #10172d;
  font-size: 28rpx;
  line-height: 1.6;
}

.prompt-tools {
  justify-content: flex-end;
  gap: 28rpx;
  margin-top: 20rpx;
  color: $teacher-mobile-primary-dark;
  font-size: 26rpx;
  font-weight: 800;
}

.tool-item {
  gap: 8rpx;
}

.tool-icon {
  width: 30rpx;
  height: 30rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.file-chip {
  gap: 12rpx;
  width: fit-content;
  max-width: 100%;
  margin-top: 16rpx;
  padding: 12rpx 18rpx;
  border: 1rpx solid #dbe3ee;
  border-radius: 12rpx;
  color: #53617b;
  font-size: 26rpx;
}

.pdf-icon {
  width: 34rpx;
  height: 34rpx;
  border-radius: 6rpx;
  background: #f13939;
  color: #fff;
  font-size: 16rpx;
  font-weight: 900;
  line-height: 34rpx;
  text-align: center;
}

.close {
  color: #10172d;
  font-size: 32rpx;
}

.ai-box {
  margin-top: 20rpx;
  padding: 22rpx;
  border: 1rpx solid #d8e7e0;
  border-radius: 14rpx;
  background: linear-gradient(135deg, #f6fffa, #fbfffd);
}

.ai-section {
  color: $teacher-mobile-primary-dark;
  font-size: 28rpx;
  font-weight: 900;
}

.base-grid {
  flex-wrap: wrap;
  margin-top: 14rpx;
}

.base-row {
  width: 50%;
  min-height: 48rpx;
}

.base-label,
.ai-label {
  flex: 0 0 auto;
  color: #687386;
  font-size: 24rpx;
}

.base-label {
  width: 144rpx;
}

.base-value,
.ai-value {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 24rpx;
  line-height: 1.42;
}

.divider {
  height: 1rpx;
  margin: 16rpx -22rpx;
  background: #dce8e1;
}

.ai-row {
  align-items: flex-start;
  margin-top: 14rpx;
}

.ai-label {
  width: 150rpx;
}

.ai-actions {
  justify-content: space-around;
  gap: 90rpx;
  margin-top: 22rpx;
}

.ai-button {
  height: 54rpx;
  flex: 1;
  border-radius: 9rpx;
  font-size: 26rpx;
}

.material-card {
  justify-content: space-between;
  gap: 18rpx;
}

.material-main {
  gap: 18rpx;
}

.material-button {
  width: 168rpx;
  height: 56rpx;
  border-radius: 8rpx;
  font-size: 26rpx;
}

.bottom-actions {
  gap: 28rpx;
}

.bottom-button {
  height: 82rpx;
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

  .status-card {
    gap: 24rpx;
    padding: 24rpx;
  }

  .warning-orb {
    width: 96rpx;
    height: 96rpx;
    border-width: 12rpx;
    font-size: 58rpx;
    line-height: 72rpx;
  }

  .status-title {
    font-size: 34rpx;
  }

  .summary-grid {
    flex-direction: column;
  }

  .base-row {
    width: 100%;
  }

  .ai-actions {
    gap: 24rpx;
  }
}
</style>
