// 封装用户相关的数据请求
// 用户相关接口封装模块
import request from '@/utils/request.js'

export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
