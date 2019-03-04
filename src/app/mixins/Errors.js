export default {
    methods: {
        handleErrors(errors) {
            switch (typeof errors) {
                case 'string':
                    return this.setStrErr(errors);
                case 'object':
                    return this.parseErr(errors);
                default:
                    return this.setStrErr('Something went wrong.');
            }

        },
        setStrErr(msg, field = 'server') {
            this.$validator.errors.add({
                field: field,
                msg: msg,
                scope: this.$options.scope,
            });
        },
        parseErr(errors) {
            for (let [key, value] of Object.entries(errors)) {
                this.setStrErr(value.shift(), key);
            }
        }
    }
}