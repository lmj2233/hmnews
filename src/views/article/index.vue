<template>
  <div class="article">
    <!-- 导航 -->
    <van-nav-bar title="黑马头条" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
    <div>
      <!-- 文章标题 -->
      <h2 class="article-title">{{article.title}}</h2>
      <!-- 作者信息 -->
      <auth-info :article="article"></auth-info>
      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content">

      </div>
      <!-- 更多操作 -->
      <more-action></more-action>
      <!-- 评论列表 -->
      <!-- <comment-list :article="article"></comment-list> -->
      <comment-list :source="article_Id"></comment-list>

      <!-- 回复列表 -->
      <!-- <replay-list v-show="isShowReply"></replay-list> -->
      <replay-list :article_Id="article_Id"></replay-list>
      <add-comment :target="article_Id"></add-comment>
    </div>
  </div>
</template>

<script>
import AuthInfo from './components/auth-info.vue'
import MoreAction from './components/more-action.vue'
import CommentList from './components/comment-list.vue'
import ReplayList from './components/replay-list.vue'
import AddComment from './components/add-comment.vue'

import { getArticleByAtrId } from '@/api/article.js'

export default {
  name: 'ArticleIndex',
  components: {
    AuthInfo,
    MoreAction,
    CommentList,
    ReplayList,
    AddComment
  },
  data () {
    return {
      article: {
        title: '嘉禾博研：备考2020年清华、北大、人大MBA第一批提前面试开始啦'
      },
      isShowReply: false
    }
  },
  computed: {
    article_Id () {
      return this.$route.params.articleId
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      const data = await getArticleByAtrId(this.article_Id)
      this.article = data
      // console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  // padding: 20px;
  .article-title {
    font-size: 40px;
    font-weight: 400px;
  }
  .article-content {
    font-size: 20px;
  }
}
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
