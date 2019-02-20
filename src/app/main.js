import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faFilePdf, faFileImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(VeeValidate, {
  events: 'blur',
});

Vue.config.productionTip = false;
library.add(faTrash, faFilePdf, faFileImage);

Vue.component('font-awesome-icon', FontAwesomeIcon);

import router from './routes/index.js';
import store from './store/index.js';

let main = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});