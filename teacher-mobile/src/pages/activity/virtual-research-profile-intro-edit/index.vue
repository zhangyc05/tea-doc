<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const contributions = [
  {
    index: '1',
    title: '提供企业设备调试案例素材',
    desc: '为课程案例提供真实设备调试过程中的典型问题与解决方案。',
    source: '来源：阶段材料、会议纪要',
    status: '已确认',
    tone: 'blue',
  },
  {
    index: '2',
    title: '补充设备故障诊断教学建议',
    desc: '针对设备故障诊断环节，补充实践教学中的重点和难点建议。',
    source: '来源：发言摘录、会议纪要',
    status: '已确认',
    tone: 'blue',
  },
  {
    index: '3',
    title: '参与课程案例结构讨论',
    desc: '参与课程案例结构设计讨论，提出案例逻辑优化建议。',
    source: '来源：会议纪要、发言摘录、阶段材料、任务分工记录',
    status: '已确认',
    extra: '新补充',
    tone: 'orange',
  },
]

const files = [
  { name: '会议纪要.pdf', size: '1.2 MB', type: 'pdf' },
  { name: '发言摘录.docx', size: '856 KB', type: 'doc' },
  { name: '阶段材料.pdf', size: '2.4 MB', type: 'pdf' },
  { name: '任务分工记录.xlsx', size: '512 KB', type: 'xls' },
]

const steps = [
  { title: '贡献待确认', time: '06-03 16:20', state: 'done' },
  { title: '贡献已确认', time: '06-03 16:45', state: 'done' },
  { title: '等待归档', time: '进行中', state: 'active' },
  { title: '已归档入档', time: '待完成', state: 'todo' },
]

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}
</script>

<template>
  <view class="intro-submitted-page">
    <MobileNavbar title="贡献确认已提交" size="compact" @back="goBack">
      <template #right>
        <button class="track-button" @tap="showToast('进度跟踪')">
          <view class="track-icon"></view>
          <text>进度跟踪</text>
        </button>
      </template>
    </MobileNavbar>
    <text class="nav-subtitle">等待归档</text>

    <view class="hero-section">
      <view class="hero-copy">
        <view class="hero-title-row">
          <view class="success-icon"></view>
          <text class="hero-title">贡献确认已提交</text>
        </view>
        <text class="hero-desc">你已确认本次活动的完整个人贡献，当前等待教研活动归档，归档后将形成教研活动记录并计入你的成长档案。</text>
      </view>
      <view class="hero-art">
        <view class="folder-art"></view>
        <view class="clock-art"></view>
      </view>
    </view>

    <view class="content">
      <MobileCard class="section-card activity-card">
        <view class="section-head">
          <view class="head-icon head-icon--group"></view>
          <text class="section-title">本次教研活动</text>
        </view>
        <view class="divider"></view>
        <view class="activity-body">
          <view class="activity-art">
            <view class="screen-art"></view>
            <view class="bubble-art"></view>
          </view>
          <view class="activity-copy">
            <text class="activity-title">课程案例共创碰头会</text>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--calendar"></view>
              <text>2026-06-03（周二）14:00-15:30</text>
            </view>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--video"></view>
              <text>腾讯会议（ID：123 456 789）</text>
            </view>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--room"></view>
              <text>智能制造课程虚拟教研室</text>
            </view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card contribution-card">
        <view class="section-head">
          <view class="head-icon head-icon--person"></view>
          <text class="section-title">已确认的个人贡献（3项）</text>
        </view>
        <view class="contribution-list">
          <button
            v-for="item in contributions"
            :key="item.index"
            class="contribution-item"
            @tap="showToast(item.title)"
          >
            <text class="index-badge" :class="`index-badge--${item.tone}`">{{ item.index }}</text>
            <view class="contribution-copy">
              <view class="contribution-title-row">
                <text class="contribution-title">{{ item.title }}</text>
                <text v-if="item.extra" class="extra-chip">{{ item.extra }}</text>
              </view>
              <text class="contribution-desc">{{ item.desc }}</text>
              <text class="source-line">{{ item.source }}</text>
            </view>
            <view class="item-side">
              <text class="confirm-chip">{{ item.status }}</text>
              <view class="doc-icon"></view>
            </view>
          </button>
        </view>
      </MobileCard>

      <MobileCard class="section-card file-card">
        <view class="section-head">
          <view class="head-icon head-icon--folder"></view>
          <text class="section-title">关联材料（4项）</text>
        </view>
        <view class="file-grid">
          <button v-for="file in files" :key="file.name" class="file-item" @tap="showToast(file.name)">
            <view class="file-icon" :class="`file-icon--${file.type}`">
              <text>{{ file.type === 'pdf' ? '' : file.type === 'doc' ? 'W' : 'X' }}</text>
            </view>
            <view class="file-copy">
              <text class="file-name">{{ file.name }}</text>
              <text class="file-size">{{ file.size }}</text>
            </view>
          </button>
        </view>
      </MobileCard>

      <MobileCard class="section-card status-card">
        <view class="section-head">
          <view class="head-icon head-icon--clock"></view>
          <text class="section-title">当前状态</text>
        </view>
        <view class="divider"></view>
        <view class="timeline">
          <view v-for="(step, index) in steps" :key="step.title" class="timeline-step" :class="`timeline-step--${step.state}`">
            <view class="step-dot"></view>
            <view v-if="index < steps.length - 1" class="step-line"></view>
            <text class="step-title">{{ step.title }}</text>
            <text class="step-time">{{ step.time }}</text>
          </view>
        </view>
        <view class="archive-tip">
          <view class="info-icon"></view>
          <text>归档后将生成教研活动记录并计入你的成长档案，可用于能力画像、岗位/聘期对照和个人发展报告。</text>
        </view>
      </MobileCard>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="action-button outline-action" variant="outline" @tap="showToast('返回教研室')">
        返回教研室
      </MobileActionButton>
      <MobileActionButton class="action-button primary-action" variant="primary" @tap="showToast('查看提交内容')">
        查看提交内容
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.intro-submitted-page {
  min-height: 100vh;
  padding-bottom: calc(142rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 84% 0%, rgba(235, 246, 255, 0.9), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #fbfdff 44%, #f8fbfb 100%);
  color: #10172d;
}

.track-button {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin: 0 24rpx 0 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #263a5e;
  font-size: 28rpx;
  font-weight: 800;
  line-height: 1;
}

.track-button::after {
  display: none;
}

.track-icon,
.success-icon,
.hero-art,
.folder-art,
.clock-art,
.head-icon,
.activity-art,
.screen-art,
.bubble-art,
.tiny-icon,
.index-badge,
.item-side,
.doc-icon,
.file-icon,
.step-dot,
.step-line,
.info-icon {
  position: relative;
  flex: 0 0 auto;
}

.track-icon {
  width: 28rpx;
  height: 28rpx;
  color: #2f5fbd;
}

.track-icon::before,
.track-icon::after,
.success-icon::before,
.folder-art::before,
.folder-art::after,
.clock-art::before,
.clock-art::after,
.head-icon::before,
.head-icon::after,
.screen-art::before,
.screen-art::after,
.bubble-art::before,
.tiny-icon::before,
.tiny-icon::after,
.doc-icon::before,
.doc-icon::after,
.file-icon::before,
.file-icon::after,
.step-dot::before,
.info-icon::before {
  position: absolute;
  content: '';
}

.track-icon::before {
  left: 2rpx;
  bottom: 1rpx;
  width: 5rpx;
  height: 12rpx;
  background: currentColor;
  box-shadow: 9rpx -5rpx 0 currentColor, 18rpx -13rpx 0 currentColor;
}

.track-icon::after {
  left: 1rpx;
  right: 1rpx;
  bottom: 0;
  height: 4rpx;
  border-radius: 4rpx;
  background: currentColor;
}

.nav-subtitle {
  display: block;
  margin-top: -6rpx;
  color: #293c61;
  font-size: 26rpx;
  line-height: 1;
  text-align: center;
}

.hero-section {
  display: flex;
  align-items: center;
  gap: 24rpx;
  min-height: 206rpx;
  margin-top: 24rpx;
  padding: 0 44rpx 16rpx;
  border-bottom: 1rpx solid #e8edf5;
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.hero-title-row,
.section-head,
.activity-body,
.meta-row,
.contribution-title-row,
.archive-tip {
  display: flex;
  align-items: center;
}

.hero-title-row {
  gap: 20rpx;
}

.success-icon {
  width: 58rpx;
  height: 58rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #20cc75, #06ad5d);
}

.success-icon::before {
  left: 18rpx;
  top: 17rpx;
  width: 23rpx;
  height: 13rpx;
  border-bottom: 7rpx solid #fff;
  border-left: 7rpx solid #fff;
  transform: rotate(-45deg);
}

.hero-title,
.hero-desc,
.section-title,
.activity-title,
.meta-row,
.contribution-title,
.contribution-desc,
.source-line,
.file-name,
.file-size,
.step-title,
.step-time,
.archive-tip text {
  display: block;
}

.hero-title {
  color: #090f22;
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1.2;
}

.hero-desc {
  margin-top: 34rpx;
  color: #334966;
  font-size: 30rpx;
  line-height: 1.55;
}

.hero-art {
  width: 190rpx;
  height: 150rpx;
}

.folder-art {
  position: absolute;
  right: 22rpx;
  bottom: 18rpx;
  width: 104rpx;
  height: 68rpx;
  border-radius: 10rpx;
  background: linear-gradient(135deg, #75a5ff, #5587ef);
}

.folder-art::before {
  left: 14rpx;
  top: -18rpx;
  width: 76rpx;
  height: 58rpx;
  border-radius: 9rpx;
  background: #f3f7ff;
  box-shadow: 0 0 0 8rpx rgba(213, 228, 255, 0.88);
}

.folder-art::after {
  left: 24rpx;
  top: -2rpx;
  width: 55rpx;
  height: 6rpx;
  border-radius: 6rpx;
  background: #d7e3fb;
  box-shadow: 0 18rpx 0 #d7e3fb, 0 36rpx 0 #d7e3fb;
}

.clock-art {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 70rpx;
  height: 70rpx;
  border: 10rpx solid #dbe8ff;
  border-radius: 50%;
  background: #fff;
  color: #6697f2;
}

.clock-art::before {
  left: 26rpx;
  top: 16rpx;
  width: 6rpx;
  height: 22rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.clock-art::after {
  left: 29rpx;
  top: 34rpx;
  width: 18rpx;
  height: 6rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx 28rpx 0;
}

.section-card {
  padding: 24rpx 22rpx;
  border-radius: 18rpx;
}

.section-head {
  gap: 18rpx;
}

.section-title {
  color: #0b1125;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.25;
}

.head-icon {
  width: 42rpx;
  height: 42rpx;
  border-radius: 10rpx;
  background: #e9f1ff;
  color: #2e75f5;
}

.head-icon--person {
  color: #1c73f4;
}

.head-icon--folder {
  background: #e8fbf0;
  color: #09ae5b;
}

.head-icon--clock {
  background: #f2ecff;
  color: #8b65ed;
}

.head-icon::before {
  left: 14rpx;
  top: 8rpx;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: -11rpx 10rpx 0 -1rpx currentColor, 11rpx 10rpx 0 -1rpx currentColor;
}

.head-icon::after {
  left: 8rpx;
  bottom: 8rpx;
  width: 26rpx;
  height: 12rpx;
  border-radius: 14rpx 14rpx 5rpx 5rpx;
  background: currentColor;
}

.head-icon--folder::before {
  left: 9rpx;
  top: 17rpx;
  width: 25rpx;
  height: 15rpx;
  border-radius: 4rpx;
  box-shadow: none;
}

.head-icon--folder::after {
  left: 11rpx;
  top: 12rpx;
  width: 16rpx;
  height: 8rpx;
  border-radius: 5rpx 5rpx 0 0;
}

.head-icon--clock::before {
  inset: 8rpx;
  border: 5rpx solid currentColor;
  border-radius: 50%;
  background: transparent;
  box-shadow: none;
}

.head-icon--clock::after {
  left: 19rpx;
  top: 13rpx;
  width: 11rpx;
  height: 12rpx;
  border-bottom: 5rpx solid currentColor;
  border-left: 5rpx solid currentColor;
  border-radius: 0;
  background: transparent;
}

.divider {
  height: 1rpx;
  margin-top: 22rpx;
  background: #e8edf5;
}

.activity-body {
  gap: 28rpx;
  margin-top: 24rpx;
}

.activity-art {
  width: 194rpx;
  height: 144rpx;
  overflow: hidden;
  border-radius: 12rpx;
  background: linear-gradient(135deg, #dce9ff, #f4f8ff);
}

.screen-art {
  position: absolute;
  left: 28rpx;
  top: 38rpx;
  width: 102rpx;
  height: 70rpx;
  border: 8rpx solid #6d9df9;
  border-radius: 8rpx;
  background: rgba(255, 255, 255, 0.48);
}

.screen-art::before {
  left: 18rpx;
  top: 26rpx;
  width: 58rpx;
  height: 30rpx;
  border-top: 6rpx solid #76a8fa;
  border-left: 6rpx solid #76a8fa;
  transform: skew(-22deg) rotate(-18deg);
}

.screen-art::after {
  left: 38rpx;
  bottom: -24rpx;
  width: 24rpx;
  height: 24rpx;
  border-radius: 0 0 6rpx 6rpx;
  background: #85aef6;
  box-shadow: -26rpx 23rpx 0 -8rpx #85aef6, 27rpx 23rpx 0 -8rpx #85aef6;
}

.bubble-art {
  position: absolute;
  right: 28rpx;
  bottom: 32rpx;
  width: 44rpx;
  height: 30rpx;
  border-radius: 8rpx;
  background: #6d9df9;
}

.bubble-art::before {
  left: 9rpx;
  top: 12rpx;
  width: 6rpx;
  height: 6rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 11rpx 0 0 #fff, 22rpx 0 0 #fff;
}

.activity-copy {
  min-width: 0;
  flex: 1;
}

.activity-title {
  color: #0b1125;
  font-size: 33rpx;
  font-weight: 900;
  line-height: 1.25;
}

.meta-row {
  gap: 18rpx;
  margin-top: 18rpx;
  color: #4a5875;
  font-size: 27rpx;
  line-height: 1.25;
}

.tiny-icon {
  width: 28rpx;
  height: 28rpx;
  color: #5b6880;
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
  height: 8rpx;
  border-right: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
}

.tiny-icon--room::after {
  left: 10rpx;
  top: 9rpx;
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: currentColor;
}

.contribution-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  margin-top: 22rpx;
}

.contribution-item {
  display: flex;
  align-items: flex-start;
  gap: 22rpx;
  min-height: 124rpx;
  margin: 0;
  padding: 20rpx 18rpx;
  border: 1rpx solid #e2e8f2;
  border-radius: 14rpx;
  background: #fff;
  text-align: left;
}

.contribution-item::after,
.file-item::after {
  display: none;
}

.index-badge {
  display: flex;
  width: 58rpx;
  height: 58rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #dbe9ff;
  color: #1c73f4;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1;
}

.index-badge--orange {
  background: #fff1d7;
  color: #ff970e;
}

.contribution-copy {
  min-width: 0;
  flex: 1;
}

.contribution-title-row {
  gap: 14rpx;
}

.contribution-title {
  color: #111827;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.25;
}

.extra-chip {
  padding: 7rpx 14rpx;
  border-radius: 8rpx;
  background: #fff1df;
  color: #ff7a1a;
  font-size: 23rpx;
  font-weight: 900;
}

.contribution-desc,
.source-line {
  margin-top: 10rpx;
  font-size: 26rpx;
  line-height: 1.34;
}

.contribution-desc {
  color: #4a5875;
}

.source-line {
  color: #1d74f5;
}

.item-side {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16rpx;
  margin-top: 0;
}

.confirm-chip {
  padding: 8rpx 16rpx;
  border-radius: 10rpx;
  background: #dff7e8;
  color: #0ca85d;
  font-size: 24rpx;
  font-weight: 900;
}

.doc-icon {
  width: 54rpx;
  height: 54rpx;
  border-radius: 50%;
  background: #edf4ff;
  color: #1d74f5;
}

.doc-icon::before {
  left: 18rpx;
  top: 12rpx;
  width: 20rpx;
  height: 26rpx;
  border: 4rpx solid currentColor;
  border-radius: 3rpx;
}

.doc-icon::after {
  left: 23rpx;
  top: 24rpx;
  width: 12rpx;
  height: 4rpx;
  background: currentColor;
  box-shadow: 0 9rpx 0 currentColor;
}

.file-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12rpx;
  margin-top: 22rpx;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 22rpx;
  min-width: 0;
  min-height: 86rpx;
  margin: 0;
  padding: 16rpx 20rpx;
  border: 1rpx solid #e3e8f1;
  border-radius: 12rpx;
  background: #fff;
  text-align: left;
}

.file-icon {
  display: flex;
  width: 50rpx;
  height: 62rpx;
  align-items: center;
  justify-content: center;
  border-radius: 7rpx;
  background: #ff5f5f;
  color: #fff;
  font-size: 27rpx;
  font-weight: 900;
}

.file-icon::before {
  right: 0;
  top: 0;
  border-top: 15rpx solid rgba(255, 255, 255, 0.55);
  border-left: 15rpx solid transparent;
}

.file-icon--pdf::after {
  left: 14rpx;
  bottom: 12rpx;
  width: 24rpx;
  height: 26rpx;
  border: 4rpx solid #fff;
  border-radius: 50%;
  border-right-color: transparent;
  border-top-color: transparent;
  transform: rotate(-35deg);
}

.file-icon--doc {
  background: #3d7df0;
}

.file-icon--xls {
  background: #32b879;
}

.file-copy {
  min-width: 0;
  flex: 1;
}

.file-name {
  color: #111827;
  font-size: 28rpx;
  line-height: 1.25;
}

.file-size {
  margin-top: 10rpx;
  color: #52617a;
  font-size: 26rpx;
  line-height: 1.2;
}

.status-card {
  padding-bottom: 0;
}

.timeline {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 30rpx;
}

.timeline-step {
  position: relative;
  min-width: 0;
  padding-top: 54rpx;
  color: #667085;
  text-align: center;
}

.step-dot {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 2;
  width: 42rpx;
  height: 42rpx;
  border-radius: 50%;
  background: #dfe4ec;
  transform: translateX(-50%);
}

.timeline-step--done .step-dot,
.timeline-step--active .step-dot {
  background: #1d74f5;
}

.timeline-step--done .step-dot::before {
  left: 13rpx;
  top: 13rpx;
  width: 16rpx;
  height: 9rpx;
  border-bottom: 5rpx solid #fff;
  border-left: 5rpx solid #fff;
  transform: rotate(-45deg);
}

.timeline-step--active .step-dot::before {
  left: 14rpx;
  top: 9rpx;
  width: 15rpx;
  height: 19rpx;
  border: 5rpx solid #fff;
  border-radius: 50%;
  border-left-color: transparent;
  transform: rotate(22deg);
}

.step-line {
  position: absolute;
  top: 20rpx;
  left: calc(50% + 21rpx);
  width: calc(100% - 42rpx);
  height: 4rpx;
  background: #dfe4ec;
}

.timeline-step--done .step-line {
  background: #1d74f5;
}

.step-title {
  color: #667085;
  font-size: 24rpx;
  font-weight: 700;
  line-height: 1.24;
}

.step-time {
  margin-top: 10rpx;
  color: #667085;
  font-size: 24rpx;
  line-height: 1.2;
}

.timeline-step--active .step-title,
.timeline-step--active .step-time {
  color: #1d74f5;
  font-weight: 900;
}

.archive-tip {
  gap: 16rpx;
  margin: 26rpx -22rpx 0;
  padding: 16rpx 28rpx;
  background: #f3f6fa;
  color: #52617a;
  font-size: 24rpx;
  line-height: 1.35;
}

.info-icon {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  background: #c5ccd7;
}

.info-icon::before {
  left: 14rpx;
  top: 13rpx;
  width: 4rpx;
  height: 12rpx;
  border-radius: 4rpx;
  background: #fff;
  box-shadow: 0 -8rpx 0 -1rpx #fff;
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  left: 0;
  z-index: 18;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28rpx;
  padding: 22rpx 28rpx 30rpx;
  border-top: 1rpx solid #e8edf5;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(14rpx);
}

.action-button {
  height: 74rpx;
  border-radius: 12rpx;
  font-size: 31rpx;
}

.outline-action {
  border-color: #1d74f5;
  color: #1d74f5;
}

.primary-action {
  background: linear-gradient(135deg, #2f7df5, #1168ee);
}

@media (max-width: 430px) {
  .intro-submitted-page {
    padding-bottom: calc(122rpx + env(safe-area-inset-bottom));
  }

  .track-button {
    margin-right: 12rpx;
    font-size: 20rpx;
  }

  .nav-subtitle {
    font-size: 19rpx;
  }

  .hero-section {
    gap: 12rpx;
    min-height: 164rpx;
    margin-top: 18rpx;
    padding: 0 24rpx 14rpx;
  }

  .hero-title-row {
    gap: 12rpx;
  }

  .success-icon {
    width: 42rpx;
    height: 42rpx;
  }

  .hero-title {
    font-size: 30rpx;
  }

  .hero-desc {
    margin-top: 20rpx;
    font-size: 22rpx;
  }

  .hero-art {
    width: 118rpx;
    height: 96rpx;
  }

  .folder-art {
    width: 74rpx;
    height: 48rpx;
  }

  .clock-art {
    width: 48rpx;
    height: 48rpx;
    border-width: 7rpx;
  }

  .content {
    gap: 14rpx;
    padding: 14rpx 12rpx 0;
  }

  .section-card {
    padding: 18rpx;
  }

  .section-title {
    font-size: 24rpx;
  }

  .divider {
    margin-top: 16rpx;
  }

  .activity-body {
    gap: 16rpx;
    margin-top: 16rpx;
  }

  .activity-art {
    width: 96rpx;
    height: 74rpx;
  }

  .screen-art {
    left: 14rpx;
    top: 18rpx;
    width: 56rpx;
    height: 40rpx;
    border-width: 5rpx;
  }

  .bubble-art {
    right: 10rpx;
    bottom: 14rpx;
    width: 30rpx;
    height: 22rpx;
  }

  .activity-title {
    font-size: 25rpx;
  }

  .meta-row {
    gap: 10rpx;
    margin-top: 10rpx;
    font-size: 19rpx;
  }

  .contribution-list,
  .file-grid {
    margin-top: 14rpx;
  }

  .contribution-item {
    gap: 12rpx;
    min-height: 104rpx;
    padding: 12rpx;
  }

  .index-badge {
    width: 44rpx;
    height: 44rpx;
    font-size: 25rpx;
  }

  .contribution-title {
    font-size: 22rpx;
  }

  .extra-chip,
  .confirm-chip {
    font-size: 18rpx;
  }

  .contribution-desc,
  .source-line {
    margin-top: 6rpx;
    font-size: 19rpx;
  }

  .item-side {
    gap: 10rpx;
  }

  .doc-icon {
    width: 40rpx;
    height: 40rpx;
  }

  .file-grid {
    gap: 10rpx;
  }

  .file-item {
    gap: 12rpx;
    min-height: 70rpx;
    padding: 12rpx;
  }

  .file-icon {
    width: 38rpx;
    height: 48rpx;
    font-size: 21rpx;
  }

  .file-name,
  .file-size {
    font-size: 20rpx;
  }

  .timeline {
    margin-top: 20rpx;
  }

  .timeline-step {
    padding-top: 42rpx;
  }

  .step-dot {
    width: 32rpx;
    height: 32rpx;
  }

  .step-line {
    top: 15rpx;
    left: calc(50% + 16rpx);
    width: calc(100% - 32rpx);
  }

  .step-title,
  .step-time {
    font-size: 18rpx;
  }

  .archive-tip {
    gap: 10rpx;
    margin: 18rpx -18rpx 0;
    padding: 12rpx 18rpx;
    font-size: 18rpx;
  }

  .fixed-actions {
    gap: 16rpx;
    padding: 16rpx 12rpx 20rpx;
  }

  .action-button {
    height: 58rpx;
    font-size: 23rpx;
  }
}

@media (max-width: 374px) {
  .hero-art {
    display: none;
  }

  .activity-art {
    display: none;
  }

  .content {
    padding-right: 10rpx;
    padding-left: 10rpx;
  }

  .contribution-item {
    gap: 10rpx;
  }

  .file-grid {
    grid-template-columns: 1fr;
  }
}
</style>
