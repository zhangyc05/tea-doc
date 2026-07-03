import { reactive } from 'vue'

export type MobileTodoTone = 'blue' | 'orange' | 'purple' | 'green'
export type MobileTodoIcon = 'file' | 'clock' | 'folder' | 'pen' | 'note'
export type MobileTodoStatus = 'pending-confirm' | 'pending-supplement' | 'improvable' | 'pending-verify' | 'archived' | 'removed'
export type MobileTodoMaterialStatus = 'recognized' | 'previewed' | 'replaced' | 'pending-verify' | 'confirmed'
export type MobileTodoDynamicType = '记录确认' | '材料更新' | '草稿保存' | '入档确认' | '其他'

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
  actionUrl: string
  adminStoreRefs: string[]
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
  material: { name: string; meta: string; status: MobileTodoMaterialStatus; previewUrl: string }
  changes: Array<{ label: string; from: string; to: string }>
  submissionRecords: Array<{ id: string; title: string; status: MobileTodoStatus; submittedAt: string; adminStoreRefs: string[] }>
  removeReason: string
  history: string[]
  adminStoreRefs: string[]
}

export type MobileTodoDynamic = {
  id: string
  title: string
  desc: string
  category: string
  time: string
  group: '今天' | '昨天' | '更早'
  type: MobileTodoDynamicType
  tone: MobileTodoTone
  icon: 'check' | 'file' | 'book' | 'star' | 'building' | 'edit'
  relatedTodoId?: string
}

export type MobileTodoState = {
  todos: MobileTodoItem[]
  certificate: MobileTodoCertificate
  todoDynamics: MobileTodoDynamic[]
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
      actionUrl: '/pages/todo/certificate-detail/index',
      adminStoreRefs: ['archiveStore.processingRecords'],
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
      actionUrl: '/pages/activity/training-list/index',
      adminStoreRefs: ['trainingStore.records', 'archiveStore.processingRecords'],
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
      actionUrl: '/pages/activity/enterprise-supplement-needed/index',
      adminStoreRefs: ['practiceStore.records', 'archiveStore.processingRecords'],
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
      actionUrl: '/pages/activity/training-summary/index',
      adminStoreRefs: ['trainingStore.records', 'archiveStore.processingRecords'],
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
      actionUrl: '/pages/activity/reflection-draft/index',
      adminStoreRefs: ['reflectionStore.records'],
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
      actionUrl: '/pages/activity/enterprise-archive-edit/index',
      adminStoreRefs: ['practiceStore.records'],
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
      status: 'recognized',
      previewUrl: '/pages/archive/record-detail/index?recordId=certificate-digital-literacy&category=personal-development',
    },
    changes: [
      { label: '发证单位', from: '山东省教师发展中心', to: '全国职业院校教师培训中心' },
      { label: '获得时间', from: '2026.05', to: '2026.06.10' },
      { label: '证书编号', from: 'PX202605168', to: 'PX20260610027' },
      { label: '培训学时', from: '32 学时', to: '40 学时' },
    ],
    submissionRecords: [],
    removeReason: '',
    history: ['系统识别待确认'],
    adminStoreRefs: ['archiveStore.processingRecords'],
  },
  todoDynamics: [
    {
      id: 'dynamic-course-confirmed',
      title: '已确认一条精品课程建设成果',
      desc: '《智能制造课程建设成果》已完成本人确认',
      category: '教学改革',
      time: '今天 09:21',
      group: '今天',
      type: '记录确认',
      tone: 'green',
      icon: 'star',
    },
    {
      id: 'dynamic-training-hours',
      title: '培训学时已记录',
      desc: '《数字化教学能力提升》培训学时已更新',
      category: '培训与研修',
      time: '昨天 16:45',
      group: '昨天',
      type: '材料更新',
      tone: 'blue',
      icon: 'file',
      relatedTodoId: 'training-hours-confirm',
    },
    {
      id: 'dynamic-reflection-draft',
      title: '已保存一篇教学反思',
      desc: '《智能制造基础》第 5 次课后反思已保存草稿',
      category: '教学实践',
      time: '03-18 10:30',
      group: '更早',
      type: '草稿保存',
      tone: 'orange',
      icon: 'book',
      relatedTodoId: 'teaching-reflection-draft',
    },
  ],
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

export function getTodoActionUrl(todoId: string) {
  return getTodoById(todoId)?.actionUrl || ''
}

export function getRecentTodoDynamics(limit = 3) {
  return state.todoDynamics.slice(0, limit)
}

export function updateTodoCertificateField(label: string, value: string) {
  const field = state.certificate.editableInfo.find(item => item.label === label)
  if (field) field.value = value
  return field
}

export function previewTodoCertificateMaterial() {
  state.certificate.material.status = 'previewed'
  addTodoDynamic({
    id: 'dynamic-certificate-preview',
    title: '已查看培训证书材料',
    desc: `${state.certificate.material.name} 已打开预览`,
    category: '培训与研修',
    type: '材料更新',
    tone: 'blue',
    icon: 'file',
    relatedTodoId: certificateTodoId,
  })
  return state.certificate.material
}

export function replaceTodoCertificateMaterial() {
  state.certificate.material = {
    name: '培训证书-补充版.jpg',
    meta: 'JPG · 1.4MB · 2026-06-14',
    status: 'replaced',
    previewUrl: state.certificate.material.previewUrl,
  }
  addTodoDynamic({
    id: 'dynamic-certificate-material-replaced',
    title: '培训证书材料已更换',
    desc: '已上传培训证书补充版，提交后进入部门核验',
    category: '培训与研修',
    type: '材料更新',
    tone: 'orange',
    icon: 'file',
    relatedTodoId: certificateTodoId,
  })
  return state.certificate.material
}

export function confirmTodoCertificate(todoId = certificateTodoId) {
  const todo = getTodoById(todoId)
  if (!todo) return null

  todo.tag = '待核验'
  todo.state = '等待入档确认'
  todo.action = '查看进度'
  todo.tone = 'orange'
  todo.status = 'pending-verify'
  state.certificate.status = 'pending-verify'
  state.certificate.material.status = 'pending-verify'
  state.certificate.history = ['教师确认本人记录，等待管理端入档确认', ...state.certificate.history]
  addTodoDynamic({
    id: 'dynamic-certificate-confirmed',
    title: '已确认一条培训证书',
    desc: `${state.certificate.title} 已进入入档核验`,
    category: '培训与研修',
    type: '记录确认',
    tone: 'orange',
    icon: 'check',
    relatedTodoId: todoId,
  })
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
  state.certificate.material.status = 'pending-verify'
  state.certificate.submissionRecords.unshift({
    id: `submit-${todoId}`,
    title: '培训证书信息修改',
    status: 'pending-verify',
    submittedAt: '2026-06-14 09:21',
    adminStoreRefs: ['archiveStore.processingRecords'],
  })
  state.certificate.history = ['教师提交信息修改，等待部门核验', ...state.certificate.history]
  addTodoDynamic({
    id: 'dynamic-certificate-correction',
    title: '培训证书修改已提交',
    desc: '修改内容已提交部门核验',
    category: '培训与研修',
    type: '材料更新',
    tone: 'orange',
    icon: 'edit',
    relatedTodoId: todoId,
  })
  return state.certificate
}

export function removeTodoCertificate(todoId = certificateTodoId, reason = '系统识别记录与本人实际经历不一致') {
  const todo = getTodoById(todoId)
  if (!todo) return null

  todo.tag = '已移出'
  todo.state = '已移出'
  todo.action = '查看说明'
  todo.tone = 'orange'
  todo.status = 'removed'
  state.certificate.status = 'removed'
  state.certificate.removeReason = reason
  state.certificate.history = ['教师标记不是本人记录，移出待确认', ...state.certificate.history]
  addTodoDynamic({
    id: 'dynamic-certificate-removed',
    title: '一条待确认记录已移出',
    desc: reason,
    category: '培训与研修',
    type: '其他',
    tone: 'orange',
    icon: 'file',
    relatedTodoId: todoId,
  })
  return state.certificate
}

export function confirmTodoCertificateArchivedByAdmin(todoId = certificateTodoId) {
  const todo = getTodoById(todoId)
  if (!todo) return null

  todo.tag = '已入档'
  todo.state = '已入档'
  todo.action = '查看档案'
  todo.tone = 'green'
  todo.status = 'archived'
  state.certificate.status = 'archived'
  state.certificate.material.status = 'confirmed'
  state.certificate.history = ['管理端确认入档，正式写入个人发展档案', ...state.certificate.history]
  addTodoDynamic({
    id: 'dynamic-certificate-admin-archived',
    title: '培训证书已由管理端确认入档',
    desc: `${state.certificate.title} 已写入个人发展档案`,
    category: '培训与研修',
    type: '入档确认',
    tone: 'green',
    icon: 'check',
    relatedTodoId: todoId,
  })
  return state.certificate
}

function addTodoDynamic(dynamic: Omit<MobileTodoDynamic, 'time' | 'group'> & Partial<Pick<MobileTodoDynamic, 'time' | 'group'>>) {
  const existingIndex = state.todoDynamics.findIndex(item => item.id === dynamic.id)
  const nextDynamic: MobileTodoDynamic = {
    ...dynamic,
    time: dynamic.time || '刚刚',
    group: dynamic.group || '今天',
  }
  if (existingIndex >= 0) {
    state.todoDynamics.splice(existingIndex, 1, nextDynamic)
    return nextDynamic
  }
  state.todoDynamics.unshift(nextDynamic)
  return nextDynamic
}
