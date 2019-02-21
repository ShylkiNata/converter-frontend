<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="vertor-brand">
            <img src="../../assets/logo-1.png" />
            <router-link to="/" v-html="service" />
        </div>

        <b-dropdown class="navbar-toggler" right variant="link">
            <b-dropdown-item v-for="item in navigation"
                class="navbar-item ml-3" :class="{'active': $route.name === item}">
                <router-link class="nav-link" :to="{name: item}">
                    {{item}}
                </router-link>
            </b-dropdown-item>
        </b-dropdown>

        <div class="collapse navbar-collapse justify-content-end">
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

        .navbar-toggler {
            border: none;
        }
    }
</style>