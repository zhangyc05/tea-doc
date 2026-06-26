// frontend/src/pages/design-system/content/navigation.ts
import type { NavItem } from '@/lib/design-system/types'
import { antiPatterns } from '@/lib/design-system/anti-patterns'
import { pagePatterns } from '@/lib/design-system/page-patterns'
import { projectDesignProfile, styleRecipes } from '@/lib/design-system/profile'
import { qualityChecklist } from '@/lib/design-system/quality-checklist'
import { componentShowcases, componentsByCategory } from './components'

export const navigationItems: NavItem[] = [
  {
    id: 'style-governance',
    title: '风格治理',
    children: [
      {
        id: 'project-profile',
        title: '项目风格画像',
        content: {
          type: 'project-profile',
          title: '项目风格画像',
          description: '定义教师综合发展平台的设计气质、风格组合、使用边界和禁止风格。',
          data: {
            profile: projectDesignProfile,
            recipes: styleRecipes
          }
        }
      },
      {
        id: 'page-patterns',
        title: '页面模式',
        content: {
          type: 'page-patterns',
          title: '页面模式',
          description: '把高保真效果图转 Vue 前，先匹配页面模式，再组合组件和数据。',
          data: pagePatterns
        }
      },
      {
        id: 'anti-patterns',
        title: '反模式',
        content: {
          type: 'anti-patterns',
          title: '反模式',
          description: '明确哪些视觉、内容和交互做法会导致项目风格跑偏。',
          data: antiPatterns
        }
      },
      {
        id: 'quality-checklist',
        title: '交付检查',
        content: {
          type: 'quality-checklist',
          title: '交付检查',
          description: '用于页面实现、截图对比和代码提交前的统一验收。',
          data: qualityChecklist
        }
      }
    ]
  },
  {
    id: 'design-tokens',
    title: '设计规范',
    children: [
      {
        id: 'colors',
        title: '颜色系统',
        content: {
          type: 'colors',
          title: '颜色系统',
          description: '包含品牌主色、背景色、文本色和状态色',
          data: null
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
    id: 'components',
    title: '组件展示',
    children: [
      {
        id: 'components-basic',
        title: '基础组件',
        content: {
          type: 'components',
          title: '基础组件',
          description: 'shadcn-vue 基础 UI 组件展示和使用说明',
          data: componentsByCategory['基础组件']
        }
      },
      {
        id: 'components-data',
        title: '数据展示',
        content: {
          type: 'components',
          title: '数据展示',
          description: '数据展示相关组件',
          data: componentsByCategory['数据展示']
        }
      },
      {
        id: 'components-feedback',
        title: '反馈组件',
        content: {
          type: 'components',
          title: '反馈组件',
          description: '用户反馈相关组件（Phase 2 继续实现）',
          data: []
        }
      },
      {
        id: 'components-business',
        title: '业务组件',
        content: {
          type: 'components',
          title: '业务组件',
          description: '项目业务组件展示（Phase 2 继续实现）',
          data: []
        }
      }
    ]
  },
  {
    id: 'guides',
    title: '使用指南',
    children: [
      {
        id: 'quick-start',
        title: '快速开始',
        content: {
          type: 'guides',
          title: '快速开始',
          description: '如何使用设计系统',
          data: null
        }
      },
      {
        id: 'best-practices',
        title: '最佳实践',
        content: {
          type: 'guides',
          title: '最佳实践',
          description: '设计系统使用建议',
          data: null
        }
      }
    ]
  }
]
