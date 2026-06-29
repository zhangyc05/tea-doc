<script setup lang="ts">
import { ref, computed } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AbilityListWorkspace from '@/components/admin/ability-list/AbilityListWorkspace.vue'
import type { AbilityTreeNode, AbilityIndicator } from '@/components/admin/ability-list/types'
import iconAbilityBasic from '@/assets/admin/ability-list-base-assets/icons/icon-ability-basic.svg'
import iconAbilityTeaching from '@/assets/admin/ability-list-base-assets/icons/icon-ability-teaching.svg'
import iconAbilityResearch from '@/assets/admin/ability-list-base-assets/icons/icon-ability-research.svg'
import iconAbilityPractice from '@/assets/admin/ability-list-base-assets/icons/icon-ability-practice.svg'
import iconAbilityService from '@/assets/admin/ability-list-base-assets/icons/icon-ability-service.svg'

// 编辑抽屉状态
const editingIndicator = ref<AbilityIndicator | null>(null)

// 打开编辑抽屉
function openEditDrawer(indicator: AbilityIndicator) {
  editingIndicator.value = indicator
}

// 关闭编辑抽屉
function closeEditDrawer() {
  editingIndicator.value = null
}

// 保存编辑
function saveEdit() {
  console.log('保存编辑：', editingIndicator.value)
  closeEditDrawer()
}

// 旧的执行版数据结构
const oldAbilityTree = [
  {
    id: 'basic',
    label: '基本能力',
    color: 'blue',
    children: [],
  },
  {
    id: 'teaching',
    label: '教学能力',
    color: 'teaching-blue',
    children: ['教学设计与实施', '教学资源开发', '教学评价与反馈', '教学创新与改进'],
  },
  {
    id: 'research',
    label: '教研能力',
    color: 'orange',
    children: [],
  },
  {
    id: 'practice',
    label: '实践能力',
    color: 'green',
    children: [],
  },
  {
    id: 'service',
    label: '服务能力',
    color: 'purple',
    children: [],
  },
]

const oldIndicators = [
  {
    name: '教学工作量（课时/学期）',
    novice: '≥ 64',
    competent: '≥ 96',
    backbone: '≥ 128',
    master: '≥ 160',
    rule: '实达课时数',
  },
  {
    name: '课堂教学评价（学生评教均分）',
    novice: '≥ 80分',
    competent: '≥ 85分',
    backbone: '≥ 90分',
    master: '≥ 95分',
    rule: '学生评教平均分',
  },
  {
    name: '听课课时（课时/学期）',
    novice: '≥ 8',
    competent: '≥ 16',
    backbone: '≥ 24',
    master: '≥ 32',
    rule: '学期内听课总课时',
  },
  {
    name: '教学规范执行',
    novice: '≥ 80%',
    competent: '≥ 90%',
    backbone: '≥ 95%',
    master: '≥ 98%',
    rule: '教学规范符合率',
  },
  {
    name: '教学资源建设（门/年）',
    novice: '≥ 1',
    competent: '≥ 2',
    backbone: '≥ 3',
    master: '≥ 5',
    rule: '有效教学资源数量',
  },
  {
    name: '信息化教学应用水平',
    novice: '≥ 60分',
    competent: '≥ 75分',
    backbone: '≥ 85分',
    master: '≥ 95分',
    rule: '信息化应用综合得分',
  },
]

// 数据映射：将旧的执行版结构映射为新组件结构
const normalizedAbilityTree: AbilityTreeNode[] = [
  {
    key: 'basic',
    label: '基本能力',
    icon: iconAbilityBasic,
    color: 'blue',
  },
  {
    key: 'teaching',
    label: '教学能力',
    icon: iconAbilityTeaching,
    color: 'blue',
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
    color: 'orange',
  },
  {
    key: 'practice',
    label: '实践能力',
    icon: iconAbilityPractice,
    color: 'green',
  },
  {
    key: 'service',
    label: '服务能力',
    icon: iconAbilityService,
    color: 'purple',
  },
]

const normalizedIndicators = computed<AbilityIndicator[]>(() =>
  oldIndicators.map((item, index) => ({
    key: `execution-indicator-${index}`,
    name: item.name,
    novice: item.novice,
    competent: item.competent,
    backbone: item.backbone,
    expert: item.master,
    basisLabel: item.rule,
    status: 'enabled',
  })),
)
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
                  <h1>2026 年度教师能力清单执行版</h1>
                  <span class="badge-status badge-success">已发布</span>
                </div>
                <p class="hero-subtitle">当前周期正在使用的教师能力清单</p>
              </div>

              <div class="hero-actions">
                <button class="primary-action btn-primary">
                  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5h10v10H5zM8 9h4M8 12h3" /></svg>
                  派生下一周期执行版
                </button>
                <button class="secondary-action btn-secondary">历史版本</button>
              </div>
            </div>

            <div class="hero-summary-strip admin-summary-strip">
              <div class="summary-item admin-summary-item source-item">
                <span class="admin-summary-label">基准版</span>
                <button class="admin-summary-link template-link">职业院校教师能力清单 V1.0</button>
              </div>
              <div class="summary-item admin-summary-item">
                <span class="admin-summary-label">适用范围</span>
                <strong class="admin-summary-value">全校教师</strong>
              </div>
              <div class="summary-item admin-summary-item">
                <span class="admin-summary-label">最近更新</span>
                <strong class="admin-summary-value">2026-06-08 20:30</strong>
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

      <!-- 编辑抽屉 -->
      <div v-if="editingIndicator" class="edit-drawer-overlay" @click="closeEditDrawer">
        <div class="edit-drawer" @click.stop>
          <div class="drawer-header">
            <h3 class="drawer-title">编辑指标</h3>
            <button class="drawer-close" @click="closeEditDrawer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <div class="drawer-tip">
            当前执行版已发布，修改后将先保存为调整内容，确认后再生效。
          </div>

          <div class="drawer-form">
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
              <input class="form-input" type="text" :value="editingIndicator?.name || ''" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">新手</label>
                <input class="form-input" type="text" :value="editingIndicator?.novice || ''" />
              </div>
              <div class="form-group">
                <label class="form-label">胜任</label>
                <input class="form-input" type="text" :value="editingIndicator?.competent || ''" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">骨干</label>
                <input class="form-input" type="text" :value="editingIndicator?.backbone || ''" />
              </div>
              <div class="form-group">
                <label class="form-label">名师</label>
                <input class="form-input" type="text" :value="editingIndicator?.expert || ''" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">计算规则</label>
              <input class="form-input" type="text" :value="editingIndicator?.basisLabel || ''" />
            </div>
            <div class="form-group">
              <label class="form-label">状态</label>
              <label class="form-switch">
                <input type="checkbox" checked />
                <span class="form-switch-label">已启用</span>
              </label>
            </div>
          </div>

          <div class="drawer-actions">
            <button class="btn-secondary" @click="closeEditDrawer">取消</button>
            <button class="btn-primary" @click="saveEdit">保存</button>
          </div>
        </div>
      </div>
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

/* 编辑抽屉样式 */
.edit-drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  background: rgba(15, 23, 42, 0.28);
}

.edit-drawer {
  width: 540px;
  max-width: calc(100vw - 72px);
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: -16px 0 40px rgba(15, 23, 42, 0.18);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid var(--color-card-border);
}

.drawer-title {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--color-text-primary);
}

.drawer-close {
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 8px;
  background: #f5f8ff;
  color: #7d899b;
  cursor: pointer;
  transition: all 0.16s ease;
}

.drawer-close:hover {
  background: #eaf2ff;
  color: var(--color-primary);
}

.drawer-tip {
  padding: 16px 24px;
  color: #7d899b;
  font-size: 13px;
  line-height: 1.6;
  background: #f8fbff;
  border-bottom: 1px solid var(--color-card-border);
}

.drawer-form {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  color: #7d899b;
  font-size: 13px;
  font-weight: 700;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
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
  gap: 8px;
  cursor: pointer;
}

.form-switch input[type="checkbox"] {
  width: 44px;
  height: 24px;
  appearance: none;
  background: #e1efff;
  border-radius: 12px;
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

.drawer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid var(--color-card-border);
  background: #fff;
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
    gap: 16px;
    margin-bottom: 12px;
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
    gap: 12px;
  }

  @media (max-width: 768px) {
    .edit-drawer {
      width: 100%;
      max-width: 100%;
    }
  }
}
</style>
