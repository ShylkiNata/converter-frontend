import server from '../../configs/server.js';

const url = `${server.API_URL}`;

export default {
    auth(context, payload) {
        return this.axios.post(`${url}/auth`, payload);
    },
    uploadFiles(context, payload) {
        return this.axios.post(`${url}/${payload.action}`, payload);
    }
}