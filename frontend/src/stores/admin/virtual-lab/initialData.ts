import type {
  VirtualLabActivity,
  VirtualLabMaterial,
  VirtualLabMember,
  VirtualLabRecord,
  VirtualLabRoom,
  VirtualLabState,
} from '@/domain/admin/virtual-lab'

export const initialRooms: VirtualLabRoom[] = [
  makeRoom('smart-manufacturing', '智能制造课程改革虚拟教研室', '智能制造专业课程改革', '智能制造学院 | 智能制造专业群', '周明', 28, 2, 6, '智能产线课程项目化改造研讨', '06-18', '2025-09', '围绕智能制造专业核心课程项目化改造、课程资源共建和课堂实施改进开展线上教研。'),
  makeRoom('robot-teaching', '工业机器人教学资源共建教研室', '机器人技术课程资源共建', '智能制造学院 | 工业机器人技术专业', '李倩', 16, 1, 4, '工业机器人实训资源复盘', '06-12', '2025-10', '围绕工业机器人技术课程资源、实训任务和评价方式开展共建。'),
  makeRoom('digital-teaching', '数字化教学方法研究教研室', 'AI辅助教学与课堂评价', '教务处 | 跨院系', '王磊', 35, 0, 9, '课堂数据应用专题研讨', '06-05', '2025-08', '面向跨院系教师开展数字化教学方法、课堂数据应用和评价改进研究。'),
  makeRoom('new-energy-vehicles', '新能源汽车课程群教研室', '新能源汽车课程群建设', '交通工程学院 | 新能源汽车专业群', '陈芳', 21, 1, 5, '课程标准修订交流', '05-22', '2025-11', '围绕新能源汽车专业群课程标准、资源建设和实践教学改进开展教研。'),
  makeRoom('modern-service', '现代服务业课程设计教研室', '服务类课程设计与评价', '现代服务学院 | 电子商务专业群', '赵婷', 18, 1, 3, '课程任务书优化讨论', '05-17', '2025-09', '面向现代服务业课程开展任务设计、过程评价和案例共建。'),
  makeRoom('preschool-edu', '学前教育实践教学教研室', '实践教学与保教融合', '教育学院 | 学前教育专业群', '刘欣', 24, 2, 7, '保教融合案例共研', '06-09', '2025-09', '围绕实践教学、保教融合案例和实训评价开展线上教研。'),
]

export const initialMembers: VirtualLabMember[] = [
  { id: '1', roomId: 'smart-manufacturing', name: '周明', college: '智能制造学院', role: '负责人', activitiesParticipated: 6, recordsFormed: 6, recentParticipation: '06-18' },
  { id: '2', roomId: 'smart-manufacturing', name: '林老师', college: '智能制造学院', role: '成员', activitiesParticipated: 4, recordsFormed: 3, recentParticipation: '06-18' },
  { id: '3', roomId: 'smart-manufacturing', name: '王老师', college: '智能制造学院', role: '成员', activitiesParticipated: 3, recordsFormed: 2, recentParticipation: '06-12' },
  { id: '4', roomId: 'smart-manufacturing', name: '陈老师', college: '智能制造学院', role: '成员', activitiesParticipated: 2, recordsFormed: 1, recentParticipation: '06-05' },
]

export const initialActivities: VirtualLabActivity[] = [
  {
    id: 'smart-line-seminar',
    roomId: 'smart-manufacturing',
    name: '智能产线课程项目化改造研讨',
    theme: '智能产线课程项目化改造',
    time: '2026-06-18 14:00 ~ 16:00',
    meetingMethod: '腾讯会议',
    meetingNo: '827 391 602',
    initiator: '周明',
    participantsCount: 18,
    createdAt: '2026-06-12 10:30',
    description: '围绕产线课程的教学内容重构、项目任务设计和实施路径优化开展研讨。',
    participation: '18 人',
    recordStatus: '已形成记录',
    recentUpdate: '06-18 16:20',
  },
  {
    id: 'task-discussion',
    roomId: 'smart-manufacturing',
    name: '课程任务书优化讨论',
    theme: '课程任务书优化',
    time: '2026-06-25 15:00',
    meetingMethod: '腾讯会议',
    meetingNo: '待生成',
    initiator: '周明',
    participantsCount: 12,
    createdAt: '2026-06-20 创建',
    description: '围绕课程任务书结构和课堂实施安排开展线上讨论。',
    participation: '12 人',
    recordStatus: '未形成记录',
    recentUpdate: '06-20 创建',
  },
  {
    id: 'resource-review',
    roomId: 'smart-manufacturing',
    name: '课程资源共建阶段复盘',
    theme: '课程资源共建复盘',
    time: '2026-06-10 10:00',
    meetingMethod: '腾讯会议',
    meetingNo: '693 102 446',
    initiator: '周明',
    participantsCount: 16,
    createdAt: '2026-06-05 09:20',
    description: '复盘课程资源共建进度和材料同步异常。',
    participation: '16 人',
    recordStatus: '记录异常',
    recentUpdate: '参会记录未同步',
  },
]

export const initialMaterials: VirtualLabMaterial[] = [
  { id: '1', activityId: 'smart-line-seminar', name: '会议纪要', syncStatus: '已同步', syncMessage: '资料已同步', source: '系统生成', type: '会议纪要', time: '2026-06-18 16:20', description: '系统基于会议生成的纪要', tone: 'blue' },
  { id: '2', activityId: 'smart-line-seminar', name: '任务分工表', syncStatus: '已同步', syncMessage: '资料已同步', source: '活动负责人补充', type: '任务分工', time: '2026-06-18 16:30', description: '活动负责人补充任务分工内容', tone: 'green' },
  { id: '3', activityId: 'smart-line-seminar', name: '课程项目化改造方案初稿', syncStatus: '已同步', syncMessage: '资料已同步', source: '林老师上传', type: '阶段成果', time: '2026-06-18 17:10', description: '课程改造方案初稿材料', tone: 'orange' },
  { id: '4', activityId: 'smart-line-seminar', name: '产线课程现状分析材料', syncStatus: '已同步', syncMessage: '资料已同步', source: '张老师上传', type: '过程材料', time: '2026-06-18 17:35', description: '课程现状分析材料', tone: 'red' },
  { id: '5', activityId: 'smart-line-seminar', name: '课堂实施流程文档', syncStatus: '已同步', syncMessage: '资料已同步', source: '李老师上传', type: '过程材料', time: '2026-06-18 17:25', description: '课堂实施流程与安排说明', tone: 'blue' },
]

export const initialRecords: VirtualLabRecord[] = [
  makeRecord('smart-line-record', 'smart-manufacturing', 'smart-line-seminar', '智能产线课程项目化改造研讨记录', '智能产线课程项目化改造研讨', '2026-06-18 16:20', '会议纪要、任务分工、阶段成果摘要、个人参与记录等', '周明'),
  makeRecord('standard-revision-record', 'new-energy-vehicles', 'standard-revision', '课程标准修订交流记录', '课程标准修订交流', '2026-05-22', '会议纪要、修订建议摘要', '陈芳'),
]

export function createInitialVirtualLabState(): VirtualLabState {
  return {
    rooms: cloneRooms(initialRooms),
    members: cloneMembers(initialMembers),
    activities: cloneActivities(initialActivities),
    materials: cloneMaterials(initialMaterials),
    records: cloneRecords(initialRecords),
    operationMessage: '',
  }
}

export function makeRoom(id: string, name: string, direction: string, affiliation: string, leader: string, members: number, inProgressActivities: number, recordsCount: number, recentActivity: string, recentTime: string, createdAt: string, description: string): VirtualLabRoom {
  return { id, name, status: '运行中', direction, affiliation, leader, members, inProgressActivities, recordsCount, recentActivity, recentTime, createdAt, description }
}

export function makeRecord(id: string, roomId: string, sourceActivityId: string, title: string, sourceActivity: string, formedTime: string, content: string, ownerTeacher: string, activity?: VirtualLabActivity): VirtualLabRecord {
  const room = initialRooms.find(item => item.id === roomId)
  return {
    id,
    roomId,
    sourceActivityId,
    title,
    sourceActivity,
    roomName: room?.name ?? '智能制造课程改革虚拟教研室',
    activityTime: activity?.time ?? '2026-06-18 14:00 ~ 16:00',
    meetingMethod: activity?.meetingMethod ?? '腾讯会议',
    formedTime,
    recordSource: '系统根据活动与会议数据生成',
    currentStatus: '已形成教研记录',
    keyDimension: '成长档案 / 教研科研',
    content,
    dimension: '成长档案 / 教研科研',
    ownerTeacher,
    archiveStatus: '待沉淀',
  }
}

export function cloneRooms(rooms: VirtualLabRoom[]) {
  return rooms.map(item => ({ ...item }))
}

export function cloneMembers(members: VirtualLabMember[]) {
  return members.map(item => ({ ...item }))
}

export function cloneActivities(activities: VirtualLabActivity[]) {
  return activities.map(item => ({ ...item }))
}

export function cloneMaterials(materials: VirtualLabMaterial[]) {
  return materials.map(item => ({ ...item }))
}

export function cloneRecords(records: VirtualLabRecord[]) {
  return records.map(item => ({ ...item }))
}
