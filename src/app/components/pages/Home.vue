<template>
    <div class="page page--home">
        <nav-bar></nav-bar>
        <tools-preview class="container"/>
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