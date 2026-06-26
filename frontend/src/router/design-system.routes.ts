// frontend/src/router/design-system.routes.ts
import type { RouteRecordRaw } from 'vue-router'

const DesignSystemPage = () => import('@/pages/design-system/DesignSystemPage.vue')

export const designSystemRoutes: RouteRecordRaw[] = [
  {
    path: '/design-system',
    name: 'DesignSystem',
    component: DesignSystemPage,
    meta: {
      title: '设计系统',
      devOnly: true, // 开发环境专用
    },
  },
]
