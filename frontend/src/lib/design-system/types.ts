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
