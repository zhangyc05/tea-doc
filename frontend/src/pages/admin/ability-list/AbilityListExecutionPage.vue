<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DetailSheet, PageReviewPanel, StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AbilityListWorkspace from '@/components/admin/ability-list/AbilityListWorkspace.vue'
import type { AbilityIndicator } from '@/components/admin/ability-list/types'
import { getExecutionVersionStatusLabel } from '@/domain/admin/ability-list'
import { getAbilityListExecutionMock } from '@/services/mock/ability-list'
import { abilityListExecutionPageReview } from './AbilityListExecutionPage.review'
import {
  deriveNextExecutionVersion,
  getAbilityListState,
  updateExecutionIndicator,
} from '@/stores/admin/abilityListStore'
import iconAbilityBasic from '@/assets/admin/ability-list-base-assets/icons/icon-ability-basic.svg'
import iconAbilityTeaching from '@/assets/admin/ability-list-base-assets/icons/icon-ability-teaching.svg'
import iconAbilityResearch from '@/assets/admin/ability-list-base-assets/icons/icon-ability-research.svg'
import iconAbilityPractice from '@/assets/admin/ability-list-base-assets/icons/icon-ability-practice.svg'
import iconAbilityService from '@/assets/admin/ability-list-base-assets/icons/icon-ability-service.svg'

const router = useRouter()
const route = useRoute()
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
const showVersionDrawer = ref(false)
const reviewPanelOpen = ref(route.query.review === '1')

// 打开编辑抽屉
function openEditDrawer(indicator: AbilityIndicator) {
  editingIndicator.value = { ...indicator }
}

// 关闭编辑抽屉
function closeEditDrawer() {
  editingIndicator.value = null
}

// 保存编辑
function saveEdit() {
  if (!editingIndicator.value) return

  updateExecutionIndicator(editingIndicator.value.key, {
    name: editingIndicator.value.name,
    novice: editingIndicator.value.novice,
    competent: editingIndicator.value.competent,
    backbone: editingIndicator.value.backbone,
    expert: editingIndicator.value.expert,
    basisLabel: editingIndicator.value.basisLabel,
  })
  closeEditDrawer()
}

const normalizedIndicators = computed<AbilityIndicator[]>(() => abilityListState.executionIndicators)
const versionRows = computed(() => [
  abilityListState.executionVersion,
  ...abilityListState.versionHistory,
])
const statusText = computed(() => getExecutionVersionStatusLabel(abilityListState.executionVersion.status))
const subtitle = computed(() => abilityListState.executionVersion.status === 'published'
  ? '当前周期正在使用的教师能力清单'
  : '下一周期执行版待确认发布')

function deriveNextVersion() {
  deriveNextExecutionVersion()
  router.push('/admin/ability-list/execution/publish-confirm')
}

function openVersionDrawer() {
  showVersionDrawer.value = true
}

function closeVersionDrawer() {
  showVersionDrawer.value = false
}

function toggleReviewPanel() {
  reviewPanelOpen.value = !reviewPanelOpen.value
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
                  <h1>{{ abilityListState.executionVersion.title }}</h1>
                  <StatusBadge :status="abilityListState.executionVersion.status" :label="statusText" />
                </div>
                <p class="hero-subtitle">{{ subtitle }}</p>
                <p v-if="abilityListState.operationMessage" class="operation-message">
                  {{ abilityListState.operationMessage }}
                </p>
              </div>

              <div class="hero-actions">
                <Button class="primary-action" @click="deriveNextVersion">
                  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5h10v10H5zM8 9h4M8 12h3" /></svg>
                  派生下一周期执行版
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
                <strong class="admin-summary-value">{{ abilityListState.executionVersion.scope }}</strong>
              </div>
              <div class="summary-item admin-summary-item">
                <span class="admin-summary-label">最近更新</span>
                <strong class="admin-summary-value">{{ abilityListState.executionVersion.lastUpdated }}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AbilityListWorkspace
        :nodes="normalizedAbilityTree"
        selected-key="teaching-design"
        selected-title="教学能力 / 教学设计与实施"
        :indicators="normalizedIndicators"
        basis-column-title="计算规则"
        :default-expanded-keys="['teaching']"
        @edit-indicator="openEditDrawer"
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
        <div v-if="editingIndicator" class="drawer-tip">
          当前执行版已发布，修改后将先保存为调整内容，确认后再生效。
        </div>

        <div v-if="editingIndicator" class="drawer-form">
          <div class="form-group">
            <label class="form-label">所属维度</label>
            <input class="form-input" type="text" value="教学能力" readonly />
          </div>
          <div class="form-group">
            <label class="form-label">所属要素</label>
            <input class="form-input" type="text" value="教学设计与实施" readonly />
          </div>
          <div class="form-group">
            <label class="form-label">指标名称</label>
            <input v-model="editingIndicator.name" class="form-input" type="text" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">新手</label>
              <input v-model="editingIndicator.novice" class="form-input" type="text" />
            </div>
            <div class="form-group">
              <label class="form-label">胜任</label>
              <input v-model="editingIndicator.competent" class="form-input" type="text" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">骨干</label>
              <input v-model="editingIndicator.backbone" class="form-input" type="text" />
            </div>
            <div class="form-group">
              <label class="form-label">名师</label>
              <input v-model="editingIndicator.expert" class="form-input" type="text" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">计算规则</label>
            <input v-model="editingIndicator.basisLabel" class="form-input" type="text" />
          </div>
          <div class="form-group">
            <label class="form-label">状态</label>
            <label class="form-switch">
              <input type="checkbox" checked />
              <span class="form-switch-label">已启用</span>
            </label>
          </div>
        </div>
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

      <PageReviewPanel
        :open="reviewPanelOpen"
        :review="abilityListExecutionPageReview"
      />

      <button
        class="review-floating-button"
        :class="{ shifted: reviewPanelOpen }"
        type="button"
        :aria-pressed="reviewPanelOpen"
        @click="toggleReviewPanel"
      >
        {{ reviewPanelOpen ? '关闭说明' : '页面说明' }}
      </button>
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
  flex-direction: column;
}

.form-group {
  margin-bottom: var(--space-admin-lg);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-admin-lg);
  margin-bottom: var(--space-admin-lg);
}

.form-label {
  display: block;
  margin-bottom: var(--space-admin-xs);
  color: #7d899b;
  font-size: 13px;
  font-weight: 700;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-admin-panel);
  font-size: 14px;
  color: var(--color-text-primary);
  background: white;
  transition: all 0.16s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(47, 191, 155, 0.1);
}

.form-input[readonly] {
  background: #f5f8ff;
  color: #7d899b;
  cursor: default;
}

.form-switch {
  display: flex;
  align-items: center;
  gap: var(--space-admin-xs);
  cursor: pointer;
}

.form-switch input[type="checkbox"] {
  width: 44px;
  height: 24px;
  appearance: none;
  background: #e1efff;
  border-radius: var(--radius-lg);
  position: relative;
  cursor: pointer;
  transition: all 0.16s ease;
}

.form-switch input[type="checkbox"]:checked {
  background: var(--color-primary);
}

.form-switch input[type="checkbox"]::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: all 0.16s ease;
}

.form-switch input[type="checkbox"]:checked::before {
  transform: translateX(20px);
}

.form-switch-label {
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 600;
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

.review-floating-button {
  position: fixed;
  top: calc(var(--admin-topbar-height) + var(--space-admin-md-lg));
  right: var(--space-admin-2xl);
  z-index: 31;
  min-width: 104px;
  min-height: 42px;
  border: 1px solid var(--color-admin-primary);
  border-radius: var(--radius-full);
  background: var(--color-admin-primary);
  box-shadow: var(--shadow-admin-primary-action);
  color: var(--color-card-bg);
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 900;
  padding: 0 var(--space-admin-lg);
}

.review-floating-button:hover {
  background: var(--color-admin-primary-hover);
}

.review-floating-button.shifted {
  right: min(460px, calc(100vw - 132px));
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
