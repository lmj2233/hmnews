import request from '@/utils/request.js'

// 获取文章列表
export const getArticles = ({
  channel_id,
  timestamp,
  with_top
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: { // query传参
      channel_id, // 频道id
      timestamp, // 时间戳
      with_top // 是否包含置顶，1含置顶，0不含置顶
    }
  })
}

// 对文章不感兴趣
export const dislikeArticle = articleID => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: { // query传参
      target: articleID
    }
  })
}

// 举报文章
export const reportArticle = ({ articleID, type, remark = '' }) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/reports',
    data: { // query传参
      target: articleID,
      type,
      remark
    }
  })
}

// 获取文章详情
export const getArticleByAtrId = article_id => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${article_id}`
  })
}
