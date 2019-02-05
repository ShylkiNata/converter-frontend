import Vue from 'vue';
import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';

Vue.use(BootstrapVue);
Vue.use(VeeValidate, {
  events: 'blur',
});

import router from './routes/index.js';
import store from './store/index.js';

let main = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});