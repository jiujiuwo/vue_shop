import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 使用树形列表组件
import ZkTable from 'vue-table-with-tree-grid'
// 导入全局样式
import './assets/css/global.css'

// 导入http请求库
import axios from 'axios'

// 设置请求的根路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

// 配置请求拦截器，每次请求时添加token字段
axios.interceptors.request.use(config => {
  let tokenStr = window.sessionStorage.getItem('token') // 如果token不存在可能会报错
  if (!tokenStr) {
    tokenStr = ''
  }
  config.headers.Authorization = tokenStr
  // console.info(config)
  // 最后必须return config
  return config
})

// 将axios挂在到Vue的原型对象上,这样每一个组件都可以通过this直接访问到 $http
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(ZkTable)
Vue.component(ZkTable.name, ZkTable)
