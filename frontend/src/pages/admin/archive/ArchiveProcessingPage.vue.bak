<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

interface ProcessingRecord {
  id: string
  name: string
  teacher: string
  dimension: string
  source: string
  status: '待确认' | '待检验' | '待补充' | '异常待处理' | '拟退中' | '已入档'
  updateTime: string
}

interface RecordDetail {
  teacher: string
  dimension: string
  updateTime: string
  courseName?: string
  achievementType?: string
  projectTime?: string
  achievementLevel?: string
  uploader: string
  uploadBatch: string
  originalFile: string
  issues: string[]
  processingHistory: string[]
}

const router = useRouter()

// 统计数据
const stats = {
  pendingConfirm: 18,
  pendingVerify: 7,
  pendingSupplement: 6,
  exception: 4,
  returning: 3,
}

// 筛选条件
const statusFilter = ref('全部待处理')
const sourceFilter = ref('全部来源')

const statusOptions = [
  { label: '全部待处理', value: '全部待处理', count: 38 },
  { label: '待确认', value: '待确认', count: 18 },
  { label: '待检验', value: '待检验', count: 7 },
  { label: '待补充', value: '待补充', count: 6 },
  { label: '异常待处理', value: '异常待处理', count: 4 },
  { label: '拟退中', value: '拟退中', count: 3 },
  { label: '已入档', value: '已入档', count: 126 },
]

const sourceOptions = [
  { label: '全部来源', value: '全部来源', count: 38 },
  { label: '发展活动', value: '发展活动', count: 8 },
  { label: '部门上报', value: '部门上报', count: 12 },
  { label: '教研成果', value: '教研成果', count: 9 },
  { label: '公开征集', value: '公开征集', count: 6 },
  { label: '科研申报', value: '科研申报', count: 3 },
]

// 处理记录数据
const processingRecords = ref<ProcessingRecord[]>([
  {
    id: '1',
    name: '教学能力大赛获奖证书',
    teacher: '蒋老师',
    dimension: '成果荣誉',
    source: '教务处发起',
    status: '待确认',
    updateTime: '06-18 14:29',
  },
  {
    id: '2',
    name: '精品课程建设立项材料',
    teacher: '林老师',
    dimension: '教师培训',
    source: '部门上报',
    status: '待补充',
    updateTime: '06-18 15:40',
  },
  {
    id: '3',
    name: '公开课获校级优秀奖',
    teacher: '王老师',
    dimension: '教师培训',
    source: '公开征集',
    status: '待检验',
    updateTime: '06-18 16:10',
  },
  {
    id: '4',
    name: '企业实践记录材料——赵',
    teacher: '赵老师',
    dimension: '企业实践',
    source: '部门上报',
    status: '异常待处理',
    updateTime: '06-18 16:49',
  },
  {
    id: '5',
    name: '课题结题成果鉴定申请',
    teacher: '孙老师',
    dimension: '科研申报',
    source: '科研申报',
    status: '拟退中',
    updateTime: '06-18 17:35',
  },
  {
    id: '6',
    name: '教育案例教学评比记录',
    teacher: '刘老师',
    dimension: '教学工作',
    source: '科研申报',
    status: '待确认',
    updateTime: '06-18 17:25',
  },
])

// 选中的记录详情
const selectedRecord = ref<ProcessingRecord | null>(processingRecords.value[1]) // 默认选中"精品课程建设立项材料"

const recordDetail = computed<RecordDetail | null>(() => {
  if (!selectedRecord.value) return null

  // 默认展示精品课程建设立项材料的详情
  if (selectedRecord.value.id === '2') {
    return {
      teacher: '林老师',
      dimension: '教师培训',
      updateTime: '2026-06-18 15:40',
      courseName: '智能制造基础',
      achievementType: '精品课程建设',
      projectTime: '2024-03',
      achievementLevel: '校级别',
      uploader: '陈老师',
      uploadBatch: '2026 年度课程建设项目 6 批',
      originalFile: '2026 年度课程建设项目 6 批名单.xlsx',
      issues: [
        '缺少立项文件编号',
        '缺少课程负责人任命文件',
        '缺少课程负责人承诺书',
      ],
      processingHistory: [
        '2026-06-18 15:10 教务处上传材料',
        '2026-06-18 15:25 系统识别并生成待处理记录',
        '2026-06-19 09:30 待审核人员确认',
      ],
    }
  }

  // 其他记录的通用详情
  return {
    teacher: selectedRecord.value.teacher,
    dimension: selectedRecord.value.dimension,
    updateTime: `2026-${selectedRecord.value.updateTime}`,
    uploader: '陈老师',
    uploadBatch: '2026 年度课程建设项目 6 批',
    originalFile: '2026 年度课程建设项目 6 批名单.xlsx',
    issues: [],
    processingHistory: [
      `2026-${selectedRecord.value.updateTime} 系统识别并生成待处理记录`,
    ],
  }
})

const searchKeyword = ref('')

function selectRecord(record: ProcessingRecord) {
  selectedRecord.value = record
}

function goToImport() {
  router.push('/admin/archive/import')
}

function confirmArchive() {
  console.log('确认入档', selectedRecord.value)
}

function returnRecord() {
  console.log('再次退回', selectedRecord.value)
}

function markException() {
  console.log('标记异常', selectedRecord.value)
}

function viewSupplement() {
  console.log('查看补充说明', selectedRecord.value)
}

function statusBadgeClass(status: ProcessingRecord['status']) {
  const classMap = {
    '待确认': 'badge-warning',
    '待检验': 'badge-info',
    '待补充': 'badge-warning',
    '异常待处理': 'badge-danger',
    '拟退中': 'badge-danger',
    '已入档': 'badge-success',
  }
  return classMap[status] || 'badge-neutral'
}
</script>

<template>
  <AdminLayout active-key="archive-processing">
    <div class="archive-processing-page">
      <!-- 页面标题区域 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span>成长档案</span>
            <i class="separator">/</i>
            <span class="current">档案处理</span>
          </div>
          <h1>档案处理</h1>
          <p class="description">处理尚未形成正式档案事项的记录，请认真进入档案查询，并可按查看、筛选需求对接和综合利用。</p>
        </div>
      </section>

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stat-card warning">
          <div class="stat-number">{{ stats.pendingConfirm }}</div>
          <div class="stat-label">待确认</div>
        </div>
        <div class="stat-card info">
          <div class="stat-number">{{ stats.pendingVerify }}</div>
          <div class="stat-label">待检验</div>
        </div>
        <div class="stat-card orange">
          <div class="stat-number">{{ stats.pendingSupplement }}</div>
          <div class="stat-label">待补充</div>
        </div>
        <div class="stat-card danger">
          <div class="stat-number">{{ stats.exception }}</div>
          <div class="stat-label">异常待处理</div>
        </div>
        <div class="stat-card slate">
          <div class="stat-number">{{ stats.returning }}</div>
          <div class="stat-label">拟退中</div>
        </div>
      </section>

      <!-- 提示信息 -->
      <section class="tip-section">
        <div class="tip-banner">
          <span class="tip-icon">💡</span>
          <span class="tip-text">发展活动中已完成确认的记录将直接入档，不在此处重复处理。</span>
        </div>
      </section>

      <!-- 主操作区 -->
      <section class="main-actions-section">
        <div class="main-actions-content">
          <button class="btn-primary action-btn" @click="goToImport">
            <span class="btn-icon">📥</span>
            <span>导入部门资料</span>
          </button>
        </div>
      </section>

      <!-- 主体三栏布局 -->
      <section class="main-content">
        <!-- 左侧：筛选条件 -->
        <aside class="filter-sidebar">
          <div class="filter-group">
            <h3 class="filter-title">处理状态</h3>
            <ul class="filter-list">
              <li
                v-for="option in statusOptions"
                :key="option.value"
                class="filter-item"
                :class="{ active: statusFilter === option.value }"
                @click="statusFilter = option.value"
              >
                <span class="filter-label">{{ option.label }}</span>
                <span class="filter-count">{{ option.count }}</span>
              </li>
            </ul>
          </div>

          <div class="filter-group">
            <h3 class="filter-title">来源类型</h3>
            <ul class="filter-list">
              <li
                v-for="option in sourceOptions"
                :key="option.value"
                class="filter-item"
                :class="{ active: sourceFilter === option.value }"
                @click="sourceFilter = option.value"
              >
                <span class="filter-label">{{ option.label }}</span>
                <span class="filter-count">{{ option.count }}</span>
              </li>
            </ul>
          </div>
        </aside>

        <!-- 中间：处理记录列表 -->
        <main class="records-list">
          <div class="list-header">
            <h2 class="list-title">处理记录列表</h2>
            <div class="search-box">
              <input
                v-model="searchKeyword"
                type="text"
                class="search-input"
                placeholder="搜索记录名称 / 教师姓名"
              />
            </div>
          </div>

          <div class="filter-summary">
            <span class="filter-text">当前筛选：{{ statusFilter }} | {{ sourceFilter }} | 共 6 条</span>
          </div>

          <div class="records-table">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>记录名称</th>
                  <th>关联教师</th>
                  <th>建议归档维度</th>
                  <th>来源</th>
                  <th>当前状态</th>
                  <th>更新时间</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="record in processingRecords"
                  :key="record.id"
                  class="record-row"
                  :class="{ selected: selectedRecord?.id === record.id }"
                  @click="selectRecord(record)"
                >
                  <td class="record-name">{{ record.name }}</td>
                  <td>{{ record.teacher }}</td>
                  <td>{{ record.dimension }}</td>
                  <td>{{ record.source }}</td>
                  <td>
                    <span class="badge-status" :class="statusBadgeClass(record.status)">
                      {{ record.status }}
                    </span>
                  </td>
                  <td class="update-time">{{ record.updateTime }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>

        <!-- 右侧：记录详情 -->
        <aside class="record-detail" v-if="recordDetail">
          <div class="detail-header">
            <h2 class="detail-title">{{ selectedRecord?.name }}</h2>
          </div>

          <div class="detail-content">
            <!-- 记录信息 -->
            <div class="detail-section">
              <h3 class="section-title">记录信息</h3>
              <div class="info-list">
                <div class="info-item">
                  <span class="info-label">关联教师：</span>
                  <span class="info-value">{{ recordDetail.teacher }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">建议归档维度：</span>
                  <span class="info-value">{{ recordDetail.dimension }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">更新时间：</span>
                  <span class="info-value">{{ recordDetail.updateTime }}</span>
                </div>
                <div class="info-item" v-if="recordDetail.courseName">
                  <span class="info-label">课程名称：</span>
                  <span class="info-value">{{ recordDetail.courseName }}</span>
                </div>
                <div class="info-item" v-if="recordDetail.achievementType">
                  <span class="info-label">成果类型：</span>
                  <span class="info-value">{{ recordDetail.achievementType }}</span>
                </div>
                <div class="info-item" v-if="recordDetail.projectTime">
                  <span class="info-label">立项时间：</span>
                  <span class="info-value">{{ recordDetail.projectTime }}</span>
                </div>
                <div class="info-item" v-if="recordDetail.achievementLevel">
                  <span class="info-label">成果级别：</span>
                  <span class="info-value">{{ recordDetail.achievementLevel }}</span>
                </div>
              </div>
            </div>

            <!-- 来源信息 -->
            <div class="detail-section">
              <h3 class="section-title">来源信息</h3>
              <div class="info-list">
                <div class="info-item">
                  <span class="info-label">来源：</span>
                  <span class="info-value">教务处上传</span>
                </div>
                <div class="info-item">
                  <span class="info-label">上传人：</span>
                  <span class="info-value">{{ recordDetail.uploader }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">上传批次：</span>
                  <span class="info-value">{{ recordDetail.uploadBatch }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">原始文件：</span>
                  <span class="info-value file-name">{{ recordDetail.originalFile }}</span>
                </div>
              </div>
            </div>

            <!-- 待处理问题 -->
            <div class="detail-section" v-if="recordDetail.issues.length > 0">
              <h3 class="section-title">待处理问题</h3>
              <ul class="issues-list">
                <li v-for="issue in recordDetail.issues" :key="issue" class="issue-item">
                  {{ issue }}
                </li>
              </ul>
            </div>

            <!-- 处理记录 -->
            <div class="detail-section">
              <h3 class="section-title">处理记录</h3>
              <ul class="history-list">
                <li v-for="record in recordDetail.processingHistory" :key="record" class="history-item">
                  {{ record }}
                </li>
              </ul>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="detail-actions">
            <button class="btn-primary" @click="confirmArchive">确认入档</button>
            <button class="btn-secondary" @click="returnRecord">再次退回</button>
            <button class="btn-outline" @click="markException">标记异常</button>
            <button class="btn-link" @click="viewSupplement">查看补充说明</button>
          </div>
        </aside>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.archive-processing-page {
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
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.stat-card {
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  text-align: center;
}

.stat-card.warning {
  border-color: #f59e0b;
  background: #fffbeb;
}

.stat-card.info {
  border-color: #3b82f6;
  background: #eff6ff;
}

.stat-card.orange {
  border-color: #f97316;
  background: #fff7ed;
}

.stat-card.danger {
  border-color: #ef4444;
  background: #fef2f2;
}

.stat-card.slate {
  border-color: #64748b;
  background: #f8fafc;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--color-text-primary);
}

.stat-label {
  font-size: 14px;
  color: var(--color-text-secondary);
}

/* 提示信息 */
.tip-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 16px;
}

.tip-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
}

.tip-icon {
  font-size: 20px;
}

.tip-text {
  font-size: 14px;
  color: var(--color-text-secondary);
}

/* 主体三栏布局 */
.main-content {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 32px;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 360px;
  gap: 16px;
}

/* 左侧筛选条件 */
.filter-sidebar {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 20px;
}

.filter-group {
  margin-bottom: 24px;
}

.filter-group:last-child {
  margin-bottom: 0;
}

.filter-title {
  margin: 0 0 12px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.filter-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.filter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.16s ease;
}

.filter-item:hover {
  background: #f8fafc;
}

.filter-item.active {
  background: #eff6ff;
  color: var(--color-primary);
}

.filter-label {
  font-size: 14px;
  color: var(--color-text-primary);
}

.filter-count {
  font-size: 13px;
  color: var(--color-text-hint);
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 12px;
}

/* 主操作区 */
.main-actions-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 16px;
}

.main-actions-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.16s ease;
}

.action-btn:hover {
  background: #28a38a;
}

.btn-icon {
  font-size: 16px;
}

/* 中间记录列表 */
.records-list {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 20px;
  min-width: 0;
  overflow: hidden;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.list-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.search-box {
  width: 280px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border 0.16s ease;
}

.search-input:focus {
  border-color: var(--color-primary);
}

.filter-summary {
  margin-bottom: 16px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
  font-size: 13px;
}

.filter-text {
  color: var(--color-text-secondary);
}

.records-table {
  min-width: 0;
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th {
  padding: 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-card-border);
  white-space: nowrap;
}

.admin-table td {
  padding: 12px;
  font-size: 14px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.record-row {
  cursor: pointer;
  transition: background 0.16s ease;
}

.record-row:hover {
  background: #f8fafc;
}

.record-row.selected {
  background: #eff6ff;
}

.record-name {
  font-weight: 500;
  color: var(--color-primary);
}

.update-time {
  font-size: 13px;
  color: var(--color-text-hint);
}

/* 状态徽章 */
.badge-status {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.badge-warning {
  background: #fffbeb;
  color: #f59e0b;
}

.badge-info {
  background: #eff6ff;
  color: #3b82f6;
}

.badge-danger {
  background: #fef2f2;
  color: #ef4444;
}

.badge-success {
  background: #f0fdf4;
  color: #22c55e;
}

.badge-neutral {
  background: #f8fafc;
  color: #64748b;
}

/* 右侧记录详情 */
.record-detail {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.detail-header {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-card-border);
}

.detail-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.detail-content {
  flex: 1;
  overflow-y: auto;
}

.detail-section {
  margin-bottom: 20px;
}

.section-title {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-item {
  display: flex;
  padding: 8px 0;
  font-size: 14px;
}

.info-label {
  color: var(--color-text-secondary);
  min-width: 120px;
}

.info-value {
  color: var(--color-text-primary);
  flex: 1;
}

.file-name {
  color: var(--color-primary);
  cursor: pointer;
}

.file-name:hover {
  text-decoration: underline;
}

.issues-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.issue-item {
  padding: 8px 12px;
  margin-bottom: 6px;
  background: #fffbeb;
  border-left: 3px solid #f59e0b;
  border-radius: 4px;
  font-size: 13px;
  color: var(--color-text-primary);
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-item {
  padding: 8px 0;
  font-size: 13px;
  color: var(--color-text-secondary);
  border-bottom: 1px dashed var(--color-card-border);
}

.history-item:last-child {
  border-bottom: none;
}

/* 操作按钮 */
.detail-actions {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--color-card-border);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-primary,
.btn-secondary,
.btn-outline,
.btn-link {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
  border: none;
  outline: none;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background: #28a38a;
}

.btn-secondary {
  background: #f1f5f9;
  color: var(--color-text-primary);
}

.btn-secondary:hover {
  background: #e2e8f0;
}

.btn-outline {
  background: white;
  color: var(--color-text-primary);
  border: 1px solid var(--color-card-border);
}

.btn-outline:hover {
  background: #f8fafc;
}

.btn-link {
  background: transparent;
  color: var(--color-primary);
  border: none;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>