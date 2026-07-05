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

function showTodoFallback(action: string) {
  uni.showToast({
    title: `待办操作为本地模拟：${action}`,
    icon: 'none',
  })
}

function goResearchInvitation() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-invitation/index' })
}

function goContributionConfirm() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-confirm-contribution/index' })
}

function goResearchRoom() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-profile-complete/index' })
}

function goResearchActivityList() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-activity-list/index' })
}

function handleTodoAction(action: string) {
  if (action === '查看邀请') {
    goResearchInvitation()
    return
  }
  if (action === '确认贡献') {
    goContributionConfirm()
    return
  }
  showTodoFallback(action)
}
</script>

<template>
  <view class="room-dashboard-page">
    <MobileNavbar title="" size="compact" @back="goBack" />

    <view class="hero">
      <text class="page-title">我的教研室</text>
      <text class="page-subtitle">查看已加入的教研室、待处理邀请和个人贡献</text>
      <text class="page-subtitle">虚拟教研成员资料</text>
    </view>

    <view class="content">
      <MobileCard class="stats-card">
        <view v-for="item in stats" :key="item.label" class="stat-item">
          <view class="stat-icon" :class="`stat-icon--${item.type}`" aria-hidden="true"></view>
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
          <view class="todo-icon" :class="`todo-icon--${item.type}`" aria-hidden="true"></view>
          <view class="todo-copy">
            <view class="todo-title-row">
              <text class="todo-title">{{ item.title }}</text>
              <text class="todo-tag" :class="`todo-tag--${item.tone}`">{{ item.tag }}</text>
            </view>
            <text class="todo-desc">{{ item.desc }}</text>
          </view>
          <MobileActionButton class="todo-button" variant="outline" arrow @tap="handleTodoAction(item.action)">
            {{ item.action }}
          </MobileActionButton>
        </MobileCard>
      </view>

      <view class="section">
        <text class="section-title">我的教研室</text>
        <MobileCard class="room-card">
          <view class="room-icon room-icon--joined" aria-hidden="true"></view>
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
            <MobileActionButton class="room-button" variant="primary" arrow @tap="goResearchRoom">
              进入教研室
            </MobileActionButton>
          </view>
        </MobileCard>

        <MobileCard class="room-card room-card--invited">
          <view class="room-icon room-icon--book" aria-hidden="true"></view>
          <view class="room-copy">
            <view class="room-title-row">
              <text class="room-title">课程思政教研室</text>
              <text class="room-status room-status--blue">邀请中</text>
            </view>
            <text class="room-desc">可先查看教研方向与近期安排，再决定是否加入。</text>
          </view>
          <MobileActionButton class="invite-button" variant="outline" arrow @tap="goResearchInvitation">
            查看邀请
          </MobileActionButton>
        </MobileCard>
      </view>

      <view class="section recent-section">
        <view class="section-head">
          <text class="section-title">最近教研活动</text>
          <button class="all-link" @tap="goResearchActivityList">
            <text>全部</text>
            <wd-icon name="chevron-right" size="20rpx" color="#079653" />
          </button>
        </view>
        <MobileCard class="activity-card">
          <view v-for="item in activities" :key="item.title" class="activity-row">
            <view class="activity-icon" :class="`activity-icon--${item.type}`" aria-hidden="true"></view>
            <view class="activity-copy">
              <text class="activity-title">{{ item.title }}</text>
              <text class="activity-desc">{{ item.desc }}</text>
            </view>
            <text class="activity-status" :class="`activity-status--${item.tone}`">{{ item.status }}</text>
            <wd-icon name="chevron-right" size="24rpx" color="#7b8495" />
          </view>
        </MobileCard>
      </view>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.room-dashboard-page {
  min-height: 100vh;
  padding-bottom: calc(190rpx + env(safe-area-inset-bottom));
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
  padding: 28rpx;
  border-radius: 24rpx;
  background: linear-gradient(90deg, rgba(244, 255, 249, 0.94), #fff);
}

.stat-item {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 18rpx;
}

.stat-item + .stat-item {
  padding-left: 22rpx;
  border-left: 1rpx solid #e4edf0;
}

.stat-icon,
.todo-icon,
.room-icon,
.activity-icon {
  position: relative;
  flex: 0 0 auto;
  border-radius: 16rpx;
}

.stat-icon {
  width: 72rpx;
  height: 72rpx;
  background: #eefbf4;
  color: #10bd67;
}

.stat-icon::before,
.stat-icon::after,
.todo-icon::before,
.todo-icon::after,
.room-icon::before,
.room-icon::after,
.activity-icon::before,
.activity-icon::after,
.row-arrow::before,
.link-arrow::before {
  position: absolute;
  content: '';
}

.stat-icon--members::before {
  top: 20rpx;
  left: 19rpx;
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: -13rpx 17rpx 0 -5rpx currentColor, 13rpx 17rpx 0 -5rpx currentColor;
}

.stat-icon--confirm::before {
  inset: 18rpx 20rpx;
  border-radius: 7rpx;
  background: currentColor;
}

.stat-icon--confirm::after {
  top: 35rpx;
  left: 29rpx;
  width: 18rpx;
  height: 10rpx;
  border-bottom: 5rpx solid #fff;
  border-left: 5rpx solid #fff;
  transform: rotate(-45deg);
}

.stat-icon--invite::before {
  inset: 21rpx 14rpx;
  border-radius: 7rpx;
  background: currentColor;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

.stat-icon--invite::after {
  top: 12rpx;
  right: 13rpx;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #ff2e3f;
}

.stat-copy {
  min-width: 0;
}

.stat-label {
  color: #10172d;
  font-size: 24rpx;
  font-weight: 900;
  line-height: 1.2;
}

.stat-value-row {
  display: flex;
  align-items: baseline;
  gap: 8rpx;
  margin-top: 7rpx;
}

.stat-value {
  color: #10172d;
  font-size: 36rpx;
  font-weight: 900;
  line-height: 1;
}

.stat-unit {
  color: #283f67;
  font-size: 23rpx;
  font-weight: 700;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.section-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.15;
}

.todo-card,
.room-card,
.activity-card {
  border-radius: 24rpx;
  box-shadow: 0 14rpx 38rpx rgba(20, 40, 70, 0.055);
}

.todo-card {
  display: grid;
  grid-template-columns: 108rpx minmax(0, 1fr) 144rpx;
  align-items: center;
  gap: 20rpx;
  padding: 24rpx;
}

.todo-icon {
  width: 94rpx;
  height: 94rpx;
  background: #eafbf1;
  color: #13bd68;
}

.todo-icon--doc {
  background: #ecf5ff;
  color: #397ef2;
}

.todo-icon--invite::before {
  top: 25rpx;
  left: 22rpx;
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 24rpx 0 0 -3rpx currentColor;
}

.todo-icon--invite::after {
  right: 14rpx;
  bottom: 20rpx;
  width: 34rpx;
  height: 24rpx;
  border-radius: 6rpx;
  background: currentColor;
  box-shadow: inset 0 -11rpx 0 rgba(255, 255, 255, 0.22);
}

.todo-icon--doc::before {
  inset: 24rpx 26rpx;
  border-radius: 8rpx;
  background: currentColor;
  clip-path: polygon(0 0, 72% 0, 100% 28%, 100% 100%, 0 100%);
}

.todo-icon--doc::after {
  right: 18rpx;
  bottom: 19rpx;
  width: 28rpx;
  height: 28rpx;
  border: 5rpx solid #fff;
  border-radius: 50%;
  background: currentColor;
}

.todo-copy {
  min-width: 0;
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
  gap: 12rpx;
}

.todo-title {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.3;
}

.todo-tag,
.room-status,
.activity-status,
.room-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.todo-tag {
  padding: 7rpx 14rpx;
  border-radius: 999rpx;
  font-size: 21rpx;
  font-weight: 900;
}

.todo-tag--orange {
  background: #fff1e8;
  color: #ff7a1a;
}

.todo-tag--purple {
  background: #f0e9ff;
  color: #8058ee;
}

.todo-desc {
  margin-top: 14rpx;
  color: #304b78;
  font-size: 24rpx;
  line-height: 1.45;
}

.todo-button {
  height: 56rpx;
  border-radius: 10rpx;
  font-size: 24rpx;
}

.room-card {
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
  padding: 24rpx;
}

.room-card--invited {
  align-items: center;
}

.room-icon {
  width: 96rpx;
  height: 96rpx;
  background: #eafbf1;
  color: #13bd68;
}

.room-icon--book {
  background: #edf5ff;
  color: #5988f3;
}

.room-icon--joined::before {
  top: 28rpx;
  left: 18rpx;
  width: 60rpx;
  height: 36rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 100% 35%, 50% 70%, 0 35%);
}

.room-icon--joined::after {
  top: 54rpx;
  left: 32rpx;
  width: 32rpx;
  height: 22rpx;
  border-radius: 0 0 18rpx 18rpx;
  background: currentColor;
}

.room-icon--book::before {
  inset: 27rpx 20rpx 22rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.room-icon--book::after {
  top: 31rpx;
  left: 48rpx;
  width: 5rpx;
  height: 38rpx;
  background: #fff;
}

.room-copy {
  min-width: 0;
  flex: 1;
}

.room-title-row {
  gap: 14rpx;
}

.room-title {
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.25;
}

.room-status {
  padding: 7rpx 15rpx;
  border-radius: 10rpx;
  background: #e8faef;
  color: #10ad60;
  font-size: 21rpx;
  font-weight: 900;
}

.room-status--blue {
  background: #edf4ff;
  color: #2177f2;
}

.room-meta {
  margin-top: 13rpx;
  color: #304b78;
  font-size: 23rpx;
  line-height: 1.35;
}

.room-desc {
  margin-top: 14rpx;
  color: #304b78;
  font-size: 24rpx;
  line-height: 1.45;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 16rpx;
}

.room-chip {
  padding: 8rpx 14rpx;
  border-radius: 8rpx;
  background: #ecfbf1;
  color: #08a957;
  font-size: 20rpx;
  font-weight: 900;
}

.room-chip--warn {
  background: #fff0e5;
  color: #ff6c17;
}

.room-button {
  width: 146rpx;
  height: 58rpx;
  justify-self: flex-end;
  margin-top: 18rpx;
  margin-left: auto;
  border-radius: 10rpx;
  font-size: 24rpx;
}

.invite-button {
  width: 140rpx;
  height: 56rpx;
  border-radius: 10rpx;
  font-size: 24rpx;
}

.section-head {
  justify-content: space-between;
}

.all-link {
  gap: 8rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #08a85c;
  font-size: 25rpx;
  font-weight: 900;
}

.all-link::after {
  display: none;
}

.link-arrow,
.row-arrow {
  position: relative;
  width: 18rpx;
  height: 18rpx;
  flex: 0 0 auto;
  color: currentColor;
}

.link-arrow::before,
.row-arrow::before {
  inset: 0;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.activity-card {
  padding: 0 22rpx;
}

.activity-row {
  min-height: 84rpx;
  gap: 16rpx;
  padding: 16rpx 0;
}

.activity-row + .activity-row {
  border-top: 1rpx solid #eef2f6;
}

.activity-icon {
  width: 54rpx;
  height: 54rpx;
  border-radius: 12rpx;
}

.activity-icon--meeting {
  background: #eafbf1;
  color: #13bd68;
}

.activity-icon--doc {
  background: #ecf5ff;
  color: #397ef2;
}

.activity-icon--calendar {
  background: #f2edff;
  color: #8758ee;
}

.activity-icon::before {
  inset: 15rpx 13rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.activity-icon--meeting::before {
  clip-path: polygon(50% 0, 100% 28%, 100% 100%, 0 100%, 0 28%);
}

.activity-icon--doc::before {
  clip-path: polygon(0 0, 72% 0, 100% 28%, 100% 100%, 0 100%);
}

.activity-icon--calendar::before {
  clip-path: polygon(0 16%, 100% 16%, 100% 100%, 0 100%);
}

.activity-copy {
  min-width: 0;
  flex: 1;
}

.activity-title {
  color: #10172d;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.25;
}

.activity-desc {
  margin-top: 8rpx;
  color: #304b78;
  font-size: 22rpx;
  line-height: 1.25;
}

.activity-status {
  min-width: 82rpx;
  padding: 8rpx 12rpx;
  border-radius: 8rpx;
  font-size: 22rpx;
  font-weight: 900;
}

.activity-status--orange {
  background: #fff1e8;
  color: #ff7a1a;
}

.activity-status--green {
  background: #ebfbf2;
  color: #08a85c;
}

.activity-status--blue {
  background: #edf5ff;
  color: #2177f2;
}

.row-arrow {
  color: #8b96aa;
}

@media (max-width: 390px) {
  .content {
    gap: 28rpx;
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .stats-card {
    padding: 22rpx 20rpx;
  }

  .stat-item {
    gap: 12rpx;
  }

  .stat-icon {
    width: 60rpx;
    height: 60rpx;
  }

  .stat-label,
  .stat-unit {
    font-size: 21rpx;
  }

  .stat-value {
    font-size: 31rpx;
  }

  .todo-card {
    grid-template-columns: 82rpx minmax(0, 1fr) 124rpx;
    gap: 14rpx;
    padding: 22rpx;
  }

  .todo-icon,
  .room-icon {
    width: 76rpx;
    height: 76rpx;
  }

  .todo-title,
  .room-title {
    font-size: 25rpx;
  }

  .todo-desc,
  .room-desc,
  .room-meta {
    font-size: 21rpx;
  }

  .todo-button,
  .invite-button,
  .room-button {
    width: 118rpx;
    font-size: 22rpx;
  }
}

@media (max-width: 374px) {
  .hero {
    padding-left: 108rpx;
  }

  .stats-card {
    grid-template-columns: 1fr;
    gap: 18rpx;
  }

  .stat-item + .stat-item {
    padding-top: 18rpx;
    padding-left: 0;
    border-top: 1rpx solid #e4edf0;
    border-left: 0;
  }

  .todo-card {
    grid-template-columns: 72rpx minmax(0, 1fr);
  }

  .todo-button {
    grid-column: 2;
    margin-left: 0;
  }

  .room-card {
    gap: 16rpx;
  }
}
</style>
