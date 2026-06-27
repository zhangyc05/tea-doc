<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue'

const abilityTree = [
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

const indicators = [
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
</script>

<template>
  <AdminLayout active-key="ability-list-execution">
    <div class="execution-page">
      <section class="execution-hero">
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
                  <span class="status-badge">已发布</span>
                </div>
                <p class="hero-subtitle">当前周期正在使用的教师能力清单</p>
              </div>

              <div class="hero-actions">
                <button class="primary-action">
                  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5h10v10H5zM8 9h4M8 12h3" /></svg>
                  派生下一周期执行版
                </button>
                <button class="secondary-action">历史版本</button>
              </div>
            </div>

            <div class="hero-summary-strip">
              <div class="summary-item source-item">
                <span>基准模版</span>
                <button class="template-link">职业院校教师能力清单 V1.0</button>
              </div>
              <div class="summary-item">
                <span>适用范围</span>
                <strong>全校教师</strong>
              </div>
              <div class="summary-item">
                <span>最近更新</span>
                <strong>2026-06-08 20:30</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="work-area">
        <aside class="structure-card panel-card">
          <header class="card-heading">
            <span class="card-icon structure-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4 8 4-8 4-8-4 8-4Zm8 8-8 4-8-4m16 4-8 4-8-4" /></svg>
            </span>
            <strong>能力结构</strong>
          </header>

          <div class="ability-tree">
            <div v-for="node in abilityTree" :key="node.id" class="tree-group">
              <div class="tree-row" :class="[`color-${node.color}`, { expanded: node.children.length }]">
                <span class="tree-symbol">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4v4l3 2" /></svg>
                </span>
                <span>{{ node.label }}</span>
                <em>›</em>
              </div>

              <div v-if="node.children.length" class="tree-children">
                <div
                  v-for="child in node.children"
                  :key="child"
                  class="tree-child"
                  :class="{ active: child === '教学设计与实施' }"
                >
                  <strong>{{ child }}</strong>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section class="indicator-card panel-card">
          <header class="indicator-header">
            <div class="indicator-title-wrap">
              <span class="card-icon indicator-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h6v14H5zM13 5h6v14h-6zM7 9h2m6 0h2" /></svg>
              </span>
              <div>
                <h2>教学能力 / 教学设计与实施</h2>
              </div>
            </div>
          </header>

          <div class="indicator-table-wrap">
            <table class="indicator-table">
              <thead>
                <tr>
                  <th>指标名称</th>
                  <th>新手</th>
                  <th>胜任</th>
                  <th>骨干</th>
                  <th>名师</th>
                  <th>计算规则</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in indicators" :key="row.name">
                  <td class="name-cell">{{ row.name }}</td>
                  <td>{{ row.novice }}</td>
                  <td>{{ row.competent }}</td>
                  <td>{{ row.backbone }}</td>
                  <td>{{ row.master }}</td>
                  <td>{{ row.rule }}</td>
                  <td><span class="enabled-badge">已启用</span></td>
                  <td><button class="edit-link">编辑</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
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

.execution-hero,
.panel-card {
  border: 1px solid #dce7f7;
  background: #fff;
  box-shadow: 0 14px 34px rgba(17, 42, 89, 0.07);
}

.execution-hero {
  position: relative;
  min-height: clamp(174px, 12vw, 220px);
  overflow: hidden;
  border-radius: 14px;
  background:
    radial-gradient(circle at 38% 72%, rgba(11, 99, 246, 0.08) 0, transparent 30%),
    linear-gradient(135deg, #ffffff 0%, #f8fbff 42%, #eaf5ff 100%);
}

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
  min-height: clamp(174px, 12vw, 220px);
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
  background: linear-gradient(145deg, #0b63f6 0%, #287eff 100%);
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
  color: #07122f;
  font-size: clamp(22px, 1.45vw, 28px);
  font-weight: 950;
  letter-spacing: -0.55px;
  line-height: 1.16;
  white-space: nowrap;
}

.status-badge {
  display: inline-flex;
  flex: none;
  align-items: center;
  height: clamp(22px, 1.25vw, 26px);
  padding: 0 clamp(9px, 0.6vw, 12px);
  border-radius: 999px;
  background: #dff7e9;
  color: #0d9f58;
  font-size: clamp(11px, 0.62vw, 12px);
  font-weight: 900;
}

.hero-subtitle {
  margin: 0;
  color: #65758f;
  font-size: clamp(12px, 0.75vw, 14px);
  font-weight: 700;
  line-height: 1.4;
}

.hero-summary-strip {
  display: flex;
  max-width: 100%;
  align-items: center;
  gap: clamp(16px, 1.15vw, 24px);
  border: 1px solid rgba(218, 229, 246, 0.56);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.62);
  padding: clamp(8px, 0.58vw, 11px) clamp(12px, 0.9vw, 16px);
  box-shadow: 0 8px 18px rgba(18, 42, 84, 0.03);
  backdrop-filter: blur(3px);
}

.summary-item {
  display: inline-flex;
  position: relative;
  min-width: 0;
  align-items: center;
  gap: 9px;
  white-space: nowrap;
}

.summary-item + .summary-item::before {
  display: inline-flex;
  width: 4px;
  height: 4px;
  flex: none;
  border-radius: 999px;
  background: #b5c5dc;
  margin-right: clamp(2px, 0.3vw, 6px);
  content: '';
}

.summary-item span {
  color: #6b7b94;
  font-size: clamp(12px, 0.7vw, 13px);
  font-weight: 800;
}

.summary-item strong,
.template-link {
  color: #07122f;
  font-size: clamp(13px, 0.78vw, 15px);
  font-weight: 950;
  white-space: nowrap;
}

.template-link {
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--color-primary);
  cursor: pointer;
}

.template-link:hover {
  text-decoration: underline;
}

.hero-actions {
  display: flex;
  flex: none;
  align-items: center;
  gap: clamp(10px, 0.7vw, 14px);
  padding-top: 0;
}

.primary-action,
.secondary-action,
.outline-action,
.link-action,
.edit-link {
  border: 0;
  background: transparent;
  font-family: inherit;
  cursor: pointer;
}

.primary-action {
  display: inline-flex;
  height: clamp(38px, 2.4vw, 46px);
  align-items: center;
  gap: clamp(6px, 0.45vw, 9px);
  padding: 0 clamp(16px, 1.1vw, 22px);
  border-radius: 7px;
  background: linear-gradient(135deg, #0b63f6 0%, #0055e6 100%);
  box-shadow: 0 12px 22px rgba(11, 99, 246, 0.22);
  color: #fff;
  font-size: clamp(13px, 0.78vw, 14px);
  font-weight: 900;
  white-space: nowrap;
}

.primary-action svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.secondary-action {
  display: inline-flex;
  height: clamp(38px, 2.4vw, 46px);
  align-items: center;
  border: 1px solid rgba(190, 207, 232, 0.9);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.72);
  padding: 0 clamp(13px, 0.9vw, 18px);
  color: var(--color-primary);
  font-size: clamp(13px, 0.78vw, 14px);
  font-weight: 900;
  white-space: nowrap;
}

.link-action {
  color: var(--color-primary);
  font-size: clamp(13px, 0.78vw, 14px);
  font-weight: 900;
}

.work-area {
  display: grid;
  grid-template-columns: minmax(270px, 21.5%) minmax(0, 1fr);
  gap: clamp(18px, 1.25vw, 24px);
}

.panel-card {
  border-radius: 14px;
}

.structure-card {
  min-height: clamp(280px, 18vw, 340px);
  padding: clamp(18px, 1.2vw, 22px) clamp(16px, 1.1vw, 20px);
}

.card-heading,
.indicator-header {
  display: flex;
  align-items: flex-start;
}

.card-heading {
  gap: 10px;
  margin-bottom: 12px;
}

.card-heading strong {
  color: #07122f;
  font-size: 17px;
  font-weight: 900;
}

.card-icon {
  display: inline-flex;
  flex: none;
  width: clamp(26px, 1.5vw, 30px);
  height: clamp(26px, 1.5vw, 30px);
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #eaf2ff;
  color: var(--color-primary);
}

.card-icon svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ability-tree {
  padding-top: 2px;
}

.tree-group + .tree-group {
  margin-top: clamp(6px, 0.5vw, 10px);
}

.tree-row,
.tree-child {
  display: flex;
  align-items: center;
  color: #101c34;
  font-weight: 900;
}

.tree-row {
  height: 40px;
  gap: 12px;
  color: #101c34;
  font-size: 15px;
  font-weight: 850;
}

.tree-row em {
  margin-left: auto;
  color: #7c8ca3;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
}

.tree-symbol {
  display: inline-flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #eef5ff;
}

.tree-symbol svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.color-blue .tree-symbol {
  background: #f0f7ff;
  color: var(--color-primary);
}

.color-teaching-blue .tree-symbol {
  background: #d0e8ff;
  color: var(--color-primary);
}

.color-orange .tree-symbol {
  background: #fff5e6;
  color: var(--color-warning);
}

.color-green .tree-symbol {
  background: #ecf9f2;
  color: var(--color-success);
}

.color-purple .tree-symbol {
  background: #f4efff;
  color: var(--color-purple);
}

.tree-children {
  position: relative;
  margin: 2px 0 4px 13px;
  padding-left: 28px;
}

.tree-children::before {
  position: absolute;
  left: 13px;
  top: 2px;
  bottom: 8px;
  width: 1px;
  border-radius: 999px;
  background: #e4ecf7;
  content: '';
}

.tree-child {
  position: relative;
  display: flex;
  height: 32px;
  align-items: center;
  border-radius: 7px;
  padding-right: 12px;
  color: #66758c;
  font-size: 14px;
  font-weight: 700;
}

.tree-child span {
  display: none;
}

.tree-child strong {
  font-weight: 750;
}

.tree-child:not(.active):hover {
  color: var(--color-primary);
  background: #f7faff;
}

.tree-child.active {
  margin-left: -8px;
  margin-right: 40px;
  padding-left: 12px;
  background: #f2f7ff;
  color: var(--color-primary);
  box-shadow: inset 1px 0 0 var(--color-primary);
}

.indicator-card {
  min-height: clamp(280px, 18vw, 340px);
  padding: clamp(18px, 1.2vw, 22px) clamp(18px, 1.2vw, 22px) clamp(20px, 1.4vw, 26px);
}

.indicator-header {
  justify-content: space-between;
  gap: 16px;
  margin-bottom: clamp(12px, 0.9vw, 16px);
}

.indicator-title-wrap {
  display: flex;
  min-width: 0;
  gap: clamp(10px, 0.7vw, 14px);
}

.indicator-title-wrap h2 {
  margin: 0 0 clamp(4px, 0.4vw, 6px);
  color: #07122f;
  font-size: clamp(17px, 1vw, 19px);
  font-weight: 950;
}

.indicator-title-wrap p {
  max-width: 760px;
  margin: 0;
  color: #62728a;
  font-size: clamp(12px, 0.7vw, 13px);
  font-weight: 600;
  line-height: 1.55;
}

.outline-action {
  display: inline-flex;
  flex: none;
  height: clamp(36px, 2.2vw, 42px);
  align-items: center;
  gap: 6px;
  padding: 0 clamp(12px, 0.9vw, 16px);
  border: 1px solid #d8e4f4;
  border-radius: 9px;
  background: #fff;
  color: var(--color-primary);
  font-size: clamp(12px, 0.7vw, 14px);
  font-weight: 900;
  box-shadow: 0 6px 16px rgba(16, 40, 90, 0.04);
}

.outline-action svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.indicator-table-wrap {
  overflow-x: auto;
  overflow-y: hidden;
  border: 1px solid #dce7f7;
  border-radius: 8px;
  background: #fff;
}

.indicator-table {
  width: 100%;
  min-width: 880px;
  border-collapse: collapse;
  table-layout: fixed;
}

.indicator-table th {
  height: clamp(42px, 2.5vw, 48px);
  background: #f3f8ff;
  color: #253653;
  font-size: clamp(13px, 0.78vw, 15px);
  font-weight: 950;
  text-align: left;
}

.indicator-table th,
.indicator-table td {
  border-right: 1px solid #dfe8f6;
  padding: 0 clamp(12px, 0.95vw, 18px);
}

.indicator-table th:last-child,
.indicator-table td:last-child {
  border-right: 0;
}

.indicator-table td {
  height: clamp(45px, 2.8vw, 53px);
  border-top: 1px solid #e5edf8;
  color: #253653;
  font-size: clamp(13px, 0.78vw, 15px);
  font-weight: 750;
}

.indicator-table .name-cell {
  color: #07122f;
  font-weight: 950;
}

.indicator-table th:first-child,
.indicator-table td:first-child {
  width: 25%;
}

.indicator-table th:nth-child(2),
.indicator-table td:nth-child(2),
.indicator-table th:nth-child(3),
.indicator-table td:nth-child(3),
.indicator-table th:nth-child(4),
.indicator-table td:nth-child(4),
.indicator-table th:nth-child(5),
.indicator-table td:nth-child(5) {
  width: 9.5%;
  text-align: center;
}

.indicator-table th:nth-child(6),
.indicator-table td:nth-child(6) {
  width: 17%;
  text-align: center;
}

.indicator-table th:nth-child(7),
.indicator-table td:nth-child(7) {
  width: 10%;
  text-align: center;
}

.indicator-table th:nth-child(8),
.indicator-table td:nth-child(8) {
  width: 10%;
  text-align: center;
}

.enabled-badge {
  display: inline-flex;
  align-items: center;
  height: clamp(26px, 1.55vw, 30px);
  padding: 0 clamp(11px, 0.68vw, 13px);
  border-radius: 7px;
  background: #dff7e9;
  color: #12a764;
  font-size: clamp(12px, 0.72vw, 14px);
  font-weight: 950;
}

.edit-link {
  color: var(--color-primary);
  font-size: clamp(13px, 0.78vw, 15px);
  font-weight: 950;
}

@media (max-width: 1440px) {
  .execution-hero {
    min-height: clamp(168px, 11.7vw, 210px);
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
    min-height: clamp(168px, 11.7vw, 210px);
    max-width: 68%;
  }

  .hero-heading-row {
    gap: 16px;
    margin-bottom: 12px;
  }

  .hero-title-row h1 {
    font-size: clamp(21px, 1.35vw, 25px);
  }

  .primary-action {
    padding: 0 16px;
  }

  .secondary-action {
    padding: 0 14px;
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

  .hero-summary-strip {
    flex-wrap: wrap;
  }

  .work-area {
    grid-template-columns: 1fr;
  }

  .structure-card,
  .indicator-card {
    min-height: auto;
  }
}
</style>
