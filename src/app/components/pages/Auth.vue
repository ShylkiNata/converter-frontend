<template>
  <div class="page auth-page">
    <nav-bar />
    <auth-form class="auth-form col-sm-12 col-md-6 col-lg-5 col-xl-4" />
  </div>
</template>

<script>
  import AuthForm from '../particles/AuthForm';
  import NavBar from "../particles/navbar/NavBar";

  export default {
    name: 'auth-page',
    components: {
      NavBar,
      AuthForm
    },
  }
</script>

<style lang="scss">
  .auth-form {
    height: 100%;
    top: 20%;
  }
</style>

