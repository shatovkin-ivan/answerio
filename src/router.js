import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import App from '@/App.vue'

const router = createRouter({
  history: process.env.NODE_ENV === 'production' ? createWebHistory() : createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
    },
    {
      path: '/:url',
      name: 'home',
      component: App,
    },
  ],
})

export default router
