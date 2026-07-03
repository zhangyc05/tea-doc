<template>
  <section class="compact-filter-bar">
    <div class="compact-filter-bar__fields">
      <slot name="fields" />
      <slot name="search" />
    </div>

    <div class="compact-filter-bar__actions">
      <slot name="actions" />
      <slot name="message" />
    </div>
  </section>
</template>

<style scoped>
.compact-filter-bar {
  padding: 0 20px 20px;
  border-bottom: 1px solid var(--color-admin-border);
}

.compact-filter-bar__fields {
  display: grid;
  grid-template-columns: repeat(4, minmax(132px, 1fr)) minmax(220px, 1.25fr);
  gap: var(--space-admin-sm);
  align-items: center;
}

.compact-filter-bar__actions {
  display: flex;
  align-items: center;
  gap: var(--space-admin-md);
  margin-top: 10px;
}

@media (max-width: 1320px) {
  .compact-filter-bar__fields {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  .compact-filter-bar__fields {
    grid-template-columns: 1fr;
  }

  .compact-filter-bar__actions {
    flex-wrap: wrap;
  }
}
</style>
