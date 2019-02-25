<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="navbar--vertor__brand">
            <router-link to="/" >
                <img src="../../../assets/logo-1.png" class="brand__logo"/>
            </router-link>
            <router-link to="/" v-html="service" class="brand__title"/>
        </div>

        <b-dropdown class="navbar-toggler dropdown--vertor m-2" right>
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

