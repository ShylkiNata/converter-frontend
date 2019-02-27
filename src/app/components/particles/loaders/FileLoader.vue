<template>
    <div class="file-uploader">

        <form ref="ddLoader" :style="{'background-color': bgColor}"
              class="file-uploader__drag-drop">

            <div class="file-uploader--shadow" :style="{'background-color': shadedBg }">
                <span class="file-uploader__drag-drop__title">
                    <div class="file-uploader__drag-drop__icon">
                        <font-awesome-icon icon="file-upload" />
                    </div>
                    <div>
                        Drop file here
                    </div>
                    <div>
                        <u>Choose file</u>
                    </div>
                </span>
                <input class="file-uploader__input"
                       type="file"
                       title="" multiple
                       :disabled="processing"
                       :accept="formats"
                       ref="clickLoader"
                       @change="uploadFile">
            </div>
        </form>
        <div class="file-uploader--external">
            <google-picker />
            <div> dropbox </div>
        </div>

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
    import ColorMixin from '../../../mixins/ColorConverter';
    import ErrorMixin from '../../../mixins/Errors';
    import GooglePicker from "./GooglePicker";

    export default {
        name: "file-loader",
        components: {
            GooglePicker
        },
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
                this.$emit('change');
            },
            isDuplicated(file) {
                for(let i = 0; i < this.files.length; i++) {
                    let f = this.files[i];

                    if(f.name === file.name && f.lastModified === file.lastModified &&
                       f.type === file.type && f.size === file.size) {

                        return true;
                    }
                }

                return false;
            },
            validateFileSet(files) {
                for(let i = 0; i < files.length; i++){
                    if(this.isDuplicated(files[i])) {
                        this.error.bag.push(`The file <b>${files[i].name}</b> already loaded.`);
                        continue;
                    }
                    if(this.files.length === 5) {
                        this.error.bag.push('Not allowed to load more than 5 files.');
                        return;
                    }
                    if(this.formats.includes(files[i].type)) {
                        if(files[i].size < 8*(10**7)) {
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
                    if(!this.processing) {
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