<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { PageHeader, StatCard, StatusBadge } from '@/components/common'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { Card, CardContent } from '@/components/ui'

const route = useRoute()

const title = computed(() => String(route.meta.title ?? '管理端页面'))
const moduleName = computed(() => String(route.meta.module ?? '管理端'))
const menuKey = computed(() => String(route.meta.menuKey ?? 'home'))
const breadcrumb = computed(() => (Array.isArray(route.meta.breadcrumb) ? (route.meta.breadcrumb as string[]) : ['管理端']))
</script>

<template>
  <AdminLayout :active-key="menuKey" :page-title="title" :breadcrumb="breadcrumb">
    <PageHeader
      eyebrow="路由已建立"
      :title="title"
      :description="`${moduleName}页面路由已接入，当前为结构占位，后续按页面任务补充真实内容。`"
    />

    <div class="mb-5 grid gap-4 md:grid-cols-3">
      <StatCard title="所属模块" :value="moduleName" description="来自当前路由 meta。" tone="primary" />
      <StatCard title="页面状态" value="未开始" description="等待后续页面任务补充结构与数据。" tone="warning" />
      <StatCard title="路由状态" value="已接入" description="当前路径可通过 Vue Router 访问。" tone="success" />
    </div>

    <Card>
      <CardContent class="space-y-4 pt-6">
        <div class="flex items-center gap-2">
          <span class="text-sm text-text-secondary">当前状态</span>
          <StatusBadge status="draft" scene="admin" />
        </div>
        <p class="text-sm leading-relaxed text-text-secondary">
          这是管理端路由占位页，只用于验证 Layout、菜单选中、面包屑和路由可访问性。正式页面内容将在对应页面任务中实现。
        </p>
      </CardContent>
    </Card>
  </AdminLayout>
</template>
