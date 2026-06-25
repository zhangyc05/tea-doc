<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue'
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
</script>

<template>
  <AdminLayout
    active-key="training-resources"
    page-title="管理端布局预览"
    :breadcrumb="['管理端', '布局预览']"
  >
    <div class="space-y-5">
      <Card>
        <CardHeader>
          <Badge class="w-max">T2.1 已完成</Badge>
          <CardTitle>AdminLayout 管理端布局</CardTitle>
          <CardDescription>
            当前已建立浅色侧边栏、顶部栏、面包屑、内容区和右下角 AI 助理入口。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 md:grid-cols-3">
            <div class="rounded-lg border border-card-border bg-primary-soft p-4">
              <p class="text-sm text-text-secondary">侧边栏</p>
              <p class="mt-2 font-semibold text-text-primary">浅色导航</p>
            </div>
            <div class="rounded-lg border border-card-border bg-page-soft p-4">
              <p class="text-sm text-text-secondary">顶部栏</p>
              <p class="mt-2 font-semibold text-text-primary">60px 高度</p>
            </div>
            <div class="rounded-lg border border-card-border bg-card p-4">
              <p class="text-sm text-text-secondary">内容区</p>
              <p class="mt-2 font-semibold text-text-primary">最大宽度 1280px</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </AdminLayout>
</template>
