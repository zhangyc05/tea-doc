import type {
  ArchiveProcessingRecord,
  ArchiveRecognitionResult,
  ArchiveState,
  ArchiveUploadedFile,
} from '@/domain/admin/archive'

export const emptyRecognitionResult: ArchiveRecognitionResult = {
  totalRecords: 0,
  pendingConfirm: 0,
  needSupplement: 0,
  needVerify: 0,
  exception: 0,
  duplicate: 0,
}

export const completedRecognitionResult: ArchiveRecognitionResult = {
  totalRecords: 36,
  pendingConfirm: 18,
  needSupplement: 7,
  needVerify: 6,
  exception: 3,
  duplicate: 2,
}

export const initialUploadedFiles: ArchiveUploadedFile[] = [
  { id: '1', name: '2026年度课程建设项目名单件名单.xlsx', size: '1.8MB', status: '已上传', type: 'excel' },
  { id: '2', name: '精品课程建设立项材料.zip', size: '24.6MB', status: '已上传', type: 'zip' },
  { id: '3', name: '教学成果申报通知.pdf', size: '3.2MB', status: '已上传', type: 'pdf' },
  { id: '4', name: '教师培训证书扫描件.zip', size: '18.4MB', status: '已上传', type: 'zip' },
]

export const initialProcessingRecords: ArchiveProcessingRecord[] = [
  {
    id: '1',
    batchId: 'manual-20260618',
    name: '教学能力大赛获奖证书',
    teacher: '蒋老师',
    dimension: '成果荣誉',
    source: '教务处发起',
    status: '待确认',
    updateTime: '06-18 14:29',
    uploader: '陈老师',
    uploadBatch: '2026 年度课程建设项目 6 批',
    originalFile: '教学能力大赛获奖证书.pdf',
    issues: [],
    processingHistory: ['2026-06-18 14:29 系统识别并生成待处理记录'],
  },
  {
    id: '2',
    batchId: 'manual-20260618',
    name: '精品课程建设立项材料',
    teacher: '林老师',
    dimension: '教师培训',
    source: '部门上报',
    status: '待补充',
    updateTime: '06-18 15:40',
    uploader: '陈老师',
    uploadBatch: '2026 年度课程建设项目 6 批',
    originalFile: '2026 年度课程建设项目 6 批名单.xlsx',
    issues: ['缺少立项文件编号', '缺少课程负责人任命文件', '缺少课程负责人承诺书'],
    processingHistory: [
      '2026-06-18 15:10 教务处上传材料',
      '2026-06-18 15:25 系统识别并生成待处理记录',
      '2026-06-19 09:30 待审核人员确认',
    ],
  },
  {
    id: '3',
    batchId: 'manual-20260618',
    name: '公开课获校级优秀奖',
    teacher: '王老师',
    dimension: '教师培训',
    source: '公开征集',
    status: '待检验',
    updateTime: '06-18 16:10',
    uploader: '陈老师',
    uploadBatch: '2026 年度课程建设项目 6 批',
    originalFile: '公开课获奖材料.pdf',
    issues: [],
    processingHistory: ['2026-06-18 16:10 系统识别并生成待处理记录'],
  },
  {
    id: '4',
    batchId: 'manual-20260618',
    name: '企业实践记录材料——赵',
    teacher: '赵老师',
    dimension: '企业实践',
    source: '部门上报',
    status: '异常待处理',
    updateTime: '06-18 16:49',
    uploader: '陈老师',
    uploadBatch: '2026 年度课程建设项目 6 批',
    originalFile: '企业实践记录材料.zip',
    issues: ['教师姓名与证书扫描件不一致'],
    processingHistory: ['2026-06-18 16:49 系统识别并生成异常记录'],
  },
  {
    id: '5',
    batchId: 'manual-20260618',
    name: '课题结题成果鉴定申请',
    teacher: '孙老师',
    dimension: '科研申报',
    source: '科研申报',
    status: '拟退中',
    updateTime: '06-18 17:35',
    uploader: '陈老师',
    uploadBatch: '2026 年度课程建设项目 6 批',
    originalFile: '课题结题成果鉴定申请.docx',
    issues: ['缺少结题编号'],
    processingHistory: ['2026-06-18 17:35 系统识别并生成待处理记录'],
  },
  {
    id: '6',
    batchId: 'manual-20260618',
    name: '教育案例教学评比记录',
    teacher: '刘老师',
    dimension: '教学工作',
    source: '科研申报',
    status: '待确认',
    updateTime: '06-18 17:25',
    uploader: '陈老师',
    uploadBatch: '2026 年度课程建设项目 6 批',
    originalFile: '教育案例教学评比记录.pdf',
    issues: [],
    processingHistory: ['2026-06-18 17:25 系统识别并生成待处理记录'],
  },
]

export function createInitialArchiveState(): ArchiveState {
  return {
    uploadedFiles: cloneUploadedFiles(initialUploadedFiles),
    importBatches: [],
    processingRecords: cloneProcessingRecords(initialProcessingRecords),
    teacherArchiveFacts: [],
    operationMessage: '',
  }
}

export function cloneUploadedFiles(files: ArchiveUploadedFile[]) {
  return files.map(file => ({ ...file }))
}

export function cloneProcessingRecords(records: ArchiveProcessingRecord[]) {
  return records.map(record => ({
    ...record,
    issues: [...record.issues],
    processingHistory: [...record.processingHistory],
  }))
}
