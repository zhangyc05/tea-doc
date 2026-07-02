<script setup lang="ts">
import { computed } from 'vue'

import { Badge } from '@/components/ui'

type StatusScene = 'admin' | 'teacher' | 'mobile'
type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple'

const props = withDefaults(
  defineProps<{
    status: string
    label?: string
    scene?: StatusScene
    tone?: StatusTone
  }>(),
  {
    scene: 'admin',
    tone: undefined,
  },
)

const teacherStatusTextMap: Record<string, string> = {
  candidate: '待你确认',
  pendingConfirm: '待你确认',
  recognized: '系统识别',
  archived: '已入档',
  saved: '已保存',
  improvable: '可完善',
  needSupplement: '待补充',
  removed: '已移出',
  processing: '处理中',
  completed: '已完成',
  available: '可查看',
  incomplete: '待完善',
  disabled: '已停用',
  待确认: '待确认',
  待检验: '待检验',
  待补充: '待补充',
  异常待处理: '异常待处理',
  拟退中: '拟退中',
  已入档: '已入档',
}

const adminStatusTextMap: Record<string, string> = {
  clue: '线索',
  candidate: '候选数据',
  pendingConfirm: '待确认',
  formal: '正式',
  abnormal: '异常',
  correcting: '纠错中',
  corrected: '已更正',
  reused: '已复用',
  recognizing: '识别中',
  recognized: '识别完成',
  cancelled: '已取消',
  draft: '草稿',
  pending: '待确认',
  confirmed: '已确认',
  unconfigured: '未配置',
  adopted: '已采纳',
  deferred: '暂缓',
  rejected: '已弃用',
  applied: '已应用',
  published: '已发布',
  available: '可用',
  incomplete: '信息待完善',
  disabled: '已停用',
  已接收: '已接收',
  解析中: '解析中',
  已解析: '已解析',
  等待处理: '等待处理',
  已取消: '已取消',
  可用: '可用',
  信息待完善: '信息待完善',
  已停用: '已停用',
  已匹配: '已匹配',
  待匹配: '待匹配',
  暂不处理: '暂不处理',
  草稿: '草稿',
  报名中: '报名中',
  进行中: '进行中',
  已完成: '已完成',
  材料待完善: '材料待完善',
  待处理: '待处理',
  已同意: '已同意',
  未同意: '未同意',
  学习中: '学习中',
  待总结: '待总结',
  证书待补: '证书待补',
  记录完整: '记录完整',
  已上传: '已上传',
  待开始: '待开始',
  待审核: '待审核',
  退回修改: '退回修改',
  已撤回: '已撤回',
  未启动申请: '未启动申请',
  待审核申请: '待审核申请',
  实践中: '实践中',
  待提交总结: '待提交总结',
  待企业评价: '待企业评价',
  待归档确认: '待归档确认',
  已归档: '已归档',
  已形成记录: '已形成记录',
  未形成记录: '未形成记录',
  记录异常: '记录异常',
  已同步: '已同步',
  已生成: '已生成',
  待更新: '待更新',
  数据不足: '数据不足',
  已准备: '已准备',
}

const statusToneMap: Record<string, StatusTone> = {
  archived: 'success',
  completed: 'success',
  corrected: 'success',
  formal: 'success',
  published: 'success',
  available: 'success',
  confirmed: 'success',
  adopted: 'success',
  已接收: 'success',
  已解析: 'success',
  已入档: 'success',
  可用: 'success',
  已匹配: 'success',
  已同意: 'success',
  进行中: 'success',
  已完成: 'success',
  记录完整: 'success',
  已上传: 'success',
  已归档: 'success',
  已形成记录: 'success',
  已同步: 'success',
  已生成: 'success',
  已准备: 'success',
  saved: 'info',
  recognized: 'info',
  recognizing: 'info',
  applied: 'info',
  unconfigured: 'info',
  待检验: 'info',
  processing: 'info',
  报名中: 'info',
  学习中: 'info',
  待开始: 'info',
  实践中: 'info',
  pending: 'warning',
  待确认: 'warning',
  待补充: 'warning',
  待匹配: 'warning',
  待处理: 'warning',
  待审核: 'warning',
  待审核申请: 'warning',
  退回修改: 'warning',
  待提交总结: 'warning',
  待企业评价: 'warning',
  待归档确认: 'warning',
  未形成记录: 'warning',
  待更新: 'warning',
  candidate: 'warning',
  pendingConfirm: 'warning',
  needSupplement: 'warning',
  incomplete: 'warning',
  解析中: 'warning',
  信息待完善: 'warning',
  材料待完善: 'warning',
  待总结: 'warning',
  证书待补: 'warning',
  improvable: 'purple',
  abnormal: 'danger',
  rejected: 'danger',
  异常待处理: 'danger',
  拟退中: 'danger',
  disabled: 'danger',
  已停用: 'danger',
  未同意: 'danger',
  记录异常: 'danger',
  数据不足: 'danger',
  correcting: 'warning',
  deferred: 'neutral',
  removed: 'neutral',
  reused: 'neutral',
  clue: 'neutral',
  draft: 'neutral',
  cancelled: 'neutral',
  等待处理: 'neutral',
  已取消: 'neutral',
  暂不处理: 'neutral',
  草稿: 'neutral',
  已撤回: 'neutral',
  未启动申请: 'neutral',
}

const isTeacherScene = computed(() => props.scene === 'teacher' || props.scene === 'mobile')

const label = computed(() => {
  if (props.label) return props.label
  const map = isTeacherScene.value ? teacherStatusTextMap : adminStatusTextMap
  if (map[props.status]) return map[props.status]
  return isTeacherScene.value ? '待处理' : props.status
})

const displayTone = computed<StatusTone>(() => props.tone ?? statusToneMap[props.status] ?? 'neutral')
</script>

<template>
  <Badge :variant="displayTone">
    {{ label }}
  </Badge>
</template>
