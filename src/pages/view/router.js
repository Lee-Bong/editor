import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/we/view',
  routes: [
    {
      name: 'view',
      path: '/',
      component: () => import('../../views/h5/Index.vue'),
    },
  ],
});
