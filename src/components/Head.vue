<template>
  <div class="lab-header basebg">
    <a href="#" class="lab-logo fl"><img src="../assets/images/logo_1.png" alt="logo"></a>
    <span class="lab-name fl">{{title}}</span>
    <div class="user fr">
      <a href="javascript:;" class="fl" @click="userCheck">{{userid}}</a><a href='' class="exit fl">退出</a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      userid:''
    }
  },
  created(){
    this.userid = sessionStorage.getItem('userid')
  },
  computed:{
    ...mapGetters(
      ['title']
    )
  },
  methods:{
    userCheck(){
      this.$router.push({path:'/cultivate/stubasenews'})
    }
  }

}
</script>
<style lang='less' scoped>
.lab-header {
  height: 50px;
  line-height: 50px;
  color: #ffffff;
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  & .lab-logo {
    margin: 7px 20px;
  }
  & .lab-name {
    font-size: 24px;
  }
  & .user {
    font-size: 17px;
    a {
      color: #ffffff;
      box-sizing: border-box;
      height: 50px;
    }
    a:hover {
      border-bottom: 4px solid #ffffff;
    }
    & .exit {
      margin-right: 91px;
      margin-left: 56px;
    }
  }
}
</style>