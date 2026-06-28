import type { RouteRecordRaw } from 'vue-router'

const AdminPlaceholderPage = () => import('@/pages/admin/AdminPlaceholderPage.vue')
const ResourceLibraryPage = () => import('@/pages/admin/training/ResourceLibraryPage.vue')
const AbilityListBasePage = () => import('@/pages/admin/ability-list/AbilityListBasePage.vue')
const AbilityListBaseOptimizationPage = () => import('@/pages/admin/ability-list/AbilityListBaseOptimizationPage.vue')
const AbilityListExecutionPage = () => import('@/pages/admin/ability-list/AbilityListExecutionPage.vue')
const AbilityListPublishConfirmPage = () => import('@/pages/admin/ability-list/AbilityListPublishConfirmPage.vue')
const AbilityListRequirementMappingPage = () => import('@/pages/admin/ability-list/AbilityListRequirementMappingPage.vue')

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    redirect: '/admin/training/resources',
  },
  {
    path: '/admin/training/records',
    name: 'AdminTrainingRecords',
    component: AdminPlaceholderPage,
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
    component: ResourceLibraryPage,
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
    component: AdminPlaceholderPage,
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
    component: AdminPlaceholderPage,
    meta: {
      title: '申请处理',
      module: '培训管理',
      layout: 'admin',
      menuKey: 'training-applications',
      breadcrumb: ['管理端', '培训管理', '申请处理'],
    },
  },
  {
    path: '/admin/reports',
    name: 'AdminReports',
    component: AdminPlaceholderPage,
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
    component: AdminPlaceholderPage,
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
    component: AdminPlaceholderPage,
    meta: {
      title: '档案查询',
      module: '成长档案',
      layout: 'admin',
      menuKey: 'archive-query',
      breadcrumb: ['管理端', '成长档案', '档案查询'],
    },
  },
  {
    path: '/admin/archive/import',
    name: 'AdminArchiveImport',
    component: AdminPlaceholderPage,
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
    component: AdminPlaceholderPage,
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
    component: AdminPlaceholderPage,
    meta: {
      title: '教学反思',
      module: '教学反思',
      layout: 'admin',
      menuKey: 'reflection',
      breadcrumb: ['管理端', '教学反思'],
    },
  },
  {
    path: '/admin/practice/tracking',
    name: 'AdminPracticeTracking',
    component: AdminPlaceholderPage,
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
    component: AdminPlaceholderPage,
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
    component: AdminPlaceholderPage,
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
    component: AdminPlaceholderPage,
    meta: {
      title: '虚拟教研室',
      module: '虚拟教研室',
      layout: 'admin',
      menuKey: 'virtual-lab',
      breadcrumb: ['管理端', '虚拟教研室'],
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
    component: AdminPlaceholderPage,
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
    component: AdminPlaceholderPage,
    meta: {
      title: '教师画像',
      module: '能力画像',
      layout: 'admin',
      menuKey: 'ability-profile-teacher',
      breadcrumb: ['管理端', '能力画像', '教师画像'],
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