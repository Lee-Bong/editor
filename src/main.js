import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import VueDragResize from 'vue-drag-resize';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.component('icon', Icon);
Vue.component('vue-drag-resize', VueDragResize);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
