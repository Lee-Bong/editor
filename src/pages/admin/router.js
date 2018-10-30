import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/we/admin/',
  routes: [{
    path: '/',
    redirect: '/login',
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../../views/Login.vue'),
  },
  {
    name: 'editor',
    path: '/editor',
    component: () => import('../../views/Editor.vue'),
  },
  {
    name: 'manage',
    path: '/manage',
    component: () => import('../../views/Manage.vue'),
  },
  {
    name: 'preview',
    path: '/preview',
    component: () => import('../../views/preview/Index.vue'),
  },
  {
    name: 'publish',
    path: '/publish',
    component: () => import('../../views/publish/Index.vue'),
  },
  {
    name: 'total',
    path: '/total',
    component: () => import('../../views/total.vue'),
  },
  {
    name: 'error',
    path: '/error',
    component: () => import('../../views/Error.vue'),
  },
  {
    path: '*',
    redirect: '/login',
  },
  ],
});
