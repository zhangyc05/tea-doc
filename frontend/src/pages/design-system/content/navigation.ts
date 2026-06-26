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
          data: null // 将在组件中动态提取
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
          data: null // 将在组件中动态提取
        }
      },
      {
        id: 'best-practices',
        title: '最佳实践',
        content: {
          type: 'guides',
          title: '最佳实践',
          description: '设计系统使用建议',
          data: null // 将在组件中动态提取
        }
      }
    ]
  }
]
