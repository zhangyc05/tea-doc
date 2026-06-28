<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// 统计数据
const stats = {
  total: 96,
  fromProfile: 52,
  fromTeacher: 28,
  fromManagement: 16,
}

// 培训需求列表
interface TrainingDemand {
  id: string
  teacher: string
  department: string
  major: string
  direction: string
  source: string
  matchStatus: string
  suggestedResource: string
}

const demands: TrainingDemand[] = [
  {
    id: '1',
    teacher: '林老师',
    department: '智能制造学院',
    major: '机电一体化技术',
    direction: '数字化教学',
    source: '能力画像观察',
    matchStatus: '已匹配',
    suggestedResource: '职业教育数字化教学能力提升培训',
  },
  {
    id: '2',
    teacher: '陈老师',
    department: '电子信息学院',
    major: '软件技术',
    direction: 'AI 赋能课程建设',
    source: '教师主动提出',
    matchStatus: '待匹配',
    suggestedResource: '暂无合适资源',
  },
  {
    id: '3',
    teacher: '王老师',
    department: '智能制造学院',
    major: '工业机器人技术',
    direction: '实训课程组织',
    source: '管理主动添加',
    matchStatus: '已匹配',
    suggestedResource: '双师型教师实践能力提升培训',
  },
  {
    id: '4',
    teacher: '赵老师',
    department: '现代服务学院',
    major: '电子商务',
    direction: '课程思政设计',
    source: '教师主动提出',
    matchStatus: '暂不处理',
    suggestedResource: '—',
  },
]

// 筛选条件
const selectedOrganization = ref('全校')
const selectedSource = ref('全部')
const selectedDirection = ref('全部')
const selectedMatchStatus = ref('全部')
const searchQuery = ref('')

function resetFilters() {
  selectedOrganization.value = '全校'
  selectedSource.value = '全部'
  selectedDirection.value = '全部'
  selectedMatchStatus.value = '全部'
  searchQuery.value = ''
}

function viewDetail(id: string) {
  console.log('查看需求详情', id)
}
</script>

<template>
  <AdminLayout active-key="training-demands">
    <div class="training-demand-page">
      <section class="page-header">
        <div class="header-content">
          <h1 class="page-title">需求管理</h1>
        </div>
      </section>

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-value">{{ stats.total }}</div>
            <div class="stat-label">需求总数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.fromProfile }}</div>
            <div class="stat-label">画像观察</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.fromTeacher }}</div>
            <div class="stat-label">教师提出</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.fromManagement }}</div>
            <div class="stat-label">管理添加</div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="demand-workspace">
          <div class="main-content">
            <div class="content-card">
              <!-- 筛选区 -->
              <div class="filter-section">
                <div class="filter-row">
                  <div class="filter-item">
                    <label class="filter-label">组织范围</label>
                    <select v-model="selectedOrganization" class="filter-select">
                      <option>全校</option>
                      <option>智能制造学院</option>
                      <option>电子信息学院</option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">需求来源</label>
                    <select v-model="selectedSource" class="filter-select">
                      <option>全部</option>
                      <option>能力画像观察</option>
                      <option>教师主动提出</option>
                      <option>管理主动添加</option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">需求方向</label>
                    <select v-model="selectedDirection" class="filter-select">
                      <option>全部</option>
                      <option>数字化教学</option>
                      <option>实践教学</option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">匹配状态</label>
                    <select v-model="selectedMatchStatus" class="filter-select">
                      <option>全部</option>
                      <option>已匹配</option>
                      <option>待匹配</option>
                      <option>暂不处理</option>
                    </select>
                  </div>
                  <button class="btn-reset" @click="resetFilters">重置</button>
                </div>
                <div class="search-row">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索教师/需求关键词"
                    class="search-input"
                  />
                </div>
              </div>

              <!-- 数据表格 -->
              <div class="table-container">
                <table class="demand-table">
                  <thead>
                    <tr>
                      <th>需求对象</th>
                      <th>院系 / 专业</th>
                      <th>需求方向</th>
                      <th>需求来源</th>
                      <th>匹配状态</th>
                      <th>建议资源</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="demand in demands" :key="demand.id">
                      <td>{{ demand.teacher }}</td>
                      <td>{{ demand.department }} / {{ demand.major }}</td>
                      <td>{{ demand.direction }}</td>
                      <td>{{ demand.source }}</td>
                      <td>
                        <span class="status-badge" :class="demand.matchStatus">
                          {{ demand.matchStatus }}
                        </span>
                      </td>
                      <td>{{ demand.suggestedResource }}</td>
                      <td>
                        <button class="btn-view" @click="viewDetail(demand.id)">
                          查看
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 右侧：资源匹配建议 -->
          <div class="sidebar">
            <div class="sidebar-card">
              <h3 class="sidebar-title">资源匹配建议</h3>
              <div class="suggestions-list">
                <div class="suggestion-item">
                  <div class="suggestion-title">画像观察需求集中</div>
                  <div class="suggestion-desc">数字化教学相关需求占比最高</div>
                </div>
                <div class="suggestion-item">
                  <div class="suggestion-title">教师主动需求上升</div>
                  <div class="suggestion-desc">本季度主动提出需求增长20%</div>
                </div>
                <div class="suggestion-item">
                  <div class="suggestion-title">待匹配资源</div>
                  <div class="suggestion-desc">28个需求暂无合适匹配资源</div>
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
.training-demand-page {
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

.demand-workspace {
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

.table-container {
  overflow-x: auto;
}

.demand-table {
  width: 100%;
  border-collapse: collapse;
}

.demand-table th {
  padding: 12px 24px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
  background: #f8fafc;
}

.demand-table td {
  padding: 12px 24px;
  font-size: 13px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.demand-table tr:last-child td {
  border-bottom: none;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.status-badge.已匹配 {
  background: #d1fae5;
  color: #059669;
}

.status-badge.待匹配 {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.暂不处理 {
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
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.suggestion-item {
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 3px solid var(--color-primary);
}

.suggestion-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.suggestion-desc {
  font-size: 12px;
  color: var(--color-text-secondary);
}

@media (max-width: 1024px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .demand-workspace {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
}
</style>
