<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

interface TeacherCard {
  id: string
  name: string
  college: string
  title: string
  cycle: string
  year: string
  description: string
  tags: string[]
  lastUpdate: string
}

const router = useRouter()

// 统计数据
const stats = {
  totalTeachers: 428,
  hasArchive: 428,
  recentUpdate: 236,
  needsImprovement: 36,
  hasCorrection: 18,
}

// 筛选条件
const searchKeyword = ref('')
const collegeFilter = ref('全部学院')
const titleFilter = ref('全部职称')
const updateFilter = ref('全部')

const collegeOptions = ['全部学院', '智能制造学院', '电子信息学院', '财经学院', '计算机学院', '外国语学院', '艺术设计学院']
const titleOptions = ['全部职称', '讲师', '副教授', '教授']
const updateOptions = ['全部', '近期有更新', '内容待完善', '有更正记录']

// 视图切换
const viewMode = ref('card')

// 教师卡片数据
const teacherCards = ref<TeacherCard[]>([
  {
    id: 'lin',
    name: '林老师',
    college: '智能制造学院',
    title: '讲师',
    cycle: '2026年度发展周期',
    year: '聘期第2年',
    description: '本学期承担 3 门专业课程教学，教学评价良好，已入选至数智课程建设成果 1 项，企业实践基地 20 天。近30日补充课程建设材料 1 条，可支持岗位对照。',
    tags: ['教学工作较完整', '企业实践已入档', '近30日有更新'],
    lastUpdate: '2026-06-18',
  },
  {
    id: 'chen',
    name: '陈老师',
    college: '电子信息学院',
    title: '副教授',
    cycle: '2026年度发展周期',
    year: '聘期第3年',
    description: '科研项目阶段成果已入档 2 项，正在推进专利申报。本学期指导学生竞赛获奖 1 项，教学反思记录较完整。近30日更新科研成果材料，可用于岗位对照。',
    tags: ['教研成果较突出', '有项目记录', '近30日有更新'],
    lastUpdate: '2026-06-16',
  },
  {
    id: 'wang',
    name: '王老师',
    college: '财经学院',
    title: '讲师',
    cycle: '2026年度发展周期',
    year: '聘期第1年',
    description: '完成 2 门课程教学，学生反馈良好，积极参与教研活动，教研记录已入档。近30日补充听课评课记录，可进一步完善档案。',
    tags: ['教学稳步推进', '教研参与积极', '近30日有更新'],
    lastUpdate: '2026-06-17',
  },
  {
    id: 'liu',
    name: '刘老师',
    college: '计算机学院',
    title: '副教授',
    cycle: '2026年度发展周期',
    year: '聘期第4年',
    description: '主持省级教改项目 1 项，阶段成果已入档。课程思政建设成效良好，相关材料已归档。近30日更新项目结题材料，已用于岗位对照。',
    tags: ['教研成果较突出', '已用于岗位对照', '近30日有更新'],
    lastUpdate: '2026-06-15',
  },
  {
    id: 'zhao',
    name: '赵老师',
    college: '外国语学院',
    title: '讲师',
    cycle: '2026年度发展周期',
    year: '聘期第2年',
    description: '承担 2 门课程教学，课堂互动与评价过程记录完整。参与课程建设，建设过程证据逐步编写课程课件。档案信息较完整，建议补充企业实践经历。',
    tags: ['教学工作较完整', '课程建设进行中', '待补充完善'],
    lastUpdate: '2026-06-12',
  },
  {
    id: 'zhou',
    name: '周老师',
    college: '艺术设计学院',
    title: '讲师',
    cycle: '2026年度发展周期',
    year: '聘期第1年',
    description: '实践教学活动参与度高，相关材料已入档。作品指导记录完整，学生作品获奖 2 项。近30日补充其他成果材料，可进一步完善档案。',
    tags: ['实践教学突出', '成果转化进行中', '近30日有更新'],
    lastUpdate: '2026-06-14',
  },
])

function resetFilters() {
  searchKeyword.value = ''
  collegeFilter.value = '全部学院'
  titleFilter.value = '全部职称'
  updateFilter.value = '全部'
}

function viewTeacherDetail(teacherId: string) {
  router.push(`/admin/archive/teacher/${teacherId}`)
}

function switchViewMode(mode: string) {
  viewMode.value = mode
}
</script>

<template>
  <AdminLayout active-key="archive-query">
    <div class="archive-query-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span>成长档案</span>
            <i class="separator">/</i>
            <span class="current">档案查询</span>
          </div>
          <h1>档案查阅</h1>
          <p class="description">查找教师并查看其成长档案摘要，点击卡片可进入完整档案内容。</p>
        </div>
      </section>

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stat-card primary">
          <div class="stat-number">{{ stats.totalTeachers }}</div>
          <div class="stat-label">可查询教师 人</div>
          <div class="stat-description">已建立成长档案，可进入查看</div>
        </div>
        <div class="stat-card success">
          <div class="stat-number">{{ stats.recentUpdate }}</div>
          <div class="stat-label">近期有更新 人</div>
          <div class="stat-description">近30日档案内容有新增或调整</div>
        </div>
        <div class="stat-card warning">
          <div class="stat-number">{{ stats.needsImprovement }}</div>
          <div class="stat-label">内容待完善 人</div>
          <div class="stat-description">存在待补充或待核验内容</div>
        </div>
        <div class="stat-card info">
          <div class="stat-number">{{ stats.hasCorrection }}</div>
          <div class="stat-label">有更正记录 人</div>
          <div class="stat-description">可查看更正前后内容</div>
        </div>
      </section>

      <!-- 筛选搜索区 -->
      <section class="filter-section">
        <div class="filter-content">
          <div class="search-area">
            <input
              v-model="searchKeyword"
              type="text"
              class="search-input"
              placeholder="搜索教师姓名 / 工号 / 所属部门"
            />
          </div>

          <div class="filter-controls">
            <div class="filter-group">
              <label class="filter-label">学院：</label>
              <select v-model="collegeFilter" class="filter-select">
                <option v-for="option in collegeOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-label">职称：</label>
              <select v-model="titleFilter" class="filter-select">
                <option v-for="option in titleOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-label">更新情况：</label>
              <select v-model="updateFilter" class="filter-select">
                <option v-for="option in updateOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>

            <button class="btn-secondary reset-btn" @click="resetFilters">重置</button>
          </div>
        </div>
      </section>

      <!-- 教师档案摘要区域 -->
      <section class="teachers-section">
        <div class="teachers-header">
          <div class="header-left">
            <h2 class="section-title">教师档案摘要</h2>
            <p class="section-description">先查看教师档案摘要，再进入具体档案内容。</p>
          </div>
          <div class="view-toggle">
            <button
              class="view-btn"
              :class="{ active: viewMode === 'card' }"
              @click="switchViewMode('card')"
            >
              卡片视图
            </button>
            <button
              class="view-btn"
              :class="{ active: viewMode === 'list' }"
              @click="switchViewMode('list')"
            >
              列表视图
            </button>
          </div>
        </div>

        <!-- 教师卡片网格 -->
        <div class="teachers-grid">
          <div
            v-for="teacher in teacherCards"
            :key="teacher.id"
            class="teacher-card"
          >
            <div class="card-header">
              <div class="avatar-placeholder">{{ teacher.name.charAt(0) }}</div>
              <div class="teacher-info">
                <h3 class="teacher-name">{{ teacher.name }}</h3>
                <p class="teacher-meta">{{ teacher.college }} | {{ teacher.title }}</p>
                <p class="teacher-cycle">{{ teacher.cycle }} | {{ teacher.year }}</p>
              </div>
            </div>

            <div class="card-body">
              <p class="teacher-description">{{ teacher.description }}</p>
              <div class="teacher-tags">
                <span
                  v-for="tag in teacher.tags"
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="card-footer">
              <span class="update-time">最近更新：{{ teacher.lastUpdate }}</span>
              <button class="btn-primary" @click="viewTeacherDetail(teacher.id)">
                查看成长档案
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.archive-query-page {
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
  margin-bottom: 16px;
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

.page-header h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.description {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

/* 统计卡区域 */
.stats-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
}

.stat-card.primary {
  border-top: 3px solid var(--color-primary);
}

.stat-card.success {
  border-top: 3px solid #22c55e;
}

.stat-card.warning {
  border-top: 3px solid #f59e0b;
}

.stat-card.info {
  border-top: 3px solid #3b82f6;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--color-text-primary);
}

.stat-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.stat-description {
  font-size: 12px;
  color: var(--color-text-hint);
  line-height: 1.4;
}

/* 筛选搜索区 */
.filter-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 24px;
}

.filter-content {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 20px;
}

.search-area {
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border 0.16s ease;
}

.search-input:focus {
  border-color: var(--color-primary);
}

.filter-controls {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 14px;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: var(--color-text-primary);
  outline: none;
  cursor: pointer;
  min-width: 140px;
}

.reset-btn {
  padding: 8px 16px;
  border: 1px solid var(--color-card-border);
  background: white;
  border-radius: 6px;
  font-size: 14px;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.16s ease;
}

.reset-btn:hover {
  background: #f8fafc;
  border-color: var(--color-primary);
}

/* 教师档案摘要区域 */
.teachers-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 32px;
}

.teachers-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-left {
  flex: 1;
}

.section-title {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.section-description {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.view-toggle {
  display: flex;
  gap: 8px;
}

.view-btn {
  padding: 8px 16px;
  border: 1px solid var(--color-card-border);
  background: white;
  border-radius: 6px;
  font-size: 13px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.16s ease;
}

.view-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.view-btn.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* 教师卡片网格 */
.teachers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.teacher-card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.16s ease;
}

.teacher-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  gap: 12px;
  align-items: center;
}

.avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  flex-shrink: 0;
}

.teacher-info {
  flex: 1;
  min-width: 0;
}

.teacher-name {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.teacher-meta {
  margin: 0 0 2px 0;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.teacher-cycle {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-hint);
}

.card-body {
  flex: 1;
  min-height: 80px;
}

.teacher-description {
  margin: 0 0 12px 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.teacher-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 10px;
  background: #f0f9ff;
  color: var(--color-primary);
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid var(--color-card-border);
}

.update-time {
  font-size: 12px;
  color: var(--color-text-hint);
}

.btn-primary {
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-primary:hover {
  background: #28a38a;
}

@media (max-width: 1200px) {
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }

  .teachers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-section {
    grid-template-columns: 1fr;
  }

  .teachers-grid {
    grid-template-columns: 1fr;
  }

  .filter-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-select {
    width: 100%;
  }
}
</style>