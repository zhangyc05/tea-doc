import type { RouteRecordRaw } from 'vue-router'

const AdminPlaceholderPage = () => import('@/pages/admin/AdminPlaceholderPage.vue')
const ReportCenterPage = () => import('@/pages/admin/reports/ReportCenterPage.vue')
const ResourceLibraryPage = () => import('@/pages/admin/training/ResourceLibraryPage.vue')
const AbilityListBasePage = () => import('@/pages/admin/ability-list/AbilityListBasePage.vue')
const AbilityListBaseOptimizationPage = () => import('@/pages/admin/ability-list/AbilityListBaseOptimizationPage.vue')
const AbilityListExecutionPage = () => import('@/pages/admin/ability-list/AbilityListExecutionPage.vue')
const AbilityListPublishConfirmPage = () => import('@/pages/admin/ability-list/AbilityListPublishConfirmPage.vue')
const AbilityListRequirementMappingPage = () => import('@/pages/admin/ability-list/AbilityListRequirementMappingPage.vue')
const ArchiveProcessingPage = () => import('@/pages/admin/archive/ArchiveProcessingPage.vue')
const ArchiveImportUploadPage = () => import('@/pages/admin/archive/ArchiveImportUploadPage.vue')
const ArchiveImportBatchPage = () => import('@/pages/admin/archive/ArchiveImportBatchPage.vue')
const ArchiveQueryPage = () => import('@/pages/admin/archive/ArchiveQueryPage.vue')
const ArchiveTeacherDetailPage = () => import('@/pages/admin/archive/ArchiveTeacherDetailPage.vue')
const AbilityProfileGroupPage = () => import('@/pages/admin/ability-profile/AbilityProfileGroupPage.vue')
const AbilityProfileTeacherPage = () => import('@/pages/admin/ability-profile/AbilityProfileTeacherPage.vue')
const AbilityProfileTeacherDetailPage = () => import('@/pages/admin/ability-profile/AbilityProfileTeacherDetailPage.vue')
const ReflectionOverviewPage = () => import('@/pages/admin/reflection/ReflectionOverviewPage.vue')
const ReflectionDetailPage = () => import('@/pages/admin/reflection/ReflectionDetailPage.vue')
const TrainingPlanPage = () => import('@/pages/admin/training/TrainingPlanPage.vue')
const TrainingPlanDetailPage = () => import('@/pages/admin/training/TrainingPlanDetailPage.vue')
const TrainingResourcePage = () => import('@/pages/admin/training/TrainingResourcePage.vue')
const TrainingDemandPage = () => import('@/pages/admin/training/TrainingDemandPage.vue')
const TrainingApplicationPage = () => import('@/pages/admin/training/TrainingApplicationPage.vue')
const TrainingRecordPage = () => import('@/pages/admin/training/TrainingRecordPage.vue')
const TrainingRecordDetailPage = () => import('@/pages/admin/training/TrainingRecordDetailPage.vue')
const PracticeTrackingPage = () => import('@/pages/admin/practice/PracticeTrackingPage.vue')
const PracticeApplicationPage = () => import('@/pages/admin/practice/PracticeApplicationPage.vue')
const PracticeRecordPage = () => import('@/pages/admin/practice/PracticeRecordPage.vue')
const VirtualLabRoomPage = () => import('@/pages/admin/virtual-lab/VirtualLabRoomPage.vue')
const VirtualLabRoomDetailPage = () => import('@/pages/admin/virtual-lab/VirtualLabRoomDetailPage.vue')
const VirtualLabActivityDetailPage = () => import('@/pages/admin/virtual-lab/VirtualLabActivityDetailPage.vue')
const VirtualLabRecordDetailPage = () => import('@/pages/admin/virtual-lab/VirtualLabRecordDetailPage.vue')

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    redirect: '/admin/training/resources',
  },
  {
    path: '/admin/training/plans',
    name: 'AdminTrainingPlans',
    component: TrainingPlanPage,
    meta: {
      title: '计划管理',
      module: '培训管理',
      layout: 'admin',
      menuKey: 'training-plans',
      breadcrumb: ['管理端', '培训管理', '计划管理'],
    },
  },
  {
    path: '/admin/training/plans/:planId',
    name: 'AdminTrainingPlanDetail',
    component: TrainingPlanDetailPage,
    meta: {
      title: '计划详情',
      module: '培训管理',
      layout: 'admin',
      menuKey: 'training-plans',
      breadcrumb: ['管理端', '培训管理', '计划管理', '计划详情'],
    },
  },
  {
    path: '/admin/training/records',
    name: 'AdminTrainingRecords',
    component: TrainingRecordPage,
    meta: {
      title: '记录总览',
      module: '培训管理',
      layout: 'admin',
      menuKey: 'training-records',
      breadcrumb: ['管理端', '培训管理', '记录总览'],
    },
  },
  {
    path: '/admin/training/resources',
    name: 'AdminTrainingResources',
    component: TrainingResourcePage,
    meta: {
      title: '资源库',
      module: '培训管理',
      layout: 'admin',
      menuKey: 'training-resources',
      breadcrumb: ['管理端', '培训管理', '资源库'],
    },
  },
  {
    path: '/admin/training/demands',
    name: 'AdminTrainingDemands',
    component: TrainingDemandPage,
    meta: {
      title: '需求管理',
      module: '培训管理',
      layout: 'admin',
      menuKey: 'training-demands',
      breadcrumb: ['管理端', '培训管理', '需求管理'],
    },
  },
  {
    path: '/admin/training/applications',
    name: 'AdminTrainingApplications',
    component: TrainingApplicationPage,
    meta: {
      title: '申请处理',
      module: '培训管理',
      layout: 'admin',
      menuKey: 'training-applications',
      breadcrumb: ['管理端', '培训管理', '申请处理'],
    },
  },
  {
    path: '/admin/training/records/:recordId',
    name: 'AdminTrainingRecordDetail',
    component: TrainingRecordDetailPage,
    meta: {
      title: '记录详情',
      module: '培训管理',
      layout: 'admin',
      menuKey: 'training-records',
      breadcrumb: ['管理端', '培训管理', '记录总览', '记录详情'],
    },
  },
  {
    path: '/admin/reports',
    name: 'AdminReports',
    component: ReportCenterPage,
    meta: {
      title: '分析报告',
      module: '分析报告',
      layout: 'admin',
      menuKey: 'reports',
      breadcrumb: ['管理端', '分析报告'],
    },
  },
  {
    path: '/admin/archive/processing',
    name: 'AdminArchiveProcessing',
    component: ArchiveProcessingPage,
    meta: {
      title: '档案处理',
      module: '成长档案',
      layout: 'admin',
      menuKey: 'archive-processing',
      breadcrumb: ['管理端', '成长档案', '档案处理'],
    },
  },
  {
    path: '/admin/archive/query',
    name: 'AdminArchiveQuery',
    component: ArchiveQueryPage,
    meta: {
      title: '档案查阅',
      module: '成长档案',
      layout: 'admin',
      menuKey: 'archive-query',
      breadcrumb: ['管理端', '成长档案', '档案查阅'],
    },
  },
  {
    path: '/admin/archive/teacher/:teacherId',
    name: 'AdminArchiveTeacherDetail',
    component: ArchiveTeacherDetailPage,
    meta: {
      title: '教师成长档案',
      module: '成长档案',
      layout: 'admin',
      menuKey: 'archive-query',
      breadcrumb: ['管理端', '成长档案', '教师成长档案'],
    },
  },
  {
    path: '/admin/archive/import',
    name: 'AdminArchiveImport',
    component: ArchiveImportUploadPage,
    meta: {
      title: '导入部门资料',
      module: '成长档案',
      layout: 'admin',
      menuKey: 'archive-processing',
      breadcrumb: ['管理端', '成长档案', '导入部门资料'],
    },
  },
  {
    path: '/admin/archive/import/:batchId',
    name: 'AdminArchiveImportBatch',
    component: ArchiveImportBatchPage,
    meta: {
      title: '导入批次详情',
      module: '成长档案',
      layout: 'admin',
      menuKey: 'archive-processing',
      breadcrumb: ['管理端', '成长档案', '导入批次详情'],
    },
  },
  {
    path: '/admin/reflection',
    name: 'AdminReflection',
    component: ReflectionOverviewPage,
    meta: {
      title: '教学反思',
      module: '教学反思',
      layout: 'admin',
      menuKey: 'reflection',
      breadcrumb: ['管理端', '发展活动', '教学反思'],
    },
  },
  {
    path: '/admin/reflection/:reflectionId',
    name: 'AdminReflectionDetail',
    component: ReflectionDetailPage,
    meta: {
      title: '反思详情',
      module: '教学反思',
      layout: 'admin',
      menuKey: 'reflection',
      breadcrumb: ['管理端', '发展活动', '教学反思', '反思详情'],
    },
  },
  {
    path: '/admin/practice/tracking',
    name: 'AdminPracticeTracking',
    component: PracticeTrackingPage,
    meta: {
      title: '年度实践跟踪',
      module: '企业实践',
      layout: 'admin',
      menuKey: 'practice-tracking',
      breadcrumb: ['管理端', '企业实践', '年度实践跟踪'],
    },
  },
  {
    path: '/admin/practice/applications',
    name: 'AdminPracticeApplications',
    component: PracticeApplicationPage,
    meta: {
      title: '申请处理',
      module: '企业实践',
      layout: 'admin',
      menuKey: 'practice-applications',
      breadcrumb: ['管理端', '企业实践', '申请处理'],
    },
  },
  {
    path: '/admin/practice/records',
    name: 'AdminPracticeRecords',
    component: PracticeRecordPage,
    meta: {
      title: '记录总览',
      module: '企业实践',
      layout: 'admin',
      menuKey: 'practice-records',
      breadcrumb: ['管理端', '企业实践', '记录总览'],
    },
  },
  {
    path: '/admin/virtual-lab',
    name: 'AdminVirtualLab',
    component: VirtualLabRoomPage,
    meta: {
      title: '虚拟教研室',
      module: '虚拟教研室',
      layout: 'admin',
      menuKey: 'virtual-lab',
      breadcrumb: ['管理端', '虚拟教研室'],
    },
  },
  {
    path: '/admin/virtual-lab/rooms/:roomId',
    name: 'AdminVirtualLabRoomDetail',
    component: VirtualLabRoomDetailPage,
    meta: {
      title: '教研室详情',
      module: '虚拟教研室',
      layout: 'admin',
      menuKey: 'virtual-lab',
      breadcrumb: ['管理端', '虚拟教研室', '教研室详情'],
    },
  },
  {
    path: '/admin/virtual-lab/activities/:activityId',
    name: 'AdminVirtualLabActivityDetail',
    component: VirtualLabActivityDetailPage,
    meta: {
      title: '教研活动详情',
      module: '虚拟教研室',
      layout: 'admin',
      menuKey: 'virtual-lab',
      breadcrumb: ['管理端', '虚拟教研室', '教研活动详情'],
    },
  },
  {
    path: '/admin/virtual-lab/records/:recordId',
    name: 'AdminVirtualLabRecordDetail',
    component: VirtualLabRecordDetailPage,
    meta: {
      title: '教研记录详情',
      module: '虚拟教研室',
      layout: 'admin',
      menuKey: 'virtual-lab',
      breadcrumb: ['管理端', '虚拟教研室', '教研记录详情'],
    },
  },
  {
    path: '/admin/system',
    name: 'AdminSystem',
    component: AdminPlaceholderPage,
    meta: {
      title: '系统管理',
      module: '系统管理',
      layout: 'admin',
      menuKey: 'system',
      breadcrumb: ['管理端', '系统管理'],
    },
  },
  {
    path: '/admin/archive/import',
    name: 'AdminArchiveRecords',
    component: AdminPlaceholderPage,
    meta: {
      title: '教师档案总览',
      module: '成长档案',
      layout: 'admin',
      menuKey: 'archive',
      breadcrumb: ['管理端', '成长档案', '教师档案总览'],
    },
  },
  {
    path: '/admin/ability-profile/group',
    name: 'AdminAbilityProfileGroup',
    component: AbilityProfileGroupPage,
    meta: {
      title: '群体画像',
      module: '能力画像',
      layout: 'admin',
      menuKey: 'ability-profile-group',
      breadcrumb: ['管理端', '能力画像', '群体画像'],
    },
  },
  {
    path: '/admin/ability-profile/teacher',
    name: 'AdminAbilityProfileTeacher',
    component: AbilityProfileTeacherPage,
    meta: {
      title: '教师画像',
      module: '能力画像',
      layout: 'admin',
      menuKey: 'ability-profile-teacher',
      breadcrumb: ['管理端', '能力画像', '教师画像'],
    },
  },
  {
    path: '/admin/ability-profile/teacher/:teacherId',
    name: 'AdminAbilityProfileTeacherDetail',
    component: AbilityProfileTeacherDetailPage,
    meta: {
      title: '教师个人画像',
      module: '能力画像',
      layout: 'admin',
      menuKey: 'ability-profile-teacher',
      breadcrumb: ['管理端', '能力画像', '教师画像', '教师个人画像'],
    },
  },
  {
    path: '/admin/ability-list/base',
    name: 'AdminAbilityListBase',
    component: AbilityListBasePage,
    meta: {
      title: '基准模板',
      module: '能力清单',
      layout: 'admin',
      menuKey: 'ability-list-base',
      breadcrumb: ['管理端', '能力清单', '基准模板'],
    },
  },
  {
    path: '/admin/ability-list/execution',
    name: 'AdminAbilityListExecution',
    component: AbilityListExecutionPage,
    meta: {
      title: '执行版',
      module: '能力清单',
      layout: 'admin',
      menuKey: 'ability-list-execution',
      breadcrumb: ['管理端', '能力清单', '执行版'],
    },
  },
  {
    path: '/admin/ability-list/base/optimization',
    name: 'AdminAbilityListBaseOptimization',
    component: AbilityListBaseOptimizationPage,
    meta: {
      title: '优化基准模板',
      module: '能力清单',
      layout: 'admin',
      menuKey: 'ability-list-base',
      breadcrumb: ['管理端', '能力清单', '基准模板', '优化基准模板'],
    },
  },
  {
    path: '/admin/ability-list/execution/publish-confirm',
    name: 'AdminAbilityListPublishConfirm',
    component: AbilityListPublishConfirmPage,
    meta: {
      title: '发布确认',
      module: '能力清单',
      layout: 'admin',
      menuKey: 'ability-list-execution',
      breadcrumb: ['管理端', '能力清单', '执行版', '发布确认'],
    },
  },
  {
    path: '/admin/ability-list/execution/requirement-mapping',
    name: 'AdminAbilityListRequirementMapping',
    component: AbilityListRequirementMappingPage,
    meta: {
      title: '岗位/聘期要求映射',
      module: '能力清单',
      layout: 'admin',
      menuKey: 'ability-list-execution',
      breadcrumb: ['管理端', '能力清单', '执行版', '岗位/聘期要求映射'],
    },
  },
]