export default {
    async auth($store, payload) {
        let url = `auth${payload.action}`;

        return this._vm.apiClient.request('post', url, payload.data)
            .then(response => {
                this._vm.apiClient.auth.token = response.token;
                $store.commit('authenticate', response);

                return response;
            });
    },
    logout($store, payload) {
        let url = `auth/logout`;
        return this._vm.apiClient.request('post', url)
            .then(response => {
                this.resetUser();
                return response;
            });
    },
    uploadFiles($store, payload) {
        return this._vm.apiClient.request('post', payload.url, payload.data)
            .then(response => {
                return response;
            });
    },
    resetUser($store) {
        this._vm.apiClient.auth.token = null;
        $store.commit('authenticate', null);
    },
}