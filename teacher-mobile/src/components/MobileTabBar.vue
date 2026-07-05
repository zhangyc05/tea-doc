<script setup lang="ts">
type TabKey = 'todo' | 'archive' | 'assistant' | 'activity' | 'profile'

const props = defineProps<{
  active: TabKey
}>()

const tabs: Array<{ key: TabKey; text: string; path: string }> = [
  { key: 'todo', text: '待办', path: '/pages/todo/index' },
  { key: 'archive', text: '档案', path: '/pages/archive/index' },
  { key: 'assistant', text: 'AI 助手', path: '/pages/assistant/index' },
  { key: 'activity', text: '活动', path: '/pages/activity/index' },
  { key: 'profile', text: '我的', path: '/pages/profile/index' },
]

function iconSrc(key: TabKey) {
  if (key === 'assistant') {
    return ''
  }
  const state = props.active === key ? 'active' : 'inactive'
  return `/static/tabbar/${key}-${state}.png`
}

function handleChange(event: { value: TabKey }) {
  const tab = tabs.find((item) => item.key === event.value)
  if (!tab || tab.key === props.active) {
    return
  }
  uni.redirectTo({ url: tab.path })
}
</script>

<template>
  <wd-tabbar
    :model-value="props.active"
    custom-class="mobile-tabbar"
    active-color="#0ec165"
    inactive-color="#667089"
    shape="round"
    fixed
    safe-area-inset-bottom
    :bordered="false"
    :z-index="50"
    @change="handleChange"
  >
    <wd-tabbar-item v-for="tab in tabs" :key="tab.key" :name="tab.key">
      <template #icon>
        <view
          v-if="tab.key === 'assistant'"
          class="mobile-tabbar__item-shell mobile-tabbar__item-shell--assistant"
        >
          <image class="mobile-tabbar__assistant-orb" src="/static/tabbar/assistant.png" mode="aspectFit" />
          <text class="mobile-tabbar__item-label mobile-tabbar__item-label--assistant">AI助手</text>
        </view>
        <view
          v-else
          class="mobile-tabbar__item-shell"
          :class="[
            { 'mobile-tabbar__item-shell--active': props.active === tab.key },
          ]"
        >
          <image
            class="mobile-tabbar__icon"
            :src="iconSrc(tab.key)"
            mode="aspectFit"
          />
          <text class="mobile-tabbar__item-label">{{ tab.text }}</text>
        </view>
      </template>
    </wd-tabbar-item>
  </wd-tabbar>
</template>

<style lang="scss" scoped>
@import '../styles/tokens.scss';

:deep(.mobile-tabbar) {
  height: calc(138rpx + env(safe-area-inset-bottom));
  align-items: flex-start;
  justify-content: space-around;
  padding: 18rpx 20rpx env(safe-area-inset-bottom);
  border: 1rpx solid rgba(234, 238, 246, 0.95);
  border-bottom: 0;
  border-radius: 38rpx 38rpx 0 0;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 -18rpx 52rpx rgba(21, 40, 74, 0.08);
}

:deep(.wd-tabbar-item) {
  flex: 0 0 126rpx;
  height: 110rpx;
  overflow: visible;
}

:deep(.wd-tabbar-item__body) {
  height: 110rpx;
  justify-content: center;
  overflow: visible;
}

.mobile-tabbar__item-shell {
  position: relative;
  display: flex;
  width: 126rpx;
  height: 110rpx;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  color: #667089;
  overflow: visible;
}

.mobile-tabbar__item-shell--active {
  color: $teacher-mobile-primary;
}

.mobile-tabbar__item-shell--assistant {
  color: $teacher-mobile-primary;
}

.mobile-tabbar__icon {
  display: block;
  width: 58rpx;
  height: 58rpx;
  margin-top: 2rpx;
  flex: 0 0 58rpx;
}

.mobile-tabbar__item-label {
  margin-top: 8rpx;
  color: currentColor;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;
}

.mobile-tabbar__item-label--assistant {
  position: absolute;
  top: 74rpx;
  left: 50%;
  width: 128rpx;
  margin-top: 0;
  color: #58627a;
  text-align: center;
  transform: translateX(-50%);
}

.mobile-tabbar__assistant-orb {
  display: block;
  width: 114rpx;
  height: 114rpx;
  flex: 0 0 114rpx;
  filter: drop-shadow(0 12rpx 24rpx rgba(7, 178, 86, 0.14));
  transform: translateY(-52rpx);
}
</style>
