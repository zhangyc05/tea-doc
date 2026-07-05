<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { AdminIcon, AdminInput, AdminSelect, AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { DetailSheet, StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AbilityListWorkspace from '@/components/admin/ability-list/AbilityListWorkspace.vue'
import type { AbilityIndicator } from '@/components/admin/ability-list/types'
import { useOperationMessage } from '@/lib/operationMessage'
import { getAbilityListBaseMock, getAbilityListOptimizationMock } from '@/services/mock/ability-list'
import {
  adoptOptimizationSuggestion,
  applyAdoptedSuggestionsToBaseTemplate,
  confirmBaseTemplateChanges,
  getAbilityListState,
  importPolicySuggestion,
  rerunFeedbackAnalysis,
  updateBaseTemplateIndicator,
  updateOptimizationSuggestionStatus,
  type OptimizationSuggestion,
} from '@/stores/admin/abilityListStore'
import baseHeroArt from '@/assets/admin/ability-list-base-assets/ability-list-base-hero-art.png'
import baseHeroEmblem from '@/assets/admin/ability-list-base-assets/ability-list-base-hero-emblem.svg'
import iconAbilityStructure from '@/assets/admin/ability-list-base-assets/icons/icon-ability-structure.svg'
import iconAbilityBasic from '@/assets/admin/ability-list-base-assets/icons/icon-ability-basic.svg'
import iconAbilityTeaching from '@/assets/admin/ability-list-base-assets/icons/icon-ability-teaching.svg'
import iconAbilityResearch from '@/assets/admin/ability-list-base-assets/icons/icon-ability-research.svg'
import iconAbilityPractice from '@/assets/admin/ability-list-base-assets/icons/icon-ability-practice.svg'
import iconAbilityService from '@/assets/admin/ability-list-base-assets/icons/icon-ability-service.svg'

const route = useRoute()
const abilityListState = getAbilityListState()
const operationMessage = useOperationMessage()

const { abilityTree } = getAbilityListBaseMock({
  basic: iconAbilityBasic,
  teaching: iconAbilityTeaching,
  research: iconAbilityResearch,
  practice: iconAbilityPractice,
  service: iconAbilityService,
})
const { suggestionSources, filterTags } = getAbilityListOptimizationMock()

const defaultAbilityGroupKey = abilityTree[0]?.key ?? ''
const defaultAbilityKey = abilityTree[0]?.children?.[0]?.key ?? defaultAbilityGroupKey
const selectedAbility = ref(defaultAbilityKey)
const selectedIndicator = ref<AbilityIndicator | null>(null)
const editingIndicator = ref<AbilityIndicator | null>(null)
const editErrors = ref<Record<string, string>>({})
const showVersionDrawer = ref(false)
const optimizationSectionRef = ref<HTMLElement | null>(null)
const selectedSource = ref('all')
const selectedSuggestionId = ref('suggestion-enterprise-practice')
const selectedTag = ref('all')
const indicatorStatusOptions = [
  { label: '已启用', value: 'enabled' },
  { label: '已禁用', value: 'disabled' },
  { label: '草稿', value: 'draft' },
]

// 数据映射：将旧的 Indicator 类型映射为新的 AbilityIndicator 类型
const normalizedIndicators = computed<AbilityIndicator[]>(() => abilityListState.baseTemplateIndicators)
const filteredIndicators = computed<AbilityIndicator[]>(() => (
  normalizedIndicators.value.filter(indicator => indicator.abilityKey === selectedAbility.value)
))
const versionRows = computed(() => [
  abilityListState.baseTemplateVersion,
  ...abilityListState.baseTemplateVersionHistory,
])
const pendingChangeRows = computed(() => abilityListState.pendingBaseTemplateChanges)
const optimizationPendingCount = computed(() => (
  abilityListState.optimizationSuggestions.filter(suggestion => suggestion.status === 'pending' || suggestion.status === 'adopted').length
))
const suggestions = computed(() => abilityListState.optimizationSuggestions)
const pendingApplicationCount = computed(() => abilityListState.pendingTemplateApplications.length)
const selectedSuggestion = computed(() => {
  return suggestions.value.find((item) => item.id === selectedSuggestionId.value) ?? suggestions.value[0]
})
const filteredSuggestions = computed(() => {
  let result = suggestions.value

  if (selectedSource.value !== 'all') {
    result = result.filter((suggestion) => suggestion.source === selectedSource.value)
  }

  if (selectedTag.value !== 'all') {
    const tagMap: Record<string, string> = {
      missing: '标准缺失',
      unclear: '标准不清',
      duplicate: '标准重复',
      wide: '标准过宽',
      mapping: '要求映射问题',
    }
    result = result.filter((suggestion) => suggestion.issueType === tagMap[selectedTag.value])
  }

  return result
})

watch(
  () => route.query.versionHistory,
  (value) => {
    if (value === '1') {
      showVersionDrawer.value = true
    }
  },
  { immediate: true },
)

watch(
  () => route.query.optimization,
  (value) => {
    if (value === '1') {
      nextTick(scrollToOptimization)
    }
  },
  { immediate: true },
)

function selectAbility(key: string) {
  selectedAbility.value = key
}

function selectIndicator(indicator: AbilityIndicator) {
  selectedIndicator.value = indicator
}

function editIndicator(indicator: AbilityIndicator) {
  editingIndicator.value = { ...indicator }
  editErrors.value = {}
}

function closeEditDrawer() {
  editingIndicator.value = null
  editErrors.value = {}
}

function validateIndicatorEdit() {
  if (!editingIndicator.value) return false

  const fields: Array<{ key: keyof AbilityIndicator, message: string }> = [
    { key: 'name', message: '请输入指标名称' },
    { key: 'novice', message: '请输入新手标准' },
    { key: 'competent', message: '请输入胜任标准' },
    { key: 'backbone', message: '请输入骨干标准' },
    { key: 'expert', message: '请输入名师标准' },
    { key: 'basisLabel', message: '请输入建议依据' },
  ]
  const nextErrors: Record<string, string> = {}

  fields.forEach((field) => {
    const value = editingIndicator.value?.[field.key]
    if (typeof value !== 'string' || value.trim() === '') {
      nextErrors[field.key] = field.message
    }
  })

  editErrors.value = nextErrors
  return Object.keys(nextErrors).length === 0
}

function saveIndicatorEdit() {
  if (!editingIndicator.value) return
  if (!validateIndicatorEdit()) return

  updateBaseTemplateIndicator(editingIndicator.value.key, {
    name: editingIndicator.value.name,
    novice: editingIndicator.value.novice,
    competent: editingIndicator.value.competent,
    backbone: editingIndicator.value.backbone,
    expert: editingIndicator.value.expert,
    basisLabel: editingIndicator.value.basisLabel,
    status: editingIndicator.value.status,
  })
  closeEditDrawer()
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



function scrollToOptimization() {
  optimizationSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function goToVersionHistory() {
  showVersionDrawer.value = true
}

function closeVersionDrawer() {
  showVersionDrawer.value = false
}

function publishNewBaseTemplateVersion() {
  confirmBaseTemplateChanges()
}

function selectSource(key: string) {
  selectedSource.value = key
  operationMessage.set(`已按建议来源筛选出 ${filteredSuggestions.value.length} 条。`)
}

function selectSuggestion(suggestion: OptimizationSuggestion) {
  selectedSuggestionId.value = suggestion.id
  operationMessage.set(`已选中建议：${suggestion.issueType}。`)
}

function selectTag(key: string) {
  selectedTag.value = key
  operationMessage.set(`已按问题类型筛选出 ${filteredSuggestions.value.length} 条。`)
}

function handleSuggestionAction(action: string, suggestion: OptimizationSuggestion) {
  if (action === 'view') {
    selectSuggestion(suggestion)
    operationMessage.set('已在右侧展示建议详情。')
    return
  }

  if (action === 'adopt') {
    adoptOptimizationSuggestion(suggestion.id)
    selectedSuggestionId.value = suggestion.id
    operationMessage.fromStore(abilityListState)
    return
  }

  if (action === 'defer') {
    updateOptimizationSuggestionStatus(suggestion.id, 'deferred')
    operationMessage.set('该建议已暂缓处理。')
    return
  }

  if (action === 'reject') {
    updateOptimizationSuggestionStatus(suggestion.id, 'rejected')
    operationMessage.set('该建议已弃用。')
  }
}

function applyToBaseTemplate() {
  applyAdoptedSuggestionsToBaseTemplate()
  operationMessage.fromStore(abilityListState)
}

function uploadPolicy() {
  importPolicySuggestion()
  selectedSource.value = 'policy'
  selectedSuggestionId.value = abilityListState.optimizationSuggestions[0]?.id ?? selectedSuggestionId.value
  operationMessage.fromStore(abilityListState)
}

function rerunAnalysis() {
  rerunFeedbackAnalysis()
  selectedSource.value = 'feedback'
  selectedSuggestionId.value = abilityListState.optimizationSuggestions[0]?.id ?? selectedSuggestionId.value
  operationMessage.fromStore(abilityListState)
}

function suggestionRowClassName({ row }: { row: OptimizationSuggestion }) {
  return selectedSuggestion.value?.id === row.id ? 'admin-table-row active' : 'admin-table-row'
}

</script>

<template>
  <AdminLayout active-key="ability-list-base">
    <div class="base-page">
      <section class="base-hero admin-hero">
        <div
          class="hero-art"
          aria-hidden="true"
        >
          <img :src="baseHeroArt" alt="" />
        </div>

        <div class="hero-content">
          <div class="hero-emblem">
            <img class="hero-emblem-img" :src="baseHeroEmblem" alt="" />
          </div>

          <div class="hero-main">
            <div class="hero-title-group">
              <div class="hero-title-row">
                <h1>{{ abilityListState.baseTemplateVersion.title }}</h1>
                <button class="title-link" type="button" @click="goToVersionHistory">
                  查看版本记录
                </button>
              </div>
              <p class="hero-subtitle">
                维护学校长期使用的教师能力标准，作为年度执行版能力清单的来源。
              </p>
            </div>

            <div class="hero-summary-strip admin-summary-strip">
              <div class="summary-item admin-summary-item">
                <span class="admin-summary-label">最近更新</span>
                <strong class="admin-summary-value">{{ abilityListState.baseTemplateVersion.updatedAt }}</strong>
              </div>
            </div>

            <div class="hero-actions">
              <Button class="primary-action" @click="scrollToOptimization">
                优化建议（{{ optimizationPendingCount }}）
              </Button>
              <Button
                v-if="pendingChangeRows.length > 0"
                variant="secondary"
                @click="publishNewBaseTemplateVersion"
              >
                发布新版本（{{ pendingChangeRows.length }}）
              </Button>
            </div>

            <p v-if="pendingChangeRows.length > 0" class="hero-revision-note">
              当前有 {{ pendingChangeRows.length }} 项修订草稿，发布后生成新的基准模板版本。
            </p>
          </div>
        </div>

        <div class="hero-metrics" aria-label="能力清单统计">
          <div class="hero-metric-card">
            <strong>5</strong>
            <span>能力维度</span>
          </div>
          <div class="hero-metric-card">
            <strong>19</strong>
            <span>能力要素</span>
          </div>
          <div class="hero-metric-card">
            <strong>71</strong>
            <span>能力指标</span>
          </div>
        </div>
      </section>

      <AbilityListWorkspace
        :nodes="abilityTree"
        :selected-key="selectedAbility"
        :selected-title="getSelectedAbilityLabel()"
        :selected-icon="getSelectedAbilityIcon()"
        :indicators="filteredIndicators"
        basis-column-title="计算依据"
        :default-expanded-keys="[defaultAbilityGroupKey]"
        @select-ability="selectAbility"
        @row-click="selectIndicator"
        @edit-indicator="editIndicator"
      />

      <section ref="optimizationSectionRef" class="optimization-workspace admin-card">
        <div class="optimization-header">
          <div>
            <h2>优化建议</h2>
            <p>制度文件、运行反馈和人工建议在本页处理；采纳后形成基准模板修订草稿，发布新版本后生效。</p>
          </div>
          <div class="optimization-toolbar">
            <Button @click="uploadPolicy">上传制度文件</Button>
            <Button variant="secondary" @click="rerunAnalysis">重新分析运行反馈</Button>
            <Button
              variant="secondary"
              :disabled="pendingApplicationCount === 0"
              @click="applyToBaseTemplate"
            >
              形成修订草稿（{{ pendingApplicationCount }}）
            </Button>
          </div>
        </div>
        <div class="optimization-grid">
          <aside class="source-panel">
            <h3>建议来源</h3>
            <div class="source-list">
              <button
                v-for="source in suggestionSources"
                :key="source.key"
                class="source-item"
                :class="{ active: selectedSource === source.key }"
                @click="selectSource(source.key)"
              >
                <span><AdminIcon :name="source.icon" /></span>
                {{ source.label }}
              </button>
            </div>
          </aside>

          <section class="suggestions-panel">
            <div class="filter-tags">
              <button
                v-for="tag in filterTags"
                :key="tag.key"
                class="filter-tag"
                :class="{ active: selectedTag === tag.key }"
                @click="selectTag(tag.key)"
              >
                {{ tag.label }}
              </button>
            </div>

            <AdminTable
              :data="filteredSuggestions"
              row-key="id"
              :row-class-name="suggestionRowClassName"
              empty-text="暂无符合条件的优化建议"
              @row-click="selectSuggestion"
            >
              <AdminTableColumn label="来源" min-width="96">
                <template #default="{ row }">
                  <span class="source-badge" :class="row.source">{{ row.sourceLabel }}</span>
                </template>
              </AdminTableColumn>
              <AdminTableColumn label="问题类型" min-width="112">
                <template #default="{ row }">
                  <span class="issue-badge">{{ row.issueType }}</span>
                </template>
              </AdminTableColumn>
              <AdminTableColumn prop="keyLocation" label="关键位置" min-width="150" />
              <AdminTableColumn prop="content" label="建议内容" min-width="220" />
              <AdminTableColumn label="处理状态" min-width="108">
                <template #default="{ row }">
                  <StatusBadge :status="row.status" />
                </template>
              </AdminTableColumn>
            </AdminTable>
          </section>

          <aside class="suggestion-detail-panel">
            <h3>建议详情</h3>
            <div v-if="selectedSuggestion" class="suggestion-detail">
              <div class="detail-item">
                <span>建议来源</span>
                <strong>{{ selectedSuggestion.sourceLabel }}</strong>
              </div>
              <div class="detail-item">
                <span>问题类型</span>
                <strong>{{ selectedSuggestion.issueType }}</strong>
              </div>
              <div class="detail-item">
                <span>关键位置</span>
                <strong>{{ selectedSuggestion.keyLocation }}</strong>
              </div>
              <div class="detail-item">
                <span>建议内容</span>
                <strong>{{ selectedSuggestion.content }}</strong>
              </div>
              <div class="detail-item">
                <span>来源依据</span>
                <strong>{{ selectedSuggestion.basis }}</strong>
              </div>
            </div>

            <div v-if="selectedSuggestion" class="detail-actions">
              <Button
                v-if="selectedSuggestion.status === 'pending'"
                @click="handleSuggestionAction('adopt', selectedSuggestion)"
              >
                采纳建议
              </Button>
              <Button
                v-if="selectedSuggestion.status === 'adopted'"
                @click="applyToBaseTemplate"
              >
                形成修订草稿
              </Button>
              <Button
                v-if="selectedSuggestion.status === 'pending'"
                variant="secondary"
                @click="handleSuggestionAction('defer', selectedSuggestion)"
              >
                暂缓处理
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <DetailSheet
        :open="Boolean(editingIndicator)"
        title="编辑基准模板指标"
        width="form"
        mode="edit"
        @update:open="value => { if (!value) closeEditDrawer() }"
        @cancel="closeEditDrawer"
        @confirm="saveIndicatorEdit"
      >
        <div v-if="editingIndicator" class="drawer-form drawer-form-in-sheet">
          <p class="form-tip">保存后会形成待确认调整，后续可派生到执行版。</p>
          <div class="form-group">
            <label class="form-label">指标名称 <span class="required-mark">*</span></label>
            <AdminInput v-model="editingIndicator.name" class="form-input" :aria-invalid="Boolean(editErrors.name)" />
            <p v-if="editErrors.name" class="form-error">{{ editErrors.name }}</p>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">新手 <span class="required-mark">*</span></label>
              <AdminInput v-model="editingIndicator.novice" class="form-input" :aria-invalid="Boolean(editErrors.novice)" />
              <p v-if="editErrors.novice" class="form-error">{{ editErrors.novice }}</p>
            </div>
            <div class="form-group">
              <label class="form-label">胜任 <span class="required-mark">*</span></label>
              <AdminInput v-model="editingIndicator.competent" class="form-input" :aria-invalid="Boolean(editErrors.competent)" />
              <p v-if="editErrors.competent" class="form-error">{{ editErrors.competent }}</p>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">骨干 <span class="required-mark">*</span></label>
              <AdminInput v-model="editingIndicator.backbone" class="form-input" :aria-invalid="Boolean(editErrors.backbone)" />
              <p v-if="editErrors.backbone" class="form-error">{{ editErrors.backbone }}</p>
            </div>
            <div class="form-group">
              <label class="form-label">名师 <span class="required-mark">*</span></label>
              <AdminInput v-model="editingIndicator.expert" class="form-input" :aria-invalid="Boolean(editErrors.expert)" />
              <p v-if="editErrors.expert" class="form-error">{{ editErrors.expert }}</p>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">建议依据 <span class="required-mark">*</span></label>
            <AdminInput v-model="editingIndicator.basisLabel" class="form-input" :aria-invalid="Boolean(editErrors.basisLabel)" />
            <p v-if="editErrors.basisLabel" class="form-error">{{ editErrors.basisLabel }}</p>
          </div>
          <div class="form-group">
            <label class="form-label">状态</label>
            <AdminSelect
              v-model="editingIndicator.status"
              class="form-select"
              :options="indicatorStatusOptions"
              :clearable="false"
            />
          </div>
        </div>

        <template #footer>
          <Button variant="outline" @click="closeEditDrawer">取消</Button>
          <Button @click="saveIndicatorEdit">保存调整</Button>
        </template>
      </DetailSheet>

      <DetailSheet
        :open="showVersionDrawer"
        title="基准模板版本记录"
        description="展示基准能力清单的正式版本历史。修订草稿需在页面头部发布后才会生成新版本。"
        width="history"
        :show-footer="false"
        @update:open="value => { if (!value) closeVersionDrawer() }"
        @cancel="closeVersionDrawer"
      >
        <div class="version-list version-list-in-sheet">
          <article v-for="version in versionRows" :key="version.versionNo" class="version-card">
            <div class="version-card-head">
              <strong>{{ version.versionNo }}</strong>
              <span class="version-status" :class="{ current: version.status === 'current' }">
                {{ version.status === 'current' ? '当前版本' : '历史版本' }}
              </span>
            </div>
            <h4>{{ version.title }}</h4>
            <dl>
              <div>
                <dt>更新时间</dt>
                <dd>{{ version.updatedAt }}</dd>
              </div>
              <div>
                <dt>变更摘要</dt>
                <dd>{{ version.changeSummary }}</dd>
              </div>
              <div>
                <dt>操作人</dt>
                <dd>{{ version.operator }}</dd>
              </div>
            </dl>
          </article>
        </div>

      </DetailSheet>
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
  min-height: var(--admin-hero-height-default);
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
  top: 0;
  right: clamp(18px, 1.5vw, 30px);
  bottom: 0;
  z-index: 0;
  width: min(46%, 680px);
  overflow: hidden;
  opacity: 0.82;
}

.hero-art img {
  position: absolute;
  top: 50%;
  right: -72px;
  display: block;
  width: calc(100% + 72px);
  height: 100%;
  object-fit: contain;
  object-position: right center;
  transform: translateY(-50%);
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  min-height: var(--admin-hero-height-default);
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

.title-link {
  border: 0;
  background: transparent;
  color: var(--color-primary);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 900;
  line-height: 1;
  padding: 2px 0;
}

.title-link:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
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
  gap: var(--space-admin-md) var(--space-admin-card-gap);
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
  gap: var(--space-admin-xs);
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

.hero-actions {
  display: flex;
  align-items: center;
  gap: clamp(10px, 0.7vw, 14px);
  margin-top: clamp(14px, 0.95vw, 18px);
}

.hero-actions button {
  white-space: nowrap;
}

.hero-metrics {
  position: absolute;
  top: 50%;
  right: clamp(360px, 24vw, 520px);
  z-index: 2;
  display: grid;
  width: clamp(300px, 22vw, 390px);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-admin-md);
  transform: translateY(-50%);
}

.hero-metric-card {
  display: flex;
  min-height: 82px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-admin-xs);
  border: 1px solid rgba(89, 143, 230, 0.18);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(244, 248, 255, 0.72));
  box-shadow: 0 20px 42px rgba(54, 101, 178, 0.08);
  padding: var(--space-admin-md-lg) var(--space-admin-lg);
}

.hero-metric-card span {
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 800;
  line-height: 1.2;
  text-align: center;
}

.hero-metric-card strong {
  color: var(--color-text-primary);
  font-size: 30px;
  font-weight: 950;
  line-height: 1;
}

.hero-note {
  margin: 10px 0 0;
  max-width: 760px;
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.6;
}

.hero-revision-note {
  margin: 10px 0 0;
  width: fit-content;
  max-width: 100%;
  border: 1px solid rgba(18, 104, 246, 0.14);
  border-radius: var(--radius-pill);
  background: rgba(239, 246, 255, 0.78);
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 850;
  line-height: 1.4;
  padding: 7px 12px;
}

.optimization-workspace {
  scroll-margin-top: calc(var(--admin-topbar-height) + 16px);
  overflow: hidden;
}

.optimization-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-admin-xl);
  border-bottom: 1px solid #e4ebf5;
  padding: var(--space-admin-lg) var(--space-admin-xl);
}

.optimization-header h2,
.optimization-header p {
  margin: 0;
}

.optimization-header h2 {
  color: var(--color-text-primary);
  font-size: 18px;
  font-weight: 950;
}

.optimization-header p {
  margin-top: 5px;
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 750;
  line-height: 1.55;
}

.optimization-toolbar {
  display: flex;
  flex: none;
  align-items: center;
  gap: var(--space-admin-sm);
}

.optimization-grid {
  display: grid;
  grid-template-columns: 176px minmax(520px, 1fr) 320px;
  gap: var(--space-admin-lg);
  padding: var(--space-admin-lg);
}

.source-panel,
.suggestions-panel,
.suggestion-detail-panel {
  min-width: 0;
}

.source-panel,
.suggestion-detail-panel {
  border: 1px solid #e4ebf5;
  border-radius: var(--radius-admin-panel);
  background: #fff;
}

.source-panel h3,
.suggestion-detail-panel h3 {
  margin: 0;
  border-bottom: 1px solid #e4ebf5;
  padding: var(--space-admin-md-lg) var(--space-admin-lg);
  color: var(--color-text-primary);
  font-size: 15px;
  font-weight: 950;
}

.source-list {
  display: grid;
  gap: var(--space-admin-sm);
  padding: var(--space-admin-md);
}

.source-item,
.filter-tag {
  border: 0;
  cursor: pointer;
}

.source-item {
  display: flex;
  min-height: 40px;
  align-items: center;
  gap: var(--space-admin-sm);
  border-radius: var(--radius-sm);
  background: transparent;
  color: #263b63;
  font-size: 13px;
  font-weight: 850;
  padding: 0 12px;
  text-align: left;
}

.source-item span {
  color: var(--color-primary);
}

.source-item.active {
  background: #eaf2ff;
  color: var(--color-primary);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-admin-sm);
  padding: 0 0 var(--space-admin-md);
}

.filter-tag {
  min-height: 32px;
  border: 1px solid #d7e2f2;
  border-radius: var(--radius-sm);
  background: #f7faff;
  color: #4d5d75;
  font-size: 12px;
  font-weight: 850;
  padding: 0 14px;
}

.filter-tag.active {
  border-color: var(--color-primary);
  background: #e8f0ff;
  color: var(--color-primary);
}

.source-badge,
.issue-badge {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 850;
  padding: 3px 8px;
}

.source-badge.feedback {
  background: #e8f0ff;
  color: var(--color-primary);
}

.source-badge.policy {
  background: #dff8ec;
  color: #18a663;
}

.source-badge.manual {
  background: #fff0df;
  color: #f26a16;
}

.issue-badge {
  background: #fff0df;
  color: #f26a16;
}

.suggestion-detail {
  display: grid;
  gap: var(--space-admin-md);
  padding: var(--space-admin-lg);
}

.detail-item {
  display: grid;
  gap: 4px;
}

.detail-item span {
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 850;
}

.detail-item strong {
  color: #263b63;
  font-size: 13px;
  font-weight: 750;
  line-height: 1.55;
}

.detail-actions {
  display: grid;
  gap: var(--space-admin-sm);
  padding: 0 var(--space-admin-lg) var(--space-admin-lg);
}

.drawer-form {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-admin-card-gap);
  overflow-y: auto;
  padding: var(--space-admin-2xl);
}

.drawer-form-in-sheet {
  padding: 0;
}

.form-tip {
  margin: 0;
  border: 1px solid rgba(18, 104, 246, 0.14);
  border-radius: var(--radius-admin-panel);
  background: rgba(239, 246, 255, 0.7);
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 750;
  line-height: 1.55;
  padding: 10px 12px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-admin-md-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-xs);
}

.form-label {
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 850;
}

.required-mark {
  color: #ef4444;
}

.form-input,
.form-select {
  width: 100%;
}

.form-input :deep(.el-input__wrapper),
.form-select :deep(.el-select__wrapper) {
  min-height: 40px;
  border-radius: var(--radius-admin-panel);
  box-shadow: 0 0 0 1px var(--color-admin-border) inset;
  padding: 0 12px;
}

.form-input :deep(.el-input__inner),
.form-select :deep(.el-select__placeholder),
.form-select :deep(.el-select__selected-item) {
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 750;
}

.form-input[aria-invalid='true'] :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #ef4444 inset, 0 0 0 3px rgba(239, 68, 68, 0.12);
}

.form-error {
  margin: -4px 0 0;
  color: #d93030;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.4;
}

.version-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-md-lg);
  overflow-y: auto;
  padding: var(--space-admin-2xl);
}

.version-list-in-sheet {
  padding: 0;
}

.version-card {
  border: 1px solid #e3ebf6;
  border-radius: var(--radius-admin-panel);
  padding: var(--space-admin-lg);
  background: #fff;
}

.version-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-admin-md);
}

.version-card-head strong {
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 950;
}

.version-status {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-pill);
  padding: 4px 8px;
  background: #eef2f7;
  color: #637083;
  font-size: 12px;
  font-weight: 900;
}

.version-status.current {
  background: #e7f8ef;
  color: #23a45c;
}

.version-card h4 {
  margin: 10px 0 14px;
  color: var(--color-text-primary);
  font-size: 16px;
  font-weight: 900;
}

.version-card dl {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-admin-md);
  margin: 0;
}

.version-card dt {
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 800;
}

.version-card dd {
  margin: 4px 0 0;
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 800;
}

@media (max-width: 1280px) {
  .hero-content {
    max-width: 72%;
  }

  .hero-art {
    width: min(42%, 560px);
    opacity: 0.78;
  }

  .optimization-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .optimization-toolbar {
    flex-wrap: wrap;
  }

  .optimization-grid {
    grid-template-columns: 1fr;
  }

  .hero-metrics {
    display: none;
  }
}
</style>
