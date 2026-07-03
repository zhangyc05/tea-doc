<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../components/MobileActionButton.vue'
import MobileCard from '../../components/MobileCard.vue'
import MobilePageShell from '../../components/MobilePageShell.vue'
import MobileStatusTag from '../../components/MobileStatusTag.vue'
import { getHomeTodoItems, type MobileTodoItem } from '../../stores/todoStore'

const visibleTodoItems = computed(() => getHomeTodoItems())

const dynamics = [
  {
    title: '已确认一条精品课程建设课',
    desc: '《智能制造课程建设成果》已完成本人确认',
    time: '今天 09:21',
    tone: 'green',
  },
  {
    title: '培训学时已记录',
    desc: '《数字化教学能力提升》培训学时已更新',
    time: '昨天 16:45',
    tone: 'blue',
  },
  {
    title: '已保存一篇教学反思',
    desc: '《智能制造基础》第5次课后反思已保存草稿',
    time: '03-18 10:30',
    tone: 'orange',
  },
]

function goAllTodo() {
  uni.navigateTo({ url: '/pages/todo/all/index' })
}

function showTodoAction(item: MobileTodoItem) {
  if (item.id === 'certificate-digital-literacy') {
    uni.navigateTo({ url: '/pages/todo/certificate-detail/index' })
    return
  }

  uni.showToast({ title: item.action, icon: 'none' })
}

function goAllDynamics() {
  uni.navigateTo({ url: '/pages/todo/dynamics/index' })
}
</script>

<template>
  <MobilePageShell class="todo-page" active="todo">
    <view class="system-status" aria-hidden="true">
      <text class="system-status__time">9:41</text>
      <view class="system-status__icons">
        <view class="status-signal"></view>
        <view class="status-wifi"></view>
        <view class="status-battery"></view>
      </view>
    </view>

    <view class="hero-head">
      <view class="hero-head__copy">
        <view class="hero-title-line">
          <text class="hero-title">上午好， 林老师</text>
          <view class="seed-mini"></view>
        </view>
        <text class="hero-meta">智能制造学院 ｜ 讲师</text>
        <text class="hero-meta hero-meta--period">2026 年度发展周期 ｜ 聘期第 2 年</text>
      </view>
      <button class="notice-button" aria-label="消息通知">
        <view class="notice-button__bell">
          <view class="notice-button__badge">5</view>
        </view>
      </button>
    </view>

    <MobileCard class="section-card todo-card">
      <view class="todo-card__head">
        <text class="section-title">待办</text>
        <view class="sort-note">
          <text>AI 已按优先级排序</text>
          <text class="sort-note__icon">i</text>
        </view>
      </view>

      <view v-for="item in visibleTodoItems" :key="item.id" class="todo-row">
        <view class="todo-visual" :class="`todo-visual--${item.tone}`">
          <view class="todo-visual__shape"></view>
        </view>
        <view class="todo-row__body">
          <MobileStatusTag :tone="item.tone">{{ item.tag }}</MobileStatusTag>
          <text class="todo-row__title">{{ item.title }}</text>
          <text class="todo-row__desc">{{ item.desc }}</text>
        </view>
        <view class="todo-row__side">
          <text class="todo-row__state" :class="`todo-row__state--${item.tone}`">{{ item.state }}</text>
          <MobileActionButton class="outline-action" variant="outline" arrow @tap="showTodoAction(item)">{{ item.action }}</MobileActionButton>
        </view>
      </view>

      <MobileActionButton class="all-todo-link" variant="link" arrow @tap="goAllTodo">查看全部待办</MobileActionButton>
    </MobileCard>

    <MobileCard class="section-card dynamic-card">
      <view class="dynamic-card__head">
        <text class="section-title">最近动态</text>
        <MobileActionButton class="all-link" variant="link" arrow @tap="goAllDynamics">全部</MobileActionButton>
      </view>

      <view v-for="item in dynamics" :key="item.title" class="dynamic-row">
        <view class="dynamic-icon" :class="`dynamic-icon--${item.tone}`"></view>
        <view class="dynamic-row__body">
          <text class="dynamic-row__title">{{ item.title }}</text>
          <text class="dynamic-row__desc">{{ item.desc }}</text>
        </view>
        <text class="dynamic-row__time">{{ item.time }}</text>
      </view>
    </MobileCard>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../styles/tokens.scss';

.todo-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 16rpx) 28rpx calc(150rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 10% 4%, rgba(232, 252, 242, 0.76), transparent 30%),
    linear-gradient(180deg, #fbfffd 0%, #f7fbff 48%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.system-status,
.system-status__icons,
.hero-head,
.hero-title-line,
.todo-card__head,
.sort-note,
.todo-row,
.todo-row__side,
.outline-action,
.all-todo-link,
.dynamic-card__head,
.dynamic-row,
.all-link {
  display: flex;
  align-items: center;
}

.system-status {
  height: 42rpx;
  justify-content: space-between;
  padding: 0 18rpx;
}

.system-status__time {
  color: #050812;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1;
}

.system-status__icons {
  gap: 14rpx;
}

.status-signal {
  width: 38rpx;
  height: 26rpx;
  background: #050812;
  clip-path: polygon(0 70%, 18% 70%, 18% 100%, 0 100%, 0 70%, 27% 52%, 45% 52%, 45% 100%, 27% 100%, 27% 52%, 54% 32%, 72% 32%, 72% 100%, 54% 100%, 54% 32%, 82% 10%, 100% 10%, 100% 100%, 82% 100%, 82% 10%);
}

.status-wifi {
  position: relative;
  width: 36rpx;
  height: 26rpx;
  border: 8rpx solid #050812;
  border-color: #050812 transparent transparent;
  border-radius: 50%;
}

.status-wifi::after {
  position: absolute;
  right: 7rpx;
  bottom: -9rpx;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #050812;
  content: '';
}

.status-battery {
  position: relative;
  width: 52rpx;
  height: 26rpx;
  border: 4rpx solid #050812;
  border-radius: 8rpx;
}

.status-battery::before {
  position: absolute;
  top: 4rpx;
  left: 4rpx;
  width: 38rpx;
  height: 10rpx;
  border-radius: 4rpx;
  background: #050812;
  content: '';
}

.status-battery::after {
  position: absolute;
  top: 6rpx;
  right: -9rpx;
  width: 5rpx;
  height: 12rpx;
  border-radius: 0 4rpx 4rpx 0;
  background: #050812;
  content: '';
}

.hero-head {
  justify-content: space-between;
  gap: 28rpx;
  padding: 42rpx 10rpx 26rpx;
}

.hero-head__copy {
  min-width: 0;
  flex: 1;
}

.hero-title-line {
  gap: 18rpx;
}

.hero-title {
  display: block;
  color: #080d1f;
  font-size: 54rpx;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.08;
}

.seed-mini {
  position: relative;
  width: 34rpx;
  height: 40rpx;
  flex: 0 0 34rpx;
}

.seed-mini::before,
.seed-mini::after {
  position: absolute;
  top: 10rpx;
  width: 18rpx;
  height: 12rpx;
  border-radius: 18rpx 18rpx 2rpx 18rpx;
  background: $teacher-mobile-primary;
  content: '';
}

.seed-mini::before {
  left: 2rpx;
  transform: rotate(28deg);
}

.seed-mini::after {
  right: 0;
  transform: rotate(-38deg);
}

.seed-mini {
  border-bottom: 5rpx solid $teacher-mobile-primary;
}

.hero-meta {
  display: block;
  margin-top: 22rpx;
  color: #1f325a;
  font-size: 28rpx;
  line-height: 1.2;
}

.hero-meta--period {
  margin-top: 24rpx;
  font-size: 29rpx;
  letter-spacing: 1rpx;
}

.notice-button {
  position: relative;
  width: 88rpx;
  height: 88rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.notice-button::after,
.outline-action::after,
.all-todo-link::after,
.all-link::after {
  display: none;
  border: 0;
}

.notice-button__bell {
  position: absolute;
  right: 8rpx;
  bottom: 8rpx;
  width: 58rpx;
  height: 58rpx;
  border: 6rpx solid #0d1430;
  border-top-color: transparent;
  border-radius: 50% 50% 20rpx 20rpx;
}

.notice-button__bell::before {
  position: absolute;
  top: -13rpx;
  left: 17rpx;
  width: 18rpx;
  height: 12rpx;
  border: 5rpx solid #0d1430;
  border-bottom: 0;
  border-radius: 18rpx 18rpx 0 0;
  content: '';
}

.notice-button__bell::after {
  position: absolute;
  right: 14rpx;
  bottom: -13rpx;
  width: 20rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #0d1430;
  content: '';
}

.notice-button__badge {
  position: absolute;
  top: -28rpx;
  right: -23rpx;
  display: flex;
  width: 50rpx;
  height: 50rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ff1f39;
  color: #fff;
  font-size: 28rpx;
  font-weight: 900;
}

.section-card {
  margin-top: 20rpx;
  padding: 30rpx 32rpx;
  border: 1rpx solid rgba(231, 236, 246, 0.95);
  border-radius: 32rpx;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 22rpx 52rpx rgba(35, 51, 87, 0.07);
}

.todo-card {
  margin-top: 0;
}

.todo-card__head,
.dynamic-card__head {
  justify-content: space-between;
  gap: 24rpx;
}

.todo-card__head {
  justify-content: flex-start;
  padding-bottom: 28rpx;
  border-bottom: 1rpx solid $teacher-mobile-card-border;
}

.section-title {
  color: $teacher-mobile-text-primary;
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1.2;
}

.sort-note {
  gap: 12rpx;
  margin-left: 34rpx;
  color: #1f325a;
  font-size: 27rpx;
  white-space: nowrap;
}

.sort-note__icon {
  display: flex;
  width: 34rpx;
  height: 34rpx;
  align-items: center;
  justify-content: center;
  border: 4rpx solid #1677ff;
  border-radius: 50%;
  color: #1677ff;
  font-size: 22rpx;
  font-weight: 900;
  line-height: 1;
}

.todo-row {
  gap: 24rpx;
  min-height: 124rpx;
  padding: 22rpx 0;
  border-bottom: 1rpx solid $teacher-mobile-card-border;
}

.todo-visual {
  display: flex;
  width: 92rpx;
  height: 92rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 92rpx;
  border-radius: 28rpx;
}

.todo-visual--blue {
  background: linear-gradient(145deg, #eaf4ff, #f8fbff);
  color: #1677ff;
}

.todo-visual--orange {
  background: linear-gradient(145deg, #fff1e8, #fff9f5);
  color: #ff6c1a;
}

.todo-visual--purple {
  background: linear-gradient(145deg, #f2e8ff, #fbf8ff);
  color: #9b4df4;
}

.todo-visual__shape {
  position: relative;
  width: 54rpx;
  height: 66rpx;
  border: 8rpx solid currentColor;
  border-radius: 8rpx;
}

.todo-visual--orange .todo-visual__shape {
  width: 64rpx;
  height: 50rpx;
  border-radius: 10rpx;
}

.todo-visual--orange .todo-visual__shape::before {
  position: absolute;
  top: -24rpx;
  left: 14rpx;
  width: 28rpx;
  height: 20rpx;
  border: 8rpx solid currentColor;
  border-bottom: 0;
  border-radius: 10rpx 10rpx 0 0;
  content: '';
}

.todo-visual--purple .todo-visual__shape {
  width: 58rpx;
  height: 58rpx;
  border: 0;
  border-radius: 8rpx;
  background: currentColor;
}

.todo-row__body {
  min-width: 0;
  flex: 1;
}

.todo-row__title {
  display: block;
  margin-top: 12rpx;
  color: #12182a;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.24;
}

.todo-row__desc {
  display: block;
  margin-top: 10rpx;
  color: #1f325a;
  font-size: 24rpx;
  line-height: 1.34;
}

.todo-row__side {
  width: 154rpx;
  align-items: flex-end;
  flex: 0 0 154rpx;
  flex-direction: column;
}

.todo-row__state {
  margin-bottom: 22rpx;
  font-size: 27rpx;
  font-weight: 900;
  line-height: 1.2;
  white-space: nowrap;
}

.todo-row__state--blue {
  color: #ff1f39;
}

.todo-row__state--orange,
.todo-row__state--purple {
  color: #ff5b1a;
}

.outline-action {
  gap: 10rpx;
  width: 144rpx;
  height: 58rpx;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 2rpx solid $teacher-mobile-primary;
  border-radius: 16rpx;
  background: #fff;
  color: $teacher-mobile-primary-dark;
  font-size: 27rpx;
  font-weight: 900;
  line-height: 58rpx;
  white-space: nowrap;
}

.all-todo-link {
  gap: 18rpx;
  justify-content: center;
  width: 100%;
  height: 58rpx;
  margin-top: 4rpx;
  padding: 0;
  border: 0;
  background: transparent;
  color: $teacher-mobile-primary-dark;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 58rpx;
}

.dynamic-card {
  padding: 26rpx 32rpx;
}

.all-link {
  gap: 8rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: $teacher-mobile-primary-dark;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1;
}

.dynamic-row {
  gap: 28rpx;
  min-height: 84rpx;
  padding: 18rpx 0;
  border-bottom: 1rpx solid $teacher-mobile-card-border;
}

.dynamic-row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.dynamic-icon {
  width: 62rpx;
  height: 62rpx;
  flex: 0 0 62rpx;
  border-radius: 16rpx;
}

.dynamic-icon::before {
  display: block;
  width: 36rpx;
  height: 36rpx;
  margin: 13rpx;
  border-radius: 50%;
  background: currentColor;
  content: '';
}

.dynamic-icon--green {
  background: #e6f8ee;
  color: $teacher-mobile-primary;
}

.dynamic-icon--blue {
  background: #edf6ff;
  color: #1677ff;
}

.dynamic-icon--orange {
  background: #fff1e8;
  color: #ff6c1a;
}

.dynamic-row__body {
  min-width: 0;
  flex: 1;
}

.dynamic-row__title {
  display: block;
  overflow: hidden;
  color: #12182a;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dynamic-row__desc {
  display: block;
  overflow: hidden;
  margin-top: 10rpx;
  color: #1f325a;
  font-size: 23rpx;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dynamic-row__time {
  color: #2d3853;
  font-size: 26rpx;
  line-height: 1.2;
  white-space: nowrap;
}

@media (max-width: 374px) {
  .todo-page {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .hero-title {
    font-size: 52rpx;
  }

  .hero-meta,
  .hero-meta--period {
    font-size: 27rpx;
  }

  .todo-row {
    gap: 20rpx;
  }

  .todo-row__side {
    width: 140rpx;
    flex-basis: 140rpx;
  }

  .outline-action {
    width: 128rpx;
    font-size: 26rpx;
  }
}
</style>
