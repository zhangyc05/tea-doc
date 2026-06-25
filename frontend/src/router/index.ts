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

export default router
