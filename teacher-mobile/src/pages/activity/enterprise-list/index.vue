<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

type PracticeTone = 'green' | 'orange' | 'blue'

const filters = ['全部', '进行中', '待归档', '已归档', '需补充']

const records: Array<{
  company: string
  role: string
  date: string
  state: string
  note: string
  action: string
  tone: PracticeTone
}> = [
  {
    company: '山东某智能装备有限公司',
    role: '软件开发工程师',
    date: '2026-05-10 至 2026-05-20',
    state: '进行中',
    note: '已记录 8 天',
    action: '继续记录',
    tone: 'green',
  },
  {
    company: '济南智能制造实训基地',
    role: '设备调试与产线观察',
    date: '2026-03-01 至 2026-03-08',
    state: '需补充',
    note: '待补充材料',
    action: '补充材料',
    tone: 'orange',
  },
  {
    company: '青岛某装备有限公司',
    role: '工业机器人应用实践',
    date: '2026-01-05 至 2026-01-16',
    state: '已归档',
    note: '10 天',
    action: '查看详情',
    tone: 'blue',
  },
]

function goBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="enterprise-list-page">
    <view class="hero">
      <view class="hero-leaf"></view>
      <MobileNavbar title="" size="compact" @back="goBack" />
      <text class="hero-title">企业实践</text>
      <text class="hero-subtitle">查看年度实践完成情况，记录实践过程并完成归档</text>
    </view>

    <view class="content">
      <MobileCard class="year-card">
        <view class="year-copy">
          <text class="year-title">2026 年度企业实践</text>
          <view class="progress-line">
            <text>已完成</text>
            <text class="done-days">18</text>
            <text>/ 30 天</text>
            <text class="require-tag">未满足年度要求</text>
          </view>
          <text class="remain-line">还差 12 天</text>
          <text class="year-desc">系统会根据已归档实践记录统计年度完成天数。</text>
        </view>
        <view class="calendar-art">
          <view class="calendar-rings">
            <view></view>
            <view></view>
          </view>
          <view class="calendar-bars">
            <view></view>
            <view></view>
            <view></view>
          </view>
          <view class="calendar-check"></view>
        </view>
        <view class="year-tip">
          <view class="info-dot">i</view>
          <text>当前已有进行中的企业实践，请先继续记录</text>
        </view>
      </MobileCard>

      <MobileCard class="todo-card">
        <text class="section-title">当前需要处理</text>
        <view class="todo-row">
          <view class="file-icon"></view>
          <view class="todo-copy">
            <text class="todo-title">山东某智能装备有限公司企业实践</text>
            <view class="todo-meta">
              <text class="state-green">进行中</text>
              <text>|</text>
              <text>已记录 8 天</text>
            </view>
            <text class="todo-note">今天可以补充一条实践日志</text>
          </view>
          <MobileActionButton class="continue-button" variant="outline">继续记录</MobileActionButton>
        </view>
      </MobileCard>

      <MobileCard class="records-card">
        <view class="section-head">
          <text class="section-title">实践记录</text>
          <view class="year-select">
            <text>2026 年度</text>
            <view class="down-icon"></view>
          </view>
        </view>

        <view class="filter-row">
          <text v-for="item in filters" :key="item" class="filter-chip" :class="{ 'filter-chip--active': item === '进行中' }">{{ item }}</text>
        </view>

        <view class="record-list">
          <view v-for="item in records" :key="item.company" class="record-row">
            <view class="record-icon" :class="`record-icon--${item.tone}`"></view>
            <view class="record-copy">
              <text class="record-title">{{ item.company }}</text>
              <text class="record-meta">{{ item.role }} ｜ {{ item.date }}</text>
              <view class="record-state-line" :class="`record-state-line--${item.tone}`">
                <text>{{ item.state }}</text>
                <text>|</text>
                <text>{{ item.note }}</text>
              </view>
            </view>
            <MobileActionButton class="record-button" variant="outline">{{ item.action }}</MobileActionButton>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="history-card">
        <view class="history-icon"></view>
        <view class="history-copy">
          <text class="history-title">有已完成但未记录的实践？</text>
          <text class="history-desc">可以补充附件资料，提交后等待确认。</text>
        </view>
        <MobileActionButton class="history-button" variant="outline">补充历史实践</MobileActionButton>
      </MobileCard>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.enterprise-list-page {
  min-height: 100vh;
  padding-bottom: calc(190rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 82% 8%, rgba(210, 250, 228, 0.72), transparent 24%),
    linear-gradient(180deg, #f8fffb 0%, #ffffff 18%, #f6fbff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  position: relative;
  padding: calc(var(--status-bar-height) + 14rpx) 28rpx 28rpx;
  overflow: hidden;
}

.hero-title,
.hero-subtitle,
.year-title,
.year-desc,
.remain-line,
.section-title,
.todo-title,
.todo-note,
.record-title,
.record-meta,
.history-title,
.history-desc {
  display: block;
}

.hero-title {
  margin-left: 62rpx;
  color: #10172d;
  font-size: 58rpx;
  font-weight: 900;
  line-height: 1.12;
}

.hero-subtitle {
  margin: 10rpx 0 0 62rpx;
  color: #263b67;
  font-size: 27rpx;
  line-height: 1.42;
}

.hero-leaf {
  position: absolute;
  right: 50rpx;
  top: 68rpx;
  width: 150rpx;
  height: 128rpx;
  opacity: 0.42;
}

.hero-leaf::before,
.hero-leaf::after {
  position: absolute;
  border-radius: 999rpx 999rpx 0 999rpx;
  background: #a5ecc6;
  content: '';
}

.hero-leaf::before {
  right: 10rpx;
  width: 60rpx;
  height: 104rpx;
  transform: rotate(35deg);
}

.hero-leaf::after {
  right: 80rpx;
  top: 44rpx;
  width: 54rpx;
  height: 78rpx;
  transform: rotate(-56deg);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  padding: 0 28rpx;
}

.year-card,
.todo-card,
.records-card,
.history-card {
  padding: 30rpx;
}

.year-card {
  position: relative;
  overflow: hidden;
}

.year-copy {
  position: relative;
  z-index: 1;
  padding-right: 220rpx;
}

.year-title {
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
}

.progress-line,
.year-tip,
.todo-row,
.todo-meta,
.section-head,
.filter-row,
.record-row,
.record-state-line,
.history-card,
.year-select {
  display: flex;
  align-items: center;
}

.progress-line {
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 26rpx;
  color: #10172d;
  font-size: 46rpx;
  font-weight: 900;
  line-height: 1;
}

.done-days {
  color: $teacher-mobile-primary;
  font-size: 64rpx;
}

.require-tag {
  margin-left: 32rpx;
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  background: #fff4eb;
  color: #ff6b1a;
  font-size: 25rpx;
  font-weight: 800;
}

.remain-line {
  margin-top: 18rpx;
  color: #263b67;
  font-size: 29rpx;
  font-weight: 800;
}

.year-desc {
  margin-top: 22rpx;
  color: #263b67;
  font-size: 25rpx;
  line-height: 1.45;
}

.calendar-art {
  position: absolute;
  right: 56rpx;
  top: 72rpx;
  width: 138rpx;
  height: 128rpx;
  border-radius: 18rpx;
  background: linear-gradient(180deg, #dff8ea, #f7fffb);
  box-shadow: 0 18rpx 36rpx rgba(35, 51, 87, 0.08);
}

.calendar-art::before {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 36rpx;
  border-radius: 18rpx 18rpx 0 0;
  background: #75df91;
  content: '';
}

.calendar-rings {
  position: absolute;
  top: -14rpx;
  right: 26rpx;
  left: 26rpx;
  display: flex;
  justify-content: space-between;
}

.calendar-rings view {
  width: 14rpx;
  height: 34rpx;
  border-radius: 999rpx;
  background: #2bd46f;
}

.calendar-bars {
  position: absolute;
  left: 30rpx;
  bottom: 28rpx;
  display: flex;
  align-items: flex-end;
  gap: 10rpx;
}

.calendar-bars view {
  width: 14rpx;
  border-radius: 6rpx;
  background: #bff2d4;
}

.calendar-bars view:nth-child(1) {
  height: 28rpx;
}

.calendar-bars view:nth-child(2) {
  height: 42rpx;
}

.calendar-bars view:nth-child(3) {
  height: 58rpx;
}

.calendar-check {
  position: absolute;
  right: -18rpx;
  bottom: 18rpx;
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.calendar-check::before {
  position: absolute;
  left: 20rpx;
  top: 24rpx;
  width: 30rpx;
  height: 16rpx;
  border-left: 8rpx solid #fff;
  border-bottom: 8rpx solid #fff;
  border-radius: 3rpx;
  content: '';
  transform: rotate(-45deg);
}

.year-tip {
  gap: 14rpx;
  margin-top: 34rpx;
  padding: 18rpx 22rpx;
  border-radius: 12rpx;
  background: linear-gradient(90deg, #e9fbf1, #f3fff8);
  color: #53617b;
  font-size: 25rpx;
}

.info-dot {
  display: flex;
  width: 28rpx;
  height: 28rpx;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 3rpx solid $teacher-mobile-primary;
  border-radius: 50%;
  color: $teacher-mobile-primary-dark;
  font-size: 20rpx;
  font-weight: 900;
}

.section-title {
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
}

.todo-row {
  gap: 24rpx;
  margin-top: 28rpx;
}

.file-icon,
.record-icon,
.history-icon {
  position: relative;
  flex: 0 0 auto;
  border-radius: 18rpx;
  background: #e9fbf1;
}

.file-icon {
  width: 86rpx;
  height: 86rpx;
}

.file-icon::before {
  position: absolute;
  inset: 20rpx 24rpx;
  border-radius: 8rpx;
  background: linear-gradient(180deg, #1fd07b, #62dfaa);
  content: '';
}

.todo-copy {
  min-width: 0;
  flex: 1;
}

.todo-title {
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.35;
}

.todo-meta {
  gap: 14rpx;
  margin-top: 14rpx;
  color: #263b67;
  font-size: 25rpx;
}

.state-green {
  color: $teacher-mobile-primary-dark;
  font-weight: 900;
}

.todo-note {
  margin-top: 10rpx;
  color: #53617b;
  font-size: 24rpx;
}

.continue-button {
  width: 154rpx;
  height: 64rpx;
  flex: 0 0 auto;
  font-size: 25rpx;
}

.section-head {
  justify-content: space-between;
  gap: 20rpx;
}

.year-select {
  gap: 10rpx;
  padding: 14rpx 20rpx;
  border: 1rpx solid #dbe3ef;
  border-radius: 14rpx;
  color: #263b67;
  font-size: 27rpx;
  font-weight: 700;
}

.down-icon {
  width: 0;
  height: 0;
  border-top: 10rpx solid #263b67;
  border-right: 8rpx solid transparent;
  border-left: 8rpx solid transparent;
}

.filter-row {
  justify-content: space-between;
  gap: 14rpx;
  margin-top: 26rpx;
}

.filter-chip {
  min-width: 98rpx;
  padding: 12rpx 16rpx;
  border-radius: 999rpx;
  background: #f2f4f8;
  color: #263b67;
  font-size: 25rpx;
  text-align: center;
}

.filter-chip--active {
  background: #e3fbec;
  color: $teacher-mobile-primary-dark;
  font-weight: 900;
}

.record-list {
  margin-top: 26rpx;
  border: 1rpx solid #e2e9f2;
  border-radius: 18rpx;
  overflow: hidden;
}

.record-row {
  gap: 22rpx;
  padding: 26rpx 20rpx;
  border-bottom: 1rpx solid #edf1f6;
  background: rgba(255, 255, 255, 0.82);
}

.record-row:last-child {
  border-bottom: 0;
}

.record-icon {
  width: 78rpx;
  height: 78rpx;
}

.record-icon::before {
  position: absolute;
  inset: 18rpx 24rpx;
  border-radius: 8rpx;
  content: '';
}

.record-icon--green::before {
  background: $teacher-mobile-primary;
}

.record-icon--orange {
  background: #fff4e6;
}

.record-icon--orange::before {
  background: #ff9f1a;
}

.record-icon--blue {
  background: #eaf4ff;
}

.record-icon--blue::before {
  background: #2085ff;
}

.record-copy {
  min-width: 0;
  flex: 1;
}

.record-title {
  color: #10172d;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.35;
}

.record-meta {
  margin-top: 12rpx;
  color: #53617b;
  font-size: 23rpx;
  line-height: 1.35;
}

.record-state-line {
  gap: 12rpx;
  margin-top: 10rpx;
  font-size: 25rpx;
  font-weight: 900;
}

.record-state-line--green,
.record-state-line--blue {
  color: $teacher-mobile-primary-dark;
}

.record-state-line--orange {
  color: #ff6b1a;
}

.record-button {
  width: 140rpx;
  height: 64rpx;
  flex: 0 0 auto;
  font-size: 25rpx;
}

.history-card {
  gap: 20rpx;
}

.history-icon {
  width: 76rpx;
  height: 76rpx;
}

.history-icon::before {
  position: absolute;
  inset: 18rpx;
  border: 4rpx solid $teacher-mobile-primary;
  border-radius: 8rpx;
  content: '';
}

.history-copy {
  min-width: 0;
  flex: 1;
}

.history-title {
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
}

.history-desc {
  margin-top: 10rpx;
  color: #53617b;
  font-size: 24rpx;
}

.history-button {
  width: 188rpx;
  height: 62rpx;
  flex: 0 0 auto;
  font-size: 25rpx;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .hero-title,
  .hero-subtitle {
    margin-left: 52rpx;
  }

  .hero-title {
    font-size: 48rpx;
  }

  .year-card,
  .todo-card,
  .records-card,
  .history-card {
    padding: 22rpx;
  }

  .year-copy {
    padding-right: 0;
  }

  .calendar-art {
    right: 20rpx;
    top: 92rpx;
    width: 96rpx;
    height: 88rpx;
    opacity: 0.72;
  }

  .progress-line {
    font-size: 38rpx;
  }

  .done-days {
    font-size: 54rpx;
  }

  .require-tag {
    margin-left: 0;
  }

  .todo-row,
  .record-row,
  .history-card {
    align-items: flex-start;
  }

  .continue-button,
  .history-button {
    width: 132rpx;
    font-size: 22rpx;
  }

  .section-head {
    align-items: flex-start;
  }

  .year-select {
    padding: 10rpx 12rpx;
    font-size: 22rpx;
  }

  .filter-row {
    gap: 8rpx;
  }

  .filter-chip {
    min-width: 62rpx;
    padding: 9rpx 8rpx;
    font-size: 22rpx;
  }

  .record-row {
    gap: 12rpx;
    padding: 24rpx 12rpx;
  }

  .record-icon,
  .file-icon,
  .history-icon {
    width: 62rpx;
    height: 62rpx;
    border-radius: 14rpx;
  }

  .record-title {
    font-size: 25rpx;
  }

  .record-meta,
  .record-state-line {
    font-size: 21rpx;
  }

  .record-button {
    width: 108rpx;
    font-size: 21rpx;
  }
}
</style>
