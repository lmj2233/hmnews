import axios from 'axios'
import store from '@/store.js'
// 导入数据超限处理
import JSONBig from 'json-bigint'

// 挂载到axios的实例对象
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',

  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // console.log(config)
  // 判断是否要登录，若要登录就给添加请求头
  // if (config.url !== '/app/v1_0/authorizations') {
  //   // 获取请求头
  //   const { user } = store.state
  //   // 有token并执行添加头部操作
  //   user && (config.headers.Authorization = `Bearer ${user.token}`)
  // }

  // 简单写法
  const { user } = store.state
  config.url !== '/app/v1_0/authorizations' && user && (config.headers.Authorization = `Bearer ${user.token}`)
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 如果响应结果对象中有 data，则直接返回这个 data 数据
  // 如果响应结果对象中没有 data，则不作任何处理，直接原样返回这个数据
  return response.data.data || response.data
}, function (error) {
  return Promise.reject(error)
})

export default request
