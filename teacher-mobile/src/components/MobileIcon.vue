<script setup lang="ts">
import { computed } from 'vue'

type MobileIconTone = 'blue' | 'orange' | 'purple' | 'green' | 'dark'
type MobileIconName =
  | 'file'
  | 'clock'
  | 'folder'
  | 'pen'
  | 'note'
  | 'check'
  | 'book'
  | 'star'
  | 'building'
  | 'edit'
  | 'filter'
  | 'bell'
  | 'seed'
  | 'chart'
  | 'secured'
type MobileIconSize = 'sm' | 'md' | 'lg' | 'plain'
type MobileIconShape = 'rounded' | 'circle' | 'none'

const props = withDefaults(
  defineProps<{
    name: MobileIconName
    tone?: MobileIconTone
    size?: MobileIconSize
    shape?: MobileIconShape
  }>(),
  {
    tone: 'blue',
    size: 'md',
    shape: 'rounded',
  },
)

const iconNameMap: Record<MobileIconName, string> = {
  file: 'file',
  clock: 'clock',
  folder: 'folder',
  pen: 'edit',
  note: 'note',
  check: 'check-circle',
  book: 'books',
  star: 'star',
  building: 'home',
  edit: 'edit-outline',
  filter: 'filter',
  bell: 'notification',
  seed: 'tips',
  chart: 'chart-bar',
  secured: 'secured',
}

const iconColorMap: Record<MobileIconTone, string> = {
  blue: '#1677ff',
  orange: '#ff6c1a',
  purple: '#7a49f5',
  green: '#13a95b',
  dark: '#111827',
}

const iconSizeMap: Record<MobileIconSize, string> = {
  sm: '34rpx',
  md: '44rpx',
  lg: '50rpx',
  plain: '32rpx',
}

const iconName = computed(() => iconNameMap[props.name])
const iconColor = computed(() => iconColorMap[props.tone])
const iconSize = computed(() => iconSizeMap[props.size])
</script>

<template>
  <view class="mobile-icon" :class="[`mobile-icon--${props.tone}`, `mobile-icon--${props.size}`, `mobile-icon--${props.shape}`]">
    <wd-icon :name="iconName" :size="iconSize" :color="iconColor" />
  </view>
</template>

<style lang="scss" scoped>
.mobile-icon {
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.mobile-icon--sm {
  width: 62rpx;
  height: 62rpx;
}

.mobile-icon--md {
  width: 82rpx;
  height: 82rpx;
}

.mobile-icon--lg {
  width: 92rpx;
  height: 92rpx;
}

.mobile-icon--rounded {
  border-radius: 24rpx;
}

.mobile-icon--circle {
  border-radius: 50%;
}

.mobile-icon--none {
  background: transparent;
}

.mobile-icon--blue:not(.mobile-icon--none) {
  background: #e8f1ff;
}

.mobile-icon--orange:not(.mobile-icon--none) {
  background: #fff0e6;
}

.mobile-icon--purple:not(.mobile-icon--none) {
  background: #efe7ff;
}

.mobile-icon--green:not(.mobile-icon--none) {
  background: #e7faef;
}

.mobile-icon--dark:not(.mobile-icon--none) {
  background: #eef2f7;
}
</style>
