<template>
  <div class="patterns-panel">
    <article v-for="pattern in patterns" :key="pattern.id" class="pattern-card">
      <div class="pattern-header">
        <div>
          <h2>{{ pattern.name }}</h2>
          <p>{{ pattern.purpose }}</p>
        </div>
        <span class="density-badge">{{ pattern.density }}</span>
      </div>

      <div class="applies-list">
        <span v-for="item in pattern.appliesTo" :key="item" class="tag">{{ item }}</span>
      </div>

      <div class="pattern-grid">
        <section>
          <h3>页面结构</h3>
          <ol class="step-list">
            <li v-for="item in pattern.structure" :key="item">{{ item }}</li>
          </ol>
        </section>
        <section>
          <h3>关键规则</h3>
          <ul class="rule-list">
            <li v-for="item in pattern.rules" :key="item">{{ item }}</li>
          </ul>
        </section>
        <section>
          <h3>避免事项</h3>
          <ul class="avoid-list">
            <li v-for="item in pattern.avoid" :key="item">{{ item }}</li>
          </ul>
        </section>
        <section v-if="pattern.exampleRoutes?.length">
          <h3>示例路由</h3>
          <div class="route-list">
            <code v-for="route in pattern.exampleRoutes" :key="route">{{ route }}</code>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { PagePattern } from '@/lib/design-system/types'

defineProps<{
  patterns: PagePattern[]
}>()
</script>

<style scoped>
.patterns-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.pattern-card {
  padding: 24px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.pattern-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 18px;
}

.pattern-header h2 {
  margin: 0 0 8px;
  color: var(--color-text-primary);
  font-size: 20px;
}

.pattern-header p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.density-badge {
  flex: none;
  height: fit-content;
  padding: 6px 10px;
  border-radius: var(--radius-full);
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 600;
}

.applies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  padding: 5px 10px;
  border-radius: var(--radius-full);
  background: var(--color-page-bg-soft);
  color: var(--color-text-secondary);
  font-size: 12px;
}

.pattern-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr 0.8fr;
  gap: 18px;
}

.pattern-grid section {
  padding: 16px;
  border-radius: var(--radius-md);
  background: var(--color-page-bg-soft);
}

.pattern-grid h3 {
  margin: 0 0 12px;
  color: var(--color-text-primary);
  font-size: 14px;
}

.step-list,
.rule-list,
.avoid-list {
  margin: 0;
  padding-left: 18px;
  color: var(--color-text-secondary);
  font-size: 13px;
  line-height: 1.7;
}

.route-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.route-list code {
  padding: 6px 8px;
  border-radius: var(--radius-sm);
  background: var(--color-card-bg);
  color: var(--color-text-secondary);
  font-size: 12px;
}

@media (max-width: 1180px) {
  .pattern-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .pattern-header,
  .pattern-grid {
    grid-template-columns: 1fr;
    flex-direction: column;
  }
}
</style>
