<template>
    <file-picker-button :config="gConfig" @picked="load" class="picker-btn">
        <font-awesome-icon :icon="['fab', 'google-drive']" />
        <span class="google-picker-btn--text">Google Drive</span>
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
            this.gConfig = $configs.GOOGLE_API;
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