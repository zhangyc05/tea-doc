<template>
  <div class="profile-panel">
    <section class="hero-card">
      <div>
        <p class="eyebrow">项目风格画像</p>
        <h2 class="style-name">{{ profile.styleName }}</h2>
        <p class="positioning">{{ profile.positioning }}</p>
      </div>
      <div class="product-card">
        <span class="label">产品</span>
        <strong>{{ profile.productName }}</strong>
        <span class="type">{{ profile.productType }}</span>
      </div>
    </section>

    <section class="section-grid two-columns">
      <div class="info-card">
        <h3>服务对象</h3>
        <div class="tag-list">
          <span v-for="item in profile.audience" :key="item" class="tag">{{ item }}</span>
        </div>
      </div>
      <div class="info-card">
        <h3>核心气质</h3>
        <div class="tag-list">
          <span v-for="item in profile.coreMood" :key="item" class="tag primary">{{ item }}</span>
        </div>
      </div>
    </section>

    <section class="info-card">
      <h3>设计原则</h3>
      <ul class="rule-list">
        <li v-for="item in profile.designPrinciples" :key="item">{{ item }}</li>
      </ul>
    </section>

    <section class="section-grid four-columns">
      <div class="info-card compact">
        <h3>颜色</h3>
        <ul class="mini-list">
          <li v-for="item in profile.visualRules.color" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div class="info-card compact">
        <h3>布局</h3>
        <ul class="mini-list">
          <li v-for="item in profile.visualRules.layout" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div class="info-card compact">
        <h3>动效</h3>
        <ul class="mini-list">
          <li v-for="item in profile.visualRules.motion" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div class="info-card compact">
        <h3>内容</h3>
        <ul class="mini-list">
          <li v-for="item in profile.visualRules.content" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <section class="info-card">
      <div class="section-title-row">
        <h3>风格组合方案</h3>
        <span class="hint">用于后续效果图转 Vue 前的风格判断</span>
      </div>
      <div class="recipe-list">
        <article v-for="recipe in recipes" :key="recipe.name" class="recipe-card">
          <div class="recipe-header">
            <span class="recipe-name">{{ recipe.name }}</span>
            <strong>{{ recipe.style }}</strong>
          </div>
          <p>{{ recipe.reason }}</p>
          <div class="recipe-columns">
            <div>
              <span class="small-title">适用</span>
              <ul>
                <li v-for="item in recipe.usage" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div>
              <span class="small-title">边界</span>
              <ul>
                <li v-for="item in recipe.guardrails" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ProjectDesignProfile, StyleRecipe } from '@/lib/design-system/types'

defineProps<{
  profile: ProjectDesignProfile
  recipes: StyleRecipe[]
}>()
</script>

<style scoped>
.profile-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-card,
.info-card,
.recipe-card {
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.hero-card {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 28px;
}

.eyebrow,
.label,
.hint,
.small-title {
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 600;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--color-primary);
}

.style-name {
  margin: 0 0 12px;
  color: var(--color-text-primary);
  font-size: 28px;
  line-height: 1.25;
}

.positioning {
  max-width: 720px;
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.product-card {
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px;
  border-radius: var(--radius-md);
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.product-card strong {
  color: var(--color-text-primary);
}

.type {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.section-grid {
  display: grid;
  gap: 16px;
}

.two-columns {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.four-columns {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.info-card {
  padding: 22px;
}

.info-card h3 {
  margin: 0 0 16px;
  color: var(--color-text-primary);
  font-size: 16px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: var(--radius-full);
  background: var(--color-page-bg-soft);
  color: var(--color-text-secondary);
  font-size: 13px;
}

.tag.primary {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.rule-list,
.mini-list,
.recipe-columns ul {
  margin: 0;
  padding-left: 18px;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.compact {
  min-height: 220px;
}

.mini-list {
  font-size: 13px;
}

.section-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.section-title-row h3 {
  margin: 0;
}

.recipe-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.recipe-card {
  padding: 18px;
}

.recipe-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}

.recipe-name {
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 600;
}

.recipe-card p {
  margin: 0 0 14px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.recipe-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

@media (max-width: 1024px) {
  .four-columns,
  .recipe-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-card,
  .two-columns,
  .four-columns,
  .recipe-list,
  .recipe-columns {
    grid-template-columns: 1fr;
  }

  .hero-card {
    flex-direction: column;
  }
}
</style>
