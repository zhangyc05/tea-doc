<script setup lang="ts">
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-page px-6 py-12 text-text-primary">
    <Card class="w-full max-w-3xl p-0">
      <CardHeader>
        <Badge class="w-max">shadcn-vue 基础组件已接入</Badge>
        <CardTitle class="text-2xl">教师综合发展平台</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-lg leading-loose text-text-secondary">
          当前已完成 T1.3：新增 components.json、cn 工具函数与首批 UI 基础组件。
        </p>
        <div class="mt-7 flex items-center justify-between gap-3 rounded-lg bg-primary-soft px-4 py-3 text-text-secondary">
          <span>下一步</span>
          <Button variant="secondary">T2.1 实现 AdminLayout</Button>
        </div>
      </CardContent>
    </Card>
  </main>
</template>
