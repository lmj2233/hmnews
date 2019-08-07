<template>

  <van-popup v-model="isShow" position="bottom" :style="{height:'75%'}">
     <van-cell>
      <div slot="icon">
        <img class="avatar" :src="commentTop.aut_photo" alt="">
      </div>
      <div slot="title">
        <span>{{commentTop.aut_name}}</span>
        <van-tag>楼主</van-tag>
      </div>
      <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <div slot="label">
        <p>{{commentTop.content}}</p>
        <p>
          <span>{{commentTop.pubdate | relativeTime}}</span>
        </p>
      </div>
    </van-cell>
    <hr>
    <!-- 这条评论的回复列表 -->
    <comment-list :source="commentTop.com_id.toString()" :isComment="false"></comment-list>
    <!-- 发布评论 -->
    <add-comment class="add-comment" :target="commentTop.com_id.toString()" :article="article_Id"></add-comment>
  </van-popup>
</template>

<script>
import eventBus from '@/utils/eventBus.js'
import CommentList from './comment-list.vue'
import AddComment from './add-comment.vue'

export default {
  name: 'ReplyList',
  components: {
    CommentList,
    AddComment
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    article_Id: {
      type: [Number, String]
    }
  },
  data () {
    return {
      isShow: false,
      commentTop: {
        com_id: ''
      }
    }
  },
  created () {
    //  绑定事件
    eventBus.$on('isShow', item => {
      this.isShow = true
      this.commentTop = item
      // console.log(item)'
    })
  },
  //  清除组件缓存
  deactivated () {
    this.$destroy()
  }
}
</script>

<style lang='less' scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>
