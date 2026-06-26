import type { ProjectDesignProfile, StyleRecipe } from './types'

export const projectDesignProfile: ProjectDesignProfile = {
  productName: '教师综合发展平台',
  styleName: '清朗可信教育治理 SaaS',
  productType: 'education-governance-saas',
  positioning: '面向职业院校教师成长支持与发展治理的业务系统，不是营销页、数据大屏或 AI 聊天产品。',
  audience: ['教师', '院系管理者', '职能部门', '学校管理者', '平台管理员'],
  coreMood: ['可信', '清朗', '克制', '专业', '低认知负担'],
  designPrinciples: [
    '先让使用者看清当前要处理什么，再展示分析和建议。',
    '所有页面内容必须有明确业务理由，不为装饰增加字段、图表或卡片。',
    '管理端强调治理效率和数据可信，教师端强调轻量确认和成长支持。',
    'AI 只作为草稿、建议和解释入口，不替代确认、审核、发布或正式结论。',
    '画像和报告表达为发展支持，不表达排名、打分或通过/不通过。'
  ],
  visualRules: {
    color: [
      '蓝色作为主色，表达专业、可信和制度化。',
      '绿色用于成功、已完成、已确认、已入档等正向状态。',
      '橙色用于待处理、待确认、待补充、材料待完善。',
      '红色仅用于异常、退回、删除、风险提示。',
      '紫色仅用于服务能力或少量 AI 辅助标识，不作为大面积品牌色。'
    ],
    layout: [
      '管理端采用浅色侧边栏、顶部栏、卡片、筛选、表格、抽屉的后台结构。',
      '教师 PC 端采用工作台结构，突出当前事项、快速开始和最近动态。',
      '手机端一屏只解决一个主问题，避免把管理端表格压缩到移动端。',
      '分析页允许使用图表，但图表必须解释业务问题，不做装饰性可视化。'
    ],
    motion: [
      '动效只用于 hover、抽屉、浮层和轻量反馈。',
      '常规过渡控制在 150ms - 220ms。',
      '不使用夸张动效、三维翻转、粒子、流光等炫技效果。'
    ],
    content: [
      '教师端不用内部术语，候选数据等表达应转译为待确认记录、系统识别记录。',
      '管理端可以保留证据口径、计算规则等治理语言，但必须能解释来源。',
      '待办文案必须是一件具体可执行的事。',
      '状态、按钮、统计卡必须和当前业务闭环有关。'
    ]
  },
  recommendedStyles: [
    'Minimalism & Swiss Style',
    'Accessible & Ethical',
    'Soft UI Evolution',
    'Dimensional Layering',
    'Bento Box Grid',
    'Drill-Down Analytics Dashboard'
  ],
  forbiddenStyles: [
    'Cyberpunk UI',
    'Gen Z Chaos',
    'Heavy Glassmorphism',
    'Dark OLED Dashboard',
    'AI Purple Gradient',
    'Marketing Hero Style'
  ]
}

export const styleRecipes: StyleRecipe[] = [
  {
    name: '主风格',
    style: 'Minimalism & Swiss Style',
    reason: '适合后台、文档、治理和分析类产品，能保持信息清晰、层级稳定。',
    usage: ['页面结构', '导航层级', '表格和列表', '报告正文'],
    guardrails: ['不做强装饰背景', '不使用大面积渐变', '不把每个模块都做成独立视觉噱头']
  },
  {
    name: '辅助风格',
    style: 'Accessible & Ethical',
    reason: '教育治理系统需要可靠、包容、可解释，不能制造评价压迫感。',
    usage: ['教师端待办', '状态说明', '画像解释', '纠错反馈'],
    guardrails: ['不用排名羞辱', '不用高压红色提示', '不把 AI 建议包装成正式结论']
  },
  {
    name: '视觉增强',
    style: 'Soft UI Evolution',
    reason: '用轻阴影、圆角和浅色层次提升现代感，但不破坏专业后台气质。',
    usage: ['卡片', '详情抽屉', '浮层', '快速入口'],
    guardrails: ['阴影必须轻', '圆角必须克制', '不使用厚重拟物或玻璃拟态']
  },
  {
    name: '页面组织',
    style: 'Bento Box Grid / Dimensional Layering',
    reason: '适合把当前事项、概览、关键观察、操作入口组织成清楚的模块。',
    usage: ['教师首页', '学校画像', '分析报告卡片', '手机端卡片页'],
    guardrails: ['每个卡片必须回答一个业务问题', '卡片数量不宜过多', '不要为了视觉平衡硬塞内容']
  },
  {
    name: '分析下钻',
    style: 'Drill-Down Analytics Dashboard',
    reason: '学校画像、院系画像、专业画像、教师画像需要从群体到个体逐级下钻。',
    usage: ['能力画像', '分析报告', '发展短板识别', '资源配置建议'],
    guardrails: ['图表必须能解释结论', '不做深色大屏', '不把发展支持做成评价排名']
  }
]
