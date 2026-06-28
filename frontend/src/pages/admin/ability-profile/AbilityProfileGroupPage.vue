<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import SimpleRadarChart from './components/SimpleRadarChart.vue'

const router = useRouter()

// 雷达图数据
const schoolRadarData = [
  { label: '教学能力', value: 72 },
  { label: '教研能力', value: 61 },
  { label: '实践能力', value: 54 },
  { label: '服务能力', value: 49 },
]

// 能力维度数据
const abilityDimensions = [
  {
    dimension: '教学能力',
    index: 72,
    composition: '课程建设、课堂教学、教学评价、教学改革、数字化教学等',
    distribution: [
      { label: '新手', percentage: 12 },
      { label: '胜任', percentage: 38 },
      { label: '骨干', percentage: 36 },
      { label: '名师', percentage: 14 },
    ],
  },
  {
    dimension: '教研能力',
    index: 61,
    composition: '课题研究、专业建设、课程改革、教学成果培育等',
    distribution: [
      { label: '新手', percentage: 18 },
      { label: '胜任', percentage: 42 },
      { label: '骨干', percentage: 28 },
      { label: '名师', percentage: 12 },
    ],
  },
  {
    dimension: '实践能力',
    index: 54,
    composition: '企业实践、产教融合、真实项目转化、实践基地建设等',
    distribution: [
      { label: '新手', percentage: 22 },
      { label: '胜任', percentage: 44 },
      { label: '骨干', percentage: 24 },
      { label: '名师', percentage: 10 },
    ],
  },
  {
    dimension: '服务能力',
    index: 49,
    composition: '社会服务、学生发展支持、团队协作、学校重点任务等',
    distribution: [
      { label: '新手', percentage: 25 },
      { label: '胜任', percentage: 46 },
      { label: '骨干', percentage: 20 },
      { label: '名师', percentage: 9 },
    ],
  },
]

// 发展支持方向
const developmentDirections = [
  {
    title: '课程建设经验扩散',
    observation: '观察：教学能力指数较高，课程建设和服务分布不均。',
    keyDimension: '教学能力',
  },
  {
    title: '企业实践专项支持',
    observation: '观察：实践能力下的成果转化要素相对较低。',
    keyDimension: '实践能力',
  },
  {
    title: '教研共研带动',
    observation: '观察：教研能力整体偏中游，骨干教师占比偏低。',
    keyDimension: '教研能力',
  },
  {
    title: '服务记录口径统一',
    observation: '观察：服务记录缺口较多，口径不一致。',
    keyDimension: '服务能力',
  },
]

// 重点关注对象数据
const focusObjects = ref('院系')

const focusTabs = [
  { label: '院系', value: '院系' },
  { label: '专业', value: '专业' },
  { label: '教师', value: '教师' },
]

const focusData: Record<string, Array<{ name: string; type: string; dimension: string; reason: string }>> = {
  院系: [
    {
      name: '智能制造学院',
      type: '重点支持',
      dimension: '实践 / 成果转化',
      reason: '成果转化材料不足，转化证明偏少',
    },
    {
      name: '汽车工程学院',
      type: '重点支持',
      dimension: '实践 / 企业实践',
      reason: '企业实践记录不足，实践时间偏少',
    },
    {
      name: '信息工程学院',
      type: '优势巩固',
      dimension: '教研 / 课题研究',
      reason: '教研成果丰富，可示范带动',
    },
    {
      name: '商贸管理学院',
      type: '需关注',
      dimension: '服务 / 社会服务',
      reason: '服务记录口径不一致，数据质量待提升',
    },
  ],
  专业: [
    {
      name: '机电工程专业',
      type: '重点支持',
      dimension: '实践 / 成果转化',
      reason: '成果转化材料不足，转化证明偏少',
    },
  ],
  教师: [
    {
      name: '林老师',
      type: '重点支持',
      dimension: '教学 / 实践',
      reason: '教学能力较突出，实践成果需要培育',
    },
  ],
}

function switchTab(tabValue: string) {
  focusObjects.value = tabValue
}

function viewFullAdvice() {
  console.log('查看完整建议')
}

function viewProfile(name: string) {
  console.log('查看画像', name)
}
</script>

<template>
  <AdminLayout active-key="ability-profile-group">
    <div class="ability-profile-group-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span>能力画像</span>
            <i class="separator">/</i>
            <span class="current">群体画像</span>
          </div>
          <h1 class="page-title">学校画像</h1>
          <p class="page-description">
            基于已发布执行版能力清单和正式档案事实，查看全校教师发展结构。用于发展支持、资源配置和下钻分析，不作为正式评价结论。
          </p>
        </div>
      </section>

      <!-- 顶部主卡区域 -->
      <section class="main-cards-section">
        <div class="cards-container">
          <!-- 左侧综合发展指数卡 -->
          <div class="main-card score-card">
            <h2 class="card-title">综合发展指数</h2>
            <div class="score-display">
              <div class="score-number">68</div>
              <div class="score-divider">/</div>
              <div class="score-total">100</div>
            </div>
            <p class="score-description">
              由教学、教研、实践、服务四个维度的发展指数按权重汇总形成
            </p>
            <div class="score-status">
              <span class="status-label">基本能力：</span>
              <span class="status-value">达标</span>
            </div>
          </div>

          <!-- 右侧首年基线卡 -->
          <div class="main-card baseline-card">
            <h2 class="card-title">首年基线</h2>
            <p class="card-description">
              当前为首个画像周期，暂无历史趋势对比。
            </p>
            <p class="card-description">
              本周期结果将作为后续年度趋势分析的基线。
            </p>
            <div class="timeline-display">
              <div class="timeline-item">
                <div class="timeline-year">2026</div>
                <div class="timeline-status">已形成</div>
              </div>
              <div class="timeline-item">
                <div class="timeline-year">2027</div>
                <div class="timeline-status">待形成</div>
              </div>
              <div class="timeline-item">
                <div class="timeline-year">2028</div>
                <div class="timeline-status">待形成</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 能力结构分析区 -->
      <section class="analysis-section">
        <div class="analysis-content">
          <!-- 左侧雷达图 -->
          <div class="radar-chart-area">
            <h2 class="section-title">能力结构分析</h2>
            <div class="radar-chart-wrapper">
              <SimpleRadarChart
                :scores="schoolRadarData"
                center-text="基本能力 达标"
                :size="280"
              />
            </div>
            <div class="radar-scores">
              <div class="score-item">
                <span class="score-label">教学能力</span>
                <span class="score-value">72</span>
              </div>
              <div class="score-item">
                <span class="score-label">教研能力</span>
                <span class="score-value">61</span>
              </div>
              <div class="score-item">
                <span class="score-label">实践能力</span>
                <span class="score-value">54</span>
              </div>
              <div class="score-item">
                <span class="score-label">服务能力</span>
                <span class="score-value">49</span>
              </div>
            </div>
          </div>

          <!-- 右侧能力维度说明表 -->
          <div class="dimension-table-area">
            <h2 class="section-title">能力维度说明</h2>
            <table class="dimension-table">
              <thead>
                <tr>
                  <th>维度</th>
                  <th>发展指数</th>
                  <th>指数构成（能力要素）</th>
                  <th>全校教师分布</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dim in abilityDimensions" :key="dim.dimension">
                  <td>{{ dim.dimension }}</td>
                  <td class="index-cell">{{ dim.index }}</td>
                  <td>{{ dim.composition }}</td>
                  <td class="distribution-cell">
                    <div class="distribution-bars">
                      <span
                        v-for="(dist, index) in dim.distribution"
                        :key="index"
                        class="distribution-item"
                      >
                        {{ dist.label }} {{ dist.percentage }}%
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 发展支持方向 -->
      <section class="directions-section">
        <div class="section-content">
          <h2 class="section-title">发展支持方向</h2>
          <p class="section-description">
            基于能力结构与正式档案数据观察，识别当前阶段的重点发展方向。
          </p>
          <div class="directions-grid">
            <div
              v-for="direction in developmentDirections"
              :key="direction.title"
              class="direction-card"
            >
              <h3 class="direction-title">{{ direction.title }}</h3>
              <p class="direction-observation">{{ direction.observation }}</p>
              <div class="key-dimension">
                <span class="dimension-label">关键维度：</span>
                <span class="dimension-value">{{ direction.keyDimension }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="direction-actions">
          <button class="btn-primary" @click="viewFullAdvice">查看完整建议</button>
        </div>
      </section>

      <!-- 重点关注对象 -->
      <section class="focus-section">
        <div class="focus-content">
          <h2 class="section-title">重点关注对象</h2>

          <!-- Tab 切换 -->
          <div class="focus-tabs">
            <button
              v-for="tab in focusTabs"
              :key="tab.value"
              class="tab-btn"
              :class="{ active: focusObjects === tab.value }"
              @click="switchTab(tab.value)"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- 表格内容 -->
          <table class="focus-table">
            <thead>
              <tr>
                <th>对象</th>
                <th>关注类型</th>
                <th>关联维度 / 要素</th>
                <th>为什么关注</th>
                <th>下一步</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in focusData[focusObjects]" :key="item.name">
                <td>{{ item.name }}</td>
                <td>
                  <span
                    class="focus-type"
                    :class="{
                      'support': item.type === '重点支持',
                      'advantage': item.type === '优势巩固',
                      'attention': item.type === '需关注',
                    }"
                  >
                    {{ item.type }}
                  </span>
                </td>
                <td>{{ item.dimension }}</td>
                <td>{{ item.reason }}</td>
                <td>
                  <button class="btn-link" @click="viewProfile(item.name)">查看画像</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.ability-profile-group-page {
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

.page-title {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.page-description {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

/* 主卡区域 */
.main-cards-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.cards-container {
  display: flex;
  gap: 20px;
}

.main-card {
  flex: 1;
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 24px;
}

.score-card .card-title {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.score-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin: 24px 0;
}

.score-number {
  font-size: 48px;
  font-weight: 700;
  color: var(--color-primary);
}

.score-divider {
  font-size: 32px;
  color: var(--color-text-hint);
  margin: 0 4px;
}

.score-total {
  font-size: 24px;
  color: var(--color-text-hint);
}

.score-description {
  margin: 16px 0 12px 0;
  font-size: 14px;
  color: var(--color-text-secondary);
  text-align: center;
}

.score-status {
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-primary);
}

.status-label {
  color: var(--color-text-secondary);
}

.status-value {
  font-weight: 600;
  color: var(--color-primary);
}

.baseline-card .card-title {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.card-description {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.timeline-display {
  display: flex;
  gap: 24px;
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

/* 能力结构分析区 */
.analysis-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 24px;
}

.analysis-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.radar-chart-area {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 24px;
}

.section-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.radar-chart-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.radar-scores {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.score-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f8fafc;
  border-radius: 6px;
}

.score-label {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.score-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}

.dimension-table-area {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 24px;
}

.dimension-table {
  width: 100%;
  border-collapse: collapse;
}

.dimension-table th {
  padding: 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.dimension-table td {
  padding: 12px;
  font-size: 13px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.index-cell {
  font-weight: 600;
  color: var(--color-primary);
}

.distribution-cell {
  padding: 4px 0;
}

.distribution-bars {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.distribution-item {
  padding: 4px 8px;
  background: #f0f9ff;
  color: var(--color-primary);
  border-radius: 4px;
  font-size: 11px;
}

/* 发展支持方向 */
.directions-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 24px;
}

.section-content {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 24px;
  margin-bottom: 16px;
}

.section-description {
  margin: 0 0 20px 0;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.directions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.direction-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  border-left: 3px solid var(--color-primary);
}

.direction-title {
  margin: 0 0 8px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.direction-observation {
  margin: 0 0 8px 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-secondary);
}

.key-dimension {
  font-size: 12px;
  color: var(--color-text-hint);
}

.dimension-value {
  color: var(--color-primary);
  font-weight: 500;
}

.direction-actions {
  display: flex;
  justify-content: center;
  padding: 16px 0 0;
}

/* 重点关注对象 */
.focus-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 32px;
}

.focus-content {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 24px;
}

.focus-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--color-card-border);
}

.tab-btn {
  padding: 10px 16px;
  background: transparent;
  border: none;
  border-radius: 6px 6px 0 0;
  font-size: 14px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.16s ease;
  border-bottom: 2px solid transparent;
}

.tab-btn:hover {
  color: var(--color-primary);
}

.tab-btn.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.focus-table {
  width: 100%;
  border-collapse: collapse;
}

.focus-table th {
  padding: 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.focus-table td {
  padding: 12px;
  font-size: 13px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.focus-type {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.focus-type.support {
  background: #f0fdf4;
  color: #22c55e;
}

.focus-type.advantage {
  background: #f0f9ff;
  color: var(--color-primary);
}

.focus-type.attention {
  background: #fffbeb;
  color: #f59e0b;
}

.btn-link {
  padding: 6px 12px;
  background: transparent;
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  color: var(--color-primary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-link:hover {
  background: var(--color-primary);
  color: white;
}

.btn-primary {
  padding: 10px 20px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-primary:hover {
  background: #28a38a;
}

@media (max-width: 768px) {
  .main-cards-section {
    grid-template-columns: 1fr;
  }

  .analysis-content {
    grid-template-columns: 1fr;
  }

  .directions-grid {
    grid-template-columns: 1fr;
  }
}
</style>