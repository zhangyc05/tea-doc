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
