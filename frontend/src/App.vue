<script setup lang="ts">
import { ref } from 'vue'

import { DetailSheet, FilterBar, PageHeader, StatCard, StatusBadge } from '@/components/common'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { Button, Card, CardContent } from '@/components/ui'

const sheetOpen = ref(false)

const previewFilters = [
  {
    key: 'type',
    label: '组件类型',
    type: 'select' as const,
    placeholder: '全部类型',
    options: [
      { label: '页头组件', value: 'header' },
      { label: '状态组件', value: 'status' },
      { label: '统计组件', value: 'stat' },
    ],
  },
  {
    key: 'status',
    label: '组件状态',
    type: 'select' as const,
    placeholder: '全部状态',
    options: [
      { label: '已完成', value: 'completed' },
      { label: '待完善', value: 'improvable' },
    ],
  },
  {
    key: 'date',
    label: '更新时间',
    type: 'date' as const,
  },
]
</script>

<template>
  <AdminLayout
    active-key="training-resources"
    page-title="管理端布局预览"
    :breadcrumb="['管理端', '布局预览']"
  >
    <PageHeader
      eyebrow="T3.5 已完成"
      title="DetailSheet 通用详情抽屉"
      description="统一承载详情、编辑和确认类轻量内容，从右侧覆盖页面，不改变主页面左右布局。"
      primary-action-text="打开抽屉"
      secondary-action-text="次要操作"
      @primary-action="sheetOpen = true"
    />

    <div class="mb-5 grid gap-4 md:grid-cols-3">
      <StatCard title="页头组件" value="1" description="用于统一页面标题、简短说明和右侧操作。" tone="primary" />
      <StatCard title="筛选组件" value="1" description="用于搜索和必要筛选项展示。" tone="info" />
      <StatCard title="抽屉组件" value="1" description="用于轻量详情、编辑和确认。" trend="本次新增" tone="success" />
    </div>

    <div class="mb-5">
      <FilterBar search-placeholder="搜索组件名称" :filters="previewFilters">
        <template #actions>
          <Button variant="outline" @click="sheetOpen = true">查看详情</Button>
        </template>
      </FilterBar>
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

    <DetailSheet
      v-model:open="sheetOpen"
      title="组件详情"
      description="用于验证 DetailSheet 的右侧覆盖、内容滚动和底部固定操作区。"
      width="md"
      mode="view"
    >
      <div class="space-y-4">
        <div class="rounded-lg border border-card-border bg-page-soft p-4">
          <p class="text-sm text-text-secondary">组件名称</p>
          <p class="mt-1 font-medium text-text-primary">DetailSheet</p>
        </div>
        <div class="rounded-lg border border-card-border bg-page-soft p-4">
          <p class="text-sm text-text-secondary">适用范围</p>
          <p class="mt-1 text-sm leading-relaxed text-text-primary">适用于详情、编辑、确认类轻量内容，不用于承载复杂主页面。</p>
        </div>
      </div>
    </DetailSheet>
  </AdminLayout>
</template>
