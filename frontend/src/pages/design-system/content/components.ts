import type { ComponentShowcase } from '@/lib/design-system/types'

export const componentShowcases: ComponentShowcase[] = [
  {
    name: 'Button',
    category: '基础组件',
    description: '按钮组件，支持多种样式和尺寸',
    variants: ['default', 'primary', 'ghost', 'destructive', 'outline'],
    examples: [
      {
        title: '默认按钮',
        description: '默认样式按钮',
        code: '<Button>默认按钮</Button>',
        props: { variant: 'default' }
      },
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
    ],
    events: [],
    slots: []
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
    ],
    events: [],
    slots: []
  }
]

// 按分类组织组件
export const componentsByCategory = {
  '基础组件': componentShowcases.filter(c => c.category === '基础组件'),
  '数据展示': componentShowcases.filter(c => c.category === '数据展示')
}
