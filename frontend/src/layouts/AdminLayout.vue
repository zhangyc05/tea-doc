<script setup lang="ts">
import AdminSidebar from '@/components/layout/AdminSidebar.vue'
import AdminTopbar from '@/components/layout/AdminTopbar.vue'
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
import FloatingAIAssistant from '@/components/layout/FloatingAIAssistant.vue'

withDefaults(
  defineProps<{
    activeKey?: string
    breadcrumb?: string[]
    pageTitle?: string
  }>(),
  {
    activeKey: 'training-resources',
    breadcrumb: () => ['管理端'],
    pageTitle: '管理端工作台',
  },
)
</script>

<template>
  <div class="flex min-h-screen bg-page text-text-primary">
    <AdminSidebar :active-key="activeKey" />

    <div class="flex min-w-0 flex-1 flex-col">
      <AdminTopbar :title="pageTitle" />

      <main class="flex-1 px-8 py-6">
        <div class="mx-auto w-full max-w-[var(--admin-content-max-width)]">
          <AppBreadcrumb :items="breadcrumb" />
          <section class="mt-5">
            <slot />
          </section>
        </div>
      </main>
    </div>

    <FloatingAIAssistant scene="admin" />
  </div>
</template>
