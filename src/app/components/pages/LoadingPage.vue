<template>
    <div class="page home-page">
        <nav-bar />

        <div class="container col-sm-12 col-md-7">
            <div class="title"> {{ item.type }} </div>

            <file-loader :bgColor="item.color"
                         :formats="allowedFormats"
                         :processing="processing"
                         ref="fileLoader"/>

            <div class="submit-group">
                <b-progress
                        v-if="processing"
                        class="submit-group-progress-bar"
                        :value="uploaded"
                        :max="100" show-progress animated />
                <button class="btn btn-outline-dark submit-group-btn"
                        @click="submit"
                        :disabled="processing"
                        v-if="!uid"
                >Submit</button>
                <button class="btn btn-outline-dark submit-group-btn"
                        @click="download"
                        v-else
                >Download</button>
                <a :href="'http://127.0.0.1:8005/'+uid" hidden
                   ref="zip-ref"
                ></a>
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
                uploaded: 0,
                loading: false,
                processing: false,
                uid: null
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
                    default:
                        return `image/${type}`
                }
            },
        },
        methods: {
            updateProgress(progress) {
                this.uploaded = parseInt(Math.round((progress.loaded*100)/progress.total))
                if(this.uploaded === 100) {
                    this.loading = false;
                }
            },
            submit() {
                this.loading = true;
                this.processing = true;

                let formData = new FormData();

                this.$refs.fileLoader.files.forEach(file => {
                    formData.append(file.name, file) ;
                });

                this.axios.post(
                    `http://127.0.0.1:8005/api/${this.tool}/${this.type}`,
                    formData,
                    {
                        onUploadProgress: progress => this.updateProgress(progress)
                    }
                ).then(response => {
                    this.processing = false;
                    this.uid = response.data.ok;
                }).catch(error => {
                    this.processing = false;
                    console.log(error);
                });
            },
            download() {
                this.$refs['zip-ref'].click();
            }
        }
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