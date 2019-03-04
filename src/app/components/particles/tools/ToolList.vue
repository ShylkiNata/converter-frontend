<template>
    <div class="tools--list">
        <div class="tools--list__header">
            {{ header }}
        </div>
        <div class="tools--list__body">
            <div class="tool--list__item" v-for="item in items"
                 :style="{'background-color': item.color}"
                 @click="toItemPage(item.type)">
                <div class="item--body">
                    <font-awesome-icon :icon="item.icon" class="item--body__icon"/>
                    <div>{{item.type}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ToolList",
        props: [
            'header', 'items'
        ],
        computed: {
          authorized() {
              return this.$store.state.user;
          }
        },
        methods: {
            toItemPage(type) {
                if(!this.authorized) {
                    this.$router.push({
                        name: 'Sign In'
                    });
                    return ;
                }

                this.$router.push({
                    name: 'Loading Page',
                    params: this.getParams(type)
                });
            },
            getParams(type) {
                return {
                    tool: this.header.toLowerCase(),
                    type: type.toLowerCase().replace(/ /gi, '-')
                };
            }
        }
    }
</script>