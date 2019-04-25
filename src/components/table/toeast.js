import ToeastComponent from './toeast.vue';

const Toast = {};

// install

Toast.install = (Vue) => {
  const ToastConstructor = Vue.extend(ToeastComponent);
  const instance = new ToastConstructor();
  instance.$mount(document.createElement('div'));
  document.body.appendChild(instance.$el);

  Vue.prototype.$toast = (msg, duration = 2000) => {
    instance.message = msg;
    instance.show = true;
    setTimeout(() => {
      instance.show = false;
    }, duration);
  };
};

export default Toast;