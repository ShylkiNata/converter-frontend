<template>
    <div class="file-loader col-sm-12 col-md-7">
        <div class="container mt-3">
            <div id="file-drag-drop">
                <form ref="fileform" :style="{'background-color': bgColor}">
                    <div class="fileform-shadow" :style="{'background-color': shadedBg }">
                        <span class="title">Drag & Drop Files</span>
                        <input class="file-input"
                               type="file"
                               title=""
                               :accept="formats"
                               ref="clickLoader"
                               @change="uploadFile">
                    </div>
                </form>
            </div>

            <div class="file-list mt-5">
                <div class="file-item" v-for="(file,index) in files">
                    <span>{{ file.name }}</span>
                    <font-awesome-icon class="remove-icon" icon="trash" @click="remove(index)"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "file-loader",
        props: [
          'bgColor',
          'formats'
        ],
        data() {
            return {
                files: [],
                uploadPercentage: 0
            }
        },
        computed: {
            shadedBg() {
                return this.shadeHexColor(this.bgColor);
            }
        },
        methods: {
            shadeHexColor(color, percent = -0.2) {
                let f=parseInt(color.slice(1),16),
                    t=percent<0?0:255,
                    p=percent<0?percent*-1:percent,

                    R=f>>16,
                    G=f>>8&0x00FF,
                    B=f&0x0000FF;

                return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
            },
            remove(removed) {
                this.files = this.files.filter((item, index) => {
                    return index !== removed;
                });
            },
            uploadFile(event) {
                let fileList = event.target.files;
                this.files.push(fileList[0]);
                this.$refs.clickLoader.value = null;
            },
            setInputEvents() {
                let events = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'];
                events.forEach( function(item) {
                    this.$refs.fileform.addEventListener(item, function(e){
                        e.preventDefault();
                        e.stopPropagation();
                    }.bind(this), false);
                }.bind(this));
            },
            addEventListener() {
                this.$refs.fileform.addEventListener('drop', function(e){
                    for(let i = 0; i < e.dataTransfer.files.length; i++ ){
                        this.files.push(e.dataTransfer.files[i]);
                    }
                }.bind(this));
            }
        },
        mounted() {
            this.setInputEvents();
            this.addEventListener();
        }
    }
</script>

<style lang="scss">
    form {
        position: relative;
        display: block;
        margin: auto;
        margin-top: 40px;
        text-align: center;
        line-height: 300px;
        border-radius: 4px;
        color: #fff;
        font-weight: 500;
        font-size: 20px;
        box-shadow: -2px 1px 12px -2px rgba(0,0,0,0.75);
        padding: 10px;

        .fileform-shadow {
            border-radius: 2px;
            border: 1px dashed darkslategrey;
        }
    }

    progress{
        width: 400px;
        margin: auto;
        display: block;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .file-input {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }

    .file-list {
        .file-item {
            position: relative;
            border: 1px solid grey;
            line-height: 36px;
            padding: 0 15px;
            border-radius: 2px;
            box-shadow: -2px 1px 3px -2px rgba(0,0,0,0.75);
        }
        .remove-icon {
            position: absolute;
            right: 15px;
            top: 9px;
            cursor: pointer;
            
            &:hover {
                filter: brightness(70%);
            }
        }
    }
</style>