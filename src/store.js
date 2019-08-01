import Vue from 'vue'
import Vuex from 'vuex'
// 导入 本地存储的token *代表一切
import * as auth from '@/utils/auth.js'
Vue.use(Vuex)

// 导出store
export default new Vuex.Store({
  state: {
    // 获取本地存储的token，防止页面刷新的时候token丢失
    // 取出token
    user: auth.getUser()
  },
  mutations: {
    // 作用：登录是2重新获取新的token，将原来存储的token替换掉
    setUsertoken (state, data) {
      // 更新token
      // state：旧的token值
      // data：新的token值
      state.user = data
      // 重新设置token的值，将新token存储到本地
      auth.setUser(state.user)
    }

  },
  actions: {

  }
})
