<template>
    <div class="page home-page">
        <nav-bar />
        <file-loader />
    </div>
</template>

<script>
    import NavBar from "../particles/NavBar";
    import FileLoader from "../particles/FileLoader";

    export default {
        name: "LoadingPage",
        components: {
            FileLoader,
            NavBar,
        }
    }
</script>

<style scoped>

</style>