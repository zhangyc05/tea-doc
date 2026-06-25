<script setup lang="ts">
import { computed, ref } from 'vue'

import { FilterBar, PageHeader, StatCard, StatusBadge } from '@/components/common'
import TrainingResourceDetailSheet from '@/components/business/training/TrainingResourceDetailSheet.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {
  trainingResourceStats,
  trainingResources,
  trainingResourceStatusText,
  trainingResourceTypeText,
  type TrainingResourceMockItem,
} from '@/mock/admin/training'
import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'

const selectedResource = ref<TrainingResourceMockItem | null>(null)
const detailOpen = ref(false)
const keyword = ref('')
const filterValues = ref<Record<string, string>>({})

const filters = [
  {
    key: 'type',
    label: '资源类型',
    type: 'select' as const,
    placeholder: '全部类型',
    options: Object.entries(trainingResourceTypeText).map(([value, label]) => ({ value, label })),
  },
  {
    key: 'status',
    label: '可用状态',
    type: 'select' as const,
    placeholder: '全部状态',
    options: Object.entries(trainingResourceStatusText).map(([value, label]) => ({ value, label })),
  },
  {
    key: 'source',
    label: '来源',
    type: 'select' as const,
    placeholder: '全部来源',
    options: [
      { value: '校内建设', label: '校内建设' },
      { value: '外部机构', label: '外部机构' },
      { value: '企业合作', label: '企业合作' },
      { value: '公开课程', label: '公开课程' },
    ],
  },
]

const filteredResources = computed(() => {
  const searchText = keyword.value.trim().toLowerCase()
  const values = filterValues.value

  return trainingResources.filter((resource) => {
    const matchesKeyword = searchText
      ? [resource.name, resource.provider, resource.direction].some((field) => field.toLowerCase().includes(searchText))
      : true
    const matchesType = values.type ? resource.type === values.type : true
    const matchesStatus = values.status ? resource.status === values.status : true
    const matchesSource = values.source ? resource.source === values.source : true

    return matchesKeyword && matchesType && matchesStatus && matchesSource
  })
})

function handleSearch(value: string) {
  keyword.value = value
}

function handleFilterChange(values: Record<string, string>) {
  filterValues.value = values
}

function handleReset() {
  keyword.value = ''
  filterValues.value = {}
}

function openDetail(resource: TrainingResourceMockItem) {
  selectedResource.value = resource
  detailOpen.value = true
}
</script>

<template>
  <AdminLayout>
    <PageHeader
      eyebrow="培训管理"
      title="资源库"
      description="管理培训资源本身的类型、来源、可用状态和信息完整度，不关联计划、需求匹配或覆盖教师。"
      primary-action-text="新增资源"
      secondary-action-text="导出资源"
    />

    <div class="mb-5 grid gap-4 md:grid-cols-4">
      <StatCard
        v-for="stat in trainingResourceStats"
        :key="stat.key"
        :title="stat.title"
        :value="stat.value"
        :description="stat.description"
        :tone="stat.tone"
      />
    </div>

    <div class="mb-5">
      <FilterBar
        search-placeholder="搜索资源名称、提供方或适用方向"
        :filters="filters"
        @search="handleSearch"
        @change="handleFilterChange"
        @reset="handleReset"
      >
        <template #actions>
          <Button variant="outline">导出当前结果</Button>
        </template>
      </FilterBar>
    </div>

    <Card>
      <CardContent class="pt-6">
        <div class="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 class="text-base font-semibold text-text-primary">资源列表</h2>
            <p class="mt-1 text-sm text-text-secondary">共 {{ filteredResources.length }} 条资源</p>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>资源名称</TableHead>
              <TableHead>资源类型</TableHead>
              <TableHead>建设 / 提供方</TableHead>
              <TableHead>适用方向</TableHead>
              <TableHead>可用状态</TableHead>
              <TableHead>信息完整度</TableHead>
              <TableHead>更新时间</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="resource in filteredResources" :key="resource.id">
              <TableCell>
                <div>
                  <p class="font-medium text-text-primary">{{ resource.name }}</p>
                  <p class="mt-1 text-xs text-text-tertiary">{{ resource.id }}</p>
                </div>
              </TableCell>
              <TableCell>{{ trainingResourceTypeText[resource.type] }}</TableCell>
              <TableCell>{{ resource.provider }}</TableCell>
              <TableCell>{{ resource.direction }}</TableCell>
              <TableCell>
                <StatusBadge :status="resource.status" scene="admin" />
              </TableCell>
              <TableCell>
                <div class="min-w-28">
                  <div class="flex items-center justify-between text-xs text-text-secondary">
                    <span>{{ resource.completeness }}%</span>
                  </div>
                  <div class="mt-2 h-2 rounded-full bg-page-soft">
                    <div class="h-2 rounded-full bg-primary" :style="{ width: `${resource.completeness}%` }" />
                  </div>
                </div>
              </TableCell>
              <TableCell>{{ resource.updatedAt }}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" @click="openDetail(resource)">查看详情</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div v-if="filteredResources.length === 0" class="rounded-lg border border-card-border bg-page-soft p-8 text-center text-sm text-text-secondary">
          暂无符合条件的资源。
        </div>
      </CardContent>
    </Card>

    <TrainingResourceDetailSheet v-model:open="detailOpen" :resource="selectedResource" />
  </AdminLayout>
</template>
