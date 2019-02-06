<template>
    <div class="auth-form">
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
                           v-validate="getRulesByProperty(key)"
                           class="form-control"
                    />
                    <div class="error-message">
                        {{ errors.first(key) }}
                        <!--{{ _.keys(user).length === index+1 ? errors.first(property) : '' }}-->
                    </div>
                </div>

                <div class="text-right">
                    <button class="btn btn-primary" @click="submit">
                        Submit
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
                    case 'Sign In':
                        this.user = {'username': null, ...this.user};
                        break;
                    case 'Sign Up':
                        this.user['password confirmation'] = null;
                        break;
                }
            },
            getRulesByProperty(key) {
                switch(key) {
                    case 'username':
                        return 'required|min:8|max:64';
                    case 'email':
                        return 'required|min:8|max:64|email';
                    case 'password':
                    case 'password confirmation':
                        return 'required|min:8|max:64';
                }
            },
            uppercased(key) {
                let words = [];
                key.split(' ').forEach(word => {
                    words.push(word.charAt(0).toUpperCase() + word.slice(1));
                });

                return words.join(' ');
            },
            submit() {
                this.$store.dispatch('auth', this.user);
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
            background-color: #007bff;
            color: #fff;

            .card-title {
                font-size: 18px;
                font-weight: bold;
            }
        }
        .btn {
            font-size: 14px;
        }
    }
</style>