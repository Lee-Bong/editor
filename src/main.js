import Vue from 'vue';
import ElementUI from 'element-ui';
import Icon from 'vue-awesome/components/Icon';
import VueDragResize from 'vue-drag-resize';
import axios from 'axios';
import 'vue-awesome/icons';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/';
Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.component('icon', Icon);
Vue.component('vue-drag-resize', VueDragResize);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
