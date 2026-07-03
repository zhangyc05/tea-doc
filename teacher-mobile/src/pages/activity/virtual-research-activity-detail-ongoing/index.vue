<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import { submitStageMaterial } from '../../../domain/virtualResearch'

const materialRows = [
  { title: '会议纪要', desc: '会议结束后由系统自动生成', status: '待生成', tone: 'blue', icon: 'doc' },
  { title: '任务分工', desc: '已由教研室秘书同步', status: '已同步', tone: 'green', icon: 'task' },
  { title: '阶段材料', desc: '暂未提交', status: '待提交', tone: 'orange', icon: 'folder' },
  { title: '个人贡献', desc: '会议结束后，系统将自动识别并整理', status: '待识别', tone: 'blue', icon: 'person' },
]

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}

function goResearchRoom() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-room/index' })
}

function goStageMaterial() {
  submitStageMaterial()
  uni.navigateTo({ url: '/pages/activity/virtual-research-award-management/index' })
}
</script>

<template>
  <view class="detail-page">
    <MobileNavbar title="教研活动详情" size="compact" @back="goBack">
      <template #right>
        <button class="more-button" @tap="showToast('更多')">
          <view class="more-dot"></view>
          <view class="more-dot"></view>
          <view class="more-dot"></view>
        </button>
      </template>
    </MobileNavbar>

    <view class="status-row">
      <view class="status-pill">
        <view class="status-spinner"></view>
        <text>进行中</text>
      </view>
    </view>

    <view class="content">
      <MobileCard class="hero-card">
        <view class="hero-copy">
          <text class="activity-title">课程案例共创碰头会</text>
          <view class="info-line">
            <view class="line-icon line-icon--calendar"></view>
            <text>2026-06-03（周三）14:00-15:30</text>
          </view>
          <view class="info-line">
            <view class="line-icon line-icon--video"></view>
            <text>腾讯会议</text>
            <text class="meeting-number">会议号：123 456 789</text>
          </view>
          <view class="info-line">
            <view class="line-icon line-icon--team"></view>
            <text>智能制造课程虚拟教研室</text>
          </view>
        </view>
        <view class="hero-illustration" aria-hidden="true">
          <view class="screen">
            <view class="chart-line"></view>
            <view class="chart-dot chart-dot--a"></view>
            <view class="chart-dot chart-dot--b"></view>
          </view>
          <view class="person"></view>
          <view class="bubble bubble--left"></view>
          <view class="bubble bubble--right"></view>
        </view>
      </MobileCard>

      <MobileCard class="section-card desc-card">
        <view class="section-head">
          <view class="section-icon section-icon--doc"></view>
          <text class="section-title">活动说明</text>
        </view>
        <text class="section-desc">围绕企业设备调试案例、课程案例结构和课堂应用方式进行共创讨论，形成可复用的课程案例资源。</text>
      </MobileCard>

      <MobileCard class="section-card task-card">
        <view class="section-head">
          <view class="section-icon section-icon--user"></view>
          <text class="section-title">我的任务</text>
        </view>
        <view class="task-panel">
          <view class="task-check"></view>
          <view class="task-copy">
            <view class="task-title-row">
              <text class="task-title">案例素材准备</text>
              <text class="state-chip state-chip--green">进行中</text>
            </view>
            <text class="task-desc">会前准备 1 个企业设备调试案例，可在会议后补充材料。</text>
            <view class="task-deadline">
              <view class="line-icon line-icon--clock"></view>
              <text>截止时间：2026-06-03 12:00</text>
            </view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card meeting-card">
        <view class="section-head">
          <view class="section-icon section-icon--calendar"></view>
          <text class="section-title">会议安排</text>
        </view>
        <view class="meeting-panel">
          <view class="meeting-copy">
            <view class="meeting-title-row">
              <text class="meeting-title">腾讯会议</text>
              <text class="state-chip state-chip--blue">线上会议</text>
            </view>
            <view class="meeting-meta">
              <view class="line-icon line-icon--clock"></view>
              <text>会议时间：2026-06-03 14:00-15:30</text>
            </view>
            <view class="meeting-meta">
              <view class="line-icon line-icon--team"></view>
              <text>主持人：林老师</text>
            </view>
          </view>
          <MobileActionButton class="join-button" variant="primary" @tap="showToast('会议入口待接入')">
            进入会议
          </MobileActionButton>
        </view>
      </MobileCard>

      <MobileCard class="section-card materials-card">
        <view class="section-head">
          <view class="section-icon section-icon--folder"></view>
          <text class="section-title">过程材料</text>
        </view>
        <view class="material-list">
          <view v-for="item in materialRows" :key="item.title" class="material-row">
            <view class="material-icon" :class="[`material-icon--${item.icon}`, `material-icon--${item.tone}`]"></view>
            <view class="material-copy">
              <text class="material-title">{{ item.title }}</text>
              <text class="material-desc">{{ item.desc }}</text>
            </view>
            <text class="state-chip" :class="`state-chip--${item.tone}`">{{ item.status }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="system-card">
        <view class="system-icon">i</view>
        <view class="system-copy">
          <text class="system-title">系统提示</text>
          <text class="system-desc">会议结束后，系统会根据参会记录、会议纪要和任务分工整理个人贡献信息，并通过消息提醒你进行确认。</text>
        </view>
      </MobileCard>
    </view>

    <view class="fixed-action">
      <MobileActionButton class="return-button" variant="outline" @tap="goResearchRoom">
        返回教研室
      </MobileActionButton>
      <MobileActionButton class="return-button" variant="primary" @tap="goStageMaterial">
        提交阶段材料
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.detail-page {
  min-height: 100vh;
  padding-bottom: calc(142rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 84% 7%, rgba(229, 246, 255, 0.74), transparent 27%),
    linear-gradient(180deg, #fdfffe 0%, #fff 46%, #f8fbff 100%);
  color: #10172d;
}

.more-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9rpx;
  width: 88rpx;
  height: 58rpx;
  margin: 0 18rpx 0 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.more-button::after {
  display: none;
}

.more-dot {
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #111827;
}

.status-row {
  display: flex;
  justify-content: center;
  margin-top: -2rpx;
  padding-bottom: 28rpx;
}

.status-pill {
  display: flex;
  align-items: center;
  gap: 12rpx;
  height: 58rpx;
  padding: 0 28rpx;
  border-radius: 999rpx;
  background: #fff2df;
  color: #f17800;
  font-size: 31rpx;
  font-weight: 900;
}

.status-spinner {
  width: 28rpx;
  height: 28rpx;
  border: 5rpx solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 0 34rpx;
}

.hero-card,
.section-card,
.system-card {
  border-radius: 22rpx;
}

.hero-card {
  display: flex;
  align-items: center;
  gap: 24rpx;
  padding: 30rpx;
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.activity-title,
.section-title,
.section-desc,
.task-title,
.task-desc,
.material-title,
.material-desc,
.system-title,
.system-desc {
  display: block;
}

.activity-title {
  margin-bottom: 28rpx;
  color: #080f24;
  font-size: 39rpx;
  font-weight: 900;
  line-height: 1.22;
}

.info-line,
.task-deadline,
.meeting-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 18rpx;
  color: #253653;
  font-size: 28rpx;
  line-height: 1.3;
}

.meeting-number {
  margin-left: 10rpx;
}

.line-icon,
.section-icon,
.task-check,
.material-icon,
.system-icon {
  position: relative;
  flex: 0 0 auto;
}

.line-icon {
  width: 30rpx;
  height: 30rpx;
  color: #66728b;
}

.line-icon::before,
.line-icon::after,
.section-icon::before,
.section-icon::after,
.task-check::before,
.task-check::after,
.material-icon::before,
.material-icon::after,
.hero-illustration::before,
.hero-illustration::after,
.screen::before,
.screen::after,
.person::before,
.person::after,
.bubble::before {
  position: absolute;
  content: '';
}

.line-icon--calendar::before,
.line-icon--clock::before,
.line-icon--team::before {
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

.hero-illustration {
  position: relative;
  flex: 0 0 auto;
  width: 188rpx;
  height: 148rpx;
}

.screen {
  position: absolute;
  right: 8rpx;
  top: 8rpx;
  width: 98rpx;
  height: 92rpx;
  border: 9rpx solid #a7c2fb;
  border-radius: 14rpx;
  background: #f5f8ff;
}

.screen::before {
  left: 30rpx;
  bottom: -34rpx;
  width: 10rpx;
  height: 30rpx;
  background: #4d86f5;
}

.screen::after {
  left: 10rpx;
  bottom: -38rpx;
  width: 72rpx;
  height: 8rpx;
  border-radius: 8rpx;
  background: #4d86f5;
}

.chart-line {
  position: absolute;
  left: 22rpx;
  top: 42rpx;
  width: 48rpx;
  height: 24rpx;
  border-top: 8rpx solid #b6cffc;
  border-right: 8rpx solid #b6cffc;
  transform: rotate(-20deg);
}

.chart-dot {
  position: absolute;
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background: #83aefa;
}

.chart-dot--a {
  left: 23rpx;
  top: 46rpx;
}

.chart-dot--b {
  right: 15rpx;
  top: 30rpx;
}

.person {
  position: absolute;
  left: 28rpx;
  bottom: 4rpx;
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  background: #4d86f5;
}

.person::after {
  left: -18rpx;
  top: 52rpx;
  width: 80rpx;
  height: 42rpx;
  border-radius: 42rpx 42rpx 8rpx 8rpx;
  background: #4d86f5;
}

.bubble {
  position: absolute;
  border-radius: 8rpx;
  background: #d8e6ff;
}

.bubble--left {
  left: 20rpx;
  top: 24rpx;
  width: 54rpx;
  height: 36rpx;
}

.bubble--right {
  right: 0;
  bottom: 32rpx;
  width: 64rpx;
  height: 42rpx;
  background: #4d86f5;
}

.bubble::before {
  left: 18rpx;
  top: 15rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: currentColor;
  color: #83aefa;
  box-shadow: 14rpx 0 0 currentColor, 28rpx 0 0 currentColor;
}

.bubble--right::before {
  color: #d8e6ff;
}

.section-card {
  padding: 28rpx;
}

.section-head {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.section-icon {
  width: 58rpx;
  height: 58rpx;
  border-radius: 14rpx;
}

.section-icon--doc,
.section-icon--calendar {
  background: #eef5ff;
  color: #3478ef;
}

.section-icon--user {
  background: #eaf8f0;
  color: #10b966;
}

.section-icon--folder {
  background: #f3edff;
  color: #8b5cf6;
}

.section-icon::before {
  inset: 15rpx 17rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.section-icon::after {
  left: 23rpx;
  top: 24rpx;
  width: 14rpx;
  height: 4rpx;
  background: currentColor;
  box-shadow: 0 10rpx 0 currentColor;
}

.section-title {
  color: #111827;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.section-desc {
  margin: 22rpx 0 0 78rpx;
  color: #17243d;
  font-size: 29rpx;
  line-height: 1.65;
}

.task-panel,
.meeting-panel {
  margin: 24rpx 0 0 78rpx;
  border-radius: 16rpx;
  background: linear-gradient(105deg, #effbf6, #f8fffc);
}

.task-panel {
  display: flex;
  gap: 22rpx;
  padding: 24rpx;
}

.task-check {
  width: 52rpx;
  height: 52rpx;
  border-radius: 12rpx;
  background: #15b968;
}

.task-check::after {
  left: 17rpx;
  top: 12rpx;
  width: 15rpx;
  height: 25rpx;
  border-right: 6rpx solid #fff;
  border-bottom: 6rpx solid #fff;
  transform: rotate(45deg);
}

.task-copy {
  min-width: 0;
  flex: 1;
}

.task-title-row,
.meeting-title-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.task-title,
.meeting-title {
  min-width: 0;
  flex: 1;
  color: #111827;
  font-size: 29rpx;
  font-weight: 900;
}

.task-desc {
  margin-top: 18rpx;
  color: #52617c;
  font-size: 25rpx;
  line-height: 1.45;
}

.task-deadline {
  margin-top: 18rpx;
  font-size: 25rpx;
}

.meeting-panel {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 24rpx;
  background: linear-gradient(105deg, #f7faff, #fbfdff);
}

.meeting-copy {
  min-width: 0;
  flex: 1;
}

.meeting-meta {
  margin-top: 16rpx;
  font-size: 25rpx;
}

.join-button {
  flex: 0 0 auto;
  min-width: 138rpx;
  height: 70rpx;
  border-radius: 12rpx;
  background: #3378ef;
  font-size: 28rpx;
}

.state-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  min-height: 42rpx;
  padding: 0 18rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  font-weight: 900;
  white-space: nowrap;
}

.state-chip--green {
  background: #e8f8ef;
  color: #079653;
}

.state-chip--blue {
  background: #eaf3ff;
  color: #2f73ef;
}

.state-chip--orange {
  background: #fff0dc;
  color: #f17800;
}

.material-list {
  margin: 24rpx 0 0 78rpx;
}

.material-row {
  display: flex;
  align-items: center;
  gap: 20rpx;
  min-height: 102rpx;
  border-bottom: 1rpx solid #edf1f6;
}

.material-row:last-child {
  border-bottom: 0;
}

.material-icon {
  width: 58rpx;
  height: 58rpx;
  border-radius: 14rpx;
}

.material-icon--blue {
  background: #eaf3ff;
  color: #3478ef;
}

.material-icon--green {
  background: #eaf8f0;
  color: #10b966;
}

.material-icon--orange {
  background: #fff4df;
  color: #f59e0b;
}

.material-icon::before {
  inset: 14rpx 17rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.material-icon::after {
  left: 22rpx;
  top: 24rpx;
  width: 15rpx;
  height: 4rpx;
  background: currentColor;
  box-shadow: 0 10rpx 0 currentColor;
}

.material-copy {
  min-width: 0;
  flex: 1;
}

.material-title {
  color: #111827;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.2;
}

.material-desc {
  margin-top: 9rpx;
  color: #52617c;
  font-size: 24rpx;
  line-height: 1.32;
}

.system-card {
  display: flex;
  gap: 22rpx;
  padding: 26rpx 28rpx;
  background: linear-gradient(105deg, #f3f8ff, #fbfdff);
}

.system-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: #8bb8ff;
  color: #fff;
  font-size: 28rpx;
  font-weight: 900;
}

.system-copy {
  min-width: 0;
  flex: 1;
}

.system-title {
  color: #1957a8;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.25;
}

.system-desc {
  margin-top: 18rpx;
  color: #33435d;
  font-size: 27rpx;
  line-height: 1.55;
}

.fixed-action {
  position: fixed;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  left: 0;
  z-index: 2;
  padding: 22rpx 34rpx 26rpx;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 -16rpx 34rpx rgba(31, 45, 78, 0.08);
  backdrop-filter: blur(12rpx);
}

.return-button {
  width: 100%;
  height: 78rpx;
  border-color: #3478ef;
  border-radius: 12rpx;
  color: #3478ef;
  font-size: 31rpx;
}

@media (max-width: 430px) {
  .detail-page {
    padding-bottom: calc(134rpx + env(safe-area-inset-bottom));
  }

  .status-row {
    padding-bottom: 20rpx;
  }

  .status-pill {
    height: 50rpx;
    font-size: 26rpx;
  }

  .content {
    gap: 18rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .hero-card {
    gap: 14rpx;
    padding: 26rpx 22rpx;
  }

  .activity-title {
    margin-bottom: 20rpx;
    font-size: 34rpx;
  }

  .info-line {
    gap: 10rpx;
    margin-top: 14rpx;
    font-size: 24rpx;
  }

  .hero-illustration {
    width: 150rpx;
    height: 128rpx;
  }

  .section-card {
    padding: 24rpx 20rpx;
  }

  .section-icon {
    width: 50rpx;
    height: 50rpx;
  }

  .section-title {
    font-size: 29rpx;
  }

  .section-desc,
  .task-panel,
  .meeting-panel,
  .material-list {
    margin-left: 70rpx;
  }

  .section-desc {
    font-size: 25rpx;
  }

  .task-panel,
  .meeting-panel {
    padding: 20rpx;
  }

  .task-title,
  .meeting-title {
    font-size: 26rpx;
  }

  .task-desc,
  .task-deadline,
  .meeting-meta,
  .material-desc {
    font-size: 22rpx;
  }

  .material-title {
    font-size: 25rpx;
  }

  .join-button {
    min-width: 122rpx;
    height: 62rpx;
    font-size: 24rpx;
  }

  .system-card {
    padding: 24rpx 22rpx;
  }

  .system-title {
    font-size: 27rpx;
  }

  .system-desc {
    font-size: 24rpx;
  }

  .fixed-action {
    padding: 18rpx 20rpx 22rpx;
  }

  .return-button {
    height: 70rpx;
    font-size: 27rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .hero-card {
    align-items: flex-start;
  }

  .hero-illustration {
    width: 112rpx;
    height: 106rpx;
  }

  .screen {
    width: 74rpx;
    height: 70rpx;
  }

  .person,
  .bubble--left,
  .bubble--right {
    transform: scale(0.78);
    transform-origin: left top;
  }

  .activity-title {
    font-size: 30rpx;
  }

  .section-desc,
  .task-panel,
  .meeting-panel,
  .material-list {
    margin-left: 0;
  }

  .meeting-panel {
    align-items: flex-start;
    flex-direction: column;
  }

  .join-button {
    align-self: flex-end;
  }

  .material-row {
    gap: 14rpx;
  }

  .state-chip {
    padding: 0 12rpx;
    font-size: 21rpx;
  }
}
</style>
