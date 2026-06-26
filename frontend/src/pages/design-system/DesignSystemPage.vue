<template>
  <div class="design-system-page">
    <!-- Header Section -->
    <header class="page-header">
      <div class="header-content">
        <div class="logo-section">
          <h1 class="page-title">设计系统</h1>
          <span class="version-badge">v1.0.0</span>
        </div>
        <div class="header-actions">
          <button class="nav-button" @click="navigateToAdmin">
            跳转到管理端 →
          </button>
        </div>
      </div>
    </header>

    <!-- Page Layout -->
    <div class="page-layout">
      <DesignSidebar
        :nav-items="navigationItems"
        @select="handleSelect"
      />
      <DesignContent :selected-item="selectedItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DesignSidebar from './components/DesignSidebar.vue'
import DesignContent from './components/DesignContent.vue'
import { navigationItems } from './content/navigation'
import type { NavItem } from '@/lib/design-system/types'

// Router
const router = useRouter()

// State
const selectedItem = ref<NavItem>()

// Event Handlers
const handleSelect = (item: NavItem): void => {
  selectedItem.value = item
}

const navigateToAdmin = (): void => {
  router.push('/admin/training/resources')
}
</script>

<style scoped>
.design-system-page {
  /* Full viewport height with no overflow */
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: var(--color-page-bg);
}

/* Header Section */
.page-header {
  /* Fixed header height: 60px */
  height: 60px;
  min-height: 60px;
  background-color: var(--color-card-bg);
  border-bottom: 1px solid var(--color-card-border);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.header-content {
  width: 100%;
  max-width: var(--admin-content-max-width, 1280px);
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1;
}

.version-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;
  line-height: 1;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-button {
  padding: 8px 16px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  line-height: 1;
}

.nav-button:hover {
  background-color: var(--color-primary-dark, #1a9f7f);
}

.nav-button:active {
  transform: translateY(1px);
}

/* Page Layout */
.page-layout {
  /* Flex layout for sidebar and content */
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .page-layout {
    /* Stack sidebar and content vertically on mobile */
    flex-direction: column;
  }

  .header-content {
    padding: 0 16px;
  }

  .page-title {
    font-size: 18px;
  }

  .version-badge {
    font-size: 11px;
    padding: 3px 10px;
  }

  .nav-button {
    padding: 6px 12px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .page-header {
    height: auto;
    min-height: 60px;
    padding: 12px 0;
  }

  .header-content {
    flex-direction: column;
    gap: 12px;
    padding: 0 16px;
  }

  .logo-section {
    width: 100%;
    justify-content: center;
  }

  .header-actions {
    width: 100%;
    justify-content: center;
  }

  .nav-button {
    width: 100%;
    max-width: 200px;
  }
}
</style>
