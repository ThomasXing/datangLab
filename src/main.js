// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
require('./assets/css/base.less')
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios;
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// axios.interceptors.request.use(
//     config => {
//         if (store.state.userId) {
//             config.headers.Authorization = `token ${store.state.token}`;
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });


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
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.userId) {  // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/home',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else{
    next()
  }
})
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
