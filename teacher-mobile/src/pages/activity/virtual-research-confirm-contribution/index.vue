<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import { confirmContribution, rejectContribution } from '../../../domain/virtualResearch'

const contributions = [
  {
    title: '设备调试案例整理',
    desc: '你在会上负责整理企业设备调试案例，并同步给课程资源组。',
    tags: ['会议纪要', '任务分工', '聊天记录'],
    icon: 'folder',
  },
  {
    title: '发言与案例补充',
    desc: '你补充了“产线异常处理”课堂案例，并提出可用于课程资源共建的建议。',
    tags: ['发言摘录', '会议纪要'],
    icon: 'message',
  },
]

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}

function goSupplementContribution() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-skill-management/index' })
}

function markNotMine() {
  rejectContribution()
  uni.navigateTo({ url: '/pages/activity/virtual-research-contribution-submitted/index' })
}

function submitContribution() {
  confirmContribution()
  uni.navigateTo({ url: '/pages/activity/virtual-research-contribution-submitted/index' })
}
</script>

<template>
  <view class="confirm-contribution-page">
    <MobileNavbar title="教研活动详情" size="compact" @back="goBack" />

    <view class="content">
      <MobileCard class="summary-card">
        <view class="summary-top">
          <view class="summary-illustration">
            <view class="teacher"></view>
            <view class="student student--left"></view>
            <view class="student student--right"></view>
            <view class="board"></view>
          </view>
          <view class="summary-main">
            <view class="summary-head">
              <text class="activity-title">智能制造课程资源共建研讨</text>
              <text class="status-chip">待确认贡献</text>
            </view>
            <view class="meta-line">
              <view class="line-icon line-icon--calendar"></view>
              <text>2026-05-22 14:00-16:30</text>
            </view>
            <view class="meta-line">
              <view class="line-icon line-icon--video"></view>
              <text>腾讯会议</text>
              <text class="divider">|</text>
              <text>智能制造教研室</text>
            </view>
          </view>
        </view>
        <view class="summary-desc">系统已根据会议纪要和参会记录识别你的教研贡献，请确认是否准确。</view>
      </MobileCard>

      <MobileCard class="ai-card">
        <view class="section-title-row">
          <view class="spark-icon"></view>
          <text class="section-title"><text class="ai-word">AI</text> 识别到的贡献</text>
        </view>
        <view class="contribution-list">
          <view v-for="item in contributions" :key="item.title" class="contribution-item">
            <view class="contribution-icon" :class="`contribution-icon--${item.icon}`"></view>
            <view class="contribution-copy">
              <text class="contribution-title">{{ item.title }}</text>
              <text class="contribution-desc">{{ item.desc }}</text>
              <view class="tag-row">
                <text v-for="tag in item.tags" :key="tag" class="source-tag">{{ tag }}</text>
              </view>
            </view>
            <text class="recognized-chip">已识别</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="supplement-card">
        <view class="section-title-row">
          <view class="note-icon"></view>
          <text class="section-title">可补充说明（选填）</text>
        </view>
        <view class="textarea-box">
          <textarea
            class="supplement-textarea"
            placeholder="如果识别不完整，可补充一句说明"
            placeholder-class="textarea-placeholder"
            maxlength="120"
          />
          <view class="input-tools">
            <button class="tool-button" @tap="showToast('语音')">
              <view class="tool-icon tool-icon--mic"></view>
              <text>语音</text>
            </button>
            <button class="tool-button" @tap="showToast('拍照')">
              <view class="tool-icon tool-icon--camera"></view>
              <text>拍照</text>
            </button>
            <button class="tool-button" @tap="showToast('上传')">
              <view class="tool-icon tool-icon--upload"></view>
              <text>上传</text>
            </button>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="direction-card">
        <view class="section-title-row">
          <view class="signpost-icon"></view>
          <text class="section-title">确认后去向</text>
        </view>
        <view class="direction-list">
          <view class="direction-row">
            <view class="dot"></view>
            <text>确认后将进入教研活动归档流程</text>
          </view>
          <view class="direction-row">
            <view class="dot"></view>
            <text>归档后可沉淀到成长档案 · 教研科研维度</text>
          </view>
        </view>
      </MobileCard>

      <button class="missing-link" @tap="goSupplementContribution">
        <view class="missing-icon"></view>
        <text>补充遗漏内容</text>
        <view class="link-arrow"></view>
      </button>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="bottom-button reject-button" variant="outline" @tap="markNotMine">
        不是我的
      </MobileActionButton>
      <MobileActionButton class="bottom-button confirm-button" variant="primary" @tap="submitContribution">
        确认贡献
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.confirm-contribution-page {
  min-height: 100vh;
  padding-bottom: calc(156rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 82% 6%, rgba(226, 250, 237, 0.75), transparent 27%),
    linear-gradient(180deg, #fdfffe 0%, #fff 46%, #f8fbfa 100%);
  color: #10172d;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 28rpx;
  padding: 0 30rpx;
}

.summary-card,
.ai-card,
.supplement-card,
.direction-card {
  border-radius: 24rpx;
}

.summary-card {
  padding: 34rpx 30rpx 28rpx;
  border-color: #d9f2e5;
  background: linear-gradient(115deg, #fcfffe, #f8fffb);
}

.summary-top,
.summary-head,
.meta-line,
.section-title-row,
.contribution-item,
.tag-row,
.input-tools,
.tool-button,
.direction-row,
.missing-link,
.fixed-actions {
  display: flex;
  align-items: center;
}

.summary-top {
  gap: 32rpx;
}

.summary-illustration {
  position: relative;
  flex: 0 0 auto;
  width: 150rpx;
  height: 150rpx;
  border-radius: 14rpx;
  background: linear-gradient(145deg, #edf9f3, #e5f6ee);
}

.teacher,
.student,
.board,
.line-icon,
.spark-icon,
.note-icon,
.signpost-icon,
.contribution-icon,
.tool-icon,
.missing-icon,
.link-arrow,
.button-plus,
.summary-illustration::before,
.summary-illustration::after,
.teacher::after,
.student::after,
.board::before,
.line-icon::before,
.line-icon::after,
.spark-icon::before,
.spark-icon::after,
.note-icon::before,
.note-icon::after,
.signpost-icon::before,
.signpost-icon::after,
.contribution-icon::before,
.contribution-icon::after,
.tool-icon::before,
.tool-icon::after,
.missing-icon::before,
.missing-icon::after,
.link-arrow::before,
.button-plus::before,
.button-plus::after {
  position: absolute;
  content: '';
}

.summary-illustration::before {
  right: 24rpx;
  top: 30rpx;
  width: 68rpx;
  height: 52rpx;
  border-radius: 8rpx;
  background: linear-gradient(180deg, #52d58a, #08a85c);
}

.summary-illustration::after {
  right: 41rpx;
  top: 48rpx;
  width: 30rpx;
  height: 20rpx;
  border-top: 6rpx solid #fff;
  border-right: 6rpx solid #fff;
  transform: rotate(45deg);
}

.teacher {
  position: absolute;
  left: 26rpx;
  bottom: 34rpx;
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  background: #28c76e;
}

.teacher::after {
  left: -14rpx;
  top: 38rpx;
  width: 62rpx;
  height: 34rpx;
  border-radius: 34rpx 34rpx 8rpx 8rpx;
  background: #28c76e;
}

.student {
  position: absolute;
  bottom: 38rpx;
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  background: #65d996;
}

.student--left {
  left: 64rpx;
}

.student--right {
  right: 28rpx;
}

.student::after {
  left: -10rpx;
  top: 32rpx;
  width: 48rpx;
  height: 28rpx;
  border-radius: 28rpx 28rpx 8rpx 8rpx;
  background: #65d996;
}

.board {
  position: absolute;
  right: 16rpx;
  bottom: 22rpx;
  left: 20rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #12a957;
}

.summary-main {
  min-width: 0;
  flex: 1;
}

.summary-head {
  align-items: flex-start;
  gap: 18rpx;
}

.activity-title,
.summary-desc,
.section-title,
.contribution-title,
.contribution-desc {
  display: block;
}

.activity-title {
  min-width: 0;
  flex: 1;
  color: #111827;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.22;
}

.status-chip,
.recognized-chip {
  flex: 0 0 auto;
  padding: 14rpx 18rpx;
  border-radius: 12rpx;
  background: #fff2df;
  color: #f17800;
  font-size: 26rpx;
  font-weight: 900;
  white-space: nowrap;
}

.meta-line {
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 24rpx;
  color: #344560;
  font-size: 28rpx;
  line-height: 1.3;
}

.divider {
  color: #b3bdca;
}

.line-icon {
  position: relative;
  flex: 0 0 auto;
  width: 30rpx;
  height: 30rpx;
  color: #53627f;
}

.line-icon--calendar::before {
  inset: 3rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.line-icon--calendar::after {
  left: 7rpx;
  right: 7rpx;
  top: 11rpx;
  height: 3rpx;
  background: currentColor;
}

.line-icon--video::before {
  left: 2rpx;
  top: 8rpx;
  width: 17rpx;
  height: 13rpx;
  border: 3rpx solid currentColor;
  border-radius: 3rpx;
}

.line-icon--video::after {
  right: 1rpx;
  top: 10rpx;
  border-top: 7rpx solid transparent;
  border-bottom: 7rpx solid transparent;
  border-left: 8rpx solid currentColor;
}

.summary-desc {
  margin-top: 30rpx;
  padding-top: 26rpx;
  border-top: 1rpx solid #e4edf0;
  color: #2e3f61;
  font-size: 28rpx;
  line-height: 1.5;
}

.ai-card,
.supplement-card,
.direction-card {
  padding: 30rpx;
}

.section-title-row {
  gap: 18rpx;
}

.section-title {
  color: #111827;
  font-size: 33rpx;
  font-weight: 900;
  line-height: 1.25;
}

.ai-word {
  color: #0a9d56;
}

.spark-icon,
.note-icon,
.signpost-icon {
  position: relative;
  flex: 0 0 auto;
  width: 38rpx;
  height: 38rpx;
  color: #10b966;
}

.spark-icon::before,
.spark-icon::after {
  background: currentColor;
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
}

.spark-icon::before {
  left: 2rpx;
  top: 4rpx;
  width: 28rpx;
  height: 28rpx;
}

.spark-icon::after {
  right: 0;
  top: 0;
  width: 12rpx;
  height: 12rpx;
}

.note-icon::before {
  inset: 5rpx 8rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.note-icon::after {
  right: 6rpx;
  bottom: 5rpx;
  width: 12rpx;
  height: 12rpx;
  background: currentColor;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}

.signpost-icon::before {
  left: 17rpx;
  top: 2rpx;
  width: 5rpx;
  height: 34rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.signpost-icon::after {
  left: 5rpx;
  top: 8rpx;
  width: 28rpx;
  height: 12rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.contribution-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-top: 30rpx;
}

.contribution-item {
  position: relative;
  align-items: flex-start;
  gap: 24rpx;
  padding: 26rpx 24rpx;
  border: 1rpx solid #e3ebf1;
  border-radius: 16rpx;
}

.contribution-icon {
  position: relative;
  flex: 0 0 auto;
  width: 82rpx;
  height: 82rpx;
  border-radius: 50%;
  background: #e9f8ef;
  color: #10b966;
}

.contribution-icon--folder::before {
  left: 24rpx;
  top: 28rpx;
  width: 38rpx;
  height: 30rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.contribution-icon--folder::after {
  left: 32rpx;
  top: 34rpx;
  width: 13rpx;
  height: 20rpx;
  border-right: 5rpx solid #fff;
  border-bottom: 5rpx solid #fff;
  transform: rotate(45deg);
}

.contribution-icon--message::before {
  left: 22rpx;
  top: 28rpx;
  width: 42rpx;
  height: 30rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.contribution-icon--message::after {
  left: 31rpx;
  top: 41rpx;
  width: 5rpx;
  height: 5rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 11rpx 0 0 #fff, 22rpx 0 0 #fff;
}

.contribution-copy {
  min-width: 0;
  flex: 1;
  padding-right: 104rpx;
}

.contribution-title {
  color: #111827;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.28;
}

.contribution-desc {
  margin-top: 18rpx;
  color: #344560;
  font-size: 28rpx;
  line-height: 1.55;
}

.tag-row {
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 22rpx;
}

.source-tag {
  padding: 8rpx 20rpx;
  border-radius: 10rpx;
  background: #e8f8ef;
  color: #079653;
  font-size: 25rpx;
  font-weight: 800;
}

.recognized-chip {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  background: #e8f8ef;
  color: #079653;
}

.textarea-box {
  margin-top: 24rpx;
  overflow: hidden;
  border: 1rpx solid #e2e8f0;
  border-radius: 18rpx;
  background: #fff;
}

.supplement-textarea {
  width: 100%;
  height: 178rpx;
  padding: 26rpx;
  box-sizing: border-box;
  color: #111827;
  font-size: 28rpx;
  line-height: 1.5;
}

.textarea-placeholder {
  color: #8a95aa;
}

.input-tools {
  justify-content: flex-end;
  gap: 28rpx;
  padding: 0 24rpx 20rpx;
}

.tool-button {
  gap: 8rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #344560;
  font-size: 25rpx;
}

.tool-button::after {
  display: none;
}

.tool-icon {
  position: relative;
  width: 30rpx;
  height: 30rpx;
  color: #344560;
}

.tool-icon--mic::before {
  left: 10rpx;
  top: 2rpx;
  width: 10rpx;
  height: 18rpx;
  border: 4rpx solid currentColor;
  border-radius: 10rpx;
}

.tool-icon--mic::after {
  left: 7rpx;
  bottom: 2rpx;
  width: 16rpx;
  height: 10rpx;
  border-bottom: 4rpx solid currentColor;
  border-radius: 0 0 12rpx 12rpx;
}

.tool-icon--camera::before {
  inset: 7rpx 2rpx 4rpx;
  border: 4rpx solid currentColor;
  border-radius: 5rpx;
}

.tool-icon--camera::after {
  left: 11rpx;
  top: 12rpx;
  width: 8rpx;
  height: 8rpx;
  border: 3rpx solid currentColor;
  border-radius: 50%;
}

.tool-icon--upload::before {
  left: 5rpx;
  bottom: 4rpx;
  width: 20rpx;
  height: 12rpx;
  border: 4rpx solid currentColor;
  border-top: 0;
  border-radius: 0 0 6rpx 6rpx;
}

.tool-icon--upload::after {
  left: 13rpx;
  top: 4rpx;
  width: 4rpx;
  height: 18rpx;
  background: currentColor;
  box-shadow: -6rpx 5rpx 0 -1rpx currentColor, 6rpx 5rpx 0 -1rpx currentColor;
}

.direction-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-top: 24rpx;
}

.direction-row {
  gap: 18rpx;
  color: #344560;
  font-size: 28rpx;
  line-height: 1.4;
}

.dot {
  flex: 0 0 auto;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #10b966;
}

.missing-link {
  justify-content: center;
  gap: 14rpx;
  margin: -4rpx 0 0;
  padding: 22rpx 0;
  border: 0;
  background: transparent;
  color: #079653;
  font-size: 29rpx;
  font-weight: 900;
}

.missing-link::after {
  display: none;
}

.missing-icon {
  position: relative;
  width: 30rpx;
  height: 30rpx;
  border: 4rpx solid currentColor;
  border-radius: 5rpx;
}

.missing-icon::after {
  right: -6rpx;
  bottom: -4rpx;
  width: 14rpx;
  height: 4rpx;
  background: currentColor;
  transform: rotate(-45deg);
}

.link-arrow {
  position: relative;
  width: 15rpx;
  height: 15rpx;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  left: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 34rpx;
  padding: 22rpx 48rpx 26rpx;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 -16rpx 34rpx rgba(31, 45, 78, 0.08);
  backdrop-filter: blur(12rpx);
}

.bottom-button {
  height: 78rpx;
  border-radius: 14rpx;
  font-size: 31rpx;
}

.reject-button {
  border-color: #10b966;
  color: #079653;
}

@media (max-width: 430px) {
  .confirm-contribution-page {
    padding-bottom: calc(146rpx + env(safe-area-inset-bottom));
  }

  .content {
    gap: 22rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .summary-card,
  .ai-card,
  .supplement-card,
  .direction-card {
    padding: 24rpx 20rpx;
  }

  .summary-top {
    gap: 18rpx;
  }

  .summary-illustration {
    width: 128rpx;
    height: 128rpx;
  }

  .activity-title {
    font-size: 31rpx;
  }

  .summary-head {
    align-items: flex-start;
    flex-direction: column;
    gap: 12rpx;
  }

  .status-chip {
    padding: 10rpx 15rpx;
    font-size: 23rpx;
  }

  .meta-line,
  .summary-desc,
  .contribution-desc,
  .direction-row {
    font-size: 24rpx;
  }

  .section-title {
    font-size: 29rpx;
  }

  .contribution-item {
    gap: 18rpx;
    padding: 22rpx 18rpx;
  }

  .contribution-icon {
    width: 70rpx;
    height: 70rpx;
  }

  .contribution-copy {
    padding-right: 86rpx;
  }

  .contribution-title {
    font-size: 27rpx;
  }

  .source-tag {
    padding: 7rpx 16rpx;
    font-size: 22rpx;
  }

  .recognized-chip {
    top: 18rpx;
    right: 18rpx;
  }

  .fixed-actions {
    gap: 22rpx;
    padding: 18rpx 20rpx 22rpx;
  }

  .bottom-button {
    height: 70rpx;
    font-size: 27rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .summary-top {
    align-items: flex-start;
  }

  .summary-illustration {
    width: 106rpx;
    height: 106rpx;
  }

  .activity-title {
    font-size: 28rpx;
  }

  .contribution-item {
    align-items: flex-start;
    flex-direction: column;
  }

  .contribution-copy {
    width: 100%;
    padding-right: 0;
  }

  .recognized-chip {
    position: static;
  }

  .input-tools {
    justify-content: space-between;
    gap: 12rpx;
  }

  .fixed-actions {
    gap: 14rpx;
    padding-right: 14rpx;
    padding-left: 14rpx;
  }
}
</style>
