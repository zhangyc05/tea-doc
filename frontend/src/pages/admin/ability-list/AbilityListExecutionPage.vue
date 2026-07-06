<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { AdminIcon, AdminInput, AdminSelect } from '@/components/admin-ui'
import { DetailSheet, StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AbilityListWorkspace from '@/components/admin/ability-list/AbilityListWorkspace.vue'
import type { AbilityIndicator, AbilityTreeNode } from '@/components/admin/ability-list/types'
import { getExecutionVersionStatusLabel } from '@/domain/admin/ability-list'
import { getAbilityListExecutionMock } from '@/services/mock/ability-list'
import {
  addPendingExecutionDimension,
  cancelPendingExecutionVersion,
  confirmExecutionIndicatorChanges,
  deletePendingExecutionAbilityNode,
  deletePendingExecutionIndicator,
  deriveNextExecutionVersion,
  discardExecutionIndicatorChanges,
  getDisplayedExecutionIndicators,
  getAbilityListState,
  publishExecutionVersion,
  updateExecutionIndicator,
  updatePendingExecutionAbilityNode,
} from '@/stores/admin/abilityListStore'
import iconAbilityBasic from '@/assets/admin/ability-list-base-assets/icons/icon-ability-basic.svg'
import iconAbilityTeaching from '@/assets/admin/ability-list-base-assets/icons/icon-ability-teaching.svg'
import iconAbilityResearch from '@/assets/admin/ability-list-base-assets/icons/icon-ability-research.svg'
import iconAbilityPractice from '@/assets/admin/ability-list-base-assets/icons/icon-ability-practice.svg'
import iconAbilityService from '@/assets/admin/ability-list-base-assets/icons/icon-ability-service.svg'

const abilityListState = getAbilityListState()
const { abilityTree: normalizedAbilityTree } = getAbilityListExecutionMock({
  basic: iconAbilityBasic,
  teaching: iconAbilityTeaching,
  research: iconAbilityResearch,
  practice: iconAbilityPractice,
  service: iconAbilityService,
})

// 编辑抽屉状态
const editingIndicator = ref<AbilityIndicator | null>(null)
const editErrors = ref<Record<string, string>>({})
const showVersionDrawer = ref(false)
const deriveDrawerOpen = ref(false)
const cancelPublishDrawerOpen = ref(false)
const dimensionDrawerOpen = ref(false)
const editingAbilityNode = ref<AbilityTreeNode | null>(null)
const defaultAbilityGroupKey = normalizedAbilityTree[0]?.key ?? ''
const defaultAbilityKey = normalizedAbilityTree[0]?.children?.[0]?.key ?? defaultAbilityGroupKey
const selectedAbility = ref(defaultAbilityKey)
const dimensionForm = ref({
  key: 'innovation',
  label: '创新能力',
  childKey: 'innovation-ai',
  childLabel: '智能应用',
})
const isEditingAbilityNode = computed(() => Boolean(editingAbilityNode.value))
const indicatorStatusOptions = [
  { label: '已启用', value: 'enabled' },
  { label: '已禁用', value: 'disabled' },
  { label: '草稿', value: 'draft' },
]

// 打开编辑抽屉
function openEditDrawer(indicator: AbilityIndicator) {
  editingIndicator.value = { ...indicator }
  editErrors.value = {}
}

// 关闭编辑抽屉
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
    { key: 'basisLabel', message: '请输入计算规则' },
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

// 保存编辑
function saveEdit() {
  if (!editingIndicator.value) return
  if (!validateIndicatorEdit()) return

  updateExecutionIndicator(editingIndicator.value.key, {
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

const pendingExecutionVersion = computed(() => abilityListState.pendingExecutionVersion)
const currentExecutionVersion = computed(() => pendingExecutionVersion.value ?? abilityListState.executionVersion)
const isPendingMode = computed(() => Boolean(pendingExecutionVersion.value))
const activeAbilityTree = computed(() => hydrateAbilityTreeIcons(
  abilityListState.pendingExecutionAbilityTree ?? abilityListState.executionAbilityTree,
))
const normalizedIndicators = computed<AbilityIndicator[]>(() => getDisplayedExecutionIndicators())
const filteredIndicators = computed<AbilityIndicator[]>(() => (
  normalizedIndicators.value.filter(indicator => indicator.abilityKey === selectedAbility.value)
))
const pendingExecutionChangeRows = computed(() => abilityListState.pendingExecutionIndicatorChanges)
const versionRows = computed(() => [
  abilityListState.executionVersion,
  ...(pendingExecutionVersion.value ? [pendingExecutionVersion.value] : []),
  ...abilityListState.versionHistory,
])
const statusText = computed(() => getExecutionVersionStatusLabel(currentExecutionVersion.value.status))
const subtitle = computed(() => currentExecutionVersion.value.status === 'published'
  ? '当前周期正在使用的教师能力清单'
  : '下一周期执行清单待确认发布，可调整结构后再发布')

function hydrateAbilityTreeIcons(nodes: typeof normalizedAbilityTree) {
  return nodes.map((node) => {
    const fallback = normalizedAbilityTree.find(item => item.key === node.key)
    return {
      ...node,
      icon: node.icon || fallback?.icon || '',
      children: node.children?.map(child => ({ ...child })),
    }
  })
}

function selectAbility(key: string) {
  selectedAbility.value = key
}

function findSelectedAbility() {
  for (const item of activeAbilityTree.value) {
    const child = item.children?.find(childItem => childItem.key === selectedAbility.value)
    if (child) {
      return { dimension: item.label, element: child.label, icon: item.icon }
    }
  }

  return { dimension: '', element: '', icon: iconAbilityTeaching }
}

function getSelectedAbilityLabel() {
  const selected = findSelectedAbility()
  return selected.dimension && selected.element
    ? `${selected.dimension} / ${selected.element}`
    : ''
}

function getSelectedAbilityIcon() {
  return findSelectedAbility().icon
}

function openDeriveDrawer() {
  deriveDrawerOpen.value = true
}

function closeDeriveDrawer() {
  deriveDrawerOpen.value = false
}

function generatePendingExecutionVersion() {
  deriveNextExecutionVersion(activeAbilityTree.value)
  deriveDrawerOpen.value = false
}

function confirmPublish() {
  publishExecutionVersion()
  selectedAbility.value = activeAbilityTree.value[0]?.children?.[0]?.key ?? defaultAbilityKey
}

function openCancelPublishDrawer() {
  cancelPublishDrawerOpen.value = true
}

function closeCancelPublishDrawer() {
  cancelPublishDrawerOpen.value = false
}

function confirmCancelPublish() {
  cancelPendingExecutionVersion()
  cancelPublishDrawerOpen.value = false
  selectedAbility.value = defaultAbilityKey
}

function openDimensionDrawer() {
  editingAbilityNode.value = null
  dimensionForm.value = {
    key: 'innovation',
    label: '创新能力',
    childKey: 'innovation-ai',
    childLabel: '智能应用',
  }
  dimensionDrawerOpen.value = true
}

function closeDimensionDrawer() {
  dimensionDrawerOpen.value = false
  editingAbilityNode.value = null
}

function openDimensionEditDrawer(node: AbilityTreeNode) {
  editingAbilityNode.value = { ...node, children: node.children?.map(child => ({ ...child })) }
  dimensionForm.value = {
    key: node.key,
    label: node.label,
    childKey: node.children?.[0]?.key ?? node.key,
    childLabel: node.children?.[0]?.label ?? node.label,
  }
  dimensionDrawerOpen.value = true
}

function submitDimension() {
  if (editingAbilityNode.value) {
    updatePendingExecutionAbilityNode(editingAbilityNode.value.key, dimensionForm.value.label)
    dimensionDrawerOpen.value = false
    editingAbilityNode.value = null
    return
  }

  addPendingExecutionDimension({
    key: dimensionForm.value.key,
    label: dimensionForm.value.label,
    icon: '',
    color: 'gray',
    children: [{
      key: dimensionForm.value.childKey,
      label: dimensionForm.value.childLabel,
    }],
  })
  selectedAbility.value = dimensionForm.value.childKey
  dimensionDrawerOpen.value = false
}

function deleteAbilityNode(node: AbilityTreeNode) {
  deletePendingExecutionAbilityNode(node.key)
  selectedAbility.value = activeAbilityTree.value[0]?.children?.[0]?.key ?? defaultAbilityKey
}

function deleteIndicator(indicator: AbilityIndicator) {
  deletePendingExecutionIndicator(indicator.key)
}

function confirmExecutionAdjustments() {
  confirmExecutionIndicatorChanges()
}

function discardExecutionAdjustments() {
  discardExecutionIndicatorChanges()
}

function openVersionDrawer() {
  showVersionDrawer.value = true
}

function closeVersionDrawer() {
  showVersionDrawer.value = false
}
</script>

<template>
  <AdminLayout active-key="ability-list-execution">
    <div class="execution-page">
      <section class="execution-hero admin-hero">
        <div class="hero-art" aria-hidden="true"></div>

        <div class="hero-content">
          <div class="hero-emblem">
            <div class="hero-icon">
              <svg viewBox="0 0 40 40" aria-hidden="true">
                <path d="M11 8h16l4 4v20H11z" />
                <path d="M27 8v6h6M16 17h10M16 22h10M16 27h6" />
                <circle cx="29" cy="29" r="4" />
              </svg>
            </div>
          </div>

          <div class="hero-main">
            <div class="hero-heading-row">
              <div class="hero-title-group">
                <div class="hero-title-row">
                  <h1>{{ currentExecutionVersion.title }}</h1>
                  <StatusBadge :status="currentExecutionVersion.status" :label="statusText" />
                </div>
                <p class="hero-subtitle">{{ subtitle }}</p>
                <p v-if="abilityListState.operationMessage" class="operation-message">
                  {{ abilityListState.operationMessage }}
                </p>
              </div>

              <div class="hero-actions">
                <Button class="primary-action" v-if="!pendingExecutionVersion" @click="openDeriveDrawer">
                  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5h10v10H5zM8 9h4M8 12h3" /></svg>
                  派生下一周期
                </Button>
                <Button v-if="pendingExecutionVersion" class="primary-action" @click="confirmPublish">
                  确认发布
                </Button>
                <Button v-if="pendingExecutionVersion" variant="outline" @click="openCancelPublishDrawer">
                  取消发布
                </Button>
                <Button
                  v-if="!pendingExecutionVersion && pendingExecutionChangeRows.length > 0"
                  variant="secondary"
                  @click="confirmExecutionAdjustments"
                >
                  确认调整（{{ pendingExecutionChangeRows.length }}）
                </Button>
                <Button
                  v-if="!pendingExecutionVersion && pendingExecutionChangeRows.length > 0"
                  variant="outline"
                  @click="discardExecutionAdjustments"
                >
                  撤回调整
                </Button>
                <Button class="secondary-action" variant="outline" @click="openVersionDrawer">历史版本</Button>
              </div>
            </div>

            <div class="hero-summary-strip admin-summary-strip">
              <div class="summary-item admin-summary-item source-item">
                <span class="admin-summary-label">基准版</span>
                <span class="admin-summary-link template-link">
                  {{ abilityListState.executionVersion.templateTitle }}
                </span>
              </div>
              <div class="summary-item admin-summary-item">
                <span class="admin-summary-label">适用范围</span>
                <strong class="admin-summary-value">{{ currentExecutionVersion.scope }}</strong>
              </div>
              <div class="summary-item admin-summary-item">
                <span class="admin-summary-label">最近更新</span>
                <strong class="admin-summary-value">{{ currentExecutionVersion.lastUpdated }}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="workspace-entry admin-card">
        <div class="workspace-entry-main">
          <span class="workspace-entry-icon">
            <AdminIcon name="switch" />
          </span>
          <div>
            <h2>岗位/聘期要求映射</h2>
            <p>维护执行清单指标与岗位、聘期要求的映射关系，发布后用于教师对照和能力画像引用。</p>
          </div>
        </div>
        <RouterLink
          class="workspace-entry-link"
          to="/admin/ability-list/execution/requirement-mapping"
        >
          进入映射配置
        </RouterLink>
      </section>

      <AbilityListWorkspace
        :nodes="activeAbilityTree"
        :selected-key="selectedAbility"
        :selected-title="getSelectedAbilityLabel()"
        :selected-icon="getSelectedAbilityIcon()"
        :indicators="filteredIndicators"
        basis-column-title="计算规则"
        :default-expanded-keys="[defaultAbilityGroupKey]"
        :show-delete-action="isPendingMode"
        :show-structure-actions="isPendingMode"
        @select-ability="selectAbility"
        @edit-indicator="openEditDrawer"
        @delete-indicator="deleteIndicator"
        @add-dimension="openDimensionDrawer"
        @edit-node="openDimensionEditDrawer"
        @delete-node="deleteAbilityNode"
      />

      <DetailSheet
        :open="Boolean(editingIndicator)"
        title="编辑指标"
        width="form"
        mode="edit"
        @update:open="value => { if (!value) closeEditDrawer() }"
        @cancel="closeEditDrawer"
        @confirm="saveEdit"
      >
        <div v-if="editingIndicator" class="drawer-form drawer-form-in-sheet">
          <p class="form-tip">当前执行版已发布，修改后将先保存为调整内容，确认后再生效。</p>
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
            <label class="form-label">计算规则 <span class="required-mark">*</span></label>
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
          <Button @click="saveEdit">保存调整</Button>
        </template>
      </DetailSheet>

      <DetailSheet
        :open="deriveDrawerOpen"
        title="派生执行清单"
        width="form"
        mode="edit"
        @update:open="value => { deriveDrawerOpen = value }"
        @cancel="closeDeriveDrawer"
        @confirm="generatePendingExecutionVersion"
      >
        <div class="drawer-form drawer-form-in-sheet">
          <p class="form-tip">基于当前已发布执行清单生成下一周期待发布版本，生成后可调整指标和维度，确认无误后再发布。</p>
          <div class="derive-summary">
            <div>
              <span>目标版本</span>
              <strong>2027 年度教师能力清单执行版</strong>
            </div>
            <div>
              <span>来源执行版</span>
              <strong>{{ abilityListState.executionVersion.title }}</strong>
            </div>
            <div>
              <span>来源基准清单</span>
              <strong>{{ abilityListState.baseTemplateVersion.title }}</strong>
            </div>
            <div>
              <span>指标数量</span>
              <strong>{{ normalizedIndicators.length }} 项</strong>
            </div>
          </div>
        </div>

        <template #footer>
          <Button variant="outline" @click="closeDeriveDrawer">取消</Button>
          <Button @click="generatePendingExecutionVersion">生成待发布版本</Button>
        </template>
      </DetailSheet>

      <DetailSheet
        :open="cancelPublishDrawerOpen"
        title="取消发布"
        width="sm"
        mode="edit"
        @update:open="value => { cancelPublishDrawerOpen = value }"
        @cancel="closeCancelPublishDrawer"
        @confirm="confirmCancelPublish"
      >
        <div class="drawer-form drawer-form-in-sheet">
          <p class="form-tip">取消后将删除当前待发布执行清单草稿，已发布执行清单和历史版本不会受到影响。</p>
        </div>

        <template #footer>
          <Button variant="outline" @click="closeCancelPublishDrawer">继续编辑</Button>
          <Button @click="confirmCancelPublish">确认取消发布</Button>
        </template>
      </DetailSheet>

      <DetailSheet
        :open="dimensionDrawerOpen"
        :title="isEditingAbilityNode ? '编辑维度' : '新增维度'"
        width="form"
        mode="edit"
        @update:open="value => { dimensionDrawerOpen = value }"
        @cancel="closeDimensionDrawer"
        @confirm="submitDimension"
      >
        <div class="drawer-form drawer-form-in-sheet">
          <p class="form-tip">
            {{ isEditingAbilityNode ? '编辑维度仅作用于待发布执行清单，发布后才成为新的正式执行清单结构。' : '新增维度仅作用于待发布执行清单，发布后才成为新的正式执行清单结构。' }}
          </p>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">维度编码</label>
              <AdminInput v-model="dimensionForm.key" class="form-input" :disabled="isEditingAbilityNode" />
            </div>
            <div class="form-group">
              <label class="form-label">维度名称</label>
              <AdminInput v-model="dimensionForm.label" class="form-input" />
            </div>
          </div>
          <div v-if="!isEditingAbilityNode" class="form-row">
            <div class="form-group">
              <label class="form-label">默认要素编码</label>
              <AdminInput v-model="dimensionForm.childKey" class="form-input" />
            </div>
            <div class="form-group">
              <label class="form-label">默认要素名称</label>
              <AdminInput v-model="dimensionForm.childLabel" class="form-input" />
            </div>
          </div>
        </div>

        <template #footer>
          <Button variant="outline" @click="closeDimensionDrawer">取消</Button>
          <Button @click="submitDimension">保存维度</Button>
        </template>
      </DetailSheet>

      <DetailSheet
        :open="showVersionDrawer"
        title="执行版历史版本"
        width="history"
        :show-footer="false"
        @update:open="value => { showVersionDrawer = value }"
        @cancel="closeVersionDrawer"
      >
        <div class="drawer-tip">
          展示当前执行版和历史执行版，用于确认当前周期口径和历史引用关系。
        </div>

        <div class="version-list">
          <article v-for="version in versionRows" :key="version.versionNo" class="version-card">
            <div class="version-card-head">
              <strong>{{ version.versionNo }}</strong>
              <StatusBadge :status="version.status" :label="getExecutionVersionStatusLabel(version.status)" />
            </div>
            <h4>{{ version.title }}</h4>
            <dl>
              <div>
                <dt>发布时间</dt>
                <dd>{{ version.publishedAt }}</dd>
              </div>
              <div>
                <dt>来源</dt>
                <dd>{{ version.source }}</dd>
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
.execution-page {
  display: flex;
  width: 100%;
  min-height: calc(100vh - var(--admin-topbar-height) - var(--admin-page-gutter-y) * 2);
  flex-direction: column;
  gap: clamp(14px, 1vw, 18px);
}

/* 页面特有样式：Hero 背景艺术 */
.execution-hero::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.99) 30%,
    rgba(255, 255, 255, 0.86) 45%,
    rgba(255, 255, 255, 0.36) 62%,
    rgba(255, 255, 255, 0) 100%
  );
  content: '';
}

.execution-hero::after {
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
  right: 0;
  bottom: 0;
  z-index: 0;
  width: min(68%, 900px);
  background-image: url('@/images/hero-art.png');
  background-repeat: no-repeat;
  background-position: right center;
  background-size: cover;
  opacity: 0.96;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  min-height: var(--admin-hero-height-default);
  max-width: min(900px, 64%);
  align-items: center;
  gap: clamp(18px, 1.2vw, 26px);
  padding: 0 0 0 clamp(24px, 1.75vw, 34px);
}

.hero-emblem {
  flex: none;
  padding-top: 0;
  transform: translateY(-24px);
}

.hero-icon {
  display: flex;
  width: clamp(65px, 3.8vw, 72px);
  height: clamp(65px, 3.8vw, 72px);
  align-items: center;
  justify-content: center;
  border: clamp(8px, 0.55vw, 10px) solid rgba(255, 255, 255, 0.92);
  border-radius: 50%;
  background: linear-gradient(145deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
  box-shadow: 0 14px 28px rgba(11, 99, 246, 0.24);
}

.hero-icon svg {
  width: clamp(26px, 1.7vw, 30px);
  height: clamp(26px, 1.7vw, 30px);
  fill: none;
  stroke: #fff;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hero-main {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  justify-content: center;
}

.hero-heading-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(18px, 1.25vw, 26px);
  margin-bottom: clamp(12px, 0.9vw, 16px);
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
  margin: 0;
  color: var(--color-text-secondary);
  font-size: clamp(12px, 0.75vw, 14px);
  font-weight: 700;
  line-height: 1.4;
}

.operation-message {
  display: inline-flex;
  margin: 8px 0 0;
  padding: 6px 10px;
  border-radius: var(--radius-admin-panel);
  background: #ecfdf3;
  color: #18845a;
  font-size: 13px;
  font-weight: 800;
}

.hero-actions {
  display: flex;
  flex: none;
  align-items: center;
  gap: clamp(10px, 0.7vw, 14px);
  padding-top: 0;
}

.workspace-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-admin-lg);
  padding: 14px 18px;
}

.workspace-entry-main {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: var(--space-admin-md);
}

.workspace-entry-icon {
  display: flex;
  width: 34px;
  height: 34px;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-admin-panel);
  background: #eef5ff;
  color: var(--color-primary);
}

.workspace-entry-icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.workspace-entry h2 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: 15px;
  font-weight: 900;
  line-height: 1.3;
}

.workspace-entry p {
  margin: 4px 0 0;
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
}

.workspace-entry-link {
  display: inline-flex;
  height: 36px;
  flex: none;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-admin-panel);
  background: #fff;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 850;
  padding: 0 14px;
  text-decoration: none;
  transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.workspace-entry-link:hover {
  border-color: rgba(18, 104, 246, 0.32);
  background: #f4f8ff;
  box-shadow: 0 8px 18px rgba(18, 104, 246, 0.08);
}

/* 按钮图标特殊样式 */
.primary-action svg,
.secondary-action svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.drawer-tip {
  margin: calc(-1 * var(--space-admin-xl)) calc(-1 * var(--space-admin-2xl)) var(--space-admin-2xl);
  padding: var(--space-admin-lg) var(--space-admin-2xl);
  color: #7d899b;
  font-size: 13px;
  line-height: 1.6;
  background: var(--color-admin-bg-soft);
  border-bottom: 1px solid var(--color-card-border);
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

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-xs);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-admin-md-lg);
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

.derive-summary {
  display: grid;
  gap: var(--space-admin-md);
}

.derive-summary div {
  display: flex;
  justify-content: space-between;
  gap: var(--space-admin-lg);
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  background: #fff;
  padding: 12px 14px;
}

.derive-summary span {
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 800;
}

.derive-summary strong {
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 900;
  text-align: right;
}

.version-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-md-lg);
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

/* 响应式 */
@media (max-width: 1440px) {
  .execution-hero {
    min-height: var(--admin-hero-height-compact);
  }

  .hero-art {
    width: min(64%, 720px);
    background-position: right center;
  }

  .execution-hero::before {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.99) 38%,
      rgba(255, 255, 255, 0.84) 54%,
      rgba(255, 255, 255, 0.28) 70%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  .hero-content {
    min-height: var(--admin-hero-height-compact);
    max-width: 68%;
  }

  .hero-heading-row {
    gap: var(--space-admin-lg);
    margin-bottom: var(--space-admin-md);
  }

  .hero-title-row h1 {
    font-size: clamp(21px, 1.35vw, 25px);
  }
}

@media (max-width: 1280px) {
  .hero-art {
    opacity: 0.34;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-heading-row {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-admin-md);
  }

}
</style>
