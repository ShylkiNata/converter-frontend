<template>
    <div class="row">
        <component :is="el" :class="[cls, {'active': $route.name === item }]"
                   v-for="item in navigation">
            <router-link class="nav-link" :class="{'nav-link--logout': item === 'Logout'}" :to="item !== 'Logout' ? {name: item} : ''"
                         @click.native="item !== 'Logout' ? '' : logout()">
                {{item}}
            </router-link>
        </component>
    </div>
</template>

<script>
    export default {
        name: "nav-item",
        props: [
            'el', 'cls'
        ],
        computed: {
            authenticated() {
                return this.$store.state.user;
            },
            navigation() {
                if(!this.authenticated) {
                    return ['Home', 'Sign In', 'Sign Up'];
                }
                return ['Logout'];
            },
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
                    .then(response => {
                        this.$router.push('/');
                    })
            }
        }
    }
</script>