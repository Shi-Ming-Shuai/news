import Vue from 'vue'
import App from './App.vue'

// 导入vue-router  导入vuex
import router from './router'
import store from './store'

// vuex  网页一开始发出指定 让actions中的 请求数据开始运行
store.dispatch('channels/fetchDatas')
store.dispatch('loginUser/whoAmI')    //读取本地存储 是否有保存密码

//导入全局样式
import 'assets/css/global.css'
import 'assets/css/reset.css'

//添加事件总线
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

