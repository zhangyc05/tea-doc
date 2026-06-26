import type { ComponentShowcase } from '@/lib/design-system/types'

export const componentShowcases: ComponentShowcase[] = [
  {
    name: 'Button',
    category: '基础组件',
    description: '按钮组件，支持主操作、次操作、轻量操作和危险操作。',
    variants: ['default', 'primary', 'ghost', 'destructive', 'outline'],
    examples: [
      {
        title: '主操作按钮',
        description: '用于页面最主要的一件事。',
        code: '<Button variant="primary">确认入档</Button>',
        props: { variant: 'primary', label: '确认入档' }
      },
      {
        title: '次要按钮',
        description: '用于查看、取消、返回等次要动作。',
        code: '<Button variant="outline">查看依据</Button>',
        props: { variant: 'outline', label: '查看依据' }
      },
      {
        title: '危险按钮',
        description: '仅用于删除、移出、作废等危险动作。',
        code: '<Button variant="destructive">移出记录</Button>',
        props: { variant: 'destructive', label: '移出记录' }
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
    description: '输入框组件，用于搜索、筛选和轻量录入。教师端尽量避免从零填写。',
    examples: [
      {
        title: '搜索输入',
        description: '用于档案、资源、记录等列表检索。',
        code: '<Input placeholder="搜索教师、课程、成果或材料" />',
        props: { placeholder: '搜索教师、课程、成果或材料' }
      },
      {
        title: '只读信息',
        description: '用于展示系统已带出的信息，避免重复输入。',
        code: '<Input disabled value="智能制造学院｜讲师" />',
        props: { disabled: true, value: '智能制造学院｜讲师' }
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
    description: '卡片组件，用于内容分组展示。业务页面优先使用卡片承载一个明确问题。',
    examples: [
      {
        title: '基础信息卡片',
        description: '用于展示一个业务对象的摘要。',
        code: '<Card>...</Card>',
        props: { title: '确认一条培训证书', description: '系统已帮您识别，请确认是否属于本人。' }
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
    description: '徽章组件，用于状态标识。状态色必须和业务含义一致。',
    variants: ['default', 'primary', 'success', 'warning', 'danger'],
    examples: [
      {
        title: '状态徽章',
        description: '用于正式、待确认、异常等状态。',
        code: '<Badge variant="warning">待确认</Badge>',
        props: { variant: 'warning', label: '待确认' }
      },
      {
        title: '正式状态',
        description: '正式入档、已完成等正向状态。',
        code: '<Badge variant="success">已正式入档</Badge>',
        props: { variant: 'success', label: '已正式入档' }
      }
    ],
    props: [
      { name: 'variant', type: 'string', default: 'default', description: '徽章样式变体' }
    ],
    events: [],
    slots: []
  },
  {
    name: '待办事项卡',
    category: '业务组件',
    description: '用于教师端首页、全部待办和消息跳转后的业务提醒。必须是一件具体可执行的事。',
    variants: ['teacher', 'admin'],
    examples: [
      {
        title: '教师端优先待办',
        description: '用于教师进入平台后优先处理。',
        code: '<TaskCard title="确认一条培训证书" status="待你确认" />',
        props: { scene: 'teacher' }
      },
      {
        title: '管理端待处理记录',
        description: '用于管理端审核队列或处理列表。',
        code: '<TaskCard title="3 条候选数据待核验" status="待部门处理" />',
        props: { scene: 'admin' }
      }
    ],
    props: []
  },
  {
    name: '统计摘要卡',
    category: '业务组件',
    description: '用于管理端列表页和分析页。统计项必须服务于当前页面判断，不为了凑数量展示。',
    examples: [
      {
        title: '管理端统计摘要',
        description: '用于资源库、入档确认、申请处理等页面顶部。',
        code: '<StatSummaryCard title="待确认记录" value="26" />',
        props: {}
      }
    ],
    props: []
  },
  {
    name: '筛选工具条',
    category: '业务组件',
    description: '用于管理端列表页。筛选与搜索统一放在一个区域，避免多个孤立控件。',
    examples: [
      {
        title: '管理端筛选区',
        description: '搜索 + 状态 + 来源 + 主操作。',
        code: '<FilterToolbar />',
        props: {}
      }
    ],
    props: []
  },
  {
    name: '画像摘要卡',
    category: '业务组件',
    description: '用于能力画像和分析报告。表达发展支持，不表达评价排名。',
    examples: [
      {
        title: '个人画像摘要',
        description: '展示画像类型、正式事实依据和支持方向。',
        code: '<ProfileSummaryCard />',
        props: {}
      }
    ],
    props: []
  },
  {
    name: '档案事实卡',
    category: '业务组件',
    description: '用于成长档案维度页和事实详情页。突出来源、状态和可引用场景。',
    examples: [
      {
        title: '正式档案事实',
        description: '展示已正式入档的事实摘要。',
        code: '<ArchiveFactCard />',
        props: {}
      }
    ],
    props: []
  }
]

export const componentsByCategory = {
  '基础组件': componentShowcases.filter(c => c.category === '基础组件'),
  '数据展示': componentShowcases.filter(c => c.category === '数据展示'),
  '业务组件': componentShowcases.filter(c => c.category === '业务组件')
}
