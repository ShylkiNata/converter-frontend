<template>
    <div class="form">
        <div class="card">
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
                           v-validate="getRulesByProperty(key)"
                           class="form-control"
                    />
                    <div class="error-message">
                        {{ errors.first(key) }}
                        <!--{{ _.keys(user).length === index+1 ? errors.first(property) : '' }}-->
                    </div>
                </div>

                <div class="text-center">
                    <button class="btn" @click="submit">
                       <font-awesome-icon icon="arrow-right" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "auth-form",
        data() {
            return {
                user: null
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
            initUser() {
                this.$validator.reset();

                this.user = {
                    email: null,
                    password: null
                };

                switch (this.formType) {
                    case 'Sign Up':
                        this.user['password confirmation'] = null;
                        break;
                }
            },
            getTypeByProperty(key) {
                switch (key) {
                    case 'password':
                    case 'password confirmation':
                        return 'password';
                    default:
                        return 'text';
                }
            },
            getRulesByProperty(key) {
                switch(key) {
                    case 'username':
                        return 'required|min:6|max:64';
                    case 'email':
                        return 'required|min:6|max:64|email';
                    case 'password':
                        return 'required|min:6|max:64';
                    case 'password confirmation':
                        return 'required|min:6|max:64|confirmed:password';
                }
            },
            uppercased(key) {
                let words = [];
                key.split(' ').forEach(word => {
                    words.push(word.charAt(0).toUpperCase() + word.slice(1));
                });

                return words.join(' ');
            },
            dispatch() {
                this.$store.dispatch('auth', this.user)
                    .then(() => {
                        //this.$router.push({name: 'ConverterCompressor'})
                    }).catch(errors => {
                        console.log(errors);
                    })
            },
            submit() {
                this.$validator.validate()
                    .then(result => {
                        if(result) {
                            this.dispatch();
                        }
                    }).catch(errors => {
                        console.log(errors);
                    })
            }
        },
        watch: {
            '$route.name'() {
                this.initUser();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .auth-form {
        max-width: 455px;

        .card-body {
            margin: 15px 10px 0 10px ;
        }
        .card-header {
            background-color: #1d90a5;
            color: #fff;

            .card-title {
                font-size: 20px;
                font-weight: bold;
            }
        }
        .btn {
            border: 2px solid #1d90a5;
            border-radius: 50%;
            color: #19b9d6;
            width: 50px;
            height: 50px;
            font-size: 20px;

            &:hover {
                filter: brightness(150%);
            }
        }
    }
</style>