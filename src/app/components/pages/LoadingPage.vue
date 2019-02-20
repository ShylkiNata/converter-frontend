<template>
    <div class="page home-page">
        <nav-bar />

        <div class="container col-sm-12 col-md-7">
            <div class="title"> {{ item.type }} </div>

            <file-loader :bgColor="item.color"
                         :formats="allowedFormats"
                         :disabled="processing"
                         ref="fileLoader"/>

            <div class="submit-group">
                <b-progress
                        v-if="processing"
                        class="submit-group-progress-bar"
                        :value="uploaded"
                        :max="100" show-progress animated />
                <button class="btn btn-outline-dark submit-group-btn" @click="submit()">Submit</button>
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
                processing: false
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
                this.uploaded = parseInt(Math.round((progress.loaded*100)/progress.total));
            },
            submit() {
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
                ).then(function(){
                    console.log('SUCCESS!!');
                }).catch(error => {
                    console.log('FAILURE!!', error);
                });
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