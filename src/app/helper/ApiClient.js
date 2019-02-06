import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios';

import server from '../../configs/server.js';

Vue.use(VueAxios, axios);

const API_URL = server.API_URL;

export default {
    post(url, payload) {
        return axios
            .post(url, payload)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    },
}