<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// 筛选条件
const selectedStatus = ref('全部')
const selectedDirection = ref('全部')
const selectedLevel = ref('全部')
const selectedSource = ref('全部')
const searchQuery = ref('')

// 统计数据
const stats = {
  total: 68,
  available: 52,
  incomplete: 10,
  sourceTypes: 4,
}

// 培训资源数据
interface TrainingResource {
  id: string
  name: string
  direction: string
  level: string
  hours: string
  institution: string
  target: string
  source: string
  status: string
}

const resources: TrainingResource[] = [
  {
    id: '1',
    name: '职业教育数字化教学能力提升培训',
    direction: '数字化教学',
    level: '省级',
    hours: '32学时',
    institution: '省职业教育教师发展中心',
    target: '相关专业教师',
    source: '外部机构',
    status: '可用',
  },
  {
    id: '2',
    name: 'AI 赋能课程建设专题培训',
    direction: 'AI 课程建设',
    level: '校级',
    hours: '16学时',
    institution: '教师发展中心',
    target: '全校教师',
    source: '校内建设',
    status: '可用',
  },
  {
    id: '3',
    name: '双师型教师实践能力提升培训',
    direction: '实践教学',
    level: '企业培训',
    hours: '40学时',
    institution: '智能制造合作企业',
    target: '工科专业教师',
    source: '企业合作',
    status: '可用',
  },
  {
    id: '4',
    name: '课程思政教学设计研修',
    direction: '课程思政',
    level: '市级',
    hours: '24学时',
    institution: '市教师发展联盟',
    target: '课程负责人',
    source: '外部机构',
    status: '信息待完善',
  },
]

// 右侧资源概览
const resourceOverview = {
  sourceDistribution: [
    { label: '校内建设', count: 18 },
    { label: '外部机构', count: 24 },
    { label: '企业合作', count: 14 },
    { label: '公开课程', count: 12 },
  ],
  levelDistribution: [
    { label: '国家级', count: 8 },
    { label: '省级', count: 22 },
    { label: '市级', count: 12 },
    { label: '校级', count: 16 },
    { label: '企业培训', count: 10 },
  ],
  statusDistribution: [
    { label: '可用', count: 52 },
    { label: '信息待完善', count: 10 },
    { label: '已停用', count: 6 },
  ],
}

function resetFilters() {
  selectedStatus.value = '全部'
  selectedDirection.value = '全部'
  selectedLevel.value = '全部'
  selectedSource.value = '全部'
  searchQuery.value = ''
}

function viewDetail(id: string) {
  console.log('查看资源详情', id)
}

function addResource() {
  console.log('新增资源')
}
</script>

<template>
  <AdminLayout active-key="training-resources">
    <div class="training-resource-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <h1 class="page-title">资源库</h1>
        </div>
      </section>

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-value">{{ stats.total }}</div>
            <div class="stat-label">资源总数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.available }}</div>
            <div class="stat-label">可用资源</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.incomplete }}</div>
            <div class="stat-label">信息待完善</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.sourceTypes }}</div>
            <div class="stat-label">资源来源</div>
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
                  <button class="btn-reset" @click="resetFilters">重置</button>
                  <button class="btn-secondary">查询</button>
                  <button class="btn-primary" @click="addResource">新增资源</button>
                </div>
                <div class="search-row">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索资源名称/培训机构/关键词"
                    class="search-input"
                  />
                </div>
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
                    <tr v-for="resource in resources" :key="resource.id">
                      <td>{{ resource.name }}</td>
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
                  </tbody>
                </table>
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
                    <span class="item-label">{{ item.label }}</span>
                    <span class="item-count">{{ item.count }}</span>
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
                    <span class="item-label">{{ item.label }}</span>
                    <span class="item-count">{{ item.count }}</span>
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
                    <span class="item-label">{{ item.label }}</span>
                    <span class="item-count">{{ item.count }}</span>
                  </div>
                </div>
              </div>
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
  background: var(--color-page-bg);
}

.page-header {
  padding: 32px 0;
  background: white;
  border-bottom: 1px solid var(--color-card-border);
}

.header-content {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.stats-section {
  background: white;
  border-bottom: 1px solid var(--color-card-border);
}

.stats-container {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: var(--color-text-secondary);
  font-weight: 600;
}

.main-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
}

.resource-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 16px;
}

.main-content {
  min-width: 0;
}

.content-card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  overflow: hidden;
}

.filter-section {
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-card-border);
}

.filter-row {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  outline: none;
  min-width: 140px;
}

.search-row {
  display: flex;
}

.search-input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.16s ease;
}

.search-input:focus {
  border-color: var(--color-primary);
}

.btn-reset {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  color: var(--color-text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-reset:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn-secondary {
  padding: 10px 20px;
  background: white;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn-primary {
  padding: 10px 20px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-primary:hover {
  background: #28a38a;
}

.table-container {
  overflow-x: auto;
}

.resource-table {
  width: 100%;
  border-collapse: collapse;
}

.resource-table th {
  padding: 12px 24px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
  background: #f8fafc;
}

.resource-table td {
  padding: 12px 24px;
  font-size: 13px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.resource-table tr:last-child td {
  border-bottom: none;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.status-badge.可用 {
  background: #d1fae5;
  color: #059669;
}

.status-badge.信息待完善 {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.已停用 {
  background: #f3f4f6;
  color: #6b7280;
}

.btn-view {
  padding: 6px 12px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-view:hover {
  background: #28a38a;
}

.sidebar {
  min-width: 0;
}

.sidebar-card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 24px;
}

.sidebar-title {
  margin: 0 0 20px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.overview-section {
  margin-bottom: 24px;
}

.overview-section:last-child {
  margin-bottom: 0;
}

.section-title {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.distribution-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.distribution-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.item-label {
  font-size: 13px;
  color: var(--color-text-primary);
}

.item-count {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}

@media (max-width: 1024px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .resource-workspace {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
}
</style>