import type { RouteRecordRaw } from 'vue-router'

const AdminPlaceholderPage = () => import('@/pages/admin/AdminPlaceholderPage.vue')
const ResourceLibraryPage = () => import('@/pages/admin/training/ResourceLibraryPage.vue')
const AbilityListExecutionPage = () => import('@/pages/admin/ability-list/AbilityListExecutionPage.vue')

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
    path: '/admin/archive/import',
    name: 'AdminArchiveImport',
    component: AdminPlaceholderPage,
    meta: {
      title: '导入部门资料',
      module: '成长档案',
      layout: 'admin',
      menuKey: 'archive',
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
      menuKey: 'archive',
      breadcrumb: ['管理端', '成长档案', '导入批次详情'],
    },
  },
  {
    path: '/admin/archive/records',
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
    path: '/admin/ability-profile/school',
    name: 'AdminAbilityProfileSchool',
    component: AdminPlaceholderPage,
    meta: {
      title: '学校画像',
      module: '能力画像',
      layout: 'admin',
      menuKey: 'ability-profile',
      breadcrumb: ['管理端', '能力画像', '学校画像'],
    },
  },
  {
    path: '/admin/ability-profile/teachers',
    name: 'AdminAbilityProfileTeachers',
    component: AdminPlaceholderPage,
    meta: {
      title: '教师画像',
      module: '能力画像',
      layout: 'admin',
      menuKey: 'ability-profile',
      breadcrumb: ['管理端', '能力画像', '教师画像'],
    },
  },
  {
    path: '/admin/ability-list/base',
    name: 'AdminAbilityListBase',
    component: AdminPlaceholderPage,
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
]