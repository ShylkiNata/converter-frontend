import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import App from './App.vue';

Vue.use(BootstrapVue);

import router from './routes/index.js';
import store from './store/index.js';

import apiClient from './helper/Axios/ApiClient.js';
import validator from './helper/VeeValidator.js';

import './helper/FontAwesomeIcon';

Vue.prototype.apiClient = apiClient;

let main = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});