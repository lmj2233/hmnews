// 封装用户相关的数据请求
// 用户相关接口封装模块
import request from '@/utils/request.js'

export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 关注用户
export const followUser = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 取消关注
export const unfollowUser = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

// 获取当前用户基本信息
export const getCurrentUserInfo = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`
  })
}

// 获取获取用户个人资料
export const getCurrentUserProfile = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/profile`
  })
}

// 编辑用户个人资料（包含实名认证）
/**
 *    name	string	非必须		昵称
      photo	string	非必须		头像 base64编码处理
      gender	integer	非必须		性别，0-男，1-女
      birthday	string	非必须		生日，格式'2018-12-20'
      real_name	string	非必须		真实姓名
      id_number	string	非必须		身份证号
      id_card_front	string	非必须		身份证正面照片 base64编码处理
      id_card_back	string	非必须		身份证背面照片 base64编码处理
      id_card_handheld	string	非必须		手持身份证照片 base64编码处理
      intro	string	非必须		个人介绍
 */
export const editCurrentUserProfile = ({
  name,
  photo,
  gender,
  birthday,
  real_name,
  id_number,
  id_card_front,
  id_card_back,
  id_card_handheld,
  intro
}) => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/profile`,
    data: {
      name,
      photo,
      gender,
      birthday,
      real_name,
      id_number,
      id_card_front,
      id_card_back,
      id_card_handheld,
      intro
    }
  })
}
