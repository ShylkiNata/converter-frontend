import store from '../store/index.js';

export default class RouterValidator {

    static home(meta) {
        let guest = meta.guest && store.state.user !== null;
        let auth = meta.requiresAuth && store.state.user == null;

        return guest || auth;
    }
}