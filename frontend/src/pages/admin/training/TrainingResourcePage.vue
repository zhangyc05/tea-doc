<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { AdminIcon, AdminInput, AdminPagination, AdminSelect, AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { CompactFilterBar, InsightSidebar, StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {
  addTrainingResourceDraft,
  getTrainingState,
  type TrainingResource,
} from '@/stores/admin/trainingStore'

const trainingState = getTrainingState()
const route = useRoute()

// 筛选条件
const selectedStatus = ref('全部')
const selectedDirection = ref('全部')
const selectedLevel = ref('全部')
const selectedSource = ref('全部')
const searchQuery = ref('')
const appliedSearchQuery = ref('')
const activeResourceId = ref('1')
const currentPage = ref(1)
const pageSize = 10

const statusOptions = ['全部', '可用', '信息待完善', '已停用'].map((value) => ({ label: value, value }))
const directionOptions = ['全部', '数字化教学', 'AI 课程建设', '实践教学', '课程思政'].map((value) => ({ label: value, value }))
const levelOptions = ['全部', '国家级', '省级', '市级', '校级', '企业培训'].map((value) => ({ label: value, value }))
const sourceOptions = ['全部', '校内建设', '外部机构', '企业合作', '公开课程'].map((value) => ({ label: value, value }))

// 统计数据
const stats = computed(() => ({
  total: trainingState.resources.length,
  available: trainingState.resources.filter(resource => resource.status === '可用').length,
  incomplete: trainingState.resources.filter(resource => resource.status === '信息待完善').length,
  sourceTypes: new Set(trainingState.resources.map(resource => resource.source)).size,
}))
const resources = computed(() => trainingState.resources)

// 右侧资源概览
const resourceOverview = {
  sourceDistribution: [
    { label: '校内建设', count: 18, rate: '26.5%' },
    { label: '外部机构', count: 24, rate: '35.3%' },
    { label: '企业合作', count: 14, rate: '20.6%' },
    { label: '公开课程', count: 12, rate: '17.6%' },
  ],
  levelDistribution: [
    { label: '国家级', count: 8, rate: '11.8%' },
    { label: '省级', count: 22, rate: '32.4%' },
    { label: '市级', count: 12, rate: '17.6%' },
    { label: '校级', count: 16, rate: '23.5%' },
    { label: '企业培训', count: 10, rate: '14.7%' },
  ],
  statusDistribution: [
    { label: '可用资源', count: 52, rate: '76.5%' },
    { label: '信息待完善', count: 10, rate: '14.7%' },
    { label: '已停用', count: 6, rate: '8.8%' },
  ],
}

const filteredResources = computed(() => {
  const keyword = appliedSearchQuery.value.trim().toLowerCase()

  return resources.value.filter((resource) => {
    const matchesStatus = selectedStatus.value === '全部' || resource.status === selectedStatus.value
    const matchesDirection = selectedDirection.value === '全部' || resource.direction === selectedDirection.value
    const matchesLevel = selectedLevel.value === '全部' || resource.level === selectedLevel.value
    const matchesSource = selectedSource.value === '全部' || resource.source === selectedSource.value
    const matchesKeyword = !keyword
      || `${resource.name} ${resource.institution} ${resource.direction} ${resource.target}`
        .toLowerCase()
        .includes(keyword)

    return matchesStatus && matchesDirection && matchesLevel && matchesSource && matchesKeyword
  })
})

const activeResource = computed(() => {
  return resources.value.find((resource) => resource.id === activeResourceId.value) ?? resources.value[0]
})

function resetFilters() {
  selectedStatus.value = '全部'
  selectedDirection.value = '全部'
  selectedLevel.value = '全部'
  selectedSource.value = '全部'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  trainingState.operationMessage = '已重置筛选条件。'
}

function viewDetail(id: string) {
  activeResourceId.value = id
  trainingState.operationMessage = '已在右侧展示资源摘要。'
}

function resourceRowClassName({ row }: { row: TrainingResource }) {
  return activeResourceId.value === row.id ? 'resource-row active' : 'resource-row'
}

function addResource() {
  const draft = addTrainingResourceDraft()
  activeResourceId.value = draft.id
  selectedStatus.value = '信息待完善'
  appliedSearchQuery.value = ''
  searchQuery.value = ''
}

function applyFilters() {
  appliedSearchQuery.value = searchQuery.value
  trainingState.operationMessage = `已筛选出 ${filteredResources.value.length} 条资源。`
}

function showIncompleteResources() {
  selectedStatus.value = '信息待完善'
  selectedDirection.value = '全部'
  selectedLevel.value = '全部'
  selectedSource.value = '全部'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  trainingState.operationMessage = '已切换到待完善资源。'
}
</script>

<template>
  <AdminLayout active-key="training-resources">
    <div class="training-resource-page">
      <!-- 页面头部 -->
      

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-icon icon-file"><AdminIcon name="files" /></div>
            <div>
              <div class="stat-label">资源总数</div>
              <div class="stat-value">{{ stats.total }} <span>个</span></div>
              <div class="stat-desc">资源库内全部培训资源</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-check"><AdminIcon name="check" /></div>
            <div>
              <div class="stat-label">可用资源</div>
              <div class="stat-value">{{ stats.available }} <span>个</span></div>
              <div class="stat-desc">信息完整、当前可被使用</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-edit"><AdminIcon name="edit" /></div>
            <div>
              <div class="stat-label">信息待完善</div>
              <div class="stat-value">{{ stats.incomplete }} <span>个</span></div>
              <div class="stat-desc">缺少关键字段需完善</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-book"><AdminIcon name="notebook" /></div>
            <div>
              <div class="stat-label">资源来源</div>
              <div class="stat-value">{{ stats.sourceTypes }} <span>类</span></div>
              <div class="stat-desc">校内建设、外部机构等</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="resource-workspace">
          <!-- 左侧：资源列表 -->
          <div class="main-content">
            <div class="content-card">
              <!-- 筛选区 -->
              <CompactFilterBar>
                <template #fields>
                  <div class="filter-item">
                    <label class="filter-label">资源状态</label>
                    <AdminSelect v-model="selectedStatus" class="filter-select" :options="statusOptions" />
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">培训方向</label>
                    <AdminSelect v-model="selectedDirection" class="filter-select" :options="directionOptions" />
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">培训级别</label>
                    <AdminSelect v-model="selectedLevel" class="filter-select" :options="levelOptions" />
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">资源来源</label>
                    <AdminSelect v-model="selectedSource" class="filter-select" :options="sourceOptions" />
                  </div>
                </template>
                <template #search>
                  <AdminInput
                    v-model="searchQuery"
                    placeholder="搜索资源名称/培训机构/关键词"
                    class="search-input"
                    @keyup.enter="applyFilters"
                  />
                </template>
                <template #actions>
                  <Button variant="outline" @click="resetFilters">重置</Button>
                  <Button variant="secondary" @click="applyFilters">查询</Button>
                  <Button class="resource-create-action" @click="addResource">
                    <AdminIcon name="plus" />
                    新增资源
                  </Button>
                </template>
                <template #message>
                  <div v-if="trainingState.operationMessage" class="operation-message">{{ trainingState.operationMessage }}</div>
                </template>
              </CompactFilterBar>

              <!-- 数据表格 -->
              <div class="table-container">
                <AdminTable
                  class="resource-table"
                  :data="filteredResources"
                  :row-class-name="resourceRowClassName"
                  empty-text="暂无符合条件的培训资源"
                >
                  <AdminTableColumn label="资源名称" min-width="210">
                    <template #default="{ row }">
                      <span class="resource-name">{{ row.name }}</span>
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn prop="direction" label="培训方向" min-width="110" />
                  <AdminTableColumn label="级别 / 学时" min-width="120">
                    <template #default="{ row }">
                      {{ row.level }} / {{ row.hours }}
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn prop="institution" label="培训机构" min-width="160" />
                  <AdminTableColumn prop="target" label="适合对象" min-width="120" />
                  <AdminTableColumn prop="source" label="资源来源" min-width="100" />
                  <AdminTableColumn label="资源状态" min-width="110">
                    <template #default="{ row }">
                      <StatusBadge :status="row.status" />
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn label="操作" min-width="90" fixed="right">
                    <template #default="{ row }">
                      <Button variant="ghost" size="sm" @click="viewDetail(row.id)">
                        查看
                      </Button>
                    </template>
                  </AdminTableColumn>
                </AdminTable>
              </div>
              <AdminPagination
                v-model:current-page="currentPage"
                class="pagination-row"
                :page-size="pageSize"
                :total="filteredResources.length"
              />
            </div>
          </div>

          <!-- 右侧：资源概览 -->
          <div class="sidebar">
            <InsightSidebar title="资源概览">
              <template #items>
              <div class="overview-section">
                <h4 class="section-title">资源来源分布</h4>
                <div class="distribution-list">
                  <div
                    v-for="item in resourceOverview.sourceDistribution"
                    :key="item.label"
                    class="distribution-item"
                  >
                    <span class="item-dot"></span>
                    <span class="item-label">{{ item.label }}</span>
                    <span class="item-count">{{ item.count }} ({{ item.rate }})</span>
                  </div>
                </div>
              </div>

              <div class="overview-section">
                <h4 class="section-title">按培训级别分布</h4>
                <div class="distribution-list">
                  <div
                    v-for="item in resourceOverview.levelDistribution"
                    :key="item.label"
                    class="distribution-item"
                  >
                    <span class="item-dot"></span>
                    <span class="item-label">{{ item.label }}</span>
                    <span class="item-count">{{ item.count }} ({{ item.rate }})</span>
                  </div>
                </div>
              </div>

              <div class="overview-section">
                <h4 class="section-title">资源状态分布</h4>
                <div class="distribution-list">
                  <div
                    v-for="item in resourceOverview.statusDistribution"
                    :key="item.label"
                    class="distribution-item"
                  >
                    <span class="item-dot"></span>
                    <span class="item-label">{{ item.label }}</span>
                    <span class="item-count">{{ item.count }} ({{ item.rate }})</span>
                  </div>
                </div>
              </div>
              </template>

              <template #selected>
              <div class="selected-resource" v-if="activeResource">
                <h4 class="section-title">当前查看资源</h4>
                <div class="selected-name">{{ activeResource.name }}</div>
                <div class="selected-meta">
                  {{ activeResource.level }} · {{ activeResource.hours }} · {{ activeResource.source }}
                </div>
              </div>
              </template>

              <template #action>
              <Button class="full-width" variant="outline" @click="showIncompleteResources">
                查看待完善资源
              </Button>
              </template>
            </InsightSidebar>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.training-resource-page {
  min-height: 100vh;
  background: var(--color-admin-bg);
  color: var(--color-admin-text-strong);
}

.training-resource-page *,
.training-resource-page *::before,
.training-resource-page *::after {
  box-sizing: border-box;
}

.page-header {
  padding: 24px 0 12px;
  background: var(--color-admin-bg);
}

.header-content {
  max-width: 1560px;
  margin: 0 auto;
  padding: 0 22px;
}

.breadcrumb {
  color: var(--color-admin-text-muted);
  font-size: 14px;
  font-weight: 600;
}

.breadcrumb strong {
  color: var(--color-admin-text-strong);
}

.page-title {
  margin: 10px 0 0;
  font-size: 22px;
  font-weight: 700;
  color: #14213d;
}

.stats-section {
  background: var(--color-admin-bg);
}

.stats-container {
  max-width: 1560px;
  margin: 0 auto;
  padding: 0 22px 18px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-admin-lg);
}

.stat-card {
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr);
  align-items: center;
  gap: var(--space-admin-card-gap);
  min-height: 132px;
  padding: 22px 30px;
  background: #fff;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  box-shadow: var(--shadow-admin-card-subtle);
}

.stat-icon {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 10px rgba(255, 255, 255, 0.66);
}

.stat-icon :deep(svg) {
  width: 34px;
  height: 34px;
}

.icon-file {
  color: #18b675;
  background: linear-gradient(145deg, #edfdf5 0%, #d7f7e8 100%);
}

.icon-check {
  color: #1fbd75;
  background: linear-gradient(145deg, #edfdf5 0%, #d7f7e8 100%);
}

.icon-edit {
  color: #ff8a1f;
  background: linear-gradient(145deg, #fff7ec 0%, #ffe8ca 100%);
}

.icon-book {
  color: #7347e9;
  background: linear-gradient(145deg, #f7f0ff 0%, #eadcff 100%);
}

.stat-value {
  margin-top: var(--space-admin-xs);
  font-size: 34px;
  line-height: 1;
  font-weight: 700;
  color: #091632;
}

.stat-value span {
  font-size: 15px;
  font-weight: 600;
}

.stat-label {
  font-size: 15px;
  color: var(--color-admin-text-strong);
  font-weight: 600;
}

.stat-desc {
  margin-top: var(--space-admin-sm);
  font-size: 13px;
  color: #6c7890;
}

.main-section {
  max-width: 1560px;
  margin: 0 auto;
  padding: 0 22px 30px;
}

.resource-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: var(--space-admin-lg);
  align-items: start;
}

.main-content {
  min-width: 0;
}

.content-card {
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border);
  overflow: hidden;
  box-shadow: var(--shadow-admin-card-subtle);
}

.filter-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--space-admin-sm);
  align-items: center;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #1d2b48;
  white-space: nowrap;
}

.filter-select {
  width: 100%;
  height: 38px;
}

.search-input {
  width: 100%;
  min-width: 0;
}

.search-input :deep(.el-input__wrapper) {
  min-height: 40px;
  padding: 0 16px;
  border-radius: var(--radius-sm);
  box-shadow: 0 0 0 1px #d7e2f1 inset;
  transition: box-shadow 0.16s ease;
}

.search-input :deep(.el-input__inner) {
  font-size: 14px;
}

.search-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #1d6df2 inset;
}

.resource-create-action {
  margin-left: auto;
}

.operation-message {
  margin-top: var(--space-admin-sm);
  color: #1d6df2;
  font-size: 13px;
  font-weight: 600;
}

.table-container {
  overflow-x: auto;
  padding: 16px 16px 0;
}

.resource-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid var(--color-admin-border);
}

.resource-table :deep(.el-table__header .el-table__cell) {
  padding: 12px 10px;
  text-align: left;
  font-size: 13px;
  line-height: 1.35;
  font-weight: 600;
  color: var(--color-admin-text-strong);
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid var(--color-admin-border);
  background: var(--color-admin-bg-soft);
}

.resource-table :deep(.el-table__body .el-table__cell) {
  padding: 12px 10px;
  font-size: 13px;
  line-height: 1.55;
  color: #24314c;
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid #e4ecf7;
  vertical-align: middle;
}

.resource-table :deep(.el-table__cell:last-child) {
  border-right: none;
}

:deep(.resource-row.active) {
  background: #f4f8ff;
}

.resource-name {
  font-weight: 600;
  color: #14213d;
}

.resource-table :deep(.el-table__cell:nth-child(1)) {
  width: 22%;
}

.resource-table :deep(.el-table__cell:nth-child(2)) {
  width: 10%;
}

.resource-table :deep(.el-table__cell:nth-child(3)) {
  width: 12%;
}

.resource-table :deep(.el-table__cell:nth-child(4)) {
  width: 17%;
}

.resource-table :deep(.el-table__cell:nth-child(5)) {
  width: 12%;
}

.resource-table :deep(.el-table__cell:nth-child(6)) {
  width: 9%;
}

.resource-table :deep(.el-table__cell:nth-child(7)) {
  width: 12%;
}

.resource-table :deep(.el-table__cell:nth-child(8)) {
  width: 6%;
}

.resource-table :deep(.el-table__body tr:last-child .el-table__cell) {
  border-bottom: none;
}

.pagination-row {
  display: flex;
  align-items: center;
  gap: var(--space-admin-md-lg);
  padding: 16px 16px 20px;
  color: #52617a;
  font-size: 13px;
}

.sidebar {
  min-width: 0;
}

.sidebar-card {
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border);
  overflow: hidden;
  box-shadow: var(--shadow-admin-card-subtle);
}

.sidebar-title {
  margin: 0;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-admin-text-strong);
  border-bottom: 1px solid var(--color-admin-border);
}

.overview-section {
  margin: 0 16px;
  padding: 18px 8px;
  border-bottom: 1px solid var(--color-admin-border);
}

.overview-section:last-child {
  border-bottom: 1px solid var(--color-admin-border);
}

.section-title {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-admin-text-strong);
}

.distribution-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-md);
}

.distribution-item {
  display: grid;
  grid-template-columns: 12px minmax(0, 1fr) auto;
  gap: var(--space-admin-xs);
  align-items: center;
}

.item-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-admin-primary);
}

.distribution-item:nth-child(2) .item-dot {
  background: #19bd72;
}

.distribution-item:nth-child(3) .item-dot {
  background: #ff9a2e;
}

.distribution-item:nth-child(4) .item-dot {
  background: #ff5d4f;
}

.distribution-item:nth-child(5) .item-dot {
  background: #9aa6ba;
}

.item-label {
  font-size: 13px;
  color: #24314c;
}

.item-count {
  font-size: 13px;
  font-weight: 600;
  color: #52617a;
}

.selected-resource {
  margin: 0 16px;
  padding: 18px 8px;
  border-bottom: 1px solid var(--color-admin-border);
}

.selected-name {
  color: var(--color-admin-text-strong);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
}

.selected-meta {
  margin-top: var(--space-admin-xs);
  color: var(--color-admin-text-muted);
  font-size: 13px;
  line-height: 1.6;
}

.full-width {
  width: 100%;
}

@media (max-width: 1320px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .resource-workspace {
    grid-template-columns: 1fr;
  }

  .sidebar-card {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sidebar-title {
    grid-column: 1 / -1;
  }

  .full-width {
    align-self: end;
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }

  .stat-card {
    grid-template-columns: 64px minmax(0, 1fr);
    padding: var(--space-admin-card-gap);
  }

  .stat-icon {
    width: 58px;
    height: 58px;
  }

  .sidebar-card {
    grid-template-columns: 1fr;
  }

  .pagination-row {
    flex-wrap: wrap;
  }

  .resource-create-action {
    margin-left: 0;
  }
}
</style>
