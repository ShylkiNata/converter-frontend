<template>
    <div class="page page--home">
        <nav-bar />

        <div class="container tool--container">
            <div class="tool--container__title"> {{ item.type }} </div>

            <file-loader :bgColor="item.color"
                         :formats="allowedFormats"
                         :processing="processing"
                         @change="pathToDownload = null"
                         ref="fileLoader"/>

            <div class="tool--container__actions">
                <button class="btn btn-outline-dark container__btn"
                        @click="submit"
                        :disabled="processing"
                        v-if="!pathToDownload"
                >Submit</button>
                <button class="btn btn-outline-dark container__btn"
                        @click="download"
                        v-else
                >Download</button>
                <a :href="pathToDownload" hidden
                   ref="zip-ref"
                ></a>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "../particles/navbar/NavBar";
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
                loading: false,
                processing: false,
                pathToDownload: null
            }
        },
        computed: {
            type() {
                return this.$route.params.type;
            },
            tool() {
                return this.$route.params.tool;
            },
            item() {
                return this[this.tool].find(item => {
                    let str = item.type.toLowerCase().replace(/ /g, '-');
                   return str === this.type;
                });
            },
            allowedFormats() {
                let type = this.type.split('-')[0];

                switch (type) {
                    case 'pdf':
                        return 'application/pdf';
                    case 'jpg':
                        return 'image/jpeg,jpg';
                    default:
                        return `image/${type}`
                }
            },
        },
        methods: {
            submit() {
                this.loading = true;
                this.processing = true;

                if(!this.$refs.fileLoader.validate()) {
                    this.loading = false;
                    this.processing = false;
                    return ;
                }

                this.$store.dispatch('uploadFiles', this.getData())
                    .then(response => {
                        this.processing = false;
                        this.pathToDownload = response.data;
                    }).catch(error => {
                        this.processing = false;
                        this.$refs.fileLoader.error.bag.push(error);
                        console.log(error);
                });
            },
            download() {
                this.$refs['zip-ref'].click();
            },
            getData() {
                let formData = new FormData();

                this.$refs.fileLoader.files.forEach(file => {
                    formData.append(file.name, file) ;
                });

                return {
                    data: formData,
                    url: `${this.tool}/${this.type}`
                }
            },
        },
    }
</script>