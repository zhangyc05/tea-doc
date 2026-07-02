<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { getReflectionDetailMock } from '@/services/mock/reflection'

const router = useRouter()
const route = useRoute()

// 从路由参数获取反思ID
const reflectionId = route.params.reflectionId as string
const sourceMessage = ref('')
const reflectionDetailMock = getReflectionDetailMock(reflectionId)

const reflectionDetail = ref(reflectionDetailMock.reflectionDetail)
const reflectionContent = reflectionDetailMock.reflectionContent
const sourceData = reflectionDetailMock.sourceData
const relatedReflections = reflectionDetailMock.relatedReflections

function goBack() {
  router.push('/admin/reflection')
}

function viewSourceData() {
  sourceMessage.value = `已关联：${sourceData.relatedData.join('、')}`
}

function viewRelatedDetail(id: string) {
  router.push(`/admin/reflection/${id}`)
}

function viewMoreRelated() {
  router.push('/admin/reflection?keyword=课堂互动反馈不足')
}
</script>

<template>
  <AdminLayout active-key="reflection">
    <div class="reflection-detail-page">
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb-row">
            <div class="breadcrumb">
              <span>发展活动</span>
              <span class="separator">/</span>
              <span>教学反思</span>
              <span class="separator">/</span>
              <span class="current">反思详情</span>
            </div>
          </div>
          <button class="btn-back" @click="goBack">‹ 返回列表</button>

          <div class="title-card">
            <div class="title-icon" aria-hidden="true"></div>
            <div class="title-content">
              <h1 class="main-title">{{ reflectionDetail.theme }}</h1>
              <div class="basic-info">
                <div class="info-row">
                  <span class="info-value">{{ reflectionDetail.teacher }}</span>
                  <span class="info-divider">|</span>
                  <span class="info-value">{{ reflectionDetail.department }} / {{ reflectionDetail.major }}</span>
                  <span class="info-divider">|</span>
                  <span class="info-value">{{ reflectionDetail.course }} / {{ reflectionDetail.class }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">触发来源：</span>
                  <span class="info-value">{{ reflectionDetail.trigger }}</span>
                  <span class="info-divider">|</span>
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
              <p v-if="sourceMessage" class="source-message">{{ sourceMessage }}</p>
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
  background: #f7faff;
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
  margin-bottom: 18px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #172b55;
  font-weight: 700;
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
  display: inline-flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 0;
  background: transparent;
  border: 0;
  color: #0f5eef;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-back:hover {
  color: #0c4fd0;
}

/* 标题卡 */
.title-card {
  display: flex;
  align-items: center;
  gap: 22px;
  min-height: 126px;
  background: #fff;
  border-radius: 8px;
  padding: 24px 32px;
  border: 1px solid #d9e5f7;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.title-icon {
  flex: none;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: #eaf2ff;
  position: relative;
}

.title-icon::before {
  content: '';
  position: absolute;
  left: 24px;
  top: 17px;
  width: 22px;
  height: 30px;
  border-radius: 4px;
  background: #0f5eef;
  box-shadow: inset 0 -8px 0 rgba(255, 255, 255, 0.25);
}

.title-content {
  min-width: 0;
}

.main-title {
  margin: 0 0 14px;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 800;
  color: #07183d;
}

.basic-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  gap: 8px;
  align-items: center;
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

.info-divider {
  color: #9aa9c0;
}

/* 主体内容区域 */
.main-section {
  width: min(100% - 48px, 1500px);
  margin: 0 auto;
  padding: 16px 0 32px;
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
  background: white;
  border-radius: 8px;
  border: 1px solid #d9e5f7;
  overflow: hidden;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.card-header {
  padding: 20px 22px 4px;
}

.card-title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #07183d;
}

.card-body {
  padding: 18px 22px 22px;
}

/* 教学反思内容 */
.reflection-section {
  margin-bottom: 24px;
  padding-left: 14px;
  border-left: 4px solid #0f5eef;
}

.reflection-section:last-child {
  margin-bottom: 0;
}

.section-title {
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 800;
  color: #07183d;
}

.section-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.85;
  color: #172b55;
}

/* 相关反思记录表格 */
.related-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0;
  table-layout: fixed;
  border: 1px solid #d9e5f7;
  border-radius: 6px;
  overflow: hidden;
}

.related-table th {
  height: 38px;
  padding: 0 14px;
  text-align: left;
  font-size: 13px;
  font-weight: 800;
  color: #31466f;
  border-bottom: 1px solid #d9e5f7;
  border-right: 1px solid #e5edf8;
  background: #f4f7fc;
}

.related-table td {
  height: 42px;
  padding: 0 14px;
  font-size: 13px;
  color: #172b55;
  border-bottom: 1px solid #e5edf8;
  border-right: 1px solid #e5edf8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.related-table th:last-child,
.related-table td:last-child {
  border-right: 0;
}

.related-table th:nth-child(1) { width: 24%; }
.related-table th:nth-child(2) { width: 30%; }
.related-table th:nth-child(3) { width: 18%; }
.related-table th:nth-child(4) { width: 22%; }
.related-table th:nth-child(5) { width: 6%; }

.related-table tr:last-child td {
  border-bottom: none;
}

.card-footer {
  padding-top: 12px;
  display: flex;
  justify-content: center;
}

.btn-link {
  padding: 0;
  background: transparent;
  border: 0;
  color: #0f5eef;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-link:hover {
  color: #0c4fd0;
}

.btn-view {
  padding: 0;
  background: transparent;
  color: #0f5eef;
  border: none;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-view:hover {
  color: #0c4fd0;
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
  border-radius: 8px;
  border: 1px solid #d9e5f7;
  padding: 26px 28px;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.sidebar-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 22px;
  font-size: 20px;
  font-weight: 800;
  color: #07183d;
}

.sidebar-title::before {
  content: '';
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #eaf2ff;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 18px;
}

.sidebar .info-row {
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr);
  align-items: start;
  gap: 10px;
}

.related-data-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
}

.related-data-item {
  font-size: 14px;
  color: #172b55;
  padding-left: 8px;
  line-height: 1.7;
}

.destination-text {
  margin: 0 0 14px;
  font-size: 14px;
  line-height: 1.8;
  color: #172b55;
}

.destination-text:last-child {
  margin-bottom: 0;
}

.btn-source {
  width: 220px;
  height: 44px;
  padding: 0 16px;
  background: white;
  border: 1px solid #0f5eef;
  border-radius: 6px;
  color: #0f5eef;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-source:hover {
  background: #f4f8ff;
}

.source-message {
  margin: 12px 0 0;
  color: #405985;
  font-size: 13px;
  line-height: 1.6;
}

@media (max-width: 1300px) {
  .header-content,
  .main-section {
    width: min(100% - 32px, 1500px);
  }

  .detail-workspace {
    grid-template-columns: minmax(0, 1fr) 320px;
  }

  .sidebar {
    display: flex;
  }

  .sidebar-card {
    padding: 22px 20px;
  }

  .title-card {
    padding: 22px 24px;
  }
}

@media (max-width: 980px) {
  .title-card {
    align-items: flex-start;
  }

  .sidebar {
    grid-template-columns: 1fr;
  }

  .related-table {
    min-width: 760px;
  }

  .card-body {
    overflow-x: auto;
  }
}
</style>
