/**
 * 用户登录信息  共享数据
 */
import { login, whoAmI, loginOut } from "network/userService"

export default {
  namespaced: true,
  state: {
    data: null,
    isLoading: false
  },
  // 修改状态的唯一途径
  mutations: {
    // 修改 data数据状态
    setData(state, payload) {
      state.data = payload
    },
    // 修改加载动画 数据状态
    setIsLoading(state, payload) {
      state.isLoading = payload
    }
  },
  /**           处理异步修改状态  action
   * 1. 将登录的用户信息状态  存放到state中的data中
   * 2. 使用记住密码登录 获取localStorage 中的令牌登录
   * 3. 注销账号   删除localStorage 中的令牌信息、将data设为空
   */
  actions: {
    async login(context, payload) {
      context.commit('setIsLoading', true)
      let res = await login(payload);
      // 记录登录状态 是否成功
      let result = false
      if (res.code === 0) {
        // 登录成功
        context.commit('setData', res.data)
        result = true
      }
      context.commit('setIsLoading', false)
      return result;
    },
    async whoAmI(context) {
      context.commit('setIsLoading', true)
      let res = await whoAmI()
      context.commit('setData', res)
      context.commit('setIsLoading', false)
    },
    loginOut(context) {
      loginOut()
      context.commit('setData', null)
    }
  }
}