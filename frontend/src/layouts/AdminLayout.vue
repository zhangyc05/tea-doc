<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AdminSidebar from '@/components/layout/AdminSidebar.vue'
import AdminTopbar from '@/components/layout/AdminTopbar.vue'
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
import FloatingAIAssistant from '@/components/layout/FloatingAIAssistant.vue'

const props = withDefaults(
  defineProps<{
    activeKey?: string
    breadcrumb?: string[]
    pageTitle?: string
  }>(),
  {
    activeKey: '',
    breadcrumb: undefined,
    pageTitle: '',
  },
)

const route = useRoute()

const resolvedActiveKey = computed(() => props.activeKey || String(route.meta.menuKey ?? 'training-resources'))
const resolvedBreadcrumb = computed(() => {
  if (props.breadcrumb?.length) return props.breadcrumb
  return Array.isArray(route.meta.breadcrumb) ? (route.meta.breadcrumb as string[]) : ['管理端']
})
</script>

<template>
  <div class="flex min-h-screen bg-page text-text-primary">
    <AdminSidebar :active-key="resolvedActiveKey" />

    <div class="flex min-w-0 flex-1 flex-col">
      <AdminTopbar />

      <main class="flex-1 px-8 py-5">
        <div class="w-full max-w-[var(--admin-content-max-width)]">
          <AppBreadcrumb :items="resolvedBreadcrumb" />
          <section class="mt-4">
            <slot />
          </section>
        </div>
      </main>
    </div>

    <FloatingAIAssistant scene="admin" />
  </div>
</template>
