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
    color: 'blue',
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
  ['教学工作量（课时/学期）', '≥ 64', '≥ 96', '≥ 128', '≥ 160', '实达课时数'],
  ['课堂教学评价（学生评教均分）', '≥ 80分', '≥ 85分', '≥ 90分', '≥ 95分', '学生评教平均分'],
  ['听课课时（课时/学期）', '≥ 8', '≥ 16', '≥ 24', '≥ 32', '学期内听课总课时'],
  ['教学规范执行', '≥ 80%', '≥ 90%', '≥ 95%', '≥ 98%', '教学规范符合率'],
  ['教学资源建设（门/年）', '≥ 1', '≥ 2', '≥ 3', '≥ 5', '有效教学资源数量'],
  ['信息化教学应用水平', '≥ 60分', '≥ 75分', '≥ 85分', '≥ 95分', '信息化应用综合得分'],
]
</script>

<template>
  <AdminLayout active-key="ability-list-execution">
    <div class="execution-page">
      <section class="page-intro">
        <div class="local-breadcrumb">能力清单 / 执行版</div>
        <p>查看当前周期正在使用的能力清单，并可进入调整配置或派生下一周期执行版。</p>
      </section>

      <section class="execution-hero">
        <div class="hero-left">
          <div class="hero-icon-wrap">
            <div class="hero-icon">
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <rect x="8" y="5" width="16" height="22" rx="3" />
                <path d="M12 12h8M12 17h8M12 22h5" />
                <circle cx="22" cy="23" r="4" />
              </svg>
            </div>
          </div>

          <div class="hero-main">
            <div class="hero-title-row">
              <h1>2026 年度教师能力清单执行版</h1>
              <span class="status-badge">已发布</span>
            </div>

            <div class="hero-meta-grid">
              <div class="hero-meta-item source-item">
                <span class="meta-icon small-book"></span>
                <div>
                  <p>来源母版</p>
                  <strong>职业院校教师能力清单 V1.0</strong>
                  <a>查看母版 ›</a>
                </div>
              </div>

              <div class="hero-meta-item">
                <span class="meta-icon people"></span>
                <div>
                  <p>适用范围</p>
                  <strong>全校教师</strong>
                </div>
              </div>

              <div class="hero-meta-item">
                <span class="meta-icon clock"></span>
                <div>
                  <p>最近更新</p>
                  <strong>2026-06-08 20:30</strong>
                </div>
              </div>
            </div>

            <div class="hero-actions">
              <button class="primary-action">派生下一周期执行版</button>
              <button class="link-action">查看历史版本 ›</button>
            </div>
          </div>
        </div>

        <div class="hero-illustration" aria-hidden="true">
          <svg viewBox="0 0 470 270" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#EAF3FF" />
                <stop offset="1" stop-color="#D8EAFE" />
              </linearGradient>
              <linearGradient id="arrowBlue" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stop-color="#2F7AF4" />
                <stop offset="1" stop-color="#79B8FF" />
              </linearGradient>
              <linearGradient id="arrowGreen" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stop-color="#35C69B" />
                <stop offset="1" stop-color="#74E1C0" />
              </linearGradient>
              <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#0B63F6" flood-opacity="0.18" />
              </filter>
            </defs>
            <rect width="470" height="270" fill="url(#heroBg)" />
            <circle cx="130" cy="60" r="38" fill="#fff" opacity="0.42" />
            <circle cx="340" cy="72" r="14" fill="#fff" opacity="0.7" />
            <circle cx="388" cy="154" r="10" fill="#fff" opacity="0.52" />

            <g opacity="0.72">
              <ellipse v-for="i in 12" :key="`drop-${i}`" :cx="68 + i * 25" :cy="178 + (i % 4) * 16" rx="6" ry="15" fill="#5FBDE6" :opacity="0.42 + (i % 3) * 0.08" />
            </g>
            <g opacity="0.58">
              <ellipse v-for="i in 18" :key="`leaf-${i}`" :cx="64 + i * 20" :cy="206 - (i % 5) * 14" rx="7" ry="20" fill="#78C7E6" :transform="`rotate(${-34 + (i % 6) * 13} ${64 + i * 20} ${206 - (i % 5) * 14})`" />
            </g>

            <g filter="url(#softShadow)">
              <path d="M268 224h50V110h34L292 34l-60 76h36z" fill="url(#arrowBlue)" />
              <path d="M370 224h54V78h38L396 20l-66 58h40z" fill="url(#arrowGreen)" />
            </g>

            <path d="M188 222c42-22 88-22 134 0 44-22 88-22 132 0v28c-44-18-88-18-132 0-46-18-92-18-134 0z" fill="#C7DFFF" opacity="0.78" />
            <path d="M188 220c42-16 88-16 134 0 44-16 88-16 132 0" fill="none" stroke="#EAF3FF" stroke-width="8" stroke-linecap="round" />
          </svg>
        </div>
      </section>

      <section class="work-area">
        <aside class="structure-card panel-card">
          <header class="card-heading">
            <span class="card-icon structure-icon"></span>
            <strong>能力结构</strong>
          </header>

          <div class="ability-tree">
            <div v-for="node in abilityTree" :key="node.id" class="tree-group">
              <div class="tree-row" :class="[`color-${node.color}`, { expanded: node.children.length }]">
                <span class="tree-dot"></span>
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
                  <span></span>
                  <strong>{{ child }}</strong>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section class="indicator-card panel-card">
          <header class="indicator-header">
            <div class="indicator-title-wrap">
              <span class="card-icon indicator-icon"></span>
              <div>
                <h2>教学能力 / 教学设计与实施</h2>
                <p>聚焦教学目标设计、教学过程组织与实施，提升课堂教学质量与学生学习成效。</p>
              </div>
            </div>
            <button class="outline-action">指标说明</button>
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
                <tr v-for="row in indicators" :key="row[0]">
                  <td class="name-cell">{{ row[0] }}</td>
                  <td>{{ row[1] }}</td>
                  <td>{{ row[2] }}</td>
                  <td>{{ row[3] }}</td>
                  <td>{{ row[4] }}</td>
                  <td>{{ row[5] }}</td>
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
  flex-direction: column;
  gap: 18px;
  min-height: calc(100vh - var(--admin-topbar-height) - 40px);
}

.page-intro {
  padding: 0 2px;
}

.local-breadcrumb {
  margin-bottom: 14px;
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 700;
}

.page-intro p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 13px;
}

.execution-hero,
.panel-card {
  border: 1px solid var(--color-card-border);
  background: var(--color-card-bg);
  box-shadow: var(--shadow-card);
}

.execution-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  min-height: 268px;
  overflow: hidden;
  border-radius: 14px;
  background: #eef6ff;
}

.hero-left {
  display: flex;
  gap: 28px;
  padding: 36px 38px 30px 38px;
}

.hero-icon-wrap {
  flex: none;
  padding-top: 8px;
}

.hero-icon {
  display: flex;
  width: 74px;
  height: 74px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 14px 26px rgba(11, 99, 246, 0.16);
}

.hero-icon svg {
  width: 42px;
  height: 42px;
}

.hero-icon rect,
.hero-icon circle {
  fill: var(--color-primary);
}

.hero-icon path {
  fill: none;
  stroke: #ffffff;
  stroke-width: 2.2;
  stroke-linecap: round;
}

.hero-main {
  min-width: 0;
  padding-top: 8px;
}

.hero-title-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.hero-title-row h1 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: 28px;
  font-weight: 900;
  line-height: 1.2;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 12px;
  border-radius: 999px;
  background: var(--color-success-bg);
  color: var(--color-success);
  font-size: 12px;
  font-weight: 800;
}

.hero-meta-grid {
  display: grid;
  grid-template-columns: 300px 170px 210px;
  gap: 28px;
  margin-bottom: 28px;
}

.hero-meta-item {
  position: relative;
  display: flex;
  min-width: 0;
  gap: 12px;
}

.hero-meta-item + .hero-meta-item::before {
  position: absolute;
  left: -18px;
  top: 4px;
  width: 1px;
  height: 58px;
  background: var(--color-divider);
  content: '';
}

.meta-icon {
  flex: none;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  border-radius: 6px;
  background: var(--color-primary-soft);
  border: 1px solid #c9dbff;
}

.hero-meta-item p {
  margin: 0 0 8px;
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 600;
}

.hero-meta-item strong {
  display: block;
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 800;
}

.hero-meta-item a {
  display: inline-flex;
  margin-top: 14px;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 800;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 28px;
}

.primary-action,
.outline-action,
.link-action,
.edit-link {
  border: 0;
  background: transparent;
  font-family: inherit;
  cursor: pointer;
}

.primary-action {
  height: 44px;
  padding: 0 26px;
  border-radius: 5px;
  background: var(--color-primary);
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  box-shadow: 0 10px 22px rgba(11, 99, 246, 0.18);
}

.link-action {
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 800;
}

.hero-illustration {
  position: relative;
  min-width: 0;
}

.hero-illustration svg {
  display: block;
  width: 100%;
  height: 100%;
}

.work-area {
  display: grid;
  grid-template-columns: 282px minmax(0, 1fr);
  gap: 22px;
}

.panel-card {
  border-radius: 12px;
}

.structure-card {
  min-height: 454px;
  padding: 22px 20px;
}

.card-heading,
.indicator-header {
  display: flex;
  align-items: flex-start;
}

.card-heading {
  gap: 12px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--color-divider);
}

.card-heading strong {
  color: var(--color-text-primary);
  font-size: 16px;
  font-weight: 900;
}

.card-icon {
  position: relative;
  display: inline-flex;
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--color-primary-soft);
}

.structure-icon::after {
  position: absolute;
  left: 9px;
  top: 7px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 12px 0 -3px var(--color-primary);
  content: '';
}

.indicator-icon::before {
  position: absolute;
  left: 8px;
  top: 8px;
  width: 5px;
  height: 5px;
  border-radius: 2px;
  background: var(--color-primary);
  box-shadow: 9px 0 0 var(--color-primary), 0 9px 0 var(--color-primary), 9px 9px 0 var(--color-primary);
  content: '';
}

.ability-tree {
  padding-top: 16px;
}

.tree-group + .tree-group {
  margin-top: 8px;
}

.tree-row,
.tree-child {
  display: flex;
  align-items: center;
  height: 34px;
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 800;
}

.tree-row {
  gap: 10px;
}

.tree-row em {
  margin-left: auto;
  color: var(--color-text-tertiary);
  font-style: normal;
  font-weight: 900;
}

.tree-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--color-primary);
}

.color-orange .tree-dot {
  background: var(--color-warning);
}

.color-green .tree-dot {
  background: var(--color-success);
}

.color-purple .tree-dot {
  background: var(--color-purple);
}

.tree-children {
  position: relative;
  margin: 2px 0 4px 4px;
  padding-left: 28px;
}

.tree-children::before {
  position: absolute;
  left: 11px;
  top: -2px;
  bottom: 12px;
  width: 2px;
  border-radius: 999px;
  background: var(--color-card-border);
  content: '';
}

.tree-child {
  position: relative;
  gap: 10px;
  padding-left: 0;
  border-radius: 8px;
  color: var(--color-text-secondary);
  font-weight: 700;
}

.tree-child span {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--color-text-disabled);
}

.tree-child.active {
  margin-left: -10px;
  padding-left: 10px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.tree-child.active span {
  background: var(--color-primary);
}

.indicator-card {
  min-height: 454px;
  padding: 22px 24px 24px;
}

.indicator-header {
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 20px;
}

.indicator-title-wrap {
  display: flex;
  min-width: 0;
  gap: 14px;
}

.indicator-title-wrap h2 {
  margin: 0 0 8px;
  color: var(--color-text-primary);
  font-size: 18px;
  font-weight: 900;
}

.indicator-title-wrap p {
  max-width: 720px;
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 12px;
  line-height: 1.65;
}

.outline-action {
  flex: none;
  height: 34px;
  padding: 0 16px;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 800;
}

.indicator-table-wrap {
  overflow: hidden;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  background: #fff;
}

.indicator-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.indicator-table th {
  height: 44px;
  background: #f6faff;
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 900;
  text-align: left;
}

.indicator-table th,
.indicator-table td {
  border-right: 1px solid var(--color-card-border-soft);
  padding: 0 14px;
}

.indicator-table th:last-child,
.indicator-table td:last-child {
  border-right: 0;
}

.indicator-table td {
  height: 45px;
  border-top: 1px solid var(--color-card-border-soft);
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 700;
}

.indicator-table .name-cell {
  color: var(--color-text-primary);
  font-weight: 900;
}

.indicator-table th:first-child,
.indicator-table td:first-child {
  width: 210px;
}

.indicator-table th:nth-child(6),
.indicator-table td:nth-child(6) {
  width: 170px;
}

.indicator-table th:nth-child(7),
.indicator-table td:nth-child(7) {
  width: 90px;
}

.indicator-table th:nth-child(8),
.indicator-table td:nth-child(8) {
  width: 72px;
}

.enabled-badge {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 10px;
  border-radius: 5px;
  background: var(--color-success-bg);
  color: var(--color-success);
  font-size: 11px;
  font-weight: 900;
}

.edit-link {
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 900;
}

@media (max-width: 1280px) {
  .execution-hero {
    grid-template-columns: 1fr;
  }

  .hero-illustration {
    display: none;
  }

  .work-area {
    grid-template-columns: 1fr;
  }
}
</style>
