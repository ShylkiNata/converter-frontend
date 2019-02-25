<template>
  <div class="page page--auth">
    <nav-bar />
    <div class="container--birds">
      <video autoplay="" loop="" class="ng-tns-c5-0" src="~assets/auth-background.mp4"></video>
    </div>
    <auth-form class="container"/>
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

