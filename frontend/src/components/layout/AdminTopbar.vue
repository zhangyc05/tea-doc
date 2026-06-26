<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { Button } from '@/components/ui'

withDefaults(
  defineProps<{
    userName?: string
  }>(),
  {
    userName: '管理员',
  },
)

const route = useRoute()

const breadcrumbItems = computed(() => {
  if (Array.isArray(route.meta.breadcrumb)) {
    return route.meta.breadcrumb as string[]
  }
  return ['管理端']
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
      <Button variant="outline" size="md" class="scope-button">
        全校
        <span>⌄</span>
      </Button>
      <Button variant="outline" size="md" class="scope-button year-button">
        2026 年度
        <span>⌄</span>
      </Button>

      <button type="button" class="message-button">
        <span>消息</span>
        <em>12</em>
      </button>

      <div class="user-box">
        <div class="avatar">管</div>
        <span>{{ userName }}</span>
        <i>⌄</i>
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
  gap: 20px;
  border-bottom: 1px solid var(--color-card-border);
  background: rgba(255, 255, 255, 0.95);
  padding: 0 28px;
  backdrop-filter: blur(12px);
}

.topbar-breadcrumb {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 10px;
  color: var(--color-text-secondary);
  font-size: 13px;
}

.topbar-breadcrumb span {
  white-space: nowrap;
}

.topbar-breadcrumb .current {
  color: var(--color-text-primary);
  font-size: 15px;
  font-weight: 800;
}

.topbar-breadcrumb i {
  width: 4px;
  height: 4px;
  border-radius: var(--radius-full);
  background: var(--color-text-disabled);
}

.topbar-actions {
  display: flex;
  flex: none;
  align-items: center;
  gap: 12px;
}

.scope-button {
  height: 36px;
  min-width: 108px;
  justify-content: space-between;
  border-color: var(--color-card-border);
  border-radius: 10px;
  color: var(--color-text-primary);
}

.year-button {
  min-width: 128px;
}

.scope-button span,
.user-box i {
  color: var(--color-primary);
  font-style: normal;
}

.message-button {
  position: relative;
  display: inline-flex;
  height: 36px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-card-border);
  border-radius: 10px;
  background: var(--color-card-bg);
  padding: 0 13px;
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.message-button em {
  position: absolute;
  right: -6px;
  top: -6px;
  display: inline-flex;
  min-width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-card-bg);
  border-radius: var(--radius-full);
  background: var(--color-danger);
  padding: 0 4px;
  color: #fff;
  font-size: 10px;
  font-style: normal;
  line-height: 1;
}

.user-box {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 800;
}

.avatar {
  display: flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-weight: 800;
}

@media (max-width: 980px) {
  .scope-button,
  .message-button {
    display: none;
  }
}
</style>
