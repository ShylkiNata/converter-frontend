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
                        return Promise.resolve(response.data);
                    })
                    .catch(errors => {
                        let error = {
                            error: true,
                            status: errors.response.status,
                            message: errors.response.data.error
                        };

                        return Promise.reject(error);
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