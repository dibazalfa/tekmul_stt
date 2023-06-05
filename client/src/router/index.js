import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/jarak',
      name: 'jarak',
      component: () => import('../views/jarak.vue')
    },
    // {
    //   path: '/seacrh',
    //   name: 'seacrh',
    //   component: () => import('../views/search.vue')
    // }
  ]
})

export default router