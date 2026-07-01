<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'purple' | 'blue' | 'orange' | 'green'
  }>(),
  {
    tone: 'green',
  },
)
</script>

<template>
  <text class="mobile-status-tag" :class="`mobile-status-tag--${tone}`">
    <slot />
  </text>
</template>

<style lang="scss" scoped>
.mobile-status-tag {
  display: inline-flex;
  width: fit-content;
  height: 32rpx;
  align-items: center;
  padding: 0 13rpx;
  border-radius: 10rpx;
  font-size: 23rpx;
  font-weight: 900;
  line-height: 32rpx;
}

.mobile-status-tag--purple {
  background: #efe7ff;
  color: #7a49f5;
}

.mobile-status-tag--blue {
  background: #e8f1ff;
  color: #1677ff;
}

.mobile-status-tag--orange {
  background: #fff0e6;
  color: #ff6c1a;
}

.mobile-status-tag--green {
  background: #e7faef;
  color: #13a95b;
}
</style>
