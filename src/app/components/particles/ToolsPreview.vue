<template>
    <div class="form mt-3">
        <tool-list
                header="Converters"
                :items="converters"
        />
        <div class="mt-3"></div>
        <tool-list
                header="Compressors"
                :items="compressors"
        />
    </div>
</template>

<script>
    import ToolsMixin from "../../mixins/ToolList";
    import ToolList from "./ToolList";

    export default {
        name: "tools-preview",
        components: {
            ToolList
        },
        mixins: [
            ToolsMixin
        ],
    }
</script>
