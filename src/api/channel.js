// 获取频道列表数据
// 若未登录，用户名为空
import request from '@/utils/request.js'

export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
