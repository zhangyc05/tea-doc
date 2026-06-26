# 设计系统展示页面设计文档

**创建日期**: 2025-06-26
**项目**: 教师综合发展平台前端
**文档版本**: v1.0

## 1. 项目概述

### 1.1 目标
创建一个全面的设计系统展示页面，服务于开发团队、设计师和项目相关方，提供设计规范、组件展示和使用指南的完整文档系统。

### 1.2 目标用户
- **开发团队**: 快速查找设计 Token、了解组件用法、复制代码示例
- **设计师**: 查看视觉规范、交互模式、设计一致性检查
- **项目相关方**: 了解项目整体设计风格和品牌形象

### 1.3 访问权限
- **开发环境限定**: 仅在开发环境可见，生产环境隐藏
- **无需登录**: 开发环境内直接访问
- **路由保护**: 生产环境 404 或重定向

## 2. 功能需求

### 2.1 核心功能
1. **设计规范展示**
   - 颜色系统（主色、背景、文本、状态色等）
   - 字体系统（字号、行高、字重）
   - 尺寸系统（圆角、阴影、间距）
   - 布局规范（容器宽度、组件尺寸）

2. **组件展示**
   - shadcn-vue UI 组件库展示
   - 项目业务组件展示
   - 交互式组件预览

3. **使用指南**
   - 快速开始文档
   - 最佳实践说明
   - 常见问题解答
   - 更新日志

4. **交互功能**
   - 一键复制（颜色代码、Token 值、代码示例）
   - 实时预览（参数调整、主题切换）
   - 代码切换（Vue/TS/HTML）
   - 搜索过滤（快速定位）
   - 暗色模式切换

### 2.2 技术需求
- **环境检测**: 自动识别开发/生产环境
- **性能优化**: 按需加载组件和文档
- **响应式设计**: 支持桌面和移动端查看
- **搜索功能**: 全文搜索设计系统内容

## 3. 信息架构

### 3.1 整体布局
```
┌─────────────────────────────────────────────────────────┐
│  顶部工具栏：Logo | 搜索 | 主题切换 | 代码切换 | GitHub   │
├────────────┬────────────────────────────────────────────┤
│            │                                             │
│  左侧导航   │            右侧内容区                      │
│            │                                             │
│  🎨 设计    │  - 当前选中的内容展示                      │
│  🧩 组件    │  - 交互式预览                               │
│  📦 业务    │  - 代码示例                                │
│  📖 指南    │  - 使用说明                                │
│            │                                             │
└────────────┴────────────────────────────────────────────┘
```

### 3.2 导航结构

#### **一级分类: 设计规范**
- **颜色系统**
  - 品牌主色（primary、hover、light、soft）
  - 背景色（页面、卡片、输入框）
  - 文本色（主要、次要、第三级、禁用）
  - 状态色（成功、警告、危险、信息、紫色、中性）
  - 能力画像色（教学、科研、实践、服务）

- **字体系统**
  - 字号规范（xs/sm/md/lg/xl/2xl）
  - 行高规范（tight/normal/loose）
  - 字重使用指南

- **尺寸系统**
  - 圆角规范（xs/sm/md/lg/xl/full）
  - 阴影规范（卡片、悬停、浮动）
  - 间距系统（padding、margin）

- **布局规范**
  - 容器宽度（管理端、教师端、移动端）
  - 组件尺寸（按钮、输入框、卡片）

#### **一级分类: UI 组件库**
- **基础组件**
  - Button（按钮）
  - Input（输入框）
  - Select（选择器）
  - Checkbox（复选框）
  - Radio（单选框）

- **数据展示**
  - Card（卡片）
  - Table（表格）
  - Badge（徽章）
  - Progress（进度条）

- **反馈组件**
  - Alert（警告框）
  - Toast（提示框）
  - Modal（对话框）
  - Loading（加载中）

#### **一级分类: 业务组件**
- **布局组件**
  - AdminLayout（管理端布局）
  - PageHeader（页面头部）
  - FilterBar（筛选栏）

- **通用业务**
  - StatCard（统计卡片）
  - StatusBadge（状态徽章）
  - DetailSheet（详情面板）

#### **一级分类: 使用指南**
- **快速开始**
- **最佳实践**
- **常见问题**
- **更新日志**

## 4. 交互设计

### 4.1 左侧导航
- **可折叠树形结构**: 支持多级展开/收起
- **搜索过滤**: 实时过滤导航项
- **当前状态高亮**: 显示当前浏览位置
- **键盘快捷键**: 支持方向键导航

### 4.2 右侧内容区
- **展示模式切换**: 预览/代码/分屏
- **交互控制面板**: 动态调整组件参数
- **一键复制**: 颜色值、代码示例
- **响应式预览**: 切换不同设备尺寸

### 4.3 顶部工具栏
- **搜索框**: 全文搜索，高亮匹配项
- **主题切换**: 浅色/深色模式切换
- **代码切换**: Vue/TS/HTML 格式切换
- **外部链接**: GitHub 文档、设计资源

## 5. 技术实现

### 5.1 技术栈
- **框架**: Vue 3 + TypeScript
- **路由**: Vue Router（新增独立路由）
- **组件库**: shadcn-vue + 自定义组件
- **搜索**: 简单的客户端搜索（关键词匹配）
- **环境检测**: `import.meta.env.DEV`

### 5.2 文件结构
```
frontend/src/
├── pages/
│   └── design-system/
│       ├── DesignSystemPage.vue           # 主页面
│       ├── components/
│       │   ├── DesignSidebar.vue         # 左侧导航
│       │   ├── DesignContent.vue         # 右侧内容区
│       │   ├── ColorPalette.vue          # 颜色展示
│       │   ├── TypographyScale.vue        # 字体展示
│       │   ├── ComponentShowcase.vue     # 组件展示
│       │   └── CodeViewer.vue            # 代码查看器
│       └── content/
│           ├── colors.ts                  # 颜色数据
│           ├── typography.ts              # 字体数据
│           ├── components.ts              # 组件配置
│           └── guides.ts                  # 指南内容
├── router/
│   └── design-system.routes.ts           # 设计系统路由
└── lib/
    └── design-system/
        ├── tokens.ts                      # Token 提取工具
        └── utils.ts                       # 工具函数
```

### 5.3 路由配置
```typescript
// 新增设计系统路由
{
  path: '/design-system',
  name: 'DesignSystem',
  component: DesignSystemPage,
  meta: {
    title: '设计系统',
    devOnly: true, // 开发环境专用
  }
}
```

### 5.4 环境检测
```typescript
// 路由守卫：生产环境隐藏
router.beforeEach((to, from, next) => {
  if (to.meta.devOnly && import.meta.env.PROD) {
    // 生产环境重定向到管理端首页
    next({ path: '/admin/training/resources' })
  } else {
    next()
  }
})

// 环境检测工具函数
export const isDevEnvironment = (): boolean => {
  return import.meta.env.DEV
}

export const canAccessDesignSystem = (): boolean => {
  return isDevEnvironment()
}
```

### 5.5 核心组件设计

#### DesignSystemPage.vue
- **布局**: Flexbox 左右分栏布局
- **状态管理**: 当前选中导航项、主题模式、搜索关键词
- **数据加载**: 按需加载内容模块

#### DesignSidebar.vue
- **渲染**: 递归渲染多级树形结构
- **交互**: 展开/收起、搜索过滤、键盘导航
- **状态**: 当前选中项、展开状态

#### DesignContent.vue
- **内容渲染**: 根据选中项动态加载对应组件
- **代码展示**: 语法高亮、一键复制
- **交互预览**: 参数控制面板

#### ColorPalette.vue
- **展示方式**: 网格布局，每个颜色卡片显示色值和名称
- **交互**: 点击复制颜色代码，显示复制成功提示
- **数据**: 从 `tokens.css` 自动提取颜色变量

#### CodeViewer.vue
- **功能**: 代码语法高亮、格式切换、一键复制
- **支持格式**: Vue SFC、TypeScript、HTML

### 5.6 数据管理

#### Token 提取（改进版）
```typescript
// lib/design-system/tokens.ts
// 批量提取所有 CSS 自定义属性
export const extractAllTokens = (): Record<string, string> => {
  const styles = getComputedStyle(document.documentElement)
  const tokens: Record<string, string> = {}

  // 提取所有以 --color- 开头的变量
  for (let i = 0; i < styles.length; i++) {
    const name = styles[i]
    if (name.startsWith('--color-')) {
      const value = styles.getPropertyValue(name).trim()
      tokens[name] = value
    }
  }

  // 分类提取其他类型的 Token
  const tokenCategories = {
    colors: extractTokensByPrefix('--color-'),
    fonts: extractTokensByPrefix('--font-'),
    radius: extractTokensByPrefix('--radius-'),
    shadow: extractTokensByPrefix('--shadow-'),
  }

  return { ...tokens, ...tokenCategories }
}

// 按前缀提取 Token
const extractTokensByPrefix = (prefix: string): Record<string, string> => {
  const styles = getComputedStyle(document.documentElement)
  const result: Record<string, string> = {}

  for (let i = 0; i < styles.length; i++) {
    const name = styles[i]
    if (name.startsWith(prefix)) {
      const value = styles.getPropertyValue(name).trim()
      result[name] = value
    }
  }

  return result
}

// 获取单个 Token
export const getToken = (name: string): string => {
  const styles = getComputedStyle(document.documentElement)
  return styles.getPropertyValue(name).trim()
}
```

#### 组件配置（扩展版）
```typescript
// content/components.ts
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
        code: `<Button variant="primary">点击我</Button>`,
        props: { variant: 'primary' }
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
  }
]
```

## 6. 数据结构

### 6.1 导航数据结构
```typescript
interface NavItem {
  id: string
  title: string
  icon?: string
  children?: NavItem[]
  content?: ContentModule
}
```

### 6.2 内容模块结构
```typescript
interface ContentModule {
  type: 'colors' | 'typography' | 'spacing' | 'components' | 'guide'
  title: string
  description?: string
  data: any
}
```

### 6.3 颜色数据结构
```typescript
interface ColorToken {
  name: string
  value: string
  description?: string
  usage?: string[]
}
```

### 6.4 组件展示结构（扩展版）
```typescript
interface ComponentShowcase {
  name: string
  category: string
  description?: string
  variants: string[]
  examples: ComponentExample[]
  props?: PropDefinition[]
  events?: EventDefinition[]
  slots?: SlotDefinition[]
}

interface ComponentExample {
  title: string
  description?: string
  code: string
  props?: Record<string, any>
}

interface PropDefinition {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

interface EventDefinition {
  name: string
  description: string
  payload?: string
}

interface SlotDefinition {
  name: string
  description: string
  props?: Record<string, string>
}
```

## 7. 实现优先级

### 7.1 Phase 1 - 基础框架 (MVP)
1. 页面布局和导航结构
2. 设计规范展示（颜色、字体、尺寸）
3. 基础交互功能（复制、搜索）
4. 环境检测和路由保护

### 7.2 Phase 2 - 组件展示
1. UI 组件库展示
2. 业务组件展示
3. 交互式预览
4. 代码查看器

### 7.3 Phase 3 - 高级功能
1. 暗色模式
2. 响应式预览
3. 使用指南文档
4. 更新日志

## 8. 成功标准

### 8.1 功能完整性
- ✅ 所有设计 Token 可视化展示
- ✅ 所有组件可预览和复制代码
- ✅ 搜索功能正常工作
- ✅ 环境保护机制生效

### 8.2 用户体验
- ✅ 导航清晰，易于查找
- ✅ 交互流畅，响应及时
- ✅ 复制功能准确可靠
- ✅ 响应式布局适配良好

### 8.3 开发体验
- ✅ 代码示例准确可用
- ✅ 文档说明清晰详细
- ✅ 维护和扩展容易

## 9. 风险和挑战

### 9.1 技术风险
- **Token 提取准确性**: 确保 CSS 变量正确提取
- **组件预览稳定性**: 避免组件在预览环境中出错
- **搜索性能**: 大量内容的搜索响应速度

### 9.2 维护风险
- **内容同步**: 设计系统变更需要及时更新展示
- **版本管理**: 设计系统版本演进的历史记录
- **多环境一致性**: 确保开发/生产环境的行为一致

### 9.3 缓解措施
- 自动化 Token 提取工具
- 组件预览错误边界处理
- 客户端搜索优化（索引、缓存）
- 定期内容同步检查

## 10. 后续扩展

### 10.1 可能的功能扩展
- **设计变更历史**: 记录和展示设计系统演变
- **A/B 测试集成**: 展示不同设计版本的效果
- **国际化支持**: 多语言设计文档
- **团队协作**: 收集反馈和使用统计

### 10.2 长期愿景
- 成为项目设计决策的权威参考
- 支持新成员快速了解设计规范
- 促进设计和开发的协作效率
- 建立设计系统演进的最佳实践

## 11. 搜索功能设计

### 11.1 搜索数据结构
```typescript
// 搜索索引结构
interface SearchIndex {
  id: string
  title: string
  content: string
  keywords: string[]
  category: 'colors' | 'components' | 'guides' | 'tokens'
  path: string
}

// 搜索结果结构
interface SearchResult {
  item: SearchIndex
  score: number
  highlights: HighlightRange[]
}
```

### 11.2 搜索实现方案
```typescript
// 客户端搜索实现
export class DesignSystemSearch {
  private index: SearchIndex[] = []
  private searchCache = new Map<string, SearchResult[]>()

  // 构建搜索索引
  buildIndex(data: any[]): void {
    this.index = this.flattenData(data).map(item => ({
      id: this.generateId(item),
      title: item.title || item.name,
      content: this.extractContent(item),
      keywords: this.extractKeywords(item),
      category: this.determineCategory(item),
      path: this.generatePath(item)
    }))
  }

  // 执行搜索（带防抖）
  search(query: string, debounceMs = 300): Observable<SearchResult[]> {
    return debounce(() => this.performSearch(query), debounceMs)()
  }

  // 执行实际搜索
  private performSearch(query: string): SearchResult[] {
    if (this.searchCache.has(query)) {
      return this.searchCache.get(query)!
    }

    const results = this.fuzzySearch(query)
    this.searchCache.set(query, results)

    return results
  }

  // 模糊搜索算法
  private fuzzySearch(query: string): SearchResult[] {
    const lowerQuery = query.toLowerCase()

    return this.index
      .map(item => ({
        item,
        score: this.calculateScore(item, lowerQuery),
        highlights: this.findHighlights(item, lowerQuery)
      }))
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20) // 限制结果数量
  }

  // 计算相关性得分
  private calculateScore(item: SearchIndex, query: string): number {
    let score = 0

    // 标题完全匹配
    if (item.title.toLowerCase() === query) score += 100

    // 标题包含查询词
    if (item.title.toLowerCase().includes(query)) score += 50

    // 关键词匹配
    item.keywords.forEach(keyword => {
      if (keyword.toLowerCase().includes(query)) score += 10
    })

    // 内容匹配
    if (item.content.toLowerCase().includes(query)) score += 5

    return score
  }

  // 查找高亮范围
  private findHighlights(item: SearchIndex, query: string): HighlightRange[] {
    const highlights: HighlightRange[] = []
    const lowerTitle = item.title.toLowerCase()
    const lowerContent = item.content.toLowerCase()

    // 在标题中查找
    let index = lowerTitle.indexOf(query)
    if (index !== -1) {
      highlights.push({ field: 'title', start: index, end: index + query.length })
    }

    // 在内容中查找
    index = lowerContent.indexOf(query)
    if (index !== -1) {
      highlights.push({ field: 'content', start: index, end: index + query.length })
    }

    return highlights
  }
}
```

### 11.3 搜索性能优化
- **防抖处理**: 300ms 防抖，减少搜索次数
- **结果缓存**: 缓存搜索结果，避免重复计算
- **限制结果**: 最多返回 20 条结果
- **增量索引**: 数据变化时增量更新索引
- **Web Worker**: 大数据量时使用 Web Worker 避免阻塞 UI

## 12. 响应式设计详细方案

### 12.1 断点系统
```typescript
// 响应式断点定义
const breakpoints = {
  xs: '375px',   // 小屏手机
  sm: '640px',   // 大屏手机
  md: '768px',   // 平板
  lg: '1024px',  // 小屏笔记本
  xl: '1280px',  // 桌面
  '2xl': '1536px' // 大屏桌面
}

// 响应式工具函数
export const useResponsive = () => {
  const width = ref(window.innerWidth)

  const updateWidth = () => {
    width.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  return {
    width,
    isMobile: computed(() => width.value < 768),
    isTablet: computed(() => width.value >= 768 && width.value < 1024),
    isDesktop: computed(() => width.value >= 1024)
  }
}
```

### 12.2 移动端适配方案
- **导航方式**: 移动端左侧导航变为底部抽屉或侧边栏
- **布局调整**: 移动端改为单列布局
- **字体缩放**: 小屏幕适当减小字体
- **触摸优化**: 增大点击区域，优化触摸体验
- **性能优化**: 移动端减少动画效果

### 12.3 响应式组件设计
```vue
<template>
  <div :class="responsiveClasses">
    <DesignSidebar
      v-if="!isMobile"
      :items="navItems"
      @select="handleSelect"
    />
    <MobileNavigation
      v-else
      :items="navItems"
      @select="handleSelect"
    />
    <DesignContent :selected="selectedItem" />
  </div>
</template>

<script setup>
const { isMobile } = useResponsive()

const responsiveClasses = computed(() => ({
  'mobile-layout': isMobile.value,
  'desktop-layout': !isMobile.value
}))
</script>
```

## 13. 测试策略

### 13.1 单元测试
```typescript
// Token 提取工具测试
describe('Token Extraction', () => {
  it('should extract all color tokens', () => {
    const tokens = extractAllTokens()
    expect(tokens).toHaveProperty('--color-primary')
    expect(tokens['--color-primary']).toBe('#0B63F6')
  })

  it('should extract tokens by prefix', () => {
    const colorTokens = extractTokensByPrefix('--color-')
    expect(Object.keys(colorTokens).length).toBeGreaterThan(0)
  })
})

// 搜索功能测试
describe('Design System Search', () => {
  it('should find exact matches', () => {
    const search = new DesignSystemSearch()
    search.buildIndex(mockData)
    const results = search.performSearch('Button')
    expect(results).toHaveLength(1)
    expect(results[0].score).toBeGreaterThan(50)
  })

  it('should handle empty queries', () => {
    const search = new DesignSystemSearch()
    search.buildIndex(mockData)
    const results = search.performSearch('')
    expect(results).toHaveLength(0)
  })
})
```

### 13.2 集成测试
```typescript
// 环境检测测试
describe('Environment Detection', () => {
  it('should detect dev environment correctly', () => {
    const isDev = isDevEnvironment()
    expect(typeof isDev).toBe('boolean')
  })

  it('should redirect in production', async () => {
    // 模拟生产环境
    vi.stubEnv('PROD', 'true')

    const router = createRouter({ /* ... */ })
    await router.push('/design-system')

    expect(router.currentRoute.value.path).toBe('/admin/training/resources')
  })
})
```

### 13.3 E2E 测试计划
- 测试设计系统页面在不同环境中的访问
- 测试搜索功能的准确性
- 测试复制功能的可靠性
- 测试响应式布局在不同设备上的表现
- 测试组件预览的错误处理

## 14. 性能优化方案

### 14.1 组件懒加载
```typescript
// 按需加载内容组件
const componentMap = {
  'colors': () => import('./components/ColorPalette.vue'),
  'typography': () => import('./components/TypographyScale.vue'),
  'components': () => import('./components/ComponentShowcase.vue'),
  'guides': () => import('./components/GuideContent.vue')
}

// 动态加载组件
const loadComponent = async (type: string) => {
  const loader = componentMap[type]
  if (loader) {
    const module = await loader()
    return module.default
  }
  return null
}
```

### 14.2 代码分割
```typescript
// 路由级代码分割
{
  path: '/design-system',
  component: () => import('@/pages/design-system/DesignSystemPage.vue'),
  children: [
    {
      path: 'colors',
      component: () => import('./pages/design-system/ColorPalette.vue')
    }
  ]
}
```

### 14.3 缓存策略
- **搜索结果缓存**: 使用 Map 缓存搜索结果
- **Token 数据缓存**: Token 提取结果缓存在内存中
- **组件缓存**: 使用 `<KeepAlive>` 缓存已访问的组件

### 14.4 图片和资源优化
- 代码示例使用文本而非图片
- 设计 Token 使用 CSS 变量而非硬编码
- 避免不必要的资源加载

## 15. 可访问性考虑

### 15.1 键盘导航
```typescript
// 键盘导航支持
const useKeyboardNavigation = () => {
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        navigateToNextItem()
        break
      case 'ArrowUp':
        navigateToPreviousItem()
        break
      case 'Enter':
        selectCurrentItem()
        break
      case 'Escape':
        closeSearch()
        break
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })
}
```

### 15.2 屏幕阅读器支持
- 使用语义化 HTML 标签
- 添加适当的 ARIA 属性
- 为颜色添加文字描述
- 为交互元素提供清晰的标签

### 15.3 焦点管理
- 明确的焦点指示器
- 合理的 Tab 键顺序
- 模态对话框的焦点陷阱
- 搜索结果的焦点管理

## 16. 更新日志机制

### 16.1 数据结构
```typescript
interface ChangelogEntry {
  version: string
  date: string
  type: 'added' | 'changed' | 'fixed' | 'removed'
  category: 'colors' | 'components' | 'features' | 'docs'
  description: string
  details?: string
  author?: string
}

// 更新日志数据
export const changelog: ChangelogEntry[] = [
  {
    version: '1.0.0',
    date: '2025-06-26',
    type: 'added',
    category: 'features',
    description: '设计系统展示页面 MVP 上线',
    details: '包含基础的设计规范展示和组件库展示',
    author: 'Development Team'
  }
]
```

### 16.2 展示方式
- 按时间倒序排列
- 使用图标区分不同类型
- 支持按类型和版本过滤
- 提供 RSS 订阅功能

## 17. 项目集成方案

### 17.1 与现有项目的关系
- **独立路由**: 设计系统使用独立路由，不影响现有功能
- **独立布局**: 使用自定义布局，不依赖 AdminLayout
- **快速跳转**: 顶部工具栏提供快速跳转到管理端的链接

### 17.2 导航集成
```vue
<template>
  <div class="design-system-header">
    <div class="logo-section">
      <h1>设计系统</h1>
      <span class="version">v1.0.0</span>
    </div>

    <div class="navigation-section">
      <Button
        variant="ghost"
        @click="navigateToAdmin"
      >
        跳转到管理端
      </Button>
    </div>

    <div class="tools-section">
      <SearchInput />
      <ThemeToggle />
      <CodeSwitcher />
    </div>
  </div>
</template>
```

### 17.3 数据同步
- **Token 同步**: 直接从 `tokens.css` 读取，确保一致性
- **组件同步**: 定期检查 UI 组件库的变化
- **文档同步**: 手动维护使用指南和最佳实践

## 18. 数据流向图

### 18.1 Token 数据流
```
tokens.css (CSS Variables)
    ↓
getComputedStyle()
    ↓
extractAllTokens() (工具函数)
    ↓
ColorPalette.vue (展示组件)
    ↓
用户交互 (复制、预览)
```

### 18.2 组件数据流
```
components.ts (配置文件)
    ↓
ComponentShowcase.vue (展示组件)
    ↓
动态导入组件
    ↓
CodeViewer.vue (代码展示)
    ↓
用户交互 (复制、切换)
```

### 18.3 搜索数据流
```
所有数据源 (Token + 组件 + 指南)
    ↓
buildIndex() (构建索引)
    ↓
search() (用户查询)
    ↓
fuzzySearch() (模糊搜索)
    ↓
SearchResult[] (结果展示)
```

---

**文档状态**: 待用户审核
**下一步**: 编写实现计划
