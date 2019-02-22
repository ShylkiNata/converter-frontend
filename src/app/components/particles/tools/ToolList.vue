<template>
    <div class="tools-form">
        <div class="header">
            {{ header }}
        </div>
        <div class="list">
            <div class="converter-item" v-for="item in items"
                 :style="{'background-color': item.color}"
                 @click="toItemPage(item.type)">
                <div class="converter-item-body">
                    <font-awesome-icon :icon="item.icon" class="converter-icon"/>
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

<style lang="scss">
    .tools-form {
        .header {
            text-align: center;
            font-size: 20px;
            line-height: 80px;
            font-weight: 700;

            opacity: 0;
            animation: headerIn 2s ease-out forwards;
            animation-delay: 0.1s;
        }

        @keyframes headerIn{
            0%{
                letter-spacing: -17px;
                opacity: 0;
            }
            30%{
                letter-spacing: 4px;
                opacity: 1;
            }
            100%{
                letter-spacing: 4px;
                opacity: 1;
            }
        }

        .list {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }
        .converter-item {
            background-color: #f1f1f1;
            border-radius: 10px;
            width: 180px;
            height: 180px;
            margin: 1px;
            text-align: center;
            font-size: 18px;
            cursor: pointer;
            color: #fff;
            font-weight: 600;
            line-height: 50px;

            opacity: 0;
            animation: fade-in-right 1s ease-out forwards;
            animation-delay: 0.1s;

            .converter-item-body {
                margin-top: 50px;

                .converter-icon {
                    font-size: 45px;
                }
            }

            &:hover {
                box-shadow: -2px 1px 12px -2px rgba(0, 0, 0, 0.75);
            }

            @keyframes fade-in-right {
                from {
                    opacity: 0;
                    transform: translateX(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        }

        @media (max-width: 767px) {
            flex-direction: column;
        }
    }
</style>