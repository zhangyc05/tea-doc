<script setup lang="ts">
import { computed, ref } from 'vue'

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
  type TrainingResourceMockItem,
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

const statToneClassMap = {
  blue: 'tone-blue',
  green: 'tone-green',
  orange: 'tone-orange',
  purple: 'tone-purple',
}

const directionToneMap = {
  digitalTeaching: 'tone-blue',
  aiCourse: 'tone-purple',
  practiceTeaching: 'tone-green',
  courseIdeology: 'tone-orange',
  teachingEvaluation: 'tone-slate',
  teachingInnovation: 'tone-blue',
}

const activeFilterCount = computed(() => {
  return [keyword.value, statusFilter.value, directionFilter.value, levelFilter.value, sourceFilter.value].filter(Boolean).length
})

const filteredResources = computed(() => {
  const searchText = keyword.value.trim().toLowerCase()

  return trainingResources.filter((resource) => {
    const matchesKeyword = searchText
      ? [resource.name, resource.institution, resource.audience, resource.description, ...resource.keywords].some((field) =>
          field.toLowerCase().includes(searchText),
        )
      : true
    const matchesStatus = statusFilter.value ? resource.status === statusFilter.value : true
    const matchesDirection = directionFilter.value ? resource.direction === directionFilter.value : true
    const matchesLevel = levelFilter.value ? resource.level === levelFilter.value : true
    const matchesSource = sourceFilter.value ? resource.source === sourceFilter.value : true

    return matchesKeyword && matchesStatus && matchesDirection && matchesLevel && matchesSource
  })
})

const pagedResources = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredResources.value.slice(start, start + pageSize.value)
})

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

function quickStatus(status: TrainingResourceStatus | '') {
  statusFilter.value = status
  currentPage.value = 1
}

function viewIncompleteResources() {
  quickStatus('incomplete')
}

function openDetail(resource: TrainingResourceMockItem) {
  selectedResource.value = resource
  detailOpen.value = true
}

function statusTone(status: TrainingResourceStatus) {
  if (status === 'available') return 'status-success'
  if (status === 'incomplete') return 'status-warning'
  return 'status-neutral'
}

function distributionDotClass(tone: ResourceDistributionItem['tone']) {
  if (tone === 'green') return 'dot-success'
  if (tone === 'orange') return 'dot-warning'
  if (tone === 'purple') return 'dot-purple'
  if (tone === 'slate') return 'dot-slate'
  return 'dot-primary'
}
</script>

<template>
  <AdminLayout>
    <div class="resource-page">
      <section class="resource-hero">
        <div class="hero-copy">
          <div class="hero-eyebrow">
            <span>培训管理</span>
            <i />
            <span>资源库</span>
          </div>
          <h1>培训资源库</h1>
          <p>统一维护校内建设、外部机构、企业合作和公开课程等培训资源，供培训计划、需求匹配和教师申请场景调用。</p>
          <div class="hero-tags">
            <span>当前范围：全校</span>
            <span>周期：2026 年度</span>
            <span>资源口径：可用 / 待完善 / 停用</span>
          </div>
        </div>

        <div class="hero-actions">
          <Button variant="outline" class="hero-secondary">导出资源</Button>
          <Button class="hero-primary">新增资源</Button>
        </div>
      </section>

      <section class="stat-grid">
        <Card
          v-for="stat in trainingResourceStats"
          :key="stat.key"
          class="stat-card"
          :class="statToneClassMap[stat.tone]"
        >
          <CardContent class="stat-card-content">
            <div class="stat-head">
              <span>{{ stat.title }}</span>
              <i />
            </div>
            <div class="stat-value">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.unit }}</span>
            </div>
            <p>{{ stat.description }}</p>
          </CardContent>
        </Card>
      </section>

      <section class="resource-layout">
        <div class="main-panel">
          <Card class="filter-card">
            <CardContent class="filter-content">
              <div class="filter-title-row">
                <div>
                  <h2>筛选资源</h2>
                  <p>从资源状态、方向、级别、来源和关键词快速定位培训资源。</p>
                </div>
                <div class="filter-summary">
                  <span v-if="activeFilterCount">已启用 {{ activeFilterCount }} 个筛选</span>
                  <span v-else>未启用筛选</span>
                </div>
              </div>

              <div class="quick-status-row">
                <button type="button" :class="!statusFilter ? 'active' : ''" @click="quickStatus('')">全部</button>
                <button type="button" :class="statusFilter === 'available' ? 'active success' : ''" @click="quickStatus('available')">可用资源</button>
                <button type="button" :class="statusFilter === 'incomplete' ? 'active warning' : ''" @click="quickStatus('incomplete')">信息待完善</button>
                <button type="button" :class="statusFilter === 'disabled' ? 'active neutral' : ''" @click="quickStatus('disabled')">已停用</button>
              </div>

              <div class="filter-grid">
                <label>
                  <span>培训方向</span>
                  <Select v-model="directionFilter">
                    <SelectItem value="">全部方向</SelectItem>
                    <SelectItem v-for="(label, value) in trainingResourceDirectionText" :key="value" :value="value">
                      {{ label }}
                    </SelectItem>
                  </Select>
                </label>

                <label>
                  <span>培训级别</span>
                  <Select v-model="levelFilter">
                    <SelectItem value="">全部级别</SelectItem>
                    <SelectItem v-for="(label, value) in trainingResourceLevelText" :key="value" :value="value">
                      {{ label }}
                    </SelectItem>
                  </Select>
                </label>

                <label>
                  <span>资源来源</span>
                  <Select v-model="sourceFilter">
                    <SelectItem value="">全部来源</SelectItem>
                    <SelectItem v-for="(label, value) in trainingResourceSourceText" :key="value" :value="value">
                      {{ label }}
                    </SelectItem>
                  </Select>
                </label>
              </div>

              <div class="search-row">
                <Input
                  v-model="keyword"
                  placeholder="搜索资源名称、培训机构、适合对象或关键词"
                  @keyup.enter="runQuery"
                />
                <Button variant="outline" @click="resetFilters">重置</Button>
                <Button @click="runQuery">查询</Button>
              </div>
            </CardContent>
          </Card>

          <Card class="list-card">
            <CardContent class="list-content">
              <div class="list-title-row">
                <div>
                  <h2>资源列表</h2>
                  <p>当前筛选结果 {{ filteredResources.length }} 条，资源库共 {{ totalResourceCount }} 条。</p>
                </div>
                <Button variant="outline" class="list-light-action" @click="viewIncompleteResources">查看待完善资源</Button>
              </div>

              <div class="table-shell">
                <Table class="resource-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead class="resource-name-col">资源名称</TableHead>
                      <TableHead>方向</TableHead>
                      <TableHead>级别 / 学时</TableHead>
                      <TableHead>机构与对象</TableHead>
                      <TableHead>来源</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead class="action-col">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-if="pagedResources.length === 0">
                      <TableCell colspan="7">
                        <div class="empty-state">
                          <h3>暂无匹配资源</h3>
                          <p>请调整筛选条件，或新增可用培训资源。</p>
                          <Button variant="outline" @click="resetFilters">清空筛选</Button>
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow v-for="resource in pagedResources" :key="resource.id" class="resource-row">
                      <TableCell class="resource-name-cell">
                        <div class="resource-title-wrap">
                          <strong>{{ resource.name }}</strong>
                          <p>{{ resource.description }}</p>
                          <div class="keyword-row">
                            <span v-for="keywordItem in resource.keywords.slice(0, 3)" :key="keywordItem">{{ keywordItem }}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span class="direction-pill" :class="directionToneMap[resource.direction]">
                          {{ trainingResourceDirectionText[resource.direction] }}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div class="level-cell">
                          <strong>{{ trainingResourceLevelText[resource.level] }}</strong>
                          <span>{{ resource.hours }} 学时</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div class="org-cell">
                          <strong>{{ resource.institution }}</strong>
                          <span>{{ resource.audience }}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span class="source-pill">{{ trainingResourceSourceText[resource.source] }}</span>
                      </TableCell>
                      <TableCell>
                        <span class="status-pill" :class="statusTone(resource.status)">
                          {{ trainingResourceStatusText[resource.status] }}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" class="row-action" @click="openDetail(resource)">查看</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div class="pagination-row">
                <div class="page-size">
                  <span>共 {{ totalResourceCount }} 条</span>
                  <Select v-model="pageSize">
                    <SelectItem :value="10">10 条 / 页</SelectItem>
                    <SelectItem :value="20">20 条 / 页</SelectItem>
                  </Select>
                </div>

                <div class="page-actions">
                  <Button variant="outline" size="icon">‹</Button>
                  <button
                    v-for="page in pageNumbers"
                    :key="page"
                    type="button"
                    :class="page === currentPage ? 'active' : ''"
                    @click="currentPage = page"
                  >
                    {{ page }}
                  </button>
                  <Button variant="outline" size="icon">›</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside class="side-panel">
          <Card class="overview-card">
            <CardContent class="overview-content">
              <div class="overview-head">
                <div>
                  <h2>资源概览</h2>
                  <p>看资源结构，不关联需求、计划或匹配结果。</p>
                </div>
                <span>结构</span>
              </div>

              <section class="distribution-section source-section">
                <h3>资源来源分布</h3>
                <div class="distribution-list">
                  <div v-for="item in resourceSourceDistribution" :key="item.key" class="distribution-item">
                    <div>
                      <i :class="distributionDotClass(item.tone)" />
                      <span>{{ item.label }}</span>
                    </div>
                    <strong>{{ item.value }} · {{ item.percent }}</strong>
                  </div>
                </div>
              </section>

              <section class="distribution-section">
                <h3>按培训级别分布</h3>
                <div class="distribution-list compact">
                  <div v-for="item in resourceLevelDistribution" :key="item.key" class="distribution-item">
                    <div>
                      <i :class="distributionDotClass(item.tone)" />
                      <span>{{ item.label }}</span>
                    </div>
                    <strong>{{ item.value }}</strong>
                  </div>
                </div>
              </section>

              <section class="distribution-section">
                <h3>资源状态分布</h3>
                <div class="distribution-list compact">
                  <div v-for="item in resourceStatusDistribution" :key="item.key" class="distribution-item">
                    <div>
                      <i :class="distributionDotClass(item.tone)" />
                      <span>{{ item.label }}</span>
                    </div>
                    <strong>{{ item.value }}</strong>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>

    <TrainingResourceDetailSheet v-model:open="detailOpen" :resource="selectedResource" />
  </AdminLayout>
</template>

<style scoped>
.resource-page {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.resource-hero,
.stat-card,
.filter-card,
.list-card,
.overview-card {
  border: 1px solid var(--color-card-border);
  border-radius: 24px;
  background: var(--color-card-bg);
  box-shadow: var(--shadow-card);
}

.resource-hero {
  min-height: 260px;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 36px 34px;
  overflow: hidden;
}

.hero-copy {
  min-width: 0;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  color: var(--color-primary);
  font-size: 16px;
  font-weight: 800;
}

.hero-eyebrow i {
  width: 5px;
  height: 5px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
}

.resource-hero h1 {
  margin: 0 0 20px;
  color: var(--color-text-primary);
  font-size: 36px;
  font-weight: 900;
  line-height: 1.15;
}

.resource-hero p {
  max-width: 980px;
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 17px;
  font-weight: 600;
  line-height: 1.7;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.hero-tags span {
  padding: 8px 14px;
  border-radius: var(--radius-full);
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 15px;
  font-weight: 800;
}

.hero-actions {
  display: flex;
  flex: none;
  align-items: flex-start;
  gap: 14px;
}

.hero-primary,
.hero-secondary {
  height: 54px;
  min-width: 118px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 800;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.stat-card {
  position: relative;
  min-height: 178px;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  inset: 8px auto 8px 0;
  width: 5px;
  border-radius: 0 999px 999px 0;
  background: var(--color-primary);
}

.stat-card.tone-green::before {
  background: var(--color-success);
}

.stat-card.tone-orange::before {
  background: var(--color-warning);
}

.stat-card.tone-purple::before {
  background: var(--color-purple);
}

.stat-card-content {
  padding: 30px 28px;
}

.stat-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.stat-head span {
  color: var(--color-text-secondary);
  font-size: 16px;
  font-weight: 800;
}

.stat-head i {
  width: 14px;
  height: 14px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
}

.stat-card.tone-green .stat-head i {
  background: var(--color-success);
}

.stat-card.tone-orange .stat-head i {
  background: var(--color-warning);
}

.stat-card.tone-purple .stat-head i {
  background: var(--color-purple);
}

.stat-value {
  display: flex;
  align-items: flex-end;
  gap: 5px;
  margin-top: 20px;
}

.stat-value strong {
  color: var(--color-text-primary);
  font-size: 44px;
  line-height: 0.9;
}

.stat-value span {
  padding-bottom: 4px;
  color: var(--color-text-secondary);
  font-size: 18px;
  font-weight: 800;
}

.stat-card p {
  margin: 18px 0 0;
  color: var(--color-text-tertiary);
  font-size: 15px;
  font-weight: 600;
}

.resource-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 400px;
  gap: 26px;
  align-items: start;
}

.main-panel,
.side-panel {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 22px;
}

.filter-card,
.overview-card {
  min-height: 386px;
}

.filter-content,
.list-content,
.overview-content {
  padding: 28px;
}

.filter-title-row,
.list-title-row,
.overview-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.filter-title-row h2,
.list-title-row h2,
.overview-head h2 {
  margin: 0 0 12px;
  color: var(--color-text-primary);
  font-size: 26px;
  font-weight: 900;
}

.filter-title-row p,
.list-title-row p,
.overview-head p {
  max-width: 690px;
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.7;
}

.filter-summary,
.overview-head > span {
  flex: none;
  padding: 8px 12px;
  border-radius: var(--radius-full);
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 15px;
  font-weight: 800;
}

.quick-status-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}

.quick-status-row button,
.page-actions button {
  border: 1px solid var(--color-card-border);
  background: var(--color-card-bg);
  color: var(--color-text-secondary);
  cursor: pointer;
}

.quick-status-row button {
  height: 48px;
  padding: 0 20px;
  border-radius: var(--radius-full);
  font-size: 16px;
  font-weight: 800;
}

.quick-status-row button.active {
  border-color: var(--color-primary-light);
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.quick-status-row button.active.success {
  border-color: var(--color-success-bg);
  background: var(--color-success-bg);
  color: var(--color-success);
}

.quick-status-row button.active.warning {
  border-color: var(--color-warning-bg);
  background: var(--color-warning-bg);
  color: var(--color-warning);
}

.quick-status-row button.active.neutral {
  border-color: var(--color-neutral-bg);
  background: var(--color-neutral-bg);
  color: var(--color-neutral);
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 26px;
}

.filter-grid label {
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--color-text-primary);
  font-size: 16px;
  font-weight: 900;
}

.filter-grid :deep(select),
.search-row :deep(input) {
  height: 54px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
}

.search-row {
  display: grid;
  grid-template-columns: minmax(420px, 1fr) 82px 82px;
  gap: 14px;
  margin-top: 24px;
}

.search-row :deep(button) {
  height: 54px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 800;
}

.table-shell {
  margin-top: 18px;
  overflow-x: auto;
  border: 1px solid var(--color-card-border);
  border-radius: 14px;
}

.resource-table {
  min-width: 940px;
}

.resource-table :deep(thead tr) {
  background: var(--color-page-bg-soft);
}

.resource-table :deep(th) {
  height: 44px;
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 800;
}

.resource-row {
  height: 86px;
}

.resource-name-col {
  width: 280px;
}

.action-col {
  width: 72px;
}

.resource-title-wrap strong,
.level-cell strong,
.org-cell strong {
  display: block;
  color: var(--color-text-primary);
  font-size: 13px;
  line-height: 1.5;
}

.resource-title-wrap p {
  display: -webkit-box;
  margin: 5px 0 8px;
  overflow: hidden;
  color: var(--color-text-secondary);
  font-size: 12px;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.keyword-row {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.keyword-row span,
.source-pill,
.direction-pill,
.status-pill {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.keyword-row span {
  padding: 3px 7px;
  background: var(--color-page-bg-soft);
  color: var(--color-text-tertiary);
}

.direction-pill,
.status-pill,
.source-pill {
  padding: 5px 9px;
}

.direction-pill.tone-blue,
.direction-pill.tone-purple {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.direction-pill.tone-green {
  background: var(--color-success-bg);
  color: var(--color-success);
}

.direction-pill.tone-orange {
  background: var(--color-warning-bg);
  color: var(--color-warning);
}

.direction-pill.tone-slate,
.source-pill {
  background: var(--color-neutral-bg);
  color: var(--color-neutral);
}

.level-cell span,
.org-cell span {
  display: block;
  margin-top: 4px;
  color: var(--color-text-tertiary);
  font-size: 12px;
}

.status-success {
  background: var(--color-success-bg);
  color: var(--color-success);
}

.status-warning {
  background: var(--color-warning-bg);
  color: var(--color-warning);
}

.status-neutral {
  background: var(--color-neutral-bg);
  color: var(--color-neutral);
}

.row-action {
  padding-inline: 10px;
  color: var(--color-primary);
  font-weight: 800;
}

.empty-state {
  display: flex;
  min-height: 180px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--color-text-secondary);
}

.empty-state h3 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: 16px;
}

.empty-state p {
  margin: 0;
}

.pagination-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-top: 16px;
  color: var(--color-text-secondary);
  font-size: 13px;
}

.page-size,
.page-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-actions button {
  display: inline-flex;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: 800;
}

.page-actions button.active {
  border-color: var(--color-primary-light);
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.distribution-section {
  margin-top: 22px;
  padding: 24px;
  border: 1px solid var(--color-card-border);
  border-radius: 20px;
  background: var(--color-card-bg);
}

.source-section {
  min-height: 232px;
}

.distribution-section h3 {
  margin: 0 0 20px;
  color: var(--color-text-primary);
  font-size: 18px;
  font-weight: 900;
}

.distribution-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.distribution-list.compact {
  gap: 12px;
}

.distribution-item {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  color: var(--color-text-secondary);
  font-size: 15px;
  font-weight: 700;
}

.distribution-item > div {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 12px;
}

.distribution-item i {
  flex: none;
  width: 11px;
  height: 11px;
  border-radius: var(--radius-full);
}

.distribution-item strong {
  color: var(--color-text-primary);
  font-size: 15px;
  font-weight: 900;
}

.dot-primary {
  background: var(--color-primary);
}

.dot-success {
  background: var(--color-success);
}

.dot-warning {
  background: var(--color-warning);
}

.dot-purple {
  background: var(--color-purple);
}

.dot-slate {
  background: var(--color-neutral);
}

@media (max-width: 1280px) {
  .stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .resource-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 860px) {
  .resource-hero,
  .filter-title-row,
  .list-title-row,
  .overview-head,
  .pagination-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-actions,
  .search-row {
    width: 100%;
  }

  .filter-grid,
  .search-row,
  .stat-grid {
    grid-template-columns: 1fr;
  }
}
</style>
