<template>
    <div class="picker-btn" @click="pick">
        <font-awesome-icon :icon="['fab', 'dropbox']" />
        <span class="google-picker-btn--text">Dropbox</span>
    </div>
</template>

<script>
    export default {
        name: "dropbox-picker",
        props: [
            "formats"
        ],
        methods: {
            pick() {
                Dropbox.choose({
                    success: (files) => this.choose(files),
                    multiselect: true,
                    extensions: this.formats
                });
            },
            choose(files) {
                console.log(files);
            }
        }
    }
</script>