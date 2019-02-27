<template>
    <file-picker-button :config="gConfig" @picked="load">
         Google Drive
    </file-picker-button>
</template>

<script>
    import FilePickerButton from 'vue-google-picker';

    export default {
        name: "google-picker",
        components: {
            FilePickerButton
        },
        created() {
            this.gConfig = this.$configs.GOOGLE_API;
        },
        methods: {
            load (data) {
                if(data.action === 'picked') {
                    let docs = [];
                    data.docs.forEach(item => {
                        docs.push({
                            name: item.name,
                            type: item.mimeType,
                            size: item.sizeBytes,
                            lastModified: item.lastEditedUtc
                        })
                    });
                    this.$emit('picked', docs);
                }
            }
        }
    }
</script>