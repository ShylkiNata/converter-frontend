<template>
    <file-picker-button :config="gConfig" @picked="showDetails">
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
            showDetails (data) {
                if(data.action === 'picked') {
                    console.log(data.docs)
                }
            }
        }
    }
</script>