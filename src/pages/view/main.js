import Vue from 'vue';
import Button from 'element-ui/lib/button';
import Slider from 'element-ui/lib/slider';
import Input from 'element-ui/lib/input';
import Radio from 'element-ui/lib/radio';
import Checkbox from 'element-ui/lib/checkbox';
import Upload from 'element-ui/lib/upload';
import Dialog from 'element-ui/lib/dialog';

import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload';
import '../../assets/icons/iconfont.css';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  preLoad: 2.5,
});
Vue.use(Button);
Vue.use(Slider);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Upload);
Vue.use(Dialog);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
