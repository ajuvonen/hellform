import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tos',
      name: 'tos',
      component: () => import('@/views/TOSView.vue'),
    },
    {
      path: '/thanks',
      name: 'thanks',
      component: () => import('@/views/ThanksView.vue'),
    },
    {
      path: '/expired',
      name: 'expired',
      component: () => import('@/views/ExpiredView.vue'),
    },
  ],
});

export default router;
