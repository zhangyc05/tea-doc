import type { AntiPattern } from './types'

export const antiPatterns: AntiPattern[] = [
  {
    id: 'no-dark-sidebar',
    title: '禁止深色后台侧边栏',
    category: '视觉风格',
    risk: '会把平台误导为科技大屏或运维系统，破坏清朗教育 SaaS 气质。',
    avoid: ['黑色侧边栏', '深蓝渐变侧栏', '高饱和发光菜单'],
    instead: '使用浅色侧边栏、蓝色当前态、细边框和轻背景层次。'
  },
  {
    id: 'no-mint-as-brand',
    title: '禁止把项目定义成浅色薄荷绿主风格',
    category: '颜色',
    risk: '当前管理端主风格是专业、清爽、克制的浅色教育 SaaS，蓝色才是主色，绿色只适合作状态色或辅助色。',
    avoid: ['大面积薄荷绿背景', '绿色主按钮体系', '所有强调色都用绿色'],
    instead: '主色使用蓝色，绿色用于成功、已完成、已入档等状态。'
  },
  {
    id: 'no-ai-purple-gradient',
    title: '禁止 AI 紫粉渐变主导页面',
    category: 'AI 表达',
    risk: '平台核心是教师发展业务闭环，不是 AI 聊天产品。AI 过强会抢走业务主线。',
    avoid: ['紫粉渐变大卡片', 'AI 占据首屏核心区域', '每个模块都写 AI 推荐'],
    instead: 'AI 使用右下角浮动入口、轻量标识和建议态文案。'
  },
  {
    id: 'no-marketing-hero',
    title: '禁止营销页式首屏',
    category: '页面结构',
    risk: '业务系统需要让用户快速处理事项，不需要口号、插画和大面积宣传。',
    avoid: ['大标题口号', '营销插画', '夸张背景装饰', '行动号召型大按钮'],
    instead: '首屏直接展示当前事项、数据概况、快速入口和最近动态。'
  },
  {
    id: 'no-unreasoned-cards',
    title: '禁止无业务依据的统计卡',
    category: '信息架构',
    risk: '会增加认知负担，也不符合“页面上每个内容都必须有理由”的原则。',
    avoid: ['为了凑四张卡而新增指标', '和当前页面操作无关的统计', '无法解释来源的百分比'],
    instead: '只保留能支撑当前判断、筛选或处理动作的统计。'
  },
  {
    id: 'no-evaluation-ranking',
    title: '禁止把画像做成评价排名',
    category: '业务表达',
    risk: '能力画像是发展支持和解释工具，不是正式评价结论。',
    avoid: ['教师排名', '通过/不通过', '综合评分压制', '红榜/黑榜'],
    instead: '表达为发展特征、支持方向、依据说明、可改进方向。'
  },
  {
    id: 'no-internal-jargon-for-teachers',
    title: '教师端禁止直接暴露内部术语',
    category: '内容语言',
    risk: '教师无法理解候选数据、证据口径、收口等治理术语，影响信任和使用。',
    avoid: ['候选数据', '收口', '证据口径', '待收口'],
    instead: '转译为待确认记录、系统识别记录、依据说明、材料待完善。'
  },
  {
    id: 'no-emoji-as-official-icon',
    title: '禁止使用 emoji 作为正式图标',
    category: '组件规范',
    risk: 'emoji 跨平台表现不稳定，不符合专业教育治理系统气质。',
    avoid: ['导航菜单 emoji', '状态卡 emoji', '按钮 emoji'],
    instead: '使用统一 SVG / Icon 组件，或在设计系统中暂时以纯文本替代。'
  },
  {
    id: 'no-mobile-table-compression',
    title: '禁止把管理端表格直接压到手机端',
    category: '响应式',
    risk: '手机端用于碎片化处理，表格压缩会导致信息不可读、操作困难。',
    avoid: ['横向滚动大表格', '一屏多个筛选器', '密集字段卡片'],
    instead: '手机端使用卡片列表、状态筛选和单任务详情页。'
  },
  {
    id: 'no-decorative-charts',
    title: '禁止装饰性图表',
    category: '分析报告',
    risk: '图表如果不能解释业务问题，会让分析报告显得虚假和复杂。',
    avoid: ['无来源图表', '无结论图表', '炫技大屏图', '过多饼图'],
    instead: '每个图表必须对应一个管理问题、一个观察结论或一个下钻入口。'
  }
]
