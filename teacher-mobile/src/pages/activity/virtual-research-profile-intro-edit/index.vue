<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import { previewVirtualResearchMaterial, recordMemberProfileAction } from '../../../domain/virtualResearch'

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

function getStepStatus(state: string) {
  if (state === 'done') return 'finished'
  if (state === 'active') return 'process'
  return undefined
}

function goBack() {
  uni.navigateBack()
}

function goProgressTrack() {
  recordMemberProfileAction('查看贡献归档进度')
  uni.navigateTo({ url: '/pages/activity/virtual-research-activity-detail-confirm/index?from=member-profile' })
}

function goResearchRoom() {
  recordMemberProfileAction('返回我的教研室')
  uni.navigateTo({ url: '/pages/activity/virtual-research-room/index' })
}

function goContributionDetail() {
  recordMemberProfileAction('查看提交内容')
  uni.navigateTo({ url: '/pages/activity/virtual-research-contribution-detail/index?from=member-profile' })
}

function previewMaterial(fileName: string) {
  recordMemberProfileAction(`查看材料：${fileName}`)
  const preview = previewVirtualResearchMaterial(fileName)
  uni.showToast({ title: preview.message || `附件预览为本地模拟：${fileName}`, icon: 'none' })
}
</script>

<template>
  <view class="intro-submitted-page">
    <MobileNavbar title="贡献确认已提交" size="compact" @back="goBack">
      <template #right>
        <button class="track-button" @tap="goProgressTrack">
          <view class="track-icon" aria-hidden="true"></view>
          <text>进度跟踪</text>
        </button>
      </template>
    </MobileNavbar>
    <text class="nav-subtitle">等待归档</text>
    <text class="nav-subtitle">虚拟教研成员资料</text>

    <view class="hero-section">
      <view class="hero-copy">
        <view class="hero-title-row">
          <view class="success-icon" aria-hidden="true"></view>
          <text class="hero-title">贡献确认已提交</text>
        </view>
        <text class="hero-desc">你已确认本次活动的完整个人贡献，当前等待教研活动归档，归档后将形成教研活动记录并计入你的成长档案。</text>
      </view>
      <view class="hero-art" aria-hidden="true">
        <view class="folder-art"></view>
        <view class="clock-art"></view>
      </view>
    </view>

    <view class="content">
      <MobileCard class="section-card activity-card">
        <view class="section-head">
          <view class="head-icon head-icon--group" aria-hidden="true"></view>
          <text class="section-title">本次教研活动</text>
        </view>
        <view class="divider"></view>
        <view class="activity-body">
          <view class="activity-art" aria-hidden="true">
            <view class="screen-art"></view>
            <view class="bubble-art"></view>
          </view>
          <view class="activity-copy">
            <text class="activity-title">课程案例共创碰头会</text>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--calendar" aria-hidden="true"></view>
              <text>2026-06-03（周二）14:00-15:30</text>
            </view>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--video" aria-hidden="true"></view>
              <text>腾讯会议（ID：123 456 789）</text>
            </view>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--room" aria-hidden="true"></view>
              <text>智能制造课程虚拟教研室</text>
            </view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card contribution-card">
        <view class="section-head">
          <view class="head-icon head-icon--person" aria-hidden="true"></view>
          <text class="section-title">已确认的个人贡献（3项）</text>
        </view>
        <view class="contribution-list">
          <button
            v-for="item in contributions"
            :key="item.index"
            class="contribution-item"
            @tap="goContributionDetail"
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
              <view class="doc-icon" aria-hidden="true"></view>
            </view>
          </button>
        </view>
      </MobileCard>

      <MobileCard class="section-card file-card">
        <view class="section-head">
          <view class="head-icon head-icon--folder" aria-hidden="true"></view>
          <text class="section-title">关联材料（4项）</text>
        </view>
        <view class="file-grid">
          <button v-for="file in files" :key="file.name" class="file-item" @tap="previewMaterial(file.name)">
            <view class="file-icon" :class="`file-icon--${file.type}`" aria-hidden="true">
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
          <view class="head-icon head-icon--clock" aria-hidden="true"></view>
          <text class="section-title">当前状态</text>
        </view>
        <view class="divider"></view>
        <wd-steps class="timeline" :active="2" align-center>
          <wd-step
            v-for="step in steps"
            :key="step.title"
            :title="step.title"
            :description="step.time"
            :status="getStepStatus(step.state)"
          />
        </wd-steps>
        <view class="archive-tip">
          <view class="info-icon" aria-hidden="true"></view>
          <text>归档后将生成教研活动记录并计入你的成长档案，可用于能力画像、岗位/聘期对照和个人发展报告。</text>
        </view>
      </MobileCard>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="action-button outline-action" variant="outline" @tap="goResearchRoom">
        返回教研室
      </MobileActionButton>
      <MobileActionButton class="action-button primary-action" variant="primary" @tap="goContributionDetail">
        查看提交内容
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.intro-submitted-page {
  min-height: 100vh;
  padding-bottom: calc(170rpx + env(safe-area-inset-bottom));
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

.track-icon {
  position: relative;
  width: 30rpx;
  height: 30rpx;
}

.track-icon::before {
  position: absolute;
  inset: 4rpx 2rpx 3rpx;
  border-bottom: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
  content: '';
}

.track-icon::after {
  position: absolute;
  right: 1rpx;
  bottom: 4rpx;
  width: 5rpx;
  height: 22rpx;
  background: currentColor;
  box-shadow: -9rpx 8rpx 0 currentColor, -18rpx 14rpx 0 currentColor;
  content: '';
}

.nav-subtitle {
  display: block;
  margin-top: -6rpx;
  color: #33466a;
  font-size: 27rpx;
  font-weight: 500;
  line-height: 1;
  text-align: center;
}

.hero-section {
  display: flex;
  min-height: 190rpx;
  align-items: center;
  gap: 28rpx;
  padding: 40rpx 34rpx 32rpx;
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.hero-title-row,
.section-head,
.meta-row,
.status-row {
  display: flex;
  align-items: center;
}

.hero-title-row {
  gap: 18rpx;
}

.success-icon {
  position: relative;
  width: 44rpx;
  height: 44rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #18bf68;
}

.success-icon::before {
  position: absolute;
  top: 14rpx;
  left: 12rpx;
  width: 19rpx;
  height: 10rpx;
  border-bottom: 6rpx solid #fff;
  border-left: 6rpx solid #fff;
  transform: rotate(-45deg);
  content: '';
}

.hero-title {
  color: #10172d;
  font-size: 39rpx;
  font-weight: 900;
  line-height: 1.2;
}

.hero-desc {
  display: block;
  margin-top: 32rpx;
  color: #2f486f;
  font-size: 28rpx;
  line-height: 1.65;
}

.hero-art {
  position: relative;
  width: 176rpx;
  height: 132rpx;
  flex: 0 0 auto;
}

.folder-art {
  position: absolute;
  right: 18rpx;
  bottom: 14rpx;
  width: 112rpx;
  height: 70rpx;
  border-radius: 10rpx 10rpx 18rpx 18rpx;
  background: linear-gradient(145deg, #7da6ff, #5d87eb);
}

.folder-art::before {
  position: absolute;
  top: -42rpx;
  right: 8rpx;
  width: 82rpx;
  height: 56rpx;
  border: 8rpx solid #e6efff;
  border-radius: 10rpx;
  background: #fff;
  content: '';
}

.folder-art::after {
  position: absolute;
  top: -27rpx;
  right: 26rpx;
  width: 48rpx;
  height: 6rpx;
  border-radius: 6rpx;
  background: #d4e2ff;
  box-shadow: 0 17rpx 0 #d4e2ff;
  content: '';
}

.clock-art {
  position: absolute;
  right: 0;
  bottom: 6rpx;
  width: 58rpx;
  height: 58rpx;
  border: 10rpx solid #d8e6ff;
  border-radius: 50%;
  background: #fff;
}

.clock-art::before {
  position: absolute;
  top: 14rpx;
  left: 20rpx;
  width: 15rpx;
  height: 18rpx;
  border-top: 6rpx solid #6f95f0;
  border-left: 6rpx solid #6f95f0;
  transform: rotate(180deg);
  content: '';
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 24rpx 28rpx;
}

.section-card {
  border-radius: 24rpx;
  box-shadow: 0 14rpx 38rpx rgba(20, 41, 72, 0.055);
}

.activity-card,
.file-card,
.status-card {
  padding: 30rpx;
}

.contribution-card {
  padding: 30rpx;
}

.section-head {
  gap: 14rpx;
}

.head-icon {
  position: relative;
  width: 36rpx;
  height: 36rpx;
  flex: 0 0 auto;
  border-radius: 10rpx;
  background: #eff6ff;
  color: #2477ee;
}

.head-icon::before,
.head-icon::after,
.screen-art::before,
.screen-art::after,
.bubble-art::before,
.tiny-icon::before,
.tiny-icon::after,
.file-icon::before,
.info-icon::before,
.doc-icon::before,
.doc-icon::after {
  position: absolute;
  content: '';
}

.head-icon--folder {
  background: #eafbf1;
  color: #13b965;
}

.head-icon--clock {
  background: #f2edff;
  color: #8b64e8;
}

.head-icon::before {
  inset: 9rpx;
  background: currentColor;
}

.head-icon--group::before,
.head-icon--person::before {
  border-radius: 50%;
  box-shadow: -8rpx 7rpx 0 -2rpx currentColor, 8rpx 7rpx 0 -2rpx currentColor;
}

.head-icon--folder::before {
  clip-path: polygon(0 22%, 35% 22%, 45% 0, 100% 0, 100% 100%, 0 100%);
}

.head-icon--clock::before {
  border-radius: 50%;
}

.section-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.divider {
  height: 1rpx;
  margin-top: 22rpx;
  background: #edf1f5;
}

.activity-body {
  display: flex;
  align-items: center;
  gap: 28rpx;
  margin-top: 24rpx;
}

.activity-art {
  position: relative;
  width: 194rpx;
  height: 146rpx;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 12rpx;
  background: linear-gradient(145deg, #dfeaff, #f5f8ff);
}

.screen-art {
  position: absolute;
  top: 34rpx;
  left: 36rpx;
  width: 110rpx;
  height: 66rpx;
  border: 8rpx solid #6a96ef;
  border-radius: 8rpx;
  background: #eef5ff;
}

.screen-art::before {
  right: 28rpx;
  bottom: -28rpx;
  width: 8rpx;
  height: 26rpx;
  border-radius: 8rpx;
  background: #6a96ef;
}

.screen-art::after {
  right: 8rpx;
  bottom: -32rpx;
  width: 46rpx;
  height: 8rpx;
  border-radius: 8rpx;
  background: #6a96ef;
}

.bubble-art {
  position: absolute;
  right: 24rpx;
  bottom: 44rpx;
  width: 44rpx;
  height: 28rpx;
  border-radius: 8rpx;
  background: #6a96ef;
}

.bubble-art::before {
  top: 11rpx;
  left: 9rpx;
  width: 5rpx;
  height: 5rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 10rpx 0 0 #fff, 20rpx 0 0 #fff;
}

.activity-copy {
  min-width: 0;
  flex: 1;
}

.activity-title {
  display: block;
  margin-bottom: 18rpx;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.25;
}

.meta-row {
  gap: 12rpx;
  color: #405272;
  font-size: 24rpx;
  line-height: 1.4;
}

.meta-row + .meta-row {
  margin-top: 10rpx;
}

.tiny-icon {
  position: relative;
  width: 24rpx;
  height: 24rpx;
  flex: 0 0 auto;
  color: #60708d;
}

.tiny-icon--calendar::before {
  inset: 3rpx 2rpx 2rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.tiny-icon--calendar::after {
  top: 8rpx;
  left: 5rpx;
  width: 14rpx;
  height: 3rpx;
  background: currentColor;
}

.tiny-icon--video::before {
  inset: 5rpx 6rpx 5rpx 1rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.tiny-icon--video::after {
  right: 1rpx;
  top: 8rpx;
  width: 8rpx;
  height: 8rpx;
  background: currentColor;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}

.tiny-icon--room::before {
  inset: 5rpx 3rpx 2rpx;
  border: 3rpx solid currentColor;
  border-top: 0;
}

.tiny-icon--room::after {
  top: 2rpx;
  left: 4rpx;
  width: 16rpx;
  height: 12rpx;
  border-top: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
  transform: rotate(45deg);
}

.contribution-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  margin-top: 22rpx;
}

.contribution-item {
  display: grid;
  min-height: 120rpx;
  grid-template-columns: 52rpx minmax(0, 1fr) 86rpx;
  align-items: center;
  gap: 18rpx;
  margin: 0;
  padding: 16rpx;
  border: 1rpx solid #e8edf4;
  border-radius: 14rpx;
  background: #fff;
  color: inherit;
  text-align: left;
}

.contribution-item::after,
.file-item::after {
  display: none;
}

.index-badge {
  display: flex;
  width: 50rpx;
  height: 50rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e6f0ff;
  color: #1975ef;
  font-size: 30rpx;
  font-weight: 900;
}

.index-badge--orange {
  background: #fff0d9;
  color: #ff9c18;
}

.contribution-copy {
  min-width: 0;
}

.contribution-title-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.contribution-title {
  overflow: hidden;
  color: #10172d;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.extra-chip {
  padding: 5rpx 10rpx;
  border-radius: 8rpx;
  background: #fff0dd;
  color: #ff8c18;
  font-size: 20rpx;
  font-weight: 900;
  white-space: nowrap;
}

.contribution-desc,
.source-line {
  display: block;
  margin-top: 8rpx;
  color: #405272;
  font-size: 22rpx;
  line-height: 1.35;
}

.source-line {
  color: #1975ef;
  font-weight: 700;
}

.item-side {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 14rpx;
}

.confirm-chip {
  padding: 7rpx 13rpx;
  border-radius: 8rpx;
  background: #e9faef;
  color: #11ad5f;
  font-size: 21rpx;
  font-weight: 900;
  white-space: nowrap;
}

.doc-icon {
  position: relative;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background: #eff6ff;
  color: #1975ef;
}

.doc-icon::before {
  top: 9rpx;
  left: 13rpx;
  width: 15rpx;
  height: 20rpx;
  border: 3rpx solid currentColor;
  border-radius: 2rpx;
}

.doc-icon::after {
  top: 17rpx;
  left: 17rpx;
  width: 10rpx;
  height: 3rpx;
  background: currentColor;
  box-shadow: 0 7rpx 0 currentColor;
}

.file-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12rpx;
  margin-top: 22rpx;
}

.file-item {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 18rpx;
  margin: 0;
  padding: 16rpx;
  border: 1rpx solid #e8edf4;
  border-radius: 14rpx;
  background: #fff;
  color: inherit;
  text-align: left;
}

.file-icon {
  position: relative;
  display: flex;
  width: 50rpx;
  height: 58rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border-radius: 8rpx;
  color: #fff;
  font-size: 24rpx;
  font-weight: 900;
}

.file-icon--pdf {
  background: #ff5f62;
}

.file-icon--doc {
  background: #4b83ef;
}

.file-icon--xls {
  background: #35bf84;
}

.file-icon::before {
  top: 0;
  right: 0;
  width: 17rpx;
  height: 17rpx;
  background: rgba(255, 255, 255, 0.42);
  clip-path: polygon(0 0, 100% 100%, 100% 0);
}

.file-icon--pdf::after {
  position: absolute;
  top: 23rpx;
  left: 10rpx;
  width: 30rpx;
  height: 14rpx;
  border-bottom: 4rpx solid #fff;
  border-left: 4rpx solid #fff;
  border-radius: 50%;
  transform: rotate(-25deg);
  content: '';
}

.file-copy {
  min-width: 0;
}

.file-name,
.file-size {
  display: block;
}

.file-name {
  overflow: hidden;
  color: #10172d;
  font-size: 24rpx;
  font-weight: 800;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  margin-top: 10rpx;
  color: #405272;
  font-size: 22rpx;
}

.timeline {
  margin-top: 28rpx;
}

.timeline :deep(.wd-step__title) {
  margin-top: 18rpx;
  color: #44516a;
  font-size: 22rpx;
  font-weight: 700;
  line-height: 1.2;
}

.timeline :deep(.wd-step__description) {
  margin-top: 10rpx;
  color: #62708a;
  font-size: 20rpx;
  line-height: 1.2;
}

.timeline :deep(.wd-step.is-process .wd-step__title),
.timeline :deep(.wd-step.is-process .wd-step__description) {
  color: #1675f2;
  font-weight: 900;
}

.timeline :deep(.wd-step__icon) {
  color: #1d77f2;
}

.archive-tip {
  display: flex;
  align-items: center;
  gap: 14rpx;
  margin: 28rpx -24rpx -24rpx;
  padding: 16rpx 24rpx;
  background: #f2f5f8;
  color: #596579;
  font-size: 22rpx;
  line-height: 1.45;
}

.info-icon {
  position: relative;
  width: 28rpx;
  height: 28rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #aab3c2;
}

.info-icon::before {
  top: 8rpx;
  left: 13rpx;
  width: 4rpx;
  height: 13rpx;
  border-radius: 4rpx;
  background: #fff;
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 30;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 28rpx;
  padding: 22rpx 28rpx calc(28rpx + env(safe-area-inset-bottom));
  border-top: 1rpx solid rgba(220, 226, 235, 0.9);
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(14rpx);
}

.action-button {
  height: 68rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
}

.outline-action {
  border-color: #2177f2;
  color: #1975ef;
}

.primary-action {
  background: linear-gradient(135deg, #2b81ff, #126fed);
}

@media (max-width: 390px) {
  .hero-section {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .hero-art {
    width: 138rpx;
  }

  .hero-title {
    font-size: 34rpx;
  }

  .hero-desc {
    font-size: 25rpx;
  }

  .activity-body {
    gap: 20rpx;
  }

  .activity-art {
    width: 156rpx;
    height: 122rpx;
  }

  .contribution-item {
    grid-template-columns: 46rpx minmax(0, 1fr) 74rpx;
    gap: 12rpx;
    padding: 14rpx 12rpx;
  }

  .index-badge {
    width: 44rpx;
    height: 44rpx;
    font-size: 26rpx;
  }

  .contribution-title {
    font-size: 23rpx;
  }

  .contribution-desc,
  .source-line,
  .file-name,
  .file-size,
  .archive-tip {
    font-size: 20rpx;
  }

  .confirm-chip {
    font-size: 19rpx;
  }

  .fixed-actions {
    gap: 18rpx;
    padding-right: 24rpx;
    padding-left: 24rpx;
  }
}

@media (max-width: 374px) {
  .hero-art {
    display: none;
  }

  .activity-body {
    align-items: flex-start;
  }

  .activity-art {
    width: 128rpx;
  }

  .file-grid {
    gap: 10rpx;
  }

  .file-item {
    gap: 10rpx;
    padding: 12rpx;
  }

  .action-button {
    font-size: 25rpx;
  }
}
</style>
