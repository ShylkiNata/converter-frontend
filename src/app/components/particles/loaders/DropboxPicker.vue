<template>
    <div class="btn btn-outline-primary" @click="pick">

    </div>
</template>

<script>
    export default {
        name: "dropbox-picker",
        methods: {
            pick() {
                Dropbox.choose({
                    success: (files) => this.choose(files),
                    multiselect: true,
                    extensions: allowedFormats
                });
            },
            choose(files) {
                console.log(files);
            }
        }
    }
</script>