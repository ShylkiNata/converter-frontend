<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'app',
    created() {
        if(this.authorized) {
            this.apiClient.auth.token = this.authorized.token;
        }
    },
    computed: {
      authorized() {
            return this.$store.state.user;
        }
    }
  }
</script>

<style>
  @import './styles/main.scss';
</style>