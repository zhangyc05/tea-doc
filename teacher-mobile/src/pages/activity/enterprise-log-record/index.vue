<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { saveEnterpriseLog, saveEnterpriseLogDraft } from '../../../domain/enterprise'

type LogRecordQuery = {
  recordId?: string
}

const query = ref<LogRecordQuery>({})

onLoad((options) => {
  query.value = options as LogRecordQuery
})

const draftSections = [
  {
    title: '实践内容',
    text: '参与 MES 模块需求分析讨论，了解企业项目从需求确认到开发排期的基本流程。',
  },
  {
    title: '观察与收获',
    text: '企业在需求评审阶段会重点确认业务边界、角色权限和异常处理场景，这对后续课程案例设计有参考价值。',
  },
]

function goBack() {
  uni.navigateBack()
}

function saveDraft() {
  saveEnterpriseLogDraft(query.value.recordId)
  uni.showToast({ title: '日志草稿已保存', icon: 'none' })
}

function saveLog() {
  saveEnterpriseLog(query.value.recordId)
  uni.navigateTo({ url: '/pages/activity/enterprise-progress-detail/index' })
}
</script>

<template>
  <view class="log-record-page">
    <view class="hero">
      <view class="note-art">
        <view class="bubble"></view>
        <view class="notebook"></view>
        <view class="pencil"></view>
      </view>
      <MobileNavbar title="" size="compact" @back="goBack" />
      <text class="hero-title">记录实践日志</text>
      <text class="hero-subtitle">记录今天参与的工作、观察到的流程或新的收获</text>
    </view>

    <view class="content">
      <MobileCard class="practice-card">
        <view class="company-icon"></view>
        <view class="practice-copy">
          <text class="practice-title">山东某智能装备有限公司企业实践</text>
          <view class="practice-meta">
            <text class="state-tag">进行中</text>
            <text class="split">|</text>
            <text>软件开发工程师</text>
            <text class="split">|</text>
            <text>2026-05-10 至 2026-05-20</text>
          </view>
          <view class="recorded-line">
            <view class="bag-icon"></view>
            <text>已记录</text>
            <text class="green-text">8 天</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="date-card">
        <view class="round-icon round-icon--calendar"></view>
        <view class="date-copy">
          <text class="section-title">日志日期</text>
          <view class="date-line">
            <text>2026-05-16</text>
            <text class="today-text">（今天）</text>
          </view>
        </view>
        <view class="other-date">
          <text>补记其他日期</text>
          <view class="chevron chevron--green"></view>
        </view>
      </MobileCard>

      <MobileCard class="input-card">
        <view class="input-head">
          <view class="round-icon round-icon--pen"></view>
          <text class="section-title">今天记录什么？</text>
        </view>
        <view class="textarea-box">
          <text class="placeholder">可以写今天参与的工作、观察到的流程、学到的方法或新的收获……</text>
          <view class="tool-row">
            <view class="tool-item"><view class="tool-icon tool-icon--voice"></view><text>语音</text></view>
            <view class="tool-item"><view class="tool-icon tool-icon--camera"></view><text>拍照</text></view>
            <view class="tool-item"><view class="tool-icon tool-icon--clip"></view><text>上传资料</text></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="ai-card">
        <view class="ai-head">
          <view class="ai-title-row">
            <text class="ai-title">AI 已整理为实践日志草稿</text>
            <text class="info-mark">i</text>
          </view>
          <view class="refresh-action">
            <view class="refresh-icon"></view>
            <text>重新整理</text>
          </view>
        </view>

        <view class="draft-box">
          <view v-for="item in draftSections" :key="item.title" class="draft-section">
            <view class="dot"></view>
            <view class="draft-copy">
              <text class="draft-title">{{ item.title }}</text>
              <text class="draft-text">{{ item.text }}</text>
            </view>
          </view>

          <view class="draft-section material-section">
            <view class="dot"></view>
            <view class="draft-copy">
              <text class="draft-title">关联材料</text>
              <view class="material-row">
                <view class="photo-thumb"></view>
                <text class="material-name">项目讨论照片 1 张</text>
                <view class="chevron"></view>
              </view>
            </view>
          </view>

          <view class="draft-actions">
            <MobileActionButton class="draft-button" variant="outline">修改草稿</MobileActionButton>
            <MobileActionButton class="draft-button draft-button--muted" variant="outline">重新整理</MobileActionButton>
          </view>
        </view>
      </MobileCard>

      <view class="bottom-actions">
        <MobileActionButton class="bottom-button bottom-button--draft" variant="outline" @tap="saveDraft">保存草稿</MobileActionButton>
        <MobileActionButton class="bottom-button" variant="primary" @tap="saveLog">保存日志</MobileActionButton>
      </view>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.log-record-page {
  min-height: 100vh;
  padding-bottom: calc(190rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 84% 8%, rgba(213, 250, 231, 0.72), transparent 25%),
    linear-gradient(180deg, #f7fffb 0%, #ffffff 25%, #f8fbff 100%);
  color: #10172d;
}

.hero {
  position: relative;
  min-height: 238rpx;
  padding: calc(var(--status-bar-height) + 12rpx) 28rpx 22rpx;
  overflow: hidden;
}

.hero-title,
.hero-subtitle,
.practice-title,
.section-title,
.placeholder,
.ai-title,
.draft-title,
.draft-text {
  display: block;
}

.hero-title {
  color: #0f3f34;
  font-size: 44rpx;
  font-weight: 900;
  line-height: 1.15;
  text-align: center;
}

.hero-subtitle {
  margin-top: 32rpx;
  color: #53617b;
  font-size: 29rpx;
  line-height: 1.4;
}

.note-art {
  position: absolute;
  right: 48rpx;
  top: 72rpx;
  width: 208rpx;
  height: 142rpx;
  opacity: 0.72;
}

.notebook {
  position: absolute;
  right: 18rpx;
  top: 0;
  width: 106rpx;
  height: 124rpx;
  border: 8rpx solid #8adbb2;
  border-radius: 14rpx;
  background: #f2fff8;
}

.notebook::before {
  position: absolute;
  left: 18rpx;
  top: 30rpx;
  width: 58rpx;
  height: 8rpx;
  border-radius: 999rpx;
  background: #c8efd9;
  box-shadow: 0 26rpx 0 #c8efd9, 0 52rpx 0 #c8efd9;
  content: '';
}

.pencil {
  position: absolute;
  right: 0;
  top: 56rpx;
  width: 76rpx;
  height: 18rpx;
  border-radius: 999rpx;
  background: #65c994;
  transform: rotate(-48deg);
}

.bubble {
  position: absolute;
  left: 0;
  top: 48rpx;
  width: 70rpx;
  height: 38rpx;
  border-radius: 999rpx;
  background: #bcefd5;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  padding: 0 28rpx;
}

.practice-card,
.practice-meta,
.recorded-line,
.date-card,
.date-line,
.other-date,
.input-head,
.tool-row,
.tool-item,
.ai-head,
.ai-title-row,
.refresh-action,
.draft-section,
.material-row,
.draft-actions,
.bottom-actions {
  display: flex;
  align-items: center;
}

.practice-card {
  gap: 26rpx;
  padding: 32rpx;
  border-radius: 24rpx;
}

.company-icon,
.round-icon {
  position: relative;
  width: 76rpx;
  height: 76rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #e4f8ee;
}

.company-icon::before {
  position: absolute;
  left: 24rpx;
  top: 18rpx;
  width: 28rpx;
  height: 38rpx;
  border-radius: 5rpx 5rpx 0 0;
  background: $teacher-mobile-primary;
  box-shadow: 22rpx 14rpx 0 #7bdba6;
  content: '';
}

.practice-copy {
  min-width: 0;
  flex: 1;
}

.practice-title {
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.25;
}

.practice-meta {
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 20rpx;
  color: #343b4b;
  font-size: 27rpx;
}

.state-tag {
  padding: 7rpx 18rpx;
  border-radius: 999rpx;
  background: #e5fbf0;
  color: $teacher-mobile-primary-dark;
  font-weight: 900;
}

.split {
  color: #c0c7d2;
}

.recorded-line {
  gap: 12rpx;
  margin-top: 20rpx;
  color: #343b4b;
  font-size: 28rpx;
}

.bag-icon {
  width: 28rpx;
  height: 24rpx;
  border: 4rpx solid #687386;
  border-radius: 5rpx;
}

.green-text,
.today-text,
.other-date,
.refresh-action {
  color: $teacher-mobile-primary-dark;
}

.green-text {
  font-weight: 900;
}

.date-card {
  gap: 24rpx;
  padding: 30rpx;
}

.round-icon::before {
  position: absolute;
  inset: 22rpx;
  border-radius: 6rpx;
  background: $teacher-mobile-primary;
  content: '';
}

.date-copy {
  flex: 1;
}

.section-title {
  font-size: 36rpx;
  font-weight: 900;
}

.date-line {
  gap: 10rpx;
  margin-top: 18rpx;
  font-size: 36rpx;
  font-weight: 900;
}

.other-date {
  gap: 10rpx;
  flex: 0 0 auto;
  font-size: 28rpx;
  font-weight: 900;
}

.chevron {
  width: 18rpx;
  height: 18rpx;
  border-top: 4rpx solid #8a93a5;
  border-right: 4rpx solid #8a93a5;
  transform: rotate(45deg);
}

.chevron--green {
  border-color: $teacher-mobile-primary-dark;
}

.input-card,
.ai-card {
  padding: 30rpx;
}

.input-head {
  gap: 24rpx;
}

.textarea-box {
  margin: 24rpx 0 0 100rpx;
  padding: 26rpx;
  border: 2rpx solid #9fdfbd;
  border-radius: 14rpx;
  background: #fff;
}

.placeholder {
  color: #8a93a5;
  font-size: 30rpx;
  line-height: 1.65;
}

.tool-row {
  justify-content: flex-end;
  gap: 34rpx;
  margin-top: 32rpx;
  color: $teacher-mobile-primary-dark;
  font-size: 28rpx;
}

.tool-item {
  gap: 10rpx;
}

.tool-icon {
  width: 32rpx;
  height: 32rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.tool-icon--clip {
  color: #687386;
}

.ai-card {
  background: linear-gradient(135deg, #f6fffa, #ffffff 36%);
}

.ai-head {
  justify-content: space-between;
  gap: 16rpx;
}

.ai-title {
  font-size: 32rpx;
  font-weight: 900;
}

.info-mark {
  width: 30rpx;
  height: 30rpx;
  margin-left: 10rpx;
  border: 3rpx solid #8a93a5;
  border-radius: 50%;
  color: #8a93a5;
  font-size: 22rpx;
  font-weight: 900;
  line-height: 26rpx;
  text-align: center;
}

.refresh-action {
  gap: 8rpx;
  font-size: 27rpx;
  font-weight: 900;
}

.refresh-icon {
  width: 28rpx;
  height: 28rpx;
  border: 4rpx solid currentColor;
  border-left-color: transparent;
  border-radius: 50%;
}

.draft-box {
  margin-top: 24rpx;
  padding: 26rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 10rpx 30rpx rgba(20, 60, 95, 0.05);
}

.draft-section {
  align-items: flex-start;
  gap: 20rpx;
  margin-bottom: 28rpx;
}

.dot {
  width: 16rpx;
  height: 16rpx;
  flex: 0 0 auto;
  margin-top: 14rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.draft-copy {
  min-width: 0;
  flex: 1;
}

.draft-title {
  font-size: 30rpx;
  font-weight: 900;
}

.draft-text {
  margin-top: 12rpx;
  color: #343b4b;
  font-size: 29rpx;
  line-height: 1.6;
}

.material-section {
  margin-bottom: 22rpx;
}

.material-row {
  gap: 24rpx;
  margin-top: 16rpx;
}

.photo-thumb {
  width: 122rpx;
  height: 72rpx;
  flex: 0 0 auto;
  border-radius: 10rpx;
  background: linear-gradient(135deg, #d8e5ef, #6e816c);
}

.material-name {
  min-width: 0;
  flex: 1;
  color: #343b4b;
  font-size: 29rpx;
}

.draft-actions {
  justify-content: center;
  gap: 40rpx;
  margin-top: 24rpx;
}

.draft-button {
  width: 220rpx;
  height: 58rpx;
  border-radius: 10rpx;
  font-size: 27rpx;
}

.draft-button--muted {
  opacity: 0.82;
}

.bottom-actions {
  gap: 28rpx;
}

.bottom-button {
  height: 76rpx;
  flex: 1;
  border-radius: 16rpx;
  font-size: 32rpx;
}

.bottom-button--draft {
  background: #eef9f4;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .practice-card,
  .date-card,
  .input-card,
  .ai-card {
    padding: 24rpx;
  }

  .practice-title {
    font-size: 31rpx;
  }

  .practice-meta,
  .recorded-line,
  .other-date,
  .tool-row,
  .draft-text,
  .material-name {
    font-size: 24rpx;
  }

  .textarea-box {
    margin-left: 0;
  }

  .tool-row {
    gap: 18rpx;
  }

  .draft-actions {
    gap: 18rpx;
  }
}
</style>
