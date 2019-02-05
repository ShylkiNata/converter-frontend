<template>
    <div class="auth-form">
        <sign-in />
    </div>
</template>

<script>
    import SignIn from './auth/SignIn';

    export default {
        name: "auth-form",
        components: {
            SignIn
        }
    }
</script>