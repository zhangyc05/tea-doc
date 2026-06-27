import { createRouter, createWebHistory } from 'vue-router'

import { adminRoutes } from './admin.routes'
import { mobileRoutes } from './mobile.routes'
import { teacherRoutes } from './teacher.routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/admin/training/resources',
    },
    ...adminRoutes,
    ...teacherRoutes,
    ...mobileRoutes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/admin/training/resources',
    },
  ],
})

// 环境检测路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.devOnly && import.meta.env.PROD) {
    // 生产环境重定向到管理端首页
    next({ path: '/admin/training/resources' })
  } else {
    next()
  }
})

export default router
