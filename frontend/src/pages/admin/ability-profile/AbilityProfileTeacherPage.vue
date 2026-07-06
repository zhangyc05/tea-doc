<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AdminIcon, AdminInput, AdminPagination, AdminSelect } from '@/components/admin-ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { getAbilityProfileTeacherListMock } from '@/services/mock/ability-profile'

const router = useRouter()
const route = useRoute()
const teacherListProfile = getAbilityProfileTeacherListMock()

const viewMode = ref<'list' | 'card'>('list')

const searchQuery = ref('')
const selectedCollege = ref('全部学院')
const selectedTitle = ref('全部职称')
const selectedType = ref('全部类型')
const selectedFocus = ref(String(route.query.focus || '全部'))

const colleges = teacherListProfile.colleges
const titles = teacherListProfile.titles
const teacherTypes = teacherListProfile.teacherTypes
const focusTypes = teacherListProfile.focusTypes
const teachers = teacherListProfile.teachers
const collegeOptions = colleges.map((value) => ({ label: value, value }))
const titleOptions = titles.map((value) => ({ label: value, value }))
const teacherTypeOptions = teacherTypes.map((value) => ({ label: value, value }))
const focusTypeOptions = focusTypes.map((value) => ({ label: value, value }))

const currentPage = ref(1)
const pageSize = 12
const filteredTeachers = computed(() => {
  const keyword = searchQuery.value.trim()
  return teachers.filter((teacher) => {
    const matchesKeyword = !keyword || teacher.name.includes(keyword) || teacher.id.includes(keyword.toLowerCase())
    const matchesCollege = selectedCollege.value === '全部学院' || teacher.college === selectedCollege.value
    const matchesTitle = selectedTitle.value === '全部职称' || teacher.title === selectedTitle.value
    const matchesType = selectedType.value === '全部类型' || teacher.teacherType === selectedType.value
    const matchesFocus = selectedFocus.value === '全部' || teacher.focusType === selectedFocus.value
    return matchesKeyword && matchesCollege && matchesTitle && matchesType && matchesFocus
  })
})
const total = computed(() => filteredTeachers.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))
const pageNumbers = computed(() => Array.from({ length: totalPages.value }, (_, index) => index + 1))
const paginatedTeachers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredTeachers.value.slice(start, start + pageSize)
})

function switchViewMode(mode: 'list' | 'card') {
  viewMode.value = mode
}

function applySearch() {
  currentPage.value = 1
}

function resetFilters() {
  searchQuery.value = ''
  selectedCollege.value = '全部学院'
  selectedTitle.value = '全部职称'
  selectedType.value = '全部类型'
  selectedFocus.value = '全部'
  currentPage.value = 1
}

function viewTeacherProfile(teacherId: string) {
  router.push(`/admin/ability-profile/teacher/${teacherId}`)
}

function goToPage(page: number) {
  currentPage.value = Math.min(Math.max(page, 1), totalPages.value)
}

function getFocusTypeClass(focusType: string): string {
  switch (focusType) {
    case '重点支持':
      return 'support'
    case '优势样本':
      return 'advantage'
    case '持续观察':
      return 'observation'
    default:
      return ''
  }
}

function getTeacherInitial(name: string) {
  return name.trim().charAt(0) || '教'
}
</script>

<template>
  <AdminLayout active-key="ability-profile-teacher">
    <div class="teacher-profile-page">
      <section class="filter-card">
        <div class="search-control">
          <AdminInput
            v-model="searchQuery"
            class="profile-search-input"
            placeholder="搜索教师姓名 / 工号"
            @keyup.enter="applySearch"
          />
          <button type="button" class="search-button" aria-label="搜索" @click="applySearch">
            <AdminIcon name="search" />
          </button>
        </div>

        <div class="filter-field">
          <span>学院</span>
          <AdminSelect v-model="selectedCollege" :options="collegeOptions" @change="applySearch" />
        </div>
        <div class="filter-field">
          <span>职称</span>
          <AdminSelect v-model="selectedTitle" :options="titleOptions" @change="applySearch" />
        </div>
        <div class="filter-field">
          <span>教师类型</span>
          <AdminSelect v-model="selectedType" :options="teacherTypeOptions" @change="applySearch" />
        </div>
        <div class="filter-field">
          <span>关注类型</span>
          <AdminSelect v-model="selectedFocus" :options="focusTypeOptions" @change="applySearch" />
        </div>

        <button type="button" class="reset-button" aria-label="重置筛选" @click="resetFilters">
          <AdminIcon name="refresh-right" />
        </button>
      </section>

      <section class="list-shell">
        <header class="section-head">
          <div>
            <h1>教师画像列表</h1>
            <p>请选择教师，查看其能力画像详情</p>
          </div>
          <div class="view-toggle">
            <button type="button" :class="{ active: viewMode === 'card' }" @click="switchViewMode('card')">卡片视图</button>
            <button type="button" :class="{ active: viewMode === 'list' }" @click="switchViewMode('list')">列表视图</button>
          </div>
        </header>

        <div v-if="viewMode === 'card'" class="cards-grid">
          <article v-for="(teacher, index) in paginatedTeachers" :key="teacher.id" class="teacher-card">
            <span class="focus-badge card-badge" :class="getFocusTypeClass(teacher.focusType)">
              {{ teacher.focusType }}
            </span>
            <div class="teacher-card-main">
              <div class="teacher-avatar avatar-large">
                <span class="avatar-initial">{{ getTeacherInitial(teacher.name) }}</span>
              </div>
              <div class="card-copy">
                <h2>{{ teacher.name }}</h2>
                <p>{{ teacher.college }} ｜ {{ teacher.title }}</p>
              </div>
            </div>

            <div class="card-metrics">
              <div>
                <span>综合发展指数</span>
                <strong>{{ teacher.developmentIndex }} <em>/ 100</em></strong>
              </div>
              <div>
                <span>教师类型</span>
                <b>{{ teacher.teacherType }}</b>
              </div>
              <div>
                <span>基本能力状态</span>
                <b class="status-ok">{{ teacher.basicAbilityStatus }}</b>
              </div>
            </div>

            <div class="tag-row">
              <span v-for="tag in teacher.tags" :key="tag">{{ tag }}</span>
            </div>

            <button type="button" class="profile-link" @click="viewTeacherProfile(teacher.id)">进入画像 ></button>
          </article>
        </div>

        <div v-else class="teacher-table">
          <article v-for="(teacher, index) in paginatedTeachers" :key="teacher.id" class="teacher-row">
            <div class="teacher-identity">
              <div class="teacher-avatar">
                <span class="avatar-initial">{{ getTeacherInitial(teacher.name) }}</span>
              </div>
              <div>
                <h2>{{ teacher.name }}</h2>
                <p>{{ teacher.college }} ｜ {{ teacher.title }}</p>
              </div>
            </div>

            <div class="row-metric score">
              <span>综合发展指数</span>
              <strong>{{ teacher.developmentIndex }} <em>/ 100</em></strong>
            </div>
            <div class="row-metric">
              <span>教师类型</span>
              <b>{{ teacher.teacherType }}</b>
            </div>
            <div class="row-metric">
              <span>基本能力状态</span>
              <b class="status-ok">{{ teacher.basicAbilityStatus }}</b>
            </div>
            <div class="row-tags">
              <span v-for="tag in teacher.tags.slice(0, 2)" :key="tag">{{ tag }}</span>
            </div>
            <span class="focus-badge" :class="getFocusTypeClass(teacher.focusType)">{{ teacher.focusType }}</span>
            <button type="button" class="profile-link row-link" @click="viewTeacherProfile(teacher.id)">进入画像 ></button>
          </article>
        </div>
      </section>

      <AdminPagination
        v-model:current-page="currentPage"
        class="pagination-bar"
        :page-size="pageSize"
        :total="total"
      />
    </div>
  </AdminLayout>
</template>

<style scoped>
.teacher-profile-page {
  min-height: 100vh;
  padding: 0 0 24px;
  background: var(--color-page-bg, #f5f7fb);
  color: var(--color-text-primary, var(--color-admin-text-strong));
}

.breadcrumb-line {
  display: flex;
  align-items: center;
  gap: var(--space-admin-xs);
  height: 48px;
  font-size: 14px;
  color: #8a96a8;
}

.breadcrumb-line .current {
  color: #1f2a3d;
  font-weight: 600;
}

.slash {
  color: #c0c7d2;
}

.filter-card,
.list-shell,
.pagination-bar {
  border: 1px solid #e6ebf2;
  background: #ffffff;
  box-shadow: 0 8px 22px rgba(32, 56, 96, 0.035);
}

.filter-card {
  display: grid;
  grid-template-columns: minmax(260px, 1.25fr) repeat(4, minmax(150px, 0.8fr)) 40px;
  gap: var(--space-admin-md-lg);
  align-items: center;
  padding: 18px 20px;
  border-radius: var(--radius-lg);
}

.search-control {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 44px;
  align-items: center;
  height: 40px;
  overflow: hidden;
  border: 1px solid #dfe6ef;
  border-radius: var(--radius-admin-panel);
  background: #ffffff;
}

.profile-search-input {
  min-width: 0;
  height: 100%;
}

.profile-search-input :deep(.el-input__wrapper) {
  height: 100%;
  padding: 0 14px;
  border: 0;
  background: transparent;
  box-shadow: none;
}

.profile-search-input :deep(.el-input__inner),
.filter-field select {
  min-width: 0;
  border: 0;
  outline: none;
  color: #1f2a3d;
  font-size: 14px;
}

.search-button,
.reset-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 36px;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
}

.search-button {
  height: 100%;
  border-radius: 0;
  background: #1677ff;
  color: #ffffff;
  font-size: 18px;
}

.search-button svg {
  width: 18px;
  height: 18px;
}

.filter-field {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: var(--space-admin-sm);
  min-width: 0;
}

.filter-field :deep(.el-select) {
  min-width: 0;
  width: 100%;
}

.filter-field :deep(.el-select__wrapper) {
  min-height: 40px;
}

.filter-field span {
  color: #66758a;
  font-size: 14px;
  white-space: nowrap;
}

.reset-button {
  border: 1px solid #dfe6ef;
  background: #ffffff;
  color: #65748a;
  font-size: 18px;
}

.reset-button svg {
  width: 20px;
  height: 20px;
}

.list-shell {
  margin-top: var(--space-admin-lg);
  padding: var(--space-admin-xl);
  border-radius: var(--radius-lg);
}

.section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-admin-card-gap);
  margin-bottom: var(--space-admin-card-gap);
}

.section-head h1 {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25;
}

.section-head p {
  margin: 0;
  color: #7a8798;
  font-size: 14px;
}

.view-toggle {
  display: inline-flex;
  gap: var(--space-admin-xs);
}

.view-toggle button {
  height: 36px;
  padding: 0 16px;
  border: 1px solid #d6dfeb;
  border-radius: var(--radius-admin-panel);
  background: #ffffff;
  color: #526176;
  cursor: pointer;
  font-size: 14px;
}

.view-toggle button.active {
  border-color: #1677ff;
  background: #1677ff;
  color: #ffffff;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-admin-lg);
}

.teacher-card {
  position: relative;
  min-height: 258px;
  padding: var(--space-admin-xl);
  border: 1px solid #e4eaf3;
  border-radius: var(--radius-lg);
  background: #ffffff;
}

.teacher-card-main {
  display: flex;
  align-items: center;
  gap: var(--space-admin-md-lg);
  padding-right: 88px;
}

.card-copy h2,
.teacher-identity h2 {
  margin: 0 0 7px;
  color: #18233a;
  font-size: 18px;
  font-weight: 700;
}

.card-copy p,
.teacher-identity p {
  margin: 0;
  color: #728196;
  font-size: 13px;
}

.teacher-avatar {
  display: flex;
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border: 1px solid #cfe1ff;
  border-radius: 50%;
  background: linear-gradient(180deg, #f7fbff 0%, #eaf3ff 100%);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
}

.avatar-large {
  width: 62px;
  height: 62px;
}

.avatar-initial {
  color: #1d4ed8;
  font-size: 20px;
  font-weight: 800;
  line-height: 1;
}

.avatar-large .avatar-initial {
  font-size: 24px;
}

.focus-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.card-badge {
  position: absolute;
  top: 20px;
  right: 20px;
}

.focus-badge.support {
  background: #fff3dd;
  color: #c67812;
}

.focus-badge.advantage {
  background: #e7f8ee;
  color: #17995a;
}

.focus-badge.observation {
  background: #eaf2ff;
  color: #246fe5;
}

.card-metrics {
  display: grid;
  gap: var(--space-admin-sm);
  margin-top: var(--space-admin-card-gap);
}

.card-metrics div,
.row-metric {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-admin-md);
}

.card-metrics span,
.row-metric span {
  color: #7b889a;
  font-size: 13px;
}

.card-metrics strong,
.row-metric strong {
  color: #1677ff;
  font-size: 20px;
  font-weight: 750;
  line-height: 1;
}

.card-metrics em,
.row-metric em {
  color: #9aa6b7;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
}

.card-metrics b,
.row-metric b {
  color: #27364d;
  font-size: 14px;
  font-weight: 600;
}

.status-ok {
  color: #18a058 !important;
}

.tag-row,
.row-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-admin-xs);
}

.tag-row {
  margin-top: var(--space-admin-lg);
  padding-right: 84px;
}

.tag-row span,
.row-tags span {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 9px;
  border-radius: var(--radius-full);
  background: #f3f7fc;
  color: #516178;
  font-size: 12px;
}

.profile-link {
  border: 0;
  background: transparent;
  color: #1677ff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}

.teacher-card .profile-link {
  position: absolute;
  right: 20px;
  bottom: 22px;
}

.teacher-table {
  display: grid;
  gap: var(--space-admin-sm);
}

.teacher-row {
  display: grid;
  grid-template-columns: minmax(210px, 1.35fr) 142px 132px 116px minmax(210px, 1.4fr) 84px 84px;
  align-items: center;
  gap: var(--space-admin-lg);
  min-height: 92px;
  padding: var(--space-admin-md-lg) var(--space-admin-lg);
  border: 1px solid #e5ebf3;
  border-radius: var(--radius-md);
  background: #ffffff;
}

.teacher-identity {
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 0;
}

.row-metric {
  display: grid;
  justify-content: start;
  gap: var(--space-admin-xs);
}

.row-metric.score strong {
  font-size: 22px;
}

.row-tags {
  min-width: 0;
}

.row-link {
  justify-self: end;
  white-space: nowrap;
}

.pagination-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-admin-xs);
  margin-top: var(--space-admin-lg);
  padding: 14px 18px;
  border-radius: var(--radius-lg);
  color: #64748b;
  font-size: 13px;
}

@media (max-width: 1500px) {
  .filter-card {
    grid-template-columns: minmax(280px, 1.2fr) repeat(2, minmax(170px, 1fr)) 40px;
  }

  .filter-field:nth-of-type(4) {
    grid-column: 1 / 2;
  }

  .filter-field:nth-of-type(5) {
    grid-column: 2 / 3;
  }

  .reset-button {
    grid-column: 3 / 4;
  }

  .teacher-row {
    grid-template-columns: minmax(200px, 1.4fr) 132px 122px 104px minmax(180px, 1.15fr) 80px;
  }

  .row-link {
    grid-column: 6;
  }

  .teacher-row .focus-badge {
    display: none;
  }
}

@media (max-width: 1320px) {
  .filter-card {
    grid-template-columns: minmax(260px, 1fr) minmax(190px, 0.85fr) 40px;
  }

  .search-control {
    grid-column: 1 / 3;
  }

  .filter-field:nth-of-type(2),
  .filter-field:nth-of-type(4) {
    grid-column: 1 / 2;
  }

  .filter-field:nth-of-type(3),
  .filter-field:nth-of-type(5) {
    grid-column: 2 / 3;
  }

  .reset-button {
    grid-column: 3 / 4;
    grid-row: 3 / 4;
  }

  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .teacher-row {
    grid-template-columns: minmax(190px, 1.2fr) 126px 118px minmax(200px, 1fr) 82px;
  }

  .teacher-row .row-metric:nth-of-type(4) {
    display: none;
  }

  .row-link {
    grid-column: auto;
  }
}
</style>
