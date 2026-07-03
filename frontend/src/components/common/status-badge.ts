export type StatusScene = 'admin' | 'teacher' | 'mobile'
export type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple'

export type StatusBadgeMeta = {
  label: string
  tone: StatusTone
}

export const teacherStatusRegistry = {
  candidate: { label: '待你确认', tone: 'warning' },
  pendingConfirm: { label: '待你确认', tone: 'warning' },
  recognized: { label: '系统识别', tone: 'info' },
  archived: { label: '已入档', tone: 'success' },
  saved: { label: '已保存', tone: 'info' },
  improvable: { label: '可完善', tone: 'purple' },
  needSupplement: { label: '待补充', tone: 'warning' },
  removed: { label: '已移出', tone: 'neutral' },
  processing: { label: '处理中', tone: 'info' },
  completed: { label: '已完成', tone: 'success' },
  available: { label: '可查看', tone: 'success' },
  incomplete: { label: '待完善', tone: 'warning' },
  disabled: { label: '已停用', tone: 'danger' },
  待确认: { label: '待确认', tone: 'warning' },
  待检验: { label: '待检验', tone: 'info' },
  待补充: { label: '待补充', tone: 'warning' },
  异常待处理: { label: '异常待处理', tone: 'danger' },
  拟退中: { label: '拟退中', tone: 'danger' },
  已入档: { label: '已入档', tone: 'success' },
} as const satisfies Record<string, StatusBadgeMeta>

export const adminStatusRegistry = {
  clue: { label: '线索', tone: 'neutral' },
  candidate: { label: '候选数据', tone: 'warning' },
  pendingConfirm: { label: '待确认', tone: 'warning' },
  formal: { label: '正式', tone: 'success' },
  abnormal: { label: '异常', tone: 'danger' },
  correcting: { label: '纠错中', tone: 'warning' },
  corrected: { label: '已更正', tone: 'success' },
  reused: { label: '已复用', tone: 'neutral' },
  recognizing: { label: '识别中', tone: 'info' },
  recognized: { label: '识别完成', tone: 'info' },
  cancelled: { label: '已取消', tone: 'neutral' },
  draft: { label: '草稿', tone: 'neutral' },
  pending: { label: '待确认', tone: 'warning' },
  confirmed: { label: '已确认', tone: 'success' },
  unconfigured: { label: '未配置', tone: 'info' },
  adopted: { label: '已采纳', tone: 'success' },
  deferred: { label: '暂缓', tone: 'neutral' },
  rejected: { label: '已弃用', tone: 'danger' },
  applied: { label: '已应用', tone: 'info' },
  published: { label: '已发布', tone: 'success' },
  available: { label: '可用', tone: 'success' },
  incomplete: { label: '信息待完善', tone: 'warning' },
  disabled: { label: '已停用', tone: 'danger' },
  已接收: { label: '已接收', tone: 'success' },
  解析中: { label: '解析中', tone: 'warning' },
  已解析: { label: '已解析', tone: 'success' },
  等待处理: { label: '等待处理', tone: 'neutral' },
  已取消: { label: '已取消', tone: 'neutral' },
  可用: { label: '可用', tone: 'success' },
  信息待完善: { label: '信息待完善', tone: 'warning' },
  已停用: { label: '已停用', tone: 'danger' },
  停用: { label: '停用', tone: 'danger' },
  已匹配: { label: '已匹配', tone: 'success' },
  待匹配: { label: '待匹配', tone: 'warning' },
  暂不处理: { label: '暂不处理', tone: 'neutral' },
  草稿: { label: '草稿', tone: 'neutral' },
  报名中: { label: '报名中', tone: 'info' },
  进行中: { label: '进行中', tone: 'success' },
  已完成: { label: '已完成', tone: 'success' },
  材料待完善: { label: '材料待完善', tone: 'warning' },
  待处理: { label: '待处理', tone: 'warning' },
  已同意: { label: '已同意', tone: 'success' },
  未同意: { label: '未同意', tone: 'danger' },
  学习中: { label: '学习中', tone: 'info' },
  待总结: { label: '待总结', tone: 'warning' },
  证书待补: { label: '证书待补', tone: 'warning' },
  记录完整: { label: '记录完整', tone: 'success' },
  已上传: { label: '已上传', tone: 'success' },
  待开始: { label: '待开始', tone: 'info' },
  待审核: { label: '待审核', tone: 'warning' },
  退回修改: { label: '退回修改', tone: 'warning' },
  已撤回: { label: '已撤回', tone: 'neutral' },
  未启动申请: { label: '未启动申请', tone: 'neutral' },
  待审核申请: { label: '待审核申请', tone: 'warning' },
  实践中: { label: '实践中', tone: 'info' },
  待提交总结: { label: '待提交总结', tone: 'warning' },
  待企业评价: { label: '待企业评价', tone: 'warning' },
  待归档确认: { label: '待归档确认', tone: 'warning' },
  已归档: { label: '已归档', tone: 'success' },
  归档: { label: '归档', tone: 'success' },
  已形成记录: { label: '已形成记录', tone: 'success' },
  未形成记录: { label: '未形成记录', tone: 'warning' },
  记录异常: { label: '记录异常', tone: 'danger' },
  已同步: { label: '已同步', tone: 'success' },
  同步失败: { label: '同步失败', tone: 'danger' },
  重新同步中: { label: '重新同步中', tone: 'info' },
  待沉淀: { label: '待沉淀', tone: 'warning' },
  已生成待确认档案: { label: '已生成待确认档案', tone: 'success' },
  已生成: { label: '已生成', tone: 'success' },
  待更新: { label: '待更新', tone: 'warning' },
  数据不足: { label: '数据不足', tone: 'danger' },
  已准备: { label: '已准备', tone: 'success' },
  未导出: { label: '未导出', tone: 'neutral' },
  导出中: { label: '导出中', tone: 'info' },
  导出文件已生成: { label: '导出文件已生成', tone: 'success' },
  处理中: { label: '处理中', tone: 'info' },
  失败: { label: '失败', tone: 'danger' },
} as const satisfies Record<string, StatusBadgeMeta>

export const teacherStatusKeys = Object.keys(teacherStatusRegistry) as Array<keyof typeof teacherStatusRegistry>
export const adminStatusKeys = Object.keys(adminStatusRegistry) as Array<keyof typeof adminStatusRegistry>

export type TeacherStatus = keyof typeof teacherStatusRegistry
export type AdminStatus = keyof typeof adminStatusRegistry

export function getStatusBadgeMeta(
  status: string,
  scene: StatusScene = 'admin',
  tone?: StatusTone,
): StatusBadgeMeta {
  const registry: Readonly<Record<string, StatusBadgeMeta>> = scene === 'teacher' || scene === 'mobile'
    ? teacherStatusRegistry
    : adminStatusRegistry
  const fallback: StatusBadgeMeta = scene === 'teacher' || scene === 'mobile'
    ? { label: '待处理', tone: 'warning' }
    : { label: status, tone: 'neutral' }
  const meta = registry[status] ?? fallback
  return {
    label: meta.label,
    tone: tone ?? meta.tone,
  }
}
