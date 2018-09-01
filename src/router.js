import Vue from 'vue';
import Router from 'vue-router';
import Editor from './views/Editor.vue';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'editor',
    component: Editor,
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
  }],
});
