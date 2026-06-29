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

// Hero 区域背景图
const heroArtImage = new URL('@/images/hero-art.png', import.meta.url).href

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
      <!-- Hero 区域 -->
      <section class="query-hero admin-hero">
        <div
          class="hero-art"
          :style="{ backgroundImage: `url(${heroArtImage})` }"
          aria-hidden="true"
        />

        <div class="hero-content">
          <div class="hero-emblem">
            <div class="hero-icon">
              <svg viewBox="0 0 40 40" aria-hidden="true">
                <path d="M11 8h16l4 4v20H11z" />
                <path d="M27 8v6h6M16 17h10M16 22h10M16 27h6" />
                <circle cx="29" cy="29" r="4" />
              </svg>
            </div>
          </div>

          <div class="hero-main">
            <div class="hero-title-group">
              <div class="hero-title-row">
                <h1>档案查阅</h1>
              </div>
              <p class="hero-subtitle">
                查找教师并查看其成长档案摘要，点击卡片可进入完整档案内容。
              </p>
            </div>

            <!-- Hero 统计卡区域 -->
            <div class="hero-stats-cards">
              <div class="hero-stat-card primary">
                <div class="hero-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div class="hero-stat-number">{{ stats.totalTeachers }}</div>
                <div class="hero-stat-label">可查询教师</div>
                <div class="hero-stat-desc">已建立成长档案</div>
              </div>
              <div class="hero-stat-card success">
                <div class="hero-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div class="hero-stat-number">{{ stats.recentUpdate }}</div>
                <div class="hero-stat-label">近期有更新</div>
                <div class="hero-stat-desc">近30日档案有新增</div>
              </div>
              <div class="hero-stat-card warning">
                <div class="hero-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <div class="hero-stat-number">{{ stats.needsImprovement }}</div>
                <div class="hero-stat-label">内容待完善</div>
                <div class="hero-stat-desc">存在待补充内容</div>
              </div>
              <div class="hero-stat-card info">
                <div class="hero-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                </div>
                <div class="hero-stat-number">{{ stats.hasCorrection }}</div>
                <div class="hero-stat-label">有更正记录</div>
                <div class="hero-stat-desc">可查看更正前后</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 筛选搜索区 -->
      <section class="filter-section">
        <div class="filter-content">
          <div class="filter-row">
            <div class="search-area">
              <input
                v-model="searchKeyword"
                type="text"
                class="search-input"
                placeholder="搜索教师姓名 / 工号 / 所属部门"
              />
              <button class="search-btn">搜索</button>
            </div>

            <div class="filter-controls">
              <div class="filter-group">
                <label class="filter-label">学院</label>
                <select v-model="collegeFilter" class="filter-select">
                  <option v-for="option in collegeOptions" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>

              <div class="filter-group">
                <label class="filter-label">职称</label>
                <select v-model="titleFilter" class="filter-select">
                  <option v-for="option in titleOptions" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>

              <div class="filter-group">
                <label class="filter-label">更新情况</label>
                <select v-model="updateFilter" class="filter-select">
                  <option v-for="option in updateOptions" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>

              <button class="reset-btn" @click="resetFilters">重置</button>
            </div>
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
              <div class="teacher-avatar">
                <div class="avatar-circle" :class="`avatar-${teacher.id}`"></div>
              </div>
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
  display: flex;
  width: 100%;
  min-height: calc(100vh - var(--admin-topbar-height) - var(--admin-page-gutter-y) * 2);
  flex-direction: column;
  gap: clamp(14px, 1vw, 18px);
  background: var(--color-page-bg);
}

/* Hero 区域样式 */
.query-hero {
  position: relative;
  overflow: hidden;
  min-height: clamp(220px, 14.5vw, 260px);
}

.query-hero::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.99) 34%,
    rgba(255, 255, 255, 0.94) 48%,
    rgba(255, 255, 255, 0.72) 62%,
    rgba(255, 255, 255, 0.28) 82%,
    rgba(255, 255, 255, 0) 100%
  );
  content: '';
}

.query-hero::after {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: min(260px, 22%);
  height: 78px;
  pointer-events: none;
  background-image: radial-gradient(#b7d4ff 1px, transparent 1px);
  background-size: 12px 12px;
  opacity: 0.08;
  content: '';
}

.hero-art {
  position: absolute;
  top: clamp(10px, 0.8vw, 16px);
  right: clamp(18px, 1.5vw, 30px);
  bottom: clamp(10px, 0.8vw, 16px);
  z-index: 0;
  width: min(48%, 720px);
  background-repeat: no-repeat;
  background-position: right center;
  background-size: contain;
  opacity: 0.88;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  min-height: clamp(220px, 14.5vw, 260px);
  max-width: min(1100px, 75%);
  align-items: center;
  gap: clamp(18px, 1.2vw, 26px);
  padding: 0 0 0 clamp(24px, 1.75vw, 34px);
}

.hero-emblem {
  flex: none;
  transform: translateY(-34px);
}

.hero-icon {
  display: flex;
  width: clamp(60px, 3.8vw, 68px);
  height: clamp(60px, 3.8vw, 68px);
  align-items: center;
  justify-content: center;
  border: clamp(7px, 0.5vw, 9px) solid rgba(255, 255, 255, 0.92);
  border-radius: 50%;
  background: linear-gradient(145deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
  box-shadow: 0 14px 28px rgba(11, 99, 246, 0.24);
}

.hero-icon svg {
  width: clamp(24px, 1.6vw, 28px);
  height: clamp(24px, 1.6vw, 28px);
  fill: none;
  stroke: #fff;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hero-main {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  justify-content: center;
}

.hero-title-group {
  min-width: 0;
}

.hero-title-row {
  display: flex;
  align-items: center;
  gap: clamp(10px, 0.72vw, 14px);
  margin-bottom: 6px;
}

.hero-title-row h1 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: clamp(22px, 1.45vw, 28px);
  font-weight: 950;
  letter-spacing: -0.55px;
  line-height: 1.16;
}

.hero-subtitle {
  max-width: 560px;
  margin: 0;
  color: var(--color-text-secondary);
  font-size: clamp(12px, 0.75vw, 14px);
  font-weight: 700;
  line-height: 1.5;
}

/* Hero 统计卡区域 */
.hero-stats-cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(10px, 0.7vw, 12px);
  margin-top: clamp(14px, 0.95vw, 18px);
  width: 100%;
}

.hero-stat-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: clamp(10px, 0.7vw, 12px);
  padding: clamp(14px, 0.9vw, 18px);
  background: white;
  border-radius: clamp(8px, 0.55vw, 10px);
  border: 1px solid var(--color-card-border);
  min-width: 0;
  min-height: clamp(90px, 5.8vw, 110px);
  transition: all 0.16s ease;
}

.hero-stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.hero-stat-card.primary {
  border-top: 3px solid var(--color-primary);
}

.hero-stat-card.success {
  border-top: 3px solid #22c55e;
}

.hero-stat-card.warning {
  border-top: 3px solid #f59e0b;
}

.hero-stat-card.info {
  border-top: 3px solid #3b82f6;
}

.hero-stat-icon {
  flex-shrink: 0;
  display: flex;
  width: clamp(36px, 2.3vw, 48px);
  height: clamp(36px, 2.3vw, 48px);
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.hero-stat-card.primary .hero-stat-icon {
  background: rgba(47, 191, 155, 0.1);
  color: var(--color-primary);
}

.hero-stat-card.success .hero-stat-icon {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.hero-stat-card.warning .hero-stat-icon {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.hero-stat-card.info .hero-stat-icon {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.hero-stat-icon svg {
  width: 100%;
  height: 100%;
}

.hero-stat-number {
  font-size: clamp(20px, 1.3vw, 28px);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1;
}

.hero-stat-label {
  font-size: clamp(10px, 0.65vw, 12px);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.3;
  white-space: nowrap;
}

.hero-stat-desc {
  font-size: clamp(10px, 0.65vw, 11px);
  color: var(--color-text-hint);
  line-height: 1.3;
  display: none;
}

/* 筛选搜索区 */
.filter-section {
  width: 100%;
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 clamp(20px, 1.4vw, 24px);
}

.filter-content {
  width: 100%;
  background: white;
  border-radius: clamp(10px, 0.7vw, 12px);
  border: 1px solid var(--color-card-border);
  padding: clamp(16px, 1.1vw, 20px);
}

.filter-row {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.search-area {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  width: clamp(360px, 28vw, 480px);
}

.search-input {
  flex: 1;
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

.search-btn {
  padding: 10px 20px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.16s ease;
}

.search-btn:hover {
  background: #28a38a;
}

.filter-controls {
  display: flex;
  gap: 16px;
  align-items: center;
  flex: 1;
  margin-left: auto;
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
  padding: 0 clamp(20px, 1.4vw, 24px) clamp(24px, 1.6vw, 32px);
}

.teachers-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
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

.teacher-avatar {
  flex-shrink: 0;
}

.avatar-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #e0f2fe;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
}

/* 头部 */
.avatar-circle::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #0ea5e9;
}

/* 身体/肩部 */
.avatar-circle::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 28px;
  border-radius: 16px 16px 0 0;
  background: #0ea5e9;
}

/* 不同头像的颜色变化 */
.avatar-lin {
  background: #e0f2fe;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
}

.avatar-lin::before,
.avatar-lin::after {
  background: #0ea5e9;
}

.avatar-chen {
  background: #fef3c7;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
}

.avatar-chen::before,
.avatar-chen::after {
  background: #f59e0b;
}

.avatar-wang {
  background: #dcfce7;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
}

.avatar-wang::before,
.avatar-wang::after {
  background: #22c55e;
}

.avatar-liu {
  background: #fce7f3;
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.2);
}

.avatar-liu::before,
.avatar-liu::after {
  background: #ec4899;
}

.avatar-zhao {
  background: #ede9fe;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
}

.avatar-zhao::before,
.avatar-zhao::after {
  background: #8b5cf6;
}

.avatar-zhou {
  background: #ffedd5;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
}

.avatar-zhou::before,
.avatar-zhou::after {
  background: #f97316;
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

/* 响应式 */
@media (min-width: 1680px) {
  .hero-stat-desc {
    display: block;
  }
}

@media (max-width: 1440px) {
  .query-hero {
    min-height: var(--admin-hero-height-compact);
  }

  .hero-art {
    width: min(42%, 560px);
    opacity: 0.78;
  }

  .hero-content {
    min-height: var(--admin-hero-height-compact);
    max-width: 68%;
  }

  .query-hero::before {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.99) 38%,
      rgba(255, 255, 255, 0.92) 52%,
      rgba(255, 255, 255, 0.68) 68%,
      rgba(255, 255, 255, 0.24) 84%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  .hero-title-row h1 {
    font-size: clamp(21px, 1.35vw, 25px);
  }

  .hero-stats-cards {
    gap: 10px;
  }

  .hero-stat-card {
    gap: 10px;
    padding: clamp(12px, 0.85vw, 16px);
    min-height: 90px;
  }

  .hero-stat-icon {
    width: clamp(34px, 2.2vw, 40px);
    height: clamp(34px, 2.2vw, 40px);
  }

  .hero-stat-number {
    font-size: clamp(18px, 1.25vw, 22px);
  }

  .hero-stat-label {
    font-size: clamp(9px, 0.6vw, 11px);
  }
}

@media (max-width: 1280px) {
  .hero-art {
    opacity: 0.34;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-stats-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .hero-stat-card {
    padding: clamp(14px, 0.9vw, 18px);
    min-height: clamp(100px, 6.2vw, 110px);
  }

  .hero-stat-icon {
    width: clamp(40px, 2.5vw, 48px);
    height: clamp(40px, 2.5vw, 48px);
  }

  .hero-stat-number {
    font-size: clamp(20px, 1.3vw, 24px);
  }

  .hero-stat-label {
    font-size: clamp(10px, 0.65vw, 12px);
  }

  .teachers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-stats-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .teachers-grid {
    grid-template-columns: 1fr;
  }

  .filter-row {
    flex-direction: column;
    align-items: stretch;
  }

  .search-area {
    max-width: 100%;
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
