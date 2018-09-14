import Vue from 'vue';
import { axios } from '../../service';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

export default { axios };
