<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AdminTable, AdminTableColumn } from '@/components/admin-ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import SimpleRadarChart from './components/SimpleRadarChart.vue'
import { Button } from '@/components/ui'
import groupEmpty from '@/assets/admin/ability-group-portrait-assets/ability-group-portrait-empty.svg'
import iconAbilityPractice from '@/assets/admin/ability-group-portrait-assets/icons/icon-ability-practice.svg'
import iconAbilityResearch from '@/assets/admin/ability-group-portrait-assets/icons/icon-ability-research.svg'
import iconAbilityService from '@/assets/admin/ability-group-portrait-assets/icons/icon-ability-service.svg'
import iconAbilityTeaching from '@/assets/admin/ability-group-portrait-assets/icons/icon-ability-teaching.svg'
import iconBasicQualified from '@/assets/admin/ability-group-portrait-assets/icons/icon-basic-qualified.svg'
import iconIndexDevelopment from '@/assets/admin/ability-group-portrait-assets/icons/icon-index-development.svg'
import iconRadarAnalysis from '@/assets/admin/ability-group-portrait-assets/icons/icon-radar-analysis.svg'
import iconSupportCourseResource from '@/assets/admin/ability-group-portrait-assets/icons/icon-support-course-resource.svg'
import iconSupportPracticeTransform from '@/assets/admin/ability-group-portrait-assets/icons/icon-support-practice-transform.svg'
import iconSupportResearchTeam from '@/assets/admin/ability-group-portrait-assets/icons/icon-support-research-team.svg'
import iconSupportServiceUnified from '@/assets/admin/ability-group-portrait-assets/icons/icon-support-service-unified.svg'
import iconTabCollege from '@/assets/admin/ability-group-portrait-assets/icons/icon-tab-college.svg'
import iconTabMajor from '@/assets/admin/ability-group-portrait-assets/icons/icon-tab-major.svg'
import iconTabTeacher from '@/assets/admin/ability-group-portrait-assets/icons/icon-tab-teacher.svg'
import { useOperationMessage } from '@/lib/operationMessage'
import { calculateAbilityProfileGroup } from '@/services/mock/ability-profile'
import { getAbilityListState } from '@/stores/admin/abilityListStore'
import { getArchiveState } from '@/stores/admin/archiveStore'

const router = useRouter()
const operationMessage = useOperationMessage()
const abilityListState = getAbilityListState()
const currentExecutionVersionTitle = abilityListState.executionVersion.title
const groupProfile = calculateAbilityProfileGroup(
  getArchiveState().teacherArchiveFacts,
  abilityListState.executionIndicators,
)

const developmentIndex = groupProfile.developmentIndex
const dataBasis = groupProfile.dataBasis
const schoolRadarData = groupProfile.schoolRadarData
const abilityDimensions = groupProfile.abilityDimensions

const dimensionMeta: Record<string, { iconSrc: string; tone: string }> = {
  教学能力: { iconSrc: iconAbilityTeaching, tone: 'blue' },
  教研能力: { iconSrc: iconAbilityResearch, tone: 'green' },
  实践能力: { iconSrc: iconAbilityPractice, tone: 'orange' },
  服务能力: { iconSrc: iconAbilityService, tone: 'purple' },
}
const dimensionColors: Record<string, string> = {
  教学能力: '#0b63f6',
  教研能力: '#16b569',
  实践能力: '#ff7a00',
  服务能力: '#7657ff',
}
const radarStageRings = [
  { label: '新手', max: 25, color: '#94a3b8' },
  { label: '胜任', max: 50, color: '#3b82f6' },
  { label: '骨干', max: 75, color: '#18b76b' },
  { label: '名师', max: 100, color: '#ff7a00' },
]

const developmentDirections = groupProfile.developmentDirections
const directionTones = ['blue', 'green', 'orange', 'purple']
const supportDirectionIcons = [
  iconSupportCourseResource,
  iconSupportPracticeTransform,
  iconSupportResearchTeam,
  iconSupportServiceUnified,
]

// 建议关注对象数据
const focusObjects = ref('院系')

const focusTabs = groupProfile.focusTabs
const focusData = groupProfile.focusData
const focusTabIconMap: Record<string, string> = {
  院系: iconTabCollege,
  专业: iconTabMajor,
  教师: iconTabTeacher,
}
const focusedGroupObject = ref(focusData[focusObjects.value][0]?.name ?? '')

const sortedDimensions = computed(() => [...abilityDimensions].sort((a, b) => b.index - a.index))
const strongestDimension = computed(() => sortedDimensions.value[0] ?? abilityDimensions[0])
const weakestDimension = computed(() => sortedDimensions.value[sortedDimensions.value.length - 1] ?? abilityDimensions[0])
const competentOrAboveRate = computed(() => {
  const distributions = abilityDimensions
    .flatMap(item => item.distribution)
    .filter((item): item is { label: string; percentage: number } => Boolean(item))
  const competentOrAbove = distributions
    .filter(item => item.label !== '新手')
    .reduce((sum, item) => sum + item.percentage, 0)
  return Math.round(competentOrAbove / Math.max(abilityDimensions.length, 1))
})
const basicAbilityStatus = computed(() => competentOrAboveRate.value >= 80 ? '达标' : '待核验')
const groupObservation = computed(() => ({
  title: `当前数据下，${weakestDimension.value.dimension}相对偏低`,
  summary: `综合发展指数 ${developmentIndex}/100，${strongestDimension.value.dimension}相对较高，${weakestDimension.value.dimension}相对偏低。该结果基于当前已归档数据形成，仅作为群体观察参考，建议结合档案完整度和学院实际进一步核验。`,
  basis: `依据：${dataBasis}；当前执行版：${currentExecutionVersionTitle}`,
}))
const structureObservation = computed(() =>
  `相对较高：${strongestDimension.value.dimension}（${strongestDimension.value.index} 分）；相对较低：${weakestDimension.value.dimension}（${weakestDimension.value.index} 分）。建议结合教师档案完整度继续核验。`,
)
const radarReadingItems = computed(() => [
  {
    key: 'index',
    label: '综合发展指数',
    value: developmentIndex,
    suffix: '/100',
    desc: '全校教师画像汇总',
  },
  {
    key: 'basic',
    label: '基本能力',
    value: basicAbilityStatus.value,
    suffix: '',
    desc: '按当前能力清单执行版判断',
  },
  {
    key: 'strongest',
    label: '相对较高维度',
    value: strongestDimension.value.dimension,
    suffix: '',
    desc: `${strongestDimension.value.index} 分`,
  },
  {
    key: 'weakest',
    label: '相对较低维度',
    value: weakestDimension.value.dimension,
    suffix: '',
    desc: `${weakestDimension.value.index} 分`,
  },
])
const visibleRadarReadingItems = computed(() => radarReadingItems.value.filter(item => item.key !== 'strongest'))

function switchTab(tabValue: string) {
  focusObjects.value = tabValue
  focusedGroupObject.value = focusData[tabValue][0]?.name ?? ''
}

function viewFullAdvice() {
  router.push('/admin/ability-profile/teacher?focus=重点支持')
}

function viewProfile(name: string) {
  const teacherMap: Record<string, string> = {
    林老师: 'lin',
    陈老师: 'chen',
    王老师: 'wang',
    刘老师: 'liu',
    赵老师: 'zhao',
    周老师: 'zhou',
  }
  const teacherId = teacherMap[name]
  if (teacherId) {
    router.push(`/admin/ability-profile/teacher/${teacherId}`)
    return
  }
  const targetTab = focusTabs.find(tab => focusData[tab.value]?.some(item => item.name === name))?.value
  if (targetTab) {
    focusObjects.value = targetTab
    focusedGroupObject.value = name
    operationMessage.set(`${name} 已在群体画像内定位，继续以${targetTab}筛选态查看。`)
  }
}

function viewMoreObjects() {
  operationMessage.set('更多关注对象暂未拆独立列表，当前保留为群体画像表格内展示。')
}

function getDimensionMeta(dimension: string) {
  return dimensionMeta[dimension] || { iconSrc: iconAbilityTeaching, tone: 'blue' }
}

function getDistributionTone(index: number) {
  return ['novice', 'competent', 'backbone', 'expert'][index] || 'novice'
}

function getDimensionObservation(row: { dimension: string; index: number }) {
  if (row.dimension === weakestDimension.value.dimension) {
    return `当前相对偏低，建议结合${row.dimension}档案材料完整度进一步核验。`
  }
  if (row.dimension === strongestDimension.value.dimension) {
    return '当前相对较高，可作为后续经验提炼参考。'
  }
  if (row.index >= developmentIndex) {
    return '略高于整体指数，建议持续观察分布变化。'
  }
  return '略低于整体指数，建议纳入下一轮观察。'
}

function focusRowClassName({ row }: { row: { name: string } }) {
  return focusedGroupObject.value === row.name ? 'focused-row' : ''
}
</script>

<template>
  <AdminLayout active-key="ability-profile-group">
    <div class="ability-profile-group-page">
      <section class="overview-hero">
        <article class="overview-card">
          <div class="overview-copy">
            <div class="section-heading">
              <img class="section-icon" :src="iconIndexDevelopment" alt="" />
              <h2>画像概览</h2>
            </div>
            <h1>{{ groupObservation.title }}</h1>
            <p>{{ groupObservation.summary }}</p>
            <span class="overview-basis">
              依据：{{ dataBasis }}；当前执行版：{{ currentExecutionVersionTitle }}
            </span>
          </div>
        </article>
      </section>

      <section class="radar-showcase">
        <article class="radar-structure-panel evidence-card">
          <div class="section-heading">
            <img class="section-icon" :src="iconRadarAnalysis" alt="" />
            <h2>雷达结构</h2>
            <span class="section-note">中心看基本能力，四轴看发展方向，环层看发展阶段</span>
          </div>
          <div class="radar-map-frame">
            <div class="radar-wrap">
              <SimpleRadarChart
                :scores="schoolRadarData"
                :dimension-colors="dimensionColors"
                :stage-rings="radarStageRings"
                center-label="基本能力"
                center-status="达标"
                :size="460"
              />
            </div>
            <div class="radar-stage-guide" aria-label="雷达阶段说明">
              <span
                v-for="(stage, index) in radarStageRings"
                :key="stage.label"
                class="stage-pill"
              >
                <i :style="{ background: stage.color }"></i>
                <strong class="stage-name">{{ stage.label }}</strong>
                <em>{{ index === 0 ? 0 : radarStageRings[index - 1].max }}-{{ stage.max }}</em>
              </span>
            </div>
          </div>
        </article>

        <aside class="radar-reading-panel evidence-card">
          <div class="section-heading">
            <img class="section-icon" :src="iconBasicQualified" alt="" />
            <h2>读图摘要</h2>
          </div>
          <div class="radar-reading-list">
            <article
              v-for="item in visibleRadarReadingItems"
              :key="item.label"
              class="reading-item"
              :class="{ 'basic-ability-status': item.label === '基本能力' }"
            >
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}<em>{{ item.suffix }}</em></strong>
              <p>{{ item.desc }}</p>
            </article>
          </div>
          <div class="structure-feature">
            <span>结构特征</span>
            <p>{{ structureObservation }}</p>
          </div>
          <Button variant="outline" @click="viewFullAdvice">
            建议查看{{ weakestDimension.dimension }}关联教师 <span>→</span>
          </Button>
        </aside>
      </section>

      <section class="evidence-grid">
        <div class="dimension-panel evidence-card">
          <div class="section-heading table-title">
            <h2>维度观察</h2>
            <span>看相对高低、教师分布和下一步核验点</span>
          </div>
          <AdminTable
            class="dimension-table"
            :data="abilityDimensions"
            empty-text="暂无能力维度数据"
          >
            <AdminTableColumn label="维度" min-width="150">
              <template #default="{ row }">
                <div class="dimension-name" :class="getDimensionMeta(row.dimension).tone">
                  <span class="dimension-icon" aria-hidden="true">
                    <img class="dimension-icon-img" :src="getDimensionMeta(row.dimension).iconSrc" alt="" />
                  </span>
                  <strong>{{ row.dimension }}</strong>
                </div>
              </template>
            </AdminTableColumn>
            <AdminTableColumn label="发展指数" min-width="100" align="center">
              <template #default="{ row }">
                <span class="index-cell">{{ row.index }}</span>
              </template>
            </AdminTableColumn>
            <AdminTableColumn label="观察说明" min-width="260">
              <template #default="{ row }">
                <p class="dimension-observation">{{ getDimensionObservation(row) }}</p>
              </template>
            </AdminTableColumn>
            <AdminTableColumn label="全校教师分布" min-width="320">
              <template #default="{ row }">
                <div class="distribution-labels">
                  <span v-for="dist in row.distribution" :key="dist.label">
                    {{ dist.label }} {{ dist.percentage }}%
                  </span>
                </div>
                <div class="distribution-track">
                  <span
                    v-for="(dist, index) in row.distribution"
                    :key="dist.label"
                    :class="getDistributionTone(index)"
                    :style="{ width: `${dist.percentage}%` }"
                  ></span>
                </div>
              </template>
            </AdminTableColumn>
          </AdminTable>
        </div>
      </section>

      <section class="bottom-grid">
        <article class="support-card">
          <div class="section-heading">
            <h2>可参考方向</h2>
            <span class="info-dot">i</span>
          </div>
          <p class="support-desc">
            基于能力结构与正式档案数据观察，列出后续可进一步核验的参考方向。
          </p>
          <div class="directions-grid">
            <div
              v-for="(direction, index) in developmentDirections"
              :key="direction.title"
              class="direction-card"
              :class="directionTones[index]"
            >
              <span class="direction-icon" aria-hidden="true">
                <img class="direction-icon-img" :src="supportDirectionIcons[index]" alt="" />
              </span>
              <h3 class="direction-title">{{ direction.title }}</h3>
              <p class="direction-observation">{{ direction.observation }}</p>
              <div class="key-dimension">
                <span class="dimension-label">关键维度：</span>
                <span class="dimension-value">{{ direction.keyDimension }}</span>
              </div>
            </div>
          </div>
          <div class="direction-actions">
            <Button variant="outline" @click="viewFullAdvice">
              查看关联教师 <span>→</span>
            </Button>
          </div>
          <p v-if="operationMessage.text.value" class="operation-message">{{ operationMessage.text.value }}</p>
        </article>

        <article class="focus-card">
          <div class="focus-head">
            <h2>建议关注对象</h2>
            <div class="focus-tabs">
              <button
                v-for="tab in focusTabs"
                :key="tab.value"
                class="tab-btn"
                :class="{ active: focusObjects === tab.value }"
                @click="switchTab(tab.value)"
              >
                <img class="tab-icon" :src="focusTabIconMap[tab.value]" alt="" />
                <span>{{ tab.label }}</span>
              </button>
            </div>
          </div>
          <div v-if="focusData[focusObjects].length === 0" class="group-empty">
            <img :src="groupEmpty" alt="" />
            <h3>暂无建议关注对象</h3>
            <p>当前筛选口径下未识别到需要进一步查看的对象。</p>
          </div>
          <AdminTable
            v-else
            class="focus-table"
            :data="focusData[focusObjects]"
            :row-class-name="focusRowClassName"
            empty-text="暂无建议关注对象"
          >
            <AdminTableColumn prop="name" label="对象" min-width="120" />
            <AdminTableColumn label="关注类型" min-width="110">
              <template #default="{ row }">
                <span
                  class="focus-type"
                  :class="{
                    'support': row.type === '重点支持',
                    'advantage': row.type === '优势巩固',
                    'attention': row.type === '需关注',
                  }"
                >
                  {{ row.type }}
                </span>
              </template>
            </AdminTableColumn>
            <AdminTableColumn prop="dimension" label="关联维度 / 要素" min-width="170" />
            <AdminTableColumn prop="reason" label="观察原因" min-width="250" />
            <AdminTableColumn label="下一步" min-width="110" fixed="right">
              <template #default="{ row }">
                <Button variant="ghost" size="sm" @click="viewProfile(row.name)">查看画像</Button>
              </template>
            </AdminTableColumn>
          </AdminTable>
          <button class="more-btn" @click="viewMoreObjects">查看更多对象 ↓</button>
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
  gap: var(--space-admin-md);
}

.breadcrumb-line {
  display: flex;
  align-items: center;
  gap: var(--space-admin-card-gap);
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

.overview-hero,
.bottom-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
  gap: clamp(14px, 1vw, 18px);
}

.overview-hero {
  grid-template-columns: 1fr;
}

.overview-card,
.analysis-card,
.support-card,
.focus-card,
.overview-card,
.evidence-card {
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  background: #fff;
  box-shadow: var(--shadow-card);
}

.overview-card {
  display: grid;
  min-height: auto;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-admin-2xl);
  overflow: hidden;
  padding: clamp(24px, 1.6vw, 32px);
}

.overview-copy {
  min-width: 0;
}

.overview-copy h1 {
  max-width: 680px;
  margin: 0;
  color: var(--color-text-primary);
  font-size: clamp(26px, 1.7vw, 34px);
  font-weight: 950;
  line-height: 1.24;
}

.overview-copy p {
  max-width: 760px;
  margin: var(--space-admin-md) 0 0;
  color: var(--color-text-primary);
  font-size: 15px;
  font-weight: 800;
  line-height: 1.72;
}

.overview-basis {
  display: inline-flex;
  margin-top: var(--space-admin-lg);
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 700;
}

.overview-card {
  padding: clamp(20px, 1.35vw, 26px);
}

.section-heading {
  display: flex;
  align-items: center;
  gap: var(--space-admin-xs);
  margin-bottom: clamp(10px, 0.7vw, 14px);
}

.section-icon {
  width: 20px;
  height: 20px;
  flex: none;
  object-fit: contain;
}

.section-note {
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 800;
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
  gap: var(--space-admin-xs);
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
  gap: var(--space-admin-xs);
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

.status-icon {
  width: 20px;
  height: 20px;
  flex: none;
  object-fit: contain;
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

.score-hero-art {
  position: relative;
  z-index: 1;
  width: 180px;
  max-width: 100%;
  height: 132px;
  object-fit: contain;
}

.score-emblem {
  position: absolute;
  right: 22px;
  top: 22px;
  z-index: 2;
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.baseline-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(210px, 40%);
  gap: 22px;
}

.baseline-list {
  position: relative;
  display: grid;
  gap: var(--space-admin-xl);
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

.radar-showcase {
  display: grid;
  grid-template-columns: minmax(420px, 1fr) minmax(320px, 0.42fr);
  gap: clamp(16px, 1.1vw, 22px);
}

.evidence-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(16px, 1.1vw, 22px);
}

.evidence-card {
  min-width: 0;
  padding: clamp(16px, 1vw, 20px);
}

.dimension-panel {
  min-width: 0;
}

.radar-structure-panel {
  display: grid;
  grid-template-rows: auto 1fr;
  padding: clamp(20px, 1.35vw, 26px);
}

.radar-map-frame {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 150px;
  min-height: 520px;
  align-items: center;
  gap: var(--space-admin-lg);
  border: 1px solid var(--color-admin-divider);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(circle at 50% 46%, rgba(11, 99, 246, 0.16), rgba(11, 99, 246, 0) 42%),
    linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%);
  padding: clamp(14px, 1vw, 20px);
}

.radar-wrap {
  display: flex;
  justify-content: center;
  min-width: 0;
  overflow: visible;
}

.radar-stage-guide {
  display: grid;
  gap: var(--space-admin-sm);
}

.stage-pill {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  column-gap: 7px;
  row-gap: 2px;
  border: 1px solid var(--color-admin-divider);
  border-radius: var(--radius-admin-panel);
  background: rgba(255, 255, 255, 0.78);
  padding: 8px 10px;
}

.stage-pill i {
  display: block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  grid-row: 1 / span 2;
}

.stage-pill strong {
  color: var(--color-text-primary);
  font-size: 12px;
  font-weight: 950;
  line-height: 1;
}

.stage-pill em {
  color: var(--color-text-secondary);
  font-size: 11px;
  font-style: normal;
  font-weight: 800;
  line-height: 1;
}

.radar-reading-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-admin-lg);
  padding: clamp(20px, 1.35vw, 26px);
}

.radar-reading-list {
  display: grid;
  gap: var(--space-admin-sm);
}

.reading-item {
  border: 1px solid var(--color-admin-divider);
  border-radius: var(--radius-admin-panel);
  background: var(--color-admin-bg-soft);
  padding: 12px 14px;
}

.reading-item span,
.structure-feature span {
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 900;
}

.reading-item strong {
  display: block;
  margin-top: 5px;
  color: var(--color-primary);
  font-size: 24px;
  font-weight: 950;
  line-height: 1;
}

.reading-item em {
  color: var(--color-text-secondary);
  font-size: 13px;
  font-style: normal;
}

.reading-item p,
.structure-feature p {
  margin: 7px 0 0;
  color: var(--color-text-primary);
  font-size: 12px;
  font-weight: 800;
  line-height: 1.55;
}

.basic-ability-status strong {
  color: #13a854;
}

.structure-feature {
  border-left: 3px solid var(--color-primary);
  background: #f5f9ff;
  padding: 12px 14px;
}

.table-title span {
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 800;
}

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
  border-radius: var(--radius-sm);
  color: #fff;
  font-size: 14px;
}

.dimension-icon-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
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

.dimension-observation {
  max-width: 320px;
  margin: 0;
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.55;
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
  border-radius: var(--radius-full);
  background: #eef3fb;
  gap: 4px;
}

.distribution-track span {
  display: block;
  min-width: 10px;
  border-radius: var(--radius-full);
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
  gap: var(--space-admin-sm);
}

.direction-card {
  min-height: 122px;
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-admin-panel);
  padding: var(--space-admin-md-lg) var(--space-admin-md);
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
  border-radius: var(--radius-admin-panel);
  background: var(--color-primary);
  color: #fff;
  font-size: 15px;
  font-weight: 950;
}

.direction-icon-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
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

.focus-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-admin-lg);
  margin-bottom: var(--space-admin-sm);
}

.focus-tabs {
  display: flex;
  gap: var(--space-admin-card-gap);
  border-bottom: 1px solid var(--color-card-border);
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--color-text-primary);
  padding: 0 6px 8px;
  font-size: 14px;
  font-weight: 900;
}

.tab-icon {
  width: 15px;
  height: 15px;
  object-fit: contain;
}

.tab-btn.active {
  border-bottom-color: var(--color-primary);
  color: var(--color-primary);
}

.group-empty {
  display: grid;
  justify-items: center;
  gap: var(--space-admin-xs);
  min-height: 220px;
  padding: 34px 18px;
  border: 1px dashed var(--color-card-border);
  border-radius: var(--radius-admin-panel);
  background: #fff;
  color: var(--color-text-primary);
  text-align: center;
}

.group-empty img {
  width: 108px;
  height: 108px;
  object-fit: contain;
}

.group-empty h3,
.group-empty p {
  margin: 0;
}

:deep(.focused-row) {
  background: var(--color-admin-bg);
}

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

  .radar-showcase {
    grid-template-columns: minmax(360px, 1fr) minmax(300px, 0.48fr);
  }

  .directions-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .direction-card {
    min-height: 104px;
  }
}

@media (max-width: 1280px) {
  .overview-hero,
  .bottom-grid,
  .radar-showcase {
    grid-template-columns: 1fr;
  }

  .analysis-card,
  .evidence-grid {
    grid-template-columns: 1fr;
  }

  .overview-card {
    grid-template-columns: minmax(0, 1fr) 180px;
  }

  .radar-map-frame {
    grid-template-columns: 1fr;
    min-height: 500px;
  }

  .radar-stage-guide {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
