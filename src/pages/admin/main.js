import Vue from 'vue';
import ElementUI from 'element-ui';
import VueDragResize from 'vue-drag-resize';
import 'element-ui/lib/theme-chalk/index.css';
import '../../assets/icons/iconfont.css';

import axios from '../../service/request';
import App from './App.vue';
import router from './router';
import store from '../../store';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.component('vue-drag-resize', VueDragResize);

new Vue({
  hashbang: true,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
