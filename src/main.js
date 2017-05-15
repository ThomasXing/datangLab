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
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
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
