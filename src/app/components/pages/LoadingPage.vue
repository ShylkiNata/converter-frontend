<template>
    <div class="page home-page">
        <nav-bar />

        <div class="container col-sm-12 col-md-7">
            <div class="title"> {{ item.type }} </div>

            <file-loader :bgColor="item.color"
                         :formats="allowedFormats"
                         :processing="processing"
                         @change="pathToDownload = null"
                         ref="fileLoader"/>

            <div class="submit-group">
                <button class="btn btn-outline-dark submit-group-btn"
                        @click="submit"
                        :disabled="processing"
                        v-if="!pathToDownload"
                >Submit</button>
                <button class="btn btn-outline-dark submit-group-btn"
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
                        return 'image/jpeg, image/jpg';
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

<style scoped lang="scss">
    .container {
        display:block;
        margin: auto;
        position: relative;

        .title {
            text-align: center;
            line-height: 70px;
            font-size: 20px;
            font-weight: 700;
        }
    }
    .submit-group {
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
        justify-content: flex-end;

        .submit-group-progress-bar {
            flex: 1;
            margin-right: 20px;
            align-self: center;
        }
    }
</style>