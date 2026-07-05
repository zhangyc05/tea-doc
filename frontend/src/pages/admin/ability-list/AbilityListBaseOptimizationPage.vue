<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()

function goToMergedOptimization() {
  router.replace({
    path: '/admin/ability-list/base',
    query: { optimization: '1' },
  })
}
</script>

<template>
  <AdminLayout active-key="ability-list-base">
    <section class="merged-optimization-notice admin-card">
      <div>
        <h1>优化建议已合并到基准模板页</h1>
        <p>制度文件、运行反馈和人工建议现在直接在基准模板页内处理，采纳后形成修订草稿，发布新版本后生效。</p>
      </div>
      <Button @click="goToMergedOptimization">返回基准模板并查看优化建议</Button>
    </section>
  </AdminLayout>
</template>

<style scoped>
.merged-optimization-notice {
  display: flex;
  min-height: 220px;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-admin-xl);
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  background: #fff;
  box-shadow: var(--shadow-admin-card-faint);
  padding: clamp(24px, 2vw, 38px);
}

.merged-optimization-notice h1,
.merged-optimization-notice p {
  margin: 0;
}

.merged-optimization-notice h1 {
  color: var(--color-text-primary);
  font-size: clamp(22px, 1.35vw, 28px);
  font-weight: 950;
}

.merged-optimization-notice p {
  max-width: 680px;
  margin-top: var(--space-admin-sm);
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 750;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .merged-optimization-notice {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
