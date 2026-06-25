<script setup lang="ts">
import { PageHeader, StatCard, StatusBadge } from '@/components/common'
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
      eyebrow="T3.3 已完成"
      title="StatCard 通用统计卡"
      description="统一承载当前页面业务对象的关键统计，数量保持克制，不为了丰富页面新增无依据统计。"
      primary-action-text="主要操作"
      secondary-action-text="次要操作"
    />

    <div class="mb-5 grid gap-4 md:grid-cols-3">
      <StatCard title="页头组件" value="1" description="用于统一页面标题、简短说明和右侧操作。" tone="primary" />
      <StatCard title="状态组件" value="1" description="用于统一管理端与教师端状态文案。" tone="info" />
      <StatCard title="统计卡组件" value="1" description="用于当前页面对象的关键统计展示。" trend="本次新增" tone="success" />
    </div>

    <Card>
      <CardContent class="space-y-5 pt-6">
        <div class="grid gap-4 md:grid-cols-3">
          <div class="rounded-lg border border-card-border bg-primary-soft p-4">
            <p class="text-sm text-text-secondary">管理端状态</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <StatusBadge status="candidate" scene="admin" />
              <StatusBadge status="published" scene="admin" />
            </div>
          </div>
          <div class="rounded-lg border border-card-border bg-page-soft p-4">
            <p class="text-sm text-text-secondary">教师端转译</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <StatusBadge status="candidate" scene="teacher" />
              <StatusBadge status="saved" scene="teacher" />
            </div>
          </div>
          <div class="rounded-lg border border-card-border bg-card p-4">
            <p class="text-sm text-text-secondary">处理状态</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <StatusBadge status="recognizing" scene="admin" />
              <StatusBadge status="needSupplement" scene="mobile" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </AdminLayout>
</template>
