# 管理端设计系统使用指南

## 概述

本指南基于 `/admin/ability-list/execution` 页面的设计规范，为管理端所有页面提供统一的设计语言和组件复用规则。

## 核心原则

**设计风格关键词：清朗、专业、克制、高级的教育治理 SaaS**

- **清朗**：避免重色后台，使用浅色清爽的背景
- **专业**：采用规范的设计 Token 和一致的视觉语言
- **克制**：控制视觉权重，避免过度装饰
- **高级**：精细的间距、阴影和过渡效果

## 设计 Token 使用规则

### 优先使用 Token

所有颜色、尺寸必须使用设计 Token，禁止硬编码：

```css
/* ✅ 正确 */
background: var(--color-page-bg);
border: 1px solid var(--color-card-border);
min-height: var(--admin-hero-height-default);

/* ❌ 错误 */
background: #F7FAFF;
border: 1px solid #E5ECF8;
min-height: 220px;
```

### 核心 Token 分类

**颜色 Token：**
- `--color-primary`: 品牌主色（按钮、链接、强调）
- `--color-page-bg`: 页面背景
- `--color-card-bg`: 卡片背景
- `--color-text-primary`: 主要文本
- `--color-text-secondary`: 次要文本
- `--color-text-tertiary`: 辅助文本
- `--color-card-border`: 卡片边框

**响应式尺寸：**
- `--admin-hero-height-compact`: 紧凑型 Hero（170px）
- `--admin-hero-height-default`: 默认 Hero（220px）
- `--admin-sidebar-width`: 侧栏宽度
- `--admin-topbar-height`: 顶栏高度
- `--admin-page-gutter-x`: 页面水平边距
- `--admin-page-gutter-y`: 页面垂直边距

**能力结构专用：**
- `--color-ability-basic`: 基本能力背景色
- `--color-ability-teaching-light`: 教学能力背景色
- `--color-ability-tree-child`: 能力树子项背景

## 通用样式类使用规则

### 必须优先使用通用类

开发新页面时，优先使用 `main.css` 中定义的通用样式类：

```vue
<!-- ✅ 正确：使用通用样式类 -->
<section class="admin-hero">
  <header class="admin-card-header">
    <span class="admin-card-icon">
      <!-- icon -->
    </span>
    <h1 class="admin-card-title">标题</h1>
  </header>
</section>

<!-- ❌ 错误：自定义重复样式 -->
<section class="my-page-hero">
  <header class="my-page-header">
    <!-- ... -->
  </header>
</section>
```

### 卡片模式

**基础卡片：**
```vue
<div class="admin-card">
  <header class="admin-card-header">
    <span class="admin-card-icon">
      <svg viewBox="0 0 24 24"><!-- icon path --></svg>
    </span>
    <h2 class="admin-card-title">卡片标题</h2>
  </header>
  <div class="admin-card-body">
    <!-- 内容 -->
  </div>
</div>
```

### 按钮模式

**按钮优先级：**
- `.btn-primary`: 主要操作（提交、确认）
- `.btn-secondary`: 次要操作（取消、返回）
- `.btn-outline`: 边框按钮（设置、配置）
- `.btn-link`: 链接按钮（编辑、详情）

```vue
<div class="action-bar">
  <button class="btn-primary">
    <svg viewBox="0 0 20 20"><path d="..."/></svg>
    确认提交
  </button>
  <button class="btn-secondary">取消</button>
  <button class="btn-outline">
    <svg viewBox="0 0 20 20"><path d="..."/></svg>
    高级设置
  </button>
  <button class="btn-link">查看详情</button>
</div>
```

### 状态徽章模式

```vue
<span class="badge-success">已启用</span>
<span class="badge-warning">待审核</span>
<span class="badge-danger">已禁用</span>
<span class="badge-info">处理中</span>
<span class="badge-primary">新功能</span>
```

### 表格模式

```vue
<div class="admin-table-container">
  <table class="admin-table">
    <thead>
      <tr>
        <th>列名</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td class="primary-text">{{ item.name }}</td>
        <td><span class="badge-success">{{ item.status }}</span></td>
        <td><button class="btn-link">编辑</button></td>
      </tr>
    </tbody>
  </table>
</div>
```

### Hero 区域模式

**标准 Hero 结构：**
```vue
<section class="admin-hero">
  <div class="hero-content">
    <div class="hero-emblem">
      <!-- 可选的标志图标 -->
    </div>
    <div class="hero-main">
      <div class="hero-heading-row">
        <div class="hero-title-group">
          <div class="hero-title-row">
            <h1>页面标题</h1>
            <span class="badge-success">已发布</span>
          </div>
          <p class="hero-subtitle">页面描述</p>
        </div>
        <div class="hero-actions">
          <button class="btn-primary">主要操作</button>
          <button class="btn-secondary">次要操作</button>
        </div>
      </div>
      <div class="admin-summary-strip">
        <div class="admin-summary-item">
          <span class="admin-summary-label">标签</span>
          <strong class="admin-summary-value">值</strong>
        </div>
      </div>
    </div>
  </div>
</section>
```

## 布局模式规则

### 工作区域网格

**两栏布局（侧栏 + 主内容）：**
```vue
<div class="work-area admin-work-grid">
  <aside class="admin-card">
    <!-- 侧栏内容 -->
  </aside>
  <section class="admin-card">
    <!-- 主内容区 -->
  </section>
</div>
```

**单栏布局：**
```vue
<div class="work-area admin-work-grid-single">
  <section class="admin-card">
    <!-- 主内容区 -->
  </section>
</div>
```

### 响应式设计规则

使用 `clamp()` 函数实现流动尺寸：

```css
/* ✅ 正确：流动尺寸 */
padding: clamp(12px, 0.8vw, 16px);
font-size: clamp(14px, 0.9vw, 18px);
gap: clamp(16px, 1.1vw, 20px);

/* ❌ 错误：固定尺寸 */
padding: 16px;
font-size: 16px;
gap: 20px;
```

**断点规则：**
- 1440px: 中等屏幕优化
- 1280px: 单栏布局切换

## 颜色使用规则

### 背景层次

```
页面背景: --color-page-bg (#F7FAFF)
卡片背景: --color-card-bg (#FFFFFF)
Hero背景: 渐变白 → 浅蓝
激活状态: --color-primary-soft (#EAF2FF)
悬停状态: #F7FAFF
```

### 文本层次

```
主要文本: --color-text-primary (#07122F)
次要文本: --color-text-secondary (#53627A)
辅助文本: --color-text-tertiary (#8A96AB)
禁用文本: --color-text-disabled (#B8C2D2)
```

### 品牌色使用

- **主色**: 仅用于品牌元素、主要操作、强调
- **浅色背景**: 用于大面积装饰，避免重色
- **边框色**: 使用浅色边框，保持克制的视觉效果

## 间距和尺寸规则

### 间距系统

使用 clamp() 实现流动间距：

```css
/* 紧凑间距 */
gap: clamp(6px, 0.4vw, 8px);

/* 标准间距 */
gap: clamp(12px, 0.8vw, 16px);

/* 宽松间距 */
gap: clamp(18px, 1.2vw, 24px);
```

### 卡片圆角

统一使用 `var(--radius-lg)` (12px)：
```css
.admin-card {
  border-radius: var(--radius-lg);
}
```

### 按钮圆角

- 主要/次要按钮: `var(--radius-sm)` (6px)
- 描边按钮: `var(--radius-md)` (10px)

## 页面开发检查清单

开发新页面时，确保：

- [ ] 所有颜色使用设计 Token
- [ ] 所有尺寸使用 clamp() 流动尺寸
- [ ] 优先使用通用样式类
- [ ] Hero 区域使用 `.admin-hero` 结构
- [ ] 卡片使用 `.admin-card` 系列
- [ ] 按钮使用 `.btn-*` 系列
- [ ] 表格使用 `.admin-table` 系列
- [ ] 徽章使用 `.badge-*` 系列
- [ ] 响应式断点正确设置
- [ ] 避免黑色重后台
- [ ] 视觉风格克制统一

## 禁止事项

### ❌ 硬编码颜色
```css
background: #ffffff;
color: #07122F;
border: 1px solid #E5ECF8;
```

### ❌ 固定尺寸
```css
width: 1200px;
height: 60px;
padding: 20px;
```

### ❌ 重复造轮子
```vue
<!-- 不需要重新创建卡片组件，使用 .admin-card -->
<div class="my-custom-card">...</div>
```

### ❌ 重色后台
```css
/* 避免使用黑色、深灰色作为大面积背景 */
background: #1a1a1a;
background: #333333;
```

## 参考页面

**基准页面：** `/admin/ability-list/execution`

此页面是管理端设计系统的参考标准，所有页面应该遵循相同的视觉语言和组件结构。

## Token 扩展指南

如需添加新的 Token，遵循以下规则：

1. **命名规范**: `--{类别}-{用途}-{变体}`
2. **颜色 Token**: 添加到 `tokens.css` 的对应分类
3. **尺寸 Token**: 优先使用 clamp() 响应式
4. **文档更新**: 在本文档中记录新 Token 的用途

---

**版本：** v1.0
**最后更新：** 2026-06-27
**维护者：** AI 前端开发团队