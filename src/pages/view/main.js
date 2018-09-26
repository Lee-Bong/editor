import Vue from 'vue';
import Button from 'element-ui/lib/button';
import Slider from 'element-ui/lib/slider';
import './element-ui.scss';
import '../../assets/icons/iconfont.css';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Slider);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
