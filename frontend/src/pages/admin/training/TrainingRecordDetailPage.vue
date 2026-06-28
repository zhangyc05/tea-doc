<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()
const route = useRoute()

// 从路由参数获取记录ID
const recordId = route.params.recordId as string

// 记录详情数据
const recordDetail = ref({
  name: '职业教育数字化教学能力提升培训',
  teacher: '林老师',
  department: '智能制造学院',
  major: '机电一体化技术',
  level: '省级培训',
  hours: '32 学时',
  startDate: '2026-05-10',
  endDate: '2026-05-14',
  institution: '省职业教育教师发展中心',
  status: '证书待补',
  destination: '成长档案 / 个人发展维度',
})

// 学习记录
const learningRecords = [
  { date: '2026-05-10', content: '开班仪式，数字化教学理念介绍', status: '已完成' },
  { date: '2026-05-11', content: '数字化教学工具实操训练', status: '已完成' },
  { date: '2026-05-12', content: '在线教学设计与实施', status: '已完成' },
  { date: '2026-05-13', content: '教学数据分析与应用', status: '已完成' },
  { date: '2026-05-14', content: '总结交流，结业考核', status: '已完成' },
]

// 培训总结
const trainingSummary = ref({
  content: '通过本次培训，我深入了解了数字化教学的理念和方法，掌握了多种数字化教学工具的使用技巧。特别是在在线教学设计和教学数据分析方面，获得了实用的经验和工具。在今后的教学工作中，我将积极应用所学知识，提升课堂教学效果和学生学习体验。',
  submitTime: '2026-05-16 18:30',
})

// 证书材料
const certificateMaterials = ref([
  {
    name: '培训结业证书',
    status: '待补充',
    uploadTime: '—',
  },
  {
    name: '学习证明材料',
    status: '已上传',
    uploadTime: '2026-05-15 10:20',
  },
])

// 相关培训记录
const relatedRecords = [
  {
    id: 'ai-course-chen',
    name: 'AI 赋能课程建设专题培训',
    date: '2026-05-20 至 2026-05-21',
    hours: '16 学时',
  },
  {
    id: 'practice-training-wang',
    name: '双师型教师实践能力提升培训',
    date: '2026-06-01 至 2026-06-07',
    hours: '40 学时',
  },
]

function goBack() {
  router.push('/admin/training/records')
}

function uploadMaterial() {
  console.log('上传材料')
}

function viewRelatedRecord(recordId: string) {
  router.push(`/admin/training/records/${recordId}`)
}
</script>

<template>
  <AdminLayout active-key="training-records">
    <div class="training-record-detail-page">
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb-row">
            <div class="breadcrumb">
              <span>培训管理</span>
              <i class="separator">/</i>
              <span>
                <RouterLink to="/admin/training/records">记录总览</RouterLink>
              </span>
              <i class="separator">/</i>
              <span class="current">记录详情</span>
            </div>
            <button class="btn-back" @click="goBack">
              返回列表
            </button>
          </div>

          <!-- 标题卡 -->
          <div class="title-card">
            <h1 class="main-title">{{ recordDetail.name }}</h1>
            <div class="summary-info">
              <div class="info-item">
                <span class="info-value">{{ recordDetail.teacher }}</span>
                <span class="info-divider">|</span>
                <span class="info-value">{{ recordDetail.department }} / {{ recordDetail.major }}</span>
              </div>
              <div class="info-item">
                <span class="info-value">{{ recordDetail.level }}</span>
                <span class="info-divider">|</span>
                <span class="info-value">{{ recordDetail.hours }}</span>
                <span class="info-divider">|</span>
                <span class="info-value">{{ recordDetail.startDate }} 至 {{ recordDetail.endDate }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">培训机构：</span>
                <span class="info-value">{{ recordDetail.institution }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">状态：</span>
                <span class="info-value status">{{ recordDetail.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="detail-workspace">
          <!-- 左侧：主要内容 -->
          <div class="main-content">
            <!-- 培训基本信息 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">培训基本信息</h2>
              </div>
              <div class="card-body">
                <div class="info-grid">
                  <div class="info-row">
                    <span class="info-label">培训名称：</span>
                    <span class="info-value">{{ recordDetail.name }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训机构：</span>
                    <span class="info-value">{{ recordDetail.institution }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训级别：</span>
                    <span class="info-value">{{ recordDetail.level }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训学时：</span>
                    <span class="info-value">{{ recordDetail.hours }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训时间：</span>
                    <span class="info-value">{{ recordDetail.startDate }} 至 {{ recordDetail.endDate }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">当前状态：</span>
                    <span class="info-value">{{ recordDetail.status }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 学习记录 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">学习记录</h2>
              </div>
              <div class="card-body">
                <div class="learning-list">
                  <div
                    v-for="(record, index) in learningRecords"
                    :key="index"
                    class="learning-item"
                  >
                    <div class="learning-date">{{ record.date }}</div>
                    <div class="learning-content">{{ record.content }}</div>
                    <div class="learning-status">
                      <span class="status-badge completed">{{ record.status }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 培训总结 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">培训总结</h2>
              </div>
              <div class="card-body">
                <p class="summary-text">{{ trainingSummary.content }}</p>
                <div class="submit-info">
                  <span class="submit-label">提交时间：</span>
                  <span class="submit-time">{{ trainingSummary.submitTime }}</span>
                </div>
              </div>
            </div>

            <!-- 证书材料 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">证书材料</h2>
                <button class="btn-upload" @click="uploadMaterial">
                  上传材料
                </button>
              </div>
              <div class="card-body">
                <table class="material-table">
                  <thead>
                    <tr>
                      <th>材料名称</th>
                      <th>状态</th>
                      <th>上传时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(material, index) in certificateMaterials" :key="index">
                      <td>{{ material.name }}</td>
                      <td>
                        <span class="status-badge" :class="material.status">
                          {{ material.status }}
                        </span>
                      </td>
                      <td>{{ material.uploadTime }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 相关培训记录 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">相关培训记录</h2>
              </div>
              <div class="card-body">
                <table class="related-table">
                  <thead>
                    <tr>
                      <th>培训名称</th>
                      <th>培训时间</th>
                      <th>学时</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="related in relatedRecords" :key="related.id">
                      <td>{{ related.name }}</td>
                      <td>{{ related.date }}</td>
                      <td>{{ related.hours }}</td>
                      <td>
                        <button
                          class="btn-view"
                          @click="viewRelatedRecord(related.id)"
                        >
                          查看
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 右侧：信息卡片 -->
          <div class="sidebar">
            <!-- 记录信息 -->
            <div class="sidebar-card">
              <h3 class="sidebar-title">记录信息</h3>
              <div class="sidebar-content">
                <div class="info-row">
                  <span class="info-label">教师：</span>
                  <span class="info-value">{{ recordDetail.teacher }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">院系：</span>
                  <span class="info-value">{{ recordDetail.department }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">专业：</span>
                  <span class="info-value">{{ recordDetail.major }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">培训级别：</span>
                  <span class="info-value">{{ recordDetail.level }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">培训学时：</span>
                  <span class="info-value">{{ recordDetail.hours }}</span>
                </div>
              </div>
            </div>

            <!-- 材料情况 -->
            <div class="sidebar-card">
              <h3 class="sidebar-title">材料情况</h3>
              <div class="sidebar-content">
                <div class="material-status-item">
                  <span class="material-label">培训总结：</span>
                  <span class="material-value completed">已提交</span>
                </div>
                <div class="material-status-item">
                  <span class="material-label">证书材料：</span>
                  <span class="material-value incomplete">待补充</span>
                </div>
                <div class="material-status-item">
                  <span class="material-label">学习证明：</span>
                  <span class="material-value completed">已上传</span>
                </div>
              </div>
            </div>

            <!-- 记录去向 -->
            <div class="sidebar-card">
              <h3 class="sidebar-title">记录去向</h3>
              <div class="sidebar-content">
                <p class="destination-text">
                  已进入{{ recordDetail.destination }}。
                </p>
                <p class="destination-text">
                  可用于个人培训经历记录、聘期要求对照和个人发展报告统计。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.training-record-detail-page {
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

.breadcrumb-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.breadcrumb a {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.16s ease;
}

.breadcrumb a:hover {
  color: var(--color-primary);
}

.breadcrumb .separator {
  color: var(--color-text-hint);
}

.breadcrumb .current {
  color: var(--color-text-primary);
  font-weight: 600;
}

.btn-back {
  padding: 10px 16px;
  background: white;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  color: var(--color-text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-back:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.title-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--color-card-border);
}

.main-title {
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.summary-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.info-label {
  font-size: 13px;
  color: var(--color-text-hint);
}

.info-value {
  font-size: 13px;
  color: var(--color-text-primary);
  font-weight: 500;
}

.info-value.status {
  color: #dc2626;
  font-weight: 600;
}

.info-divider {
  color: var(--color-text-hint);
}

.main-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
}

.detail-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 16px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.content-card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-card-border);
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.btn-upload {
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-upload:hover {
  background: #28a38a;
}

.card-body {
  padding: 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.summary-text {
  margin: 0 0 16px 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.submit-info {
  padding-top: 16px;
  border-top: 1px solid var(--color-card-border);
  font-size: 13px;
  color: var(--color-text-hint);
}

.submit-label {
  font-weight: 600;
}

.submit-time {
  color: var(--color-text-primary);
}

.learning-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.learning-item {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
}

.learning-date {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
}

.learning-content {
  font-size: 14px;
  color: var(--color-text-primary);
  line-height: 1.5;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.status-badge.completed {
  background: #d1fae5;
  color: #059669;
}

.status-badge.已上传 {
  background: #d1fae5;
  color: #059669;
}

.status-badge.待补充 {
  background: #fef3c7;
  color: #d97706;
}

.material-table,
.related-table {
  width: 100%;
  border-collapse: collapse;
}

.material-table th,
.related-table th {
  padding: 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
  background: #f8fafc;
}

.material-table td,
.related-table td {
  padding: 12px;
  font-size: 13px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.material-table tr:last-child td,
.related-table tr:last-child td {
  border-bottom: none;
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

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.sidebar-card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 24px;
}

.sidebar-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.material-status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}

.material-label {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.material-value {
  font-size: 13px;
  font-weight: 500;
}

.material-value.completed {
  color: #059669;
}

.material-value.incomplete {
  color: #d97706;
}

.destination-text {
  margin: 0 0 8px 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-secondary);
}

.destination-text:last-child {
  margin-bottom: 0;
}

@media (max-width: 1024px) {
  .detail-workspace {
    grid-template-columns: 1fr;
  }
}
</style>