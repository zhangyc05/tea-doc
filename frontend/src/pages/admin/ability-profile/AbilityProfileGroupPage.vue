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

const dimensionMeta: Record<string, { icon: string; tone: string }> = {
  教学能力: { icon: 'book', tone: 'blue' },
  教研能力: { icon: 'lab', tone: 'green' },
  实践能力: { icon: 'briefcase', tone: 'orange' },
  服务能力: { icon: 'heart', tone: 'purple' },
}

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

const directionTones = ['blue', 'green', 'orange', 'purple']

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

function getDimensionMeta(dimension: string) {
  return dimensionMeta[dimension] || { icon: 'book', tone: 'blue' }
}

function getDistributionTone(index: number) {
  return ['novice', 'competent', 'backbone', 'expert'][index] || 'novice'
}
</script>

<template>
  <AdminLayout active-key="ability-profile-group">
    <div class="ability-profile-group-page">
      <header class="page-intro">
        <div class="breadcrumb-line">
          <span>能力画像</span>
          <span class="slash">/</span>
          <strong>群体画像</strong>
        </div>
        <p>
          基于已发布执行版能力清单和正式档案事实，查看全校教师发展结构。用于发展支持、资源配置和下钻分析，不作为正式评价结论。
        </p>
      </header>

      <section class="top-grid">
        <article class="overview-card score-card">
          <div class="card-copy">
            <div class="section-heading">
              <h2>综合发展指数</h2>
              <span class="info-dot">i</span>
            </div>
            <div class="score-display">
              <strong>68</strong>
              <span>/ 100</span>
            </div>
            <p>
              由教学、教研、实践、服务四个维度的发展指数按权重汇总形成
            </p>
            <div class="status-line">
              <span class="check-dot">✓</span>
              <span>基本能力：</span>
              <strong>达标</strong>
            </div>
          </div>
          <div class="score-illustration" aria-hidden="true">
            <div class="folder-shape"></div>
            <div class="chart-shape">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </article>

        <article class="overview-card baseline-card">
          <div>
            <div class="section-heading">
              <h2>首年基线</h2>
              <span class="info-dot">i</span>
            </div>
            <p>当前为首个画像周期，暂无历史趋势对比。</p>
            <p>本周期结果将作为后续年度趋势分析的基线。</p>
          </div>
          <ol class="baseline-list">
            <li class="active">
              <strong>2026</strong>
              <span>基线已形成</span>
            </li>
            <li>
              <strong>2027</strong>
              <span>待形成</span>
            </li>
            <li>
              <strong>2028</strong>
              <span>待形成</span>
            </li>
          </ol>
        </article>
      </section>

      <section class="analysis-card">
        <div class="radar-panel">
          <div class="section-heading">
            <h2>能力结构分析</h2>
            <span class="info-dot">i</span>
          </div>
          <div class="radar-wrap">
            <SimpleRadarChart
              :scores="schoolRadarData"
              center-text="基本能力 达标"
              :size="270"
            />
          </div>
        </div>

        <div class="dimension-panel">
          <div class="section-heading table-title">
            <h2>能力维度说明</h2>
            <span>（点击维度名称可查看下钻）</span>
          </div>
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
                <td>
                  <div class="dimension-name" :class="getDimensionMeta(dim.dimension).tone">
                    <span class="dimension-icon">{{ getDimensionMeta(dim.dimension).icon === 'book' ? '▤' : getDimensionMeta(dim.dimension).icon === 'lab' ? '♙' : getDimensionMeta(dim.dimension).icon === 'briefcase' ? '▣' : '◆' }}</span>
                    <strong>{{ dim.dimension }}</strong>
                  </div>
                </td>
                <td class="index-cell">{{ dim.index }}</td>
                <td>{{ dim.composition }}</td>
                <td>
                  <div class="distribution-labels">
                    <span v-for="dist in dim.distribution" :key="dist.label">
                      {{ dist.label }} {{ dist.percentage }}%
                    </span>
                  </div>
                  <div class="distribution-track">
                    <span
                      v-for="(dist, index) in dim.distribution"
                      :key="dist.label"
                      :class="getDistributionTone(index)"
                      :style="{ width: `${dist.percentage}%` }"
                    ></span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="bottom-grid">
        <article class="support-card">
          <div class="section-heading">
            <h2>发展支持方向</h2>
            <span class="info-dot">i</span>
          </div>
          <p class="support-desc">
            基于能力结构与正式档案数据观察，识别当前阶段的重点发展方向。
          </p>
          <div class="directions-grid">
            <div
              v-for="(direction, index) in developmentDirections"
              :key="direction.title"
              class="direction-card"
              :class="directionTones[index]"
            >
              <span class="direction-icon">{{ index === 0 ? '▣' : index === 1 ? '▰' : index === 2 ? '●' : '▥' }}</span>
              <h3 class="direction-title">{{ direction.title }}</h3>
              <p class="direction-observation">{{ direction.observation }}</p>
              <div class="key-dimension">
                <span class="dimension-label">关键维度：</span>
                <span class="dimension-value">{{ direction.keyDimension }}</span>
              </div>
            </div>
          </div>
          <div class="direction-actions">
            <button class="btn-primary" @click="viewFullAdvice">查看完整建议 <span>→</span></button>
          </div>
        </article>

        <article class="focus-card">
          <div class="focus-head">
            <h2>重点关注对象</h2>
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
          </div>
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
          <button class="more-btn">查看更多对象 ↓</button>
        </article>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.ability-profile-group-page {
  display: flex;
  min-height: calc(100vh - var(--admin-topbar-height) - var(--admin-page-gutter-y) * 2);
  flex-direction: column;
  gap: clamp(12px, 0.9vw, 16px);
}

.page-intro {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.breadcrumb-line {
  display: flex;
  align-items: center;
  gap: 18px;
  color: var(--color-text-primary);
  font-size: clamp(18px, 1.15vw, 22px);
  font-weight: 950;
}

.breadcrumb-line strong {
  color: var(--color-primary);
}

.slash {
  color: var(--color-text-primary);
}

.page-intro p {
  margin: 0;
  color: var(--color-text-primary);
  font-size: clamp(13px, 0.78vw, 15px);
  font-weight: 700;
  line-height: 1.55;
}

.top-grid,
.bottom-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
  gap: clamp(14px, 1vw, 18px);
}

.overview-card,
.analysis-card,
.support-card,
.focus-card {
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  background: #fff;
  box-shadow: var(--shadow-card);
}

.overview-card {
  min-height: clamp(178px, 12vw, 210px);
  padding: clamp(20px, 1.35vw, 26px);
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: clamp(10px, 0.7vw, 14px);
}

.section-heading h2,
.focus-head h2 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: clamp(16px, 0.98vw, 19px);
  font-weight: 950;
  line-height: 1.25;
}

.info-dot {
  display: inline-flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  border: 1px solid #9bb3d9;
  border-radius: 50%;
  color: #6f83a6;
  font-size: 11px;
  font-weight: 900;
}

.score-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  overflow: hidden;
}

.score-display {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 8px 0 8px;
}

.score-display strong {
  color: var(--color-primary);
  font-size: clamp(42px, 2.8vw, 56px);
  font-weight: 950;
  line-height: 1;
}

.score-display span {
  color: var(--color-text-secondary);
  font-size: clamp(20px, 1.25vw, 24px);
  font-weight: 800;
}

.score-card p,
.baseline-card p {
  margin: 0 0 10px;
  color: var(--color-text-primary);
  font-size: clamp(13px, 0.78vw, 15px);
  font-weight: 700;
  line-height: 1.65;
}

.status-line {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-primary);
  font-size: 15px;
  font-weight: 900;
}

.status-line strong {
  border-radius: 5px;
  background: #e8fff2;
  color: #13a854;
  padding: 2px 8px;
}

.check-dot {
  display: inline-flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e8fff2;
  color: #13a854;
  font-size: 13px;
}

.score-illustration {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.score-illustration::before {
  position: absolute;
  width: 190px;
  height: 76px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(215, 231, 255, 0.75), rgba(239, 246, 255, 0));
  transform: translateY(40px);
  content: '';
}

.folder-shape {
  position: relative;
  width: 126px;
  height: 104px;
  border-radius: 16px;
  background: linear-gradient(145deg, #7fb0ff, #d9e8ff);
  box-shadow: 18px 16px 34px rgba(65, 122, 220, 0.18);
}

.folder-shape::before {
  position: absolute;
  left: 12px;
  top: -10px;
  width: 78px;
  height: 26px;
  border-radius: 10px 10px 0 0;
  background: #a8c9ff;
  content: '';
}

.chart-shape {
  position: absolute;
  display: flex;
  right: 48px;
  bottom: 42px;
  align-items: flex-end;
  gap: 7px;
}

.chart-shape span {
  display: block;
  width: 10px;
  border-radius: 5px 5px 0 0;
  background: #4d8eff;
}

.chart-shape span:nth-child(1) { height: 22px; }
.chart-shape span:nth-child(2) { height: 38px; }
.chart-shape span:nth-child(3) { height: 56px; }

.baseline-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(210px, 40%);
  gap: 22px;
}

.baseline-list {
  position: relative;
  display: grid;
  gap: 20px;
  margin: 16px 0 0;
  padding: 0 0 0 48px;
  list-style: none;
}

.baseline-list::before {
  position: absolute;
  left: 101px;
  top: 17px;
  bottom: 17px;
  width: 2px;
  background: #dbe5f4;
  content: '';
}

.baseline-list li {
  position: relative;
  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: center;
  gap: 28px;
}

.baseline-list li::before {
  position: absolute;
  left: 48px;
  width: 12px;
  height: 12px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #b9c7db;
  box-shadow: 0 0 0 2px #dbe5f4;
  content: '';
}

.baseline-list li.active::before {
  background: #16b569;
  box-shadow: 0 0 0 2px #bff2d4;
}

.baseline-list strong {
  color: var(--color-primary);
  font-size: 17px;
  font-weight: 950;
}

.baseline-list span {
  color: var(--color-text-primary);
  font-size: 15px;
  font-weight: 800;
}

.analysis-card {
  display: grid;
  grid-template-columns: minmax(330px, 31%) minmax(0, 1fr);
  gap: clamp(16px, 1.1vw, 22px);
  padding: clamp(16px, 1vw, 20px);
}

.radar-panel,
.dimension-panel {
  min-width: 0;
}

.radar-wrap {
  display: flex;
  justify-content: center;
  transform: translateY(-2px);
}

.table-title span {
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 800;
}

.dimension-table,
.focus-table {
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}

.dimension-table th,
.focus-table th {
  height: 42px;
  background: #f7faff;
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 950;
  text-align: left;
}

.dimension-table th,
.dimension-table td,
.focus-table th,
.focus-table td {
  border-right: 1px solid var(--color-card-border-soft);
  border-bottom: 1px solid var(--color-card-border-soft);
  padding: 9px 12px;
  vertical-align: middle;
}

.dimension-table th:last-child,
.dimension-table td:last-child,
.focus-table th:last-child,
.focus-table td:last-child {
  border-right: 0;
}

.dimension-table tr:last-child td,
.focus-table tr:last-child td {
  border-bottom: 0;
}

.dimension-table td,
.focus-table td {
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.5;
}

.dimension-table th:nth-child(1) { width: 18%; }
.dimension-table th:nth-child(2) { width: 12%; }
.dimension-table th:nth-child(3) { width: 32%; }
.dimension-table th:nth-child(4) { width: 38%; }

.dimension-name {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--color-primary);
}

.dimension-icon {
  display: inline-flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
}

.dimension-name.blue .dimension-icon { background: #0b63f6; }
.dimension-name.green .dimension-icon { background: #16b569; }
.dimension-name.orange .dimension-icon { background: #ff7a00; }
.dimension-name.purple .dimension-icon { background: #7657ff; }

.index-cell {
  color: var(--color-text-primary);
  font-size: 16px;
  font-weight: 950;
  text-align: center;
}

.distribution-labels {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  margin-bottom: 6px;
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
}

.distribution-track {
  display: flex;
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: #eef3fb;
  gap: 4px;
}

.distribution-track span {
  display: block;
  min-width: 10px;
  border-radius: 999px;
}

.novice { background: #9aa9c0; }
.competent { background: #3b82f6; }
.backbone { background: #18b76b; }
.expert { background: #ff7a00; }

.bottom-grid {
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1fr);
}

.support-card,
.focus-card {
  padding: clamp(16px, 1vw, 20px);
}

.support-desc {
  margin: -4px 0 14px;
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 700;
}

.directions-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.direction-card {
  min-height: 122px;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  padding: 14px 12px;
  text-align: center;
}

.direction-card.blue { background: #f1f7ff; }
.direction-card.green { background: #f0fff7; }
.direction-card.orange { background: #fff7ed; }
.direction-card.purple { background: #f6f3ff; }

.direction-icon {
  display: inline-flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  font-size: 15px;
  font-weight: 950;
}

.direction-card.green .direction-icon { background: #16b569; }
.direction-card.orange .direction-icon { background: #ff7a00; }
.direction-card.purple .direction-icon { background: #7657ff; }

.direction-title {
  margin: 8px 0 7px;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 950;
}

.direction-card.green .direction-title { color: #0c9552; }
.direction-card.orange .direction-title { color: #e15f00; }
.direction-card.purple .direction-title { color: #7657ff; }

.direction-observation,
.key-dimension {
  margin: 0;
  color: var(--color-text-primary);
  font-size: 11px;
  font-weight: 700;
  line-height: 1.5;
}

.key-dimension {
  margin-top: 6px;
}

.dimension-value {
  color: var(--color-primary);
}

.direction-actions {
  display: flex;
  justify-content: center;
  margin-top: 14px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 34px;
  border: 1px solid var(--color-primary);
  border-radius: 8px;
  background: #fff;
  color: var(--color-primary);
  padding: 0 18px;
  font-size: 13px;
  font-weight: 950;
}

.focus-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
}

.focus-tabs {
  display: flex;
  gap: 18px;
  border-bottom: 1px solid var(--color-card-border);
}

.tab-btn {
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--color-text-primary);
  padding: 0 6px 8px;
  font-size: 14px;
  font-weight: 900;
}

.tab-btn.active {
  border-bottom-color: var(--color-primary);
  color: var(--color-primary);
}

.focus-table th:nth-child(1) { width: 18%; }
.focus-table th:nth-child(2) { width: 16%; }
.focus-table th:nth-child(3) { width: 22%; }
.focus-table th:nth-child(4) { width: 31%; }
.focus-table th:nth-child(5) { width: 13%; }

.focus-type {
  display: inline-flex;
  align-items: center;
  border-radius: 5px;
  padding: 3px 8px;
  font-size: 12px;
  font-weight: 950;
  white-space: nowrap;
}

.focus-type.support {
  background: #fff1e6;
  color: #ff7a00;
}

.focus-type.advantage {
  background: #eafff2;
  color: #16a45a;
}

.focus-type.attention {
  background: #eef4ff;
  color: #375be8;
}

.btn-link {
  border: 0;
  background: transparent;
  color: var(--color-primary);
  padding: 0;
  font-size: 13px;
  font-weight: 950;
  white-space: nowrap;
}

.more-btn {
  display: block;
  margin: 11px auto 0;
  border: 0;
  background: transparent;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 950;
}

@media (max-width: 1440px) {
  .score-card {
    grid-template-columns: minmax(0, 1fr) 160px;
  }

  .score-illustration {
    transform: scale(0.82);
  }

  .analysis-card {
    grid-template-columns: minmax(280px, 31%) minmax(0, 1fr);
  }

  .directions-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .direction-card {
    min-height: 104px;
  }
}

@media (max-width: 1280px) {
  .top-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }

  .analysis-card {
    grid-template-columns: 1fr;
  }

  .radar-wrap {
    max-height: 250px;
    overflow: hidden;
  }
}
</style>
