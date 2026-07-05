<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { submitVirtualResearchArchive } from '../../../domain/virtualResearch'

submitVirtualResearchArchive()

const activityMeta = [
  { icon: 'doc', label: '活动名称：', value: '智能制造课程资源共建研讨' },
  { icon: 'calendar', label: '时间：', value: '2026-05-22 14:00-16:30' },
  { icon: 'video', label: '会议来源：', value: '腾讯会议' },
  { icon: 'room', label: '所属教研室：', value: '智能制造课程虚拟教研室' },
]

const contributions = [
  {
    icon: 'case',
    title: '设备调试案例整理',
    source: '会议纪要、任务分工',
  },
  {
    icon: 'speech',
    title: '发言与案例补充',
    source: '发言摘录、会议纪要',
  },
]

const materials = [
  { icon: 'file', name: '会议纪要', status: '已归档' },
  { icon: 'people', name: '任务分工', status: '已归档' },
  { icon: 'folder', name: '阶段材料', status: '已归档 1 份' },
  { icon: 'star', name: '个人贡献', status: '已确认 2 项' },
]

function goBack() {
  uni.navigateBack()
}

function showContributionFeedback(title: string) {
  uni.showToast({
    title: `贡献详情为本地模拟：${title}`,
    icon: 'none',
  })
}

function showMaterialFeedback(name: string) {
  uni.showToast({
    title: `归档材料预览为本地模拟：${name}`,
    icon: 'none',
  })
}

function goArchiveRecord() {
  uni.navigateTo({
    url: '/pages/archive/record-detail/index?recordId=virtual-research-course-resource-coconstruction',
  })
}

function goResearchRoom() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-room/index' })
}
</script>

<template>
  <view class="archive-v1-page">
    <MobileNavbar title="教研活动" size="compact" @back="goBack" />

    <view class="subtitle">查看教研活动归档结果与个人贡献记录</view>

    <view class="content">
      <MobileCard class="hero-card">
        <view class="hero-illustration">
          <view class="spark spark--left"></view>
          <view class="spark spark--right"></view>
          <view class="clipboard">
            <view class="clipboard-clip"></view>
            <view class="clipboard-check"></view>
          </view>
          <view class="shadow"></view>
        </view>
        <view class="hero-copy">
          <view class="hero-title-row">
            <text class="hero-title">教研活动已归档</text>
            <text class="status-chip">已归档</text>
          </view>
          <text class="hero-desc">本次教研活动已完成归档，你的个人贡献已确认。</text>
        </view>
      </MobileCard>

      <MobileCard class="section-card activity-card">
        <text class="section-title">本次教研活动</text>
        <view class="activity-main">
          <view class="activity-art">
            <view class="board"></view>
            <view class="person person--left"></view>
            <view class="person person--right"></view>
          </view>
          <view class="activity-meta">
            <view v-for="item in activityMeta" :key="item.label" class="meta-row">
              <view class="meta-icon" :class="`meta-icon--${item.icon}`"></view>
              <text class="meta-label">{{ item.label }}</text>
              <text class="meta-value">{{ item.value }}</text>
            </view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <text class="section-title">已确认贡献</text>
        <view class="contribution-list">
          <button
            v-for="item in contributions"
            :key="item.title"
            class="contribution-row"
            @tap="showContributionFeedback(item.title)"
          >
            <view class="contribution-icon" :class="`contribution-icon--${item.icon}`"></view>
            <view class="contribution-copy">
              <text class="contribution-title">{{ item.title }}</text>
              <text class="contribution-source">来源：{{ item.source }}</text>
            </view>
            <wd-icon name="chevron-right" size="24rpx" color="#7b8495" />
          </button>
        </view>
      </MobileCard>

      <MobileCard class="section-card material-card">
        <text class="section-title">归档材料</text>
        <view class="material-list">
          <button
            v-for="item in materials"
            :key="item.name"
            class="material-row"
            @tap="showMaterialFeedback(item.name)"
          >
            <view class="material-icon" :class="`material-icon--${item.icon}`"></view>
            <text class="material-name">{{ item.name }}</text>
            <text class="material-status">{{ item.status }}</text>
            <wd-icon name="chevron-right" size="24rpx" color="#7b8495" />
          </button>
        </view>
      </MobileCard>

      <MobileCard class="section-card destination-card">
        <text class="section-title">归档去向</text>
        <view class="destination-row">
          <view class="cloud-icon"></view>
          <view class="destination-copy">
            <text class="destination-title">已形成教研活动记录</text>
            <text class="destination-desc">已进入档案待确认，对齐 archiveStore.processingRecords，管理端确认后写入成长档案</text>
          </view>
        </view>
      </MobileCard>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="footer-button" variant="outline" @tap="goResearchRoom">
        返回教研室
      </MobileActionButton>
      <MobileActionButton class="footer-button" variant="primary" @tap="goArchiveRecord">
        查看教研记录
      </MobileActionButton>
    </view>

    <MobileTabBar active="assistant" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.archive-v1-page {
  min-height: 100vh;
  padding-bottom: calc(286rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 46%, #f7fbfa 100%);
  color: #080f24;
}

.subtitle {
  margin: -4rpx 52rpx 24rpx 128rpx;
  color: #1d3d72;
  font-size: 31rpx;
  line-height: 1.25;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 0 50rpx;
}

.hero-card,
.section-card {
  border-radius: 24rpx;
  box-shadow: 0 12rpx 34rpx rgba(17, 34, 68, 0.06);
}

.hero-card {
  display: flex;
  min-height: 186rpx;
  align-items: center;
  gap: 34rpx;
  padding: 28rpx 38rpx;
}

.hero-illustration {
  position: relative;
  width: 200rpx;
  height: 140rpx;
  flex: 0 0 auto;
}

.clipboard,
.clipboard-clip,
.clipboard-check,
.shadow,
.spark,
.activity-art,
.board,
.person,
.meta-icon,
.contribution-icon,
.material-icon,
.row-arrow,
.cloud-icon {
  position: relative;
  flex: 0 0 auto;
}

.clipboard {
  position: absolute;
  left: 48rpx;
  top: 20rpx;
  width: 104rpx;
  height: 108rpx;
  border-radius: 22rpx;
  background: linear-gradient(145deg, #43d98d, #05b960);
  box-shadow: 0 18rpx 34rpx rgba(10, 184, 96, 0.26);
}

.clipboard::before,
.clipboard-check::before,
.clipboard-clip::before,
.shadow::before,
.spark::before,
.spark::after,
.board::before,
.board::after,
.person::before,
.person::after,
.meta-icon::before,
.meta-icon::after,
.contribution-icon::before,
.contribution-icon::after,
.material-icon::before,
.material-icon::after,
.row-arrow::before,
.cloud-icon::before,
.cloud-icon::after {
  position: absolute;
  content: '';
}

.clipboard-clip {
  position: absolute;
  left: 25rpx;
  top: -16rpx;
  width: 58rpx;
  height: 30rpx;
  border: 8rpx solid #ffffff;
  border-bottom: 0;
  border-radius: 14rpx 14rpx 4rpx 4rpx;
  background: #17c76f;
}

.clipboard-check {
  position: absolute;
  left: 30rpx;
  top: 48rpx;
  width: 47rpx;
  height: 26rpx;
  border-bottom: 12rpx solid #fff;
  border-left: 12rpx solid #fff;
  transform: rotate(-45deg);
}

.shadow {
  position: absolute;
  left: 28rpx;
  right: 28rpx;
  bottom: 4rpx;
  height: 34rpx;
  border-radius: 50%;
  background: rgba(36, 195, 107, 0.18);
}

.spark {
  position: absolute;
  width: 14rpx;
  height: 14rpx;
  background: #8ae2b4;
  transform: rotate(45deg);
}

.spark--left {
  left: 10rpx;
  top: 20rpx;
}

.spark--left::before {
  left: 8rpx;
  top: 58rpx;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #8fe3bb;
}

.spark--right {
  right: 16rpx;
  top: 16rpx;
}

.spark--right::before {
  left: -2rpx;
  top: 56rpx;
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #97e0b6;
}

.spark--right::after {
  right: 0;
  top: 96rpx;
  width: 9rpx;
  height: 9rpx;
  background: #8ae2b4;
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.hero-title-row {
  display: flex;
  align-items: center;
  gap: 18rpx;
}

.hero-title {
  color: #070d1d;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.2;
}

.status-chip {
  padding: 6rpx 18rpx;
  border-radius: 999rpx;
  background: #e5fbef;
  color: #08a658;
  font-size: 25rpx;
  font-weight: 900;
  white-space: nowrap;
}

.hero-desc {
  display: block;
  margin-top: 26rpx;
  color: #183569;
  font-size: 29rpx;
  line-height: 1.42;
}

.section-card {
  padding: 30rpx;
}

.section-title {
  display: block;
  color: #070d1d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.activity-main {
  display: flex;
  align-items: center;
  gap: 52rpx;
  margin-top: 24rpx;
}

.activity-art {
  width: 160rpx;
  height: 158rpx;
  border-radius: 18rpx;
  background: linear-gradient(140deg, #e9fbf3, #f5fffb);
}

.board {
  position: absolute;
  right: 26rpx;
  top: 30rpx;
  width: 78rpx;
  height: 62rpx;
  border-radius: 10rpx;
  background: linear-gradient(135deg, #43d98d, #0ebf68);
}

.board::before {
  left: 20rpx;
  top: 16rpx;
  width: 26rpx;
  height: 26rpx;
  background: rgba(255, 255, 255, 0.36);
  clip-path: polygon(50% 0, 63% 35%, 100% 35%, 70% 56%, 81% 94%, 50% 70%, 19% 94%, 30% 56%, 0 35%, 37% 35%);
}

.board::after {
  right: 12rpx;
  top: 16rpx;
  width: 22rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #fff;
  box-shadow: 0 18rpx 0 rgba(255, 255, 255, 0.8);
}

.person {
  position: absolute;
  bottom: 34rpx;
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  background: #24c56f;
}

.person--left {
  left: 28rpx;
}

.person--right {
  right: 32rpx;
}

.person::after {
  left: -15rpx;
  top: 36rpx;
  width: 64rpx;
  height: 24rpx;
  border-radius: 28rpx 28rpx 6rpx 6rpx;
  background: currentColor;
  color: #24c56f;
}

.activity-meta {
  min-width: 0;
  flex: 1;
}

.meta-row {
  display: flex;
  min-width: 0;
  align-items: center;
  margin-top: 24rpx;
  color: #10172d;
  font-size: 29rpx;
  line-height: 1.25;
}

.meta-row:first-child {
  margin-top: 0;
}

.meta-icon {
  width: 30rpx;
  height: 30rpx;
  margin-right: 24rpx;
  color: #37517d;
}

.meta-icon::before {
  inset: 5rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.meta-icon--calendar::after {
  left: 9rpx;
  right: 9rpx;
  top: 1rpx;
  height: 9rpx;
  border-right: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
}

.meta-icon--video::after {
  right: 0;
  top: 10rpx;
  border-top: 5rpx solid transparent;
  border-bottom: 5rpx solid transparent;
  border-left: 9rpx solid currentColor;
}

.meta-icon--room::before {
  inset: 4rpx 6rpx 2rpx;
  border-radius: 3rpx 3rpx 0 0;
  clip-path: polygon(50% 0, 100% 35%, 100% 100%, 0 100%, 0 35%);
}

.meta-label {
  flex: 0 0 auto;
  font-weight: 900;
}

.meta-value {
  min-width: 0;
  color: #183569;
}

.contribution-list {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  margin-top: 22rpx;
}

.contribution-row,
.material-row {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  border: 0;
  text-align: left;
}

.contribution-row::after,
.material-row::after {
  display: none;
}

.contribution-row {
  gap: 26rpx;
  min-height: 88rpx;
  padding: 14rpx 22rpx;
  border-radius: 18rpx;
  background: linear-gradient(100deg, #f0fbf7, #f8fffc);
}

.contribution-icon,
.material-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.contribution-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 14rpx;
  background: #e5fbef;
  color: #0dbb65;
}

.contribution-icon--case::before {
  left: 16rpx;
  top: 14rpx;
  width: 32rpx;
  height: 34rpx;
  border-radius: 4rpx;
  background: currentColor;
}

.contribution-icon--case::after {
  left: 24rpx;
  top: 29rpx;
  width: 18rpx;
  height: 10rpx;
  border-bottom: 5rpx solid #fff;
  border-left: 5rpx solid #fff;
  transform: rotate(-45deg);
}

.contribution-icon--speech::before {
  left: 13rpx;
  top: 17rpx;
  width: 38rpx;
  height: 30rpx;
  border-radius: 12rpx;
  background: currentColor;
}

.contribution-icon--speech::after {
  left: 23rpx;
  top: 30rpx;
  width: 6rpx;
  height: 6rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 10rpx 0 0 #fff, 20rpx 0 0 #fff;
}

.contribution-copy {
  min-width: 0;
  flex: 1;
}

.contribution-title {
  display: block;
  color: #070d1d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.22;
}

.contribution-source {
  display: block;
  margin-top: 12rpx;
  color: #183569;
  font-size: 27rpx;
  line-height: 1.2;
}

.material-list {
  margin-top: 18rpx;
}

.material-row {
  min-height: 72rpx;
  padding: 12rpx 6rpx;
  border-bottom: 1rpx solid #e8edf5;
  border-radius: 0;
  background: transparent;
}

.material-row:last-child {
  border-bottom: 0;
}

.material-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 28rpx;
  border-radius: 7rpx;
  color: #fff;
}

.material-icon--file {
  background: #21c675;
}

.material-icon--people {
  background: #2f82f6;
  border-radius: 50%;
}

.material-icon--folder {
  background: #8556ee;
}

.material-icon--star {
  background: #ff910b;
}

.material-icon--file::before {
  left: 11rpx;
  top: 8rpx;
  width: 20rpx;
  height: 25rpx;
  border-radius: 3rpx;
  background: currentColor;
  color: #fff;
  box-shadow: inset 0 -7rpx 0 rgba(255, 255, 255, 0.28);
}

.material-icon--people::before {
  left: 9rpx;
  top: 9rpx;
  width: 13rpx;
  height: 13rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 11rpx 3rpx 0 #fff;
}

.material-icon--people::after {
  left: 5rpx;
  bottom: 7rpx;
  width: 27rpx;
  height: 12rpx;
  border-radius: 12rpx 12rpx 4rpx 4rpx;
  background: #fff;
}

.material-icon--folder::before {
  left: 6rpx;
  right: 5rpx;
  bottom: 7rpx;
  height: 23rpx;
  border-radius: 5rpx;
  background: #fff;
  opacity: 0.9;
}

.material-icon--folder::after {
  left: 8rpx;
  top: 9rpx;
  width: 19rpx;
  height: 9rpx;
  border-radius: 5rpx 5rpx 0 0;
  background: #fff;
}

.material-icon--star::before {
  inset: 8rpx;
  background: #fff;
  clip-path: polygon(50% 0, 62% 35%, 100% 36%, 69% 57%, 80% 94%, 50% 72%, 20% 94%, 31% 57%, 0 36%, 38% 35%);
}

.material-name {
  flex: 1;
  color: #070d1d;
  font-size: 29rpx;
  font-weight: 700;
}

.material-status {
  color: #06aa59;
  font-size: 28rpx;
  font-weight: 700;
  white-space: nowrap;
}

.row-arrow {
  width: 18rpx;
  height: 18rpx;
  margin-left: 18rpx;
  color: #8b94a7;
}

.row-arrow::before {
  inset: 0;
  border-top: 5rpx solid currentColor;
  border-right: 5rpx solid currentColor;
  transform: rotate(45deg);
}

.destination-row {
  display: flex;
  align-items: center;
  gap: 28rpx;
  margin-top: 24rpx;
}

.cloud-icon {
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  background: #e5fbef;
  color: #0fbd66;
}

.cloud-icon::before {
  left: 21rpx;
  top: 36rpx;
  width: 48rpx;
  height: 25rpx;
  border-radius: 24rpx;
  background: currentColor;
  box-shadow: 10rpx -9rpx 0 -2rpx currentColor, -2rpx -8rpx 0 -4rpx currentColor;
}

.cloud-icon::after {
  left: 41rpx;
  top: 31rpx;
  width: 0;
  height: 0;
  border-right: 8rpx solid transparent;
  border-bottom: 13rpx solid #fff;
  border-left: 8rpx solid transparent;
  box-shadow: 0 12rpx 0 -5rpx #fff;
}

.destination-copy {
  min-width: 0;
  flex: 1;
}

.destination-title {
  display: block;
  color: #070d1d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.2;
}

.destination-desc {
  display: block;
  margin-top: 12rpx;
  color: #183569;
  font-size: 26rpx;
  line-height: 1.35;
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: calc(158rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 45;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30rpx;
  padding: 18rpx 52rpx 22rpx;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(16rpx);
}

.footer-button {
  height: 78rpx;
  border-radius: 14rpx;
  font-size: 32rpx;
}

@media (max-width: 430px) {
  .archive-v1-page {
    padding-bottom: calc(270rpx + env(safe-area-inset-bottom));
  }

  .subtitle {
    margin: -4rpx 28rpx 18rpx 92rpx;
    font-size: 25rpx;
  }

  .content {
    gap: 16rpx;
    padding-right: 26rpx;
    padding-left: 26rpx;
  }

  .hero-card {
    min-height: 150rpx;
    gap: 20rpx;
    padding: 20rpx 24rpx;
  }

  .hero-illustration {
    width: 146rpx;
    height: 116rpx;
  }

  .clipboard {
    left: 38rpx;
    top: 22rpx;
    width: 78rpx;
    height: 78rpx;
    border-radius: 16rpx;
  }

  .clipboard-clip {
    left: 19rpx;
    top: -12rpx;
    width: 44rpx;
    height: 23rpx;
    border-width: 6rpx;
  }

  .clipboard-check {
    left: 23rpx;
    top: 36rpx;
    width: 36rpx;
    height: 20rpx;
    border-bottom-width: 9rpx;
    border-left-width: 9rpx;
  }

  .hero-title {
    font-size: 31rpx;
  }

  .status-chip {
    padding: 5rpx 14rpx;
    font-size: 21rpx;
  }

  .hero-desc {
    margin-top: 16rpx;
    font-size: 25rpx;
  }

  .section-card {
    padding: 22rpx;
  }

  .section-title {
    font-size: 30rpx;
  }

  .activity-main {
    gap: 28rpx;
    margin-top: 20rpx;
  }

  .activity-art {
    width: 128rpx;
    height: 128rpx;
  }

  .meta-row {
    margin-top: 16rpx;
    font-size: 24rpx;
  }

  .meta-icon {
    margin-right: 18rpx;
  }

  .contribution-row {
    gap: 18rpx;
    padding: 12rpx 18rpx;
  }

  .contribution-title {
    font-size: 27rpx;
  }

  .contribution-source {
    font-size: 24rpx;
  }

  .material-name,
  .material-status {
    font-size: 25rpx;
  }

  .fixed-actions {
    bottom: calc(154rpx + env(safe-area-inset-bottom));
    gap: 20rpx;
    padding: 16rpx 28rpx 18rpx;
  }

  .footer-button {
    height: 70rpx;
    font-size: 28rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .hero-card {
    gap: 14rpx;
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .hero-illustration {
    width: 124rpx;
  }

  .hero-title-row {
    gap: 10rpx;
  }

  .hero-title {
    font-size: 28rpx;
  }

  .status-chip {
    font-size: 19rpx;
  }

  .activity-main {
    align-items: flex-start;
  }

  .activity-art {
    width: 98rpx;
  }

  .meta-row {
    font-size: 22rpx;
  }

  .fixed-actions {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }
}
</style>
