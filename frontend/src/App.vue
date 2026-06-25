<script setup lang="ts">
import { PageHeader, StatusBadge } from '@/components/common'
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
      eyebrow="T3.2 已完成"
      title="StatusBadge 通用状态标签"
      description="统一承载业务状态展示，并根据管理端、教师端、手机端场景完成文案转译。"
      primary-action-text="主要操作"
      secondary-action-text="次要操作"
    />

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
