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
      <button type="button" class="scope-button">
        <span>全校</span>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      <button type="button" class="scope-button year-button">
        <span>2026 年度</span>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>

      <button type="button" class="message-button" aria-label="消息">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 9.2A6 6 0 0 0 6 9.2c0 7-3 7.3-3 7.3h18s-3-.3-3-7.3Z" />
          <path d="M9.8 19a2.4 2.4 0 0 0 4.4 0" />
        </svg>
        <em>12</em>
      </button>

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
  gap: 24px;
  border-bottom: 1px solid var(--color-card-border);
  background: rgba(255, 255, 255, 0.96);
  padding: 0 34px 0 44px;
  backdrop-filter: blur(14px);
}

.topbar-breadcrumb {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 16px;
  color: #34435f;
  font-size: 18px;
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
  gap: 18px;
}

.scope-button {
  display: inline-flex;
  height: 48px;
  min-width: 154px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d6e1f2;
  border-radius: 10px;
  background: #fff;
  padding: 0 20px;
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: 16px;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(16, 40, 90, 0.03);
  cursor: pointer;
}

.year-button {
  min-width: 180px;
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
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: #415373;
  cursor: pointer;
}

.message-button svg {
  width: 26px;
  height: 26px;
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
  min-width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  border-radius: var(--radius-full);
  background: #f43f45;
  padding: 0 5px;
  color: #fff;
  font-size: 11px;
  font-style: normal;
  font-weight: 900;
  line-height: 1;
}

.user-box {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text-primary);
  font-size: 16px;
  font-weight: 900;
}

.avatar {
  display: flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: linear-gradient(145deg, #0b63f6 0%, #2f7cf7 100%);
  box-shadow: 0 8px 18px rgba(11, 99, 246, 0.2);
  color: #fff;
  font-weight: 900;
}

@media (max-width: 980px) {
  .scope-button,
  .message-button {
    display: none;
  }
}
</style>