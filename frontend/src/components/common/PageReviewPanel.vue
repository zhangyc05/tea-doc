<script setup lang="ts">
defineProps<{
  open: boolean
  review: {
    route: string
    title: string
    goal: string
    screenshot: string
    sections: string[]
    dataRules: string[]
    interactions: string[]
    formRules: Array<{
      field: string
      required: boolean
      message: string
    }>
    checklist: string[]
  }
}>()
</script>

<template>
  <aside v-if="open" class="page-review-panel" aria-label="页面说明 / 验收">
    <header class="review-header">
      <span class="review-kicker">页面说明 / 验收</span>
      <h2>{{ review.title }}</h2>
      <p>{{ review.goal }}</p>
    </header>

    <dl class="review-meta">
      <div>
        <dt>路由</dt>
        <dd>{{ review.route }}</dd>
      </div>
      <div>
        <dt>效果图</dt>
        <dd>{{ review.screenshot }}</dd>
      </div>
    </dl>

    <section class="review-section">
      <h3>页面区域</h3>
      <ul>
        <li v-for="section in review.sections" :key="section">{{ section }}</li>
      </ul>
    </section>

    <section class="review-section">
      <h3>数据规则</h3>
      <ul>
        <li v-for="rule in review.dataRules" :key="rule">{{ rule }}</li>
      </ul>
    </section>

    <section class="review-section">
      <h3>交互规则</h3>
      <ul>
        <li v-for="rule in review.interactions" :key="rule">{{ rule }}</li>
      </ul>
    </section>

    <section class="review-section">
      <h3>表单规则</h3>
      <table>
        <thead>
          <tr>
            <th>字段</th>
            <th>必填</th>
            <th>提示</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rule in review.formRules" :key="rule.field">
            <td>{{ rule.field }}</td>
            <td>{{ rule.required ? '是' : '否' }}</td>
            <td>{{ rule.message }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="review-section">
      <h3>验收清单</h3>
      <ul class="checklist">
        <li v-for="item in review.checklist" :key="item">{{ item }}</li>
      </ul>
    </section>
  </aside>
</template>

<style scoped>
.page-review-panel {
  position: fixed;
  top: calc(var(--admin-topbar-height) + var(--space-admin-md-lg));
  right: var(--space-admin-md-lg);
  z-index: 30;
  display: flex;
  width: min(420px, calc(100vw - var(--space-admin-2xl)));
  max-height: calc(100vh - var(--admin-topbar-height) - var(--space-admin-2xl));
  flex-direction: column;
  gap: var(--space-admin-md-lg);
  overflow: auto;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-lg);
  background: var(--color-card-bg);
  box-shadow: var(--shadow-floating);
  padding: var(--space-admin-card-gap);
}

.review-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-xs);
}

.review-kicker {
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 900;
}

.review-header h2,
.review-section h3 {
  margin: 0;
  color: var(--color-text-primary);
}

.review-header h2 {
  font-size: 18px;
  font-weight: 950;
}

.review-header p,
.review-section li,
.review-meta dd,
.review-meta dt,
.review-section td,
.review-section th {
  font-size: 13px;
  line-height: 1.55;
}

.review-header p {
  margin: 0;
  color: #5f6d82;
}

.review-meta {
  display: grid;
  gap: var(--space-admin-xs);
  margin: 0;
  border-radius: var(--radius-admin-panel);
  background: var(--color-admin-bg);
  padding: var(--space-admin-sm);
}

.review-meta div {
  min-width: 0;
}

.review-meta dt {
  color: #6b7890;
  font-weight: 800;
}

.review-meta dd {
  margin: 2px 0 0;
  color: #243651;
  word-break: break-all;
}

.review-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-xs);
}

.review-section h3 {
  font-size: 14px;
  font-weight: 950;
}

.review-section ul {
  display: grid;
  gap: var(--space-admin-xs);
  margin: 0;
  padding-left: var(--space-admin-card-gap);
  color: #344764;
}

.review-section table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  color: #344764;
}

.review-section th,
.review-section td {
  border-bottom: 1px solid var(--color-admin-border);
  padding: var(--space-admin-xs);
  text-align: left;
}

.review-section th {
  background: #eef4ff;
  color: #253858;
  font-weight: 900;
}

.review-section tr:last-child td {
  border-bottom: 0;
}

.checklist li {
  font-weight: 750;
}
</style>
