<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import SimpleRadarChart from './components/SimpleRadarChart.vue'
import { calculateTeacherAbilityProfile, getAbilityProfileTeacherDetailMock } from '@/services/mock/ability-profile'
import { getAbilityListState } from '@/stores/admin/abilityListStore'
import { getTeacherArchiveFacts } from '@/stores/admin/archiveStore'

const router = useRouter()
const route = useRoute()

const teacherId = route.params.teacherId as string
const teacherDetailMock = getAbilityProfileTeacherDetailMock(teacherId)
const abilityListState = getAbilityListState()
const currentExecutionVersionTitle = abilityListState.executionVersion.title
const teacherDetailProfile = calculateTeacherAbilityProfile(
  teacherDetailMock.teacherInfo.name,
  getTeacherArchiveFacts(teacherDetailMock.teacherInfo.name),
  abilityListState.executionIndicators,
)

const teacherInfo = teacherDetailProfile.teacherInfo
const currentProfile = teacherDetailProfile.currentProfile
const stageRadar = teacherDetailProfile.stageRadar
const abilityStructure = teacherDetailProfile.abilityStructure
const targetComparison = teacherDetailProfile.targetComparison
const developmentDirections = teacherDetailProfile.developmentDirections
const basis = teacherDetailProfile.basis
const radarScores = stageRadar.dimensions.map(item => ({
  label: item.dimension,
  value: item.score,
}))
const dimensionColors = {
  教学能力: '#0b63f6',
  教研能力: '#18b76b',
  实践能力: '#ff7a00',
  服务能力: '#7657ff',
}

function goBack() {
  router.push('/admin/ability-profile/teacher')
}

function handleBasisLink(routePath: string) {
  router.push(routePath)
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
        <button type="button" class="back-button" @click="goBack">返回教师画像列表</button>
      </div>

      <section class="current-profile-hero portrait-observatory">
        <div class="profile-narrative">
          <div class="profile-heading">
            <span class="profile-mark">{{ teacherInfo.name.slice(0, 1) }}</span>
            <div>
              <span class="section-kicker">当前画像</span>
              <h1>{{ teacherInfo.name }} · 能力画像</h1>
              <p>{{ teacherInfo.period }} ｜ {{ teacherInfo.college }} ｜ {{ teacherInfo.title }} ｜ 聘期第 {{ teacherInfo.year }} 年</p>
            </div>
          </div>

          <div class="profile-statement">
            <strong>当前画像：{{ currentProfile.statement }}</strong>
            <span>{{ currentProfile.note || '本页展示当前发展状态，供培养与发展参考。' }}</span>
            <small>当前执行版：{{ currentExecutionVersionTitle }}</small>
          </div>

          <div class="profile-metric-stack">
            <div class="metric-token">
              <span>当前状态</span>
              <strong>{{ currentProfile.status }}</strong>
              <small>{{ currentProfile.statusDetail }}</small>
            </div>
            <div class="metric-token index-token">
              <span>发展指数</span>
              <strong>{{ currentProfile.developmentIndex }}</strong>
              <small>更新 {{ currentProfile.updatedAt }}</small>
            </div>
          </div>

          <div class="tag-list">
            <span v-for="tag in currentProfile.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>

        <article class="radar-orbit-panel" aria-label="能力阶段雷达">
          <div class="radar-title">
            <span class="section-kicker">能力阶段雷达</span>
            <h2>基本能力居中，四类能力看阶段</h2>
          </div>
          <div class="radar-stage-shell">
            <SimpleRadarChart
              :scores="radarScores"
              :dimension-colors="dimensionColors"
              :stage-rings="stageRadar.stages.map(stage => ({ label: stage.stage, max: stage.max, color: stage.color }))"
              center-label="基本能力"
              :center-status="stageRadar.basicAbilityStatus"
              :size="430"
            />
          </div>
          <div class="stage-legend" aria-label="阶段说明：新手、胜任、骨干、名师">
            <span v-for="stage in stageRadar.stages" :key="stage.stage">
              <b :style="{ backgroundColor: stage.color }"></b>
              {{ stage.min }}-{{ stage.max }} {{ stage.stage }}
            </span>
          </div>
        </article>

        <aside class="reading-card">
          <span class="section-kicker">读图摘要</span>
          <div class="basic-status">基本能力｜{{ stageRadar.basicAbilityStatus }}</div>
          <ul class="reading-list">
            <li v-for="item in stageRadar.dimensions" :key="item.dimension">
              <span>{{ item.dimension }}</span>
              <strong>{{ item.score }}｜{{ item.stage }}</strong>
            </li>
          </ul>
          <div class="structure-summary">
            <span>当前结构</span>
            <p>{{ stageRadar.structureSummary }}</p>
          </div>
          <div class="focus-chips">
            <span v-for="item in stageRadar.focusItems" :key="item">{{ item }}</span>
          </div>
        </aside>
      </section>

      <section class="section-block">
        <div class="section-title-row">
          <div>
            <span class="section-kicker">能力结构</span>
            <h2>四类能力当前呈现</h2>
          </div>
        </div>
        <div class="ability-track-list">
          <article v-for="item in abilityStructure" :key="item.dimension" class="ability-row panel">
            <div class="ability-row-main">
              <strong>{{ item.dimension }}</strong>
              <span>{{ item.statusText }}</span>
            </div>
            <div class="ability-row-score">
              <b>{{ item.score }}</b>
              <em>{{ item.stage }}</em>
            </div>
            <div class="ability-progress" aria-hidden="true">
              <span :style="{ width: `${item.score}%` }"></span>
            </div>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="section-block">
        <div class="section-title-row">
          <div>
            <span class="section-kicker">目标对照摘要</span>
            <h2>当前画像与培养目标的关系</h2>
          </div>
        </div>
        <div class="comparison-grid">
          <article v-for="item in targetComparison" :key="item.title" class="comparison-card panel">
            <h3>{{ item.title }}</h3>
            <div>
              <span>已形成支撑</span>
              <p>{{ item.formedSupports.join('、') }}</p>
            </div>
            <div>
              <span>继续积累方向</span>
              <p>{{ item.continuingDirections.join('、') }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="section-block">
        <div class="section-title-row">
          <div>
            <span class="section-kicker">适合发展方向</span>
            <h2>从当前画像延伸出的发展建议</h2>
          </div>
        </div>
        <div class="direction-grid">
          <article v-for="item in developmentDirections" :key="item.title" class="direction-card panel">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="basis-strip">
        <span>形成依据</span>
        <p>{{ basis.summary }}</p>
        <button
          v-for="link in basis.links"
          :key="link.label"
          type="button"
          :aria-label="link.route.startsWith('/admin/archive/teacher/') ? '查看引用记录' : '查看能力清单口径'"
          :data-route-hint="link.route === '/admin/ability-list/execution' ? '/admin/ability-list/execution' : link.route"
          @click="handleBasisLink(link.route)"
        >
          {{ link.label }}
        </button>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.teacher-detail-page {
  display: flex;
  min-height: calc(100vh - var(--admin-topbar-height) - var(--admin-page-gutter-y) * 2);
  flex-direction: column;
  gap: var(--space-admin-2xl);
  color: var(--color-admin-text-strong);
}

.detail-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-admin-lg);
  min-height: 44px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-admin-sm);
  color: var(--color-admin-text-muted);
  font-size: 14px;
}

.breadcrumb a {
  color: var(--color-admin-text-subtle);
  text-decoration: none;
}

.breadcrumb .current {
  color: var(--color-admin-text-strong);
  font-weight: 800;
}

.slash {
  color: #c1cad8;
}

.back-button,
.basis-strip button {
  height: 36px;
  padding: 0 var(--space-admin-lg);
  border: 1px solid rgba(21, 101, 216, 0.18);
  border-radius: var(--radius-full);
  background: #fff;
  color: var(--color-admin-primary);
  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  box-shadow: 0 8px 18px rgba(24, 88, 160, 0.08);
}

.panel,
.basis-strip {
  border: 1px solid rgba(212, 224, 242, 0.9);
  border-radius: var(--radius-lg);
  background: #fff;
  box-shadow: var(--shadow-admin-card-soft);
}

.current-profile-hero {
  position: relative;
  display: grid;
  overflow: hidden;
  grid-template-columns: minmax(280px, 0.82fr) minmax(420px, 1.18fr) minmax(260px, 0.74fr);
  gap: 28px;
  min-height: 620px;
  padding: 34px;
  border: 1px solid rgba(164, 194, 236, 0.72);
  border-radius: 22px;
  background:
    radial-gradient(circle at 50% 44%, rgba(24, 183, 107, 0.14), transparent 34%),
    radial-gradient(circle at 71% 13%, rgba(255, 122, 0, 0.14), transparent 28%),
    radial-gradient(circle at 10% 18%, rgba(11, 99, 246, 0.15), transparent 30%),
    linear-gradient(135deg, var(--color-admin-bg-soft) 0%, #eef6ff 46%, #f8fff9 100%);
  box-shadow: 0 28px 80px rgba(30, 75, 142, 0.12);
}

.current-profile-hero::before {
  position: absolute;
  inset: 20px;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 18px;
  content: "";
  pointer-events: none;
}

.current-profile-hero::after {
  position: absolute;
  width: 520px;
  height: 520px;
  border: 1px solid rgba(47, 104, 190, 0.08);
  border-radius: 50%;
  background:
    linear-gradient(90deg, transparent 49.8%, rgba(47, 104, 190, 0.08) 50%, transparent 50.2%),
    linear-gradient(0deg, transparent 49.8%, rgba(47, 104, 190, 0.08) 50%, transparent 50.2%);
  content: "";
  pointer-events: none;
  right: 300px;
  top: 72px;
}

.profile-narrative,
.radar-orbit-panel,
.reading-card {
  position: relative;
  z-index: 1;
}

.profile-heading {
  display: flex;
  align-items: flex-start;
  gap: var(--space-admin-lg);
  min-width: 0;
}

.profile-mark {
  display: inline-flex;
  width: 54px;
  height: 54px;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border: 1px solid rgba(11, 99, 246, 0.18);
  border-radius: 18px;
  background: linear-gradient(135deg, #fff, #e7f3ff);
  color: var(--color-admin-primary);
  font-size: 22px;
  font-weight: 950;
  box-shadow: 0 14px 30px rgba(11, 99, 246, 0.14);
}

.profile-heading h1,
.section-title-row h2,
.comparison-card h3,
.direction-card h3,
.radar-title h2 {
  margin: 0;
  color: var(--color-admin-text-strong);
}

.profile-heading h1 {
  margin-top: 6px;
  font-size: clamp(26px, 2vw, 34px);
  font-weight: 950;
  letter-spacing: 0;
}

.profile-heading p,
.profile-statement span,
.ability-row p,
.comparison-card p,
.direction-card p,
.basis-strip p {
  margin: 0;
  color: var(--color-admin-text-muted);
  line-height: 1.65;
}

.profile-statement {
  display: grid;
  gap: var(--space-admin-md);
  margin-top: 54px;
  max-width: 440px;
}

.profile-statement strong {
  display: block;
  color: var(--color-admin-text-strong);
  font-size: clamp(22px, 1.8vw, 30px);
  line-height: 1.28;
  font-weight: 950;
}

.profile-statement small {
  color: var(--color-admin-text-subtle);
  font-weight: 800;
}

.profile-metric-stack {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-admin-md);
  margin-top: 36px;
}

.metric-token {
  display: grid;
  min-height: 118px;
  align-content: center;
  gap: 7px;
  padding: var(--space-admin-lg);
  border: 1px solid rgba(255, 255, 255, 0.86);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 18px 42px rgba(58, 96, 150, 0.1);
  backdrop-filter: blur(10px);
}

.metric-token span {
  color: var(--color-admin-text-muted);
  font-size: 13px;
  font-weight: 900;
}

.metric-token strong {
  color: var(--color-admin-text-strong);
  font-size: 20px;
  font-weight: 950;
  line-height: 1.25;
}

.metric-token small {
  color: var(--color-admin-text-subtle);
  font-size: 12px;
  font-weight: 800;
}

.index-token strong {
  color: var(--color-admin-primary);
  font-size: 42px;
  line-height: 0.95;
}

.panel {
  padding: var(--space-admin-xl);
}

.section-kicker {
  color: var(--color-admin-primary);
  font-size: 13px;
  font-weight: 900;
}

.tag-list,
.focus-chips,
.stage-legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-admin-xs);
}

.tag-list span,
.focus-chips span,
.stage-legend span {
  padding: 6px 11px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.76);
  color: var(--color-admin-text-subtle);
  font-size: 12px;
  font-weight: 900;
}

.tag-list {
  margin-top: var(--space-admin-lg);
}

.radar-orbit-panel {
  display: grid;
  align-content: center;
  justify-items: center;
  min-width: 0;
}

.radar-title {
  width: 100%;
  text-align: center;
}

.radar-title h2 {
  margin-top: 5px;
  font-size: 22px;
  font-weight: 950;
}

.radar-stage-shell {
  position: relative;
  display: grid;
  width: min(100%, 520px);
  min-height: 452px;
  place-items: center;
  margin-top: var(--space-admin-sm);
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(255, 255, 255, 0.98) 0 18%, rgba(235, 249, 242, 0.82) 19% 26%, transparent 27%),
    repeating-radial-gradient(circle, rgba(11, 99, 246, 0.11) 0 1px, transparent 1px 72px);
  filter: drop-shadow(0 24px 42px rgba(19, 81, 156, 0.16));
}

.radar-stage-shell::before,
.radar-stage-shell::after {
  position: absolute;
  border-radius: 50%;
  content: "";
  pointer-events: none;
}

.radar-stage-shell::before {
  inset: 28px;
  border: 1px dashed rgba(18, 104, 246, 0.18);
}

.radar-stage-shell::after {
  inset: 82px;
  border: 1px solid rgba(24, 183, 107, 0.16);
}

.section-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-admin-lg);
  margin-bottom: var(--space-admin-lg);
}

.section-title-row h2 {
  margin-top: 4px;
  font-size: 18px;
  font-weight: 950;
}

.reference-pill,
.basic-status {
  padding: 6px 10px;
  border-radius: var(--radius-full);
  background: #eafff2;
  color: #13a854;
  font-size: 12px;
  font-weight: 900;
}

.reading-card {
  display: grid;
  align-content: start;
  gap: var(--space-admin-lg);
  padding: var(--space-admin-xl);
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 20px 48px rgba(58, 96, 150, 0.11);
  backdrop-filter: blur(12px);
}

.reading-list {
  display: grid;
  gap: var(--space-admin-sm);
  margin: 0;
  padding: 0;
  list-style: none;
}

.reading-list li {
  display: flex;
  justify-content: space-between;
  gap: var(--space-admin-md);
  padding: 12px 0;
  border-bottom: 1px solid rgba(210, 223, 242, 0.9);
}

.reading-list span,
.structure-summary span,
.comparison-card span {
  color: var(--color-admin-text-muted);
  font-size: 13px;
  font-weight: 800;
}

.reading-list strong {
  color: var(--color-admin-text-strong);
  font-weight: 950;
}

.structure-summary {
  display: grid;
  gap: var(--space-admin-xs);
}

.section-block {
  display: grid;
  gap: var(--space-admin-lg);
}

.ability-track-list {
  display: grid;
  gap: var(--space-admin-md);
}

.ability-row {
  display: grid;
  position: relative;
  overflow: hidden;
  grid-template-columns: minmax(160px, 0.82fr) 110px minmax(260px, 1.6fr);
  align-items: start;
  gap: var(--space-admin-lg);
  border-color: rgba(196, 215, 241, 0.88);
  background:
    linear-gradient(90deg, rgba(11, 99, 246, 0.045), transparent 42%),
    #fff;
}

.ability-row::before {
  position: absolute;
  width: 5px;
  height: 100%;
  background: linear-gradient(180deg, #0b63f6, #18b76b);
  content: "";
  left: 0;
  top: 0;
}

.ability-row-main {
  display: grid;
  gap: 4px;
}

.ability-row-main strong {
  color: var(--color-admin-text-strong);
  font-size: 16px;
  font-weight: 950;
}

.ability-row-main span {
  color: var(--color-admin-text-muted);
  font-size: 13px;
  font-weight: 800;
}

.ability-row p {
  grid-column: 1 / -1;
  padding-top: var(--space-admin-md);
  border-top: 1px solid rgba(220, 230, 245, 0.9);
}

.ability-row-score {
  display: flex;
  align-items: baseline;
  gap: var(--space-admin-xs);
}

.ability-row-score b {
  color: var(--color-admin-primary);
  font-size: 24px;
  font-weight: 950;
}

.ability-row-score em {
  color: var(--color-admin-text-subtle);
  font-style: normal;
  font-weight: 900;
}

.ability-progress {
  height: 12px;
  overflow: hidden;
  border-radius: var(--radius-full);
  background: #edf4ff;
}

.ability-progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #0b63f6, #18b76b, #ff7a00);
  box-shadow: 0 8px 20px rgba(11, 99, 246, 0.18);
}

.comparison-grid,
.direction-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-admin-lg);
}

.comparison-card,
.direction-card {
  display: grid;
  gap: var(--space-admin-md);
  border-color: rgba(204, 219, 240, 0.9);
  background:
    linear-gradient(180deg, rgba(248, 251, 255, 0.92), #fff 48%),
    #fff;
}

.comparison-card h3,
.direction-card h3 {
  font-size: 17px;
  font-weight: 950;
}

.comparison-card div {
  display: grid;
  gap: 4px;
}

.basis-strip {
  display: flex;
  align-items: center;
  gap: var(--space-admin-lg);
  padding: var(--space-admin-lg) var(--space-admin-xl);
}

.basis-strip span {
  color: var(--color-admin-text-strong);
  font-weight: 950;
}

.basis-strip p {
  flex: 1;
}

@media (max-width: 1280px) {
  .current-profile-hero,
  .basis-strip {
    align-items: flex-start;
  }

  .current-profile-hero {
    grid-template-columns: 1fr;
    min-height: 0;
  }

  .comparison-grid,
  .direction-grid {
    grid-template-columns: 1fr;
  }

  .ability-row {
    grid-template-columns: 1fr;
  }
}
</style>
