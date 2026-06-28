<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import SimpleRadarChart from './components/SimpleRadarChart.vue'

const router = useRouter()
const route = useRoute()

// 从路由参数获取教师ID
const teacherId = route.params.teacherId as string

// 教师信息
const teacherInfo = ref({
  name: '林老师',
  college: '智能制造学院',
  title: '讲师',
  year: 2,
  period: '2026年度',
  version: '2026年度执行版能力清单',
  dataBasis: '正式档案事实',
  updateTime: '2026-06-19',
})

// 综合发展指数
const developmentIndex = ref({
  score: 76,
  total: 100,
  teacherType: '教学实践型',
  abilityStage: '骨干教师',
  basicAbility: '达标',
  typeBasis: '教学能力较突出 | 实践能力较突出 | 教研、服务保持稳定',
})

// 首年基线数据
const baselineData = ref([
  { year: 2026, status: '已形成' },
  { year: 2027, status: '待形成' },
  { year: 2028, status: '待形成' },
])

// 雷达图数据
const radarData = ref([
  { label: '教学能力', value: 88 },
  { label: '教研能力', value: 68 },
  { label: '实践能力', value: 79 },
  { label: '服务能力', value: 72 },
])

// 能力维度说明
const abilityDimensions = ref([
  {
    dimension: '教学能力',
    index: 88,
    composition: '课程建设、课堂教学、教学评价、教学改进等',
  },
  {
    dimension: '教研能力',
    index: 68,
    composition: '课题研究、专业建设、课程改革、成果培育等',
  },
  {
    dimension: '实践能力',
    index: 79,
    composition: '企业实践、产教融合、校企合作、成果转化等',
  },
  {
    dimension: '服务能力',
    index: 72,
    composition: '社会服务、学生支持、团队协作、重点任务等',
  },
])

// 支持方向
const supportDirections = ref([
  {
    feature: '课程建设基础较好',
    direction: '课程建设经验沉淀',
    focus: '适合沉淀课程建设、教学评价、教学改进相关经验',
  },
  {
    feature: '实践转化具备基础',
    direction: '实践成果转化支持',
    focus: '关注企业实践成果、校企合作成果的转化表达与应用材料沉淀',
  },
  {
    feature: '教研成果持续积累',
    direction: '教研成果继续培育',
    focus: '适合围绕课题共研、成果培育、教研协作继续支持',
  },
  {
    feature: '服务贡献继续观察',
    direction: '服务贡献持续观察',
    focus: '继续观察社会服务、学生支持、重点任务贡献的稳定性',
  },
])

function goBack() {
  router.push('/admin/ability-profile/teacher')
}

function switchTeacher() {
  console.log('切换教师')
}
</script>

<template>
  <AdminLayout active-key="ability-profile-teacher">
    <div class="teacher-detail-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb-row">
            <div class="breadcrumb">
              <span>能力画像</span>
              <i class="separator">/</i>
              <span>
                <RouterLink to="/admin/ability-profile/teacher">教师画像</RouterLink>
              </span>
              <i class="separator">/</i>
              <span class="current">{{ teacherInfo.name }}</span>
            </div>
            <button class="btn-back" @click="goBack">
              返回教师画像列表
            </button>
          </div>

          <!-- 教师信息条 -->
          <div class="teacher-info-bar">
            <div class="info-row">
              <div class="info-item">
                <span class="info-label">当前教师：</span>
                <span class="info-value">{{ teacherInfo.name }}</span>
              </div>
              <div class="info-item">
                <span class="info-value">{{ teacherInfo.college }}</span>
                <span class="info-divider">|</span>
                <span class="info-value">{{ teacherInfo.title }}</span>
                <span class="info-divider">|</span>
                <span class="info-value">聘期第{{ teacherInfo.year }}年</span>
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <span class="info-label">分析周期：</span>
                <span class="info-value">{{ teacherInfo.period }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">画像口径：</span>
                <span class="info-value">{{ teacherInfo.version }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">数据依据：</span>
                <span class="info-value">{{ teacherInfo.dataBasis }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">更新时间：</span>
                <span class="info-value">{{ teacherInfo.updateTime }}</span>
              </div>
              <button class="btn-switch" @click="switchTeacher">
                切换教师
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 主要内容区域 -->
      <section class="main-content">
        <div class="content-wrapper">
          <!-- 顶部卡片区域 -->
          <div class="top-cards-section">
            <!-- 左侧综合发展指数 -->
            <div class="card index-card">
              <h2 class="card-title">综合发展指数</h2>
              <div class="index-display">
                <div class="index-number">{{ developmentIndex.score }}</div>
                <div class="index-divider">/</div>
                <div class="index-total">{{ developmentIndex.total }}</div>
              </div>
              <div class="index-details">
                <div class="detail-item">
                  <span class="detail-label">教师类型：</span>
                  <span class="detail-value">{{ developmentIndex.teacherType }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">能力阶段参考：</span>
                  <span class="detail-value">{{ developmentIndex.abilityStage }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">基本能力：</span>
                  <span class="detail-value status">{{ developmentIndex.basicAbility }}</span>
                </div>
              </div>
              <div class="type-basis">
                <span class="basis-label">类型依据：</span>
                <span class="basis-value">{{ developmentIndex.typeBasis }}</span>
              </div>
            </div>

            <!-- 右侧首年基线 -->
            <div class="card baseline-card">
              <h2 class="card-title">首年基线</h2>
              <p class="card-description">
                当前为首个画像周期，暂无历史趋势对比。
              </p>
              <p class="card-description">
                本周期结果将作为后续趋势分析基线。
              </p>
              <div class="timeline-display">
                <div
                  v-for="item in baselineData"
                  :key="item.year"
                  class="timeline-item"
                >
                  <div class="timeline-year">{{ item.year }}</div>
                  <div class="timeline-status">{{ item.status }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 能力结构分析 -->
          <div class="analysis-section">
            <div class="section-cards">
              <!-- 左侧雷达图 -->
              <div class="card radar-card">
                <h2 class="card-title">能力结构分析</h2>
                <div class="radar-wrapper">
                  <SimpleRadarChart
                    :scores="radarData"
                    center-text="教学原型 达标"
                    :size="300"
                  />
                </div>
                <div class="radar-scores">
                  <div
                    v-for="score in radarData"
                    :key="score.label"
                    class="score-item"
                  >
                    <span class="score-label">{{ score.label }}</span>
                    <span class="score-value">{{ score.value }}</span>
                  </div>
                </div>
              </div>

              <!-- 右侧能力维度说明 -->
              <div class="card dimension-card">
                <h2 class="card-title">能力维度说明</h2>
                <table class="dimension-table">
                  <thead>
                    <tr>
                      <th>维度</th>
                      <th>发展指数</th>
                      <th>指数构成</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="dim in abilityDimensions" :key="dim.dimension">
                      <td>{{ dim.dimension }}</td>
                      <td class="index-cell">{{ dim.index }}</td>
                      <td>{{ dim.composition }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 支持方向 -->
          <div class="support-section">
            <div class="card support-card">
              <h2 class="card-title">支持方向</h2>
              <table class="support-table">
                <thead>
                  <tr>
                    <th>对应发展特征</th>
                    <th>支持方向</th>
                    <th>支持重点</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in supportDirections" :key="index">
                    <td>{{ item.feature }}</td>
                    <td>{{ item.direction }}</td>
                    <td>{{ item.focus }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.teacher-detail-page {
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

/* 教师信息条 */
.teacher-info-bar {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
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

.btn-switch {
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-switch:hover {
  background: #28a38a;
}

/* 主要内容区域 */
.main-content {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 顶部卡片区域 */
.top-cards-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 24px;
}

.card-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

/* 综合发展指数卡片 */
.index-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin: 24px 0;
}

.index-number {
  font-size: 48px;
  font-weight: 700;
  color: var(--color-primary);
}

.index-divider {
  font-size: 32px;
  color: var(--color-text-hint);
  margin: 0 4px;
}

.index-total {
  font-size: 24px;
  color: var(--color-text-hint);
}

.index-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.detail-item {
  display: flex;
  gap: 8px;
  font-size: 13px;
}

.detail-label {
  color: var(--color-text-hint);
}

.detail-value {
  color: var(--color-text-primary);
  font-weight: 500;
}

.detail-value.status {
  color: var(--color-primary);
  font-weight: 600;
}

.type-basis {
  padding-top: 12px;
  border-top: 1px solid var(--color-card-border);
  font-size: 13px;
  display: flex;
  gap: 8px;
  line-height: 1.5;
}

.basis-label {
  color: var(--color-text-hint);
  flex-shrink: 0;
}

.basis-value {
  color: var(--color-text-secondary);
}

/* 首年基线卡片 */
.card-description {
  margin: 0 0 12px 0;
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.timeline-display {
  display: flex;
  gap: 32px;
  margin-top: 16px;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.timeline-year {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.timeline-status {
  font-size: 12px;
  color: var(--color-text-hint);
}

/* 能力结构分析 */
.analysis-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.radar-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.radar-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.radar-scores {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
}

.score-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f8fafc;
  border-radius: 6px;
  align-items: center;
}

.score-label {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.score-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}

/* 能力维度说明表 */
.dimension-card {
  overflow: hidden;
}

.dimension-table {
  width: 100%;
  border-collapse: collapse;
}

.dimension-table th {
  padding: 12px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.dimension-table td {
  padding: 12px;
  font-size: 12px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.dimension-table tr:last-child td {
  border-bottom: none;
}

.index-cell {
  font-weight: 600;
  color: var(--color-primary);
}

/* 支持方向 */
.support-section {
  display: flex;
  flex-direction: column;
}

.support-card {
  overflow: hidden;
}

.support-table {
  width: 100%;
  border-collapse: collapse;
}

.support-table th {
  padding: 12px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.support-table td {
  padding: 12px;
  font-size: 12px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
  line-height: 1.5;
}

.support-table tr:last-child td {
  border-bottom: none;
}

@media (max-width: 1024px) {
  .top-cards-section {
    grid-template-columns: 1fr;
  }

  .section-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .info-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-switch {
    width: 100%;
  }
}
</style>