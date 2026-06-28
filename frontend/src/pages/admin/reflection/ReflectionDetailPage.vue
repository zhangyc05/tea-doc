<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()
const route = useRoute()

// 从路由参数获取反思ID
const reflectionId = route.params.reflectionId as string

// 反思详情数据
const reflectionDetail = ref({
  theme: '项目实训环节学生参与度不足',
  teacher: '林老师',
  department: '智能制造学院',
  major: '机电一体化技术',
  course: '智能制造基础',
  class: '23机电1班',
  trigger: '评教反馈',
  submitTime: '2026-06-18 14:20',
  source: '教师端教学反思',
  method: 'AI 草稿 + 教师确认',
  destination: '成长档案 / 教学工作维度',
})

// 教学反思内容
const reflectionContent = {
  background: '本次反思关联《智能制造基础》项目实训环节，授课对象为 23 机电 1 班。课程进入综合项目阶段后，学生需要完成设备选型、流程拆解和小组协作任务。',
  observation: '学生评教反馈中，多名学生提到项目任务说明不够清晰，课堂问答参与度偏低。课堂过程记录显示，部分小组在任务拆分阶段用时较长。',
  analysis: '主要问题不是学生不参与，而是项目任务层级和评价标准呈现不够清楚，导致基础较弱学生难以快速判断自己应承担的任务。',
  suggestion: '后续可在项目开始前增加任务分层说明，将项目拆分为基础任务、提升任务和拓展任务，并在课堂中增加阶段性检查点，帮助学生及时校准进度。',
}

// 来源数据
const sourceData = {
  trigger: '评教反馈',
  relatedData: [
    '学生评教反馈',
    '课堂过程记录',
    '教师补充说明',
  ],
}

// 相关反思记录
interface RelatedReflection {
  id: string
  theme: string
  course: string
  class: string
  trigger: string
  submitTime: string
}

const relatedReflections: RelatedReflection[] = [
  {
    id: 'class-interaction',
    theme: '课堂互动反馈不足',
    course: '智能制造基础 / 23机电1班',
    class: '23机电1班',
    trigger: '评教反馈',
    submitTime: '2026-06-12 10:15',
  },
  {
    id: 'task-clarity',
    theme: '项目任务分层不够清晰',
    course: '智能制造基础 / 23机电1班',
    class: '23机电1班',
    trigger: '教师主动记录',
    submitTime: '2026-06-10 16:30',
  },
  {
    id: 'progress-difference',
    theme: '实训任务进度差异明显',
    course: '智能制造基础 / 23机电1班',
    class: '23机电1班',
    trigger: '课堂过程记录',
    submitTime: '2026-06-08 09:40',
  },
]

function goBack() {
  router.push('/admin/reflection')
}

function viewSourceData() {
  console.log('查看来源数据')
}

function viewRelatedDetail(id: string) {
  router.push(`/admin/reflection/${id}`)
}

function viewMoreRelated() {
  console.log('查看更多相关记录')
}
</script>

<template>
  <AdminLayout active-key="reflection">
    <div class="reflection-detail-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb-row">
            <div class="breadcrumb">
              <span>发展活动</span>
              <i class="separator">/</i>
              <span>
                <RouterLink to="/admin/reflection">教学反思</RouterLink>
              </span>
              <i class="separator">/</i>
              <span class="current">反思详情</span>
            </div>
            <button class="btn-back" @click="goBack">
              返回列表
            </button>
          </div>

          <!-- 标题卡 -->
          <div class="title-card">
            <h1 class="main-title">{{ reflectionDetail.theme }}</h1>
            <div class="basic-info">
              <div class="info-row">
                <div class="info-item">
                  <span class="info-label">教师：</span>
                  <span class="info-value">{{ reflectionDetail.teacher }}</span>
                </div>
              </div>
              <div class="info-row">
                <div class="info-item">
                  <span class="info-value">{{ reflectionDetail.department }}</span>
                  <span class="info-divider">/</span>
                  <span class="info-value">{{ reflectionDetail.major }}</span>
                </div>
              </div>
              <div class="info-row">
                <div class="info-item">
                  <span class="info-value">{{ reflectionDetail.course }}</span>
                  <span class="info-divider">/</span>
                  <span class="info-value">{{ reflectionDetail.class }}</span>
                </div>
              </div>
              <div class="info-row">
                <div class="info-item">
                  <span class="info-label">触发来源：</span>
                  <span class="info-value">{{ reflectionDetail.trigger }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">提交时间：</span>
                  <span class="info-value">{{ reflectionDetail.submitTime }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="detail-workspace">
          <!-- 左侧：教学反思内容 + 相关反思记录 -->
          <div class="main-content">
            <!-- 教学反思内容 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">教学反思内容</h2>
              </div>
              <div class="card-body">
                <div class="reflection-section">
                  <h3 class="section-title">教学背景</h3>
                  <p class="section-text">{{ reflectionContent.background }}</p>
                </div>
                <div class="reflection-section">
                  <h3 class="section-title">数据观察</h3>
                  <p class="section-text">{{ reflectionContent.observation }}</p>
                </div>
                <div class="reflection-section">
                  <h3 class="section-title">问题分析</h3>
                  <p class="section-text">{{ reflectionContent.analysis }}</p>
                </div>
                <div class="reflection-section">
                  <h3 class="section-title">改进建议</h3>
                  <p class="section-text">{{ reflectionContent.suggestion }}</p>
                </div>
              </div>
            </div>

            <!-- 相关反思记录 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">相关反思记录</h2>
              </div>
              <div class="card-body">
                <table class="related-table">
                  <thead>
                    <tr>
                      <th>反思主题</th>
                      <th>关联课程</th>
                      <th>触发来源</th>
                      <th>提交时间</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="related in relatedReflections" :key="related.id">
                      <td>{{ related.theme }}</td>
                      <td>{{ related.course }}</td>
                      <td>{{ related.trigger }}</td>
                      <td>{{ related.submitTime }}</td>
                      <td>
                        <button class="btn-view" @click="viewRelatedDetail(related.id)">
                          查看
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="card-footer">
                  <button class="btn-link" @click="viewMoreRelated">
                    查看更多相关记录
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧：记录信息 + 来源数据 + 记录去向 -->
          <div class="sidebar">
            <!-- 记录信息 -->
            <div class="sidebar-card">
              <h3 class="sidebar-title">记录信息</h3>
              <div class="sidebar-content">
                <div class="info-row">
                  <span class="info-label">记录来源：</span>
                  <span class="info-value">{{ reflectionDetail.source }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">形成方式：</span>
                  <span class="info-value">{{ reflectionDetail.method }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">提交时间：</span>
                  <span class="info-value">{{ reflectionDetail.submitTime }}</span>
                </div>
              </div>
            </div>

            <!-- 来源数据 -->
            <div class="sidebar-card">
              <h3 class="sidebar-title">来源数据</h3>
              <div class="sidebar-content">
                <div class="info-row">
                  <span class="info-label">触发来源：</span>
                  <span class="info-value">{{ sourceData.trigger }}</span>
                </div>
                <div class="info-row">
                  <div class="info-label">关联数据：</div>
                  <div class="related-data-list">
                    <div
                      v-for="(data, index) in sourceData.relatedData"
                      :key="index"
                      class="related-data-item"
                    >
                      • {{ data }}
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn-source" @click="viewSourceData">
                查看来源数据
              </button>
            </div>

            <!-- 记录去向 -->
            <div class="sidebar-card">
              <h3 class="sidebar-title">记录去向</h3>
              <div class="sidebar-content">
                <p class="destination-text">
                  已进入{{ reflectionDetail.destination }}。
                </p>
                <p class="destination-text">
                  可用于教学改进过程记录和组织分析统计。
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
.reflection-detail-page {
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

/* 标题卡 */
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

.basic-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  gap: 8px;
  align-items: center;
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

.info-divider {
  color: var(--color-text-hint);
}

/* 主体内容区域 */
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
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-card-border);
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.card-body {
  padding: 24px;
}

/* 教学反思内容 */
.reflection-section {
  margin-bottom: 24px;
}

.reflection-section:last-child {
  margin-bottom: 0;
}

.section-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-primary);
}

.section-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

/* 相关反思记录表格 */
.related-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

.related-table th {
  padding: 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
  background: #f8fafc;
}

.related-table td {
  padding: 12px;
  font-size: 13px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.related-table tr:last-child td {
  border-bottom: none;
}

.card-footer {
  padding-top: 16px;
  border-top: 1px solid var(--color-card-border);
  display: flex;
  justify-content: center;
}

.btn-link {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  color: var(--color-primary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-link:hover {
  background: var(--color-primary);
  color: white;
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

/* 侧边栏 */
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
  margin-bottom: 16px;
}

.related-data-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
}

.related-data-item {
  font-size: 13px;
  color: var(--color-text-secondary);
  padding-left: 8px;
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

.btn-source {
  width: 100%;
  padding: 10px 16px;
  background: white;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  color: var(--color-text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-source:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@media (max-width: 1024px) {
  .detail-workspace {
    grid-template-columns: 1fr;
  }
}
</style>