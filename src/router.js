import Vue from 'vue';
import Router from 'vue-router';
import Editor from './views/Editor.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: 'we',
  routes: [{
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    name: 'editor',
    path: '/editor',
    component: Editor,
  },
  {
    name: 'manage',
    path: '/manage',
    component: () => import('./views/Manage.vue'),
  },
  {
    name: 'preview',
    path: '/preview',
    component: () => import('./views/preview/Index.vue'),
  },
  {
    name: 'real',
    path: '/real',
    component: () => import('./views/real/Index.vue'),
  },
  {
    path: '*',
    redirect: '/login',
  },
  ],
});
