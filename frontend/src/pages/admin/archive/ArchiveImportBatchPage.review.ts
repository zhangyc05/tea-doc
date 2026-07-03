export const archiveImportBatchPageReview = {
  route: '/admin/archive/import/:batchId',
  title: '成长档案 / 导入批次详情',
  goal: '查看导入批次识别进度和识别结果，确认后生成档案处理记录。',
  screenshot: '效果图/管理PC端/2成长档案/管理端PC｜成长档案｜导入批次详情｜识别中.png；效果图/管理PC端/2成长档案/管理端PC｜成长档案｜导入批次详情｜识别完成.png',
  sections: [
    '批次基础信息区',
    '识别步骤进度',
    '批次文件列表',
    '识别结果统计',
    '底部批次操作区',
  ],
  dataRules: [
    '批次数据由 ensureArchiveImportBatch(route.params.batchId) 保证存在。',
    '识别中、识别完成、已确认和已取消状态必须展示不同进度和结果。',
    '批次文件来自 batchInfo.files。',
    '确认识别结果必须生成档案处理记录。',
  ],
  interactions: [
    '刷新状态调用 completeArchiveBatchRecognition()。',
    '确认识别结果调用 confirmArchiveBatchRecognition() 并返回档案处理页。',
    '取消本次任务调用 cancelArchiveImportBatch() 并返回档案处理页。',
    '查看上传文件返回导入上传页。',
  ],
  formRules: [],
  checklist: [
    '识别中和识别完成两种效果图状态均有对应页面状态',
    '状态徽章、步骤进度和结果统计一致',
    '取消后不会生成档案处理记录',
    '确认后可在档案处理页继续处理记录',
    '所有批次操作都有真实状态流转',
  ],
}
