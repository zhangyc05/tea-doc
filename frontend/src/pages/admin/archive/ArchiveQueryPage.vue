<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { getArchiveQueryMock } from '@/services/mock/archive'

const router = useRouter()

// Hero 区域背景图
const heroArtImage = new URL('@/images/hero-art.png', import.meta.url).href

const { stats, collegeOptions, titleOptions, updateOptions, teacherCards } = getArchiveQueryMock()

// 筛选条件
const searchKeyword = ref('')
const submittedSearchKeyword = ref('')
const collegeFilter = ref('全部学院')
const titleFilter = ref('全部职称')
const updateFilter = ref('全部')

// 视图切换
const viewMode = ref('card')

function resetFilters() {
  searchKeyword.value = ''
  submittedSearchKeyword.value = ''
  collegeFilter.value = '全部学院'
  titleFilter.value = '全部职称'
  updateFilter.value = '全部'
}

const filteredTeacherCards = computed(() => {
  const keyword = submittedSearchKeyword.value.trim().toLowerCase()
  return teacherCards.filter((teacher) => {
    const matchesKeyword = !keyword
      || [teacher.name, teacher.college, teacher.title, teacher.description, ...teacher.tags]
        .join(' ')
        .toLowerCase()
        .includes(keyword)
    const matchesCollege = collegeFilter.value === '全部学院' || teacher.college === collegeFilter.value
    const matchesTitle = titleFilter.value === '全部职称' || teacher.title === titleFilter.value
    const matchesUpdate = updateFilter.value === '全部'
      || teacher.tags.includes(updateFilter.value)
      || teacher.description.includes(updateFilter.value)
    return matchesKeyword && matchesCollege && matchesTitle && matchesUpdate
  })
})

function applySearch() {
  submittedSearchKeyword.value = searchKeyword.value
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
              <Button class="search-action" @click="applySearch">搜索</Button>
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

              <Button variant="outline" @click="resetFilters">重置</Button>
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
            v-for="teacher in filteredTeacherCards"
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
              <Button class="archive-detail-action" size="sm" @click="viewTeacherDetail(teacher.id)">
                查看成长档案
              </Button>
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
  gap: var(--space-admin-lg);
  align-items: flex-start;
}

.search-area {
  display: flex;
  gap: var(--space-admin-xs);
  flex-shrink: 0;
  width: clamp(360px, 28vw, 480px);
}

.search-input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-admin-panel);
  font-size: 14px;
  outline: none;
  transition: border 0.16s ease;
}

.search-input:focus {
  border-color: var(--color-primary);
}

.search-action {
  height: auto;
  padding: 10px 20px;
  white-space: nowrap;
}

.filter-controls {
  display: flex;
  gap: var(--space-admin-lg);
  align-items: center;
  flex: 1;
  margin-left: auto;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: var(--space-admin-xs);
}

.filter-label {
  font-size: 14px;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  background: white;
  color: var(--color-text-primary);
  outline: none;
  cursor: pointer;
  min-width: 140px;
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
  margin-bottom: var(--space-admin-lg);
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
  gap: var(--space-admin-xs);
}

.view-btn {
  padding: 8px 16px;
  border: 1px solid var(--color-card-border);
  background: white;
  border-radius: var(--radius-sm);
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
  gap: var(--space-admin-xl);
}

.teacher-card {
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-card-border);
  padding: var(--space-admin-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-lg);
  transition: all 0.16s ease;
}

.teacher-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  gap: var(--space-admin-md);
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
  gap: var(--space-admin-xs);
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

.archive-detail-action {
  flex: none;
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
    gap: var(--space-admin-sm);
  }

  .hero-stat-card {
    gap: var(--space-admin-sm);
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
    gap: var(--space-admin-md);
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
