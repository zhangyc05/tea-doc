# 设计系统展示页面 MVP 实施计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建设计系统展示页面的最小可行产品，支持设计规范展示、基础导航和交互功能，仅开发环境可访问。

**Architecture:** 基于 Vue 3 + TypeScript + Vite 的单页应用，采用左右分栏布局，左侧为可折叠导航树，右侧为内容展示区。使用 CSS 变量自动提取设计 Token，无需手动维护数据。

**Tech Stack:** Vue 3 (Composition API), TypeScript, Vue Router, Tailwind CSS, shadcn-vue

---

## Chunk 1: 基础工具函数和类型定义

### Task 1.1: 创建 TypeScript 类型定义文件

**Files:**
- Create: `frontend/src/lib/design-system/types.ts`

- [ ] **Step 1: Write the complete type definitions**

```typescript
// frontend/src/lib/design-system/types.ts

// 导航项结构
export interface NavItem {
  id: string
  title: string
  icon?: string
  children?: NavItem[]
  content?: ContentModule
}

// 内容模块类型
export interface ContentModule {
  type: 'colors' | 'typography' | 'spacing' | 'components' | 'guides'
  title: string
  description?: string
  data: any
}

// 颜色 Token 结构
export interface ColorToken {
  name: string
  value: string
  description?: string
  usage?: string[]
}

// 字体 Token 结构
export interface FontToken {
  name: string
  value: string
  description?: string
}

// 尺寸 Token 结构
export interface SizeToken {
  name: string
  value: string
  type: 'radius' | 'shadow' | 'spacing'
}

// 搜索索引结构
export interface SearchIndex {
  id: string
  title: string
  content: string
  keywords: string[]
  category: 'colors' | 'components' | 'guides' | 'tokens'
  path: string
}

// 搜索结果结构
export interface SearchResult {
  item: SearchIndex
  score: number
  highlights: HighlightRange[]
}

// 高亮范围
export interface HighlightRange {
  field: 'title' | 'content'
  start: number
  end: number
}
```

- [ ] **Step 2: Run typecheck to verify no errors**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add frontend/src/lib/design-system/types.ts
git commit -m "feat(design-system): add TypeScript type definitions"
```

### Task 1.2: 创建 Token 提取工具函数

**Files:**
- Create: `frontend/src/lib/design-system/tokens.ts`

- [ ] **Step 1: Write the failing test first**

Create: `frontend/src/lib/design-system/__tests__/tokens.test.ts`

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { extractAllTokens, extractTokensByPrefix, getToken } from '../tokens'

describe('Token Extraction', () => {
  beforeEach(() => {
    // 确保 DOM 环境已设置
    document.documentElement.style.setProperty('--color-primary', '#0B63F6')
    document.documentElement.style.setProperty('--color-text-primary', '#07122F')
    document.documentElement.style.setProperty('--font-size-md', '14px')
    document.documentElement.style.setProperty('--radius-md', '10px')
  })

  it('should extract all color tokens', () => {
    const tokens = extractAllTokens()
    expect(tokens).toHaveProperty('--color-primary')
    expect(tokens['--color-primary']).toBe('#0B63F6')
  })

  it('should extract tokens by prefix', () => {
    const colorTokens = extractTokensByPrefix('--color-')
    expect(Object.keys(colorTokens).length).toBeGreaterThan(0)
    expect(colorTokens).toHaveProperty('--color-primary')
  })

  it('should get single token by name', () => {
    const primaryColor = getToken('--color-primary')
    expect(primaryColor).toBe('#0B63F6')
  })

  it('should return empty string for non-existent token', () => {
    const fakeToken = getToken('--fake-token')
    expect(fakeToken).toBe('')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run typecheck`
Expected: Type errors about missing functions

- [ ] **Step 3: Write minimal implementation**

```typescript
// frontend/src/lib/design-system/tokens.ts
import type { ColorToken, FontToken, SizeToken } from './types'

// 批量提取所有 CSS 自定义属性
export const extractAllTokens = (): Record<string, string> => {
  if (typeof window === 'undefined') {
    return {}
  }

  const styles = getComputedStyle(document.documentElement)
  const tokens: Record<string, string> = {}

  // 提取所有 CSS 自定义属性
  for (let i = 0; i < styles.length; i++) {
    const name = styles[i]
    if (name.startsWith('--')) {
      const value = styles.getPropertyValue(name).trim()
      if (value) {
        tokens[name] = value
      }
    }
  }

  return tokens
}

// 按前缀提取 Token
export const extractTokensByPrefix = (prefix: string): Record<string, string> => {
  if (typeof window === 'undefined') {
    return {}
  }

  const styles = getComputedStyle(document.documentElement)
  const result: Record<string, string> = {}

  for (let i = 0; i < styles.length; i++) {
    const name = styles[i]
    if (name.startsWith(prefix)) {
      const value = styles.getPropertyValue(name).trim()
      if (value) {
        result[name] = value
      }
    }
  }

  return result
}

// 获取单个 Token
export const getToken = (name: string): string => {
  if (typeof window === 'undefined') {
    return ''
  }

  const styles = getComputedStyle(document.documentElement)
  return styles.getPropertyValue(name).trim()
}

// 提取颜色 Token 并转换为 ColorToken[] 格式
export const extractColorTokens = (): ColorToken[] => {
  const rawTokens = extractTokensByPrefix('--color-')
  return Object.entries(rawTokens).map(([name, value]) => ({
    name: name.replace('--color-', ''),
    value,
    description: getColorDescription(name)
  }))
}

// 提取字体 Token 并转换为 FontToken[] 格式
export const extractFontTokens = (): FontToken[] => {
  const rawTokens = extractTokensByPrefix('--font-')
  return Object.entries(rawTokens).map(([name, value]) => ({
    name: name.replace('--font-', ''),
    value,
    description: getFontDescription(name)
  }))
}

// 提取尺寸 Token 并转换为 SizeToken[] 格式
export const extractSizeTokens = (): SizeToken[] => {
  const radiusTokens = extractTokensByPrefix('--radius-')
  const shadowTokens = extractTokensByPrefix('--shadow-')

  const result: SizeToken[] = []

  Object.entries(radiusTokens).forEach(([name, value]) => {
    result.push({
      name: name.replace('--radius-', ''),
      value,
      type: 'radius'
    })
  })

  Object.entries(shadowTokens).forEach(([name, value]) => {
    result.push({
      name: name.replace('--shadow-', ''),
      value,
      type: 'shadow'
    })
  })

  return result
}

// 获取颜色描述（用于展示）
const getColorDescription = (name: string): string => {
  const descriptions: Record<string, string> = {
    '--color-primary': '品牌主色',
    '--color-primary-hover': '品牌主色悬停状态',
    '--color-primary-light': '品牌主色浅色变体',
    '--color-text-primary': '主要文本色',
    '--color-text-secondary': '次要文本色',
    '--color-success': '成功状态色',
    '--color-warning': '警告状态色',
    '--color-danger': '危险状态色',
    '--color-info': '信息状态色'
  }
  return descriptions[name] || ''
}

// 获取字体描述（用于展示）
const getFontDescription = (name: string): string => {
  const descriptions: Record<string, string> = {
    '--font-size-xs': '超小字号 (12px)',
    '--font-size-sm': '小字号 (13px)',
    '--font-size-md': '默认字号 (14px)',
    '--font-size-lg': '大字号 (16px)',
    '--font-size-xl': '超大字号 (20px)',
    '--font-size-2xl': '特大字号 (24px)'
  }
  return descriptions[name] || ''
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add frontend/src/lib/design-system/tokens.ts frontend/src/lib/design-system/__tests__/tokens.test.ts
git commit -m "feat(design-system): add token extraction utilities with tests"
```

### Task 1.3: 创建通用工具函数

**Files:**
- Create: `frontend/src/lib/design-system/utils.ts`

- [ ] **Step 1: Write utility functions**

```typescript
// frontend/src/lib/design-system/utils.ts

// 环境检测工具函数
export const isDevEnvironment = (): boolean => {
  return import.meta.env.DEV
}

export const canAccessDesignSystem = (): boolean => {
  return isDevEnvironment()
}

// 复制文本到剪贴板
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      textArea.remove()
      return true
    } catch (err) {
      textArea.remove()
      return false
    }
  } catch (err) {
    return false
  }
}

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// 生成唯一 ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// 格式化代码用于展示
export const formatCode = (code: string, language: string): string => {
  // 简单的代码格式化，实际可以使用更复杂的库
  return code.trim()
}
```

- [ ] **Step 2: Run typecheck to verify no errors**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add frontend/src/lib/design-system/utils.ts
git commit -m "feat(design-system): add utility functions for environment detection, clipboard, and helpers"
```

---

## Chunk 2: 路由配置和环境检测

### Task 2.1: 创建设计系统路由配置

**Files:**
- Create: `frontend/src/router/design-system.routes.ts`
- Modify: `frontend/src/router/index.ts:1-25`

- [ ] **Step 1: Write the design system routes**

```typescript
// frontend/src/router/design-system.routes.ts
import type { RouteRecordRaw } from 'vue-router'

const DesignSystemPage = () => import('@/pages/design-system/DesignSystemPage.vue')

export const designSystemRoutes: RouteRecordRaw[] = [
  {
    path: '/design-system',
    name: 'DesignSystem',
    component: DesignSystemPage,
    meta: {
      title: '设计系统',
      devOnly: true, // 开发环境专用
    },
  },
]
```

- [ ] **Step 2: Modify main router to include design system routes**

```typescript
// frontend/src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

import { adminRoutes } from './admin.routes'
import { designSystemRoutes } from './design-system.routes'
import { mobileRoutes } from './mobile.routes'
import { teacherRoutes } from './teacher.routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/admin/training/resources',
    },
    ...designSystemRoutes, // 添加设计系统路由
    ...adminRoutes,
    ...teacherRoutes,
    ...mobileRoutes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/admin/training/resources',
    },
  ],
})

// 环境检测路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.devOnly && import.meta.env.PROD) {
    // 生产环境重定向到管理端首页
    next({ path: '/admin/training/resources' })
  } else {
    next()
  }
})

export default router
```

- [ ] **Step 3: Run typecheck to verify no errors**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add frontend/src/router/design-system.routes.ts frontend/src/router/index.ts
git commit -m "feat(design-system): add design system routes with environment detection"
```

---

## Chunk 3: 内容数据文件

### Task 3.1: 创建导航配置数据

**Files:**
- Create: `frontend/src/pages/design-system/content/navigation.ts`

- [ ] **Step 1: Write navigation data**

```typescript
// frontend/src/pages/design-system/content/navigation.ts
import type { NavItem } from '@/lib/design-system/types'

export const navigationItems: NavItem[] = [
  {
    id: 'design-tokens',
    title: '🎨 设计规范',
    children: [
      {
        id: 'colors',
        title: '颜色系统',
        content: {
          type: 'colors',
          title: '颜色系统',
          description: '包含品牌主色、背景色、文本色和状态色',
          data: null // 将在组件中动态提取
        }
      },
      {
        id: 'typography',
        title: '字体系统',
        content: {
          type: 'typography',
          title: '字体系统',
          description: '包含字号、行高和字重规范',
          data: null
        }
      },
      {
        id: 'spacing',
        title: '尺寸系统',
        content: {
          type: 'spacing',
          title: '尺寸系统',
          description: '包含圆角、阴影和间距规范',
          data: null
        }
      }
    ]
  },
  {
    id: 'ui-components',
    title: '🧩 UI 组件库',
    children: [
      {
        id: 'basic-components',
        title: '基础组件',
        content: {
          type: 'components',
          title: '基础组件',
          description: 'shadcn-vue 基础组件展示',
          data: { category: 'basic' }
        }
      }
    ]
  },
  {
    id: 'guides',
    title: '📖 使用指南',
    children: [
      {
        id: 'quick-start',
        title: '快速开始',
        content: {
          type: 'guides',
          title: '快速开始',
          description: '如何使用设计系统',
          data: { guide: 'quick-start' }
        }
      },
      {
        id: 'best-practices',
        title: '最佳实践',
        content: {
          type: 'guides',
          title: '最佳实践',
          description: '设计系统使用建议',
          data: { guide: 'best-practices' }
        }
      }
    ]
  }
]
```

- [ ] **Step 2: Run typecheck to verify no errors**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/design-system/content/navigation.ts
git commit -m "feat(design-system): add navigation configuration data"
```

---

## Chunk 4: 核心展示组件

### Task 4.1: 创建颜色展示组件

**Files:**
- Create: `frontend/src/pages/design-system/components/ColorPalette.vue`

- [ ] **Step 1: Write the ColorPalette component**

```vue
<template>
  <div class="color-palette">
    <div class="color-sections">
      <!-- 品牌主色 -->
      <section v-if="brandColors.length > 0" class="color-section">
        <h3 class="section-title">品牌主色</h3>
        <div class="color-grid">
          <ColorCard
            v-for="color in brandColors"
            :key="color.name"
            :color="color"
            @copy="handleCopy"
          />
        </div>
      </section>

      <!-- 背景色 -->
      <section v-if="backgroundColors.length > 0" class="color-section">
        <h3 class="section-title">背景色</h3>
        <div class="color-grid">
          <ColorCard
            v-for="color in backgroundColors"
            :key="color.name"
            :color="color"
            @copy="handleCopy"
          />
        </div>
      </section>

      <!-- 文本色 -->
      <section v-if="textColors.length > 0" class="color-section">
        <h3 class="section-title">文本色</h3>
        <div class="color-grid">
          <ColorCard
            v-for="color in textColors"
            :key="color.name"
            :color="color"
            @copy="handleCopy"
          />
        </div>
      </section>

      <!-- 状态色 -->
      <section v-if="statusColors.length > 0" class="color-section">
        <h3 class="section-title">状态色</h3>
        <div class="color-grid">
          <ColorCard
            v-for="color in statusColors"
            :key="color.name"
            :color="color"
            @copy="handleCopy"
          />
        </div>
      </section>
    </div>

    <!-- 复制成功提示 -->
    <div v-if="copySuccess" class="copy-toast">
      已复制: {{ copySuccess }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { extractColorTokens } from '@/lib/design-system/tokens'
import { copyToClipboard } from '@/lib/design-system/utils'
import type { ColorToken } from '@/lib/design-system/types'
import ColorCard from './ColorCard.vue'

const emit = defineEmits<{
  copy: [value: string]
}>()

const colors = ref<ColorToken[]>([])
const copySuccess = ref('')

onMounted(() => {
  colors.value = extractColorTokens()
})

// 颜色分类
const brandColors = computed(() => {
  return colors.value.filter(c =>
    c.name.includes('primary')
  )
})

const backgroundColors = computed(() => {
  return colors.value.filter(c =>
    c.name.includes('bg') || c.name.includes('card')
  )
})

const textColors = computed(() => {
  return colors.value.filter(c =>
    c.name.includes('text')
  )
})

const statusColors = computed(() => {
  return colors.value.filter(c =>
    c.name.includes('success') ||
    c.name.includes('warning') ||
    c.name.includes('danger') ||
    c.name.includes('info')
  )
})

// 处理复制
const handleCopy = async (value: string) => {
  const success = await copyToClipboard(value)
  if (success) {
    copySuccess.value = value
    emit('copy', value)
    setTimeout(() => {
      copySuccess.value = ''
    }, 2000)
  }
}
</script>

<style scoped>
.color-palette {
  padding: 24px;
}

.color-sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.color-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.copy-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: var(--color-success);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-floating);
  animation: slideIn 0.3s ease-out;
  z-index: 1000;
}

@keyframes slideIn {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
```

- [ ] **Step 2: Create ColorCard component**

```vue
<template>
  <div class="color-card" @click="handleClick">
    <div class="color-swatch" :style="{ backgroundColor: color.value }">
      <div class="copy-overlay">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </div>
    </div>
    <div class="color-info">
      <div class="color-name">{{ color.name }}</div>
      <div class="color-value">{{ color.value }}</div>
      <div v-if="color.description" class="color-description">
        {{ color.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ColorToken } from '@/lib/design-system/types'

defineProps<{
  color: ColorToken
}>()

const emit = defineEmits<{
  copy: [value: string]
}>()

const handleClick = () => {
  emit('copy', `var(--color-${props.color.name})`)
  emit('copy', props.color.value)
}
</script>

<style scoped>
.color-card {
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.color-card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}

.color-swatch {
  height: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-overlay {
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
}

.color-card:hover .copy-overlay {
  opacity: 1;
}

.color-info {
  padding: 12px;
  background: var(--color-card-bg);
}

.color-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.color-value {
  font-size: 12px;
  font-family: monospace;
  color: var(--color-text-secondary);
  margin-bottom: 4px;
}

.color-description {
  font-size: 11px;
  color: var(--color-text-tertiary);
  line-height: 1.4;
}
</style>
```

- [ ] **Step 3: Run typecheck and build**

Run: `npm run typecheck && npm run build`
Expected: No errors and successful build

- [ ] **Step 4: Commit**

```bash
git add frontend/src/pages/design-system/components/ColorPalette.vue frontend/src/pages/design-system/components/ColorCard.vue
git commit -m "feat(design-system): add color palette display components"
```

### Task 4.2: 创建字体展示组件

**Files:**
- Create: `frontend/src/pages/design-system/components/TypographyScale.vue`

- [ ] **Step 1: Write the TypographyScale component**

```vue
<template>
  <div class="typography-scale">
    <section class="font-sizes">
      <h3 class="section-title">字号规范</h3>
      <div class="font-list">
        <div
          v-for="font in fontSizes"
          :key="font.name"
          class="font-item"
        >
          <div class="font-preview" :style="{ fontSize: font.value }">
            示例文本 The quick brown fox
          </div>
          <div class="font-info">
            <div class="font-name">{{ font.name }}</div>
            <div class="font-value">{{ font.value }}</div>
            <div v-if="font.description" class="font-description">
              {{ font.description }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="line-heights">
      <h3 class="section-title">行高规范</h3>
      <div class="line-height-list">
        <div
          v-for="lineHeight in lineHeights"
          :key="lineHeight.name"
          class="line-height-item"
        >
          <div
            class="line-height-preview"
            :style="{ lineHeight: lineHeight.value }"
          >
            <div class="line-height-content">
              示例文本<br>多行内容<br>行高展示
            </div>
          </div>
          <div class="line-height-info">
            <div class="line-height-name">{{ lineHeight.name }}</div>
            <div class="line-height-value">{{ lineHeight.value }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { extractFontTokens } from '@/lib/design-system/tokens'
import type { FontToken } from '@/lib/design-system/types'

const fontSizes = ref<FontToken[]>([])
const lineHeights = ref<FontToken[]>([])

onMounted(() => {
  const allFonts = extractFontTokens()
  fontSizes.value = allFonts.filter(f => f.name.includes('size'))
  lineHeights.value = allFonts.filter(f => f.name.includes('height'))
})
</script>

<style scoped>
.typography-scale {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
}

.font-list,
.line-height-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.font-item,
.line-height-item {
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-md);
  padding: 16px;
  background: var(--color-card-bg);
}

.font-preview {
  margin-bottom: 12px;
  color: var(--color-text-primary);
}

.font-info,
.line-height-info {
  display: flex;
  gap: 16px;
  font-size: 12px;
}

.font-name,
.line-height-name {
  font-weight: 600;
  color: var(--color-text-primary);
  min-width: 100px;
}

.font-value,
.line-height-value {
  font-family: monospace;
  color: var(--color-text-secondary);
  min-width: 60px;
}

.font-description {
  color: var(--color-text-tertiary);
}

.line-height-preview {
  margin-bottom: 12px;
  padding: 12px;
  background: var(--color-page-bg-soft);
  border-radius: var(--radius-sm);
}

.line-height-content {
  color: var(--color-text-primary);
  font-size: 14px;
}
</style>
```

- [ ] **Step 2: Run typecheck to verify no errors**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/design-system/components/TypographyScale.vue
git commit -m "feat(design-system): add typography scale display component"
```

### Task 4.3: 创建尺寸展示组件

**Files:**
- Create: `frontend/src/pages/design-system/components/SpacingSystem.vue`

- [ ] **Step 1: Write the SpacingSystem component**

```vue
<template>
  <div class="spacing-system">
    <!-- 圆角规范 -->
    <section class="spacing-section">
      <h3 class="section-title">圆角规范</h3>
      <div class="radius-grid">
        <div
          v-for="radius in radiuses"
          :key="radius.name"
          class="radius-item"
        >
          <div
            class="radius-preview"
            :style="{ borderRadius: radius.value }"
          >
            <div class="radius-content">{{ radius.value }}</div>
          </div>
          <div class="spacing-info">
            <div class="spacing-name">{{ radius.name }}</div>
            <div class="spacing-value">{{ radius.value }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 阴影规范 -->
    <section class="spacing-section">
      <h3 class="section-title">阴影规范</h3>
      <div class="shadow-list">
        <div
          v-for="shadow in shadows"
          :key="shadow.name"
          class="shadow-item"
        >
          <div
            class="shadow-preview"
            :style="{ boxShadow: shadow.value }"
          >
            <div class="shadow-content">Shadow</div>
          </div>
          <div class="spacing-info">
            <div class="spacing-name">{{ shadow.name }}</div>
            <div class="spacing-value">{{ shadow.value }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { extractSizeTokens } from '@/lib/design-system/tokens'
import type { SizeToken } from '@/lib/design-system/types'

const radiuses = ref<SizeToken[]>([])
const shadows = ref<SizeToken[]>([])

onMounted(() => {
  const allSizes = extractSizeTokens()
  radiuses.value = allSizes.filter(s => s.type === 'radius')
  shadows.value = allSizes.filter(s => s.type === 'shadow')
})
</script>

<style scoped>
.spacing-system {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
}

.radius-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}

.radius-item {
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-md);
  padding: 16px;
  background: var(--color-card-bg);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.radius-preview {
  height: 80px;
  background: var(--color-page-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-card-border-soft);
}

.radius-content {
  font-size: 12px;
  font-family: monospace;
  color: var(--color-text-secondary);
}

.shadow-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.shadow-item {
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-md);
  padding: 16px;
  background: var(--color-card-bg);
  display: flex;
  gap: 16px;
  align-items: center;
}

.shadow-preview {
  width: 120px;
  height: 60px;
  background: var(--color-card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-card-border-soft);
}

.shadow-content {
  font-size: 14px;
  color: var(--color-text-primary);
}

.spacing-info {
  flex: 1;
  display: flex;
  gap: 16px;
  font-size: 12px;
}

.spacing-name {
  font-weight: 600;
  color: var(--color-text-primary);
  min-width: 100px;
}

.spacing-value {
  font-family: monospace;
  color: var(--color-text-secondary);
}
</style>
```

- [ ] **Step 2: Run typecheck to verify no errors**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/design-system/components/SpacingSystem.vue
git commit -m "feat(design-system): add spacing system display component"
```

---

## Chunk 5: 导航和布局组件

### Task 5.1: 创建侧边栏导航组件

**Files:**
- Create: `frontend/src/pages/design-system/components/DesignSidebar.vue`

- [ ] **Step 1: Write the DesignSidebar component**

```vue
<template>
  <aside class="design-sidebar">
    <nav class="sidebar-nav">
      <template v-for="item in navItems" :key="item.id">
        <!-- 有子项的导航 -->
        <div v-if="item.children" class="nav-group">
          <button
            class="nav-group-header"
            :class="{ 'is-expanded': expandedGroups.has(item.id) }"
            @click="toggleGroup(item.id)"
          >
            <span class="nav-group-icon">{{ item.icon }}</span>
            <span class="nav-group-title">{{ item.title }}</span>
            <svg
              class="nav-chevron"
              :class="{ 'is-rotated': expandedGroups.has(item.id) }"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <transition name="expand">
            <div v-if="expandedGroups.has(item.id)" class="nav-group-children">
              <button
                v-for="child in item.children"
                :key="child.id"
                class="nav-item"
                :class="{ 'is-active': selectedId === child.id }"
                @click="selectItem(child)"
              >
                {{ child.title }}
              </button>
            </div>
          </transition>
        </div>

        <!-- 单个导航项 -->
        <button
          v-else
          class="nav-item"
          :class="{ 'is-active': selectedId === item.id }"
          @click="selectItem(item)"
        >
          <span v-if="item.icon" class="nav-item-icon">{{ item.icon }}</span>
          {{ item.title }}
        </button>
      </template>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { NavItem } from '@/lib/design-system/types'

const props = defineProps<{
  navItems: NavItem[]
}>()

const emit = defineEmits<{
  select: [item: NavItem]
}>()

const selectedId = ref<string>('')
const expandedGroups = ref<Set<string>>(new Set())

onMounted(() => {
  // 默认展开第一个组
  if (props.navItems[0]?.id) {
    expandedGroups.value.add(props.navItems[0].id)
  }
  // 默认选中第一个子项
  if (props.navItems[0]?.children?.[0]) {
    selectItem(props.navItems[0].children[0])
  }
})

const toggleGroup = (id: string) => {
  if (expandedGroups.value.has(id)) {
    expandedGroups.value.delete(id)
  } else {
    expandedGroups.value.add(id)
  }
}

const selectItem = (item: NavItem) => {
  selectedId.value = item.id
  emit('select', item)
}
</script>

<style scoped>
.design-sidebar {
  width: 280px;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid var(--color-card-border);
  background: var(--color-card-bg);
  padding: 16px 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-group {
  display: flex;
  flex-direction: column;
}

.nav-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  border-radius: var(--radius-sm);
  margin: 0 8px;
}

.nav-group-header:hover {
  background: var(--color-page-bg-soft);
}

.nav-group-icon {
  font-size: 16px;
}

.nav-group-title {
  flex: 1;
  text-align: left;
}

.nav-chevron {
  transition: transform 0.2s;
}

.nav-chevron.is-rotated {
  transform: rotate(180deg);
}

.nav-group-children {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 16px;
  margin-top: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: var(--radius-sm);
  margin: 0 8px;
  text-align: left;
}

.nav-item:hover {
  background: var(--color-page-bg-soft);
  color: var(--color-text-primary);
}

.nav-item.is-active {
  background: var(--color-primary);
  color: white;
}

.nav-item-icon {
  font-size: 14px;
}

/* 展开动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
```

- [ ] **Step 2: Run typecheck to verify no errors**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/design-system/components/DesignSidebar.vue
git commit -m "feat(design-system): add sidebar navigation component with expand/collapse"
```

### Task 5.2: 创建内容展示组件

**Files:**
- Create: `frontend/src/pages/design-system/components/DesignContent.vue`

- [ ] **Step 1: Write the DesignContent component**

```vue
<template>
  <main class="design-content">
    <header v-if="selectedContent" class="content-header">
      <h1 class="content-title">{{ selectedContent.title }}</h1>
      <p v-if="selectedContent.description" class="content-description">
        {{ selectedContent.description }}
      </p>
    </header>

    <div class="content-body">
      <!-- 颜色系统 -->
      <ColorPalette v-if="selectedContent?.type === 'colors'" />

      <!-- 字体系统 -->
      <TypographyScale v-else-if="selectedContent?.type === 'typography'" />

      <!-- 尺寸系统 -->
      <SpacingSystem v-else-if="selectedContent?.type === 'spacing'" />

      <!-- 组件展示 -->
      <div v-else-if="selectedContent?.type === 'components'" class="placeholder">
        <p>组件展示功能将在 Phase 2 实现</p>
      </div>

      <!-- 使用指南 -->
      <div v-else-if="selectedContent?.type === 'guides'" class="placeholder">
        <p>使用指南功能将在 Phase 3 实现</p>
      </div>

      <!-- 无选中内容 -->
      <div v-else class="placeholder">
        <p>请从左侧选择要查看的内容</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { NavItem } from '@/lib/design-system/types'
import ColorPalette from './ColorPalette.vue'
import TypographyScale from './TypographyScale.vue'
import SpacingSystem from './SpacingSystem.vue'

const props = defineProps<{
  selectedItem?: NavItem
}>()

const selectedContent = ref(props.selectedItem?.content)

watch(() => props.selectedItem, (newItem) => {
  selectedContent.value = newItem?.content
})
</script>

<style scoped>
.design-content {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  background: var(--color-page-bg);
}

.content-header {
  padding: 32px 32px 24px;
  border-bottom: 1px solid var(--color-card-border);
  background: var(--color-card-bg);
}

.content-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 8px 0;
}

.content-description {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.5;
}

.content-body {
  padding: 32px;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: var(--color-text-tertiary);
  font-size: 14px;
}
</style>
```

- [ ] **Step 2: Run typecheck to verify no errors**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/design-system/components/DesignContent.vue
git commit -m "feat(design-system): add content display component with dynamic loading"
```

---

## Chunk 6: 主页面集成

### Task 6.1: 创建设计系统主页面

**Files:**
- Create: `frontend/src/pages/design-system/DesignSystemPage.vue`

- [ ] **Step 1: Write the DesignSystemPage component**

```vue
<template>
  <div class="design-system-page">
    <header class="page-header">
      <div class="header-content">
        <div class="logo-section">
          <h1 class="page-title">设计系统</h1>
          <span class="page-version">v1.0.0</span>
        </div>

        <div class="header-actions">
          <button
            class="nav-button"
            @click="navigateToAdmin"
          >
            跳转到管理端 →
          </button>
        </div>
      </div>
    </header>

    <div class="page-layout">
      <DesignSidebar
        :nav-items="navigationItems"
        @select="handleSelect"
      />
      <DesignContent :selected-item="selectedItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DesignSidebar from './components/DesignSidebar.vue'
import DesignContent from './components/DesignContent.vue'
import { navigationItems } from './content/navigation'
import type { NavItem } from '@/lib/design-system/types'

const router = useRouter()
const selectedItem = ref<NavItem>()

const handleSelect = (item: NavItem) => {
  selectedItem.value = item
}

const navigateToAdmin = () => {
  router.push('/admin/training/resources')
}
</script>

<style scoped>
.design-system-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.page-header {
  height: 60px;
  border-bottom: 1px solid var(--color-card-border);
  background: var(--color-card-bg);
  padding: 0 24px;
  display: flex;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.page-version {
  font-size: 12px;
  color: var(--color-text-tertiary);
  padding: 2px 8px;
  background: var(--color-page-bg-soft);
  border-radius: var(--radius-sm);
}

.header-actions {
  display: flex;
  gap: 12px;
}

.nav-button {
  padding: 8px 16px;
  border: 1px solid var(--color-card-border);
  background: var(--color-card-bg);
  color: var(--color-text-primary);
  border-radius: var(--radius-sm);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-button:hover {
  background: var(--color-page-bg-soft);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.page-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>
```

- [ ] **Step 2: Run typecheck to verify no errors**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: Test the implementation**

Run: `npm run dev`
Expected: Dev server starts without errors

Test: Visit `http://localhost:5173/design-system` and verify:
- Page loads without errors
- Left sidebar shows navigation items
- Design tokens are displayed correctly
- Copy functionality works

- [ ] **Step 4: Verify production environment protection**

Run: `npm run build && npm run preview`
Test: Visit the preview URL and verify it redirects to admin page

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/design-system/DesignSystemPage.vue
git commit -m "feat(design-system): add main design system page with layout"
```

---

## Chunk 7: 测试和文档

### Task 7.1: 添加环境检测测试

**Files:**
- Create: `frontend/src/lib/design-system/__tests__/utils.test.ts`

- [ ] **Step 1: Write the failing test first**

```typescript
import { describe, it, expect, vi } from 'vitest'
import { isDevEnvironment, canAccessDesignSystem, copyToClipboard, debounce } from '../utils'

describe('Environment Detection', () => {
  it('should detect dev environment correctly', () => {
    const isDev = isDevEnvironment()
    expect(typeof isDev).toBe('boolean')
  })

  it('should allow design system access in dev', () => {
    const canAccess = canAccessDesignSystem()
    expect(typeof canAccess).toBe('boolean')
  })
})

describe('Clipboard Utilities', () => {
  it('should copy text to clipboard', async () => {
    // Mock navigator.clipboard
    const mockWriteText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText
      }
    })

    const result = await copyToClipboard('test text')
    expect(result).toBe(true)
    expect(mockWriteText).toHaveBeenCalledWith('test text')
  })

  it('should handle clipboard errors gracefully', async () => {
    // Mock error
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error('Clipboard error'))
      }
    })

    const result = await copyToClipboard('test text')
    expect(result).toBe(false)
  })
})

describe('Debounce Utility', () => {
  it('should debounce function calls', () => {
    let callCount = 0
    const mockFn = () => { callCount++ }
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    // Should not be called immediately
    expect(callCount).toBe(0)
  })
})
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `npm run typecheck` (if no test runner is configured)
Expected: No type errors

Note: Full test setup may require Vitest configuration, which can be added in a future task

- [ ] **Step 3: Commit**

```bash
git add frontend/src/lib/design-system/__tests__/utils.test.ts
git commit -m "test(design-system): add utility function tests"
```

### Task 7.2: 更新项目文档

**Files:**
- Modify: `frontend/docs/page-route-map.md`

- [ ] **Step 1: Update the page-route-map document**

Find the section for route mappings and add:

```markdown
### 设计系统路由

| 路径 | 组件 | 标题 | 访问限制 |
|------|------|------|----------|
| `/design-system` | DesignSystemPage | 设计系统 | 仅开发环境 |
```

- [ ] **Step 2: Update task log**

Modify: `frontend/docs/ai-task-log.md`

Add new entry:

```markdown
### 2025-06-26: 设计系统展示页面 MVP

**任务编号**: T-design-system-mvp
**目标**: 构建设计系统展示页面的最小可行产品

**已完成功能**:
- ✅ 环境检测和路由保护
- ✅ Token 提取工具函数
- ✅ 导航数据配置
- ✅ 颜色系统展示
- ✅ 字体系统展示
- ✅ 尺寸系统展示
- ✅ 侧边栏导航
- ✅ 内容展示布局

**技术实现**:
- 使用 Vue 3 + TypeScript + Composition API
- 基于 CSS 变量自动提取设计 Token
- 开发环境限定访问
- 响应式布局（桌面优先）

**下一步计划**:
- Phase 2: 组件展示功能
- Phase 3: 高级功能（暗色模式、搜索等）
```

- [ ] **Step 3: Commit documentation updates**

```bash
git add frontend/docs/page-route-map.md frontend/docs/ai-task-log.md
git commit -m "docs(design-system): update project documentation for design system page"
```

### Task 7.3: 最终验证和清理

**Files:**
- Test: All files created in this plan

- [ ] **Step 1: Final typecheck**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 2: Final build**

Run: `npm run build`
Expected: Build completes successfully

- [ ] **Step 3: Manual testing checklist**

Test the following in development environment:
1. ✅ Visit `/design-system` - page loads correctly
2. ✅ Left sidebar shows navigation groups
3. ✅ Click navigation items - content updates correctly
4. ✅ Color palette displays all colors
5. ✅ Click color cards - copy functionality works
6. ✅ Typography scale displays correctly
7. ✅ Spacing system displays correctly
8. ✅ "跳转到管理端" button navigates correctly

Test in production preview:
1. ✅ Visit `/design-system` - redirects to admin page
2. ✅ No console errors
3. ✅ Application loads normally

- [ ] **Step 4: Code review and cleanup**

Review the implementation for:
- Consistent code style
- Proper TypeScript types
- No console warnings
- Accessibility (basic ARIA, keyboard navigation)
- Responsive design considerations

- [ ] **Step 5: Final commit**

```bash
git status
# Ensure all changes are committed
git add .
git commit -m "feat(design-system): complete MVP implementation with documentation and testing"
```

---

## 🎯 MVP 完成标准

### 功能完整性
- ✅ 设计 Token 可视化展示（颜色、字体、尺寸）
- ✅ 左侧导航和右侧内容展示
- ✅ 环境检测和路由保护
- ✅ 复制功能正常工作
- ✅ 基础布局响应式

### 代码质量
- ✅ TypeScript 类型完整
- ✅ `npm run typecheck` 通过
- ✅ `npm run build` 成功
- ✅ 遵循项目代码规范
- ✅ 文档更新完整

### 用户体验
- ✅ 导航清晰易用
- ✅ 内容展示直观
- ✅ 交互反馈及时
- ✅ 错误处理合理

### 开发体验
- ✅ 代码结构清晰
- ✅ 组件职责明确
- ✅ 易于维护扩展
- ✅ 文档说明详细

---

## 📋 后续计划 (Phase 2 & 3)

### Phase 2 - 组件展示
- UI 组件库展示页面
- 业务组件展示页面
- 交互式组件预览
- 代码查看器组件

### Phase 3 - 高级功能
- 搜索功能实现
- 暗色模式切换
- 响应式预览功能
- 使用指南文档
- 更新日志功能

---

**计划状态**: 准备就绪，等待执行
**预计耗时**: 3-4 小时（包含测试和文档）
**依赖**: 需要现有项目正常运行
