<script setup lang="ts">
import PageHeader from '@/components/common/PageHeader.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { Card, CardContent } from '@/components/ui'
</script>

<template>
  <AdminLayout
    active-key="training-resources"
    page-title="管理端布局预览"
    :breadcrumb="['管理端', '布局预览']"
  >
    <PageHeader
      eyebrow="T3.1 已完成"
      title="PageHeader 通用页头"
      description="统一承载页面标题、简短说明和右侧操作，后续管理端主页面应优先复用。"
      primary-action-text="主要操作"
      secondary-action-text="次要操作"
    />

    <Card>
      <CardContent class="pt-6">
        <div class="grid gap-4 md:grid-cols-3">
          <div class="rounded-lg border border-card-border bg-primary-soft p-4">
            <p class="text-sm text-text-secondary">页面标题</p>
            <p class="mt-2 font-semibold text-text-primary">统一层级</p>
          </div>
          <div class="rounded-lg border border-card-border bg-page-soft p-4">
            <p class="text-sm text-text-secondary">说明文案</p>
            <p class="mt-2 font-semibold text-text-primary">简短克制</p>
          </div>
          <div class="rounded-lg border border-card-border bg-card p-4">
            <p class="text-sm text-text-secondary">操作按钮</p>
            <p class="mt-2 font-semibold text-text-primary">右侧承载</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </AdminLayout>
</template>
