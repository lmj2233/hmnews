// 获取频道列表数据
// 若未登录，用户名为空
import request from '@/utils/request.js'

export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 获取所有的频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 批量修改频道(重置式)
export const resetUserChannels = channels => {
  return request({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data: {
      channels: channels
    }
  })
}

// 删除用户指定频道
// /app/v1_0/user/channels/:target
export const deleChannelById = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
