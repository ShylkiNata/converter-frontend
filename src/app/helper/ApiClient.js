import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

import AuthMiddleware from './AuthMiddleware.js';
import server from '../../configs/server.js';

export default {
    auth: AuthMiddleware,

    request(method, url, data = []) {

        let headers = this.getHeaders();

        return axios[method](server.API_URL + url, data, headers)
                    .then(response => {
                        return response.data;
                    })
                    .catch(errors => {
                        return errors;
                    });
    },
    getHeaders() {
        return {
            headers: {
                Authorization: 'Bearer ' + this.auth.token
            }
        }
    }
}