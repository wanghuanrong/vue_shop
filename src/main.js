import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

// 图标iconfont文件
import '@/assets/iconfont/iconfont.css'
import '@/assets/css/global.css'

// 导入表格树
import TreeTable from 'vue-table-with-tree-grid'

// 设置全局的axios
import axios from 'axios'

// 配置请求的根路径
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
// 在token验证的时候需要把token传到后台，这里就使用到了拦截器，把token赋给 config.headers.Authorization 传到后台
axios.interceptors.request.use(config => {
  console.log(config);

  config.headers.Authorization = sessionStorage.getItem("token");

  return config;
})


Vue.prototype.$http = axios

Vue.config.productionTip = false

// 组件全局注册 表格树
Vue.component('tree-table', TreeTable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
