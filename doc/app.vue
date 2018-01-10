<template>
    <div id="components-layout-demo-top-side">
        <v-layout>
            <v-header>
                <div class="logo"></div>
                <v-menu theme="dark" mode="horizontal" :data="menuData1" style="line-height: 64px"></v-menu>
            </v-header>
            <v-layout>
                <v-sider :width="200" style="background: #fff">
                    <v-menu mode="inline" :data="menuData2" style="height:100%"></v-menu>
                </v-sider>
                <v-layout style="padding:0 24px 24px">
                    <v-breadcrumb style="margin:12px 0">
                        <v-breadcrumb-item>Home</v-breadcrumb-item>
                        <v-breadcrumb-item href="">List</v-breadcrumb-item>
                        <v-breadcrumb-item href="">App</v-breadcrumb-item>
                    </v-breadcrumb>
                    <v-content style="background: #fff; padding: 24px; margin: 0; min-height: 280px">Content1111</v-content>
                </v-layout>
            </v-layout>
        </v-layout>
    </div>
</template>

<style lang="postcss">
    #components-layout-demo-top-side{
        height: 100%;
        overflow-y:auto;
    }
    #components-layout-demo-top-side .logo {
        width: 120px;
        height: 31px;
        background: #333;
        border-radius: 6px;
        margin: 16px 28px 16px 0;
        float: left;
    }
    #components-layout-demo-top-side .ant-layout {
       height: 100%;
        overflow-y:auto;
       
    }
</style>
<script>
    export default {
        data() {
            return {
                menuData1: [{
                    name: '移动端组件',
                    selected: true
                },{
                    name: 'Chart', 
                }],
                menuData2: [{
                    name: '卡片',
                    icon: 'user',
                    expand: true,
                    children: [{
                        selected: true,
                        name: 'yx-card',
                        type: 'item',
                        father: '流水账管理',
                        router: {
                        name: 'CheckMoney'
                        }
                        
                    },{
                        name: 'yx-card-details'
                    },{
                        name: 'yx-card-chart'
                    }]
                },{
                    name: '按钮',
                    icon: 'laptop',
                    children: [{
                        name: 'yx-tags-button'
                    },{
                        name: 'yx-date-button'
                    },{
                        name: 'yx-sort-button'
                    }]
                },{
                    name: '对象',
                    icon: 'notification',
                    children: [{
                        name: 'yx-moneyflow'
                    },{
                        name: 'yx-accounts'
                    },{
                        name: 'yx-contacts'
                    }]
                },
                {
                    name: '列表',
                    icon: 'notification',
                    children: [{
                        name: 'yx-list'
                    },{
                        name: 'yx-checkbox-list'
                    },]
                },
                {
                    name: '时间',
                    icon: 'notification',
                    children: [{
                        name: 'yx-date-range'
                    }]
                }
                
                
                ]
            }
        }
    }
</script>