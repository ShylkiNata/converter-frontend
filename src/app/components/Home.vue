<template>
  <div class="page">
    <auth-form class="col-sm-12 col-md-6 col-lg-5"></auth-form>
  </div>
</template>

<script>
  import AuthForm from './particles/AuthForm';

  export default {
    name: 'Home',
    components: {
      AuthForm
    }
  }
</script>

<style lang="scss">
</style>

