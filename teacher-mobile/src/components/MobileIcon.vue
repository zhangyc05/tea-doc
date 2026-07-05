<script setup lang="ts">
import { computed } from 'vue'

type MobileIconTone = 'blue' | 'orange' | 'purple' | 'green' | 'teal' | 'gray' | 'dark'
type MobileIconName =
  | 'id'
  | 'file'
  | 'clock'
  | 'folder'
  | 'pen'
  | 'note'
  | 'check'
  | 'book'
  | 'calendar'
  | 'star'
  | 'building'
  | 'edit'
  | 'filter'
  | 'bell'
  | 'seed'
  | 'chart'
  | 'secured'
  | 'search'
  | 'sound'
  | 'grid'
  | 'lab'
  | 'briefcase'
  | 'person'
  | 'heart'
  | 'cup'
  | 'growth'
  | 'gift'
  | 'cap'
  | 'case'
  | 'help'
  | 'service'
  | 'setting'
  | 'bot'
  | 'info'
  | 'upload'
  | 'camera'
  | 'mic'
  | 'link'
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
  id: 'user-circle',
  file: 'file',
  clock: 'clock',
  folder: 'folder',
  pen: 'edit',
  note: 'note',
  check: 'check-circle',
  book: 'books',
  calendar: 'calendar',
  star: 'star',
  building: 'home',
  edit: 'edit-outline',
  filter: 'filter',
  bell: 'notification',
  seed: 'tips',
  chart: 'chart-bar',
  secured: 'secured',
  search: 'search',
  sound: 'sound',
  grid: 'view-module',
  lab: 'detection',
  briefcase: 'bags',
  person: 'user-circle',
  heart: 'heart',
  cup: 'gift',
  growth: 'chart-bar',
  gift: 'gift',
  cap: 'evaluation',
  case: 'bags',
  help: 'help-circle',
  service: 'service',
  setting: 'setting',
  bot: 'chat',
  info: 'info-circle',
  upload: 'upload',
  camera: 'camera',
  mic: 'sound',
  link: 'link',
}

const iconColorMap: Record<MobileIconTone, string> = {
  blue: '#1677ff',
  orange: '#ff6c1a',
  purple: '#7a49f5',
  green: '#13a95b',
  teal: '#12b8a6',
  gray: '#6b7280',
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

.mobile-icon--teal:not(.mobile-icon--none) {
  background: #e5fbf8;
}

.mobile-icon--gray:not(.mobile-icon--none) {
  background: #eef2f7;
}

.mobile-icon--dark:not(.mobile-icon--none) {
  background: #eef2f7;
}
</style>
