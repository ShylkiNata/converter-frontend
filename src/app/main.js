import Vue from 'vue';
import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTrash);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

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