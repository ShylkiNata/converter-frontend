export default {
    auth($store, payload) {
        let url = `auth${payload.action}`;
        return this._vm.apiClient.request('post', url, payload.data)
            .then(response => {
                this._vm.apiClient.auth.token = response.token;
                $store.commit('authenticate', response.data);
                return response;
            });
    },
    logout($store, payload) {
        let url = `auth${payload.logout}`;
        return this._vm.apiClient.request('post', url, payload.data)
            .then(response => {
                this._vm.apiClient.auth.token = null;
                $store.commit('authenticate', null);
                return response;
            });
    },
    uploadFiles(context, payload) {
        //return this.axios.post(`${url}/${payload.action}`, payload);
    }
}