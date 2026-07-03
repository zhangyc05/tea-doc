<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import SimpleRadarChart from './components/SimpleRadarChart.vue'
import { Button } from '@/components/ui'
import groupHeroArt from '@/assets/admin/ability-group-portrait-assets/ability-group-portrait-hero-art.png'
import groupHeroEmblem from '@/assets/admin/ability-group-portrait-assets/ability-group-portrait-hero-emblem.svg'
import groupEmpty from '@/assets/admin/ability-group-portrait-assets/ability-group-portrait-empty.svg'
import iconAbilityPractice from '@/assets/admin/ability-group-portrait-assets/icons/icon-ability-practice.svg'
import iconAbilityResearch from '@/assets/admin/ability-group-portrait-assets/icons/icon-ability-research.svg'
import iconAbilityService from '@/assets/admin/ability-group-portrait-assets/icons/icon-ability-service.svg'
import iconAbilityTeaching from '@/assets/admin/ability-group-portrait-assets/icons/icon-ability-teaching.svg'
import iconBaselineYear from '@/assets/admin/ability-group-portrait-assets/icons/icon-baseline-year.svg'
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
const groupProfile = calculateAbilityProfileGroup(
  getArchiveState().teacherArchiveFacts,
  getAbilityListState().executionIndicators,
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

const developmentDirections = groupProfile.developmentDirections
const directionTones = ['blue', 'green', 'orange', 'purple']
const supportDirectionIcons = [
  iconSupportCourseResource,
  iconSupportPracticeTransform,
  iconSupportResearchTeam,
  iconSupportServiceUnified,
]

// 重点关注对象数据
const focusObjects = ref('院系')

const focusTabs = groupProfile.focusTabs
const focusData = groupProfile.focusData
const focusTabIconMap: Record<string, string> = {
  院系: iconTabCollege,
  专业: iconTabMajor,
  教师: iconTabTeacher,
}
const focusedGroupObject = ref(focusData[focusObjects.value][0]?.name ?? '')

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
</script>

<template>
  <AdminLayout active-key="ability-profile-group">
    <div class="ability-profile-group-page">
      <section class="top-grid">
        <article class="overview-card score-card">
          <div class="card-copy">
            <div class="section-heading">
              <img class="section-icon" :src="iconIndexDevelopment" alt="" />
              <h2>综合发展指数</h2>
              <span class="info-dot">i</span>
            </div>
            <div class="score-display">
              <strong>{{ developmentIndex }}</strong>
              <span>/ 100</span>
            </div>
            <p>
              由教学、教研、实践、服务四个维度的发展指数按权重汇总形成；依据：{{ dataBasis }}
            </p>
            <div class="status-line">
              <img class="status-icon" :src="iconBasicQualified" alt="" />
              <span>基本能力：</span>
              <strong>达标</strong>
            </div>
          </div>
          <div class="score-illustration" aria-hidden="true">
            <img class="score-hero-art" :src="groupHeroArt" alt="" />
          </div>
        </article>

        <article class="overview-card baseline-card">
          <div>
            <div class="section-heading">
              <img class="section-icon" :src="iconBaselineYear" alt="" />
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
            <img class="section-icon" :src="iconRadarAnalysis" alt="" />
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
                    <span class="dimension-icon" aria-hidden="true">
                      <img class="dimension-icon-img" :src="getDimensionMeta(dim.dimension).iconSrc" alt="" />
                    </span>
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
              查看完整建议 <span>→</span>
            </Button>
          </div>
          <p v-if="operationMessage.text.value" class="operation-message">{{ operationMessage.text.value }}</p>
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
                <img class="tab-icon" :src="focusTabIconMap[tab.value]" alt="" />
                <span>{{ tab.label }}</span>
              </button>
            </div>
          </div>
          <div v-if="focusData[focusObjects].length === 0" class="group-empty">
            <img :src="groupEmpty" alt="" />
            <h3>暂无重点关注对象</h3>
            <p>当前筛选口径下未识别到需要重点展示的对象。</p>
          </div>
          <table v-else class="focus-table">
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
              <tr
                v-for="item in focusData[focusObjects]"
                :key="item.name"
                :class="{ 'focused-row': focusedGroupObject === item.name }"
              >
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
                  <Button variant="ghost" size="sm" @click="viewProfile(item.name)">查看画像</Button>
                </td>
              </tr>
            </tbody>
          </table>
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
  gap: var(--space-admin-xs);
  margin-bottom: clamp(10px, 0.7vw, 14px);
}

.section-icon {
  width: 20px;
  height: 20px;
  flex: none;
  object-fit: contain;
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
  border-radius: var(--radius-admin-panel);
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

.focus-table th:nth-child(1) { width: 18%; }
.focus-table th:nth-child(2) { width: 16%; }
.focus-table th:nth-child(3) { width: 22%; }
.focus-table th:nth-child(4) { width: 31%; }
.focus-table th:nth-child(5) { width: 13%; }

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

.focused-row td {
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
