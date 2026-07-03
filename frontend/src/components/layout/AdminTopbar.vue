<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

withDefaults(
  defineProps<{
    userName?: string
  }>(),
  {
    userName: '周校长',
  },
)

const route = useRoute()

const breadcrumbItems = computed(() => {
  const items = Array.isArray(route.meta.breadcrumb) ? (route.meta.breadcrumb as string[]) : ['管理端']
  return items[0] === '管理端' ? items.slice(1) : items
})
</script>

<template>
  <header class="admin-topbar">
    <div class="topbar-breadcrumb">
      <template v-for="(item, index) in breadcrumbItems" :key="`${item}-${index}`">
        <span :class="index === breadcrumbItems.length - 1 ? 'current' : ''">{{ item }}</span>
        <i v-if="index < breadcrumbItems.length - 1" />
      </template>
    </div>

    <div class="topbar-actions">
      <span class="scope-button">
        <span>全校</span>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </span>
      <span class="scope-button year-button">
        <span>2026 年度</span>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </span>

      <span class="message-button" role="status" aria-label="消息 12 条">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 9.2A6 6 0 0 0 6 9.2c0 7-3 7.3-3 7.3h18s-3-.3-3-7.3Z" />
          <path d="M9.8 19a2.4 2.4 0 0 0 4.4 0" />
        </svg>
        <em>12</em>
      </span>

      <div class="user-box">
        <div class="avatar">周</div>
        <span>{{ userName }}</span>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </div>
    </div>
  </header>
</template>

<style scoped>
.admin-topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  height: var(--admin-topbar-height);
  align-items: center;
  justify-content: space-between;
  gap: clamp(16px, 1.25vw, 24px);
  border-bottom: 1px solid var(--color-card-border);
  background: rgba(255, 255, 255, 0.96);
  padding: 0 clamp(22px, 1.8vw, 34px) 0 clamp(24px, 2.3vw, 44px);
  backdrop-filter: blur(14px);
}

.topbar-breadcrumb {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: clamp(10px, 0.8vw, 16px);
  color: #34435f;
  font-size: clamp(15px, 0.95vw, 18px);
  font-weight: 700;
}

.topbar-breadcrumb span {
  white-space: nowrap;
}

.topbar-breadcrumb .current {
  color: var(--color-text-primary);
  font-weight: 900;
}

.topbar-breadcrumb i {
  width: 4px;
  height: 4px;
  border-radius: var(--radius-full);
  background: #8ea0bb;
}

.topbar-actions {
  display: flex;
  flex: none;
  align-items: center;
  gap: clamp(12px, 0.9vw, 18px);
}

.scope-button {
  display: inline-flex;
  height: clamp(40px, 2.5vw, 48px);
  min-width: clamp(118px, 8vw, 154px);
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d6e1f2;
  border-radius: var(--radius-md);
  background: #fff;
  padding: 0 clamp(14px, 1vw, 20px);
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: clamp(14px, 0.85vw, 16px);
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(16, 40, 90, 0.03);
}

.year-button {
  min-width: clamp(136px, 9.4vw, 180px);
}

.scope-button svg,
.user-box svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.message-button {
  position: relative;
  display: inline-flex;
  width: clamp(38px, 2.2vw, 42px);
  height: clamp(38px, 2.2vw, 42px);
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: #415373;
}

.message-button svg {
  width: clamp(23px, 1.35vw, 26px);
  height: clamp(23px, 1.35vw, 26px);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.message-button em {
  position: absolute;
  right: -2px;
  top: -2px;
  display: inline-flex;
  min-width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  border-radius: var(--radius-full);
  background: #f43f45;
  padding: 0 5px;
  color: #fff;
  font-size: 10px;
  font-style: normal;
  font-weight: 900;
  line-height: 1;
}

.user-box {
  display: flex;
  align-items: center;
  gap: clamp(8px, 0.55vw, 10px);
  color: var(--color-text-primary);
  font-size: clamp(14px, 0.85vw, 16px);
  font-weight: 900;
}

.avatar {
  display: flex;
  width: clamp(38px, 2.2vw, 42px);
  height: clamp(38px, 2.2vw, 42px);
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: linear-gradient(145deg, #0b63f6 0%, #2f7cf7 100%);
  box-shadow: 0 8px 18px rgba(11, 99, 246, 0.2);
  color: #fff;
  font-weight: 900;
}

@media (max-width: 1180px) {
  .scope-button {
    display: none;
  }
}
</style>
