<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'

type TodoTone = 'blue' | 'orange' | 'purple'

const filters = ['全部(6)', '待确认(2)', '待补充(2)', '可完善(2)']

const todos: Array<{
  tag: string
  title: string
  desc: string
  state: string
  action: string
  tone: TodoTone
  icon: 'file' | 'clock' | 'folder' | 'pen' | 'note'
}> = [
  {
    tag: '待确认',
    title: '确认一条培训证书',
    desc: '系统已帮你识别，请确认是否属于本人',
    state: '待你确认',
    action: '去确认',
    tone: 'blue',
    icon: 'file',
  },
  {
    tag: '待确认',
    title: '确认一条培训学时记录',
    desc: '系统已识别一条培训学时，请确认是否属于本人',
    state: '待你确认',
    action: '去确认',
    tone: 'blue',
    icon: 'clock',
  },
  {
    tag: '待补充',
    title: '补一条企业实践记录',
    desc: '用于完善当前聘期要求依据',
    state: '用于聘期要求',
    action: '去补充',
    tone: 'orange',
    icon: 'folder',
  },
  {
    tag: '待补充',
    title: '补充一份培训证书',
    desc: '用于完善培训记录依据',
    state: '用于培训记录',
    action: '去补充',
    tone: 'orange',
    icon: 'folder',
  },
  {
    tag: '可完善',
    title: '继续整理教学反思',
    desc: '系统已保存草稿，可随时完善',
    state: '已保存草稿',
    action: '继续完善',
    tone: 'purple',
    icon: 'pen',
  },
  {
    tag: '可完善',
    title: '继续整理企业实践总结',
    desc: '系统已生成草稿，可继续完善',
    state: '已生成草稿',
    action: '继续完善',
    tone: 'purple',
    icon: 'note',
  },
]

function goBack() {
  uni.navigateBack()
}

function goCertificateDetail() {
  uni.navigateTo({ url: '/pages/todo/certificate-detail/index' })
}

function showPendingAction(title: string) {
  uni.showToast({ title, icon: 'none' })
}
</script>

<template>
  <MobilePageShell class="all-todo-page" active="todo">
    <view class="system-status" aria-hidden="true">
      <text class="system-status__time">9:41</text>
      <view class="system-status__icons">
        <view class="status-signal"></view>
        <view class="status-wifi"></view>
        <view class="status-battery"></view>
      </view>
    </view>

    <view class="nav-head">
      <button class="back-button" aria-label="返回" @tap="goBack">
        <view class="back-button__icon"></view>
      </button>
      <text class="nav-title">全部待办</text>
      <view class="nav-spacer"></view>
    </view>

    <view class="filter-row">
      <button
        v-for="(filter, index) in filters"
        :key="filter"
        class="filter-pill"
        :class="{ 'filter-pill--active': index === 0 }"
      >
        {{ filter }}
      </button>
    </view>

    <MobileCard class="todo-list-card">
      <view v-for="(item, index) in todos" :key="item.title" class="todo-list-row">
        <view class="todo-icon" :class="[`todo-icon--${item.tone}`, `todo-icon--${item.icon}`]">
          <view class="todo-icon__glyph"></view>
        </view>
        <view class="todo-main">
          <MobileStatusTag :tone="item.tone">{{ item.tag }}</MobileStatusTag>
          <text class="todo-title">{{ item.title }}</text>
          <text class="todo-desc">{{ item.desc }}</text>
        </view>
        <view class="todo-side">
          <text class="todo-state" :class="`todo-state--${item.tone}`">{{ item.state }}</text>
          <MobileActionButton
            class="todo-action"
            variant="outline"
            @tap="index === 0 ? goCertificateDetail() : showPendingAction(item.action)"
          >
            {{ item.action }}
          </MobileActionButton>
        </view>
      </view>
    </MobileCard>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.all-todo-page {
  padding-top: calc(var(--status-bar-height) + 8rpx);
}

.system-status,
.system-status__icons,
.nav-head,
.filter-row,
.todo-list-row,
.todo-side,
.todo-action {
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

.nav-head {
  height: 96rpx;
  justify-content: space-between;
}

.back-button,
.filter-pill {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.back-button {
  position: relative;
  width: 72rpx;
  height: 72rpx;
}

.back-button::after,
.filter-pill::after {
  display: none;
  border: 0;
}

.back-button__icon {
  position: absolute;
  top: 20rpx;
  left: 22rpx;
  width: 28rpx;
  height: 28rpx;
  border-bottom: 6rpx solid #0b122a;
  border-left: 6rpx solid #0b122a;
  transform: rotate(45deg);
}

.nav-title {
  color: #10172d;
  font-size: 42rpx;
  font-weight: 900;
  letter-spacing: 0;
}

.nav-spacer {
  width: 72rpx;
}

.filter-row {
  justify-content: space-between;
  gap: 18rpx;
  margin: 20rpx 6rpx 24rpx;
}

.filter-pill {
  display: flex;
  box-sizing: border-box;
  height: 58rpx;
  min-width: 128rpx;
  align-items: center;
  justify-content: center;
  padding: 0 22rpx;
  border-radius: 14rpx;
  background: rgba(247, 249, 253, 0.92);
  color: #4d5871;
  font-size: 27rpx;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
}

.filter-pill--active {
  border: 2rpx solid $teacher-mobile-primary;
  background: #ebfff3;
  color: $teacher-mobile-primary-dark;
}

.todo-list-card {
  padding: 30rpx 36rpx 16rpx;
  border-radius: 34rpx;
}

.todo-list-row {
  gap: 28rpx;
  min-height: 120rpx;
  padding: 12rpx 0 20rpx;
  border-bottom: 1rpx solid #edf1f6;
}

.todo-list-row:last-child {
  border-bottom: 0;
}

.todo-icon {
  position: relative;
  flex: 0 0 auto;
  width: 82rpx;
  height: 82rpx;
  border-radius: 24rpx;
}

.todo-icon--blue {
  background: #eaf3ff;
}

.todo-icon--orange {
  background: #fff1e8;
}

.todo-icon--purple {
  background: #f3e8ff;
}

.todo-icon__glyph {
  position: absolute;
  inset: 25rpx 29rpx;
  border: 7rpx solid currentColor;
  border-radius: 7rpx;
}

.todo-icon--blue .todo-icon__glyph {
  color: #1b77e8;
}

.todo-icon--orange .todo-icon__glyph {
  color: #ff6b12;
}

.todo-icon--purple .todo-icon__glyph {
  color: #9b42f5;
}

.todo-icon--folder .todo-icon__glyph {
  top: 31rpx;
  right: 24rpx;
  bottom: 27rpx;
  left: 24rpx;
  border-radius: 8rpx;
}

.todo-icon--pen .todo-icon__glyph {
  width: 46rpx;
  height: 46rpx;
  border-radius: 6rpx;
  transform: skew(-12deg);
}

.todo-icon--clock .todo-icon__glyph::after {
  position: absolute;
  right: -14rpx;
  bottom: -14rpx;
  width: 26rpx;
  height: 26rpx;
  border: 5rpx solid currentColor;
  border-radius: 50%;
  background: #eaf3ff;
  content: '';
}

.todo-main {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.todo-title {
  margin-top: 13rpx;
  color: #080d1e;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.2;
}

.todo-desc {
  margin-top: 13rpx;
  color: #52617b;
  font-size: 23rpx;
  line-height: 1.25;
}

.todo-side {
  width: 154rpx;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: flex-end;
}

.todo-state {
  color: #ff1f39;
  font-size: 27rpx;
  font-weight: 900;
  line-height: 1.2;
  white-space: nowrap;
}

.todo-state--orange {
  color: #ff6815;
}

.todo-state--purple {
  color: #ff6815;
}

.todo-action {
  width: 138rpx;
  height: 62rpx;
  margin-top: 24rpx;
  border-radius: 14rpx;
  font-size: 26rpx;
}

@media (max-width: 374px) {
  .filter-row {
    gap: 10rpx;
    margin-right: 0;
    margin-left: 0;
  }

  .filter-pill {
    min-width: 118rpx;
    padding: 0 14rpx;
    font-size: 25rpx;
  }

  .todo-list-card {
    padding: 30rpx 26rpx 16rpx;
  }

  .todo-list-row {
    gap: 20rpx;
  }

  .todo-icon {
    width: 82rpx;
    height: 82rpx;
    border-radius: 22rpx;
  }

  .todo-title {
    font-size: 29rpx;
  }

  .todo-desc {
    font-size: 23rpx;
  }

  .todo-side {
    width: 132rpx;
  }

  .todo-state {
    font-size: 24rpx;
  }

  .todo-action {
    width: 122rpx;
    height: 62rpx;
    font-size: 25rpx;
  }
}
</style>
