<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

const stats = [
  { label: '已加入', value: '1', unit: '个教研室', type: 'members' },
  { label: '待确认贡献', value: '2', unit: '项', type: 'confirm' },
  { label: '待处理邀请', value: '1', unit: '项', type: 'invite' },
]

const todos = [
  {
    title: '智能制造课程虚拟教研室邀请',
    tag: '待确认邀请',
    tone: 'orange',
    desc: '邀请你加入课程资源共建方向，可先查看教研室介绍和近期活动。',
    action: '查看邀请',
    type: 'invite',
  },
  {
    title: '智能制造课程资源共建研讨',
    tag: '待确认贡献',
    tone: 'purple',
    desc: 'AI 已根据会议纪要和任务分工识别出 2 项个人贡献，请确认是否准确。',
    action: '确认贡献',
    type: 'doc',
  },
]

const activities = [
  {
    title: '智能制造课程资源共建研讨',
    desc: '腾讯会议  |  已识别 2 项贡献',
    status: '待确认',
    tone: 'orange',
    type: 'meeting',
  },
  {
    title: '数字化教学资源建设讨论',
    desc: '纪要已整理  |  个人贡献已确认',
    status: '已归档',
    tone: 'green',
    type: 'doc',
  },
  {
    title: '课程案例共创碰头会',
    desc: '下次会议 06-03 14:00',
    status: '进行中',
    tone: 'blue',
    type: 'calendar',
  },
]

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}
</script>

<template>
  <view class="room-dashboard-page">
    <MobileNavbar title="" size="compact" @back="goBack" />

    <view class="hero">
      <text class="page-title">我的教研室</text>
      <text class="page-subtitle">查看已加入的教研室、待处理邀请和个人贡献</text>
    </view>

    <view class="content">
      <MobileCard class="stats-card">
        <view v-for="item in stats" :key="item.label" class="stat-item">
          <view class="stat-icon" :class="`stat-icon--${item.type}`"></view>
          <view class="stat-copy">
            <text class="stat-label">{{ item.label }}</text>
            <view class="stat-value-row">
              <text class="stat-value">{{ item.value }}</text>
              <text class="stat-unit">{{ item.unit }}</text>
            </view>
          </view>
        </view>
      </MobileCard>

      <view class="section">
        <text class="section-title">当前需要处理</text>
        <MobileCard v-for="item in todos" :key="item.title" class="todo-card">
          <view class="todo-icon" :class="`todo-icon--${item.type}`"></view>
          <view class="todo-copy">
            <view class="todo-title-row">
              <text class="todo-title">{{ item.title }}</text>
              <text class="todo-tag" :class="`todo-tag--${item.tone}`">{{ item.tag }}</text>
            </view>
            <text class="todo-desc">{{ item.desc }}</text>
          </view>
          <MobileActionButton class="todo-button" variant="outline" arrow @tap="showToast(item.action)">
            {{ item.action }}
          </MobileActionButton>
        </MobileCard>
      </view>

      <view class="section">
        <text class="section-title">我的教研室</text>
        <MobileCard class="room-card">
          <view class="room-icon room-icon--joined"></view>
          <view class="room-copy">
            <view class="room-title-row">
              <text class="room-title">智能制造教研室</text>
              <text class="room-status">已加入</text>
            </view>
            <text class="room-meta">8 位成员  |  本月 2 次活动  |  1 项进行中任务</text>
            <text class="room-desc">聚焦智能制造课程建设、企业案例共建与数字化教学资源整理。</text>
            <view class="chip-row">
              <text class="room-chip">课程资源共建研讨</text>
              <text class="room-chip">数字化教学资源建设</text>
              <text class="room-chip room-chip--warn">2 项贡献待确认</text>
            </view>
            <MobileActionButton class="room-button" variant="primary" arrow @tap="showToast('进入教研室')">
              进入教研室
            </MobileActionButton>
          </view>
        </MobileCard>

        <MobileCard class="room-card room-card--invited">
          <view class="room-icon room-icon--book"></view>
          <view class="room-copy">
            <view class="room-title-row">
              <text class="room-title">课程思政教研室</text>
              <text class="room-status room-status--blue">邀请中</text>
            </view>
            <text class="room-desc">可先查看教研方向与近期安排，再决定是否加入。</text>
          </view>
          <MobileActionButton class="invite-button" variant="outline" arrow @tap="showToast('查看邀请')">
            查看邀请
          </MobileActionButton>
        </MobileCard>
      </view>

      <view class="section recent-section">
        <view class="section-head">
          <text class="section-title">最近教研活动</text>
          <button class="all-link" @tap="showToast('全部')">
            <text>全部</text>
            <view class="link-arrow"></view>
          </button>
        </view>
        <MobileCard class="activity-card">
          <view v-for="item in activities" :key="item.title" class="activity-row">
            <view class="activity-icon" :class="`activity-icon--${item.type}`"></view>
            <view class="activity-copy">
              <text class="activity-title">{{ item.title }}</text>
              <text class="activity-desc">{{ item.desc }}</text>
            </view>
            <text class="activity-status" :class="`activity-status--${item.tone}`">{{ item.status }}</text>
            <view class="row-arrow"></view>
          </view>
        </MobileCard>
      </view>
    </view>

    <MobileTabBar active="assistant" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.room-dashboard-page {
  min-height: 100vh;
  padding-bottom: calc(168rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 86% 7%, rgba(215, 250, 232, 0.72), transparent 25%),
    linear-gradient(180deg, #ffffff 0%, #ffffff 44%, #f8fbfa 100%);
  color: #10172d;
}

.hero {
  margin-top: -28rpx;
  padding: 0 40rpx 28rpx 132rpx;
}

.page-title,
.page-subtitle,
.section-title,
.stat-label,
.todo-title,
.todo-desc,
.room-title,
.room-meta,
.room-desc,
.activity-title,
.activity-desc {
  display: block;
}

.page-title {
  font-size: 43rpx;
  font-weight: 900;
  line-height: 1.18;
}

.page-subtitle {
  margin-top: 12rpx;
  color: #294875;
  font-size: 26rpx;
  line-height: 1.36;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 34rpx;
  padding: 0 30rpx;
}

.stats-card {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 24rpx 18rpx;
  border-radius: 20rpx;
  background: linear-gradient(105deg, #f7fffb, #ffffff);
}

.stat-item {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 16rpx;
  padding: 0 18rpx;
  border-right: 1rpx solid #e3ebe8;
}

.stat-item:last-child {
  border-right: 0;
}

.stat-icon,
.todo-icon,
.room-icon,
.activity-icon,
.link-arrow,
.row-arrow {
  position: relative;
  flex: 0 0 auto;
}

.stat-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 18rpx;
  background: #e9fbf2;
  color: #14bb69;
}

.stat-icon::before,
.stat-icon::after,
.todo-icon::before,
.todo-icon::after,
.room-icon::before,
.room-icon::after,
.activity-icon::before,
.activity-icon::after,
.link-arrow::before,
.row-arrow::before {
  position: absolute;
  content: '';
}

.stat-icon--members::before,
.room-icon--joined::before {
  left: 21rpx;
  top: 13rpx;
  width: 23rpx;
  height: 23rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: -17rpx 8rpx 0 -4rpx currentColor, 17rpx 8rpx 0 -4rpx currentColor;
}

.stat-icon--members::after,
.room-icon--joined::after {
  left: 13rpx;
  bottom: 11rpx;
  width: 38rpx;
  height: 20rpx;
  border-radius: 22rpx 22rpx 6rpx 6rpx;
  background: currentColor;
}

.stat-icon--confirm::before,
.todo-icon--doc::before {
  left: 19rpx;
  top: 10rpx;
  width: 28rpx;
  height: 40rpx;
  border-radius: 7rpx;
  background: currentColor;
}

.stat-icon--confirm::after,
.todo-icon--doc::after {
  left: 26rpx;
  top: 24rpx;
  width: 18rpx;
  height: 10rpx;
  border-bottom: 5rpx solid #fff;
  border-left: 5rpx solid #fff;
  transform: rotate(-45deg);
}

.stat-icon--invite::before {
  left: 13rpx;
  top: 21rpx;
  width: 40rpx;
  height: 28rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.stat-icon--invite::after {
  right: 8rpx;
  top: 10rpx;
  width: 12rpx;
  height: 12rpx;
  border: 4rpx solid #fff;
  border-radius: 50%;
  background: #ff315d;
}

.stat-copy {
  min-width: 0;
}

.stat-label {
  color: #14203b;
  font-size: 26rpx;
  font-weight: 800;
}

.stat-value-row {
  display: flex;
  align-items: baseline;
  gap: 8rpx;
  margin-top: 7rpx;
}

.stat-value {
  color: #0d1326;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1;
}

.stat-unit {
  color: #263f6b;
  font-size: 25rpx;
  font-weight: 700;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.todo-card,
.room-card {
  display: flex;
  align-items: center;
  gap: 22rpx;
  border-radius: 18rpx;
  padding: 26rpx 24rpx;
}

.todo-icon,
.room-icon {
  width: 92rpx;
  height: 92rpx;
  border-radius: 18rpx;
  background: #e9fbf2;
  color: #15ba69;
}

.todo-icon--invite::before {
  left: 22rpx;
  top: 22rpx;
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: -17rpx 10rpx 0 -5rpx currentColor;
}

.todo-icon--invite::after {
  right: 14rpx;
  bottom: 18rpx;
  width: 38rpx;
  height: 28rpx;
  border-radius: 5rpx;
  background: currentColor;
  box-shadow: inset 0 0 0 7rpx #e9fbf2;
}

.todo-icon--doc {
  background: #edf4ff;
  color: #4b80f5;
}

.todo-copy,
.room-copy,
.activity-copy {
  min-width: 0;
  flex: 1;
}

.todo-title-row,
.room-title-row,
.chip-row,
.activity-row {
  display: flex;
  align-items: center;
}

.todo-title-row,
.room-title-row {
  gap: 16rpx;
}

.todo-title,
.room-title {
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.25;
}

.todo-tag,
.room-status,
.activity-status {
  flex: 0 0 auto;
  padding: 7rpx 15rpx;
  border-radius: 999rpx;
  font-size: 23rpx;
  font-weight: 900;
}

.todo-tag--orange,
.room-chip--warn,
.activity-status--orange {
  background: #fff1e5;
  color: #ff6b1a;
}

.todo-tag--purple {
  background: #f1eaff;
  color: #7b4dff;
}

.todo-desc,
.room-desc {
  margin-top: 14rpx;
  color: #38527f;
  font-size: 27rpx;
  line-height: 1.55;
}

.todo-button {
  width: 164rpx;
  height: 60rpx;
  flex: 0 0 auto;
  font-size: 26rpx;
}

.todo-button :deep(text) {
  white-space: nowrap;
}

.room-card {
  align-items: flex-start;
  padding: 30rpx 24rpx;
}

.room-icon {
  width: 94rpx;
  height: 94rpx;
}

.room-status {
  background: #e8fbf1;
  color: #14a963;
}

.room-status--blue {
  background: #e9f2ff;
  color: #2f78f5;
}

.room-meta {
  margin-top: 12rpx;
  color: #2f4d7d;
  font-size: 26rpx;
  line-height: 1.35;
}

.chip-row {
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 20rpx;
}

.room-chip {
  padding: 9rpx 16rpx;
  border-radius: 9rpx;
  background: #eaf8f0;
  color: #149b5d;
  font-size: 23rpx;
  font-weight: 800;
}

.room-button {
  width: 180rpx;
  margin: 20rpx 0 0 auto;
}

.room-card--invited {
  align-items: center;
}

.room-icon--book {
  background: #edf4ff;
  color: #6090f6;
}

.room-icon--book::before {
  left: 22rpx;
  top: 22rpx;
  width: 24rpx;
  height: 42rpx;
  border: 6rpx solid currentColor;
  border-right: 0;
  border-radius: 6rpx 0 0 6rpx;
}

.room-icon--book::after {
  right: 20rpx;
  top: 22rpx;
  width: 24rpx;
  height: 42rpx;
  border: 6rpx solid currentColor;
  border-left: 0;
  border-radius: 0 6rpx 6rpx 0;
}

.invite-button {
  width: 138rpx;
  flex: 0 0 auto;
}

.all-link {
  display: flex;
  align-items: center;
  gap: 10rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #0eb65d;
  font-size: 27rpx;
  font-weight: 900;
}

.all-link::after {
  display: none;
}

.link-arrow,
.row-arrow {
  width: 18rpx;
  height: 22rpx;
}

.link-arrow::before,
.row-arrow::before {
  inset: 3rpx 4rpx;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.activity-card {
  overflow: hidden;
  padding: 0;
  border-radius: 16rpx;
}

.activity-row {
  gap: 18rpx;
  padding: 22rpx 24rpx;
  border-bottom: 1rpx solid #eef2f7;
}

.activity-row:last-child {
  border-bottom: 0;
}

.activity-icon {
  width: 54rpx;
  height: 54rpx;
  border-radius: 12rpx;
  background: #eaf8f0;
  color: #15b969;
}

.activity-icon::before {
  left: 14rpx;
  top: 14rpx;
  width: 26rpx;
  height: 26rpx;
  border-radius: 50%;
  background: currentColor;
}

.activity-icon--doc {
  background: #edf4ff;
  color: #4d83f6;
}

.activity-icon--calendar {
  background: #f1eaff;
  color: #8b61f5;
}

.activity-title {
  color: #10172d;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.25;
}

.activity-desc {
  margin-top: 8rpx;
  color: #4a6087;
  font-size: 24rpx;
  line-height: 1.3;
}

.activity-status {
  border-radius: 9rpx;
}

.activity-status--green {
  background: #e8fbf1;
  color: #12a761;
}

.activity-status--blue {
  background: #eef4ff;
  color: #2f78f5;
}

.row-arrow {
  color: #8a99b2;
}

@media (max-width: 370px) {
  .content {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .hero {
    padding-left: 112rpx;
  }

  .stat-item {
    gap: 10rpx;
    padding: 0 8rpx;
  }

  .stat-icon {
    width: 56rpx;
    height: 56rpx;
    transform: scale(0.9);
  }

  .todo-card,
  .room-card {
    gap: 16rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .todo-icon,
  .room-icon {
    width: 78rpx;
    height: 78rpx;
    transform: scale(0.92);
  }

  .todo-button,
  .invite-button {
    width: 150rpx;
    font-size: 24rpx;
  }
}
</style>
