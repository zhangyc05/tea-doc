<template>
  <main class="app-shell">
    <section class="welcome-card">
      <p class="eyebrow">Vue 前端工程已初始化</p>
      <h1>教师综合发展平台</h1>
      <p class="description">
        当前已完成 T1.1：创建 Vue 3 + Vite + TypeScript 最小可运行工程骨架。
      </p>
      <div class="status-row">
        <span>下一步</span>
        <strong>T1.2 接入 Tailwind CSS</strong>
      </div>
    </section>
  </main>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: #f6f8f7;
  color: #1f2933;
  font-family:
    Inter,
    'PingFang SC',
    'Microsoft YaHei',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

.welcome-card {
  width: min(720px, 100%);
  padding: 40px;
  border: 1px solid #e5eae7;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 4px 14px rgba(31, 41, 51, 0.05);
}

.eyebrow {
  margin: 0 0 12px;
  color: #2fbf9b;
  font-size: 14px;
  font-weight: 600;
}

h1 {
  margin: 0;
  font-size: 32px;
  line-height: 1.25;
}

.description {
  margin: 16px 0 0;
  color: #5b6670;
  font-size: 16px;
  line-height: 1.7;
}

.status-row {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 28px;
  padding: 14px 16px;
  border-radius: 12px;
  background: #f2fbf8;
  color: #5b6670;
}

.status-row strong {
  color: #1f2933;
}
</style>
