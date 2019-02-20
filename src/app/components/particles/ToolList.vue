<template>
    <div class="tools-form">
        <div class="header">
            {{ header }}
        </div>
        <div class="list">
            <div class="converter-item" v-for="item in items"
                 :style="{'background-color': item.color}"
                 @click="toItemPage(item.type)">
                <div>{{item.icon}}</div>
                <div>{{item.type}}</div>
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
              return true;
          }
        },
        methods: {
            toItemPage(type) {
                if(!this.authorized) {
                    this.$router.push({
                        name: 'Sign Up'
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

<style lang="scss">
    .tools-form {
        .header {
            font-size: 20px;
            line-height: 80px;
            font-weight: 700;
        }
        .list {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }
        .converter-item  {
            background-color: #f1f1f1;
            width: 180px;
            height: 180px;
            margin: 1px;
            text-align: center;
            line-height: 75px;
            font-size: 18px;
            cursor: pointer;
            color: #fff;
            font-weight: 600;

            &:hover {
                box-shadow: -2px 1px 12px -2px rgba(0,0,0,0.75);
            }
        }

        @media (max-width: 767px) {
            flex-direction: column;
        }
    }
</style>