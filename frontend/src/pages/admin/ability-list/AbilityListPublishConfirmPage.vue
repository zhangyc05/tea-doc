<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { AdminIcon } from '@/components/admin-ui'
import { StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { getExecutionVersionStatusLabel } from '@/domain/admin/ability-list'
import { getAbilityListPublishConfirmMock } from '@/services/mock/ability-list'
import {
  getAbilityListState,
  publishExecutionVersion,
} from '@/stores/admin/abilityListStore'

const router = useRouter()
const abilityListState = getAbilityListState()
const publishStatus = computed(() => abilityListState.executionVersion.status)
const publishStatusLabel = computed(() => getExecutionVersionStatusLabel(abilityListState.executionVersion.status))
const operationMessage = computed(() => abilityListState.operationMessage)

const { impactCards } = getAbilityListPublishConfirmMock()

function handlePublish() {
  publishExecutionVersion()
}

function goBack() {
  router.push('/admin/ability-list/execution')
}
</script>

<template>
  <AdminLayout active-key="ability-list-execution">
    <div class="page-root">
      <section class="admin-hero">
        <div class="hero-icon"><AdminIcon name="document" /></div>
        <div class="hero-content">
          <div class="hero-title-row">
            <h1 class="hero-title">{{ abilityListState.executionVersion.title }}</h1>
            <StatusBadge :status="publishStatus" :label="publishStatusLabel" />
          </div>

          <div class="hero-summary">
            <div class="summary-item">
              <span class="summary-label">来源执行版：</span>
              <span class="summary-value">{{ abilityListState.executionVersion.sourceTitle }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">来源基准模板：</span>
              <span class="summary-value">{{ abilityListState.executionVersion.templateTitle }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">适用范围：</span>
              <span class="summary-value">{{ abilityListState.executionVersion.scope }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">指标数量：</span>
              <span class="summary-value">{{ abilityListState.executionVersion.indicatorCount }} 项</span>
            </div>
            <div class="summary-item wide">
              <span class="summary-label">最近调整：</span>
              <span class="summary-value">沿用 2026 年度执行标准，后续补充调整</span>
            </div>
          </div>
        </div>
        <div class="hero-art" aria-hidden="true">
          <span></span>
          <b></b>
          <i></i>
        </div>
      </section>

      <section class="impact-section">
        <h2 class="section-title">发布影响确认</h2>
        <div class="impact-cards">
          <article
            v-for="card in impactCards"
            :key="card.title"
            class="impact-card"
          >
            <div class="impact-icon" :class="card.tone"><AdminIcon :name="card.icon" /></div>
            <h3 class="impact-title">{{ card.title }}</h3>
            <p class="impact-description">{{ card.description }}</p>
          </article>
        </div>
      </section>

      <section class="notice-card">
        <div class="notice-icon"><AdminIcon name="info" /></div>
        <div>
          <h4 class="notice-title">发布说明</h4>
          <p class="notice-text">
            发布准备来自执行版页面的“派生下一周期执行版”操作。
            发布后，2027 年度执行版将成为当前周期默认运行口径。2026 年度执行版将保留历史引用记录，不会被覆盖。
          </p>
        </div>
      </section>

      <section class="action-section">
        <Button variant="outline" @click="goBack">返回修改</Button>
        <Button
          :disabled="publishStatus === 'published'"
          @click="handlePublish"
        >
          {{ publishStatus === 'published' ? '已确认发布' : '确认发布' }}
        </Button>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.page-root {
  min-height: 100vh;
  padding: 26px 24px 34px;
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-xl);
  background: var(--color-admin-bg);
  color: var(--color-admin-text-strong);
}

.page-root *,
.page-root *::before,
.page-root *::after {
  box-sizing: border-box;
}

.page-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-admin-md);
  color: var(--color-admin-text-muted);
  font-size: 14px;
  font-weight: 700;
}

.page-breadcrumb strong {
  color: var(--color-admin-text-strong);
}

.page-description {
  display: flex;
  align-items: center;
  gap: var(--space-admin-lg);
  color: #263b63;
  font-size: 15px;
  line-height: 1.6;
}

.operation-message {
  color: var(--color-admin-primary);
  font-size: 13px;
  font-weight: 800;
}

.admin-hero {
  position: relative;
  min-height: 310px;
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr) 390px;
  gap: var(--space-admin-2xl);
  padding: 48px 42px;
  overflow: hidden;
  border: 1px solid var(--color-admin-border);
  border-radius: 16px;
  background: linear-gradient(135deg, var(--color-admin-bg-soft) 0%, #eef7ff 100%);
  box-shadow: var(--shadow-admin-card-faint);
}

.hero-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-admin-primary);
  color: #fff;
  box-shadow: 0 14px 24px rgba(18, 104, 246, 0.24);
}

.hero-icon :deep(svg) {
  width: 38px;
  height: 38px;
}

.hero-title-row {
  display: flex;
  align-items: center;
  gap: var(--space-admin-card-gap);
}

.hero-title {
  margin: 0;
  color: #111827;
  font-size: 32px;
  line-height: 1.3;
  font-weight: 900;
}

.hero-summary {
  margin-top: 34px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px 0;
}

.summary-item {
  min-height: 52px;
  padding: 0 28px;
  border-left: 1px solid #d7e2f2;
}

.summary-item:first-child,
.summary-item.wide {
  border-left: 0;
  padding-left: 0;
}

.summary-item.wide {
  grid-column: 1 / -1;
}

.summary-label {
  display: block;
  color: #4d5d75;
  font-size: 14px;
  font-weight: 800;
}

.summary-value {
  display: block;
  margin-top: var(--space-admin-xs);
  color: var(--color-admin-text-strong);
  font-size: 15px;
  line-height: 1.45;
  font-weight: 700;
}

.hero-art {
  position: relative;
  min-height: 210px;
}

.hero-art span,
.hero-art b,
.hero-art i {
  position: absolute;
  display: block;
}

.hero-art span {
  right: 110px;
  bottom: 20px;
  width: 82px;
  height: 156px;
  border-radius: 18px;
  background: linear-gradient(180deg, var(--color-admin-primary), #78b8ff);
  transform: rotate(45deg);
}

.hero-art b {
  right: 24px;
  bottom: 12px;
  width: 88px;
  height: 190px;
  border-radius: 18px;
  background: linear-gradient(180deg, #46d8d3, #9deee9);
  transform: rotate(45deg);
}

.hero-art i {
  right: 206px;
  bottom: 52px;
  width: 122px;
  height: 122px;
  border-radius: 50%;
  background: rgba(18, 104, 246, 0.08);
}

.section-title {
  margin: 8px 0 18px;
  color: var(--color-admin-text-strong);
  font-size: 22px;
  font-weight: 900;
}

.impact-cards {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--space-admin-2xl);
}

.impact-card {
  min-height: 220px;
  padding: 26px 24px;
  background: #fff;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  box-shadow: var(--shadow-admin-card-faint);
}

.impact-icon {
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: inset 0 0 0 9px rgba(255, 255, 255, 0.68);
}

.impact-icon :deep(svg) {
  width: 29px;
  height: 29px;
}

.impact-icon.blue {
  color: var(--color-admin-primary);
  background: linear-gradient(145deg, #f1f6ff 0%, #dce9ff 100%);
}

.impact-icon.purple {
  color: #8848e8;
  background: linear-gradient(145deg, #f7f0ff 0%, #eadcff 100%);
}

.impact-icon.green {
  color: #18a663;
  background: linear-gradient(145deg, #edfdf5 0%, #d7f7e8 100%);
}

.impact-icon.orange {
  color: #f26a16;
  background: linear-gradient(145deg, #fff7ec 0%, #ffe8ca 100%);
}

.impact-title {
  margin: 18px 0 14px;
  color: var(--color-admin-text-strong);
  font-size: 18px;
  font-weight: 900;
}

.impact-description {
  margin: 0;
  color: #263b63;
  font-size: 15px;
  line-height: 1.7;
}

.notice-card {
  min-height: 110px;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  align-items: center;
  gap: var(--space-admin-card-gap);
  padding: 22px 28px;
  background: #fff;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
}

.notice-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(145deg, #f1f6ff 0%, #dce9ff 100%);
  color: var(--color-admin-primary);
  box-shadow: inset 0 0 0 7px rgba(255, 255, 255, 0.68);
}

.notice-icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.notice-title {
  margin: 0 0 8px;
  color: var(--color-admin-text-strong);
  font-size: 18px;
  font-weight: 900;
}

.notice-text {
  margin: 0;
  color: #263b63;
  font-size: 15px;
  line-height: 1.7;
}

.action-section {
  min-height: 88px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-admin-2xl);
  padding: 0 38px;
  background: #fff;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
}

@media (max-width: 1360px) {
  .admin-hero {
    grid-template-columns: 80px minmax(0, 1fr);
  }

  .hero-art {
    display: none;
  }

  .impact-cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .admin-hero,
  .hero-summary,
  .impact-cards,
  .notice-card {
    grid-template-columns: 1fr;
  }

  .page-description,
  .hero-title-row,
  .action-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .summary-item {
    border-left: 0;
    padding-left: 0;
  }
}
</style>
