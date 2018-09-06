import Vue from 'vue';
import Router from 'vue-router';
import Editor from './views/Editor.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            name: 'login',
            path: '/we',
            component: Login,
        },
        {
            name: 'editor',
            path: '/we/editor',
            component: Editor,
        },
        // {
        //     name: 'login',
        //     path: '/we/login',
        //     component: () => Login,
        // },
        {
            name: 'manage',
            path: '/we/manage',
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
        },
    ],
});