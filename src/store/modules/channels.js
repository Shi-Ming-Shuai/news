
import { getNewsChannels } from 'network/NewsService'

export default {
  namespaced: true, //开启命名空间
  state: {
    channels: [],
    isLoading: false
  },
  mutations: {
    // 设置加载动画是否显示
    setLoading(state, payload) {
      state.isLoading = payload
    },
    setData(state, payload) {
      // 设置网络请求获取的数据
      state.channels = payload
    }
  },
  actions: {
    async fetchDatas(context) {
      // 没请求到的时候 显示加载东湖
      context.commit('setLoading',true)
      let res = await getNewsChannels()
      // 将请求到的数据 通过mutaions 改变共享数据状态
      context.commit('setData',res)
      // 请求完成 状态中有展示的数据  关闭加载动画
      context.commit('setLoading',false)

    }
  }
}