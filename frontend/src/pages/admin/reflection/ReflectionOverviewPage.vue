<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { getReflectionOverviewMock } from '@/services/mock/reflection'

const router = useRouter()
const route = useRoute()
const reflectionOverview = getReflectionOverviewMock()

// 筛选条件
const selectedOrganization = ref('全校')
const selectedSemester = ref('2025-2026 第2学期')
const selectedTrigger = ref('全部')
const searchQuery = ref(String(route.query.keyword || ''))
const activeIssueKeyword = ref(String(route.query.keyword || ''))

const organizations = reflectionOverview.organizations
const semesters = reflectionOverview.semesters
const triggers = reflectionOverview.triggers
const reflections = reflectionOverview.reflections
const commonIssues = reflectionOverview.commonIssues
const stats = reflectionOverview.stats

const filteredReflections = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()
  return reflections.filter((reflection) => {
    const organizationMatched =
      selectedOrganization.value === '全校' || reflection.department === selectedOrganization.value
    const triggerMatched = selectedTrigger.value === '全部' || reflection.trigger === selectedTrigger.value
    const keywordMatched =
      !keyword ||
      [reflection.teacher, reflection.department, reflection.major, reflection.course, reflection.class, reflection.theme]
        .join(' ')
        .toLowerCase()
        .includes(keyword)

    return organizationMatched && triggerMatched && keywordMatched
  })
})

function viewDetail(id: string) {
  router.push(`/admin/reflection/${id}`)
}

function resetFilters() {
  selectedOrganization.value = '全校'
  selectedSemester.value = '2025-2026 第2学期'
  selectedTrigger.value = '全部'
  searchQuery.value = ''
  activeIssueKeyword.value = ''
}

function viewRelatedRecords() {
  const issue = commonIssues[0].issue
  searchQuery.value = issue
  activeIssueKeyword.value = issue
  selectedTrigger.value = '全部'
}
</script>

<template>
  <AdminLayout active-key="reflection">
    <div class="reflection-overview-page">
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
                <p v-if="activeIssueKeyword" class="issue-filter-message">
                  当前问题定位：{{ activeIssueKeyword }}
                </p>
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
                  <div class="search-row">
                    <input
                      v-model="searchQuery"
                      type="text"
                      placeholder="搜索教师、课程、反思主题"
                      class="search-input"
                    />
                  </div>
                  <button class="btn-reset" @click="resetFilters">重置</button>
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
                    <tr v-for="reflection in filteredReflections" :key="reflection.id">
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
                <div v-if="filteredReflections.length === 0" class="empty-state">
                  未找到符合条件的反思记录
                </div>
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
  background: #f7faff;
}

.page-head,
.stats-container,
.main-section {
  width: min(100% - 48px, 1500px);
  margin: 0 auto;
}

.page-head {
  padding-top: 24px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #0f5eef;
  font-size: 14px;
  font-weight: 700;
}

.breadcrumb span:first-child {
  color: #172b55;
}

.breadcrumb i {
  color: #9aa9c0;
  font-style: normal;
}

/* 统计卡区域 */
.stats-section {
  padding-top: 34px;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 178px;
  padding: 24px 30px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #d9e5f7;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eaf2ff;
  border-radius: 50%;
  color: #0f5eef;
  flex-shrink: 0;
}

.stat-card:nth-child(2) .stat-icon {
  background: #e9f8ee;
  color: #16a34a;
}

.stat-card:nth-child(3) .stat-icon {
  background: #fff3e3;
  color: #f07f13;
}

.stat-card:nth-child(4) .stat-icon {
  background: #f3eaff;
  color: #7c3aed;
}

.stat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-value {
  color: #0f5eef;
  font-size: 42px;
  line-height: 1;
  font-weight: 800;
}

.stat-card:nth-child(2) .stat-value {
  color: #16a34a;
}

.stat-card:nth-child(3) .stat-value {
  color: #f07f13;
}

.stat-card:nth-child(4) .stat-value {
  color: #7c3aed;
  font-size: 32px;
}

.stat-label {
  font-size: 16px;
  font-weight: 800;
  color: #07183d;
}

.stat-sub {
  font-size: 14px;
  color: #304f82;
}

/* 主体内容区域 */
.main-section {
  padding-top: 24px;
}

.reflection-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 14px;
}

.main-content {
  min-width: 0;
}

.content-card {
  background: white;
  border-radius: 10px;
  border: 1px solid #d9e5f7;
  overflow: hidden;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.card-header {
  padding: 18px 18px 10px;
}

.card-title {
  margin: 0;
  font-size: 20px;
  line-height: 1.25;
  font-weight: 800;
  color: #07183d;
}

/* 筛选区 */
.filter-section {
  padding: 18px;
}

.issue-filter-message {
  margin: 0 0 12px;
  padding: 10px 12px;
  border: 1px solid #cfe0ff;
  border-radius: 6px;
  background: #f3f7ff;
  color: #174ea6;
  font-size: 13px;
  font-weight: 700;
}

.filter-row {
  display: grid;
  grid-template-columns: 220px 250px 150px minmax(220px, 1fr);
  gap: 18px;
  align-items: center;
  margin-bottom: 0;
}

.filter-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 10px;
}

.filter-label {
  font-size: 14px;
  font-weight: 700;
  color: #172b55;
  white-space: nowrap;
}

.filter-select {
  height: 38px;
  padding: 0 36px 0 14px;
  border: 1px solid #d2def0;
  border-radius: 6px;
  font-size: 14px;
  color: #172b55;
  background: white;
  cursor: pointer;
  outline: none;
  min-width: 0;
}

.btn-reset {
  display: none;
  padding: 0 16px;
  background: transparent;
  border: 1px solid #d2def0;
  border-radius: 6px;
  color: #405985;
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
  min-width: 0;
}

.search-input {
  flex: 1;
  height: 38px;
  padding: 0 16px;
  border: 1px solid #d2def0;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.16s ease;
}

.search-input:focus {
  border-color: var(--color-primary);
}

/* 表格 */
.table-container {
  margin: 0 18px 14px;
  overflow: hidden;
  border: 1px solid #d9e5f7;
  border-radius: 8px;
}

.reflection-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.reflection-table th {
  height: 42px;
  padding: 0 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 800;
  color: #31466f;
  border-bottom: 1px solid #d9e5f7;
  border-right: 1px solid #e5edf8;
  background: #f4f7fc;
  white-space: nowrap;
}

.reflection-table th:nth-child(1) { width: 7%; }
.reflection-table th:nth-child(2) { width: 20%; }
.reflection-table th:nth-child(3) { width: 18%; }
.reflection-table th:nth-child(4) { width: 20%; }
.reflection-table th:nth-child(5) { width: 10%; }
.reflection-table th:nth-child(6) { width: 17%; }
.reflection-table th:nth-child(7) { width: 8%; }

.reflection-table th:last-child,
.reflection-table td:last-child {
  border-right: 0;
}

.reflection-table td {
  height: 50px;
  padding: 0 12px;
  font-size: 13px;
  color: #172b55;
  border-bottom: 1px solid #e5edf8;
  border-right: 1px solid #e5edf8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.reflection-table tr:last-child td {
  border-bottom: none;
}

.trigger-badge {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 8px;
  background: #eef5ff;
  color: #0f5eef;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
}

.btn-view {
  padding: 0;
  background: transparent;
  color: #0f5eef;
  border: none;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-view:hover {
  color: #0c4fd0;
}

.empty-state {
  padding: 36px;
  text-align: center;
  color: #60708b;
  font-size: 14px;
}

/* 侧边栏 */
.sidebar {
  min-width: 0;
}

.sidebar-card {
  background: white;
  border-radius: 10px;
  border: 1px solid #d9e5f7;
  padding: 28px 22px 22px;
  position: sticky;
  top: 24px;
  min-height: 574px;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.sidebar-title {
  margin: 0 0 28px;
  font-size: 20px;
  font-weight: 800;
  color: #07183d;
}

.sidebar-description {
  margin: 0 0 34px;
  font-size: 15px;
  color: #172b55;
  line-height: 1.5;
}

.issues-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 54px;
}

.issue-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 0 0 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e5edf8;
}

.issue-item:last-child {
  border-bottom: 0;
  margin-bottom: 0;
  padding-bottom: 0;
}

.issue-rank {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f5eef;
  color: white;
  border-radius: 50%;
  font-size: 15px;
  font-weight: 800;
  flex-shrink: 0;
}

.issue-item:nth-child(2) .issue-rank {
  background: #16a34a;
}

.issue-item:nth-child(3) .issue-rank {
  background: #f59e0b;
}

.issue-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.issue-title {
  font-size: 16px;
  line-height: 1.4;
  font-weight: 800;
  color: #07183d;
}

.issue-count {
  font-size: 13px;
  color: #405985;
}

.btn-view-related {
  display: block;
  width: 176px;
  height: 44px;
  margin: 0 auto;
  padding: 0 16px;
  background: white;
  border: 1px solid #0f5eef;
  border-radius: 6px;
  color: #0f5eef;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-view-related:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@media (max-width: 1300px) {
  .page-head,
  .stats-container,
  .main-section {
    width: min(100% - 32px, 1500px);
  }

  .filter-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .stat-card {
    gap: 12px;
    min-height: 176px;
    padding: 20px 18px;
  }

  .stat-icon {
    width: 42px;
    height: 42px;
  }

  .stat-value {
    font-size: 36px;
  }

  .stat-card:nth-child(4) .stat-value {
    font-size: 26px;
    white-space: nowrap;
  }

  .search-row {
    grid-column: 1 / -1;
  }

  .table-container {
    overflow-x: auto;
  }

  .reflection-table {
    min-width: 760px;
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
