<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { StatusBadge } from '@/components/common'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { getExecutionVersionStatusLabel } from '@/domain/admin/ability-list'
import { getAbilityListPublishConfirmMock } from '@/services/mock/ability-list'
import {
  deriveNextExecutionVersion,
  getAbilityListState,
  publishExecutionVersion,
} from '@/stores/admin/abilityListStore'

const router = useRouter()
const abilityListState = getAbilityListState()
const publishStatus = computed(() => abilityListState.executionVersion.status)
const publishStatusLabel = computed(() => getExecutionVersionStatusLabel(abilityListState.executionVersion.status))
const operationMessage = computed(() => abilityListState.operationMessage)

if (
  abilityListState.executionVersion.status === 'published'
  && abilityListState.executionVersion.title === '2026 年度教师能力清单执行版'
) {
  deriveNextExecutionVersion()
}

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
      <div class="page-breadcrumb">
        <span>能力清单</span>
        <i>/</i>
        <span>执行版</span>
        <i>/</i>
        <strong>发布确认</strong>
      </div>
      <div class="page-description">
        确认发布执行版。发布后将作为当前周期运行口径，用于后续发展活动、档案归类、岗位/聘期对照和画像报告。
        <span v-if="operationMessage" class="operation-message">{{ operationMessage }}</span>
      </div>

      <section class="admin-hero">
        <div class="hero-icon">▤</div>
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
            <div class="impact-icon" :class="card.tone">{{ card.icon }}</div>
            <h3 class="impact-title">{{ card.title }}</h3>
            <p class="impact-description">{{ card.description }}</p>
          </article>
        </div>
      </section>

      <section class="notice-card">
        <div class="notice-icon">i</div>
        <div>
          <h4 class="notice-title">发布说明</h4>
          <p class="notice-text">
            发布后，2027 年度执行版将成为当前周期默认运行口径。2026 年度执行版将保留历史引用记录，不会被覆盖。
          </p>
        </div>
      </section>

      <section class="action-section">
        <button class="btn-secondary" @click="goBack">返回修改</button>
        <button
          class="btn-primary"
          :disabled="publishStatus === 'published'"
          @click="handlePublish"
        >
          {{ publishStatus === 'published' ? '已确认发布' : '确认发布' }}
        </button>
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
  gap: 20px;
  background: #f6f9ff;
  color: #17233d;
}

.page-root *,
.page-root *::before,
.page-root *::after {
  box-sizing: border-box;
}

.page-breadcrumb {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #66758f;
  font-size: 14px;
  font-weight: 700;
}

.page-breadcrumb strong {
  color: #17233d;
}

.page-description {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #263b63;
  font-size: 15px;
  line-height: 1.6;
}

.operation-message {
  color: #1268f6;
  font-size: 13px;
  font-weight: 800;
}

.admin-hero {
  position: relative;
  min-height: 310px;
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr) 390px;
  gap: 24px;
  padding: 48px 42px;
  overflow: hidden;
  border: 1px solid #dce6f5;
  border-radius: 16px;
  background: linear-gradient(135deg, #f8fbff 0%, #eef7ff 100%);
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.04);
}

.hero-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #1268f6;
  color: #fff;
  box-shadow: 0 14px 24px rgba(18, 104, 246, 0.24);
  font-size: 38px;
}

.hero-title-row {
  display: flex;
  align-items: center;
  gap: 18px;
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
  margin-top: 8px;
  color: #17233d;
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
  background: linear-gradient(180deg, #1268f6, #78b8ff);
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
  color: #17233d;
  font-size: 22px;
  font-weight: 900;
}

.impact-cards {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 24px;
}

.impact-card {
  min-height: 220px;
  padding: 26px 24px;
  background: #fff;
  border: 1px solid #dce6f5;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.04);
}

.impact-icon {
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 30px;
  font-weight: 900;
}

.impact-icon.blue {
  color: #1268f6;
  background: #e8f0ff;
}

.impact-icon.purple {
  color: #8848e8;
  background: #efe7ff;
}

.impact-icon.green {
  color: #18a663;
  background: #dff8ec;
}

.impact-icon.orange {
  color: #f26a16;
  background: #fff0df;
}

.impact-title {
  margin: 18px 0 14px;
  color: #17233d;
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
  gap: 18px;
  padding: 22px 28px;
  background: #fff;
  border: 1px solid #dce6f5;
  border-radius: 8px;
}

.notice-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e8f0ff;
  color: #1268f6;
  font-size: 24px;
  font-weight: 900;
}

.notice-title {
  margin: 0 0 8px;
  color: #17233d;
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
  gap: 24px;
  padding: 0 38px;
  background: #fff;
  border: 1px solid #dce6f5;
  border-radius: 8px;
}

.btn-primary,
.btn-secondary {
  height: 46px;
  min-width: 168px;
  padding: 0 28px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-primary {
  border: 1px solid #1268f6;
  background: #1268f6;
  color: #fff;
}

.btn-primary:disabled {
  cursor: default;
  opacity: 0.72;
}

.btn-secondary {
  border: 1px solid #cfdcf0;
  background: #fff;
  color: #263b63;
}

.btn-primary:not(:disabled):hover,
.btn-secondary:hover {
  border-color: #0d55d8;
  background: #0d55d8;
  color: #fff;
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
