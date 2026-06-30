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
  uni.switchTab({ url: path })
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
  height: calc($teacher-mobile-tabbar-height + env(safe-area-inset-bottom));
  align-items: flex-start;
  justify-content: space-around;
  padding: 14rpx 20rpx env(safe-area-inset-bottom);
  border-radius: 36rpx 36rpx 0 0;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 -16rpx 44rpx rgba(21, 40, 74, 0.08);
}

.mobile-tabbar__item {
  display: flex;
  width: 112rpx;
  height: 96rpx;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 0;
  color: #667089;
  font-size: 24rpx;
  font-weight: 700;
}

.mobile-tabbar__item--active {
  color: $teacher-mobile-primary;
}

.mobile-tabbar__item--center {
  color: $teacher-mobile-primary;
  transform: translateY(-32rpx);
}

.mobile-tabbar__icon {
  width: 48rpx;
  height: 48rpx;
  margin-bottom: 4rpx;
  border-radius: 14rpx;
  background: currentColor;
  opacity: 0.9;
}

.mobile-tabbar__icon--assistant {
  width: 92rpx;
  height: 92rpx;
  border: 14rpx solid #f7fbff;
  border-radius: 50%;
  background: linear-gradient(135deg, #17ce72, #08b85a);
  box-shadow: 0 12rpx 32rpx rgba(7, 178, 86, 0.24);
  opacity: 1;
}
</style>
