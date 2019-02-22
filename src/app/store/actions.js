export default {
    async auth($store, payload) {
        let url = `auth${payload.action}`;

        return this._vm.apiClient.request('post', url, payload.data)
            .then(response => {
                this._vm.apiClient.auth.token = response.token;
                $store.commit('authenticate', response);

                return response;
            })
            .catch(errors => {
                return errors;
            });
    },
    logout($store, payload) {
        let url = `auth/logout`;
        return this._vm.apiClient.request('post', url)
            .then(response => {
                this._vm.apiClient.auth.token = null;
                $store.commit('authenticate', null);
                return response;
            });
    },
    uploadFiles($store, payload) {
        //return this.axios.post(`${url}/${payload.action}`, payload);
    },
}