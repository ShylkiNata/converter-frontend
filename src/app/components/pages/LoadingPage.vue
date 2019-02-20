<template>
    <div class="page home-page">
        <nav-bar />

        <file-loader class="form"
                     :bgColor="item.color"
                     :header="item.type"
                     :formats="allowedFormats"
                     ref="fileLoader"/>

        <div class="form">
            <div class="container text-right col-sm-12 col-md-7">
                <progress max="100" :value.prop="uploaded"></progress>
                <button class="btn btn-outline-dark" @click="submit()">Submit</button>
            </div>
        </div>
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
        data() {
            return {
                uploaded: 0
            }
        },
        computed: {
            item() {
                let tool = this.$route.params.tool;

                return this[tool].find(item => {
                    let str = item.type.toLowerCase().replace(/ /g, '-');
                   return str === this.$route.params.type;
                });
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
            },
        },
        methods: {
            submit() {
                let formData = new FormData();

                this.$refs.fileLoader.files.forEach(file => {
                    formData.append(file.name, file) ;
                });

                this.axios.post('http://127.0.0.1:8005/api/compress', formData, {
                        onUploadProgress: function(progressEvent) {
                            this.uploaded = parseInt(Math.round((progressEvent.loaded*100)/progressEvent.total));
                        }.bind(this)
                    }
                ).then(function(){
                    console.log('SUCCESS!!');
                }).catch(error => {
                    console.log('FAILURE!!', error);
                });
            }
        }
    }
</script>

<style scoped>

</style>