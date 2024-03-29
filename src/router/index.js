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
      path: '/ad',
      name: 'ad',
      component: () => import('../views/AdView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/ErrorNotFoundView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (to.hash) {
          resolve({ el: to.hash, behavior: 'smooth' });
        }
        if (savedPosition) {
          resolve(savedPosition);
        }
        resolve({ left: 0, top: 0 });
      }, 500);
    });
  },
});

export default router;
