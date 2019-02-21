<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="vertor-brand">
            <img src="../../assets/logo-1.png" />
            <router-link to="/" v-html="service" />
        </div>
        <button class="navbar-toggler" type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav">
                <li v-for="item in navigation"
                    class="navbar-item ml-3" :class="{'active': $route.name === item}">
                    <router-link class="nav-link" :to="{name: item}">
                        {{item}}
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "nav-bar",
        data() {
            return {
                navigation: ['Home', 'Sign In', 'Sign Up'],
                service: 'VertoR'
            }
        }
    }
</script>

<style scoped lang="scss">
    nav {
        padding: 10px 50px;
    }
</style>