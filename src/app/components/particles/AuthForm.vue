<template>
    <div class="page--auth__card">
        <div class="card animation-slide-in-elliptic-top-fwd">
            <div class="card-header blue-header">
                <span class="card-title" v-html="formType" />
            </div>
            <div class="card-body">
                <div class="form-group" v-for="(property, key, index) in user">
                    <input v-model="user[key]"
                           :name="key"
                           :key="`${formType}${key}`"
                           :placeholder="uppercased(key)"
                           :type="getTypeByProperty(key)"
                           :disabled="processing"
                           v-validate="getRulesByProperty(key)"
                           class="form-control"
                           :ref="key"
                    />
                    <div class="error-message">
                        {{ errors.first(key) || additionalError(index) }}
                    </div>
                </div>

                <div class="text-center">
                    <button class="btn"
                            @click="submit"
                            :disabled="processing"
                    >
                       <font-awesome-icon icon="arrow-right" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PropertyMixin from '../../mixins/PropertyMixin';
    import ErrorMixin from '../../mixins/Errors';

    export default {
        name: "auth-form",
        mixins: [
            PropertyMixin,
            ErrorMixin
        ],
        data() {
            return {
                user: null,
                processing: false
            }
        },
        computed: {
            formType() {
                return this.$route.name;
            }
        },
        beforeMount() {
            this.initUser();
        },
        methods: {
            additionalError(index) {
                return index+1 === Object.keys(this.user).length ?
                    this.errors.first('server') : ''
            },
            initUser() {
                this.errors.clear();
                this.$validator.reset();

                this.user = {
                    email: '',
                    password: ''
                };

                switch (this.formType) {
                    case 'Sign Up':
                        this.user['password_confirmation'] = null;
                        break;
                }
            },
            dispatch() {
                this.$store.dispatch('auth', {
                        action: this.$route.path,
                        data: this.user
                    })
                    .then(() => {
                        this.$router.push({name: 'Home'});
                    })
                    .catch(error => {
                        this.processing = false;
                        this.handleErrors(error);
                    })
            },
            submit() {
                this.errors.clear();
                this.processing = true;
                this.$validator.validate()
                    .then(result => {
                        if(result) {
                            this.dispatch();
                        } else {
                            this.processing = false;
                        }
                    })
            }
        },
        watch: {
            '$route.name'() {
                this.initUser();
            },
        }
    }
</script>