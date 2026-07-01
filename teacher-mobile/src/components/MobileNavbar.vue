<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    showBack?: boolean
    size?: 'regular' | 'compact'
  }>(),
  {
    showBack: true,
    size: 'regular',
  },
)

const emit = defineEmits<{
  back: []
}>()

function handleBack() {
  emit('back')
}
</script>

<template>
  <view class="mobile-navbar" :class="`mobile-navbar--${size}`">
    <view class="system-status" aria-hidden="true">
      <text class="system-status__time">9:41</text>
      <view class="system-status__icons">
        <view class="status-signal"></view>
        <view class="status-wifi"></view>
        <view class="status-battery"></view>
      </view>
    </view>

    <wd-navbar
      :title="title"
      :left-arrow="showBack"
      :bordered="false"
      custom-class="mobile-navbar__wd"
      @click-left="handleBack"
    >
      <template v-if="$slots.right" #right>
        <slot name="right" />
      </template>
    </wd-navbar>
  </view>
</template>

<style lang="scss" scoped>
@import '../styles/tokens.scss';

.mobile-navbar {
  position: relative;
  z-index: 1;
}

.system-status,
.system-status__icons {
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

:deep(.mobile-navbar__wd) {
  background: transparent;
}

:deep(.mobile-navbar__wd .wd-navbar__content) {
  height: 88rpx;
  background: transparent;
}

.mobile-navbar--compact :deep(.mobile-navbar__wd .wd-navbar__content) {
  height: 68rpx;
}

:deep(.mobile-navbar__wd .wd-navbar__title) {
  color: #10172d;
  font-size: 42rpx;
  font-weight: 900;
  letter-spacing: 0;
}

.mobile-navbar--compact :deep(.mobile-navbar__wd .wd-navbar__title) {
  font-size: 36rpx;
}

:deep(.mobile-navbar__wd .wd-navbar__left) {
  width: 72rpx;
}

:deep(.mobile-navbar__wd .wd-navbar__arrow) {
  color: #0b122a;
  font-size: 42rpx;
  font-weight: 900;
}

:deep(.mobile-navbar__wd .wd-navbar__right) {
  right: 0;
}
</style>
