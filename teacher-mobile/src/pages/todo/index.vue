<template>
  <view class="placeholder-page">
    <text>待办</text>
    <MobileTabBar active="todo" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../styles/tokens.scss';

.placeholder-page {
  min-height: 100vh;
  padding: 80rpx $teacher-mobile-page-x;
  background: $teacher-mobile-page-bg;
  color: $teacher-mobile-text-primary;
  font-size: 40rpx;
  font-weight: 900;
}
</style>
