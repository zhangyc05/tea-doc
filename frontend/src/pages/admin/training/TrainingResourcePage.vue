<script setup lang="ts">
import { computed, ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {
  addTrainingResourceDraft,
  getTrainingState,
} from '@/stores/admin/trainingStore'

const trainingState = getTrainingState()

// 筛选条件
const selectedStatus = ref('全部')
const selectedDirection = ref('全部')
const selectedLevel = ref('全部')
const selectedSource = ref('全部')
const searchQuery = ref('')
const appliedSearchQuery = ref('')
const activeResourceId = ref('1')

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
            <div class="stat-icon icon-file">▤</div>
            <div>
              <div class="stat-label">资源总数</div>
              <div class="stat-value">{{ stats.total }} <span>个</span></div>
              <div class="stat-desc">资源库内全部培训资源</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-check">✓</div>
            <div>
              <div class="stat-label">可用资源</div>
              <div class="stat-value">{{ stats.available }} <span>个</span></div>
              <div class="stat-desc">信息完整、当前可被使用</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-edit">▰</div>
            <div>
              <div class="stat-label">信息待完善</div>
              <div class="stat-value">{{ stats.incomplete }} <span>个</span></div>
              <div class="stat-desc">缺少关键字段需完善</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-book">▣</div>
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
              <div class="filter-section">
                <div class="filter-row">
                  <div class="filter-item">
                    <label class="filter-label">资源状态</label>
                    <select v-model="selectedStatus" class="filter-select">
                      <option>全部</option>
                      <option>可用</option>
                      <option>信息待完善</option>
                      <option>已停用</option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">培训方向</label>
                    <select v-model="selectedDirection" class="filter-select">
                      <option>全部</option>
                      <option>数字化教学</option>
                      <option>AI 课程建设</option>
                      <option>实践教学</option>
                      <option>课程思政</option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">培训级别</label>
                    <select v-model="selectedLevel" class="filter-select">
                      <option>全部</option>
                      <option>国家级</option>
                      <option>省级</option>
                      <option>市级</option>
                      <option>校级</option>
                      <option>企业培训</option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">资源来源</label>
                    <select v-model="selectedSource" class="filter-select">
                      <option>全部</option>
                      <option>校内建设</option>
                      <option>外部机构</option>
                      <option>企业合作</option>
                      <option>公开课程</option>
                    </select>
                  </div>
                </div>
                <div class="search-row">
                  <label class="filter-label">搜索：</label>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索资源名称/培训机构/关键词"
                    class="search-input"
                    @keyup.enter="applyFilters"
                  />
                  <button class="btn-reset" @click="resetFilters">重置</button>
                  <button class="btn-secondary" @click="applyFilters">查询</button>
                  <button class="btn-primary" @click="addResource">＋ 新增资源</button>
                </div>
                <div v-if="trainingState.operationMessage" class="operation-message">{{ trainingState.operationMessage }}</div>
              </div>

              <!-- 数据表格 -->
              <div class="table-container">
                <table class="resource-table">
                  <thead>
                    <tr>
                      <th>资源名称</th>
                      <th>培训方向</th>
                      <th>级别 / 学时</th>
                      <th>培训机构</th>
                      <th>适合对象</th>
                      <th>资源来源</th>
                      <th>资源状态</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="resource in filteredResources"
                      :key="resource.id"
                      :class="{ active: activeResourceId === resource.id }"
                    >
                      <td class="resource-name">{{ resource.name }}</td>
                      <td>{{ resource.direction }}</td>
                      <td>{{ resource.level }} / {{ resource.hours }}</td>
                      <td>{{ resource.institution }}</td>
                      <td>{{ resource.target }}</td>
                      <td>{{ resource.source }}</td>
                      <td>
                        <span class="status-badge" :class="resource.status">
                          {{ resource.status }}
                        </span>
                      </td>
                      <td>
                        <button class="btn-view" @click="viewDetail(resource.id)">
                          查看
                        </button>
                      </td>
                    </tr>
                    <tr v-if="filteredResources.length === 0">
                      <td colspan="8" class="empty-cell">暂无符合条件的培训资源</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="pagination-row">
                <span>共 {{ stats.total }} 条</span>
                <select class="page-size" aria-label="每页条数">
                  <option>10条/页</option>
                </select>
                <button class="page-button" type="button" aria-label="上一页">‹</button>
                <button class="page-button active" type="button">1</button>
                <button class="page-button" type="button">2</button>
                <button class="page-button" type="button">3</button>
                <button class="page-button" type="button">4</button>
                <button class="page-button" type="button">5</button>
                <button class="page-button" type="button">6</button>
                <button class="page-button" type="button">7</button>
                <button class="page-button" type="button" aria-label="下一页">›</button>
                <span>前往</span>
                <input class="page-input" value="1" aria-label="页码" readonly />
                <span>页</span>
              </div>
            </div>
          </div>

          <!-- 右侧：资源概览 -->
          <div class="sidebar">
            <div class="sidebar-card">
              <h3 class="sidebar-title">资源概览</h3>

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

              <div class="selected-resource" v-if="activeResource">
                <h4 class="section-title">当前查看资源</h4>
                <div class="selected-name">{{ activeResource.name }}</div>
                <div class="selected-meta">
                  {{ activeResource.level }} · {{ activeResource.hours }} · {{ activeResource.source }}
                </div>
              </div>

              <button class="outline-action" type="button" @click="showIncompleteResources">
                查看待完善资源
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.training-resource-page {
  min-height: 100vh;
  background: #f6f9ff;
  color: #17233d;
}

.training-resource-page *,
.training-resource-page *::before,
.training-resource-page *::after {
  box-sizing: border-box;
}

.page-header {
  padding: 24px 0 12px;
  background: #f6f9ff;
}

.header-content {
  max-width: 1560px;
  margin: 0 auto;
  padding: 0 22px;
}

.breadcrumb {
  color: #66758f;
  font-size: 14px;
  font-weight: 600;
}

.breadcrumb strong {
  color: #17233d;
}

.page-title {
  margin: 10px 0 0;
  font-size: 22px;
  font-weight: 700;
  color: #14213d;
}

.stats-section {
  background: #f6f9ff;
}

.stats-container {
  max-width: 1560px;
  margin: 0 auto;
  padding: 0 22px 18px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr);
  align-items: center;
  gap: 18px;
  min-height: 132px;
  padding: 22px 30px;
  background: #fff;
  border: 1px solid #dce6f5;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.05);
}

.stat-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  font-weight: 800;
}

.icon-file {
  color: #18b675;
  background: #dff8ec;
}

.icon-check {
  color: #1fbd75;
  background: #dcf7e9;
}

.icon-edit {
  color: #ff8a1f;
  background: #fff0df;
}

.icon-book {
  color: #7347e9;
  background: #eee7ff;
}

.stat-value {
  margin-top: 8px;
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
  color: #17233d;
  font-weight: 600;
}

.stat-desc {
  margin-top: 10px;
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
  gap: 16px;
  align-items: start;
}

.main-content {
  min-width: 0;
}

.content-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dce6f5;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.05);
}

.filter-section {
  padding: 16px 16px 14px;
  border-bottom: 1px solid #dce6f5;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(148px, 1fr));
  gap: 20px;
  align-items: flex-end;
  margin-bottom: 18px;
}

.filter-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 10px;
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
  padding: 0 36px 0 14px;
  border: 1px solid #d7e2f1;
  border-radius: 6px;
  font-size: 13px;
  color: #1a2944;
  background: #fff;
  cursor: pointer;
  outline: none;
}

.search-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.search-input {
  flex: 0 1 420px;
  height: 40px;
  padding: 0 16px;
  border: 1px solid #d7e2f1;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.16s ease;
}

.search-input:focus {
  border-color: #1d6df2;
}

.btn-reset {
  height: 40px;
  padding: 0 20px;
  background: #fff;
  border: 1px solid #d7e2f1;
  border-radius: 6px;
  color: #44536c;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-reset:hover {
  border-color: #1d6df2;
  color: #1d6df2;
}

.btn-secondary {
  height: 40px;
  padding: 0 22px;
  background: #1268f6;
  color: #fff;
  border: 1px solid #1268f6;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-secondary:hover {
  background: #0d57d4;
}

.btn-primary {
  height: 40px;
  margin-left: auto;
  padding: 0 22px;
  background: #1268f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-primary:hover {
  background: #0d57d4;
}

.operation-message {
  margin-top: 10px;
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
  border: 1px solid #dce6f5;
}

.resource-table th {
  padding: 12px 10px;
  text-align: left;
  font-size: 13px;
  line-height: 1.35;
  font-weight: 600;
  color: #17233d;
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid #dce6f5;
  background: #f8fbff;
}

.resource-table td {
  padding: 12px 10px;
  font-size: 13px;
  line-height: 1.55;
  color: #24314c;
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid #e4ecf7;
  vertical-align: middle;
}

.resource-table th:last-child,
.resource-table td:last-child {
  border-right: none;
}

.resource-table tr.active td {
  background: #f4f8ff;
}

.resource-name {
  font-weight: 600;
  color: #14213d;
}

.resource-table th:nth-child(1),
.resource-table td:nth-child(1) {
  width: 22%;
}

.resource-table th:nth-child(2),
.resource-table td:nth-child(2) {
  width: 10%;
}

.resource-table th:nth-child(3),
.resource-table td:nth-child(3) {
  width: 12%;
}

.resource-table th:nth-child(4),
.resource-table td:nth-child(4) {
  width: 17%;
}

.resource-table th:nth-child(5),
.resource-table td:nth-child(5) {
  width: 12%;
}

.resource-table th:nth-child(6),
.resource-table td:nth-child(6) {
  width: 9%;
}

.resource-table th:nth-child(7),
.resource-table td:nth-child(7) {
  width: 12%;
}

.resource-table th:nth-child(8),
.resource-table td:nth-child(8) {
  width: 6%;
}

.resource-table tr:last-child td {
  border-bottom: none;
}

.status-badge {
  display: inline-block;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  white-space: nowrap;
}

.status-badge.可用 {
  background: #dff8ec;
  color: #18a663;
  border: 1px solid #bdeed7;
}

.status-badge.信息待完善 {
  background: #fff2e5;
  color: #f07c1d;
  border: 1px solid #ffd7b8;
}

.status-badge.已停用 {
  background: #eef2f7;
  color: #66758f;
  border: 1px solid #d8e0ec;
}

.btn-view {
  padding: 0;
  background: transparent;
  color: #1268f6;
  border: none;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.btn-view:hover {
  color: #0d57d4;
}

.empty-cell {
  height: 120px;
  text-align: center;
  color: #66758f;
}

.pagination-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 16px 20px;
  color: #52617a;
  font-size: 13px;
}

.page-size,
.page-input {
  height: 34px;
  border: 1px solid #d7e2f1;
  border-radius: 6px;
  background: #fff;
  color: #17233d;
}

.page-size {
  width: 120px;
  padding: 0 12px;
}

.page-input {
  width: 54px;
  text-align: center;
}

.page-button {
  min-width: 34px;
  height: 34px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #17233d;
  font-weight: 700;
}

.page-button.active {
  background: #eef5ff;
  color: #1268f6;
}

.sidebar {
  min-width: 0;
}

.sidebar-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dce6f5;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.05);
}

.sidebar-title {
  margin: 0;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 700;
  color: #17233d;
  border-bottom: 1px solid #dce6f5;
}

.overview-section {
  margin: 0 16px;
  padding: 18px 8px;
  border-bottom: 1px solid #dce6f5;
}

.overview-section:last-child {
  border-bottom: 1px solid #dce6f5;
}

.section-title {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #17233d;
}

.distribution-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.distribution-item {
  display: grid;
  grid-template-columns: 12px minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
}

.item-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1268f6;
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
  border-bottom: 1px solid #dce6f5;
}

.selected-name {
  color: #17233d;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
}

.selected-meta {
  margin-top: 8px;
  color: #66758f;
  font-size: 13px;
  line-height: 1.6;
}

.outline-action {
  width: calc(100% - 32px);
  height: 48px;
  margin: 18px 16px 20px;
  border: 1px solid #1268f6;
  border-radius: 6px;
  background: #fff;
  color: #1268f6;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.outline-action:hover {
  background: #f2f7ff;
}

@media (max-width: 1320px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .resource-workspace {
    grid-template-columns: 1fr;
  }

  .filter-row {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }

  .sidebar-card {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sidebar-title {
    grid-column: 1 / -1;
  }

  .outline-action {
    align-self: end;
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }

  .stat-card {
    grid-template-columns: 64px minmax(0, 1fr);
    padding: 18px;
  }

  .stat-icon {
    width: 58px;
    height: 58px;
  }

  .filter-row,
  .sidebar-card {
    grid-template-columns: 1fr;
  }

  .search-row,
  .pagination-row {
    flex-wrap: wrap;
  }

  .btn-primary {
    margin-left: 0;
  }
}
</style>
