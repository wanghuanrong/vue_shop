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


// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

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


// 全局注册富文本编辑器
Vue.use(VueQuillEditor)


// 全局时间过滤器
Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
