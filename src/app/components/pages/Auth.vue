<template>
  <div class="page">
    <nav-bar></nav-bar>
    <auth-form class="col-sm-12 col-md-6 col-lg-5 col-xl-4"></auth-form>
  </div>
</template>

<script>
  import AuthForm from '../particles/AuthForm';
  import NavBar from "../particles/NavBar";

  export default {
    name: 'auth-page',
    components: {
      NavBar,
      AuthForm
    }
  }
</script>

