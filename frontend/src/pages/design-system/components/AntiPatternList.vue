<template>
  <div class="anti-pattern-list">
    <article v-for="item in items" :key="item.id" class="anti-card">
      <div class="anti-header">
        <span class="category">{{ item.category }}</span>
        <h2>{{ item.title }}</h2>
      </div>
      <p class="risk">{{ item.risk }}</p>
      <div class="anti-grid">
        <section>
          <h3>不要这样做</h3>
          <ul>
            <li v-for="avoid in item.avoid" :key="avoid">{{ avoid }}</li>
          </ul>
        </section>
        <section>
          <h3>推荐做法</h3>
          <p>{{ item.instead }}</p>
        </section>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { AntiPattern } from '@/lib/design-system/types'

defineProps<{
  items: AntiPattern[]
}>()
</script>

<style scoped>
.anti-pattern-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.anti-card {
  padding: 20px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.anti-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.category {
  width: fit-content;
  padding: 4px 8px;
  border-radius: var(--radius-full);
  background: var(--color-warning-bg);
  color: var(--color-warning);
  font-size: 12px;
  font-weight: 600;
}

.anti-header h2 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: 17px;
}

.risk {
  margin: 0 0 16px;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.anti-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.anti-grid section {
  padding: 14px;
  border-radius: var(--radius-md);
  background: var(--color-page-bg-soft);
}

.anti-grid h3 {
  margin: 0 0 10px;
  color: var(--color-text-primary);
  font-size: 13px;
}

.anti-grid ul {
  margin: 0;
  padding-left: 18px;
  color: var(--color-text-secondary);
  font-size: 13px;
  line-height: 1.7;
}

.anti-grid p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 13px;
  line-height: 1.7;
}

@media (max-width: 1080px) {
  .anti-pattern-list,
  .anti-grid {
    grid-template-columns: 1fr;
  }
}
</style>
