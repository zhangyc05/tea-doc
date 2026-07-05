<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../components/MobileActionButton.vue'
import MobileCard from '../../components/MobileCard.vue'
import MobileIcon from '../../components/MobileIcon.vue'
import MobilePageShell from '../../components/MobilePageShell.vue'
import MobileStatusTag from '../../components/MobileStatusTag.vue'
import { getHomeTodoItems, getRecentTodoDynamics, getTodoActionUrl, type MobileTodoItem } from '../../stores/todoStore'

const visibleTodoItems = computed(() => getHomeTodoItems())
const todoDynamics = computed(() => getRecentTodoDynamics())

function goAllTodo() {
  uni.navigateTo({ url: '/pages/todo/all/index' })
}

function showTodoAction(item: MobileTodoItem) {
  const actionUrl = getTodoActionUrl(item.id)
  if (actionUrl) {
    uni.navigateTo({ url: actionUrl })
  }
}

function goAllDynamics() {
  uni.navigateTo({ url: '/pages/todo/dynamics/index' })
}

function showNoticeFeedback() {
  uni.showToast({
    title: '消息通知为本地模拟入口，当前展示待办摘要',
    icon: 'none',
  })
}
</script>

<template>
  <MobilePageShell class="todo-page" active="todo">
    <view class="hero-head">
      <view class="hero-head__copy">
        <view class="hero-title-line">
          <text class="hero-title">上午好， 林老师</text>
          <MobileIcon class="seed-icon" name="seed" tone="green" size="plain" shape="none" />
        </view>
        <text class="hero-meta">智能制造学院 ｜ 讲师</text>
        <text class="hero-meta hero-meta--period">2026 年度发展周期 ｜ 聘期第 2 年</text>
      </view>
      <button class="notice-button" aria-label="消息通知" @tap="showNoticeFeedback">
        <wd-badge class="notice-button__badge-wrap" :model-value="5" type="danger" :top="4" :right="4">
          <MobileIcon class="notice-button__icon" name="bell" tone="dark" size="md" shape="none" />
        </wd-badge>
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
        <MobileIcon class="todo-visual" :name="item.icon" :tone="item.tone" size="lg" />
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

      <view v-for="item in todoDynamics" :key="item.id" class="dynamic-row">
        <MobileIcon class="dynamic-icon" :name="item.icon" :tone="item.tone" size="sm" shape="circle" />
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
  font-size: 44rpx;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.08;
}

.seed-icon {
  width: 40rpx;
  height: 44rpx;
  flex: 0 0 40rpx;
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

.notice-button__badge-wrap {
  position: absolute;
  top: 16rpx;
  right: 14rpx;
  width: 58rpx;
  height: 58rpx;
}

.notice-button__icon {
  width: 58rpx;
  height: 58rpx;
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
  font-size: 40rpx;
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
  width: 92rpx;
  height: 92rpx;
  flex: 0 0 92rpx;
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
