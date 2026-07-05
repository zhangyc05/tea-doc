<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const practiceRows = [
  { label: '实践单位', value: '济南智能制造实训基地', type: 'building' },
  { label: '实践岗位/内容', value: '设备调试与产线观察', type: 'bag' },
  { label: '实践时间', value: '2026-03-01 至 2026-03-08', type: 'calendar' },
  { label: '计入天数', value: '8 天', type: 'clock' },
  { label: '确认时间', value: '2026-05-29 14:20', type: 'check' },
]

const confirmedItems = [
  { title: '基础信息', status: '已确认' },
  { title: '实践内容', status: '已确认' },
  { title: '实践收获', status: '已确认' },
  { title: '教学转化方向', status: '已确认' },
  { title: '证明材料', status: '已确认 1 份', arrow: true },
]

const followItems = [
  { title: '企业实践列表', desc: '查看已确认的实践记录', tone: 'green' },
  { title: '成长档案 · 企业实践维度', desc: '查看在成长档案中的记录', tone: 'blue' },
]

function goBack() {
  uni.navigateBack()
}

function goEnterpriseList() {
  uni.navigateTo({ url: '/pages/activity/enterprise-list/index' })
}

function goEnterpriseArchive() {
  uni.navigateTo({ url: '/pages/archive/record-detail/index?recordId=enterprise-practice-smart-equipment-archive' })
}

function goFollowItem(title: string) {
  if (title.includes('企业实践列表')) {
    goEnterpriseList()
    return
  }
  goEnterpriseArchive()
}
</script>

<template>
  <view class="history-confirmed-page">
    <MobileNavbar title="企业实践" size="regular" @back="goBack" />

    <view class="hero">
      <view class="success-art">
        <view class="success-check"></view>
        <view class="spark spark--one"></view>
        <view class="spark spark--two"></view>
      </view>
      <view class="hero-copy">
        <text class="hero-title">历史实践已确认</text>
        <text class="hero-desc">已计入 2026 年度企业实践记录</text>
        <text class="status-pill">已确认通过</text>
      </view>
      <view class="paper-art"></view>
    </view>

    <view class="content">
      <MobileCard class="practice-card">
        <text class="card-title">本次历史实践</text>
        <view class="practice-list">
          <view v-for="item in practiceRows" :key="item.label" class="practice-row">
            <view class="row-icon" :class="`row-icon--${item.type}`"></view>
            <text class="practice-label">{{ item.label }}</text>
            <text class="divider">|</text>
            <text class="practice-value">{{ item.value }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="confirmed-card">
        <text class="card-title">已确认内容</text>
        <view class="confirmed-list">
          <view v-for="item in confirmedItems" :key="item.title" class="confirmed-row">
            <view class="mini-check"></view>
            <text class="confirmed-title">{{ item.title }}</text>
            <text class="confirmed-status">{{ item.status }}</text>
            <view v-if="item.arrow" class="chevron"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="year-card">
        <text class="card-title">年度记录更新</text>
        <view class="year-body">
          <view class="ring-progress">
            <text class="ring-number">28</text>
            <text class="ring-total">/30</text>
            <text class="ring-unit">天</text>
          </view>
          <view class="year-copy">
            <text class="year-title">2026 年度企业实践</text>
            <text class="year-desc">已计入 28 / 30 天</text>
            <wd-progress class="progress-bar" :percentage="93" color="#08a85c" hide-text />
            <text class="year-tip">还差 2 天即可达成年度目标</text>
          </view>
          <view class="calendar-ok"></view>
        </view>
      </MobileCard>

      <MobileCard class="follow-card">
        <text class="card-title">后续可查看</text>
        <view class="follow-list">
          <view v-for="item in followItems" :key="item.title" class="follow-row" @tap="goFollowItem(item.title)">
            <view class="follow-icon" :class="`follow-icon--${item.tone}`"></view>
            <view class="follow-copy">
              <text class="follow-title">{{ item.title }}</text>
              <text class="follow-desc">{{ item.desc }}</text>
            </view>
            <wd-icon name="chevron-right" size="24rpx" color="#7b8495" />
          </view>
        </view>
      </MobileCard>
    </view>

    <view class="bottom-actions">
      <MobileActionButton class="action-button action-button--list" variant="outline" @tap="goEnterpriseList">
        返回实践列表
      </MobileActionButton>
      <MobileActionButton class="action-button" variant="primary" @tap="goEnterpriseArchive">
        查看企业实践档案
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.history-confirmed-page {
  min-height: 100vh;
  padding-bottom: calc(190rpx + env(safe-area-inset-bottom));
  background:
    linear-gradient(180deg, #edfff5 0, #f5fff9 310rpx, #f7f8fb 310rpx, #f7f8fb 100%);
  color: #10172d;
}

.hero {
  position: relative;
  display: flex;
  align-items: center;
  gap: 44rpx;
  min-height: 238rpx;
  padding: 34rpx 66rpx 42rpx;
  overflow: hidden;
}

.success-art {
  position: relative;
  width: 126rpx;
  height: 126rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: linear-gradient(135deg, #3bdb81, #08a85c);
  box-shadow: 0 34rpx 46rpx rgba(3, 177, 84, 0.18);
}

.success-art::after {
  position: absolute;
  right: -34rpx;
  bottom: -30rpx;
  left: -34rpx;
  height: 42rpx;
  border-radius: 50%;
  background: rgba(6, 170, 88, 0.1);
  content: '';
}

.success-check {
  position: absolute;
  left: 34rpx;
  top: 42rpx;
  width: 56rpx;
  height: 30rpx;
  border-bottom: 13rpx solid #fff;
  border-left: 13rpx solid #fff;
  transform: rotate(-45deg);
}

.spark {
  position: absolute;
  width: 18rpx;
  height: 18rpx;
  background: #ffd45c;
  clip-path: polygon(50% 0, 64% 36%, 100% 50%, 64% 64%, 50% 100%, 36% 64%, 0 50%, 36% 36%);
}

.spark--one {
  right: -28rpx;
  top: -12rpx;
}

.spark--two {
  left: -36rpx;
  top: 54rpx;
  opacity: 0.7;
}

.hero-copy {
  position: relative;
  z-index: 1;
  min-width: 0;
  flex: 1;
}

.hero-title,
.hero-desc,
.card-title,
.practice-label,
.practice-value,
.confirmed-title,
.year-title,
.year-desc,
.year-tip,
.follow-title,
.follow-desc {
  display: block;
}

.hero-title {
  font-size: 50rpx;
  font-weight: 900;
  line-height: 1.18;
}

.hero-desc {
  margin-top: 14rpx;
  color: #08a85c;
  font-size: 32rpx;
  font-weight: 900;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  margin-top: 16rpx;
  padding: 8rpx 20rpx;
  border-radius: 999rpx;
  background: linear-gradient(135deg, #19bd6f, #08a85c);
  color: #fff;
  font-size: 25rpx;
  font-weight: 900;
}

.status-pill::before {
  width: 18rpx;
  height: 18rpx;
  margin-right: 8rpx;
  border: 3rpx solid #fff;
  border-radius: 50%;
  content: '';
}

.paper-art {
  position: absolute;
  right: 64rpx;
  top: 66rpx;
  width: 112rpx;
  height: 126rpx;
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.42);
  transform: rotate(8deg);
}

.paper-art::before {
  position: absolute;
  left: 28rpx;
  right: 24rpx;
  top: 34rpx;
  height: 10rpx;
  border-radius: 999rpx;
  background: rgba(15, 185, 102, 0.12);
  box-shadow: 0 25rpx 0 rgba(15, 185, 102, 0.1);
  content: '';
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 36rpx;
}

.practice-card,
.confirmed-card,
.year-card,
.follow-card {
  padding: 32rpx;
  border-radius: 22rpx;
  box-shadow: 0 18rpx 46rpx rgba(35, 51, 87, 0.08);
}

.card-title {
  font-size: 36rpx;
  font-weight: 900;
}

.practice-list {
  margin-top: 24rpx;
}

.practice-row,
.confirmed-row,
.year-body,
.follow-row,
.bottom-actions {
  display: flex;
  align-items: center;
}

.practice-row {
  gap: 22rpx;
  padding: 15rpx 0;
}

.row-icon {
  position: relative;
  width: 36rpx;
  height: 36rpx;
  flex: 0 0 auto;
  border-radius: 10rpx;
  background: #e8f8ef;
  color: #08a85c;
}

.row-icon::before,
.row-icon::after {
  position: absolute;
  content: '';
}

.row-icon--building::before {
  inset: 8rpx 9rpx 5rpx;
  border-radius: 3rpx;
  background: currentColor;
  box-shadow: 10rpx 8rpx 0 -2rpx currentColor;
}

.row-icon--bag::before {
  left: 9rpx;
  top: 13rpx;
  width: 19rpx;
  height: 16rpx;
  border-radius: 4rpx;
  background: currentColor;
}

.row-icon--bag::after {
  left: 14rpx;
  top: 8rpx;
  width: 8rpx;
  height: 7rpx;
  border: 3rpx solid currentColor;
  border-bottom: 0;
  border-radius: 8rpx 8rpx 0 0;
}

.row-icon--calendar::before {
  inset: 7rpx 6rpx 5rpx;
  border: 3rpx solid currentColor;
  border-radius: 5rpx;
}

.row-icon--calendar::after {
  top: 16rpx;
  right: 6rpx;
  left: 6rpx;
  border-top: 3rpx solid currentColor;
}

.row-icon--clock::before,
.row-icon--check::before {
  inset: 6rpx;
  border: 3rpx solid currentColor;
  border-radius: 50%;
}

.row-icon--clock::after {
  left: 17rpx;
  top: 10rpx;
  width: 3rpx;
  height: 12rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: 6rpx 9rpx 0 -1rpx currentColor;
}

.row-icon--check::after {
  left: 13rpx;
  top: 17rpx;
  width: 11rpx;
  height: 7rpx;
  border-bottom: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
  transform: rotate(-45deg);
}

.practice-label {
  width: 176rpx;
  flex: 0 0 auto;
  color: #526079;
  font-size: 28rpx;
}

.divider {
  color: #cbd1d9;
  font-size: 28rpx;
}

.practice-value {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 29rpx;
  line-height: 1.35;
}

.confirmed-list {
  margin-top: 22rpx;
}

.confirmed-row {
  gap: 22rpx;
  min-height: 68rpx;
  border-bottom: 1rpx solid #edf1f4;
}

.confirmed-row:last-child {
  border-bottom: 0;
}

.mini-check {
  position: relative;
  width: 28rpx;
  height: 28rpx;
  flex: 0 0 auto;
  border: 3rpx solid #08a85c;
  border-radius: 50%;
}

.mini-check::before {
  position: absolute;
  left: 7rpx;
  top: 9rpx;
  width: 11rpx;
  height: 6rpx;
  border-bottom: 3rpx solid #08a85c;
  border-left: 3rpx solid #08a85c;
  content: '';
  transform: rotate(-45deg);
}

.confirmed-title {
  flex: 1;
  color: #10172d;
  font-size: 29rpx;
}

.confirmed-status {
  color: #08a85c;
  font-size: 28rpx;
}

.chevron {
  width: 18rpx;
  height: 18rpx;
  flex: 0 0 auto;
  border-top: 4rpx solid #9aa3af;
  border-right: 4rpx solid #9aa3af;
  transform: rotate(45deg);
}

.year-body {
  gap: 28rpx;
  margin-top: 28rpx;
}

.ring-progress {
  position: relative;
  display: flex;
  width: 132rpx;
  height: 132rpx;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 12rpx solid #b8ebcc;
  border-left-color: #08a85c;
  border-bottom-color: #08a85c;
  border-radius: 50%;
  flex-wrap: wrap;
  color: #08a85c;
}

.ring-number {
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1;
}

.ring-total {
  margin-top: 8rpx;
  font-size: 26rpx;
  font-weight: 900;
}

.ring-unit {
  width: 100%;
  color: #526079;
  font-size: 23rpx;
  text-align: center;
}

.year-copy {
  min-width: 0;
  flex: 1;
}

.year-title {
  font-size: 30rpx;
  font-weight: 900;
}

.year-desc {
  margin-top: 16rpx;
  color: #344054;
  font-size: 28rpx;
}

.progress-bar {
  height: 13rpx;
  margin-top: 18rpx;
}

.progress-bar :deep(.wd-progress__outer) {
  height: 13rpx;
  background: #e1e5ea;
}

.progress-bar :deep(.wd-progress__inner) {
  border-radius: 999rpx;
}

.year-tip {
  margin-top: 18rpx;
  color: #8a94a6;
  font-size: 27rpx;
}

.calendar-ok {
  position: relative;
  width: 86rpx;
  height: 86rpx;
  flex: 0 0 auto;
  border-radius: 18rpx;
  background: #e0f7eb;
}

.calendar-ok::before {
  position: absolute;
  inset: 0 0 auto;
  height: 26rpx;
  border-radius: 18rpx 18rpx 0 0;
  background: #b6efd0;
  content: '';
}

.calendar-ok::after {
  position: absolute;
  left: 29rpx;
  top: 45rpx;
  width: 28rpx;
  height: 16rpx;
  border-bottom: 8rpx solid #fff;
  border-left: 8rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.follow-list {
  margin-top: 22rpx;
}

.follow-row {
  position: relative;
  gap: 22rpx;
  padding: 22rpx 36rpx 22rpx 8rpx;
  border-bottom: 1rpx solid #edf1f4;
}

.follow-row:last-child {
  border-bottom: 0;
}

.follow-icon {
  position: relative;
  width: 54rpx;
  height: 54rpx;
  flex: 0 0 auto;
  border-radius: 10rpx;
}

.follow-icon--green {
  background: linear-gradient(135deg, #20c978, #0aad60);
}

.follow-icon--blue {
  background: linear-gradient(135deg, #4aa3ff, #287df0);
}

.follow-icon::before {
  position: absolute;
  left: 15rpx;
  top: 17rpx;
  width: 24rpx;
  height: 6rpx;
  border-radius: 999rpx;
  background: #fff;
  box-shadow: 0 13rpx 0 rgba(255, 255, 255, 0.86);
  content: '';
}

.follow-copy {
  min-width: 0;
  flex: 1;
}

.follow-title {
  font-size: 29rpx;
  font-weight: 900;
}

.follow-desc {
  margin-top: 8rpx;
  color: #8a94a6;
  font-size: 25rpx;
}

.follow-row .chevron {
  position: absolute;
  right: 10rpx;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 6;
  gap: 28rpx;
  padding: 24rpx 40rpx calc(26rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(16rpx);
}

.action-button {
  height: 84rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 30rpx;
}

.action-button--list {
  background: #fff;
}

@media (max-width: 374px) {
  .hero {
    gap: 26rpx;
    padding-right: 28rpx;
    padding-left: 28rpx;
  }

  .success-art {
    width: 100rpx;
    height: 100rpx;
  }

  .success-check {
    left: 27rpx;
    top: 33rpx;
    width: 44rpx;
    height: 24rpx;
  }

  .hero-title {
    font-size: 37rpx;
  }

  .hero-desc {
    font-size: 27rpx;
  }

  .content {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .practice-card,
  .confirmed-card,
  .year-card,
  .follow-card {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .practice-row {
    gap: 12rpx;
  }

  .practice-label {
    width: 140rpx;
    font-size: 25rpx;
  }

  .practice-value,
  .confirmed-title,
  .confirmed-status {
    font-size: 25rpx;
  }

  .calendar-ok {
    display: none;
  }

  .bottom-actions {
    gap: 18rpx;
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .action-button {
    font-size: 27rpx;
  }
}
</style>
