<template>
    <div class="file-uploader">

        <form ref="ddLoader" :style="{'background-color': bgColor}"
              class="file-uploader__drag-drop">

            <div class="file-uploader--shadow" :style="{'background-color': shadedBg }">
                <span class="title">Drag & Drop Files</span>
                <input class="file-uploader__input"
                       type="file"
                       title="" multiple
                       :disabled="disabled"
                       :accept="formats"
                       ref="clickLoader"
                       @change="uploadFile">
            </div>
        </form>

        <div class="file-uploader__list mt-4">
            <b-alert variant="danger" dismissible :show="error.visibility" fade
                     @dismissed="hideErrors">
                <div v-for="error in error.bag" v-html="error" />
            </b-alert>
        </div>

        <div class="file-uploader__list mt-1">
            <div class="file-uploader__list--item" v-for="(file,index) in files">
                <span>{{ file.name }}</span>
                <font-awesome-icon class="file-uploader__list--icon"
                                   icon="trash"
                                   @click="remove(index)"
                                   v-if="!processing" />
            </div>
        </div>

    </div>
</template>

<script>
    import ColorMixin from '../../mixins/ColorConverter';
    import ErrorMixin from '../../mixins/Errors';

    export default {
        name: "file-loader",
        props: [
          'bgColor',
          'formats',
          'processing'
        ],
        mixins: [
          ColorMixin,
          ErrorMixin
        ],
        data() {
            return {
                files: [],
                fileErrors: ['test'],
                showError: false,
                error: {
                    bag: [],
                    visibility: false
                }
            }
        },
        computed: {
            shadedBg() {
                return this.shadeHexColor(this.bgColor);
            },
            disabled() {
                return this.processing || this.files.length === 5;
            }
        },
        watch: {
            'error.bag'() {
                if(Boolean(this.error.bag.length)) {
                    this.error.visibility = true;
                }
            }
        },
        methods: {
            hideErrors() {
                this.error = {
                    bag: [],
                    visibility: false
                };
            },
            validate() {
                this.hideErrors();

                if(!this.files.length) {
                    this.error.bag.push('Please, select the files to handle.');
                    return false;
                }

                return true;
            },
            remove(removed) {
                this.files = this.files.filter((item, index) => {
                    return index !== removed;
                });
            },
            validateFileSet(files) {
                for(let i = 0; i < files.length; i++ ){
                    if(this.formats.includes(files[i].type)) {
                        if(files[i].size < 10 ** 6) {
                            this.files.push(files[i]);
                            this.$emit('change');
                            continue;
                        }
                        this.error.bag.push(`The <b>${ files[i].name }</b> is too large.`);
                    }
                    else {
                        this.error.bag.push(`Type of the <b>${ files[i].name }</b> is not allowed.`);
                    }
                }
            },
            uploadFile(event) {
                new Promise(() => {
                    this.validateFileSet(event.target.files);
                }).then(() => {
                    this.$refs.clickLoader.value = null;
                });
            },
            setInputEvents() {
                let events = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'];
                events.forEach( function(item) {
                    this.$refs.ddLoader.addEventListener(item, function(e){
                        e.preventDefault();
                        e.stopPropagation();
                    }.bind(this), false);
                }.bind(this));
            },
            addEventListener() {
                this.$refs.ddLoader.addEventListener('drop', function(e){
                    if(!this.disabled) {
                        this.validateFileSet(e.dataTransfer.files);
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

<style lang="scss" scoped>


    .file-list {
        .file-item {
            position: relative;
            border: 1px solid grey;
            line-height: 36px;
            padding: 0 15px;
            border-radius: 2px;
            box-shadow: -2px 1px 3px -2px rgba(0,0,0,0.75);
            margin-bottom: 8px;
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