<template>
    <div class="page home-page">
        <nav-bar />
        <file-loader class="form"
                     :bgColor="bgColor"
                     :formats="allowedFormats"/>
    </div>
</template>

<script>
    import NavBar from "../particles/NavBar";
    import FileLoader from "../particles/FileLoader";
    import ToolsMixin from "../../mixins/ToolList";

    export default {
        name: "LoadingPage",
        components: {
            FileLoader,
            NavBar,
        },
        mixins: [
            ToolsMixin
        ],
        computed: {
            bgColor() {
                let tool = this.$route.params.tool;
                let item = this[tool].find(item => {
                    let str = item.type.toLowerCase().replace(/ /g, '-');
                   return str === this.$route.params.type;
                });
                return item.color;
            },
            allowedFormats() {
                let param = this.$route.params.type;
                let type = param.split('-')[0];

                switch (type) {
                    case 'pdf':
                        return 'application/pdf';
                    default:
                        return `image/${type}`
                }
            }
        }
    }
</script>

<style scoped>

</style>