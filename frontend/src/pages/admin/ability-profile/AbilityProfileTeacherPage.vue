<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()

// 视图模式
const viewMode = ref<'list' | 'card'>('list')

// 搜索和筛选
const searchQuery = ref('')
const selectedCollege = ref('全部学院')
const selectedTitle = ref('全部职称')
const selectedType = ref('全部类型')
const selectedFocus = ref('全部')

// 筛选项
const colleges = ['全部学院', '智能制造学院', '电子信息学院', '财经学院', '计算机学院', '外国语学院', '艺术设计学院']
const titles = ['全部职称', '讲师', '副教授', '教授']
const teacherTypes = ['全部类型', '教学实践型', '教研成长型', '实践带动型', '综合发展型']
const focusTypes = ['全部', '重点支持', '持续观察', '优势样本']

// 教师数据
interface Teacher {
  id: string
  name: string
  college: string
  title: string
  developmentIndex: number
  teacherType: string
  basicAbilityStatus: string
  tags: string[]
  focusType: string
  avatar?: string
}

const teachers: Teacher[] = [
  {
    id: 'lin',
    name: '林老师',
    college: '智能制造学院',
    title: '讲师',
    developmentIndex: 76,
    teacherType: '教学实践型',
    basicAbilityStatus: '达标',
    tags: ['课程建设基础较好', '实践教学成效突出', '教研成果持续积累'],
    focusType: '重点支持',
  },
  {
    id: 'chen',
    name: '陈老师',
    college: '电子信息学院',
    title: '副教授',
    developmentIndex: 72,
    teacherType: '教研成长型',
    basicAbilityStatus: '达标',
    tags: ['教研方向逐步明确', '科研成果持续积累', '课程改革有潜力'],
    focusType: '持续观察',
  },
  {
    id: 'wang',
    name: '王老师',
    college: '财经学院',
    title: '讲师',
    developmentIndex: 81,
    teacherType: '实践带动型',
    basicAbilityStatus: '达标',
    tags: ['实践教学能力突出', '校企合作成效明显', '服务贡献较大'],
    focusType: '优势样本',
  },
  {
    id: 'liu',
    name: '刘老师',
    college: '计算机学院',
    title: '副教授',
    developmentIndex: 68,
    teacherType: '教研成长型',
    basicAbilityStatus: '达标',
    tags: ['课程建设有提升空间', '教研成果持续积累', '服务贡献继续观察'],
    focusType: '持续观察',
  },
  {
    id: 'zhao',
    name: '赵老师',
    college: '外国语学院',
    title: '讲师',
    developmentIndex: 79,
    teacherType: '综合发展型',
    basicAbilityStatus: '达标',
    tags: ['教学表现稳定优秀', '教研能力持续提升', '学生指导成效良好'],
    focusType: '优势样本',
  },
  {
    id: 'zhou',
    name: '周老师',
    college: '艺术设计学院',
    title: '讲师',
    developmentIndex: 71,
    teacherType: '实践带动型',
    basicAbilityStatus: '达标',
    tags: ['实践成果转化可提升', '课程建设基础较好', '服务育人持续关注'],
    focusType: '重点支持',
  },
]

// 分页
const currentPage = ref(1)
const pageSize = 12
const total = 142

function switchViewMode(mode: 'list' | 'card') {
  viewMode.value = mode
}

function resetFilters() {
  searchQuery.value = ''
  selectedCollege.value = '全部学院'
  selectedTitle.value = '全部职称'
  selectedType.value = '全部类型'
  selectedFocus.value = '全部'
}

function viewTeacherProfile(teacherId: string) {
  router.push(`/admin/ability-profile/teacher/${teacherId}`)
}

function getAvatar(name: string): string {
  return name.charAt(0)
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
</script>

<template>
  <AdminLayout active-key="ability-profile-teacher">
    <div class="teacher-profile-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span>能力画像</span>
            <i class="separator">/</i>
            <span class="current">教师画像</span>
          </div>
        </div>
      </section>

      <!-- 筛选区域 -->
      <section class="filter-section">
        <div class="filter-content">
          <div class="filter-row">
            <div class="search-box">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索教师姓名 / 工号"
                class="search-input"
              />
            </div>
            <div class="filter-controls">
              <select v-model="selectedCollege" class="filter-select">
                <option v-for="college in colleges" :key="college" :value="college">
                  {{ college }}
                </option>
              </select>
              <select v-model="selectedTitle" class="filter-select">
                <option v-for="title in titles" :key="title" :value="title">
                  {{ title }}
                </option>
              </select>
              <select v-model="selectedType" class="filter-select">
                <option v-for="type in teacherTypes" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
              <select v-model="selectedFocus" class="filter-select">
                <option v-for="focus in focusTypes" :key="focus" :value="focus">
                  {{ focus }}
                </option>
              </select>
              <button class="btn-reset" @click="resetFilters">重置</button>
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
        </div>
      </section>

      <!-- 内容区域 -->
      <section class="content-section">
        <div class="content-wrapper">
          <div v-if="viewMode === 'list'" class="list-view">
            <div class="list-header">
              <h2 class="list-title">教师画像列表</h2>
              <p class="list-description">请选择教师，查看其能力画像详情</p>
            </div>
            <div class="teacher-list">
              <div
                v-for="teacher in teachers"
                :key="teacher.id"
                class="teacher-row"
              >
                <div class="teacher-avatar">
                  <span class="avatar-text">{{ getAvatar(teacher.name) }}</span>
                </div>
                <div class="teacher-info">
                  <div class="teacher-name-row">
                    <span class="teacher-name">{{ teacher.name }}</span>
                    <span class="teacher-college">{{ teacher.college }}</span>
                    <span class="teacher-title">{{ teacher.title }}</span>
                  </div>
                  <div class="teacher-meta">
                    <div class="meta-item">
                      <span class="meta-label">综合发展指数</span>
                      <span class="meta-value">{{ teacher.developmentIndex }} / 100</span>
                    </div>
                    <div class="meta-item">
                      <span class="meta-label">教师类型</span>
                      <span class="meta-value">{{ teacher.teacherType }}</span>
                    </div>
                    <div class="meta-item">
                      <span class="meta-label">基本能力状态</span>
                      <span class="meta-value status">{{ teacher.basicAbilityStatus }}</span>
                    </div>
                  </div>
                  <div class="teacher-tags">
                    <span
                      v-for="(tag, index) in teacher.tags.slice(0, 3)"
                      :key="index"
                      class="tag"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
                <div class="teacher-focus">
                  <span
                    class="focus-badge"
                    :class="getFocusTypeClass(teacher.focusType)"
                  >
                    {{ teacher.focusType }}
                  </span>
                </div>
                <div class="teacher-action">
                  <button class="btn-view" @click="viewTeacherProfile(teacher.id)">
                    进入画像
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="card-view">
            <div class="cards-grid">
              <div
                v-for="teacher in teachers"
                :key="teacher.id"
                class="teacher-card"
              >
                <div class="card-header">
                  <div class="card-avatar">
                    <span class="avatar-text">{{ getAvatar(teacher.name) }}</span>
                  </div>
                  <div class="focus-indicator">
                    <span
                      class="focus-dot"
                      :class="getFocusTypeClass(teacher.focusType)"
                    >
                      {{ teacher.focusType }}
                    </span>
                  </div>
                </div>
                <div class="card-body">
                  <h3 class="card-name">{{ teacher.name }}</h3>
                  <div class="card-meta">
                    <span class="meta-text">{{ teacher.college }}</span>
                    <span class="meta-divider">|</span>
                    <span class="meta-text">{{ teacher.title }}</span>
                  </div>
                  <div class="card-score">
                    <span class="score-label">综合发展指数</span>
                    <div class="score-value">
                      {{ teacher.developmentIndex }} <span class="score-divider">/</span> 100
                    </div>
                  </div>
                  <div class="card-type">
                    <span class="type-label">教师类型</span>
                    <span class="type-value">{{ teacher.teacherType }}</span>
                  </div>
                  <div class="card-status">
                    <span class="status-label">基本能力状态</span>
                    <span class="status-value">{{ teacher.basicAbilityStatus }}</span>
                  </div>
                  <div class="card-tags">
                    <span
                      v-for="(tag, index) in teacher.tags.slice(0, 3)"
                      :key="index"
                      class="card-tag"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
                <div class="card-footer">
                  <button class="btn-card-view" @click="viewTeacherProfile(teacher.id)">
                    进入画像
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 分页区域 -->
      <section class="pagination-section">
        <div class="pagination-content">
          <div class="pagination-info">
            共 {{ total }} 条，每页 {{ pageSize }} 条
          </div>
          <div class="pagination-controls">
            <button class="page-btn" :disabled="currentPage === 1">
              上一页
            </button>
            <span class="page-info">{{ currentPage }} / {{ Math.ceil(total / pageSize) }} 页</span>
            <button class="page-btn" :disabled="currentPage >= Math.ceil(total / pageSize)">
              下一页
            </button>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.teacher-profile-page {
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

/* 筛选区域 */
.filter-section {
  background: white;
  border-bottom: 1px solid var(--color-card-border);
}

.filter-content {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 20px 24px;
}

.filter-row {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
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

.filter-controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-select {
  padding: 10px 16px;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  outline: none;
}

.btn-reset {
  padding: 10px 16px;
  background: transparent;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  color: var(--color-text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-reset:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.view-toggle {
  display: flex;
  gap: 8px;
}

.view-btn {
  padding: 10px 16px;
  background: transparent;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  color: var(--color-text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.view-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.view-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

/* 内容区域 */
.content-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
}

.content-wrapper {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  overflow: hidden;
}

/* 列表视图 */
.list-view {
  padding: 24px;
}

.list-header {
  margin-bottom: 20px;
}

.list-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.list-description {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.teacher-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.teacher-row {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  align-items: center;
}

.teacher-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-text {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.teacher-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.teacher-name-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.teacher-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.teacher-college,
.teacher-title {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.teacher-meta {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.meta-label {
  font-size: 12px;
  color: var(--color-text-hint);
}

.meta-value {
  font-size: 13px;
  color: var(--color-text-primary);
  font-weight: 500;
}

.meta-value.status {
  color: var(--color-primary);
}

.teacher-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 8px;
  background: #e0f2fe;
  color: var(--color-primary);
  border-radius: 4px;
  font-size: 11px;
}

.teacher-focus {
  display: flex;
  justify-content: center;
}

.focus-badge {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.focus-badge.support {
  background: #fef3c7;
  color: #d97706;
}

.focus-badge.advantage {
  background: #d1fae5;
  color: #059669;
}

.focus-badge.observation {
  background: #dbeafe;
  color: #2563eb;
}

.teacher-action {
  display: flex;
  justify-content: flex-end;
}

.btn-view {
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-view:hover {
  background: #28a38a;
}

/* 卡片视图 */
.card-view {
  padding: 24px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.teacher-card {
  background: white;
  border: 1px solid var(--color-card-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.16s ease;
}

.teacher-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-header {
  padding: 16px;
  background: #f8fafc;
  border-bottom: 1px solid var(--color-card-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-avatar .avatar-text {
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.focus-indicator {
  display: flex;
}

.focus-dot {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.focus-dot.support {
  background: #fef3c7;
  color: #d97706;
}

.focus-dot.advantage {
  background: #d1fae5;
  color: #059669;
}

.focus-dot.observation {
  background: #dbeafe;
  color: #2563eb;
}

.card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.card-meta {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.meta-divider {
  color: var(--color-text-hint);
}

.card-score {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.score-label {
  font-size: 12px;
  color: var(--color-text-hint);
}

.score-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-primary);
}

.score-divider {
  font-size: 12px;
  color: var(--color-text-hint);
  margin: 0 2px;
}

.card-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.type-label {
  color: var(--color-text-hint);
}

.type-value {
  color: var(--color-text-primary);
  font-weight: 500;
}

.card-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.status-label {
  color: var(--color-text-hint);
}

.status-value {
  color: var(--color-primary);
  font-weight: 500;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.card-tag {
  padding: 3px 6px;
  background: #f0f9ff;
  color: var(--color-primary);
  border-radius: 4px;
  font-size: 10px;
  line-height: 1.4;
}

.card-footer {
  padding: 12px 16px;
  border-top: 1px solid var(--color-card-border);
  display: flex;
  justify-content: center;
}

.btn-card-view {
  width: 100%;
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-card-view:hover {
  background: #28a38a;
}

/* 分页区域 */
.pagination-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 20px 24px;
}

.pagination-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-info {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.pagination-controls {
  display: flex;
  gap: 16px;
  align-items: center;
}

.page-btn {
  padding: 8px 16px;
  background: white;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  font-size: 13px;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.16s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 13px;
  color: var(--color-text-secondary);
}

@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .teacher-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .teacher-action {
    justify-content: flex-start;
  }
}
</style>