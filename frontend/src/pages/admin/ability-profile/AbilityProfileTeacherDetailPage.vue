<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import SimpleRadarChart from './components/SimpleRadarChart.vue'

const router = useRouter()
const route = useRoute()

const teacherId = route.params.teacherId as string

const teacherInfo = ref({
  name: teacherId === 'chen' ? '陈老师' : '林老师',
  college: teacherId === 'chen' ? '电子信息学院' : '智能制造学院',
  title: teacherId === 'chen' ? '副教授' : '讲师',
  year: 2,
  period: '2026 年度',
  version: '2026 年度执行版能力清单',
  dataBasis: '正式档案事实',
  updateTime: '2026-06-19',
})

const developmentIndex = ref({
  score: teacherId === 'chen' ? 72 : 76,
  total: 100,
  teacherType: teacherId === 'chen' ? '教研成长型' : '教学实践型',
  abilityStage: '骨干教师',
  basicAbility: '达标',
  typeBasis: '教学能力较突出 | 实践能力较突出 | 教研、服务保持稳定',
})

const baselineData = ref([
  { year: 2026, status: '基线已形成' },
  { year: 2027, status: '待形成' },
  { year: 2028, status: '待形成' },
])

const radarData = ref([
  { label: '教学能力', value: 88 },
  { label: '教研能力', value: 68 },
  { label: '实践能力', value: 79 },
  { label: '服务能力', value: 72 },
])

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
  router.push('/admin/ability-profile/teacher')
}
</script>

<template>
  <AdminLayout active-key="ability-profile-teacher">
    <div class="teacher-detail-page">
      <div class="detail-toolbar">
        <div class="breadcrumb">
          <span>能力画像</span>
          <span class="slash">/</span>
          <RouterLink to="/admin/ability-profile/teacher">教师画像</RouterLink>
          <span class="slash">/</span>
          <span class="current">{{ teacherInfo.name }}</span>
        </div>
        <button type="button" class="back-button" @click="goBack">‹ 返回教师画像列表</button>
      </div>

      <section class="teacher-hero-card">
        <div class="teacher-main">
          <div class="portrait">
            <span class="hair"></span>
            <span class="face"></span>
            <span class="body"></span>
          </div>
          <div>
            <div class="teacher-label">当前教师：</div>
            <h1>{{ teacherInfo.name }}</h1>
            <p>{{ teacherInfo.college }} <span>|</span> {{ teacherInfo.title }} <span>|</span> 聘期第 {{ teacherInfo.year }} 年</p>
          </div>
        </div>

        <div class="hero-meta">
          <div>
            <span>分析周期：</span>
            <strong>{{ teacherInfo.period }}</strong>
          </div>
          <div>
            <span>画像口径：</span>
            <strong>{{ teacherInfo.version }}</strong>
          </div>
          <div>
            <span>数据依据：</span>
            <strong>{{ teacherInfo.dataBasis }}</strong>
          </div>
          <div>
            <span>更新时间：</span>
            <strong>{{ teacherInfo.updateTime }}</strong>
          </div>
        </div>

        <button type="button" class="switch-button" @click="switchTeacher">↔ 切换教师</button>
      </section>

      <section class="summary-grid">
        <article class="panel index-panel">
          <h2>综合发展指数</h2>
          <div class="index-content">
            <div class="trend-icon">↗</div>
            <div class="index-copy">
              <div class="score-line">
                <strong>{{ developmentIndex.score }}</strong>
                <span>/ {{ developmentIndex.total }}</span>
              </div>
              <dl>
                <div>
                  <dt>教师类型：</dt>
                  <dd><span class="blue-pill">{{ developmentIndex.teacherType }}</span></dd>
                </div>
                <div>
                  <dt>能力阶段参考：</dt>
                  <dd>{{ developmentIndex.abilityStage }}</dd>
                </div>
                <div>
                  <dt>基本能力：</dt>
                  <dd><span class="green-pill">{{ developmentIndex.basicAbility }}</span></dd>
                </div>
                <div>
                  <dt>类型依据：</dt>
                  <dd>{{ developmentIndex.typeBasis }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </article>

        <article class="panel baseline-panel">
          <h2>首年基线</h2>
          <div class="baseline-layout">
            <div class="baseline-note">
              <p>当前为首个画像周期，暂无历史趋势对比。</p>
              <p>本周期结果将作为后续趋势分析基线。</p>
            </div>
            <div class="timeline">
              <div v-for="(item, index) in baselineData" :key="item.year" class="timeline-item" :class="{ done: index === 0 }">
                <span class="dot"></span>
                <strong>{{ item.year }}</strong>
                <span>{{ item.status }}</span>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section class="panel structure-panel">
        <div class="radar-column">
          <h2>能力结构分析</h2>
          <SimpleRadarChart :scores="radarData" center-text="教师原型 达标" :size="270" />
        </div>

        <div class="dimension-column">
          <h2>能力维度说明</h2>
          <table>
            <thead>
              <tr>
                <th>维度</th>
                <th>发展指数</th>
                <th>指数构成</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dim in abilityDimensions" :key="dim.dimension">
                <td class="dimension-name">{{ dim.dimension }}</td>
                <td class="number-cell">{{ dim.index }}</td>
                <td>{{ dim.composition }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel support-panel">
        <h2>支持方向</h2>
        <table>
          <thead>
            <tr>
              <th>对应发展特征</th>
              <th>支持方向</th>
              <th>支持重点</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in supportDirections" :key="item.feature">
              <td>{{ item.feature }}</td>
              <td>{{ item.direction }}</td>
              <td>{{ item.focus }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.teacher-detail-page {
  min-height: 100vh;
  padding: 0 0 24px;
  background: var(--color-page-bg, #f5f7fb);
  color: #14213d;
}

.detail-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 50px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #7d8aa0;
  font-size: 14px;
}

.breadcrumb a {
  color: #41516a;
  text-decoration: none;
}

.breadcrumb .current {
  color: #1d2b45;
  font-weight: 700;
}

.slash {
  color: #c1cad8;
}

.back-button,
.switch-button {
  height: 36px;
  padding: 0 14px;
  border: 1px solid #d8e2f0;
  border-radius: 8px;
  background: #ffffff;
  color: #1677ff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}

.teacher-hero-card,
.panel {
  border: 1px solid #e1e8f2;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 8px 22px rgba(32, 56, 96, 0.035);
}

.teacher-hero-card {
  display: grid;
  grid-template-columns: minmax(350px, 1.05fr) minmax(540px, 2.2fr) auto;
  align-items: center;
  gap: 26px;
  min-height: 112px;
  padding: 18px 20px;
}

.teacher-main {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.portrait {
  position: relative;
  width: 72px;
  height: 72px;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 50%;
  background: #eaf3ff;
}

.hair,
.face,
.body {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.hair {
  top: 13px;
  width: 39px;
  height: 29px;
  border-radius: 20px 20px 12px 12px;
  background: #243149;
}

.face {
  top: 25px;
  width: 31px;
  height: 31px;
  border-radius: 50%;
  background: #ffd8b4;
}

.body {
  bottom: -5px;
  width: 54px;
  height: 31px;
  border-radius: 20px 20px 0 0;
  background: #2f80ed;
}

.teacher-label {
  color: #516179;
  font-size: 14px;
  font-weight: 600;
}

.teacher-main h1 {
  display: inline;
  margin: 0 0 8px;
  color: #10213d;
  font-size: 18px;
  font-weight: 800;
}

.teacher-main p {
  margin: 8px 0 0;
  color: #53637b;
  font-size: 14px;
}

.teacher-main p span {
  margin: 0 10px;
  color: #bac4d3;
}

.hero-meta {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  border-left: 1px solid #e5ecf5;
}

.hero-meta div {
  min-height: 56px;
  padding: 4px 20px;
  border-right: 1px solid #e5ecf5;
}

.hero-meta span {
  display: block;
  margin-bottom: 10px;
  color: #69778d;
  font-size: 13px;
  font-weight: 600;
}

.hero-meta strong {
  color: #14213d;
  font-size: 14px;
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}

.panel {
  padding: 18px 20px;
}

.panel h2 {
  margin: 0 0 14px;
  color: #12203b;
  font-size: 18px;
  font-weight: 800;
}

.index-content {
  display: grid;
  grid-template-columns: 128px 1fr;
  align-items: center;
  gap: 18px;
  min-height: 150px;
}

.trend-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 82px;
  height: 82px;
  margin: 0 auto;
  border-radius: 50%;
  background: #e6f8ef;
  color: #18a058;
  font-size: 44px;
  font-weight: 700;
}

.score-line {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 10px;
}

.score-line strong {
  color: #111b3a;
  font-size: 42px;
  line-height: 1;
}

.score-line span {
  color: #17213b;
  font-size: 20px;
  font-weight: 700;
}

dl {
  display: grid;
  gap: 9px;
  margin: 0;
}

dl div {
  display: grid;
  grid-template-columns: 96px 1fr;
  align-items: center;
  gap: 8px;
}

dt,
dd {
  margin: 0;
  font-size: 13px;
}

dt {
  color: #66758c;
}

dd {
  color: #1d2b45;
  font-weight: 600;
}

.blue-pill,
.green-pill {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  border-radius: 6px;
  font-size: 12px;
}

.blue-pill {
  background: #e8f2ff;
  color: #1677ff;
}

.green-pill {
  background: #e8f8ef;
  color: #16a05d;
}

.baseline-layout {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) minmax(180px, 0.7fr);
  gap: 24px;
  min-height: 150px;
}

.baseline-note {
  display: grid;
  gap: 12px;
  align-content: start;
  padding-left: 4px;
}

.baseline-note p {
  position: relative;
  margin: 0;
  padding-left: 24px;
  color: #42516b;
  font-size: 14px;
  line-height: 1.65;
}

.baseline-note p::before {
  position: absolute;
  top: 9px;
  left: 2px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #1677ff;
  content: '';
}

.timeline {
  position: relative;
  display: grid;
  gap: 12px;
  padding-left: 16px;
}

.timeline::before {
  position: absolute;
  top: 12px;
  bottom: 12px;
  left: 21px;
  width: 1px;
  background: #d7e0ec;
  content: '';
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 18px 54px 1fr;
  align-items: center;
  gap: 10px;
  color: #53637b;
  font-size: 14px;
}

.timeline-item .dot {
  width: 11px;
  height: 11px;
  border: 2px solid #c6d0de;
  border-radius: 50%;
  background: #ffffff;
  z-index: 1;
}

.timeline-item.done .dot {
  border-color: #18a058;
  background: #18a058;
}

.timeline-item strong {
  color: #14213d;
}

.structure-panel {
  display: grid;
  grid-template-columns: minmax(360px, 0.75fr) minmax(520px, 1.25fr);
  gap: 26px;
  margin-top: 16px;
}

.radar-column {
  padding-right: 20px;
  border-right: 1px solid #e6edf6;
}

.radar-column :deep(.radar-chart-container) {
  gap: 8px;
}

.radar-column :deep(.radar-legend) {
  justify-content: flex-start;
  gap: 10px 18px;
  margin-top: -6px;
}

.dimension-column {
  min-width: 0;
}

table {
  width: 100%;
  overflow: hidden;
  border: 1px solid #dde6f1;
  border-radius: 8px;
  border-collapse: separate;
  border-spacing: 0;
}

th,
td {
  height: 40px;
  padding: 0 18px;
  border-right: 1px solid #dde6f1;
  border-bottom: 1px solid #dde6f1;
  color: #25334d;
  font-size: 14px;
  line-height: 1.45;
}

th {
  background: #f8fbff;
  color: #10213d;
  font-weight: 800;
}

tr:last-child td {
  border-bottom: 0;
}

th:last-child,
td:last-child {
  border-right: 0;
}

.dimension-name,
.number-cell {
  color: #1677ff;
  font-weight: 800;
}

.number-cell {
  text-align: center;
  color: #14213d;
}

.support-panel {
  margin-top: 16px;
}

.support-panel th:nth-child(1) {
  width: 19%;
}

.support-panel th:nth-child(2) {
  width: 22%;
}

@media (max-width: 1500px) {
  .teacher-hero-card {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .hero-meta {
    border-left: 0;
  }

  .switch-button {
    justify-self: start;
  }
}

@media (max-width: 1280px) {
  .structure-panel {
    grid-template-columns: 1fr;
  }

  .radar-column {
    padding-right: 0;
    border-right: 0;
  }

  .hero-meta {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1100px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
