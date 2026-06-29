<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AbilityListWorkspace from '@/components/admin/ability-list/AbilityListWorkspace.vue'
import type { AbilityIndicator } from '@/components/admin/ability-list/types'
import baseHeroArt from '@/assets/admin/ability-list-base-assets/ability-list-base-hero-art.png'
import baseHeroEmblem from '@/assets/admin/ability-list-base-assets/ability-list-base-hero-emblem.svg'
import iconAbilityStructure from '@/assets/admin/ability-list-base-assets/icons/icon-ability-structure.svg'
import iconAbilityBasic from '@/assets/admin/ability-list-base-assets/icons/icon-ability-basic.svg'
import iconAbilityTeaching from '@/assets/admin/ability-list-base-assets/icons/icon-ability-teaching.svg'
import iconAbilityResearch from '@/assets/admin/ability-list-base-assets/icons/icon-ability-research.svg'
import iconAbilityPractice from '@/assets/admin/ability-list-base-assets/icons/icon-ability-practice.svg'
import iconAbilityService from '@/assets/admin/ability-list-base-assets/icons/icon-ability-service.svg'

type AbilityChild = {
  key: string
  label: string
}

type AbilityNode = {
  key: string
  label: string
  icon: string
  children?: AbilityChild[]
}

type Indicator = {
  key: string
  name: string
  novice: string
  competent: string
  backbone: string
  expert: string
  basis: string
  status: 'enabled'
}

const router = useRouter()

const abilityTree: AbilityNode[] = [
  {
    key: 'basic',
    label: '基本能力',
    icon: iconAbilityBasic,
  },
  {
    key: 'teaching',
    label: '教学能力',
    icon: iconAbilityTeaching,
    children: [
      { key: 'teaching-design', label: '教学设计与实施' },
      { key: 'teaching-resource', label: '教学资源开发' },
      { key: 'teaching-evaluation', label: '教学评价与反馈' },
      { key: 'teaching-innovation', label: '教学创新与改进' },
    ],
  },
  {
    key: 'research',
    label: '教研能力',
    icon: iconAbilityResearch,
  },
  {
    key: 'practice',
    label: '实践能力',
    icon: iconAbilityPractice,
  },
  {
    key: 'service',
    label: '服务能力',
    icon: iconAbilityService,
  },
]

const indicators: Indicator[] = [
  {
    key: 'teaching-workload',
    name: '教学工作量（课时/学期）',
    novice: '≥64',
    competent: '≥96',
    backbone: '≥128',
    expert: '≥160',
    basis: '教学工作记录',
    status: 'enabled',
  },
  {
    key: 'teaching-evaluation',
    name: '课堂教学评价（学生评分）',
    novice: '≥80分',
    competent: '≥85分',
    backbone: '≥90分',
    expert: '≥95分',
    basis: '教学质量评价',
    status: 'enabled',
  },
  {
    key: 'listening-hours',
    name: '听课课时（课时/学期）',
    novice: '≥8',
    competent: '≥16',
    backbone: '≥24',
    expert: '≥32',
    basis: '教学活动记录',
    status: 'enabled',
  },
  {
    key: 'teaching-compliance',
    name: '教学规范执行',
    novice: '≥80%',
    competent: '≥90%',
    backbone: '≥95%',
    expert: '≥98%',
    basis: '教学规范检查',
    status: 'enabled',
  },
  {
    key: 'teaching-resource-construction',
    name: '教学资源建设（门/年）',
    novice: '≥1',
    competent: '≥2',
    backbone: '≥3',
    expert: '≥5',
    basis: '课程资源记录',
    status: 'enabled',
  },
  {
    key: 'it-teaching-level',
    name: '信息化教学应用水平',
    novice: '≥60分',
    competent: '≥75分',
    backbone: '≥85分',
    expert: '≥95分',
    basis: '信息化应用评价',
    status: 'enabled',
  },
]

const selectedAbility = ref('teaching-design')
const selectedIndicator = ref<Indicator | null>(null)
const expandedAbilityKeys = ref<Set<string>>(new Set(['teaching']))

// 数据映射：将旧的 Indicator 类型映射为新的 AbilityIndicator 类型
const normalizedIndicators = computed<AbilityIndicator[]>(() =>
  indicators.map(item => ({
    key: item.key,
    name: item.name,
    novice: item.novice,
    competent: item.competent,
    backbone: item.backbone,
    expert: item.expert,
    basisLabel: item.basis,
    status: item.status,
  })),
)

function selectAbility(key: string) {
  selectedAbility.value = key
}

function selectIndicator(indicator: AbilityIndicator) {
  selectedIndicator.value = indicator as unknown as Indicator
}

function editIndicator(indicator: AbilityIndicator) {
  console.log('编辑指标：', indicator)
}

function isAbilityExpanded(key: string) {
  return expandedAbilityKeys.value.has(key)
}

function toggleAbilityGroup(key: string) {
  const next = new Set(expandedAbilityKeys.value)

  if (next.has(key)) {
    next.delete(key)
  } else {
    next.add(key)
  }

  expandedAbilityKeys.value = next
}

function findSelectedAbility() {
  for (const item of abilityTree) {
    if (item.key === selectedAbility.value) {
      return { label: item.label, icon: item.icon }
    }

    const child = item.children?.find(childItem => childItem.key === selectedAbility.value)
    if (child) {
      return { label: `${item.label} / ${child.label}`, icon: item.icon }
    }
  }

  return { label: '', icon: iconAbilityStructure }
}

function getSelectedAbilityLabel() {
  return findSelectedAbility().label
}

function getSelectedAbilityIcon() {
  return findSelectedAbility().icon
}



function goToOptimization() {
  router.push('/admin/ability-list/base/optimization')
}

function goToVersionHistory() {
  console.log('查看版本记录')
}

function deriveExecutionVersion() {
  console.log('派生执行版')
}

</script>

<template>
  <AdminLayout active-key="ability-list-base">
    <div class="base-page">
      <section class="base-hero admin-hero">
        <div
          class="hero-art"
          :style="{ backgroundImage: `url(${baseHeroArt})` }"
          aria-hidden="true"
        />

        <div class="hero-content">
          <div class="hero-emblem">
            <img class="hero-emblem-img" :src="baseHeroEmblem" alt="" />
          </div>

          <div class="hero-main">
            <div class="hero-title-group">
              <div class="hero-title-row">
                <h1>教师能力清单基准模板 V1.0</h1>
                <span class="badge-status badge-success">已启用</span>
              </div>
              <p class="hero-subtitle">
                维护学校长期使用的教师能力标准，用于派生年度、聘期或建设周期执行版。
              </p>
            </div>

            <div class="hero-summary-strip admin-summary-strip">
              <div class="summary-item admin-summary-item">
                <span class="admin-summary-label">最近更新</span>
                <strong class="admin-summary-value">2026-06-08 20:30</strong>
              </div>
              <div class="summary-item admin-summary-item summary-structure">
                <span class="admin-summary-label">能力结构</span>
                <strong class="admin-summary-value">
                  基本能力 + 教学能力 + 教研能力 + 实践能力 + 服务能力
                </strong>
              </div>
              <div class="summary-item admin-summary-item">
                <span class="admin-summary-label">当前指标</span>
                <strong class="admin-summary-value">69 项</strong>
              </div>
            </div>

            <div class="hero-actions">
              <button class="primary-action btn-primary" @click="goToOptimization">
                优化基准模板
              </button>
              <button class="secondary-action btn-secondary" @click="goToVersionHistory">
                查看版本记录
              </button>
              <button class="derive-action" @click="deriveExecutionVersion">
                派生执行版
                <span aria-hidden="true">›</span>
              </button>
            </div>

            <p class="hero-note">
              可基于制度文件和运行反馈形成优化建议，确认后再应用到基准模板。
            </p>
          </div>
        </div>
      </section>

      <AbilityListWorkspace
        :nodes="abilityTree"
        :selected-key="selectedAbility"
        :selected-title="getSelectedAbilityLabel()"
        :selected-icon="getSelectedAbilityIcon()"
        :indicators="normalizedIndicators"
        basis-column-title="建议依据"
        :default-expanded-keys="['teaching']"
        @select-ability="selectAbility"
        @row-click="selectIndicator"
        @edit-indicator="editIndicator"
      />
    </div>
  </AdminLayout>
</template>

<style scoped>
.base-page {
  display: flex;
  width: 100%;
  min-height: calc(100vh - var(--admin-topbar-height) - var(--admin-page-gutter-y) * 2);
  flex-direction: column;
  gap: clamp(14px, 1vw, 18px);
}

.base-hero {
  position: relative;
  overflow: hidden;
  min-height: clamp(230px, 15.5vw, 270px);
}

.base-hero::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.995) 34%,
    rgba(255, 255, 255, 0.95) 50%,
    rgba(255, 255, 255, 0.78) 64%,
    rgba(255, 255, 255, 0.34) 82%,
    rgba(255, 255, 255, 0) 100%
  );
  content: '';
}

.base-hero::after {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: min(260px, 22%);
  height: 78px;
  pointer-events: none;
  background-image: radial-gradient(#b7d4ff 1px, transparent 1px);
  background-size: 12px 12px;
  opacity: 0.08;
  content: '';
}

.hero-art {
  position: absolute;
  top: clamp(10px, 0.8vw, 16px);
  right: clamp(18px, 1.5vw, 30px);
  bottom: clamp(10px, 0.8vw, 16px);
  z-index: 0;
  width: min(48%, 720px);
  background-repeat: no-repeat;
  background-position: right center;
  background-size: contain;
  opacity: 0.88;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  min-height: clamp(230px, 15.5vw, 270px);
  max-width: min(820px, 60%);
  align-items: center;
  gap: clamp(18px, 1.2vw, 26px);
  padding: 0 0 0 clamp(24px, 1.75vw, 34px);
}

.hero-emblem {
  flex: none;
  transform: translateY(-44px);
}

.hero-emblem-img {
  display: block;
  width: clamp(66px, 4vw, 78px);
  height: clamp(66px, 4vw, 78px);
  filter: drop-shadow(0 16px 26px rgba(11, 99, 246, 0.18));
}

.hero-main {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  justify-content: center;
}

.hero-title-group {
  min-width: 0;
}

.hero-title-row {
  display: flex;
  align-items: center;
  gap: clamp(10px, 0.72vw, 14px);
  margin-bottom: 6px;
}

.hero-title-row h1 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: clamp(22px, 1.45vw, 28px);
  font-weight: 950;
  letter-spacing: -0.55px;
  line-height: 1.16;
  white-space: nowrap;
}

.hero-subtitle {
  max-width: 560px;
  margin: 0;
  color: var(--color-text-secondary);
  font-size: clamp(12px, 0.75vw, 14px);
  font-weight: 700;
  line-height: 1.5;
}

.hero-summary-strip {
  display: flex;
  width: 100%;
  max-width: 100%;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px 18px;
  margin-top: clamp(14px, 0.95vw, 18px);
  overflow: visible;
  border: 0;
  background: transparent;
  box-shadow: none;
  padding: 0;
}

.hero-summary-strip .admin-summary-item {
  display: inline-flex;
  min-width: 0;
  align-items: flex-start;
  gap: 8px;
  background: transparent;
  border: 0;
  padding: 0;
  white-space: normal;
}

.hero-summary-strip .admin-summary-item + .admin-summary-item {
  margin-left: 0;
  padding-left: 0;
  border-left: 0;
}

.summary-structure {
  max-width: none;
  flex: 1 1 auto;
  min-width: 0;
}

.summary-structure .admin-summary-value {
  overflow: visible;
  text-overflow: unset;
  white-space: normal;
  word-break: break-all;
  line-height: 1.5;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: clamp(10px, 0.7vw, 14px);
  margin-top: clamp(14px, 0.95vw, 18px);
}

.hero-actions button {
  white-space: nowrap;
}

.derive-action {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 0;
  background: transparent;
  color: var(--color-primary);
  cursor: pointer;
  font-size: 14px;
  font-weight: 900;
}

.derive-action:hover {
  color: var(--color-primary-hover);
}

.hero-note {
  margin: 10px 0 0;
  max-width: 760px;
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.6;
}

@media (max-width: 1280px) {
  .hero-content {
    max-width: 72%;
  }

  .hero-art {
    width: min(42%, 560px);
    opacity: 0.78;
  }
}
</style>
