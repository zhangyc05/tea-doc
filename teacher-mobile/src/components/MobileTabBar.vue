<script setup lang="ts">
type TabKey = 'todo' | 'archive' | 'assistant' | 'activity' | 'profile'

const props = defineProps<{
  active: TabKey
}>()

const tabs: Array<{ key: TabKey; text: string; path: string }> = [
  { key: 'todo', text: '待办', path: '/pages/todo/index' },
  { key: 'archive', text: '档案', path: '/pages/archive/index' },
  { key: 'assistant', text: 'AI 助手', path: '/pages/activity/index' },
  { key: 'activity', text: '活动', path: '/pages/activity/index' },
  { key: 'profile', text: '我的', path: '/pages/profile/index' },
]

function handleTab(path: string) {
  uni.redirectTo({ url: path })
}
</script>

<template>
  <view class="mobile-tabbar">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      class="mobile-tabbar__item"
      :class="{
        'mobile-tabbar__item--active': props.active === tab.key,
        'mobile-tabbar__item--center': tab.key === 'assistant',
      }"
      @tap="handleTab(tab.path)"
    >
      <view class="mobile-tabbar__icon" :class="`mobile-tabbar__icon--${tab.key}`"></view>
      <text>{{ tab.text }}</text>
    </button>
  </view>
</template>

<style lang="scss" scoped>
@import '../styles/tokens.scss';

.mobile-tabbar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  display: flex;
  height: calc(138rpx + env(safe-area-inset-bottom));
  align-items: flex-start;
  justify-content: space-around;
  padding: 16rpx 20rpx env(safe-area-inset-bottom);
  border: 1rpx solid rgba(234, 238, 246, 0.95);
  border-bottom: 0;
  border-radius: 38rpx 38rpx 0 0;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 -18rpx 52rpx rgba(21, 40, 74, 0.08);
}

.mobile-tabbar__item {
  position: relative;
  display: flex;
  width: 118rpx;
  height: 104rpx;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 0;
  outline: 0;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  box-shadow: none;
  color: #667089;
  font-size: 26rpx;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
}

.mobile-tabbar__item::after {
  display: none;
  border: 0;
}

.mobile-tabbar__item--active {
  color: $teacher-mobile-primary;
}

.mobile-tabbar__item--center {
  color: $teacher-mobile-primary;
  transform: translateY(-38rpx);
}

.mobile-tabbar__item--center text {
  width: 112rpx;
  text-align: center;
}

.mobile-tabbar__icon {
  position: relative;
  width: 48rpx;
  height: 48rpx;
  margin-bottom: 10rpx;
  background: transparent;
  opacity: 0.9;
}

.mobile-tabbar__icon::before,
.mobile-tabbar__icon::after {
  position: absolute;
  content: '';
}

.mobile-tabbar__icon--todo::before {
  inset: 9rpx 5rpx 4rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 100% 42%, 100% 100%, 66% 100%, 66% 64%, 34% 64%, 34% 100%, 0 100%, 0 42%);
}

.mobile-tabbar__icon--archive::before {
  inset: 14rpx 4rpx 8rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.mobile-tabbar__icon--archive::after {
  top: 9rpx;
  left: 8rpx;
  width: 22rpx;
  height: 10rpx;
  border-radius: 6rpx 6rpx 0 0;
  background: currentColor;
}

.mobile-tabbar__icon--activity::before {
  inset: 7rpx;
  background: currentColor;
  clip-path: polygon(0 0, 42% 0, 42% 42%, 0 42%, 0 0, 58% 0, 100% 0, 100% 42%, 58% 42%, 58% 0, 0 58%, 42% 58%, 42% 100%, 0 100%, 0 58%, 58% 58%, 100% 58%, 100% 100%, 58% 100%);
}

.mobile-tabbar__icon--profile::before {
  top: 6rpx;
  left: 15rpx;
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background: currentColor;
}

.mobile-tabbar__icon--profile::after {
  right: 7rpx;
  bottom: 4rpx;
  left: 7rpx;
  height: 20rpx;
  border-radius: 22rpx 22rpx 8rpx 8rpx;
  background: currentColor;
}

.mobile-tabbar__icon--assistant {
  width: 100rpx;
  height: 100rpx;
  margin-bottom: 4rpx;
  border: 14rpx solid #f7fbff;
  border-radius: 50%;
  background: linear-gradient(135deg, #17ce72, #08b85a);
  box-shadow: 0 12rpx 32rpx rgba(7, 178, 86, 0.24);
  opacity: 1;
}

.mobile-tabbar__icon--assistant::before {
  top: 30rpx;
  left: 24rpx;
  width: 52rpx;
  height: 34rpx;
  border-radius: 14rpx;
  background: #eafff2;
}

.mobile-tabbar__icon--assistant::after {
  top: 42rpx;
  left: 37rpx;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #09b85a;
  box-shadow: 19rpx 0 0 #09b85a;
}
</style>
