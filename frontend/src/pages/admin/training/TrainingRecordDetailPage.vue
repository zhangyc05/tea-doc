<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()
const route = useRoute()

// 从路由参数获取记录ID
const recordId = route.params.recordId as string
const materialMessage = ref('')

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
  source: '教师端培训记录',
  method: '教师填写 + AI 总结草稿 + 教师确认',
  updateTime: '2026-05-15 09:30',
  mode: '线上 + 线下',
})

// 学习记录
const learningRecords = [
  { date: '2026-05-10', content: '完成数字化教学资源建设专题学习，记录了课程资源颗粒化设计方法。', status: '已完成' },
  { date: '2026-05-12', content: '参与课堂数据分析工具实操，记录了学生学习行为数据的使用场景。', status: '已完成' },
  { date: '2026-05-14', content: '完成培训结课学习记录，补充了后续在课程建设中的应用想法。', status: '已完成' },
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
    name: '双师型教师实践能力提升培训',
    teacher: '林老师',
    level: '企业培训',
    hours: '40 学时',
    materialStatus: '学习中',
  },
  {
    id: 'practice-training-wang',
    name: 'AI 赋能课程建设专题培训',
    teacher: '陈老师',
    level: '校级',
    hours: '16 学时',
    materialStatus: '待总结',
  },
  {
    id: 'ideology-course-zhao',
    name: '课程思政教学设计研修',
    teacher: '赵老师',
    level: '市级',
    hours: '24 学时',
    materialStatus: '记录完整',
  },
]

function goBack() {
  router.push('/admin/training/records')
}

function uploadMaterial() {
  const certificate = certificateMaterials.value.find((material) => material.name === '培训结业证书')
  if (!certificate) return
  certificate.status = '已上传'
  certificate.uploadTime = '2026-05-18 10:00'
  recordDetail.value.status = '记录完整'
  materialMessage.value = '培训结业证书已补充，记录材料已完整。'
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
          <!-- 标题卡 -->
          <div class="title-card">
            <div class="title-icon" aria-hidden="true"></div>
            <div class="title-content">
              <div class="title-row">
                <h1 class="main-title">{{ recordDetail.name }}</h1>
                <span class="title-status" :class="recordDetail.status">{{ recordDetail.status }}</span>
              </div>
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
                  <span class="info-divider">|</span>
                  <span class="info-label">培训机构：</span>
                  <span class="info-value">{{ recordDetail.institution }}</span>
                </div>
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
                    <span class="info-label">参与方式：</span>
                    <span class="info-value">{{ recordDetail.mode }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">记录来源：</span>
                    <span class="info-value">{{ recordDetail.source }}</span>
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
                      <span class="timeline-dot"></span>
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
                <p v-if="materialMessage" class="material-message">{{ materialMessage }}</p>
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
                      <th>记录名称</th>
                      <th>对象</th>
                      <th>级别 / 学时</th>
                      <th>材料情况</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="related in relatedRecords" :key="related.id">
                      <td>{{ related.name }}</td>
                      <td>{{ related.teacher }}</td>
                      <td>{{ related.level }} / {{ related.hours }}</td>
                      <td>
                        <span class="status-badge" :class="related.materialStatus">
                          {{ related.materialStatus }}
                        </span>
                      </td>
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
	                  <span class="info-label">记录来源：</span>
	                  <span class="info-value">{{ recordDetail.source }}</span>
	                </div>
	                <div class="info-row">
	                  <span class="info-label">形成方式：</span>
	                  <span class="info-value">{{ recordDetail.method }}</span>
	                </div>
	                <div class="info-row">
	                  <span class="info-label">更新时间：</span>
	                  <span class="info-value">{{ recordDetail.updateTime }}</span>
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
  background: #f6f9ff;
}

.training-record-detail-page *,
.training-record-detail-page *::before,
.training-record-detail-page *::after {
  box-sizing: border-box;
}

.page-header {
  padding: 24px 0 0;
}

.header-content {
  width: min(100% - 48px, 1500px);
  margin: 0 auto;
}

.breadcrumb-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #172b55;
  font-weight: 800;
}

.breadcrumb a {
  color: #172b55;
  text-decoration: none;
  transition: color 0.16s ease;
}

.breadcrumb a:hover {
  color: #0f5eef;
}

.breadcrumb .separator {
  color: #9aa9c0;
}

.breadcrumb .current {
  color: #0f5eef;
  font-weight: 800;
}

.btn-back {
  padding: 0;
  background: transparent;
  border: 0;
  color: #0f5eef;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-back:hover {
  color: #0c4fd0;
}

.title-card {
  display: flex;
  align-items: center;
  gap: 22px;
  min-height: 132px;
  background: #fff;
  border-radius: 8px;
  padding: 24px 28px;
  border: 1px solid #d9e5f7;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.title-icon {
  flex: none;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #eaf2ff;
  position: relative;
}

.title-icon::before {
  content: '';
  position: absolute;
  left: 25px;
  top: 18px;
  width: 24px;
  height: 34px;
  border-radius: 5px;
  background: #0f5eef;
}

.title-content {
  flex: 1;
  min-width: 0;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 14px;
}

.main-title {
  margin: 0;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 900;
  color: #07183d;
}

.title-status {
  flex: none;
  min-width: 76px;
  height: 34px;
  padding: 0 12px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #fff1e7;
  color: #f97316;
  font-size: 14px;
  font-weight: 900;
  border: 1px solid #ffd5ba;
}

.title-status.记录完整 {
  background: #e8f8ef;
  color: #0ca65f;
  border-color: #bfe8d2;
}

.summary-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-item {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.info-label {
  font-size: 14px;
  color: #405985;
}

.info-value {
  font-size: 14px;
  color: #172b55;
  font-weight: 700;
}

.info-value.status {
  color: #f97316;
  font-weight: 900;
}

.info-divider {
  color: #9aa9c0;
}

.main-section {
  width: min(100% - 48px, 1500px);
  margin: 0 auto;
  padding: 16px 0 34px;
}

.detail-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 16px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.content-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #d9e5f7;
  overflow: hidden;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px 6px;
}

.card-title {
  margin: 0;
  font-size: 20px;
  font-weight: 900;
  color: #07183d;
}

.btn-upload {
  height: 36px;
  padding: 0 14px;
  background: #0f5eef;
  color: white;
  border: 1px solid #0f5eef;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-upload:hover {
  background: #0c4fd0;
}

.card-body {
  padding: 12px 20px 18px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 36px;
}

.info-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.summary-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  color: #172b55;
}

.submit-info {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #e5edf8;
  font-size: 13px;
  color: #405985;
}

.submit-label {
  font-weight: 600;
}

.submit-time {
  color: #172b55;
}

.learning-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-left: 6px;
}

.learning-item {
  display: grid;
  grid-template-columns: 110px 1fr 20px;
  gap: 16px;
  align-items: start;
}

.learning-date {
  font-size: 13px;
  font-weight: 800;
  color: #172b55;
}

.learning-content {
  font-size: 14px;
  color: #172b55;
  line-height: 1.7;
}

.learning-status {
  display: flex;
  justify-content: center;
}

.timeline-dot {
  width: 9px;
  height: 9px;
  margin-top: 5px;
  border-radius: 50%;
  background: #0f5eef;
  box-shadow: 0 0 0 5px #eaf2ff;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 62px;
  height: 28px;
  padding: 0 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 900;
}

.status-badge.completed {
  background: #e8f8ef;
  color: #0ca65f;
}

.status-badge.已上传 {
  background: #e8f8ef;
  color: #0ca65f;
}

.status-badge.待补充 {
  background: #fff1e7;
  color: #f97316;
}

.status-badge.学习中 {
  background: #eaf2ff;
  color: #0f5eef;
}

.status-badge.待总结 {
  background: #fff1e7;
  color: #f97316;
}

.status-badge.记录完整 {
  background: #e8f8ef;
  color: #0ca65f;
}

.material-table,
.related-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #d9e5f7;
  border-radius: 6px;
  overflow: hidden;
  table-layout: fixed;
}

.material-table th,
.related-table th {
  height: 36px;
  padding: 0 12px;
  text-align: center;
  font-size: 13px;
  font-weight: 900;
  color: #31466f;
  border-bottom: 1px solid #d9e5f7;
  border-right: 1px solid #e5edf8;
  background: #f4f7fc;
}

.material-table td,
.related-table td {
  height: 38px;
  padding: 0 12px;
  font-size: 13px;
  color: #172b55;
  text-align: center;
  border-bottom: 1px solid #e5edf8;
  border-right: 1px solid #e5edf8;
}

.material-table th:last-child,
.material-table td:last-child,
.related-table th:last-child,
.related-table td:last-child {
  border-right: 0;
}

.material-table tr:last-child td,
.related-table tr:last-child td {
  border-bottom: none;
}

.btn-view {
  padding: 0;
  background: transparent;
  color: #0f5eef;
  border: none;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  transition: color 0.16s ease;
}

.btn-view:hover {
  color: #0c4fd0;
}

.material-message {
  margin: 0 0 10px;
  color: #0f5eef;
  font-size: 13px;
  font-weight: 800;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.sidebar-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #d9e5f7;
  padding: 24px 22px;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.sidebar-title {
  margin: 0 0 22px;
  font-size: 20px;
  font-weight: 900;
  color: #07183d;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar .info-row {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  align-items: start;
  gap: 10px;
}

.material-status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e5edf8;
}

.material-label {
  font-size: 14px;
  color: #405985;
}

.material-value {
  font-size: 14px;
  font-weight: 900;
}

.material-value.completed {
  color: #0ca65f;
}

.material-value.incomplete {
  color: #f97316;
}

.destination-text {
  margin: 0 0 10px;
  font-size: 14px;
  line-height: 1.75;
  color: #172b55;
}

.destination-text:last-child {
  margin-bottom: 0;
}

@media (max-width: 1300px) {
  .header-content,
  .main-section {
    width: min(100% - 32px, 1500px);
  }

  .detail-workspace {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .title-card {
    align-items: flex-start;
  }

  .title-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .info-grid,
  .sidebar {
    grid-template-columns: 1fr;
  }

  .card-body {
    overflow-x: auto;
  }

  .material-table,
  .related-table {
    min-width: 720px;
  }
}
</style>
