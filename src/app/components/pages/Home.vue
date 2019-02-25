<template>
    <div class="page home-page">
        <nav-bar></nav-bar>
        <tools-preview class="col-sm-12 col-md-8"/>
        <footer></footer>
    </div>
</template>

<script>
    import NavBar from "../particles/navbar/NavBar";
    import ToolsPreview from "../particles/tools/ToolsPreview";

    export default {
        name: "Home",
        components: {
            NavBar,
            ToolsPreview
        }
    }
</script>

<style scoped>

</style>