// 1. 导入vue-router
import Vue from 'vue'
import Router from 'vue-router'
import config from './config'
import store from '../store'

// 2. 使用vue.use安装vue-router
Vue.use(Router)

// 3.配置vue-router
const router = new Router(config)

// 导航守卫   全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 判断是否登录用户  如果没有则不能访问 跳转授权页面
    if (store.state.loginUser.isLoading) {
      next({ name: 'Auth', query: { returnUrl: to.path } })
    }
    else if (store.state.loginUser.data) {
      next()
    }
    else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})
// 4. 导出vue-router
export default router
