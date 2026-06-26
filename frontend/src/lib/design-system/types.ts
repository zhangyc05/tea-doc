// frontend/src/lib/design-system/types.ts

// 导航项结构
export interface NavItem {
  id: string
  title: string
  icon?: string
  children?: NavItem[]
  content?: ContentModule
}

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

// 指南信息结构
export interface GuideInfo {
  title: string
  content: string
  sections?: GuideSection[]
}

// 指南章节结构
export interface GuideSection {
  title: string
  content: string
}

// 内容模块类型 - 使用判别联合类型确保类型安全
export type ContentModule =
  | { type: 'colors'; title: string; description?: string; data: ColorToken[] | null }
  | { type: 'typography'; title: string; description?: string; data: FontToken[] | null }
  | { type: 'spacing'; title: string; description?: string; data: SizeToken[] | null }
  | { type: 'components'; title: string; description?: string; data: ComponentShowcase[] | null }
  | { type: 'guides'; title: string; description?: string; data: GuideInfo | null }

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
