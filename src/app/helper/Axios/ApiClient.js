import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

import AuthMiddleware from './AuthMiddleware.js';
import server from '../../../configs/server.js';

export default {
    auth: AuthMiddleware,

    request(method, url, data = []) {

        let headers = this.getHeaders();

        return axios[method](server.API_URL + url, data, headers)
                    .then(response => {
                        return Promise.resolve(response.data);
                    })
                    .catch(errors => {
                        throw this.getError(errors);
                    });
    },
    getHeaders() {
        return {
            headers: {
                Authorization: 'Bearer ' + this.auth.token
            }
        }
    },
    getError(errors) {
        let response = errors.response;
        let message = 'Something went wrong. Please, try again later';

        if(response) {
            message = response.data.error ? response.data.error :
                `Error ${response.status}: ${response.statusText}`;
        }

        if(response.status === 401) {
            this.$store.dispatch('resetUser');
            this.$router.push({name: 'Sign In'});
        }

        return message;
    }
}