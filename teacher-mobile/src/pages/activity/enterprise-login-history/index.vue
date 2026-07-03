<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import {
  addEnterpriseSupplementMaterial,
  getMobileEnterpriseState,
  saveEnterpriseArchiveDraft,
  submitEnterpriseArchive,
} from '../../../domain/enterprise'

const enterpriseState = getMobileEnterpriseState()

const summaryItems = [
  {
    title: '实践内容',
    text: '参与 MES 模块需求分析、开发流程观察和项目文档编写，了解企业软件内目从需求确认到开发排期的基本流程。',
  },
  {
    title: '实践收获',
    text: '对企业项目评审、角色权限、异常处理和代码规范有了更具体的理解，提升了软件工程实践能力。',
  },
  {
    title: '教学转化建议',
    text: '后续可将企业真实需求评审流程转化为《智能制造基础》课程案例，用于课堂项目化教学。',
  },
]

const attachments = [
  { name: '项目讨论照片', date: '2026-05-14', size: '1.2MB', tone: 'photo' },
  { name: '项目截图', date: '2026-05-15', size: '860KB', tone: 'screen' },
]

function goBack() {
  uni.navigateBack()
}

function saveArchiveDraft() {
  saveEnterpriseArchiveDraft()
}

function submitArchive() {
  const archiveRecord = submitEnterpriseArchive()
  uni.navigateTo({ url: `/pages/activity/enterprise-archive-result/index?recordId=${archiveRecord.id}` })
}

function goLogDetail() {
  uni.navigateTo({ url: '/pages/activity/enterprise-workflow-config/index' })
}

function updateArchiveDraft() {
  saveEnterpriseArchiveDraft()
}

function supplementMaterial() {
  addEnterpriseSupplementMaterial()
}
</script>

<template>
  <view class="login-history-page">
    <MobileNavbar title="实践总结与材料确认" size="regular" @back="goBack" />

    <view class="hero-copy">
      <text>确认实践总结草稿，补充必要附件后提交归档</text>
    </view>

    <view class="top-art" aria-hidden="true">
      <view class="chat-bubble"></view>
      <view class="paper"></view>
      <view class="check"></view>
    </view>

    <view class="content">
      <MobileCard class="practice-card">
        <view class="practice-icon">
          <view class="building"></view>
        </view>
        <view class="practice-main">
          <text class="practice-title">山东某智能装备有限公司企业实践</text>
          <view class="practice-meta">
            <text class="status-pill">进行中</text>
            <text class="divider">|</text>
            <text>软件开发工程师</text>
            <text class="divider">|</text>
            <view class="calendar-icon"></view>
            <text>2026-05-10 至 2026-05-20</text>
          </view>
          <view class="log-row">
            <text>已记录 <text class="green">9 天</text> 过程日志</text>
            <button class="log-link" @tap="goLogDetail">
              <text>查看日志</text>
              <view class="link-arrow"></view>
            </button>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="ready-card">
        <view class="ready-icon"></view>
        <view class="ready-copy">
          <view class="ready-title-row">
            <text class="ready-title">归档准备</text>
            <text class="ready-tag">待确认总结</text>
          </view>
          <text class="ready-desc">
            AI 已根据实践计划、9 条日志和 2 份附件整理总结草稿，请确认总结内容和附件资料后提交归档。
          </text>
        </view>
        <view class="folder-art"></view>
      </MobileCard>

      <MobileCard class="summary-card">
        <view class="section-head">
          <view class="section-icon section-icon--spark"></view>
          <text class="section-title">AI 已整理实践总结草稿</text>
        </view>

        <view class="summary-box">
          <view v-for="item in summaryItems" :key="item.title" class="summary-item">
            <view class="summary-dot"></view>
            <view>
              <text class="summary-title">{{ item.title }}</text>
              <text class="summary-text">{{ item.text }}</text>
            </view>
          </view>

          <view class="draft-actions">
            <MobileActionButton class="draft-button" variant="outline" @tap="updateArchiveDraft">
              修改草稿
            </MobileActionButton>
            <MobileActionButton class="draft-button" variant="outline" @tap="updateArchiveDraft">
              重新整理
            </MobileActionButton>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="attachment-card">
        <view class="section-head attachment-head">
          <view class="section-icon section-icon--clip"></view>
          <text class="section-title">附件资料</text>
          <view class="section-chevron"></view>
        </view>
        <text class="uploaded">已上传 2 份</text>

        <view class="attachment-grid">
          <view v-for="item in attachments" :key="item.name" class="attachment-item">
            <view class="thumb" :class="`thumb--${item.tone}`"></view>
            <view class="attachment-copy">
              <text class="attachment-name">{{ item.name }}</text>
              <text class="attachment-meta">{{ item.date }}　{{ item.size }}</text>
            </view>
          </view>
        </view>

        <view class="supplement">
          <text class="supplement-title">可继续补充</text>
          <text class="supplement-desc">实践证明、单位盖章材料、企业评价、过程照片、成果材料等。</text>
          <button class="upload-button" @tap="supplementMaterial">
            <view class="plus-icon"></view>
            <text>补充资料</text>
          </button>
        </view>
      </MobileCard>

      <view class="warning-card">
        <view class="warning-icon">!</view>
        <text>{{ enterpriseState.operationMessage || '提交后将进入归档确认，确认通过后才会进入成长档案，正式事实才能被画像、岗位对照和报告引用。' }}</text>
      </view>
    </view>

    <view class="bottom-actions">
      <MobileActionButton class="bottom-button" variant="outline" @tap="saveArchiveDraft">
        保存草稿
      </MobileActionButton>
      <MobileActionButton class="bottom-button" variant="primary" @tap="submitArchive">
        提交归档
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.login-history-page {
  position: relative;
  min-height: 100vh;
  padding-bottom: calc(142rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 88% 10%, rgba(190, 246, 218, 0.7), transparent 19%),
    linear-gradient(180deg, #ffffff 0%, #fbfdfc 47%, #f8faf9 100%);
  color: #111827;
}

.hero-copy {
  position: relative;
  z-index: 1;
  margin-top: -6rpx;
  padding: 0 172rpx 20rpx 116rpx;
  color: #3f4654;
  font-size: 28rpx;
  line-height: 1.42;
  text-align: center;
}

.top-art {
  position: absolute;
  top: 88rpx;
  right: 34rpx;
  width: 170rpx;
  height: 124rpx;
  pointer-events: none;
}

.chat-bubble {
  position: absolute;
  left: 0;
  bottom: 30rpx;
  width: 62rpx;
  height: 42rpx;
  border-radius: 24rpx;
  background: rgba(174, 237, 203, 0.48);
}

.chat-bubble::before {
  position: absolute;
  left: 16rpx;
  top: 18rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 14rpx 0 0 #fff, 28rpx 0 0 #fff;
  content: '';
}

.paper {
  position: absolute;
  right: 14rpx;
  top: 2rpx;
  width: 98rpx;
  height: 120rpx;
  border: 8rpx solid #8ee2b8;
  border-radius: 16rpx;
  background: #f1fff8;
  box-shadow: -18rpx 10rpx 0 rgba(83, 203, 139, 0.18);
  transform: rotate(8deg);
}

.paper::before {
  position: absolute;
  left: 24rpx;
  right: 16rpx;
  top: 30rpx;
  height: 7rpx;
  border-radius: 999rpx;
  background: #b7eacb;
  box-shadow: 0 25rpx 0 #b7eacb, 0 50rpx 0 #b7eacb;
  content: '';
}

.paper::after {
  position: absolute;
  left: 18rpx;
  top: -18rpx;
  width: 70rpx;
  height: 22rpx;
  border-radius: 8rpx;
  background: #67d79b;
  content: '';
}

.check {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 66rpx;
  height: 66rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #8de5b5, #38c97d);
}

.check::before {
  position: absolute;
  left: 18rpx;
  top: 22rpx;
  width: 27rpx;
  height: 15rpx;
  border-bottom: 8rpx solid #fff;
  border-left: 8rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 28rpx;
}

.practice-card,
.ready-card,
.summary-card,
.attachment-card {
  border-radius: 22rpx;
  box-shadow: 0 16rpx 42rpx rgba(40, 59, 85, 0.07);
}

.practice-card {
  display: flex;
  gap: 28rpx;
  padding: 28rpx 28rpx 24rpx;
}

.practice-icon,
.section-icon {
  position: relative;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #e9fbf2;
  color: #0bb265;
}

.practice-icon {
  width: 72rpx;
  height: 72rpx;
}

.building {
  position: absolute;
  left: 23rpx;
  top: 18rpx;
  width: 27rpx;
  height: 36rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.building::before {
  position: absolute;
  left: 7rpx;
  top: 7rpx;
  width: 5rpx;
  height: 5rpx;
  border-radius: 2rpx;
  background: #fff;
  box-shadow: 11rpx 0 0 #fff, 0 12rpx 0 #fff, 11rpx 12rpx 0 #fff, 0 24rpx 0 #fff, 11rpx 24rpx 0 #fff;
  content: '';
}

.building::after {
  position: absolute;
  right: -18rpx;
  bottom: 0;
  width: 17rpx;
  height: 23rpx;
  border-radius: 4rpx 4rpx 2rpx 2rpx;
  background: #61d89b;
  content: '';
}

.practice-main {
  min-width: 0;
  flex: 1;
}

.practice-title,
.ready-title,
.ready-desc,
.section-title,
.summary-title,
.summary-text,
.uploaded,
.attachment-name,
.attachment-meta,
.supplement-title,
.supplement-desc {
  display: block;
}

.practice-title {
  color: #0d1428;
  font-size: 37rpx;
  font-weight: 900;
  line-height: 1.25;
}

.practice-meta,
.log-row,
.ready-card,
.ready-title-row,
.section-head,
.summary-item,
.draft-actions,
.attachment-head,
.attachment-grid,
.attachment-item,
.upload-button,
.warning-card,
.bottom-actions {
  display: flex;
  align-items: center;
}

.practice-meta {
  flex-wrap: wrap;
  gap: 15rpx;
  margin-top: 26rpx;
  color: #303746;
  font-size: 26rpx;
  line-height: 1.2;
}

.status-pill,
.ready-tag {
  border-radius: 8rpx;
  background: #e3faed;
  color: #08a85c;
  font-weight: 900;
}

.status-pill {
  padding: 6rpx 12rpx;
}

.divider {
  color: #abb1bd;
}

.calendar-icon {
  position: relative;
  width: 25rpx;
  height: 25rpx;
  border: 3rpx solid #697283;
  border-radius: 4rpx;
}

.calendar-icon::before {
  position: absolute;
  top: 7rpx;
  right: 0;
  left: 0;
  border-top: 3rpx solid #697283;
  content: '';
}

.log-row {
  justify-content: space-between;
  gap: 18rpx;
  margin-top: 27rpx;
  color: #2d3543;
  font-size: 28rpx;
}

.green,
.uploaded,
.supplement-title {
  color: #09a95d;
  font-weight: 900;
}

.log-link,
.upload-button {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #08a85c;
  font-weight: 900;
}

.log-link::after,
.upload-button::after {
  display: none;
}

.log-link {
  display: flex;
  align-items: center;
  gap: 12rpx;
  flex: 0 0 auto;
  font-size: 27rpx;
  line-height: 1;
}

.link-arrow,
.section-chevron {
  width: 16rpx;
  height: 16rpx;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.ready-card {
  position: relative;
  gap: 24rpx;
  min-height: 164rpx;
  padding: 28rpx 34rpx;
  overflow: hidden;
  background: linear-gradient(105deg, rgba(239, 254, 246, 0.96), rgba(248, 253, 250, 0.96));
}

.ready-icon {
  position: relative;
  width: 72rpx;
  height: 72rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #dff9ed;
}

.ready-icon::before {
  position: absolute;
  left: 24rpx;
  top: 17rpx;
  width: 26rpx;
  height: 36rpx;
  border-radius: 5rpx;
  background: #16b96a;
  content: '';
}

.ready-icon::after {
  position: absolute;
  left: 31rpx;
  top: 24rpx;
  width: 11rpx;
  height: 17rpx;
  border-right: 4rpx solid #fff;
  border-left: 4rpx solid #fff;
  border-radius: 0 0 9rpx 9rpx;
  content: '';
}

.ready-copy {
  position: relative;
  z-index: 1;
  min-width: 0;
  flex: 1;
  padding-right: 160rpx;
}

.ready-title-row {
  gap: 24rpx;
}

.ready-title {
  color: #111827;
  font-size: 33rpx;
  font-weight: 900;
}

.ready-tag {
  padding: 8rpx 18rpx;
  font-size: 27rpx;
}

.ready-desc {
  margin-top: 22rpx;
  color: #515967;
  font-size: 27rpx;
  line-height: 1.55;
}

.folder-art {
  position: absolute;
  right: 36rpx;
  bottom: 25rpx;
  width: 128rpx;
  height: 82rpx;
  border-radius: 0 0 10rpx 10rpx;
  background: linear-gradient(135deg, #9de9bf, #65d798);
}

.folder-art::before {
  position: absolute;
  left: 16rpx;
  top: -58rpx;
  width: 96rpx;
  height: 70rpx;
  border: 5rpx solid #bcefd3;
  border-radius: 8rpx;
  background: #f1fff8;
  content: '';
}

.folder-art::after {
  position: absolute;
  left: 54rpx;
  top: 24rpx;
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  background: #dcf8e9;
  content: '';
}

.summary-card,
.attachment-card {
  padding: 26rpx 28rpx 24rpx;
}

.section-head {
  gap: 18rpx;
}

.section-icon {
  width: 58rpx;
  height: 58rpx;
}

.section-icon::before,
.section-icon::after {
  position: absolute;
  content: '';
}

.section-icon--spark::before {
  left: 20rpx;
  top: 15rpx;
  width: 24rpx;
  height: 24rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 64% 35%, 100% 50%, 64% 65%, 50% 100%, 36% 65%, 0 50%, 36% 35%);
}

.section-icon--spark::after {
  left: 13rpx;
  top: 13rpx;
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 25rpx -7rpx 0 currentColor, 18rpx 28rpx 0 currentColor;
}

.section-icon--clip {
  transform: rotate(-35deg);
}

.section-icon--clip::before {
  left: 20rpx;
  top: 10rpx;
  width: 17rpx;
  height: 38rpx;
  border: 7rpx solid currentColor;
  border-radius: 999rpx;
}

.section-title {
  min-width: 0;
  flex: 1;
  color: #111827;
  font-size: 32rpx;
  font-weight: 900;
}

.summary-box {
  margin-top: 20rpx;
  padding: 24rpx 28rpx;
  border: 1rpx solid #edf1f4;
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.72);
}

.summary-item {
  align-items: flex-start;
  gap: 26rpx;
  padding-bottom: 27rpx;
}

.summary-item:last-of-type {
  padding-bottom: 18rpx;
}

.summary-dot {
  width: 13rpx;
  height: 13rpx;
  flex: 0 0 auto;
  margin-top: 14rpx;
  border-radius: 50%;
  background: #18bd6a;
}

.summary-title {
  color: #111827;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.35;
}

.summary-text {
  margin-top: 12rpx;
  color: #303746;
  font-size: 27rpx;
  line-height: 1.6;
}

.draft-actions {
  gap: 42rpx;
  margin-top: 8rpx;
}

.draft-button {
  height: 58rpx;
  flex: 1;
  border-radius: 10rpx;
  font-size: 26rpx;
}

.attachment-card {
  padding-bottom: 28rpx;
}

.attachment-head {
  color: #606a78;
}

.section-chevron {
  flex: 0 0 auto;
  border-color: #697283;
}

.uploaded {
  margin-top: 16rpx;
  margin-left: 76rpx;
  font-size: 28rpx;
}

.attachment-grid {
  gap: 16rpx;
  margin-top: 10rpx;
  padding-left: 64rpx;
}

.attachment-item {
  min-width: 0;
  flex: 1;
  gap: 15rpx;
  padding: 14rpx;
  border-radius: 14rpx;
  background: #fff;
  box-shadow: 0 8rpx 24rpx rgba(42, 59, 83, 0.08);
}

.thumb {
  position: relative;
  width: 70rpx;
  height: 50rpx;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 8rpx;
}

.thumb--photo {
  background: linear-gradient(135deg, #cdd8e8 0 28%, #3c5168 28% 58%, #d6b18b 58%);
}

.thumb--photo::before {
  position: absolute;
  left: 13rpx;
  bottom: 8rpx;
  width: 12rpx;
  height: 22rpx;
  border-radius: 8rpx 8rpx 3rpx 3rpx;
  background: #26384d;
  box-shadow: 20rpx -3rpx 0 #192c42, 39rpx 0 0 #24364d;
  content: '';
}

.thumb--screen {
  background: linear-gradient(135deg, #0b2545, #143b5c);
}

.thumb--screen::before {
  position: absolute;
  inset: 8rpx 9rpx;
  border-top: 3rpx solid #1fd0ff;
  border-bottom: 3rpx solid #f1a43b;
  box-shadow: 0 10rpx 0 rgba(41, 210, 140, 0.7), 0 20rpx 0 rgba(37, 129, 246, 0.8);
  content: '';
}

.attachment-copy {
  min-width: 0;
  flex: 1;
}

.attachment-name {
  color: #1c2434;
  font-size: 27rpx;
  line-height: 1.25;
}

.attachment-meta {
  margin-top: 8rpx;
  color: #7a8494;
  font-size: 23rpx;
}

.supplement {
  margin-top: 28rpx;
  padding-left: 64rpx;
}

.supplement-title {
  font-size: 27rpx;
}

.supplement-desc {
  margin-top: 12rpx;
  color: #4c5564;
  font-size: 26rpx;
  line-height: 1.42;
}

.upload-button {
  display: flex;
  height: 72rpx;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  width: 100%;
  margin-top: 22rpx;
  border: 2rpx dashed #9fe8c1;
  border-radius: 14rpx;
  font-size: 29rpx;
}

.plus-icon {
  position: relative;
  width: 28rpx;
  height: 28rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.plus-icon::before,
.plus-icon::after {
  position: absolute;
  background: currentColor;
  content: '';
}

.plus-icon::before {
  left: 6rpx;
  top: 10rpx;
  width: 12rpx;
  height: 4rpx;
}

.plus-icon::after {
  left: 10rpx;
  top: 6rpx;
  width: 4rpx;
  height: 12rpx;
}

.warning-card {
  gap: 28rpx;
  padding: 24rpx 30rpx;
  border-radius: 14rpx;
  background: linear-gradient(100deg, #fff7e8, #fffdf7);
  color: #374151;
  font-size: 27rpx;
  line-height: 1.55;
}

.warning-icon {
  width: 44rpx;
  height: 44rpx;
  flex: 0 0 auto;
  border: 4rpx solid #ff9700;
  border-radius: 50%;
  color: #ff9700;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 38rpx;
  text-align: center;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 6;
  gap: 28rpx;
  padding: 24rpx 30rpx calc(22rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(18rpx);
}

.bottom-button {
  height: 78rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 31rpx;
}

@media (max-width: 430px) {
  .hero-copy {
    padding-right: 122rpx;
    padding-left: 94rpx;
    font-size: 25rpx;
  }

  .top-art {
    right: 22rpx;
    transform: scale(0.88);
    transform-origin: right top;
  }

  .content {
    gap: 14rpx;
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .practice-card {
    gap: 22rpx;
    padding: 24rpx 20rpx 20rpx;
  }

  .practice-title {
    font-size: 31rpx;
  }

  .practice-meta,
  .log-row,
  .ready-desc,
  .summary-text,
  .supplement-desc,
  .warning-card {
    font-size: 24rpx;
  }

  .ready-card {
    padding: 24rpx 26rpx;
  }

  .ready-copy {
    padding-right: 128rpx;
  }

  .ready-title {
    font-size: 29rpx;
  }

  .ready-tag {
    font-size: 24rpx;
  }

  .folder-art {
    right: 22rpx;
    transform: scale(0.84);
    transform-origin: right bottom;
  }

  .summary-card,
  .attachment-card {
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .section-title {
    font-size: 28rpx;
  }

  .summary-box {
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .draft-actions {
    gap: 24rpx;
  }

  .attachment-grid {
    padding-left: 0;
  }

  .attachment-item {
    gap: 10rpx;
    padding: 12rpx;
  }

  .attachment-name {
    font-size: 24rpx;
  }

  .attachment-meta {
    font-size: 21rpx;
  }

  .supplement,
  .uploaded {
    margin-left: 0;
    padding-left: 0;
  }

  .bottom-actions {
    gap: 18rpx;
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .bottom-button {
    height: 70rpx;
    font-size: 27rpx;
  }
}

@media (max-width: 374px) {
  .hero-copy {
    padding-right: 96rpx;
    padding-left: 72rpx;
    font-size: 23rpx;
  }

  .top-art {
    top: 92rpx;
    transform: scale(0.76);
  }

  .practice-icon,
  .ready-icon {
    width: 62rpx;
    height: 62rpx;
  }

  .practice-title {
    font-size: 28rpx;
  }

  .practice-meta {
    gap: 10rpx;
  }

  .ready-title-row {
    gap: 12rpx;
  }

  .ready-copy {
    padding-right: 112rpx;
  }

  .summary-title {
    font-size: 27rpx;
  }

  .draft-button,
  .upload-button {
    font-size: 24rpx;
  }

  .attachment-grid {
    gap: 10rpx;
  }

  .thumb {
    width: 58rpx;
    height: 44rpx;
  }
}
</style>
