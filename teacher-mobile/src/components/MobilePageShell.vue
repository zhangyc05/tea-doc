<script setup lang="ts">
import MobileTabBar from './MobileTabBar.vue'

type TabKey = 'todo' | 'archive' | 'assistant' | 'activity' | 'profile'

defineProps<{
  active: TabKey
}>()
</script>

<template>
  <view class="mobile-page-shell">
    <slot />
    <MobileTabBar :active="active" />
  </view>
</template>

<style lang="scss" scoped>
@import '../styles/tokens.scss';

.mobile-page-shell {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 16rpx) $teacher-mobile-page-x calc(150rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 12% 3%, rgba(226, 252, 240, 0.74), transparent 30%),
    linear-gradient(180deg, #fbfffd 0%, #f7fbff 50%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

@media (max-width: 374px) {
  .mobile-page-shell {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }
}
</style>
