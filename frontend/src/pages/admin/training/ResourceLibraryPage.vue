<script setup lang="ts">
import { computed, defineComponent, h, ref, type PropType } from 'vue'

import TrainingResourceDetailSheet from '@/components/business/training/TrainingResourceDetailSheet.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {
  resourceLevelDistribution,
  resourceSourceDistribution,
  resourceStatusDistribution,
  trainingResourceDirectionText,
  trainingResourceLevelText,
  trainingResources,
  trainingResourceSourceText,
  trainingResourceStats,
  trainingResourceStatusText,
  type ResourceDistributionItem,
  type TrainingResourceDirection,
  type TrainingResourceLevel,
  type TrainingResourceMockItem,
  type TrainingResourceSource,
  type TrainingResourceStatus,
} from '@/mock/admin/training'
import {
  Button,
  Card,
  CardContent,
  Input,
  Select,
  SelectItem,
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
const statusFilter = ref('')
const directionFilter = ref('')
const levelFilter = ref('')
const sourceFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const totalResourceCount = 68
const pageNumbers = [1, 2, 3, 4, 5, 6, 7]

const toneClassMap = {
  blue: {
    iconWrap: 'bg-[#E9F2FF] text-primary',
    dot: 'bg-primary',
  },
  green: {
    iconWrap: 'bg-[#E9F8F0] text-success',
    dot: 'bg-success',
  },
  orange: {
    iconWrap: 'bg-[#FFF1E2] text-warning',
    dot: 'bg-warning',
  },
  purple: {
    iconWrap: 'bg-[#F0E8FF] text-purple',
    dot: 'bg-purple',
  },
  slate: {
    iconWrap: 'bg-neutral-bg text-neutral',
    dot: 'bg-[#98A2B3]',
  },
}

const iconTextMap: Record<string, string> = {
  list: '▤',
  check: '✓',
  edit: '✎',
  book: '▮',
}

const distributionToneDotMap: Record<ResourceDistributionItem['tone'], string> = {
  blue: 'bg-primary',
  green: 'bg-success',
  orange: 'bg-warning',
  purple: 'bg-purple',
  slate: 'bg-[#98A2B3]',
}

const DistributionList = defineComponent({
  name: 'DistributionList',
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array as PropType<ResourceDistributionItem[]>,
      required: true,
    },
  },
  setup(props) {
    return () =>
      h('div', { class: 'space-y-4' }, [
        h('h3', { class: 'text-sm font-semibold text-text-primary' }, props.title),
        h(
          'div',
          { class: 'space-y-3' },
          props.items.map((item) =>
            h('div', { class: 'flex items-center justify-between gap-3 text-sm', key: item.key }, [
              h('div', { class: 'flex min-w-0 items-center gap-3' }, [
                h('span', { class: `h-2 w-2 rounded-full ${distributionToneDotMap[item.tone]}` }),
                h('span', { class: 'truncate text-text-primary' }, item.label),
              ]),
              h('span', { class: 'shrink-0 text-text-secondary' }, `${item.value} (${item.percent})`),
            ]),
          ),
        ),
      ])
  },
})

const filteredResources = computed(() => {
  const searchText = keyword.value.trim().toLowerCase()

  return trainingResources.filter((resource) => {
    const matchesKeyword = searchText
      ? [resource.name, resource.institution, ...resource.keywords].some((field) => field.toLowerCase().includes(searchText))
      : true
    const matchesStatus = statusFilter.value ? resource.status === statusFilter.value : true
    const matchesDirection = directionFilter.value ? resource.direction === directionFilter.value : true
    const matchesLevel = levelFilter.value ? resource.level === levelFilter.value : true
    const matchesSource = sourceFilter.value ? resource.source === sourceFilter.value : true

    return matchesKeyword && matchesStatus && matchesDirection && matchesLevel && matchesSource
  })
})

const pagedResources = computed(() => filteredResources.value.slice(0, pageSize.value))

function resetFilters() {
  keyword.value = ''
  statusFilter.value = ''
  directionFilter.value = ''
  levelFilter.value = ''
  sourceFilter.value = ''
  currentPage.value = 1
}

function runQuery() {
  currentPage.value = 1
}

function viewIncompleteResources() {
  statusFilter.value = 'incomplete'
  currentPage.value = 1
}

function openDetail(resource: TrainingResourceMockItem) {
  selectedResource.value = resource
  detailOpen.value = true
}

function statusTone(status: TrainingResourceStatus) {
  if (status === 'available') return 'bg-success-bg text-success border-success/20'
  if (status === 'incomplete') return 'bg-warning-bg text-warning border-warning/20'
  return 'bg-neutral-bg text-neutral border-neutral/20'
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-4">
      <section class="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
        <Card
          v-for="stat in trainingResourceStats"
          :key="stat.key"
          class="rounded-[10px] border-[#E5ECF8] shadow-card"
        >
          <CardContent class="flex items-center gap-7 p-6">
            <div
              class="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-4xl font-semibold"
              :class="toneClassMap[stat.tone].iconWrap"
            >
              {{ iconTextMap[stat.icon] }}
            </div>
            <div class="min-w-0">
              <p class="text-[15px] font-semibold text-text-primary">{{ stat.title }}</p>
              <div class="mt-3 flex items-end gap-1">
                <span class="text-[32px] font-bold leading-none text-text-primary">{{ stat.value }}</span>
                <span class="pb-1 text-base font-medium text-text-primary">{{ stat.unit }}</span>
              </div>
              <p class="mt-3 text-sm text-text-secondary">{{ stat.description }}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <Card class="min-w-0 rounded-[10px] border-[#E5ECF8] shadow-card">
          <CardContent class="p-4">
            <div class="grid gap-4 lg:grid-cols-4">
              <label class="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-3 text-sm font-medium text-text-primary">
                <span>资源状态：</span>
                <Select v-model="statusFilter" class="h-9 rounded-md">
                  <SelectItem value="">全部</SelectItem>
                  <SelectItem v-for="(label, value) in trainingResourceStatusText" :key="value" :value="value">
                    {{ label }}
                  </SelectItem>
                </Select>
              </label>

              <label class="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-3 text-sm font-medium text-text-primary">
                <span>培训方向：</span>
                <Select v-model="directionFilter" class="h-9 rounded-md">
                  <SelectItem value="">全部</SelectItem>
                  <SelectItem v-for="(label, value) in trainingResourceDirectionText" :key="value" :value="value">
                    {{ label }}
                  </SelectItem>
                </Select>
              </label>

              <label class="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-3 text-sm font-medium text-text-primary">
                <span>培训级别：</span>
                <Select v-model="levelFilter" class="h-9 rounded-md">
                  <SelectItem value="">全部</SelectItem>
                  <SelectItem v-for="(label, value) in trainingResourceLevelText" :key="value" :value="value">
                    {{ label }}
                  </SelectItem>
                </Select>
              </label>

              <label class="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-3 text-sm font-medium text-text-primary">
                <span>资源来源：</span>
                <Select v-model="sourceFilter" class="h-9 rounded-md">
                  <SelectItem value="">全部</SelectItem>
                  <SelectItem v-for="(label, value) in trainingResourceSourceText" :key="value" :value="value">
                    {{ label }}
                  </SelectItem>
                </Select>
              </label>
            </div>

            <div class="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div class="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:items-center">
                <span class="shrink-0 text-sm font-medium text-text-primary">搜索：</span>
                <Input
                  v-model="keyword"
                  class="h-9 max-w-[360px] rounded-md"
                  placeholder="请输入资源名称、培训机构、关键词"
                  @keyup.enter="runQuery"
                />
                <Button variant="outline" size="sm" class="h-9 min-w-16 rounded-md" @click="resetFilters">重置</Button>
                <Button size="sm" class="h-9 min-w-16 rounded-md" @click="runQuery">查询</Button>
              </div>

              <Button size="md" class="h-9 min-w-[108px] rounded-md">
                + 新增资源
              </Button>
            </div>

            <div class="mt-4 overflow-x-auto rounded-[8px] border border-card-border">
              <Table class="min-w-[780px]">
                <TableHeader>
                  <TableRow class="bg-[#F8FAFE]">
                    <TableHead class="w-[170px] px-2.5">资源名称</TableHead>
                    <TableHead class="w-[80px] px-2.5">培训方向</TableHead>
                    <TableHead class="w-[90px] px-2.5">级别 / 学时</TableHead>
                    <TableHead class="w-[120px] px-2.5">培训机构</TableHead>
                    <TableHead class="w-[90px] px-2.5">适合对象</TableHead>
                    <TableHead class="w-[80px] px-2.5">资源来源</TableHead>
                    <TableHead class="w-[95px] px-2.5">资源状态</TableHead>
                    <TableHead class="w-[55px] px-2.5">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="resource in pagedResources" :key="resource.id" class="h-[56px]">
                    <TableCell class="px-2.5 font-medium leading-relaxed text-text-primary">{{ resource.name }}</TableCell>
                    <TableCell class="px-2.5">{{ trainingResourceDirectionText[resource.direction] }}</TableCell>
                    <TableCell class="px-2.5">
                      <span>{{ trainingResourceLevelText[resource.level] }} /</span>
                      <span class="ml-1">{{ resource.hours }}学时</span>
                    </TableCell>
                    <TableCell class="px-2.5 leading-relaxed">{{ resource.institution }}</TableCell>
                    <TableCell class="px-2.5">{{ resource.audience }}</TableCell>
                    <TableCell class="px-2.5">{{ trainingResourceSourceText[resource.source] }}</TableCell>
                    <TableCell class="px-2.5">
                      <span
                        class="inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold"
                        :class="statusTone(resource.status)"
                      >
                        {{ trainingResourceStatusText[resource.status] }}
                      </span>
                    </TableCell>
                    <TableCell class="px-2.5">
                      <button type="button" class="text-sm font-semibold text-primary hover:text-primary-hover" @click="openDetail(resource)">
                        查看
                      </button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div class="mt-4 flex flex-col gap-3 text-sm text-text-secondary lg:flex-row lg:items-center lg:justify-between">
              <div class="flex items-center gap-4">
                <span>共 {{ totalResourceCount }} 条</span>
                <Select v-model="pageSize" class="h-9 w-[120px] rounded-md">
                  <SelectItem :value="10">10条/页</SelectItem>
                  <SelectItem :value="20">20条/页</SelectItem>
                </Select>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <Button variant="outline" size="icon" class="h-9 w-9 rounded-md">‹</Button>
                <button
                  v-for="page in pageNumbers"
                  :key="page"
                  type="button"
                  class="flex h-9 w-9 items-center justify-center rounded-md text-sm font-semibold"
                  :class="page === currentPage ? 'bg-primary-soft text-primary' : 'text-text-primary hover:bg-primary-soft'"
                  @click="currentPage = page"
                >
                  {{ page }}
                </button>
                <Button variant="outline" size="icon" class="h-9 w-9 rounded-md">›</Button>
                <span>前往</span>
                <Input v-model="currentPage" class="h-9 w-12 rounded-md text-center" type="number" min="1" />
                <span>页</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <aside class="space-y-4">
          <Card class="rounded-[10px] border-[#E5ECF8] shadow-card">
            <CardContent class="p-5">
              <h2 class="text-base font-semibold text-text-primary">资源概览</h2>

              <div class="mt-4 space-y-4">
                <section class="rounded-[8px] border border-card-border p-4">
                  <DistributionList title="资源来源分布" :items="resourceSourceDistribution" />
                </section>

                <section class="rounded-[8px] border border-card-border p-4">
                  <DistributionList title="按培训级别分布" :items="resourceLevelDistribution" />
                </section>

                <section class="rounded-[8px] border border-card-border p-4">
                  <DistributionList title="资源状态分布" :items="resourceStatusDistribution" />
                </section>
              </div>

              <Button variant="outline" class="mt-5 h-11 w-full rounded-md border-primary text-primary hover:bg-primary-soft" @click="viewIncompleteResources">
                查看待完善资源
              </Button>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>

    <TrainingResourceDetailSheet v-model:open="detailOpen" :resource="selectedResource" />
  </AdminLayout>
</template>
