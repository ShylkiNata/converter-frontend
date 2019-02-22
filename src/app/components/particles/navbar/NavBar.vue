<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="vertor-brand">
            <router-link to="/">
                <img src="../../../assets/logo-1.png" />
            </router-link>
            <router-link to="/" v-html="service" />
        </div>

        <b-dropdown class="navbar-toggler" right variant="link">
            <nav-item el="b-dropdown-item" :cls="''" />
        </b-dropdown>

        <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
                <nav-item el="li" :cls="'navbar-item ml-3'" :inline="true" />
            </ul>
        </div>
    </nav>
</template>

<script>
    import NavItem from './NavItem';

    export default {
        components: {
            NavItem
        },
        name: "nav-bar",
        data() {
            return {
                service: 'VertoR'
            }
        },
        computed: {
            authenticated() {
                return this.$store.state.user;
            },
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