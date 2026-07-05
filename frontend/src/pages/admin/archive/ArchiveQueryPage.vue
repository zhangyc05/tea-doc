<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AdminInput, AdminSelect } from '@/components/admin-ui'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import queryHeroArt from '@/assets/admin/archive-query-assets/archive-query-hero-art.png'
import queryHeroEmblem from '@/assets/admin/archive-query-assets/archive-query-hero-emblem.svg'
import archiveQueryEmpty from '@/assets/admin/archive-query-assets/archive-query-empty.svg'
import avatarFemale01 from '@/assets/admin/archive-query-assets/avatars/avatar-teacher-female-01.svg'
import avatarFemale02 from '@/assets/admin/archive-query-assets/avatars/avatar-teacher-female-02.svg'
import avatarFemale03 from '@/assets/admin/archive-query-assets/avatars/avatar-teacher-female-03.svg'
import avatarMale01 from '@/assets/admin/archive-query-assets/avatars/avatar-teacher-male-01.svg'
import avatarMale02 from '@/assets/admin/archive-query-assets/avatars/avatar-teacher-male-02.svg'
import avatarMale03 from '@/assets/admin/archive-query-assets/avatars/avatar-teacher-male-03.svg'
import iconActionReset from '@/assets/admin/archive-query-assets/icons/icon-action-reset.svg'
import iconActionSearch from '@/assets/admin/archive-query-assets/icons/icon-action-search.svg'
import iconFilterCollege from '@/assets/admin/archive-query-assets/icons/icon-filter-college.svg'
import iconFilterTitle from '@/assets/admin/archive-query-assets/icons/icon-filter-title.svg'
import iconFilterUpdate from '@/assets/admin/archive-query-assets/icons/icon-filter-update.svg'
import iconStatContentComplete from '@/assets/admin/archive-query-assets/icons/icon-stat-content-complete.svg'
import iconStatCorrection from '@/assets/admin/archive-query-assets/icons/icon-stat-correction.svg'
import iconStatQueryableTeacher from '@/assets/admin/archive-query-assets/icons/icon-stat-queryable-teacher.svg'
import iconStatRecentUpdate from '@/assets/admin/archive-query-assets/icons/icon-stat-recent-update.svg'
import iconViewGrid from '@/assets/admin/archive-query-assets/icons/icon-view-grid.svg'
import iconViewList from '@/assets/admin/archive-query-assets/icons/icon-view-list.svg'
import { getArchiveQueryMock } from '@/services/mock/archive'

const router = useRouter()
const route = useRoute()

const { stats, collegeOptions, titleOptions, updateOptions, teacherCards } = getArchiveQueryMock()

// 筛选条件
const searchKeyword = ref('')
const submittedSearchKeyword = ref('')
const collegeFilter = ref('全部学院')
const titleFilter = ref('全部职称')
const updateFilter = ref('全部')

// 视图切换
const viewMode = ref('card')

const heroStatCards = computed(() => [
  {
    key: 'total',
    tone: 'primary',
    iconSrc: iconStatQueryableTeacher,
    value: stats.totalTeachers,
    label: '可查询教师',
    desc: '已建立成长档案',
  },
  {
    key: 'recent',
    tone: 'success',
    iconSrc: iconStatRecentUpdate,
    value: stats.recentUpdate,
    label: '近期有更新',
    desc: '近30日档案有新增',
  },
  {
    key: 'complete',
    tone: 'warning',
    iconSrc: iconStatContentComplete,
    value: stats.needsImprovement,
    label: '内容待完善',
    desc: '存在待补充内容',
  },
  {
    key: 'correction',
    tone: 'info',
    iconSrc: iconStatCorrection,
    value: stats.hasCorrection,
    label: '有更正记录',
    desc: '可查看更正前后',
  },
])

const teacherAvatarMap: Record<string, string> = {
  lin: avatarFemale01,
  chen: avatarMale01,
  wang: avatarMale02,
  liu: avatarFemale02,
  zhao: avatarFemale03,
  zhou: avatarMale03,
}

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

function getTeacherAvatar(teacherId: string) {
  return teacherAvatarMap[teacherId] ?? avatarMale02
}
</script>

<template>
  <AdminLayout active-key="archive-query">
    <div class="archive-query-page">
      <!-- Hero 区域 -->
      <section class="query-hero admin-hero">
        <div
          class="hero-art"
          :style="{ backgroundImage: `url(${queryHeroArt})` }"
          aria-hidden="true"
        />

        <div class="hero-content">
          <div class="hero-emblem" aria-hidden="true">
            <div class="hero-icon">
              <img class="hero-emblem-img" :src="queryHeroEmblem" alt="" />
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
              <div
                v-for="card in heroStatCards"
                :key="card.key"
                class="hero-stat-card"
                :class="card.tone"
              >
                <div class="hero-stat-icon">
                  <img class="hero-stat-img" :src="card.iconSrc" alt="" />
                </div>
                <div>
                  <div class="hero-stat-number">{{ card.value }}</div>
                  <div class="hero-stat-label">{{ card.label }}</div>
                  <div class="hero-stat-desc">{{ card.desc }}</div>
                </div>
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
              <AdminInput
                v-model="searchKeyword"
                class="search-input"
                placeholder="搜索教师姓名 / 工号 / 所属部门"
              />
              <Button class="search-action" @click="applySearch">
                <img class="action-icon" :src="iconActionSearch" alt="" />
                搜索
              </Button>
            </div>

            <div class="filter-controls">
              <div class="filter-group">
                <label class="filter-label">
                  <img class="filter-icon" :src="iconFilterCollege" alt="" />
                  学院
                </label>
                <AdminSelect
                  v-model="collegeFilter"
                  class="filter-select"
                  :options="collegeOptions.map((value) => ({ label: value, value }))"
                />
              </div>

              <div class="filter-group">
                <label class="filter-label">
                  <img class="filter-icon" :src="iconFilterTitle" alt="" />
                  职称
                </label>
                <AdminSelect
                  v-model="titleFilter"
                  class="filter-select"
                  :options="titleOptions.map((value) => ({ label: value, value }))"
                />
              </div>

              <div class="filter-group">
                <label class="filter-label">
                  <img class="filter-icon" :src="iconFilterUpdate" alt="" />
                  更新情况
                </label>
                <AdminSelect
                  v-model="updateFilter"
                  class="filter-select"
                  :options="updateOptions.map((value) => ({ label: value, value }))"
                />
              </div>

              <Button variant="outline" @click="resetFilters">
                <img class="action-icon" :src="iconActionReset" alt="" />
                重置
              </Button>
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
              <img class="view-icon" :src="iconViewGrid" alt="" />
              卡片视图
            </button>
            <button
              class="view-btn"
              :class="{ active: viewMode === 'list' }"
              @click="switchViewMode('list')"
            >
              <img class="view-icon" :src="iconViewList" alt="" />
              列表视图
            </button>
          </div>
        </div>

        <!-- 教师卡片网格 -->
        <div v-if="filteredTeacherCards.length === 0" class="archive-query-empty">
          <img :src="archiveQueryEmpty" alt="" />
          <h3>暂无匹配教师档案</h3>
          <p>请调整搜索关键词、学院、职称或更新条件后重试。</p>
        </div>
        <div v-else class="teachers-grid">
          <div
            v-for="teacher in filteredTeacherCards"
            :key="teacher.id"
            class="teacher-card"
          >
            <div class="card-header">
              <div class="teacher-avatar">
                <img class="avatar-img" :src="getTeacherAvatar(teacher.id)" alt="" />
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

.hero-emblem-img {
  width: clamp(28px, 1.8vw, 34px);
  height: clamp(28px, 1.8vw, 34px);
  object-fit: contain;
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

.hero-stat-img {
  width: 70%;
  height: 70%;
  object-fit: contain;
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

.action-icon,
.filter-icon,
.view-icon {
  width: 16px;
  height: 16px;
  flex: none;
  object-fit: contain;
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
  display: inline-flex;
  align-items: center;
  gap: 6px;
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
  display: inline-flex;
  align-items: center;
  gap: 6px;
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

.archive-query-empty {
  display: grid;
  justify-items: center;
  gap: var(--space-admin-xs);
  padding: 42px 20px;
  border: 1px dashed var(--color-card-border);
  border-radius: var(--radius-lg);
  background: #fff;
  color: var(--color-text-secondary);
  text-align: center;
}

.archive-query-empty img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.archive-query-empty h3,
.archive-query-empty p {
  margin: 0;
}

.archive-query-empty h3 {
  color: var(--color-text-primary);
  font-size: 16px;
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

.avatar-img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: contain;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.16);
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
