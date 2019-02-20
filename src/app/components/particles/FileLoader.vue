<template>
    <div class="file-loader">
        <div class="container mt-3">
            <label class="btn btn-primary btn-file">
                Browse
                <input class="file-input"
                       type="file"
                       :accept="allowedFormats"
                       ref="loader" style="display: none;"
                       @change="uploadFile">
            </label>

        </div>
        <div class="list mt-3">
            <div v-for="file in files">
                {{ file.name }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "file-loader",
        data() {
            return {
                fileContainer: null,
                files: []
            }
        },
        computed: {
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
        },
        methods: {
            uploadFile(event) {
                let fileList = event.target.files;
                this.files.push(fileList[0]);
                this.$refs.loader.value = null;
            }
        }
    }
</script>

<style scoped>

</style>