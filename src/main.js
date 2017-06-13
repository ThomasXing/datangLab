// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import qs from 'qs'
import store from './store/index'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
require('./assets/css/base.less')
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// axios.interceptors.request.use(function (config) {  //配置发送请求的信息
//   stores.dispatch('showLoading')  
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });

axios.interceptors.response.use(function (res) { //配置请求回来的信息
 
  if (res.data.loginFlag === "fail") {
    store.dispatch("RE_LOGIN")
  }

  return res;
}, function (error) {
  if (error.message === "Network Error" || new XMLHttpRequest().status == 0) {
    this.$alert('网络错误', '提示信息', {
      confirmButtonText: '确定',
    });
  }
  return Promise.reject(error);
});
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }

})
