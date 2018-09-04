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
            name: 'login',
            path: '/login',
            component: () =>
                import ('./views/Login.vue'),
        },
        {
            name: 'manage',
            path: '/manage',
            component: () =>
                import ('./views/Manage.vue'),
        },
        {
            name: 'preview',
            path: '/preview',
            component: () =>
                import ('./views/preview/Index.vue'),
        },
        {
            name: 'real',
            path: '/real',
            component: () =>
                import ('./views/real/Index.vue'),
        }
    ],
});