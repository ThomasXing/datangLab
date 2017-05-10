<template>
    <div class="labman">
        <HeadView></HeadView>
        <div>
    
            <ul class='labman-menu'>
                <li>
                    <router-link to='/labman/course' class='labman-menu-item'>
                        课程管理
                    </router-link>
                </li>
                <li>
                    <router-link to='/labman/classs' class='labman-menu-item'>
                        班级管理
                    </router-link>
                </li>
                <li>
                    <router-link to='/labman/xueji' class='labman-menu-item'>
                        学籍管理
                    </router-link>
                </li>
            </ul>
    
            <div class="labman-box">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import HeadView from '../components/Head'
export default {
    name: 'labman',
    data() {
        return {

        }
    },
    created() {
        this.$store.dispatch('SET_TITLE', '实验室管理平台')
    },
    components: {
        HeadView
    },
    watch:{
        $route(to,from){
        // console.log(to,from)
    }
}
}
</script>
<style lang='less'>
.labman {
    &-menu {
        background: #383e4c;
        width: 10%;
        height: 800px;
        color: #fff;
        font-size: 14px;
        font-family: "微软雅黑";
        padding-top: 36px;
        float: left;
        &-item {
            display: block;
            height: 50px;
            text-align: center;
            line-height: 50px;
            color: #ffffff;
        }
        .router-link-active {
            background: #1e222d;
            position: relative;
        }
        &-item.router-link-active:before {
            content: '';
            width: 10px;
            height: 50px;
            background: #0491cd;
            position: absolute;
            left: 0;
        }
    }
    &-box {
        float: left;
        width: 90%;
    }
}
</style>