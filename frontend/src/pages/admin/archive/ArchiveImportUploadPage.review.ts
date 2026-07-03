export const archiveImportUploadPageReview = {
  route: '/admin/archive/import',
  title: '成长档案 / 导入部门资料',
  goal: '上传部门掌握的教师资料，创建导入批次并进入系统识别流程。',
  screenshot: '效果图/管理PC端/2成长档案/管理端PC｜成长档案｜导入部门资料｜上传资料页.png',
  sections: [
    '页面说明区',
    '导入步骤条',
    '上传面板',
    '已上传文件列表',
    '底部取消和开始识别动作',
  ],
  dataRules: [
    '上传文件列表来自 archiveStore.uploadedFiles。',
    '文件类型图标按 ArchiveUploadedFile.type 映射。',
    '开始识别必须先通过 createArchiveImportBatch() 创建批次。',
    '没有上传文件时开始识别按钮禁用。',
  ],
  interactions: [
    '拖拽文件或选择文件都会追加到 uploadedFiles。',
    '删除文件会从 uploadedFiles 移除。',
    '取消返回上一页。',
    '开始识别进入 /admin/archive/import/:batchId。',
  ],
  formRules: [
    { field: '上传文件', required: true, message: '至少上传 1 个文件后才能开始识别' },
  ],
  checklist: [
    '上传区、步骤条和文件列表与效果图基本一致',
    '支持拖拽和文件选择两种上传入口',
    '删除文件后统计和按钮禁用态同步变化',
    '开始识别会创建批次并跳转到批次详情',
    '不会直接生成教师正式档案',
  ],
}
