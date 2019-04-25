import Vue from 'vue';
import ElementUI from 'element-ui';
import VueDragResize from 'vue-drag-resize';
import 'element-ui/lib/theme-chalk/index.css';
import '../../assets/icons/iconfont.css';

import App from './App.vue';
import router from './router';
import store from '../../store';
import Toast from '../../components/table/toeast.js';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Toast);
console.log('Toast', Toast);

Vue.component('vue-drag-resize', VueDragResize);
new Vue({
  hashbang: true,
  router,
  store,
  render: h => h(App),
  directives: {
    tracks: {
      bind(el, binding, vnode) {
        console.log('bind-el', el);
        console.log('bind-binding', binding);
        console.log('vnode', vnode);
      },
      inserted(el, binding, vnode) {
        console.log('bind-el', el);
        console.log('bind-binding', binding);
        console.log('vnode', vnode);
      },
      update() {

      },
      unbind() {

      },
    },
  },
}).$mount('#app');
