<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const nextActions = [
  { title: '确认个人贡献', desc: '会议结束后识别', type: 'person' },
  { title: '补充遗漏材料', desc: '如有缺失会提醒', type: 'folder' },
  { title: '查看教研记录', desc: '纪要与任务进展', type: 'record' },
]

function goBack() {
  uni.navigateBack()
}

function showStageFileFeedback(name: string) {
  uni.showToast({
    title: `阶段材料预览为本地模拟：${name}`,
    icon: 'none',
  })
}

function showDetailFeedback() {
  uni.showToast({
    title: '材料说明详情为本地模拟，当前页面已展示摘要',
    icon: 'none',
  })
}

function showNextActionFeedback(title: string) {
  uni.showToast({
    title: `后续动作提醒为本地模拟：${title}`,
    icon: 'none',
  })
}

function goResearchRoom() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-room/index' })
}

function goActivityDetail() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-activity-detail-ongoing/index' })
}
</script>

<template>
  <view class="stage-page">
    <MobileNavbar title="材料已提交" size="compact" @back="goBack">
      <template #right>
        <text class="nav-status">活动进行中</text>
      </template>
    </MobileNavbar>

    <view class="content">
      <view class="success-hero">
        <view class="confetti confetti--one"></view>
        <view class="confetti confetti--two"></view>
        <view class="confetti confetti--three"></view>
        <view class="success-mark"></view>
        <text class="success-title">你提交的阶段材料已保存</text>
        <text class="success-desc">当前教研活动仍在进行中，会议结束后系统会继续整理会议纪要和个人贡献。</text>
      </view>

      <MobileCard class="activity-card">
        <view class="section-head">
          <view class="head-icon head-icon--group"></view>
          <text class="section-title">本次教研活动</text>
        </view>
        <view class="activity-body">
          <view class="activity-copy">
            <text class="activity-title">课程案例共创碰头会</text>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--calendar"></view>
              <text>2026-06-03（周二）14:00-15:30</text>
            </view>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--video"></view>
              <text>腾讯会议　会议号：123 456 789</text>
            </view>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--room"></view>
              <text>智能制造课程虚拟教研室</text>
            </view>
          </view>
          <view class="activity-art">
            <view class="screen-art"></view>
            <view class="person-art"></view>
            <view class="chat-art chat-art--one"></view>
            <view class="chat-art chat-art--two"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <view class="section-head">
          <view class="head-icon head-icon--confirm"></view>
          <text class="section-title">已提交材料</text>
        </view>
        <button class="file-row" @tap="showStageFileFeedback('设备调试案例素材.pdf')">
          <view class="file-type">
            <text>PDF</text>
          </view>
          <view class="file-copy">
            <text class="file-name">设备调试案例素材.pdf</text>
            <text class="file-meta">PDF · 3.2MB　|　提交时间：2026-06-03 12:45</text>
          </view>
          <wd-icon name="chevron-right" size="24rpx" color="#7b8495" />
        </button>
      </MobileCard>

      <MobileCard class="section-card">
        <view class="section-head">
          <view class="head-icon head-icon--note"></view>
          <text class="section-title">补充说明</text>
        </view>
        <view class="note-box">
          <text>该案例来源于某制造企业数控设备调试实践，适用于《智能制造基础》课程中“设备故障诊断与调试”教学环节。</text>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <view class="section-head">
          <view class="head-icon head-icon--ai"></view>
          <text class="section-title">AI 已整理材料说明</text>
        </view>
        <view class="ai-box">
          <text class="ai-desc">你准备的企业设备调试案例可用于课程案例共创讨论，包含案例背景、设备问题、调试过程及可提炼的教学点。</text>
          <button class="detail-button" @tap="showDetailFeedback">查看详情</button>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <view class="section-head">
          <view class="head-icon head-icon--spark"></view>
          <text class="section-title">当前状态</text>
        </view>
        <view class="status-box">
          <view class="clock-icon"></view>
          <view class="status-copy">
            <text class="status-title">阶段材料已提交</text>
            <text class="status-desc">会议结束后，系统会结合会议纪要、任务分工和提交材料识别个人贡献，届时将提醒你确认是否准确。</text>
          </view>
          <view class="folder-art"></view>
        </view>
      </MobileCard>

      <MobileCard class="section-card next-card">
        <view class="section-head">
          <view class="head-icon head-icon--shield"></view>
          <text class="section-title">后续可能需要你处理</text>
        </view>
        <view class="next-grid">
          <view v-for="item in nextActions" :key="item.title" class="next-item" @tap="showNextActionFeedback(item.title)">
            <view class="next-icon" :class="`next-icon--${item.type}`"></view>
            <view class="next-copy">
              <text class="next-title">{{ item.title }}</text>
              <text class="next-desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>
      </MobileCard>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="action-button outline-button" variant="outline" @tap="goResearchRoom">
        返回教研室
      </MobileActionButton>
      <MobileActionButton class="action-button primary-button" variant="primary" @tap="goActivityDetail">
        查看活动详情
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.stage-page {
  min-height: 100vh;
  padding-bottom: calc(170rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 44%, #f8fbfa 100%);
  color: #10172d;
}

.nav-status {
  display: block;
  margin-right: 18rpx;
  padding: 10rpx 22rpx;
  border-radius: 999rpx;
  background: #fff0df;
  color: #ff7a1a;
  font-size: 24rpx;
  font-weight: 900;
  white-space: nowrap;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 28rpx 26rpx;
}

.success-hero {
  position: relative;
  display: flex;
  min-height: 266rpx;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 14rpx 34rpx 8rpx;
  text-align: center;
}

.success-mark,
.confetti,
.section-head,
.head-icon,
.tiny-icon,
.activity-art,
.screen-art,
.person-art,
.chat-art,
.file-type,
.row-arrow,
.clock-icon,
.folder-art,
.next-icon {
  position: relative;
  flex: 0 0 auto;
}

.success-mark {
  width: 86rpx;
  height: 86rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #19c879, #08a95d);
  box-shadow: 0 16rpx 36rpx rgba(9, 168, 91, 0.24);
}

.success-mark::before,
.confetti::before,
.confetti::after,
.head-icon::before,
.head-icon::after,
.tiny-icon::before,
.tiny-icon::after,
.screen-art::before,
.screen-art::after,
.person-art::before,
.person-art::after,
.chat-art::before,
.file-type::before,
.row-arrow::before,
.clock-icon::before,
.clock-icon::after,
.folder-art::before,
.folder-art::after,
.next-icon::before,
.next-icon::after {
  position: absolute;
  content: '';
}

.success-mark::before {
  left: 27rpx;
  top: 25rpx;
  width: 34rpx;
  height: 19rpx;
  border-bottom: 9rpx solid #fff;
  border-left: 9rpx solid #fff;
  transform: rotate(-45deg);
}

.confetti {
  position: absolute;
  width: 10rpx;
  height: 10rpx;
  background: #7f5af5;
  transform: rotate(45deg);
}

.confetti::before,
.confetti::after {
  width: 8rpx;
  height: 8rpx;
  background: #11b966;
}

.confetti--one {
  left: 38%;
  top: 44rpx;
  background: #ff7d8c;
}

.confetti--one::before {
  left: -72rpx;
  top: 64rpx;
}

.confetti--one::after {
  right: -182rpx;
  top: 66rpx;
  background: #39bd64;
}

.confetti--two {
  right: 36%;
  top: 48rpx;
}

.confetti--two::before {
  right: -86rpx;
  top: 54rpx;
  background: #dce7ff;
}

.confetti--two::after {
  left: -156rpx;
  top: 70rpx;
  background: #dce7ff;
}

.confetti--three {
  left: 50%;
  top: 100rpx;
  width: 6rpx;
  height: 6rpx;
  background: #dce7ff;
}

.success-title {
  display: block;
  margin-top: 30rpx;
  color: #050812;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.2;
}

.success-desc {
  display: block;
  margin-top: 18rpx;
  color: #53627c;
  font-size: 28rpx;
  line-height: 1.45;
}

.activity-card,
.section-card {
  border-radius: 24rpx;
  box-shadow: 0 10rpx 28rpx rgba(23, 35, 61, 0.05);
}

.activity-card {
  padding: 30rpx 34rpx;
  background: #fff;
}

.section-card {
  padding: 30rpx;
  background: #fff;
}

.section-head {
  display: flex;
  align-items: center;
  gap: 18rpx;
}

.section-title,
.activity-title,
.meta-row,
.file-name,
.file-meta,
.note-box,
.ai-desc,
.status-title,
.status-desc,
.next-title,
.next-desc {
  display: block;
}

.section-title {
  color: #070d1d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.head-icon {
  width: 42rpx;
  height: 42rpx;
  border-radius: 10rpx;
  background: #e9f1ff;
  color: #3277f4;
}

.head-icon--confirm,
.head-icon--shield {
  background: #e8fbf0;
  color: #0fb463;
}

.head-icon--note {
  background: #fff3df;
  color: #f28a00;
}

.head-icon--ai {
  background: #f0eaff;
  color: #7b4df4;
}

.head-icon--spark {
  background: #eaf2ff;
  color: #2d7cf7;
}

.head-icon::before {
  inset: 11rpx;
  border: 4rpx solid currentColor;
  border-radius: 6rpx;
}

.head-icon--group::before {
  top: 8rpx;
  left: 17rpx;
  width: 8rpx;
  height: 8rpx;
  border: 0;
  border-radius: 50%;
  background: currentColor;
  box-shadow: -12rpx 9rpx 0 currentColor, 12rpx 9rpx 0 currentColor;
}

.head-icon--group::after {
  left: 8rpx;
  bottom: 8rpx;
  width: 26rpx;
  height: 12rpx;
  border-radius: 14rpx 14rpx 6rpx 6rpx;
  background: currentColor;
}

.head-icon--confirm::after,
.head-icon--shield::after {
  left: 15rpx;
  top: 15rpx;
  width: 14rpx;
  height: 8rpx;
  border-bottom: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
  transform: rotate(-45deg);
}

.head-icon--note::before {
  inset: 10rpx 11rpx;
  border: 0;
  border-radius: 4rpx;
  background: currentColor;
  box-shadow: 0 8rpx 0 -5rpx #fff, 0 17rpx 0 -5rpx #fff;
}

.head-icon--ai::before,
.head-icon--spark::before {
  inset: 8rpx;
  border: 0;
  background: currentColor;
  clip-path: polygon(50% 0, 62% 36%, 100% 50%, 62% 64%, 50% 100%, 38% 64%, 0 50%, 38% 36%);
}

.activity-body {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-top: 26rpx;
}

.activity-copy {
  min-width: 0;
  flex: 1;
}

.activity-title {
  color: #070d1d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.22;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 18rpx;
  margin-top: 24rpx;
  color: #111827;
  font-size: 29rpx;
  line-height: 1.28;
}

.tiny-icon {
  width: 30rpx;
  height: 30rpx;
  color: #667089;
}

.tiny-icon::before {
  inset: 5rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.tiny-icon--calendar::after {
  left: 9rpx;
  right: 9rpx;
  top: 1rpx;
  height: 9rpx;
  border-right: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
}

.tiny-icon--video::after {
  right: 1rpx;
  top: 10rpx;
  border-top: 5rpx solid transparent;
  border-bottom: 5rpx solid transparent;
  border-left: 8rpx solid currentColor;
}

.tiny-icon--room::after {
  left: 10rpx;
  top: 9rpx;
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: currentColor;
}

.activity-art {
  width: 180rpx;
  height: 132rpx;
}

.screen-art {
  position: absolute;
  right: 18rpx;
  top: 5rpx;
  width: 94rpx;
  height: 76rpx;
  border: 10rpx solid #9dbcf4;
  border-radius: 12rpx;
}

.screen-art::before {
  left: 21rpx;
  top: 31rpx;
  width: 17rpx;
  height: 22rpx;
  border-radius: 4rpx 4rpx 0 0;
  background: #78a6f5;
  box-shadow: 26rpx -16rpx 0 #78a6f5, 52rpx -33rpx 0 #78a6f5;
}

.screen-art::after {
  left: 16rpx;
  right: 16rpx;
  bottom: -26rpx;
  height: 8rpx;
  border-radius: 8rpx;
  background: #cbdaf5;
}

.person-art {
  position: absolute;
  left: 20rpx;
  bottom: 10rpx;
  width: 38rpx;
  height: 38rpx;
  border-radius: 50%;
  background: #2f78f5;
}

.person-art::after {
  left: -16rpx;
  top: 42rpx;
  width: 70rpx;
  height: 30rpx;
  border-radius: 34rpx 34rpx 6rpx 6rpx;
  background: #2f78f5;
}

.chat-art {
  position: absolute;
  width: 56rpx;
  height: 40rpx;
  border-radius: 10rpx;
  background: #2d7cf7;
}

.chat-art--one {
  left: 22rpx;
  top: 28rpx;
  background: #dbe8ff;
}

.chat-art--two {
  right: 0;
  bottom: 32rpx;
}

.chat-art::before {
  left: 13rpx;
  top: 18rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 14rpx 0 0 currentColor, 28rpx 0 0 currentColor;
}

.chat-art--two::before {
  background: #fff;
  box-shadow: 14rpx 0 0 #fff, 28rpx 0 0 #fff;
}

.file-row {
  display: flex;
  min-height: 80rpx;
  align-items: center;
  gap: 20rpx;
  margin: 22rpx 0 0;
  padding: 14rpx 18rpx;
  border: 1rpx solid #e4e9f2;
  border-radius: 14rpx;
  background: #fcfdff;
  text-align: left;
}

.file-row::after,
.detail-button::after {
  display: none;
}

.file-type {
  display: flex;
  width: 48rpx;
  height: 56rpx;
  align-items: center;
  justify-content: center;
  border-radius: 7rpx;
  background: #f03f3f;
  color: #fff;
  font-size: 15rpx;
  font-weight: 900;
  line-height: 1;
}

.file-type::before {
  right: 0;
  top: 0;
  border-top: 14rpx solid rgba(255, 255, 255, 0.52);
  border-left: 14rpx solid transparent;
}

.file-copy {
  min-width: 0;
  flex: 1;
}

.file-name {
  color: #111827;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.2;
}

.file-meta {
  margin-top: 10rpx;
  color: #4a5875;
  font-size: 25rpx;
  line-height: 1.2;
}

.row-arrow {
  width: 18rpx;
  height: 18rpx;
  color: #64748b;
}

.row-arrow::before {
  inset: 0;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.note-box {
  margin-top: 22rpx;
  padding: 18rpx 22rpx;
  border: 1rpx solid #e4e9f2;
  border-radius: 14rpx;
  background: #fcfdff;
  color: #30466e;
  font-size: 27rpx;
  line-height: 1.55;
}

.ai-box {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-top: 22rpx;
  padding: 20rpx 22rpx;
  border: 1rpx solid #dfd2ff;
  border-radius: 14rpx;
  background: #fbf8ff;
}

.ai-desc {
  min-width: 0;
  flex: 1;
  color: #30466e;
  font-size: 27rpx;
  line-height: 1.45;
}

.detail-button {
  flex: 0 0 auto;
  margin: 0;
  padding: 0 22rpx;
  border: 2rpx solid #c5a6ff;
  border-radius: 999rpx;
  background: #fff;
  color: #7b4df4;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 58rpx;
}

.status-box {
  display: flex;
  align-items: center;
  gap: 22rpx;
  margin-top: 22rpx;
  padding: 22rpx;
  border-radius: 18rpx;
  background: linear-gradient(110deg, #f0f6ff, #f8fbff);
}

.clock-icon {
  width: 42rpx;
  height: 42rpx;
  border-radius: 50%;
  color: #2d61b4;
}

.clock-icon::before {
  inset: 4rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.clock-icon::after {
  left: 20rpx;
  top: 11rpx;
  width: 10rpx;
  height: 14rpx;
  border-bottom: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
}

.status-copy {
  min-width: 0;
  flex: 1;
}

.status-title {
  color: #111827;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.25;
}

.status-desc {
  margin-top: 14rpx;
  color: #30466e;
  font-size: 26rpx;
  line-height: 1.5;
}

.folder-art {
  width: 102rpx;
  height: 78rpx;
}

.folder-art::before {
  left: 14rpx;
  bottom: 5rpx;
  width: 78rpx;
  height: 44rpx;
  border-radius: 8rpx;
  background: #75a9fa;
}

.folder-art::after {
  left: 28rpx;
  top: 5rpx;
  width: 56rpx;
  height: 58rpx;
  background: #eaf2ff;
  clip-path: polygon(0 0, 76% 0, 100% 24%, 100% 100%, 0 100%);
}

.next-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18rpx;
  margin-top: 24rpx;
}

.next-item {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 16rpx;
  padding: 18rpx;
  border: 1rpx solid #e8edf4;
  border-radius: 14rpx;
  background: #fff;
}

.next-icon {
  width: 52rpx;
  height: 52rpx;
  border-radius: 12rpx;
  background: #eaf2ff;
  color: #2d7cf7;
}

.next-icon--folder {
  background: #fff3df;
  color: #f28a00;
}

.next-icon--record {
  background: #e8fbf0;
  color: #0fb463;
}

.next-icon--person::before {
  left: 18rpx;
  top: 9rpx;
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: currentColor;
}

.next-icon--person::after {
  left: 10rpx;
  bottom: 8rpx;
  width: 32rpx;
  height: 18rpx;
  border-radius: 18rpx 18rpx 6rpx 6rpx;
  background: currentColor;
}

.next-icon--folder::before {
  left: 9rpx;
  right: 8rpx;
  bottom: 10rpx;
  height: 26rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.next-icon--folder::after {
  left: 12rpx;
  top: 13rpx;
  width: 24rpx;
  height: 12rpx;
  border-radius: 7rpx 7rpx 0 0;
  background: currentColor;
}

.next-icon--record::before {
  inset: 10rpx 13rpx;
  border-radius: 4rpx;
  background: currentColor;
}

.next-icon--record::after {
  left: 20rpx;
  top: 18rpx;
  width: 12rpx;
  height: 4rpx;
  background: #fff;
  box-shadow: 0 10rpx 0 #fff;
}

.next-copy {
  min-width: 0;
}

.next-title {
  color: #111827;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.2;
}

.next-desc {
  margin-top: 8rpx;
  color: #4a5875;
  font-size: 21rpx;
  line-height: 1.25;
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  left: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28rpx;
  padding: 20rpx 42rpx 30rpx;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12rpx);
}

.action-button {
  height: 78rpx;
  border-radius: 12rpx;
  font-size: 31rpx;
}

.outline-button {
  border-color: #2d7cf7;
  color: #1f6df2;
}

.primary-button {
  background: linear-gradient(135deg, #2d7cf7, #1763df);
}

@media (max-width: 430px) {
  .stage-page {
    padding-bottom: calc(116rpx + env(safe-area-inset-bottom));
  }

  .nav-status {
    margin-right: 6rpx;
    padding: 8rpx 14rpx;
    font-size: 20rpx;
  }

  .content {
    gap: 14rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .success-hero {
    min-height: 216rpx;
    padding: 8rpx 20rpx 0;
  }

  .success-mark {
    width: 66rpx;
    height: 66rpx;
  }

  .success-mark::before {
    left: 20rpx;
    top: 19rpx;
    width: 27rpx;
    height: 15rpx;
    border-bottom-width: 7rpx;
    border-left-width: 7rpx;
  }

  .success-title {
    margin-top: 22rpx;
    font-size: 30rpx;
  }

  .success-desc {
    margin-top: 12rpx;
    font-size: 22rpx;
  }

  .activity-card,
  .section-card {
    padding: 18rpx;
  }

  .section-title {
    font-size: 25rpx;
  }

  .activity-body {
    gap: 12rpx;
    margin-top: 16rpx;
  }

  .activity-title {
    font-size: 29rpx;
  }

  .meta-row {
    gap: 10rpx;
    margin-top: 14rpx;
    font-size: 22rpx;
  }

  .activity-art {
    width: 118rpx;
    height: 94rpx;
  }

  .screen-art {
    width: 62rpx;
    height: 50rpx;
    border-width: 7rpx;
  }

  .person-art {
    width: 28rpx;
    height: 28rpx;
  }

  .person-art::after {
    width: 52rpx;
    height: 22rpx;
  }

  .chat-art {
    width: 40rpx;
    height: 30rpx;
  }

  .file-row {
    min-height: 64rpx;
    gap: 12rpx;
    margin-top: 14rpx;
    padding: 10rpx 12rpx;
  }

  .file-type {
    width: 40rpx;
    height: 48rpx;
    font-size: 13rpx;
  }

  .file-name,
  .status-title {
    font-size: 23rpx;
  }

  .file-meta,
  .note-box,
  .ai-desc,
  .status-desc {
    font-size: 20rpx;
  }

  .note-box,
  .ai-box,
  .status-box {
    margin-top: 14rpx;
    padding: 14rpx;
  }

  .detail-button {
    padding: 0 14rpx;
    font-size: 21rpx;
    line-height: 46rpx;
  }

  .clock-icon {
    width: 36rpx;
    height: 36rpx;
  }

  .folder-art {
    width: 78rpx;
    height: 60rpx;
  }

  .next-grid {
    gap: 10rpx;
    margin-top: 14rpx;
  }

  .next-item {
    gap: 8rpx;
    padding: 12rpx;
  }

  .next-icon {
    width: 40rpx;
    height: 40rpx;
  }

  .next-title {
    font-size: 21rpx;
  }

  .next-desc {
    font-size: 17rpx;
  }

  .fixed-actions {
    gap: 14rpx;
    padding: 16rpx 20rpx 22rpx;
  }

  .action-button {
    height: 66rpx;
    font-size: 25rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .activity-body,
  .status-box {
    align-items: flex-start;
  }

  .activity-art,
  .folder-art {
    display: none;
  }

  .ai-box {
    align-items: flex-start;
    flex-direction: column;
  }

  .next-grid {
    grid-template-columns: 1fr;
  }

  .fixed-actions {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }
}
</style>
