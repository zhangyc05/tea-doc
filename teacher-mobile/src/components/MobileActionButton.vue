<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'outline' | 'link'
    arrow?: boolean
  }>(),
  {
    variant: 'outline',
    arrow: false,
  },
)
</script>

<template>
  <button class="mobile-action-button" :class="`mobile-action-button--${variant}`">
    <text><slot /></text>
    <view v-if="arrow" class="mobile-action-button__arrow"></view>
  </button>
</template>

<style lang="scss" scoped>
@import '../styles/tokens.scss';

.mobile-action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  box-shadow: none;
  font-weight: 900;
  white-space: nowrap;
}

.mobile-action-button::after {
  display: none;
  border: 0;
}

.mobile-action-button--primary {
  border-radius: 14rpx;
  background: linear-gradient(135deg, #16c96c, #02ad53);
  box-shadow: 0 18rpx 32rpx rgba(3, 177, 84, 0.22);
  color: #fff;
}

.mobile-action-button--outline {
  border: 2rpx solid $teacher-mobile-primary;
  border-radius: 14rpx;
  background: #fff;
  color: $teacher-mobile-primary-dark;
}

.mobile-action-button--link {
  color: $teacher-mobile-primary-dark;
}

.mobile-action-button__arrow {
  width: 18rpx;
  height: 18rpx;
  border-top: 5rpx solid currentColor;
  border-right: 5rpx solid currentColor;
  transform: rotate(45deg);
}
</style>
