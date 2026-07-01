<template>
  <view class="mobile-card">
    <slot />
  </view>
</template>

<style lang="scss" scoped>
.mobile-card {
  border: 1rpx solid rgba(231, 236, 246, 0.95);
  border-radius: 32rpx;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 22rpx 52rpx rgba(35, 51, 87, 0.07);
}
</style>
