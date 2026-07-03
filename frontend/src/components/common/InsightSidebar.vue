<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <aside class="insight-sidebar">
    <h3 class="insight-sidebar__title">{{ title }}</h3>
    <div class="insight-sidebar__items">
      <slot name="items" />
    </div>
    <div class="insight-sidebar__selected">
      <slot name="selected" />
    </div>
    <div class="insight-sidebar__action">
      <slot name="action" />
    </div>
  </aside>
</template>

<style scoped>
.insight-sidebar {
  min-width: 0;
  padding: var(--space-admin-card-gap);
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  background: #fff;
  box-shadow: var(--shadow-admin-card-subtle);
}

.insight-sidebar__title {
  margin: 0 0 20px;
  color: var(--color-admin-text-strong);
  font-size: 18px;
  font-weight: 700;
}

.insight-sidebar__items {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.insight-sidebar__action {
  margin-top: var(--space-admin-lg);
}

@media (max-width: 1320px) {
  .insight-sidebar {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-admin-lg);
  }

  .insight-sidebar__title,
  .insight-sidebar__items,
  .insight-sidebar__action {
    grid-column: 1 / -1;
  }

  .insight-sidebar__items {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .insight-sidebar__action {
    margin-top: 0;
  }
}

@media (max-width: 768px) {
  .insight-sidebar,
  .insight-sidebar__items {
    grid-template-columns: 1fr;
  }
}
</style>
