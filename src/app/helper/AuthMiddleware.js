export default {
    identifier: null,

    set token(value) {
        this.identifier = value;
        localStorage.setItem('token', value);
    },
    get token() {
        return this.identifier;
    },
    removeFromLocalStorage() {
        this.token = null;
    },
}

