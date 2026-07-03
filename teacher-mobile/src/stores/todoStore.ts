import { reactive } from 'vue'

export type MobileTodoTone = 'blue' | 'orange' | 'purple' | 'green'
export type MobileTodoIcon = 'file' | 'clock' | 'folder' | 'pen' | 'note'
export type MobileTodoStatus = 'pending-confirm' | 'pending-supplement' | 'improvable' | 'pending-verify' | 'archived' | 'removed'

export type MobileTodoItem = {
  id: string
  tag: string
  title: string
  desc: string
  state: string
  action: string
  tone: MobileTodoTone
  icon: MobileTodoIcon
  status: MobileTodoStatus
  showOnHome: boolean
}

export type MobileTodoCertificate = {
  id: string
  title: string
  category: string
  type: string
  source: string
  status: MobileTodoStatus
  keyInfo: Array<{ label: string; value: string }>
  editableInfo: Array<{ label: string; value: string }>
  evidenceInfo: Array<{ label: string; value: string }>
  material: { name: string; meta: string }
  changes: Array<{ label: string; from: string; to: string }>
  history: string[]
}

export type MobileTodoState = {
  todos: MobileTodoItem[]
  certificate: MobileTodoCertificate
}

const certificateTodoId = 'certificate-digital-literacy'

const state = reactive<MobileTodoState>({
  todos: [
    {
      id: certificateTodoId,
      tag: '待确认',
      title: '确认一条培训证书',
      desc: '系统已帮你识别，请确认是否属于本人',
      state: '待你确认',
      action: '去确认',
      tone: 'blue',
      icon: 'file',
      status: 'pending-confirm',
      showOnHome: true,
    },
    {
      id: 'training-hours-confirm',
      tag: '待确认',
      title: '确认一条培训学时记录',
      desc: '系统已识别一条培训学时，请确认是否属于本人',
      state: '待你确认',
      action: '去确认',
      tone: 'blue',
      icon: 'clock',
      status: 'pending-confirm',
      showOnHome: false,
    },
    {
      id: 'enterprise-practice-supplement',
      tag: '待补充',
      title: '补一条企业实践记录',
      desc: '用于完善当前聘期要求依据',
      state: '用于聘期要求',
      action: '去补充',
      tone: 'orange',
      icon: 'folder',
      status: 'pending-supplement',
      showOnHome: true,
    },
    {
      id: 'training-certificate-supplement',
      tag: '待补充',
      title: '补充一份培训证书',
      desc: '用于完善培训记录依据',
      state: '用于培训记录',
      action: '去补充',
      tone: 'orange',
      icon: 'folder',
      status: 'pending-supplement',
      showOnHome: false,
    },
    {
      id: 'teaching-reflection-draft',
      tag: '可完善',
      title: '继续整理教学反思',
      desc: '系统已保存草稿，可随时完善',
      state: '已保存草稿',
      action: '继续完善',
      tone: 'purple',
      icon: 'pen',
      status: 'improvable',
      showOnHome: true,
    },
    {
      id: 'enterprise-summary-draft',
      tag: '可完善',
      title: '继续整理企业实践总结',
      desc: '系统已生成草稿，可继续完善',
      state: '已生成草稿',
      action: '继续完善',
      tone: 'purple',
      icon: 'note',
      status: 'improvable',
      showOnHome: false,
    },
  ],
  certificate: {
    id: certificateTodoId,
    title: '职业院校教师数字素养提升培训证书',
    category: '个人发展',
    type: '培训进修',
    source: '部门导入培训名单',
    status: 'pending-confirm',
    keyInfo: [
      { label: '证书名称', value: '职业院校教师数字素养提升培训证书' },
      { label: '培训项目', value: '教师数字素养提升专项培训' },
      { label: '发证单位', value: '全国职业院校教师培训中心' },
      { label: '获得时间', value: '2026.06.10' },
      { label: '培训学时', value: '32 学时' },
      { label: '证书编号', value: 'PX20260610027' },
    ],
    editableInfo: [
      { label: '证书名称', value: '职业院校教师数字素养提升培训证书' },
      { label: '发证单位', value: '山东省教师发展中心' },
      { label: '获得时间', value: '2026.05' },
      { label: '培训学时', value: '32 学时' },
      { label: '证书编号', value: 'PX202605168' },
    ],
    evidenceInfo: [
      { label: '数据来源', value: '部门导入培训名单' },
      { label: '识别依据', value: '姓名、工号、学院与当前账号一致' },
      { label: '当前账号', value: '林老师 ｜ 智能制造学院' },
    ],
    material: {
      name: '培训证书.jpg',
      meta: 'JPG · 1.2MB · 2026-05-15',
    },
    changes: [
      { label: '发证单位', from: '山东省教师发展中心', to: '全国职业院校教师培训中心' },
      { label: '获得时间', from: '2026.05', to: '2026.06.10' },
      { label: '证书编号', from: 'PX202605168', to: 'PX20260610027' },
      { label: '培训学时', from: '32 学时', to: '40 学时' },
    ],
    history: ['系统识别待确认'],
  },
})

export function getTodoState() {
  return state
}

export function getVisibleTodoItems() {
  return state.todos.filter(todo => !['pending-verify', 'archived', 'removed'].includes(todo.status))
}

export function getHomeTodoItems() {
  return getVisibleTodoItems().filter(todo => todo.showOnHome).slice(0, 3)
}

export function getTodoById(todoId = certificateTodoId) {
  return state.todos.find(todo => todo.id === todoId) ?? null
}

export function confirmTodoCertificate(todoId = certificateTodoId) {
  const todo = getTodoById(todoId)
  if (!todo) return null

  todo.tag = '已入档'
  todo.state = '已入档'
  todo.action = '查看档案'
  todo.tone = 'green'
  todo.status = 'archived'
  state.certificate.status = 'archived'
  state.certificate.history = ['教师确认本人记录', ...state.certificate.history]
  return state.certificate
}

export function submitTodoCertificateCorrection(todoId = certificateTodoId) {
  const todo = getTodoById(todoId)
  if (!todo) return null

  todo.tag = '待核验'
  todo.state = '部门核验中'
  todo.action = '查看进度'
  todo.tone = 'orange'
  todo.status = 'pending-verify'
  state.certificate.status = 'pending-verify'
  state.certificate.history = ['教师提交信息修改，等待部门核验', ...state.certificate.history]
  return state.certificate
}

export function removeTodoCertificate(todoId = certificateTodoId) {
  const todo = getTodoById(todoId)
  if (!todo) return null

  todo.tag = '已移出'
  todo.state = '已移出'
  todo.action = '查看说明'
  todo.tone = 'orange'
  todo.status = 'removed'
  state.certificate.status = 'removed'
  state.certificate.history = ['教师标记不是本人记录，移出待确认', ...state.certificate.history]
  return state.certificate
}
