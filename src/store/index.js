
// 1. 导入 vue vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 5. 导入所用到的仓库
import channels from './modules/channels'
import loginUser from './modules/loginUser'

// 2. 安装vuex
Vue.use(Vuex)

// 3. 创建共享数据仓库
const store = new Vuex.Store({
  modules: {
    channels,
    loginUser
  }
})

// 4. 导出Vuex
export default store