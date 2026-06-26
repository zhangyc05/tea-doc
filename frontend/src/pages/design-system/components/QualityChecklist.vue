<template>
  <div class="quality-checklist">
    <article v-for="group in groups" :key="group.title" class="check-card">
      <div class="check-header">
        <h2>{{ group.title }}</h2>
        <p>{{ group.description }}</p>
      </div>
      <ul class="check-list">
        <li v-for="item in group.items" :key="item">
          <span class="check-mark">✓</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { QualityChecklistGroup } from '@/lib/design-system/types'

defineProps<{
  groups: QualityChecklistGroup[]
}>()
</script>

<style scoped>
.quality-checklist {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.check-card {
  padding: 22px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.check-header h2 {
  margin: 0 0 8px;
  color: var(--color-text-primary);
  font-size: 18px;
}

.check-header p {
  margin: 0 0 16px;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.check-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.check-list li {
  display: flex;
  gap: 10px;
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.6;
}

.check-mark {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-top: 2px;
  border-radius: var(--radius-full);
  background: var(--color-success-bg);
  color: var(--color-success);
  font-size: 12px;
  font-weight: 700;
}

@media (max-width: 980px) {
  .quality-checklist {
    grid-template-columns: 1fr;
  }
}
</style>
