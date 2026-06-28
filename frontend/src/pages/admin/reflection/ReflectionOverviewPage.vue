<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()

// 筛选条件
const selectedOrganization = ref('全校')
const selectedSemester = ref('2025-2026 第2学期')
const selectedTrigger = ref('全部')
const searchQuery = ref('')

// 筛选项
const organizations = ['全校', '智能制造学院', '信息工程学院', '商贸管理学院', '汽车工程学院']
const semesters = ['2025-2026 第2学期', '2025-2026 第1学期', '2024-2025 第2学期']
const triggers = ['全部', '评教反馈', '成绩波动', '教学异常']

// 教学反思记录数据
interface Reflection {
  id: string
  teacher: string
  department: string
  major: string
  course: string
  class: string
  theme: string
  trigger: string
  submitTime: string
}

const reflections: Reflection[] = [
  {
    id: 'project-participation',
    teacher: '林老师',
    department: '智能制造学院',
    major: '机电一体化技术',
    course: '智能制造基础',
    class: '23机电1班',
    theme: '项目实训环节学生参与度不足',
    trigger: '评教反馈',
    submitTime: '2026-06-18 14:20',
  },
  {
    id: 'class-interaction',
    teacher: '王老师',
    department: '信息工程学院',
    major: '软件技术',
    course: 'Java程序设计',
    class: '23软工2班',
    theme: '课堂互动反馈不足',
    trigger: '评教反馈',
    submitTime: '2026-06-18 10:15',
  },
  {
    id: 'preparation-difference',
    teacher: '张老师',
    department: '商贸管理学院',
    major: '电子商务',
    course: '电子商务运营',
    class: '23电商1班',
    theme: '学生课前准备差异明显',
    trigger: '成绩波动',
    submitTime: '2026-06-17 16:45',
  },
  {
    id: 'theory-practice-link',
    teacher: '刘老师',
    department: '汽车工程学院',
    major: '新能源汽车技术',
    course: '新能源汽车构造',
    class: '24新能源1班',
    theme: '理论与实践链接不够紧密',
    trigger: '教学异常',
    submitTime: '2026-06-17 09:30',
  },
  {
    id: 'case-depth',
    teacher: '陈老师',
    department: '文化旅游学院',
    major: '旅游管理',
    course: '旅游市场营销',
    class: '23旅管2班',
    theme: '案例分析深度不足',
    trigger: '评教反馈',
    submitTime: '2026-06-16 15:20',
  },
  {
    id: 'feedback-timeliness',
    teacher: '赵老师',
    department: '建筑工程学院',
    major: '建筑工程技术',
    course: '建筑CAD',
    class: '23建工3班',
    theme: '作业反馈不够及时',
    trigger: '教学异常',
    submitTime: '2026-06-16 11:05',
  },
  {
    id: 'evaluation-standards',
    teacher: '孙老师',
    department: '艺术设计学院',
    major: '数字媒体技术',
    course: 'UI界面设计',
    class: '24数媒1班',
    theme: '项目评价标准需要清晰',
    trigger: '成绩波动',
    submitTime: '2026-06-15 17:40',
  },
  {
    id: 'practice-design',
    teacher: '周老师',
    department: '外语学院',
    major: '应用英语',
    course: '综合英语2',
    class: '23英语1班',
    theme: '课堂练习设计需要优化',
    trigger: '评教反馈',
    submitTime: '2026-06-15 14:10',
  },
]

// 共性观察数据
const commonIssues = [
  {
    rank: 1,
    issue: '课堂互动反馈不足',
    count: 68,
  },
  {
    rank: 2,
    issue: '项目任务分层不够清晰',
    count: 53,
  },
  {
    rank: 3,
    issue: '课前准备差异明显',
    count: 47,
  },
]

// 统计数据
const stats = {
  reflectionCount: 326,
  teacherCount: 214,
  teacherPercentage: 68,
  courseCount: 87,
  mainTrigger: '评教反馈',
  triggerPercentage: 42,
}

function viewDetail(id: string) {
  router.push(`/admin/reflection/${id}`)
}

function resetFilters() {
  selectedOrganization.value = '全校'
  selectedSemester.value = '2025-2026 第2学期'
  selectedTrigger.value = '全部'
  searchQuery.value = ''
}

function viewRelatedRecords() {
  console.log('查看相关记录')
}
</script>

<template>
  <AdminLayout active-key="reflection">
    <div class="reflection-overview-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span>发展活动</span>
            <i class="separator">/</i>
            <span class="current">教学反思</span>
          </div>
        </div>
      </section>

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.reflectionCount }}</div>
              <div class="stat-label">反思记录数</div>
              <div class="stat-sub">本周期累计</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.teacherCount }}</div>
              <div class="stat-label">覆盖教师</div>
              <div class="stat-sub">占教师总数 {{ stats.teacherPercentage }}%</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.courseCount }}</div>
              <div class="stat-label">覆盖课程</div>
              <div class="stat-sub">覆盖主要授课课程</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.mainTrigger }}</div>
              <div class="stat-label">主要触发来源</div>
              <div class="stat-sub">占比 {{ stats.triggerPercentage }}%</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="reflection-workspace">
          <!-- 左侧：教学反思记录列表 -->
          <div class="main-content">
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">教学反思记录</h2>
              </div>

              <!-- 筛选区 -->
              <div class="filter-section">
                <div class="filter-row">
                  <div class="filter-item">
                    <label class="filter-label">组织范围</label>
                    <select v-model="selectedOrganization" class="filter-select">
                      <option v-for="org in organizations" :key="org" :value="org">
                        {{ org }}
                      </option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">学期</label>
                    <select v-model="selectedSemester" class="filter-select">
                      <option v-for="semester in semesters" :key="semester" :value="semester">
                        {{ semester }}
                      </option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">触发来源</label>
                    <select v-model="selectedTrigger" class="filter-select">
                      <option v-for="trigger in triggers" :key="trigger" :value="trigger">
                        {{ trigger }}
                      </option>
                    </select>
                  </div>
                  <button class="btn-reset" @click="resetFilters">重置</button>
                </div>
                <div class="search-row">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索教师、课程、反思主题"
                    class="search-input"
                  />
                </div>
              </div>

              <!-- 数据表格 -->
              <div class="table-container">
                <table class="reflection-table">
                  <thead>
                    <tr>
                      <th>教师</th>
                      <th>院系 / 专业</th>
                      <th>课程 / 班级</th>
                      <th>反思主题</th>
                      <th>触发来源</th>
                      <th>提交时间</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="reflection in reflections" :key="reflection.id">
                      <td>{{ reflection.teacher }}</td>
                      <td>{{ reflection.department }} / {{ reflection.major }}</td>
                      <td>{{ reflection.course }} / {{ reflection.class }}</td>
                      <td>{{ reflection.theme }}</td>
                      <td>
                        <span class="trigger-badge">{{ reflection.trigger }}</span>
                      </td>
                      <td>{{ reflection.submitTime }}</td>
                      <td>
                        <button class="btn-view" @click="viewDetail(reflection.id)">
                          查看
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 右侧：共性观察 -->
          <div class="sidebar">
            <div class="sidebar-card">
              <h3 class="sidebar-title">共性观察</h3>
              <p class="sidebar-description">
                近30天反思中，高频问题集中在：
              </p>
              <div class="issues-list">
                <div
                  v-for="issue in commonIssues"
                  :key="issue.rank"
                  class="issue-item"
                >
                  <div class="issue-rank">{{ issue.rank }}</div>
                  <div class="issue-content">
                    <div class="issue-title">{{ issue.issue }}</div>
                    <div class="issue-count">涉及 {{ issue.count }} 条反思记录</div>
                  </div>
                </div>
              </div>
              <button class="btn-view-related" @click="viewRelatedRecords">
                查看相关记录
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.reflection-overview-page {
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

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.breadcrumb .separator {
  color: var(--color-text-hint);
}

.breadcrumb .current {
  color: var(--color-text-primary);
  font-weight: 600;
}

/* 统计卡区域 */
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
  gap: 16px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 8px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-primary);
}

.stat-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.stat-sub {
  font-size: 12px;
  color: var(--color-text-hint);
}

/* 主体内容区域 */
.main-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
}

.reflection-workspace {
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

.card-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-card-border);
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

/* 筛选区 */
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

/* 表格 */
.table-container {
  overflow-x: auto;
}

.reflection-table {
  width: 100%;
  border-collapse: collapse;
}

.reflection-table th {
  padding: 12px 24px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
  background: #f8fafc;
}

.reflection-table td {
  padding: 12px 24px;
  font-size: 13px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.reflection-table tr:last-child td {
  border-bottom: none;
}

.trigger-badge {
  display: inline-block;
  padding: 4px 8px;
  background: #e0f2fe;
  color: var(--color-primary);
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
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

/* 侧边栏 */
.sidebar {
  min-width: 0;
}

.sidebar-card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 24px;
  position: sticky;
  top: 24px;
}

.sidebar-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.sidebar-description {
  margin: 0 0 20px 0;
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.issues-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.issue-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.issue-rank {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.issue-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.issue-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.issue-count {
  font-size: 12px;
  color: var(--color-text-hint);
}

.btn-view-related {
  width: 100%;
  padding: 10px 16px;
  background: white;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  color: var(--color-text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-view-related:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@media (max-width: 1200px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }

  .reflection-workspace {
    grid-template-columns: 1fr;
  }

  .sidebar-card {
    position: static;
  }
}
</style>