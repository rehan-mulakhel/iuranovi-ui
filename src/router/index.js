import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/course/:course',
      component: () => import('../views/CourseView.vue'),
      children: [
        {
          path: '',
          name: 'toc',
          component: () => import('../views/CourseHomeView.vue'),
        },
        {
          path: ':chapter',
          name: 'chapter',
          component: () => import('../views/ChapterView.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/ErrorNotFoundView.vue'),
    },
  ],
});

export default router;
