<template>
    <div class="card">
        <div class="card-header blue-header">
            <h4 class="card-title">Login</h4>
        </div>
        <div class="card-body">
            <div class="form-group">
                <input v-model="user.email"
                       name="email"
                       placeholder="email"
                       class="form-control"
                       v-validate="'required|min:8|max:64|email'" />
                <div class="error-message">{{ errors.first('email') }}</div>
            </div>

            <div class="form-group">
                <input v-model="user.password"
                       name="password"
                       class="form-control"
                       placeholder="password"
                       type="password"
                       v-validate="'required|min:8|max:64'" />
                <div class="error-message">{{ errors.first('password') }}</div>
            </div>
        </div>
        <div class="card-footer text-right">
            <button class="btn btn-primary" @click="submit">
                Submit
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SignIn",
        data() {
            return {
                user: {
                    email: null,
                    password: null
                }
            }
        },
        methods: {
            submit() {
                this.$validator.validate()
                    .then(result => {
                        if(result) {
                            this.$store.dispatch('auth', this.user);
                        }
                    }).catch(errors => {
                        console.log(errors);
                    })
            }
        }
    }
</script>

<style scoped>

</style>