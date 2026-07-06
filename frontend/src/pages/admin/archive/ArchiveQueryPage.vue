<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AdminInput, AdminSelect } from '@/components/admin-ui'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import archiveQueryEmpty from '@/assets/admin/archive-query-assets/archive-query-empty.svg'
import iconActionReset from '@/assets/admin/archive-query-assets/icons/icon-action-reset.svg'
import iconActionSearch from '@/assets/admin/archive-query-assets/icons/icon-action-search.svg'
import iconFilterCollege from '@/assets/admin/archive-query-assets/icons/icon-filter-college.svg'
import iconFilterTitle from '@/assets/admin/archive-query-assets/icons/icon-filter-title.svg'
import iconViewGrid from '@/assets/admin/archive-query-assets/icons/icon-view-grid.svg'
import iconViewList from '@/assets/admin/archive-query-assets/icons/icon-view-list.svg'
import { getArchiveQueryMock } from '@/services/mock/archive'

const router = useRouter()
const route = useRoute()

const { stats, collegeOptions, titleOptions, teacherCards } = getArchiveQueryMock()

// 筛选条件
const searchKeyword = ref('')
const submittedSearchKeyword = ref('')
const collegeFilter = ref('全部学院')
const titleFilter = ref('全部职称')

// 视图切换
const viewMode = ref<'card' | 'list'>('card')

const archiveSummaryStats = computed(() => [
  {
    key: 'total',
    value: stats.totalTeachers,
    label: '可查询教师',
    desc: '已建立成长档案',
  },
  {
    key: 'recent',
    value: stats.recentUpdate,
    label: '近期有更新',
    desc: '近30日档案有新增',
  },
  {
    key: 'complete',
    value: stats.needsImprovement,
    label: '内容待完善',
    desc: '存在待补充内容',
  },
  {
    key: 'correction',
    value: stats.hasCorrection,
    label: '有更正记录',
    desc: '可查看更正前后',
  },
])

function resetFilters() {
  searchKeyword.value = ''
  submittedSearchKeyword.value = ''
  collegeFilter.value = '全部学院'
  titleFilter.value = '全部职称'
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
    return matchesKeyword && matchesCollege && matchesTitle
  })
})

function applySearch() {
  submittedSearchKeyword.value = searchKeyword.value
}

function viewTeacherDetail(teacherId: string) {
  router.push(`/admin/archive/teacher/${teacherId}`)
}

function switchViewMode(mode: 'card' | 'list') {
  viewMode.value = mode
}

function getTeacherInitial(name: string) {
  return name.trim().charAt(0) || '教'
}
</script>

<template>
  <AdminLayout active-key="archive-query">
    <div class="archive-query-page">
      <!-- 查询优先区 -->
      <section class="query-search-panel">
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

              <Button variant="outline" @click="resetFilters">
                <img class="action-icon" :src="iconActionReset" alt="" />
                重置
              </Button>
            </div>
          </div>

          <div class="archive-summary-strip">
            <span
              v-for="item in archiveSummaryStats"
              :key="item.key"
              class="summary-strip-item"
            >
              <strong>{{ item.value }}</strong>
              <span>{{ item.label }}</span>
              <em>{{ item.desc }}</em>
            </span>
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

        <div v-if="filteredTeacherCards.length === 0" class="archive-query-empty">
          <img :src="archiveQueryEmpty" alt="" />
          <h3>暂无匹配教师档案</h3>
          <p>请调整搜索关键词、学院、职称或更新条件后重试。</p>
        </div>
        <div v-else-if="viewMode === 'card'" class="teachers-grid">
          <div
            v-for="teacher in filteredTeacherCards"
            :key="teacher.id"
            class="teacher-card"
          >
            <div class="card-header">
              <div class="teacher-avatar">
                <span class="avatar-initial">{{ getTeacherInitial(teacher.name) }}</span>
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
        <div v-else class="teachers-list">
          <div
            v-for="teacher in filteredTeacherCards"
            :key="teacher.id"
            class="teacher-row"
          >
            <div class="card-header row-header">
              <div class="teacher-avatar">
                <span class="avatar-initial">{{ getTeacherInitial(teacher.name) }}</span>
              </div>
              <div class="teacher-info">
                <h3 class="teacher-name">{{ teacher.name }}</h3>
                <p class="teacher-meta">{{ teacher.college }} | {{ teacher.title }}</p>
                <p class="teacher-cycle">{{ teacher.cycle }} | {{ teacher.year }}</p>
              </div>
            </div>

            <p class="teacher-description row-description">{{ teacher.description }}</p>

            <div class="teacher-tags row-tags">
              <span
                v-for="tag in teacher.tags"
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>

            <span class="update-time row-update">最近更新：{{ teacher.lastUpdate }}</span>
            <Button class="archive-detail-action" size="sm" @click="viewTeacherDetail(teacher.id)">
              查看成长档案
            </Button>
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
  gap: var(--space-admin-md);
  background: var(--color-page-bg);
}

/* 查询搜索区 */
.query-search-panel {
  width: 100%;
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 clamp(20px, 1.4vw, 24px);
}

.filter-content {
  width: 100%;
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-card-border);
  padding: var(--space-admin-lg);
}

.filter-row {
  display: grid;
  grid-template-columns: minmax(360px, 1.35fr) repeat(2, minmax(140px, 0.55fr)) auto;
  gap: var(--space-admin-md);
  align-items: center;
}

.search-area {
  display: flex;
  gap: var(--space-admin-xs);
  min-width: 0;
}

.search-input {
  flex: 1;
  min-width: 0;
}

.search-action {
  height: 40px;
  padding: 10px 20px;
  white-space: nowrap;
}

.search-action .action-icon {
  filter: brightness(0) invert(1);
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
  display: contents;
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
  min-width: 140px;
}

.archive-summary-strip {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-admin-sm);
  margin-top: var(--space-admin-md);
  padding-top: var(--space-admin-md);
  border-top: 1px solid var(--color-card-border);
}

.summary-strip-item {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  color: var(--color-text-secondary);
  font-size: 13px;
  line-height: 1.4;
  white-space: nowrap;
}

.summary-strip-item + .summary-strip-item::before {
  width: 1px;
  height: 12px;
  margin-right: var(--space-admin-sm);
  background: var(--color-card-border);
  content: '';
}

.summary-strip-item strong {
  color: var(--color-text-primary);
  font-size: 16px;
  font-weight: 800;
}

.summary-strip-item em {
  color: var(--color-text-hint);
  font-style: normal;
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

.view-btn.active .view-icon {
  filter: brightness(0) invert(1);
}

/* 教师卡片网格 */
.teachers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-admin-xl);
}

.teachers-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-md);
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

.teacher-row {
  display: grid;
  grid-template-columns: minmax(220px, 0.95fr) minmax(280px, 1.4fr) minmax(220px, 0.9fr) auto auto;
  gap: var(--space-admin-lg);
  align-items: center;
  padding: var(--space-admin-lg) var(--space-admin-xl);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  background: white;
  transition: all 0.16s ease;
}

.teacher-row:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  gap: var(--space-admin-md);
  align-items: center;
}

.row-header {
  min-width: 0;
}

.teacher-avatar {
  display: flex;
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid #cfe1ff;
  border-radius: 50%;
  background: linear-gradient(180deg, #f7fbff 0%, #eaf3ff 100%);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
}

.avatar-initial {
  color: #1d4ed8;
  font-size: 20px;
  font-weight: 800;
  line-height: 1;
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

.row-description {
  margin: 0;
  -webkit-line-clamp: 2;
}

.teacher-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-admin-xs);
}

.row-tags {
  min-width: 0;
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

.row-update {
  white-space: nowrap;
}

.archive-detail-action {
  flex: none;
}

@media (max-width: 1440px) {
  .filter-row {
    grid-template-columns: minmax(320px, 1fr) repeat(2, minmax(140px, 0.5fr));
  }
}

@media (max-width: 1280px) {
  .filter-row {
    grid-template-columns: minmax(320px, 1fr) repeat(2, minmax(140px, 0.5fr));
    gap: var(--space-admin-md);
  }

  .filter-row > button {
    justify-self: flex-start;
  }

  .teachers-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .teacher-row {
    grid-template-columns: minmax(220px, 1fr) minmax(260px, 1.2fr) auto;
  }

  .row-tags,
  .row-update {
    display: none;
  }
}

@media (max-width: 768px) {
  .query-search-panel,
  .teachers-section {
    padding-right: var(--space-admin-lg);
    padding-left: var(--space-admin-lg);
  }

  .teachers-grid {
    grid-template-columns: 1fr;
  }

  .teacher-row {
    grid-template-columns: 1fr;
    align-items: stretch;
  }

  .row-tags,
  .row-update {
    display: flex;
  }

  .filter-row {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .search-area {
    width: 100%;
    max-width: 100%;
  }

  .filter-controls {
    display: flex;
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

  .archive-summary-strip {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .summary-strip-item {
    white-space: normal;
  }

  .summary-strip-item + .summary-strip-item::before {
    display: none;
  }
}
</style>
