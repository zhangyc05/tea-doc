<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { getMobileVirtualResearchState } from '../../../domain/virtualResearch'

const virtualResearchState = getMobileVirtualResearchState()

const stats = [
  { label: '已加入', value: '1', unit: '个教研室', type: 'members' },
  { label: '待确认贡献', value: '2', unit: '项', type: 'confirm' },
  { label: '待处理邀请', value: '1', unit: '项', type: 'invite' },
]

const todos = [
  {
    title: '智能制造课程虚拟教研室邀请',
    tag: '待确认邀请',
    tagTone: 'orange',
    desc: '邀请你加入课程资源共建方向，可先查看教研室介绍和近期活动。',
    action: '查看邀请',
    type: 'invite',
  },
  {
    title: '智能制造课程资源共建研讨',
    tag: '待确认贡献',
    tagTone: 'purple',
    desc: 'AI 已根据会议纪要和任务分工识别出 2 项个人贡献，请确认是否准确。',
    action: '确认贡献',
    type: 'doc',
  },
]

const activities = [
  {
    title: '智能制造课程资源共建研讨',
    desc: '腾讯会议 | 已识别 2 项贡献',
    status: '待确认',
    tone: 'orange',
    type: 'meeting',
  },
  {
    title: '数字化教学资源建设讨论',
    desc: '纪要已整理 | 个人贡献已确认',
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

function goResearchInvitation() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-invitation/index' })
}

function goContributionConfirm() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-confirm-contribution/index' })
}

function goResearchRoom() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-position-management/index' })
}

function goResearchActivityList() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-activity-list/index' })
}

function handleTodoAction(type: string) {
  if (type === 'invite') {
    goResearchInvitation()
    return
  }
  goContributionConfirm()
}
</script>

<template>
  <view class="virtual-room-page">
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
        <view class="todo-list">
          <MobileCard v-for="item in todos" :key="item.title" class="todo-card">
            <view class="todo-icon" :class="`todo-icon--${item.type}`"></view>
            <view class="todo-copy">
              <view class="todo-title-row">
                <text class="todo-title">{{ item.title }}</text>
                <text class="todo-tag" :class="`todo-tag--${item.tagTone}`">{{ item.tag }}</text>
              </view>
              <text class="todo-desc">{{ item.desc }}</text>
            </view>
            <MobileActionButton class="todo-button" variant="outline" arrow @tap="handleTodoAction(item.type)">
              {{ item.action }}
            </MobileActionButton>
          </MobileCard>
        </view>
      </view>

      <view class="section">
        <text class="section-title">我的教研室</text>
        <MobileCard class="room-card">
          <view class="room-icon"></view>
          <view class="room-main">
            <view class="room-title-row">
              <text class="room-title">智能制造教研室</text>
              <text class="room-status">{{ virtualResearchState.memberStatus === '已加入' ? '已加入' : '待加入' }}</text>
            </view>
            <text class="room-meta">8 位成员 | 本月 2 次活动 | 1 项进行中任务</text>
            <text class="room-desc">聚焦智能制造课程建设、企业案例共建与数字化教学资源整理。</text>
            <view class="tag-row">
              <text class="room-chip">课程资源共建研讨</text>
              <text class="room-chip">数字化教学资源建设</text>
              <text class="room-chip room-chip--warn">2 项贡献待确认</text>
            </view>
            <MobileActionButton class="room-button" variant="primary" arrow @tap="goResearchRoom">
              进入教研室
            </MobileActionButton>
          </view>
        </MobileCard>
      </view>

      <view class="section recent-section">
        <view class="section-head">
          <text class="section-title">最近教研活动</text>
          <button class="all-link" @tap="goResearchActivityList">
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

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.virtual-room-page {
  min-height: 100vh;
  padding-bottom: calc(190rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 86% 6%, rgba(213, 250, 231, 0.74), transparent 25%),
    linear-gradient(180deg, #fdfffe 0%, #ffffff 44%, #f7fbfa 100%);
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
.stat-value,
.stat-unit,
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
  font-size: 52rpx;
  font-weight: 900;
  line-height: 1.18;
}

.page-subtitle {
  margin-top: 12rpx;
  color: #264675;
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
  border-radius: 28rpx;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  min-width: 0;
  padding: 0 18rpx;
  border-right: 1rpx solid #e6ebf1;
}

.stat-item:last-child {
  border-right: 0;
}

.stat-icon,
.todo-icon,
.room-icon,
.activity-icon {
  position: relative;
  flex: 0 0 auto;
  background: #e9fbf2;
  color: #10b966;
}

.stat-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 18rpx;
}

.stat-icon::before,
.stat-icon::after,
.todo-icon::before,
.todo-icon::after,
.room-icon::before,
.room-icon::after,
.activity-icon::before,
.activity-icon::after {
  position: absolute;
  content: '';
}

.stat-icon--members::before {
  left: 13rpx;
  top: 14rpx;
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 22rpx 4rpx 0 -2rpx #41d982;
}

.stat-icon--members::after {
  left: 10rpx;
  bottom: 12rpx;
  width: 38rpx;
  height: 20rpx;
  border-radius: 22rpx 22rpx 8rpx 8rpx;
  background: currentColor;
  box-shadow: 22rpx 3rpx 0 -6rpx #41d982;
}

.stat-icon--confirm::before {
  inset: 13rpx 16rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.stat-icon--confirm::after {
  left: 24rpx;
  top: 28rpx;
  width: 19rpx;
  height: 11rpx;
  border-bottom: 6rpx solid #fff;
  border-left: 6rpx solid #fff;
  transform: rotate(-45deg);
}

.stat-icon--invite::before {
  inset: 16rpx 12rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.stat-icon--invite::after {
  right: 10rpx;
  top: 10rpx;
  width: 14rpx;
  height: 14rpx;
  border: 4rpx solid #fff;
  border-radius: 50%;
  background: #f43f3f;
}

.stat-copy {
  min-width: 0;
}

.stat-label {
  color: #0f172a;
  font-size: 26rpx;
  line-height: 1.15;
}

.stat-value-row {
  display: flex;
  align-items: baseline;
  gap: 8rpx;
  margin-top: 8rpx;
}

.stat-value {
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1;
}

.stat-unit {
  color: #263b67;
  font-size: 24rpx;
  white-space: nowrap;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.section-title {
  font-size: 38rpx;
  font-weight: 900;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
}

.todo-card {
  display: flex;
  align-items: center;
  gap: 24rpx;
  padding: 26rpx;
  border-radius: 28rpx;
}

.todo-icon {
  width: 88rpx;
  height: 88rpx;
  border-radius: 16rpx;
}

.todo-icon--invite::before {
  left: 20rpx;
  top: 20rpx;
  width: 27rpx;
  height: 27rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 22rpx 5rpx 0 -3rpx #47d98d;
}

.todo-icon--invite::after {
  right: 16rpx;
  bottom: 16rpx;
  width: 36rpx;
  height: 26rpx;
  border-radius: 5rpx;
  background: currentColor;
  box-shadow: -28rpx -2rpx 0 -10rpx currentColor;
}

.todo-icon--doc {
  background: #eef2ff;
  color: #4f7df2;
}

.todo-icon--doc::before {
  left: 22rpx;
  top: 16rpx;
  width: 42rpx;
  height: 52rpx;
  border-radius: 7rpx;
  background: currentColor;
}

.todo-icon--doc::after {
  right: 13rpx;
  bottom: 13rpx;
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  background: #8da8ff;
  box-shadow: inset 0 0 0 5rpx #fff;
}

.todo-copy {
  min-width: 0;
  flex: 1;
}

.todo-title-row,
.room-title-row,
.section-head,
.all-link,
.activity-row {
  display: flex;
  align-items: center;
}

.todo-title-row {
  gap: 16rpx;
}

.todo-title {
  min-width: 0;
  color: #111827;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.28;
}

.todo-tag {
  flex: 0 0 auto;
  padding: 7rpx 14rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  font-weight: 900;
}

.todo-tag--orange {
  background: #fff0e7;
  color: #ff5b10;
}

.todo-tag--purple {
  background: #f2ecff;
  color: #7c3cff;
}

.todo-desc {
  margin-top: 16rpx;
  color: #264675;
  font-size: 25rpx;
  line-height: 1.5;
}

.todo-button {
  width: 152rpx;
  height: 62rpx;
  flex: 0 0 auto;
  border-radius: 12rpx;
  font-size: 25rpx;
}

.room-card {
  display: flex;
  gap: 24rpx;
  padding: 26rpx;
  border-radius: 20rpx;
}

.room-icon {
  width: 90rpx;
  height: 90rpx;
  border-radius: 16rpx;
}

.room-icon::before {
  left: 18rpx;
  top: 31rpx;
  width: 54rpx;
  height: 28rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 100% 33%, 50% 66%, 0 33%);
}

.room-icon::after {
  left: 23rpx;
  top: 49rpx;
  width: 44rpx;
  height: 20rpx;
  border-radius: 0 0 28rpx 28rpx;
  background: currentColor;
}

.room-main {
  position: relative;
  min-width: 0;
  flex: 1;
}

.room-title-row {
  gap: 18rpx;
}

.room-title {
  min-width: 0;
  color: #111827;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.26;
}

.room-status {
  flex: 0 0 auto;
  padding: 7rpx 16rpx;
  border-radius: 999rpx;
  background: #e8fbf0;
  color: #08a85c;
  font-size: 23rpx;
  font-weight: 900;
}

.room-meta {
  margin-top: 14rpx;
  color: #264675;
  font-size: 25rpx;
  line-height: 1.38;
}

.room-desc {
  margin-top: 18rpx;
  color: #264675;
  font-size: 25rpx;
  line-height: 1.45;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 22rpx;
  padding-right: 130rpx;
}

.room-chip {
  padding: 9rpx 15rpx;
  border-radius: 8rpx;
  background: #e8fbf0;
  color: #08a85c;
  font-size: 22rpx;
  font-weight: 800;
}

.room-chip--warn {
  background: #fff0e7;
  color: #ff5b10;
}

.room-button {
  position: absolute;
  right: 0;
  bottom: -2rpx;
  width: 148rpx;
  height: 64rpx;
  border-radius: 12rpx;
  font-size: 25rpx;
}

.section-head {
  justify-content: space-between;
}

.all-link {
  gap: 10rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #08a85c;
  font-size: 28rpx;
  font-weight: 900;
}

.all-link::after {
  display: none;
}

.link-arrow,
.row-arrow {
  width: 16rpx;
  height: 16rpx;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.activity-card {
  overflow: hidden;
  border-radius: 20rpx;
}

.activity-row {
  gap: 18rpx;
  min-height: 94rpx;
  padding: 18rpx 26rpx;
  border-bottom: 1rpx solid #e8edf4;
}

.activity-row:last-child {
  border-bottom: 0;
}

.activity-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 12rpx;
}

.activity-icon--meeting::before {
  left: 13rpx;
  top: 13rpx;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 17rpx 0 0 currentColor;
}

.activity-icon--meeting::after {
  left: 10rpx;
  bottom: 12rpx;
  width: 36rpx;
  height: 18rpx;
  border-radius: 18rpx 18rpx 6rpx 6rpx;
  background: currentColor;
}

.activity-icon--doc {
  background: #edf4ff;
  color: #4284f5;
}

.activity-icon--doc::before {
  inset: 10rpx 14rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.activity-icon--calendar {
  background: #f3ecff;
  color: #8b5cf6;
}

.activity-icon--calendar::before {
  inset: 10rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.activity-copy {
  min-width: 0;
  flex: 1;
}

.activity-title {
  color: #111827;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.26;
}

.activity-desc {
  margin-top: 8rpx;
  color: #264675;
  font-size: 24rpx;
}

.activity-status {
  flex: 0 0 auto;
  padding: 11rpx 18rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
  font-weight: 900;
}

.activity-status--orange {
  background: #fff0e7;
  color: #ff5b10;
}

.activity-status--green {
  background: #e8fbf0;
  color: #08a85c;
}

.activity-status--blue {
  background: #eef4ff;
  color: #2c6ff2;
}

.row-arrow {
  flex: 0 0 auto;
  border-color: #8b94a7;
}

@media (max-width: 430px) {
  .virtual-room-page {
    padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
  }

  .hero {
    margin-top: -34rpx;
    padding-bottom: 18rpx;
    padding-right: 24rpx;
    padding-left: 106rpx;
  }

  .content {
    gap: 20rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .stats-card {
    padding-top: 16rpx;
    padding-bottom: 16rpx;
    padding-right: 10rpx;
    padding-left: 10rpx;
  }

  .stat-item {
    gap: 10rpx;
    padding-right: 10rpx;
    padding-left: 10rpx;
  }

  .stat-icon {
    width: 56rpx;
    height: 56rpx;
  }

  .stat-label,
  .todo-desc,
  .room-meta,
  .room-desc {
    font-size: 21rpx;
  }

  .stat-value {
    font-size: 33rpx;
  }

  .stat-unit {
    font-size: 21rpx;
  }

  .todo-card {
    gap: 18rpx;
    padding: 16rpx 18rpx;
  }

  .todo-icon {
    width: 68rpx;
    height: 68rpx;
  }

  .todo-title {
    font-size: 24rpx;
  }

  .todo-tag {
    padding-right: 10rpx;
    padding-left: 10rpx;
    font-size: 20rpx;
  }

  .todo-button {
    width: 118rpx;
    height: 54rpx;
    font-size: 20rpx;
  }

  .todo-desc {
    margin-top: 8rpx;
    line-height: 1.35;
  }

  .section {
    gap: 12rpx;
  }

  .section-title {
    font-size: 30rpx;
  }

  .room-card {
    gap: 18rpx;
    padding: 18rpx;
  }

  .room-icon {
    width: 66rpx;
    height: 66rpx;
  }

  .room-title {
    font-size: 25rpx;
  }

  .room-meta {
    margin-top: 8rpx;
  }

  .room-desc {
    margin-top: 10rpx;
    line-height: 1.34;
  }

  .tag-row {
    gap: 8rpx;
    margin-top: 12rpx;
    padding-right: 0;
  }

  .room-chip {
    padding: 7rpx 11rpx;
    font-size: 20rpx;
  }

  .room-button {
    position: relative;
    width: 136rpx;
    height: 54rpx;
    margin-top: 10rpx;
    margin-left: auto;
    font-size: 21rpx;
  }

  .activity-row {
    gap: 14rpx;
    min-height: 72rpx;
    padding-top: 12rpx;
    padding-bottom: 12rpx;
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .activity-icon {
    width: 48rpx;
    height: 48rpx;
  }

  .activity-title {
    font-size: 23rpx;
  }

  .activity-desc,
  .activity-status {
    font-size: 19rpx;
  }

  .activity-status {
    padding: 8rpx 14rpx;
  }
}

@media (max-width: 374px) {
  .hero {
    padding-left: 82rpx;
  }

  .page-title {
    font-size: 37rpx;
  }

  .page-subtitle {
    font-size: 23rpx;
  }

  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .stats-card {
    gap: 0;
  }

  .stat-item {
    align-items: flex-start;
    flex-direction: column;
  }

  .todo-card {
    align-items: flex-start;
  }

  .todo-title-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 8rpx;
  }

  .todo-button {
    width: 118rpx;
  }

  .room-card {
    align-items: flex-start;
  }

  .activity-status {
    padding-right: 12rpx;
    padding-left: 12rpx;
  }
}
</style>
