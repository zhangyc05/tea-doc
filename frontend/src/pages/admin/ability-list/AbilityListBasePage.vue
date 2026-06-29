<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
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

function selectAbility(key: string) {
  selectedAbility.value = key
}

function selectIndicator(indicator: Indicator) {
  selectedIndicator.value = indicator
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

function getSelectedAbilityDescription() {
  const descriptions: Record<string, string> = {
    'teaching-design': '聚焦教学目标设计、教学过程组织与实施，作为教师教学能力发展的长期标准参考。',
    'teaching-resource': '评估教学资源开发与应用能力，包括课程设计、教材编写、数字化资源建设等。',
    'teaching-evaluation': '关注教学评价能力，包括学生学习评价、教学反思、教学改进等。',
    'teaching-innovation': '评估教学创新与改进能力，包括教学方法创新、技术应用创新等。',
  }

  return descriptions[selectedAbility.value] || ''
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

function editIndicator(indicator: Indicator) {
  console.log('编辑指标：', indicator)
}

function showIndicatorDescription() {
  console.log('显示指标说明')
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

      <div class="main-workspace">
        <aside class="ability-structure-panel admin-card">
          <header class="admin-card-header">
            <span class="card-icon admin-card-icon">
              <img class="title-icon" :src="iconAbilityStructure" alt="" />
            </span>
            <h3 class="admin-card-title">能力结构</h3>
          </header>

          <div class="ability-tree">
            <div v-for="item in abilityTree" :key="item.key" class="ability-tree-item">
              <button
                v-if="!item.children"
                class="ability-node"
                :class="{ active: selectedAbility === item.key }"
                type="button"
                @click="selectAbility(item.key)"
              >
                <img class="ability-icon" :src="item.icon" alt="" />
                <span>{{ item.label }}</span>
                <span class="ability-arrow ability-arrow-leaf" aria-hidden="true">›</span>
              </button>

              <div v-else class="ability-group">
                <button
                  class="ability-parent"
                  :class="{
                    active: item.children.some(child => child.key === selectedAbility),
                    expanded: isAbilityExpanded(item.key),
                  }"
                  type="button"
                  @click="toggleAbilityGroup(item.key)"
                >
                  <img class="ability-icon" :src="item.icon" alt="" />
                  <span>{{ item.label }}</span>
                  <span class="ability-arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16">
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </span>
                </button>

                <div v-if="isAbilityExpanded(item.key)" class="ability-children">
                  <button
                    v-for="child in item.children"
                    :key="child.key"
                    class="ability-child"
                    :class="{ active: selectedAbility === child.key }"
                    type="button"
                    @click="selectAbility(child.key)"
                  >
                    <span>{{ child.label }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section class="indicators-panel admin-card">
          <header class="indicator-header admin-card-header">
            <div class="title-with-icon">
              <span class="card-icon admin-card-icon">
                <img class="title-icon" :src="getSelectedAbilityIcon()" alt="" />
              </span>
              <div>
                <h3 class="admin-card-title">{{ getSelectedAbilityLabel() }}</h3>
                <p v-if="getSelectedAbilityDescription()" class="ability-description">
                  {{ getSelectedAbilityDescription() }}
                </p>
              </div>
            </div>
            <button class="btn-link" @click="showIndicatorDescription">指标说明</button>
          </header>

          <div class="admin-table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>指标名称</th>
                  <th>新手</th>
                  <th>胜任</th>
                  <th>骨干</th>
                  <th>名师</th>
                  <th>建议依据</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="indicator in indicators"
                  :key="indicator.key"
                  class="admin-table-row"
                  :class="{ active: selectedIndicator?.key === indicator.key }"
                  @click="selectIndicator(indicator)"
                >
                  <td class="name-cell">{{ indicator.name }}</td>
                  <td>{{ indicator.novice }}</td>
                  <td>{{ indicator.competent }}</td>
                  <td>{{ indicator.backbone }}</td>
                  <td>{{ indicator.expert }}</td>
                  <td>{{ indicator.basis }}</td>
                  <td>
                    <span class="badge-status badge-success">已启用</span>
                  </td>
                  <td>
                    <button class="btn-link" @click.stop="editIndicator(indicator)">编辑</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
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
  transform: translateY(-24px);
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
  display: inline-flex;
  width: fit-content;
  max-width: 100%;
  align-items: center;
  gap: 0;
  margin-top: clamp(14px, 0.95vw, 18px);
  overflow: hidden;
}

.hero-summary-strip .admin-summary-item {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.hero-summary-strip .admin-summary-item + .admin-summary-item {
  margin-left: 14px;
  padding-left: 14px;
  border-left: 1px solid rgba(127, 150, 190, 0.22);
}

.summary-structure {
  max-width: 360px;
}

.summary-structure .admin-summary-value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.main-workspace {
  display: grid;
  grid-template-columns: minmax(270px, 21.5%) minmax(0, 1fr);
  gap: clamp(18px, 1.25vw, 24px);
}

.ability-structure-panel {
  min-height: clamp(280px, 18vw, 340px);
  padding: clamp(18px, 1.2vw, 22px) clamp(16px, 1.1vw, 20px);
}

.indicators-panel {
  min-width: 0;
  min-height: clamp(280px, 18vw, 340px);
  padding: clamp(18px, 1.2vw, 22px) clamp(18px, 1.2vw, 22px) clamp(20px, 1.4vw, 26px);
}

.card-icon {
  flex: none;
}

.title-icon {
  width: 22px;
  height: 22px;
  display: block;
}

.ability-tree {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 12px;
}

.ability-tree-item {
  display: flex;
  flex-direction: column;
}

.ability-node,
.ability-parent,
.ability-child {
  display: flex;
  width: 100%;
  align-items: center;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #263856;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 800;
  text-align: left;
  transition: all 0.16s ease;
}

.ability-node,
.ability-parent {
  gap: 10px;
  min-height: 40px;
  padding: 8px 10px;
}

.ability-node:hover,
.ability-parent:hover,
.ability-child:hover {
  background: #f5f8ff;
  color: var(--color-primary);
}

.ability-node.active,
.ability-parent.active,
.ability-child.active {
  color: var(--color-primary);
}

.ability-node.active,
.ability-child.active {
  background: #eef5ff;
}

.ability-icon {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
}

.ability-arrow {
  display: inline-flex;
  width: 22px;
  height: 22px;
  margin-left: auto;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #8b98aa;
  transition: all 0.16s ease;
}

.ability-arrow svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.2;
  transition: transform 0.16s ease;
}

.ability-parent.expanded .ability-arrow svg {
  transform: rotate(180deg);
}

.ability-node:hover .ability-arrow,
.ability-parent:hover .ability-arrow,
.ability-parent.active .ability-arrow {
  color: var(--color-primary);
}

.ability-arrow-leaf {
  font-size: 20px;
  line-height: 1;
}

.ability-children {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 4px 0 8px 22px;
  padding-left: 18px;
}

.ability-children::before {
  position: absolute;
  left: 5px;
  top: 12px;
  bottom: 12px;
  width: 2px;
  border-radius: 999px;
  background: #c8d1e1;
  content: '';
}

.ability-child {
  position: relative;
  min-height: 36px;
  padding: 0 12px 0 14px;
}

.ability-child::before {
  position: absolute;
  left: -17px;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #aeb8c8;
  box-shadow: 0 0 0 4px #fff;
  content: '';
}

.ability-child.active::before {
  background: var(--color-primary);
  box-shadow: 0 0 0 4px #eef5ff;
}

.indicator-header {
  justify-content: space-between;
  gap: 16px;
  margin-bottom: clamp(12px, 0.9vw, 16px);
}

.title-with-icon {
  display: flex;
  min-width: 0;
  align-items: flex-start;
  gap: clamp(10px, 0.7vw, 14px);
}

.ability-description {
  margin: 6px 0 0;
  color: #7d899b;
  font-size: 13px;
  font-weight: 650;
  line-height: 1.6;
}

.name-cell {
  font-weight: 850;
}

.admin-table th:first-child,
.admin-table td:first-child {
  width: 25%;
}

.admin-table th:nth-child(2),
.admin-table td:nth-child(2),
.admin-table th:nth-child(3),
.admin-table td:nth-child(3),
.admin-table th:nth-child(4),
.admin-table td:nth-child(4),
.admin-table th:nth-child(5),
.admin-table td:nth-child(5) {
  width: 9.5%;
  text-align: center;
}

.admin-table th:nth-child(6),
.admin-table td:nth-child(6) {
  width: 17%;
  text-align: center;
}

.admin-table th:nth-child(7),
.admin-table td:nth-child(7),
.admin-table th:nth-child(8),
.admin-table td:nth-child(8) {
  width: 10%;
  text-align: center;
}

.admin-table-row {
  cursor: pointer;
}

.admin-table-row.active,
.admin-table-row:hover {
  background: #f5f8ff;
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
