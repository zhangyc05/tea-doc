<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const contributions = [
  {
    index: 1,
    title: '提供企业设备调试案例素材',
    source: '阶段材料、会议纪要',
    desc: '你提交的案例素材被用于课程案例共创讨论。',
  },
  {
    index: 2,
    title: '补充设备故障诊断教学建议',
    source: '发言摘录、会议纪要',
    desc: '你补充了设备故障诊断与调试环节的教学应用建议。',
  },
]

const files = [
  { name: '会议纪要.pdf', meta: 'PDF · 2.1MB', type: 'pdf' },
  { name: '企业设备调试案例素材.pdf', meta: 'PDF · 3.2MB', type: 'pdf' },
  { name: '阶段任务分工记录.docx', meta: 'DOCX · 580KB', type: 'docx' },
]

const destinations = [
  { title: '教研记录详情', desc: '查看活动全过程记录', type: 'record' },
  { title: '个人贡献详情', desc: '查看你的贡献与依据', type: 'person' },
  { title: '成长档案', desc: '教研科研维度事实', type: 'archive' },
]

function goBack() {
  uni.navigateBack()
}

function showSubmittedFileFeedback(name: string) {
  uni.showToast({
    title: `关联材料预览为本地模拟：${name}`,
    icon: 'none',
  })
}

function goResearchRoom() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-room/index' })
}

function goContributionDetail() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-contribution-detail/index' })
}
</script>

<template>
  <view class="submitted-page">
    <MobileNavbar title="贡献确认已提交" size="compact" @back="goBack">
      <template #right>
        <text class="nav-status">等待归档</text>
      </template>
    </MobileNavbar>

    <view class="content">
      <view class="success-hero">
        <view class="confetti confetti--one"></view>
        <view class="confetti confetti--two"></view>
        <view class="confetti confetti--three"></view>
        <view class="success-mark"></view>
        <text class="success-title">你确认的个人贡献已提交</text>
        <text class="success-desc">当前等待教研活动归档，归档后将形成教研活动记录并进入成长档案。</text>
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
            <view class="chat-art"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card confirmed-card">
        <view class="section-head section-head--between">
          <view class="section-head-left">
            <view class="head-icon head-icon--confirm"></view>
            <text class="section-title">已确认的个人贡献</text>
          </view>
          <text class="submitted-chip">已提交 2 项</text>
        </view>
        <view class="contribution-list">
          <view v-for="item in contributions" :key="item.index" class="contribution-item">
            <text class="index-badge">{{ item.index }}</text>
            <view class="contribution-copy">
              <text class="contribution-title">{{ item.title }}</text>
              <text class="source-pill">来源：{{ item.source }}</text>
              <text class="contribution-desc">{{ item.desc }}</text>
            </view>
            <view class="check-outline"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <view class="section-head">
          <view class="head-icon head-icon--folder"></view>
          <text class="section-title">关联材料（已归集）</text>
        </view>
        <view class="file-list">
          <button v-for="file in files" :key="file.name" class="file-row" @tap="showSubmittedFileFeedback(file.name)">
            <view class="file-type" :class="`file-type--${file.type}`">
              <text>{{ file.type === 'docx' ? 'DOC' : 'PDF' }}</text>
            </view>
            <view class="file-copy">
              <text class="file-name">{{ file.name }}</text>
              <text class="file-meta">{{ file.meta }}</text>
            </view>
            <view class="row-arrow"></view>
          </button>
        </view>
      </MobileCard>

      <MobileCard class="status-card">
        <view class="section-head">
          <view class="head-icon head-icon--clock"></view>
          <text class="section-title">当前状态</text>
        </view>
        <view class="status-body">
          <view class="hourglass-icon"></view>
          <view class="status-copy">
            <text class="status-title">个人贡献已确认，等待教研活动归档</text>
            <text class="status-desc">教研活动归档后，你的个人贡献将作为教研活动记录，并进入成长档案（教研科研维度）。</text>
          </view>
          <view class="folder-art"></view>
        </view>
      </MobileCard>

      <MobileCard class="destination-card">
        <view class="section-head">
          <view class="head-icon head-icon--eye"></view>
          <text class="section-title">归档后可查看</text>
        </view>
        <view class="destination-grid">
          <view v-for="item in destinations" :key="item.title" class="destination-item">
            <view class="destination-icon" :class="`destination-icon--${item.type}`"></view>
            <view>
              <text class="destination-title">{{ item.title }}</text>
              <text class="destination-desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>
      </MobileCard>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="action-button outline-button" variant="outline" @tap="goResearchRoom">
        返回教研室
      </MobileActionButton>
      <MobileActionButton class="action-button primary-button" variant="primary" @tap="goContributionDetail">
        查看提交内容
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.submitted-page {
  min-height: 100vh;
  padding-bottom: calc(170rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 83% 6%, rgba(231, 246, 255, 0.8), transparent 28%),
    linear-gradient(180deg, #ffffff 0%, #fbfdff 44%, #f8fbfa 100%);
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
  gap: 22rpx;
  padding: 0 28rpx;
}

.success-hero {
  position: relative;
  display: flex;
  min-height: 240rpx;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 18rpx 10rpx 8rpx;
  text-align: center;
}

.success-mark,
.confetti,
.section-head,
.section-head-left,
.head-icon,
.tiny-icon,
.activity-art,
.screen-art,
.person-art,
.chat-art,
.index-badge,
.check-outline,
.file-type,
.row-arrow,
.hourglass-icon,
.folder-art,
.destination-icon {
  position: relative;
  flex: 0 0 auto;
}

.success-mark {
  width: 86rpx;
  height: 86rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #16c973, #09a85b);
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
.check-outline::before,
.file-type::before,
.row-arrow::before,
.hourglass-icon::before,
.folder-art::before,
.folder-art::after,
.destination-icon::before,
.destination-icon::after {
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
  background: #2d7cf7;
  transform: rotate(45deg);
}

.confetti::before,
.confetti::after {
  width: 8rpx;
  height: 8rpx;
  background: #11b966;
}

.confetti--one {
  left: 30%;
  top: 38rpx;
}

.confetti--one::before {
  left: -78rpx;
  top: 36rpx;
}

.confetti--one::after {
  right: -178rpx;
  top: 42rpx;
  background: #f3aa18;
}

.confetti--two {
  right: 39%;
  top: 32rpx;
  background: #52b86a;
}

.confetti--two::before {
  right: -90rpx;
  top: 28rpx;
  background: #2794aa;
}

.confetti--two::after {
  left: -220rpx;
  top: 54rpx;
  background: #78b26b;
}

.confetti--three {
  left: 46%;
  top: 68rpx;
  width: 5rpx;
  height: 5rpx;
  background: #bfe9d0;
}

.success-title {
  display: block;
  margin-top: 28rpx;
  color: #050812;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.2;
}

.success-desc {
  display: block;
  margin-top: 18rpx;
  color: #30466e;
  font-size: 29rpx;
  line-height: 1.42;
}

.activity-card,
.section-card,
.status-card,
.destination-card {
  border-radius: 24rpx;
}

.activity-card {
  padding: 30rpx 34rpx;
  background: linear-gradient(110deg, #f8fbff 0%, #ffffff 100%);
}

.section-card,
.status-card,
.destination-card {
  padding: 28rpx 30rpx;
}

.confirmed-card {
  background: linear-gradient(110deg, #eefbf5 0%, #f6fffb 100%);
}

.section-head,
.section-head-left {
  display: flex;
  align-items: center;
  gap: 18rpx;
}

.section-head--between {
  justify-content: space-between;
  gap: 18rpx;
}

.section-title,
.activity-title,
.meta-row,
.contribution-title,
.source-pill,
.contribution-desc,
.file-name,
.file-meta,
.status-title,
.status-desc,
.destination-title,
.destination-desc {
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

.head-icon--confirm {
  background: #e8fbf0;
  color: #0fb463;
}

.head-icon--folder {
  background: #f0eaff;
  color: #7b4df4;
}

.head-icon--clock {
  background: #fff4d8;
  color: #f6a400;
}

.head-icon--eye {
  background: #e9f1ff;
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

.head-icon--confirm::after {
  left: 15rpx;
  top: 15rpx;
  width: 14rpx;
  height: 8rpx;
  border-bottom: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
  transform: rotate(-45deg);
}

.head-icon--folder::before {
  top: 16rpx;
  bottom: 9rpx;
}

.head-icon--folder::after {
  left: 10rpx;
  top: 11rpx;
  width: 20rpx;
  height: 9rpx;
  border-radius: 6rpx 6rpx 0 0;
  background: currentColor;
}

.head-icon--clock::before {
  inset: 8rpx;
  border-radius: 50%;
}

.head-icon--clock::after {
  left: 20rpx;
  top: 13rpx;
  width: 10rpx;
  height: 11rpx;
  border-bottom: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
}

.head-icon--eye::before {
  left: 6rpx;
  right: 6rpx;
  top: 14rpx;
  height: 14rpx;
  border-radius: 50%;
}

.head-icon--eye::after {
  left: 17rpx;
  top: 17rpx;
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: currentColor;
}

.activity-body {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-top: 24rpx;
}

.activity-copy {
  min-width: 0;
  flex: 1;
}

.activity-title {
  color: #070d1d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 18rpx;
  margin-top: 18rpx;
  color: #111827;
  font-size: 27rpx;
  line-height: 1.28;
}

.tiny-icon {
  width: 28rpx;
  height: 28rpx;
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
  left: 28rpx;
  top: 20rpx;
  width: 34rpx;
  height: 20rpx;
  border-bottom: 9rpx solid #78a6f5;
  border-left: 9rpx solid #78a6f5;
  transform: rotate(-45deg);
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
  right: 0;
  bottom: 32rpx;
  width: 56rpx;
  height: 40rpx;
  border-radius: 10rpx;
  background: #2d7cf7;
}

.chat-art::before {
  left: 13rpx;
  top: 18rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 14rpx 0 0 #fff, 28rpx 0 0 #fff;
}

.submitted-chip {
  flex: 0 0 auto;
  padding: 9rpx 18rpx;
  border-radius: 10rpx;
  background: #e5fbef;
  color: #06934f;
  font-size: 25rpx;
  font-weight: 900;
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
  gap: 18rpx;
  padding: 20rpx;
  border-radius: 14rpx;
  background: #fff;
}

.index-badge {
  display: flex;
  width: 36rpx;
  height: 36rpx;
  align-items: center;
  justify-content: center;
  border-radius: 8rpx;
  background: #dff8eb;
  color: #07a85a;
  font-size: 24rpx;
  font-weight: 900;
}

.contribution-copy {
  min-width: 0;
  flex: 1;
}

.contribution-title {
  color: #111827;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.25;
}

.source-pill {
  width: fit-content;
  max-width: 100%;
  margin-top: 12rpx;
  padding: 6rpx 15rpx;
  border-radius: 8rpx;
  background: #f0f4fb;
  color: #4a5875;
  font-size: 24rpx;
  line-height: 1.2;
}

.contribution-desc {
  margin-top: 12rpx;
  color: #30466e;
  font-size: 26rpx;
  line-height: 1.38;
}

.check-outline {
  width: 34rpx;
  height: 34rpx;
  margin-top: 44rpx;
  border: 4rpx solid #0fb463;
  border-radius: 50%;
}

.check-outline::before {
  left: 8rpx;
  top: 8rpx;
  width: 14rpx;
  height: 8rpx;
  border-bottom: 4rpx solid #0fb463;
  border-left: 4rpx solid #0fb463;
  transform: rotate(-45deg);
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  margin-top: 22rpx;
}

.file-row {
  display: flex;
  min-height: 72rpx;
  align-items: center;
  gap: 18rpx;
  margin: 0;
  padding: 0 18rpx;
  border: 1rpx solid #e8edf4;
  border-radius: 12rpx;
  background: #fcfdff;
  text-align: left;
}

.file-row::after {
  display: none;
}

.file-type {
  display: flex;
  width: 38rpx;
  height: 44rpx;
  align-items: center;
  justify-content: center;
  border-radius: 6rpx;
  background: #f43f3f;
  color: #fff;
  font-size: 13rpx;
  font-weight: 900;
  line-height: 1;
}

.file-type--docx {
  background: #2d7cf7;
}

.file-type::before {
  right: 0;
  top: 0;
  border-top: 12rpx solid rgba(255, 255, 255, 0.48);
  border-left: 12rpx solid transparent;
}

.file-copy {
  min-width: 0;
  flex: 1;
}

.file-name {
  color: #111827;
  font-size: 27rpx;
  font-weight: 800;
  line-height: 1.2;
}

.file-meta {
  margin-top: 7rpx;
  color: #4a5875;
  font-size: 23rpx;
  line-height: 1.15;
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

.status-card {
  background: linear-gradient(115deg, #fffaf0 0%, #fffefb 100%);
}

.status-body {
  display: flex;
  align-items: center;
  gap: 22rpx;
  margin-top: 22rpx;
  padding: 22rpx;
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.72);
}

.hourglass-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: #fff1c7;
  color: #f6a400;
}

.hourglass-icon::before {
  left: 23rpx;
  top: 17rpx;
  width: 19rpx;
  height: 30rpx;
  border: 5rpx solid currentColor;
  border-top-width: 6rpx;
  border-bottom-width: 6rpx;
  clip-path: polygon(0 0, 100% 0, 64% 50%, 100% 100%, 0 100%, 36% 50%);
}

.status-copy {
  min-width: 0;
  flex: 1;
}

.status-title {
  color: #111827;
  font-size: 27rpx;
  font-weight: 900;
  line-height: 1.25;
}

.status-desc {
  margin-top: 14rpx;
  color: #30466e;
  font-size: 25rpx;
  line-height: 1.46;
}

.folder-art {
  width: 116rpx;
  height: 88rpx;
}

.folder-art::before {
  left: 20rpx;
  bottom: 5rpx;
  width: 88rpx;
  height: 48rpx;
  border-radius: 8rpx;
  background: #75a9fa;
}

.folder-art::after {
  left: 31rpx;
  top: 8rpx;
  width: 64rpx;
  height: 64rpx;
  background: #eaf2ff;
  clip-path: polygon(0 0, 76% 0, 100% 24%, 100% 100%, 0 100%);
}

.destination-card {
  background: linear-gradient(115deg, #f2f8ff 0%, #fbfdff 100%);
}

.destination-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16rpx;
  margin-top: 22rpx;
}

.destination-item {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 14rpx;
  padding: 18rpx;
  border-radius: 14rpx;
  background: #fff;
}

.destination-icon {
  width: 46rpx;
  height: 46rpx;
  border-radius: 10rpx;
  background: #eaf2ff;
  color: #2d7cf7;
}

.destination-icon--person {
  background: #e8fbf0;
  color: #0fb463;
}

.destination-icon--archive {
  background: #f0eaff;
  color: #7b4df4;
}

.destination-icon::before {
  inset: 12rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.destination-icon--person::before {
  top: 8rpx;
  left: 17rpx;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
}

.destination-icon--person::after {
  right: 10rpx;
  bottom: 8rpx;
  left: 10rpx;
  height: 14rpx;
  border: 4rpx solid currentColor;
  border-radius: 18rpx 18rpx 6rpx 6rpx;
}

.destination-icon--archive::before {
  top: 18rpx;
  bottom: 10rpx;
}

.destination-icon--archive::after {
  left: 12rpx;
  top: 13rpx;
  width: 20rpx;
  height: 9rpx;
  border-radius: 5rpx 5rpx 0 0;
  background: currentColor;
}

.destination-title {
  color: #111827;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.2;
}

.destination-desc {
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
  gap: 20rpx;
  padding: 20rpx 42rpx 30rpx;
  background: rgba(255, 255, 255, 0.95);
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
  .submitted-page {
    padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
  }

  .content {
    gap: 14rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .success-hero {
    min-height: 184rpx;
    padding-top: 8rpx;
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
    border-width: 7rpx;
    border-top: 0;
    border-right: 0;
  }

  .success-title {
    margin-top: 18rpx;
    font-size: 28rpx;
  }

  .success-desc {
    margin-top: 12rpx;
    font-size: 22rpx;
  }

  .activity-card,
  .section-card,
  .status-card,
  .destination-card {
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
    font-size: 26rpx;
  }

  .meta-row {
    gap: 10rpx;
    margin-top: 12rpx;
    font-size: 21rpx;
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

  .submitted-chip {
    padding: 7rpx 12rpx;
    font-size: 20rpx;
  }

  .contribution-list,
  .file-list,
  .destination-grid {
    margin-top: 14rpx;
  }

  .contribution-item {
    gap: 12rpx;
    padding: 14rpx;
  }

  .index-badge {
    width: 30rpx;
    height: 30rpx;
    font-size: 20rpx;
  }

  .contribution-title,
  .file-name,
  .status-title {
    font-size: 22rpx;
  }

  .source-pill,
  .contribution-desc,
  .status-desc {
    font-size: 20rpx;
  }

  .check-outline {
    width: 27rpx;
    height: 27rpx;
  }

  .file-row {
    min-height: 58rpx;
    padding: 0 12rpx;
  }

  .file-meta {
    font-size: 19rpx;
  }

  .status-body {
    gap: 14rpx;
    margin-top: 14rpx;
    padding: 14rpx;
  }

  .hourglass-icon {
    width: 48rpx;
    height: 48rpx;
  }

  .folder-art {
    width: 82rpx;
    height: 64rpx;
  }

  .destination-grid {
    gap: 10rpx;
  }

  .destination-item {
    gap: 8rpx;
    padding: 12rpx;
  }

  .destination-icon {
    width: 36rpx;
    height: 36rpx;
  }

  .destination-title {
    font-size: 20rpx;
  }

  .destination-desc {
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
  .status-body {
    align-items: flex-start;
  }

  .activity-art,
  .folder-art {
    display: none;
  }

  .destination-grid {
    grid-template-columns: 1fr;
  }

  .fixed-actions {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }
}
</style>
