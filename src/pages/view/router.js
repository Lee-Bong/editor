import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/we/view',
  routes: [
    {
      name: 'real',
      path: '/real',
      component: () => import('../../views/real/Index.vue'),
    },
    {
      name: 'error',
      path: '/error',
      component: () => import('../../views/Error.vue'),
    },
  ],
});
