<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Login</h4>
        </div>
        <div class="card-body">
            <div class="form-group">
                <input v-model="user.email"
                       name="email"
                       placeholder="email"
                       class="form-control"
                       v-validate="'required|min:8|max:64|email'" />
                <div class="error"></div>
            </div>

            <div class="form-group">
                <input v-model="user.password"
                       name="password"
                       class="form-control"
                       placeholder="password"
                       type="password"
                       v-validate="'required|min:8|max:64'" />
                <span></span>
            </div>
        </div>
        <div class="card-footer text-right">
            <button class="btn btn-primary">
                Submit
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SignUp",
        data() {
            return {
                user: {
                    email: null,
                    password: null,
                    confirmation: null
                }
            }
        }
    }
</script>

<style scoped>

</style>