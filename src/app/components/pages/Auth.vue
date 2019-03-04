<template>
  <div class="page page--auth">
    <nav-bar />
    <div class="motion-container">
      <video autoplay loop src="~assets/auth-bg-video.mp4"></video>
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

