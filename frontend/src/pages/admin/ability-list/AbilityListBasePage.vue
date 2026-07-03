<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DetailSheet } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AbilityListWorkspace from '@/components/admin/ability-list/AbilityListWorkspace.vue'
import type { AbilityIndicator } from '@/components/admin/ability-list/types'
import { getAbilityListBaseMock } from '@/services/mock/ability-list'
import {
  confirmBaseTemplateChanges,
  deriveNextExecutionVersion,
  getAbilityListState,
  updateBaseTemplateIndicator,
} from '@/stores/admin/abilityListStore'
import baseHeroArt from '@/assets/admin/ability-list-base-assets/ability-list-base-hero-art.png'
import baseHeroEmblem from '@/assets/admin/ability-list-base-assets/ability-list-base-hero-emblem.svg'
import iconAbilityStructure from '@/assets/admin/ability-list-base-assets/icons/icon-ability-structure.svg'
import iconAbilityBasic from '@/assets/admin/ability-list-base-assets/icons/icon-ability-basic.svg'
import iconAbilityTeaching from '@/assets/admin/ability-list-base-assets/icons/icon-ability-teaching.svg'
import iconAbilityResearch from '@/assets/admin/ability-list-base-assets/icons/icon-ability-research.svg'
import iconAbilityPractice from '@/assets/admin/ability-list-base-assets/icons/icon-ability-practice.svg'
import iconAbilityService from '@/assets/admin/ability-list-base-assets/icons/icon-ability-service.svg'

const router = useRouter()
const route = useRoute()
const abilityListState = getAbilityListState()

const { abilityTree } = getAbilityListBaseMock({
  basic: iconAbilityBasic,
  teaching: iconAbilityTeaching,
  research: iconAbilityResearch,
  practice: iconAbilityPractice,
  service: iconAbilityService,
})

const selectedAbility = ref('teaching-implementation')
const selectedIndicator = ref<AbilityIndicator | null>(null)
const editingIndicator = ref<AbilityIndicator | null>(null)
const editErrors = ref<Record<string, string>>({})
const showVersionDrawer = ref(false)
const expandedAbilityKeys = ref<Set<string>>(new Set(['teaching']))

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

watch(
  () => route.query.versionHistory,
  (value) => {
    if (value === '1') {
      showVersionDrawer.value = true
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
  })
  closeEditDrawer()
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
  showVersionDrawer.value = true
}

function closeVersionDrawer() {
  showVersionDrawer.value = false
}

function confirmTemplateChanges() {
  confirmBaseTemplateChanges()
}

function deriveExecutionVersion() {
  deriveNextExecutionVersion()
  router.push('/admin/ability-list/execution/publish-confirm')
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
                <h1>{{ abilityListState.baseTemplateVersion.title }}</h1>
                <button class="title-link" type="button" @click="goToVersionHistory">
                  查看版本记录
                </button>
              </div>
              <p class="hero-subtitle">
                维护学校长期使用的教师能力标准，用于派生执行版能力清单。
              </p>
            </div>

            <div class="hero-summary-strip admin-summary-strip">
              
              <div class="summary-item admin-summary-item summary-structure">
                <span class="admin-summary-label">能力维度</span>
                <strong class="admin-summary-value">5</strong>
              </div>
              <div class="summary-item admin-summary-item">
                <span class="admin-summary-label">能力要素</span>
                <strong class="admin-summary-value">19</strong>
              </div>
              <div class="summary-item admin-summary-item">
                <span class="admin-summary-label">能力指标</span>
                <strong class="admin-summary-value">69</strong>
              </div>
              <div class="summary-item admin-summary-item">
                <span class="admin-summary-label">最近更新</span>
                <strong class="admin-summary-value">{{ abilityListState.baseTemplateVersion.updatedAt }}</strong>
              </div>
            </div>

            <div class="hero-actions">
              <Button class="primary-action" @click="goToOptimization">
                优化基准板
              </Button>
              <Button class="derive-action" variant="ghost" @click="deriveExecutionVersion">
                派生执行版
                <span aria-hidden="true">›</span>
              </Button>
            </div>
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
        :default-expanded-keys="['teaching']"
        @select-ability="selectAbility"
        @row-click="selectIndicator"
        @edit-indicator="editIndicator"
      />

      <DetailSheet
        :open="Boolean(editingIndicator)"
        title="编辑基准模板指标"
        description="保存后会形成待确认调整，后续可派生到执行版。"
        width="form"
        mode="edit"
        @update:open="value => { if (!value) closeEditDrawer() }"
        @cancel="closeEditDrawer"
        @confirm="saveIndicatorEdit"
      >
        <div v-if="editingIndicator" class="drawer-form drawer-form-in-sheet">
          <div class="form-group">
            <label class="form-label">指标名称 <span class="required-mark">*</span></label>
            <input v-model="editingIndicator.name" class="form-input" :aria-invalid="Boolean(editErrors.name)" type="text" />
            <p v-if="editErrors.name" class="form-error">{{ editErrors.name }}</p>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">新手 <span class="required-mark">*</span></label>
              <input v-model="editingIndicator.novice" class="form-input" :aria-invalid="Boolean(editErrors.novice)" type="text" />
              <p v-if="editErrors.novice" class="form-error">{{ editErrors.novice }}</p>
            </div>
            <div class="form-group">
              <label class="form-label">胜任 <span class="required-mark">*</span></label>
              <input v-model="editingIndicator.competent" class="form-input" :aria-invalid="Boolean(editErrors.competent)" type="text" />
              <p v-if="editErrors.competent" class="form-error">{{ editErrors.competent }}</p>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">骨干 <span class="required-mark">*</span></label>
              <input v-model="editingIndicator.backbone" class="form-input" :aria-invalid="Boolean(editErrors.backbone)" type="text" />
              <p v-if="editErrors.backbone" class="form-error">{{ editErrors.backbone }}</p>
            </div>
            <div class="form-group">
              <label class="form-label">名师 <span class="required-mark">*</span></label>
              <input v-model="editingIndicator.expert" class="form-input" :aria-invalid="Boolean(editErrors.expert)" type="text" />
              <p v-if="editErrors.expert" class="form-error">{{ editErrors.expert }}</p>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">建议依据 <span class="required-mark">*</span></label>
            <input v-model="editingIndicator.basisLabel" class="form-input" :aria-invalid="Boolean(editErrors.basisLabel)" type="text" />
            <p v-if="editErrors.basisLabel" class="form-error">{{ editErrors.basisLabel }}</p>
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
        description="展示基准能力清单的正式版本历史；编辑指标会先进入待确认变更，确认后生成新版本。"
        width="history"
        :show-footer="pendingChangeRows.length > 0"
        @update:open="value => { if (!value) closeVersionDrawer() }"
        @cancel="closeVersionDrawer"
      >
        <div v-if="pendingChangeRows.length" class="pending-change-panel">
          <div class="pending-change-head">
            <strong>待确认变更</strong>
            <span>{{ pendingChangeRows.length }} 项</span>
          </div>
          <article v-for="change in pendingChangeRows" :key="change.id" class="pending-change-card">
            <h4>{{ change.indicatorName }}</h4>
            <dl>
              <div>
                <dt>修改时间</dt>
                <dd>{{ change.changedAt }}</dd>
              </div>
              <div>
                <dt>修改人</dt>
                <dd>{{ change.operator }}</dd>
              </div>
              <div>
                <dt>变更摘要</dt>
                <dd>{{ change.before.novice }} / {{ change.before.competent }} → {{ change.after.novice }} / {{ change.after.competent }}</dd>
              </div>
            </dl>
          </article>
        </div>

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

        <template #footer>
          <Button variant="outline" @click="closeVersionDrawer">关闭</Button>
          <Button @click="confirmTemplateChanges">确认生成新版本</Button>
        </template>
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
  color: var(--color-primary);
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

.operation-message {
  display: inline-flex;
  margin-left: var(--space-admin-sm);
  color: #18845a;
  font-weight: 850;
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

.form-input {
  min-height: 38px;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  padding: 0 12px;
  background: #fff;
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 750;
  outline: none;
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(18, 104, 246, 0.12);
}

.form-input[aria-invalid='true'] {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
}

.form-error {
  margin: -4px 0 0;
  color: #d93030;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.4;
}

.pending-change-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-md);
  margin-bottom: var(--space-admin-xl);
  padding: var(--space-admin-lg);
  border: 1px solid #d7e7ff;
  border-radius: var(--radius-admin-panel);
  background: #f6faff;
}

.pending-change-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 900;
}

.pending-change-head span {
  color: var(--color-primary);
}

.pending-change-card {
  padding: var(--space-admin-md);
  border: 1px solid #e3ebf6;
  border-radius: var(--radius-admin-panel);
  background: #fff;
}

.pending-change-card h4 {
  margin: 0 0 var(--space-admin-sm);
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 900;
}

.pending-change-card dl {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-admin-md);
  margin: 0;
}

.pending-change-card dt,
.pending-change-card dd {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
}

.pending-change-card dt {
  color: var(--color-text-secondary);
  font-weight: 800;
}

.pending-change-card dd {
  color: var(--color-text-primary);
  font-weight: 800;
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
}
</style>
