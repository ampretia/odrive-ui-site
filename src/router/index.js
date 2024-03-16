import { createRouter, createWebHistory } from 'vue-router'
import CarView from '../views/CarView.vue'
import TrackView from '@/views/TrackView.vue'
import TrackViewExpr from '@/views/TrackViewExpr.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cars',
      component: CarView
    },
    {
      path: '/track',
      name: 'Track',
      component: TrackView
    },
    {
      path: '/trackexpr',
      name: 'TrackExpr',
      component: TrackViewExpr
    }
  ]
})

export default router
