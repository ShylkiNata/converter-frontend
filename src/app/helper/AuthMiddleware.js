export default {
    identifier: null,
    keyInStorage: 'VertoRToken',

    set token(value) {
        this.identifier = value;
        this.setStorage(value);
    },
    get token() {
        if(this.identifier === null) {
            this.identifier = this.getStorage();
        }

        return this.identifier;
    },

    getStorage() {
        return localStorage.getItem(this.keyInStorage);
    },
    setStorage(value) {
        localStorage.setItem(this.keyInStorage, value);
    },
    rmStorage() {
        this.token = null;
        localStorage.removeItem(this.keyInStorage);
    },
}

