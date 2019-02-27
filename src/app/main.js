import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import App from './App.vue';

Vue.use(BootstrapVue);

import router from './routes/index.js';
import store from './store/index.js';

import apiClient from './helper/Axios/ApiClient.js';
import validator from './helper/VeeValidator.js';

import './helper/FontAwesomeIcon';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

import configs from '../configs/server.js';

Vue.prototype.apiClient = apiClient;
Vue.prototype.$configs = configs;

apiClient.$store = store;
apiClient.$router = router;

router.$store = store;

let main = new Vue({
  el: '#app',
  router,
  store,
  configs,
  render: h => h(App),
});
