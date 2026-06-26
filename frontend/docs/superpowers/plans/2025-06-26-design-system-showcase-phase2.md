# 设计系统展示页面 Phase 2 - 组件展示功能实施计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为设计系统展示页面添加交互式组件展示功能，包括 shadcn-vue 基础组件和项目业务组件的展示、预览和代码示例

**Architecture:** 扩展现有 DesignContent 组件，添加 ComponentShowcase 组件展示容器、CodeViewer 代码查看器，以及交互式预览控制面板。组件配置数据驱动展示内容。

**Tech Stack:** Vue 3 + TypeScript + Composition API, shadcn-vue components, 现有的设计 Token 系统

---

## 文件结构

**新增文件：**
- `frontend/src/pages/design-system/components/ComponentShowcase.vue` - 组件展示容器
- `frontend/src/pages/design-system/components/CodeViewer.vue` - 代码查看器
- `frontend/src/pages/design-system/components/PreviewPanel.vue` - 交互式预览面板
- `frontend/src/pages/design-system/content/components.ts` - 组件配置数据
- `frontend/src/lib/design-system/code-formatter.ts` - 代码格式化工具

**修改文件：**
- `frontend/src/pages/design-system/content/navigation.ts` - 添加组件展示导航项
- `frontend/src/pages/design-system/components/DesignContent.vue` - 添加 components 类型支持
- `frontend/src/lib/design-system/types.ts` - 扩展类型定义

---

## Chunk 1: 类型定义和数据结构

### Task 1.1: 扩展类型定义

**Files:**
- Modify: `frontend/src/lib/design-system/types.ts`

- [ ] **Step 1: 添加组件展示相关类型**

在现有类型文件中添加：

```typescript
// 组件展示配置
export interface ComponentShowcase {
  name: string
  category: string
  description?: string
  variants?: string[]
  examples: ComponentExample[]
  props?: PropDefinition[]
  events?: EventDefinition[]
  slots?: SlotDefinition[]
}

// 组件示例
export interface ComponentExample {
  title: string
  description?: string
  code: string
  props?: Record<string, any>
}

// Props 定义
export interface PropDefinition {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

// Events 定义
export interface EventDefinition {
  name: string
  description: string
}

// Slots 定义
export interface SlotDefinition {
  name: string
  description: string
}

// 组件预览状态
export interface PreviewState {
  variant?: string
  size?: string
  disabled?: boolean
  loading?: boolean
  [key: string]: any
}
```

- [ ] **Step 2: 运行类型检查**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: 提交**

```bash
git add frontend/src/lib/design-system/types.ts
git commit -m "feat(design-system): add component showcase type definitions"
```

### Task 1.2: 创建组件配置数据

**Files:**
- Create: `frontend/src/pages/design-system/content/components.ts`

- [ ] **Step 1: 创建组件配置文件**

```typescript
import type { ComponentShowcase } from '@/lib/design-system/types'

export const componentShowcases: ComponentShowcase[] = [
  {
    name: 'Button',
    category: '基础组件',
    description: '按钮组件，支持多种样式和尺寸',
    variants: ['default', 'primary', 'ghost', 'destructive', 'outline'],
    examples: [
      {
        title: '主要按钮',
        description: '用于主要操作',
        code: '<Button variant="primary">点击我</Button>',
        props: { variant: 'primary' }
      },
      {
        title: '次要按钮',
        description: '用于次要操作',
        code: '<Button variant="outline">取消</Button>',
        props: { variant: 'outline' }
      },
      {
        title: '幽灵按钮',
        description: '用于轻量级操作',
        code: '<Button variant="ghost">编辑</Button>',
        props: { variant: 'ghost' }
      },
      {
        title: '危险按钮',
        description: '用于删除等危险操作',
        code: '<Button variant="destructive">删除</Button>',
        props: { variant: 'destructive' }
      },
      {
        title: '禁用状态',
        description: '按钮禁用状态',
        code: '<Button disabled>禁用按钮</Button>',
        props: { disabled: true }
      }
    ],
    props: [
      { name: 'variant', type: 'string', default: 'default', description: '按钮样式变体' },
      { name: 'size', type: 'string', default: 'md', description: '按钮尺寸' },
      { name: 'disabled', type: 'boolean', default: 'false', description: '禁用状态' }
    ],
    events: [
      { name: 'click', description: '点击事件' }
    ],
    slots: [
      { name: 'default', description: '按钮内容' }
    ]
  },
  {
    name: 'Input',
    category: '基础组件',
    description: '输入框组件，支持文本、密码等多种类型',
    examples: [
      {
        title: '基础输入框',
        description: '普通文本输入',
        code: '<Input placeholder="请输入内容" />',
        props: { placeholder: '请输入内容' }
      },
      {
        title: '密码输入框',
        description: '密码类型输入',
        code: '<Input type="password" placeholder="请输入密码" />',
        props: { type: 'password', placeholder: '请输入密码' }
      },
      {
        title: '禁用状态',
        description: '输入框禁用状态',
        code: '<Input disabled value="禁用内容" />',
        props: { disabled: true, value: '禁用内容' }
      }
    ],
    props: [
      { name: 'type', type: 'string', default: 'text', description: '输入框类型' },
      { name: 'placeholder', type: 'string', default: '', description: '占位文本' },
      { name: 'disabled', type: 'boolean', default: 'false', description: '禁用状态' },
      { name: 'value', type: 'string', default: '', description: '输入值' }
    ]
  },
  {
    name: 'Card',
    category: '数据展示',
    description: '卡片组件，用于内容分组展示',
    examples: [
      {
        title: '基础卡片',
        description: '最简单的卡片用法',
        code: `
<Card>
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
    <CardDescription>卡片描述</CardDescription>
  </CardHeader>
  <CardContent>
    <p>卡片内容</p>
  </CardContent>
</Card>
        `
      }
    ],
    props: [
      { name: 'className', type: 'string', default: '', description: '自定义类名' }
    ],
    slots: [
      { name: 'default', description: '卡片内容' }
    ]
  },
  {
    name: 'Badge',
    category: '数据展示',
    description: '徽章组件，用于状态标识',
    variants: ['default', 'primary', 'success', 'warning', 'danger'],
    examples: [
      {
        title: '状态徽章',
        description: '不同颜色的状态徽章',
        code: `
<Badge variant="default">默认</Badge>
<Badge variant="success">成功</Badge>
<Badge variant="warning">警告</Badge>
<Badge variant="danger">危险</Badge>
        `
      }
    ],
    props: [
      { name: 'variant', type: 'string', default: 'default', description: '徽章样式变体' }
    ]
  }
]

// 按分类组织组件
export const componentsByCategory = {
  '基础组件': componentShowcases.filter(c => c.category === '基础组件'),
  '数据展示': componentShowcases.filter(c => c.category === '数据展示'),
  '反馈组件': componentShowcases.filter(c => c.category === '反馈组件'),
  '业务组件': componentShowcases.filter(c => c.category === '业务组件')
}
```

- [ ] **Step 2: 运行类型检查**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: 提交**

```bash
git add frontend/src/pages/design-system/content/components.ts
git commit -m "feat(design-system): add component configuration data"
```

### Task 1.3: 更新导航配置

**Files:**
- Modify: `frontend/src/pages/design-system/content/navigation.ts`

- [ ] **Step 1: 添加组件展示导航项**

在导航配置中添加：

```typescript
import { componentShowcases, componentsByCategory } from './components'
import type { NavItem, ContentModule } from '@/lib/design-system/types'

// 在现有导航数据中添加
export const navigationItems: NavItem[] = [
  // ... 现有的设计规范导航项 ...

  // 添加组件展示部分
  {
    id: 'components',
    title: '组件展示',
    icon: '🧩',
    children: [
      {
        id: 'components-basic',
        title: '基础组件',
        content: {
          type: 'components',
          title: '基础组件',
          description: 'shadcn-vue 基础 UI 组件展示和使用说明',
          data: {
            category: '基础组件',
            components: componentsByCategory['基础组件']
          }
        }
      },
      {
        id: 'components-data',
        title: '数据展示',
        content: {
          type: 'components',
          title: '数据展示',
          description: '数据展示相关组件',
          data: {
            category: '数据展示',
            components: componentsByCategory['数据展示']
          }
        }
      },
      {
        id: 'components-feedback',
        title: '反馈组件',
        content: {
          type: 'components',
          title: '反馈组件',
          description: '用户反馈相关组件（Phase 2 继续实现）',
          data: {
            category: '反馈组件',
            components: [] // Phase 2 暂时留空
          }
        }
      },
      {
        id: 'components-business',
        title: '业务组件',
        content: {
          type: 'components',
          title: '业务组件',
          description: '项目业务组件展示（Phase 2 继续实现）',
          data: {
            category: '业务组件',
            components: [] // Phase 2 暂时留空
          }
        }
      }
    ]
  }
]
```

- [ ] **Step 2: 运行类型检查**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: 提交**

```bash
git add frontend/src/pages/design-system/content/navigation.ts
git commit -m "feat(design-system): add component showcase navigation items"
```

---

## Chunk 2: 代码查看器组件

### Task 2.1: 创建代码格式化工具

**Files:**
- Create: `frontend/src/lib/design-system/code-formatter.ts`

- [ ] **Step 1: 创建代码格式化工具**

```typescript
/**
 * 代码格式化工具
 */

export type CodeLanguage = 'vue' | 'typescript' | 'html' | 'json'

/**
 * 简单的代码语法高亮（纯文本实现，避免依赖外部库）
 */
export const highlightCode = (code: string, language: CodeLanguage = 'vue'): string => {
  // 简单实现：转义 HTML 并添加基本样式
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

  // 基本的语法高亮标记
  return escaped
    // 高亮关键字
    .replace(/\b(import|export|from|const|let|var|function|return|if|else|for|while)\b/g, '<span class="code-keyword">$1</span>')
    // 高亮字符串
    .replace(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="code-string">$1$2$3</span>')
    // 高亮注释
    .replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>')
    // 高亮标签
    .replace(/(&lt;\/?[\w-]+)/g, '<span class="code-tag">$1</span>')
}

/**
 * 检测代码语言
 */
export const detectLanguage = (code: string): CodeLanguage => {
  if (code.includes('<template>') || code.includes('defineComponent')) {
    return 'vue'
  }
  if (code.includes('interface ') || code.includes('type ') || code.includes(': ')) {
    return 'typescript'
  }
  if (code.startsWith('{') || code.startsWith('[')) {
    return 'json'
  }
  return 'html'
}

/**
 * 格式化代码用于显示
 */
export const formatCodeForDisplay = (code: string, language?: CodeLanguage): {
  formatted: string
  detectedLanguage: CodeLanguage
} => {
  const detected = language || detectLanguage(code)
  return {
    formatted: highlightCode(code, detected),
    detectedLanguage: detected
  }
}
```

- [ ] **Step 2: 运行类型检查**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: 提交**

```bash
git add frontend/src/lib/design-system/code-formatter.ts
git commit -m "feat(design-system): add code formatter utilities"
```

### Task 2.2: 创建代码查看器组件

**Files:**
- Create: `frontend/src/pages/design-system/components/CodeViewer.vue`

- [ ] **Step 1: 创建 CodeViewer 组件**

```vue
<template>
  <div class="code-viewer">
    <div class="code-header">
      <div class="code-language-badge">
        {{ displayLanguage }}
      </div>
      <button
        class="copy-button"
        @click="handleCopy"
        :disabled="copied"
      >
        {{ copied ? '已复制' : '复制代码' }}
      </button>
    </div>
    <pre class="code-content"><code v-html="highlightedCode"></code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatCodeForDisplay, type CodeLanguage } from '@/lib/design-system/code-formatter'

const props = defineProps<{
  code: string
  language?: CodeLanguage
}>()

const copied = ref(false)

const { formatted, detectedLanguage } = computed(() => {
  return formatCodeForDisplay(props.code, props.language)
})

const highlightedCode = computed(() => formatted.value)

const displayLanguage = computed(() => {
  const langMap: Record<CodeLanguage, string> = {
    vue: 'Vue',
    typescript: 'TypeScript',
    html: 'HTML',
    json: 'JSON'
  }
  return langMap[detectedLanguage.value] || 'Code'
})

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy code:', error)
  }
}
</script>

<style scoped>
.code-viewer {
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-md);
  background: var(--color-page-bg);
  overflow: hidden;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: var(--color-card-bg);
  border-bottom: 1px solid var(--color-card-border);
}

.code-language-badge {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: var(--color-page-bg-soft);
  padding: 4px 8px;
  border-radius: var(--radius-xs);
}

.copy-button {
  font-size: 12px;
  padding: 4px 12px;
  border: 1px solid var(--color-card-border);
  background: var(--color-card-bg);
  color: var(--color-text-primary);
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.2s;
}

.copy-button:hover:not(:disabled) {
  background: var(--color-page-bg-soft);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.copy-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.code-content {
  margin: 0;
  padding: 16px;
  background: var(--color-page-bg);
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
}

.code-content code {
  font-family: inherit;
}

/* 代码高亮样式 */
.code-keyword {
  color: #d73a49;
}

.code-string {
  color: #032f62;
}

.code-comment {
  color: #6a737d;
  font-style: italic;
}

.code-tag {
  color: #22863a;
}
</style>
```

- [ ] **Step 2: 运行类型检查**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: 提交**

```bash
git add frontend/src/pages/design-system/components/CodeViewer.vue
git commit -m "feat(design-system): add code viewer component with syntax highlighting"
```

---

## Chunk 3: 组件展示容器

### Task 3.1: 创建交互式预览面板

**Files:**
- Create: `frontend/src/pages/design-system/components/PreviewPanel.vue`

- [ ] **Step 1: 创建 PreviewPanel 组件**

```vue
<template>
  <div class="preview-panel">
    <div class="preview-header">
      <h3 class="preview-title">交互式预览</h3>
      <div class="preview-controls">
        <button
          v-for="variant in component?.variants || []"
          :key="variant"
          class="variant-button"
          :class="{ 'is-active: previewState.variant === variant }"
          @click="updateVariant(variant)"
        >
          {{ variant }}
        </button>
      </div>
    </div>
    <div class="preview-content">
      <div class="preview-area">
        <slot :state="previewState"></slot>
      </div>
      <div class="preview-info">
        <div class="preview-state">
          <h4>当前状态</h4>
          <pre>{{ JSON.stringify(previewState, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ComponentShowcase, PreviewState } from '@/lib/design-system/types'

const props = defineProps<{
  component?: ComponentShowcase
}>()

const previewState = ref<PreviewState>({
  variant: props.component?.variants?.[0] || 'default'
})

const updateVariant = (variant: string) => {
  previewState.value.variant = variant
}
</script>

<style scoped>
.preview-panel {
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-md);
  background: var(--color-card-bg);
  overflow: hidden;
}

.preview-header {
  padding: 16px;
  border-bottom: 1px solid var(--color-card-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.preview-controls {
  display: flex;
  gap: 8px;
}

.variant-button {
  font-size: 12px;
  padding: 4px 12px;
  border: 1px solid var(--color-card-border);
  background: var(--color-card-bg);
  color: var(--color-text-secondary);
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.2s;
}

.variant-button:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.variant-button.is-active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.preview-content {
  display: flex;
  min-height: 200px;
}

.preview-area {
  flex: 1;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-page-bg);
  border-right: 1px solid var(--color-card-border);
}

.preview-info {
  width: 240px;
  padding: 16px;
  background: var(--color-card-bg);
}

.preview-state h4 {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 8px 0;
}

.preview-state pre {
  font-size: 11px;
  color: var(--color-text-secondary);
  background: var(--color-page-bg-soft);
  padding: 8px;
  border-radius: var(--radius-xs);
  margin: 0;
  overflow-x: auto;
}
</style>
```

- [ ] **Step 2: 运行类型检查**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: 提交**

```bash
git add frontend/src/pages/design-system/components/PreviewPanel.vue
git commit -m "feat(design-system): add interactive preview panel component"
```

### Task 3.2: 创建组件展示容器

**Files:**
- Create: `frontend/src/pages/design-system/components/ComponentShowcase.vue`

- [ ] **Step 1: 创建 ComponentShowcase 组件**

```vue
<template>
  <div class="component-showcase">
    <!-- 组件列表 -->
    <div v-if="components.length > 0" class="showcase-list">
      <div
        v-for="component in components"
        :key="component.name"
        class="showcase-item"
      >
        <!-- 组件头部 -->
        <div class="showcase-header">
          <div>
            <h2 class="component-name">{{ component.name }}</h2>
            <p v-if="component.description" class="component-description">
              {{ component.description }}
            </p>
          </div>
        </div>

        <!-- 交互式预览 -->
        <PreviewPanel :component="component">
          <template #default="{ state }">
            <div v-html="renderComponent(component, state)"></div>
          </template>
        </PreviewPanel>

        <!-- 代码示例 -->
        <div class="showcase-examples">
          <h3 class="examples-title">代码示例</h3>
          <div
            v-for="(example, index) in component.examples"
            :key="index"
            class="example-item"
          >
            <h4 class="example-title">{{ example.title }}</h4>
            <p v-if="example.description" class="example-description">
              {{ example.description }}
            </p>
            <CodeViewer :code="example.code" />
          </div>
        </div>

        <!-- Props 文档 -->
        <div v-if="component.props?.length" class="showcase-props">
          <h3 class="props-title">Props</h3>
          <table class="props-table">
            <thead>
              <tr>
                <th>名称</th>
                <th>类型</th>
                <th>默认值</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prop in component.props" :key="prop.name">
                <td><code>{{ prop.name }}</code></td>
                <td><code>{{ prop.type }}</code></td>
                <td><code>{{ prop.default || '-' }}</code></td>
                <td>{{ prop.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Events 文档 -->
        <div v-if="component.events?.length" class="showcase-events">
          <h3 class="events-title">Events</h3>
          <table class="events-table">
            <thead>
              <tr>
                <th>名称</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in component.events" :key="event.name">
                <td><code>{{ event.name }}</code></td>
                <td>{{ event.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Slots 文档 -->
        <div v-if="component.slots?.length" class="showcase-slots">
          <h3 class="slots-title">Slots</h3>
          <table class="slots-table">
            <thead>
              <tr>
                <th>名称</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="slot in component.slots" :key="slot.name">
                <td><code>{{ slot.name }}</code></td>
                <td>{{ slot.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="showcase-empty">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
      <p>该分类暂无组件展示</p>
      <p class="empty-hint">将在后续版本中添加</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentShowcase, PreviewState } from '@/lib/design-system/types'
import CodeViewer from './CodeViewer.vue'
import PreviewPanel from './PreviewPanel.vue'

const props = defineProps<{
  category: string
  components: ComponentShowcase[]
}>()

/**
 * 简单的组件渲染（仅用于预览，实际使用时需要更复杂的实现）
 */
const renderComponent = (component: ComponentShowcase, state: PreviewState): string => {
  // 这是一个简化的实现，仅用于展示
  // 实际项目中应该动态渲染 Vue 组件
  const example = component.examples[0]
  if (!example) return '<div class="preview-placeholder">暂无预览</div>'

  // 返回第一个示例代码的 HTML 部分（简化处理）
  return `<div class="preview-placeholder">${component.name} 组件预览</div>`
}
</script>

<style scoped>
.component-showcase {
  padding: 24px;
}

.showcase-list {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.showcase-item {
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  background: var(--color-card-bg);
}

.showcase-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-card-border);
}

.component-name {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 8px 0;
}

.component-description {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
}

.showcase-examples {
  margin-top: 32px;
}

.examples-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
}

.example-item {
  margin-bottom: 24px;
}

.example-item:last-child {
  margin-bottom: 0;
}

.example-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 4px 0;
}

.example-description {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 0 0 8px 0;
}

.showcase-props,
.showcase-events,
.showcase-slots {
  margin-top: 32px;
}

.props-title,
.events-title,
.slots-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
}

.props-table,
.events-table,
.slots-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.props-table th,
.events-table th,
.slots-table th {
  text-align: left;
  padding: 8px;
  border-bottom: 2px solid var(--color-card-border);
  color: var(--color-text-primary);
  font-weight: 600;
}

.props-table td,
.events-table td,
.slots-table td {
  padding: 8px;
  border-bottom: 1px solid var(--color-card-border);
  color: var(--color-text-secondary);
}

.props-table code,
.events-table code,
.slots-table code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 12px;
  background: var(--color-page-bg-soft);
  padding: 2px 6px;
  border-radius: var(--radius-xs);
}

.showcase-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 32px;
  color: var(--color-text-tertiary);
  text-align: center;
}

.showcase-empty svg {
  margin-bottom: 16px;
  color: var(--color-text-disabled);
}

.showcase-empty p {
  margin: 4px 0;
}

.empty-hint {
  font-size: 13px;
}

.preview-placeholder {
  padding: 16px 24px;
  background: var(--color-page-bg-soft);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  font-size: 14px;
}
</style>
```

- [ ] **Step 2: 运行类型检查**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: 提交**

```bash
git add frontend/src/pages/design-system/components/ComponentShowcase.vue
git commit -m "feat(design-system): add component showcase container with documentation"
```

---

## Chunk 4: 集成和测试

### Task 4.1: 更新 DesignContent 组件

**Files:**
- Modify: `frontend/src/pages/design-system/components/DesignContent.vue`

- [ ] **Step 1: 添加 components 类型支持**

在模板中添加：

```vue
<!-- 组件展示 -->
<ComponentShowcase
  v-else-if="selectedContent?.type === 'components'"
  :category="selectedContent.data.category"
  :components="selectedContent.data.components"
/>
```

在 script 中添加：

```typescript
import ComponentShowcase from './ComponentShowcase.vue'
```

更新占位符部分，将 `components` 类型改为实际渲染而不是显示占位符。

- [ ] **Step 2: 运行类型检查**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: 提交**

```bash
git add frontend/src/pages/design-system/components/DesignContent.vue
git commit -m "feat(design-system): integrate component showcase into content display"
```

### Task 4.2: 最终测试验证

**Files:**
- Test: All component showcase files

- [ ] **Step 1: 运行类型检查**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 2: 运行构建**

Run: `npm run build`
Expected: Build completes successfully

- [ ] **Step 3: 手动测试清单**

**开发环境测试（`npm run dev`）：**
1. 访问 `/design-system` - 页面正常加载
2. 左侧导航显示"组件展示"分组
3. 点击"基础组件" - 显示 Button 和 Input 组件
4. 点击"数据展示" - 显示 Card 和 Badge 组件
5. 查看组件代码示例 - 代码语法高亮正常
6. 点击"复制代码"按钮 - 复制功能正常
7. 查看组件 Props/Events/Slots 文档 - 表格正常显示
8. 点击"反馈组件"或"业务组件" - 显示空状态提示

- [ ] **Step 4: 更新项目文档**

修改: `frontend/docs/ai-task-log.md`

添加新条目：

```markdown
### 2025-06-26: 设计系统展示页面 Phase 2

**任务编号**: T-design-system-phase2
**目标**: 添加组件展示功能

**已完成功能**:
- ✅ 组件展示类型定义
- ✅ 组件配置数据（Button, Input, Card, Badge）
- ✅ 代码查看器（语法高亮 + 复制功能）
- ✅ 交互式预览面板
- ✅ 组件展示容器
- ✅ 组件文档展示（Props/Events/Slots）

**技术实现**:
- 代码语法高亮（纯文本实现）
- 组件配置驱动展示
- 响应式布局

**下一步计划**:
- Phase 3: 高级功能（暗色模式、搜索等）
```

- [ ] **Step 5: 提交文档更新**

```bash
git add frontend/docs/ai-task-log.md
git commit -m "docs(design-system): update task log for Phase 2 completion"
```

---

## 🎯 Phase 2 完成标准

### 功能完整性
- ✅ 组件配置数据完整（至少 4 个基础组件）
- ✅ 代码查看器正常工作
- ✅ 组件文档完整展示
- ✅ 导航正确跳转到组件展示

### 代码质量
- ✅ TypeScript 类型完整
- ✅ `npm run typecheck` 通过
- ✅ `npm run build` 成功
- ✅ 遵循项目代码规范
- ✅ 文档更新完整

### 用户体验
- ✅ 代码示例清晰易读
- ✅ 复制功能便捷
- ✅ 组件文档完整
- ✅ 空状态提示友好

---

## 📋 后续计划 (Phase 3)

### Phase 3 - 高级功能
- 暗色模式切换
- 全文搜索功能
- 响应式预览（设备切换）
- 更多组件展示
- 使用指南文档
