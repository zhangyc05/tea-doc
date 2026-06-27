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
      <section class="page-intro">
        <div class="local-breadcrumb">能力清单 / 执行版</div>
        <p>查看当前周期正在使用的能力清单，并可进入调整配置或派生下一周期执行版。</p>
      </section>

      <section class="execution-hero">
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
            <div class="hero-title-row">
              <h1>2026 年度教师能力清单执行版</h1>
              <span class="status-badge">已发布</span>
            </div>

            <div class="hero-meta-grid">
              <div class="hero-meta-item source-item">
                <p>来源母版</p>
                <strong>职业院校教师能力清单 V1.0</strong>
                <a>查看母版 ›</a>
              </div>
              <div class="hero-meta-item">
                <p>适用范围</p>
                <strong>全校教师</strong>
              </div>
              <div class="hero-meta-item">
                <p>最近更新</p>
                <strong>2026-06-08 20:30</strong>
              </div>
            </div>

            <div class="hero-actions">
              <button class="primary-action">
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5h10v10H5zM8 9h4M8 12h3" /></svg>
                派生下一周期执行版
              </button>
              <button class="link-action">查看历史版本 ›</button>
            </div>
          </div>
        </div>

        <div class="hero-illustration" aria-hidden="true">
          <svg viewBox="0 0 640 312" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="heroPanel" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#F7FBFF" />
                <stop offset="0.44" stop-color="#EAF4FF" />
                <stop offset="1" stop-color="#D9EAFF" />
              </linearGradient>
              <linearGradient id="blueArrow" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stop-color="#0E63EA" />
                <stop offset="0.58" stop-color="#2B87FF" />
                <stop offset="1" stop-color="#8CC3FF" />
              </linearGradient>
              <linearGradient id="greenArrow" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stop-color="#1BBF93" />
                <stop offset="0.64" stop-color="#39D2A8" />
                <stop offset="1" stop-color="#7EE8C8" />
              </linearGradient>
              <linearGradient id="bookPage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#FFFFFF" />
                <stop offset="1" stop-color="#CFE4FF" />
              </linearGradient>
              <filter id="heroShadow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#0B63F6" flood-opacity="0.24" />
              </filter>
            </defs>

            <rect width="640" height="312" fill="url(#heroPanel)" />
            <path d="M60 245C154 176 224 179 314 236C396 288 498 270 624 159V312H60Z" fill="#D9EAFF" opacity="0.76" />
            <path d="M126 272c85-94 171-104 258-30 75 64 159 55 253-35" fill="none" stroke="#FFFFFF" stroke-width="4" opacity="0.62" />
            <circle cx="168" cy="64" r="30" fill="#fff" opacity="0.45" />
            <circle cx="330" cy="92" r="10" fill="#fff" opacity="0.72" />
            <circle cx="548" cy="142" r="18" fill="#fff" opacity="0.48" />

            <g opacity="0.42">
              <path d="M130 58h4M152 58h4M174 58h4M196 58h4M218 58h4M130 76h4M152 76h4M174 76h4M196 76h4M218 76h4M130 94h4M152 94h4M174 94h4M196 94h4M218 94h4" stroke="#94BDF7" stroke-width="3" stroke-linecap="round" />
            </g>

            <g opacity="0.72">
              <ellipse v-for="i in 16" :key="`drop-${i}`" :cx="82 + i * 24" :cy="202 + (i % 4) * 15" rx="5.5" ry="16" fill="#57BCE8" :opacity="0.36 + (i % 4) * 0.08" />
            </g>
            <g opacity="0.62">
              <ellipse v-for="i in 24" :key="`leaf-${i}`" :cx="88 + i * 20" :cy="222 - (i % 6) * 15" rx="7" ry="21" fill="#5EAEE7" :transform="`rotate(${-36 + (i % 7) * 12} ${88 + i * 20} ${222 - (i % 6) * 15})`" />
              <ellipse v-for="i in 16" :key="`leaf-green-${i}`" :cx="120 + i * 26" :cy="208 - (i % 5) * 18" rx="7" ry="21" fill="#45CFA7" :transform="`rotate(${-30 + (i % 5) * 15} ${120 + i * 26} ${208 - (i % 5) * 18})`" />
            </g>

            <g filter="url(#heroShadow)">
              <path d="M366 252h44V117h38L388 43l-60 74h38z" fill="url(#blueArrow)" />
              <path d="M492 252h48V84h42L516 20l-66 64h42z" fill="url(#greenArrow)" />
            </g>
            <g opacity="0.58">
              <path d="M440 252h24V164h22l-34-43-34 43h22z" fill="#8AB7F2" />
              <path d="M562 252h22V176h20l-31-39-31 39h20z" fill="#9ACBFF" />
            </g>

            <g filter="url(#heroShadow)">
              <path d="M250 239c47-27 101-27 162 0v42c-61-23-115-23-162 0z" fill="url(#bookPage)" />
              <path d="M412 239c61-27 115-27 162 0v42c-47-23-101-23-162 0z" fill="url(#bookPage)" />
              <path d="M407 235h12v50h-12z" fill="#8AB6F6" />
              <path d="M262 248c42-14 84-14 126 0M435 248c42-14 84-14 126 0M268 264c36-12 75-12 114 0M441 264c37-12 75-12 113 0" fill="none" stroke="#A9C9F6" stroke-width="3" stroke-linecap="round" opacity="0.75" />
            </g>
          </svg>
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
              <span class="card-icon indicator-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h6v14H5zM13 5h6v14h-6zM7 9h2m6 0h2" /></svg>
              </span>
              <div>
                <h2>教学能力 / 教学设计与实施</h2>
                <p>聚焦教学目标设计、教学过程组织与实施，提升课堂教学质量与学生学习成效。</p>
              </div>
            </div>
            <button class="outline-action">
              <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M9 16A7 7 0 1 0 9 2a7 7 0 0 0 0 14Zm0-4v-3m0-3h.01" /></svg>
              指标说明
            </button>
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

.page-intro {
  padding: 0 2px;
}

.local-breadcrumb {
  margin-bottom: clamp(6px, 0.55vw, 10px);
  color: #30415f;
  font-size: clamp(13px, 0.78vw, 15px);
  font-weight: 800;
}

.page-intro p {
  margin: 0;
  color: #53627a;
  font-size: clamp(13px, 0.78vw, 15px);
  line-height: 1.6;
}

.execution-hero,
.panel-card {
  border: 1px solid #dce7f7;
  background: #fff;
  box-shadow: 0 14px 34px rgba(17, 42, 89, 0.07);
}

.execution-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 42%);
  min-height: clamp(246px, 17.2vw, 330px);
  overflow: hidden;
  border-radius: 14px;
  background:
    radial-gradient(circle at 34% 72%, rgba(11, 99, 246, 0.08) 0, transparent 32%),
    linear-gradient(135deg, #ffffff 0%, #f6fbff 48%, #eaf5ff 100%);
}

.execution-hero::before {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 360px;
  height: 150px;
  background-image: radial-gradient(#b7d4ff 1px, transparent 1px);
  background-size: 12px 12px;
  opacity: 0.34;
  content: '';
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  gap: clamp(24px, 1.75vw, 34px);
  padding: clamp(30px, 2.5vw, 48px) 0 clamp(28px, 2.2vw, 42px) clamp(30px, 2.3vw, 44px);
}

.hero-emblem {
  flex: none;
  padding-top: clamp(4px, 0.4vw, 8px);
}

.hero-icon {
  display: flex;
  width: clamp(68px, 4.5vw, 86px);
  height: clamp(68px, 4.5vw, 86px);
  align-items: center;
  justify-content: center;
  border: clamp(9px, 0.62vw, 12px) solid rgba(255, 255, 255, 0.85);
  border-radius: 50%;
  background: linear-gradient(145deg, #0b63f6 0%, #287eff 100%);
  box-shadow: 0 18px 34px rgba(11, 99, 246, 0.24);
}

.hero-icon svg {
  width: clamp(32px, 2.2vw, 42px);
  height: clamp(32px, 2.2vw, 42px);
  fill: none;
  stroke: #fff;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hero-main {
  min-width: 0;
  padding-top: clamp(6px, 0.62vw, 12px);
}

.hero-title-row {
  display: flex;
  align-items: center;
  gap: clamp(12px, 0.95vw, 18px);
  margin-bottom: clamp(22px, 1.75vw, 34px);
}

.hero-title-row h1 {
  max-width: 760px;
  margin: 0;
  color: #07122f;
  font-size: clamp(25px, 1.8vw, 34px);
  font-weight: 950;
  letter-spacing: -0.7px;
  line-height: 1.18;
}

.status-badge {
  display: inline-flex;
  flex: none;
  align-items: center;
  height: clamp(26px, 1.55vw, 30px);
  padding: 0 clamp(12px, 0.8vw, 15px);
  border-radius: 999px;
  background: #dff7e9;
  color: #0d9f58;
  font-size: clamp(12px, 0.72vw, 14px);
  font-weight: 900;
}

.hero-meta-grid {
  display: grid;
  grid-template-columns: minmax(210px, 1.45fr) minmax(120px, 0.72fr) minmax(160px, 0.95fr);
  gap: clamp(20px, 1.85vw, 36px);
  margin-bottom: clamp(22px, 1.75vw, 34px);
}

.hero-meta-item {
  position: relative;
  min-width: 0;
}

.hero-meta-item + .hero-meta-item::before {
  position: absolute;
  left: calc(clamp(20px, 1.85vw, 36px) / -2);
  top: 4px;
  width: 1px;
  height: clamp(52px, 3.35vw, 64px);
  background: #d9e4f2;
  content: '';
}

.hero-meta-item p {
  margin: 0 0 clamp(6px, 0.45vw, 9px);
  color: #697890;
  font-size: clamp(13px, 0.8vw, 15px);
  font-weight: 700;
}

.hero-meta-item strong {
  display: block;
  color: #07122f;
  font-size: clamp(14px, 0.85vw, 16px);
  font-weight: 900;
  white-space: nowrap;
}

.hero-meta-item a {
  display: inline-flex;
  margin-top: clamp(10px, 0.8vw, 15px);
  color: var(--color-primary);
  font-size: clamp(14px, 0.8vw, 15px);
  font-weight: 900;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: clamp(22px, 1.85vw, 36px);
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
  display: inline-flex;
  height: clamp(44px, 2.9vw, 56px);
  align-items: center;
  gap: clamp(8px, 0.62vw, 12px);
  padding: 0 clamp(20px, 1.55vw, 30px);
  border-radius: 7px;
  background: linear-gradient(135deg, #0b63f6 0%, #0055e6 100%);
  box-shadow: 0 16px 28px rgba(11, 99, 246, 0.22);
  color: #fff;
  font-size: clamp(14px, 0.85vw, 16px);
  font-weight: 900;
}

.primary-action svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.link-action {
  color: var(--color-primary);
  font-size: clamp(14px, 0.85vw, 16px);
  font-weight: 900;
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
  grid-template-columns: minmax(270px, 21.5%) minmax(0, 1fr);
  gap: clamp(18px, 1.25vw, 24px);
}

.panel-card {
  border-radius: 14px;
}

.structure-card {
  min-height: clamp(418px, 26.6vw, 510px);
  padding: clamp(22px, 1.45vw, 28px) clamp(20px, 1.35vw, 26px);
}

.card-heading,
.indicator-header {
  display: flex;
  align-items: flex-start;
}

.card-heading {
  gap: clamp(12px, 0.85vw, 16px);
  margin-bottom: clamp(16px, 1.15vw, 22px);
}

.card-heading strong {
  color: #07122f;
  font-size: clamp(18px, 1.05vw, 20px);
  font-weight: 950;
}

.card-icon {
  display: inline-flex;
  flex: none;
  width: clamp(30px, 1.7vw, 32px);
  height: clamp(30px, 1.7vw, 32px);
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #eaf2ff;
  color: var(--color-primary);
}

.card-icon svg {
  width: 22px;
  height: 22px;
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
  height: clamp(37px, 2.25vw, 43px);
  gap: clamp(12px, 0.85vw, 16px);
  font-size: clamp(15px, 0.85vw, 16px);
}

.tree-row em {
  margin-left: auto;
  color: #0c2448;
  font-style: normal;
  font-weight: 950;
}

.tree-symbol {
  display: inline-flex;
  width: clamp(26px, 1.5vw, 29px);
  height: clamp(26px, 1.5vw, 29px);
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e7f2ff;
  color: var(--color-primary);
}

.tree-symbol svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.color-orange .tree-symbol {
  background: #fff2dd;
  color: var(--color-warning);
}

.color-green .tree-symbol {
  background: #e8f8ef;
  color: var(--color-success);
}

.color-purple .tree-symbol {
  background: #f1ebff;
  color: var(--color-purple);
}

.tree-children {
  position: relative;
  margin: 4px 0 2px 13px;
  padding-left: clamp(32px, 1.95vw, 37px);
}

.tree-children::before {
  position: absolute;
  left: 14px;
  top: -4px;
  bottom: 18px;
  width: 1px;
  border-radius: 999px;
  background: #d8e5f6;
  content: '';
}

.tree-child {
  position: relative;
  height: clamp(36px, 2.25vw, 43px);
  gap: clamp(13px, 0.85vw, 18px);
  border-radius: 9px;
  color: #5b6a83;
  font-size: clamp(14px, 0.8vw, 15px);
}

.tree-child span {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #a1adc0;
}

.tree-child.active {
  margin-left: -12px;
  padding-left: 14px;
  background: #eaf2ff;
  color: var(--color-primary);
}

.tree-child.active span {
  background: var(--color-primary);
}

.tree-child strong {
  font-weight: 900;
}

.indicator-card {
  min-height: clamp(418px, 26.6vw, 510px);
  padding: clamp(22px, 1.35vw, 26px) clamp(22px, 1.35vw, 26px) clamp(24px, 1.65vw, 32px);
}

.indicator-header {
  justify-content: space-between;
  gap: 20px;
  margin-bottom: clamp(16px, 1.15vw, 22px);
}

.indicator-title-wrap {
  display: flex;
  min-width: 0;
  gap: clamp(12px, 0.85vw, 16px);
}

.indicator-title-wrap h2 {
  margin: 0 0 clamp(6px, 0.52vw, 10px);
  color: #07122f;
  font-size: clamp(19px, 1.15vw, 22px);
  font-weight: 950;
}

.indicator-title-wrap p {
  max-width: 760px;
  margin: 0;
  color: #62728a;
  font-size: clamp(13px, 0.75vw, 14px);
  font-weight: 600;
  line-height: 1.55;
}

.outline-action {
  display: inline-flex;
  flex: none;
  height: clamp(40px, 2.5vw, 48px);
  align-items: center;
  gap: 8px;
  padding: 0 clamp(15px, 1.05vw, 20px);
  border: 1px solid #d8e4f4;
  border-radius: 9px;
  background: #fff;
  color: var(--color-primary);
  font-size: clamp(13px, 0.78vw, 15px);
  font-weight: 900;
  box-shadow: 0 6px 16px rgba(16, 40, 90, 0.04);
}

.outline-action svg {
  width: 18px;
  height: 18px;
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
    grid-template-columns: minmax(0, 1fr) minmax(320px, 36%);
  }

  .hero-title-row h1 {
    max-width: 560px;
  }

  .hero-meta-grid {
    grid-template-columns: minmax(190px, 1.45fr) minmax(108px, 0.72fr) minmax(150px, 0.95fr);
  }
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

  .structure-card,
  .indicator-card {
    min-height: auto;
  }
}
</style>
