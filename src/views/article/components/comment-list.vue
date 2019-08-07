<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in comments" :key="index">
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt="">
        </div>
        <div slot="title">
          <span>{{item.aut_name}}</span>
        </div>
        <div slot="default">
          <van-button icon="like-o" size="mini" plain>赞</van-button>
        </div>
        <div slot="label">
          <p>{{item.content}}</p>
          <p>
            <span>{{item.pubdate | relativeTime}}</span>
            ·
            <span @click="handleRplay(item)">回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getCommont } from '@/api/comment.js'
// 事件总线
import eventBus from '@/utils/eventBus.js'

export default {
  name: 'CommentList',
  props: {
    /**
     * source
     * 文章id或评论id
     * 需要哪个就传哪个
     *  */
    source: {
      type: [Number, String],
      required: true
    },
    // 接收回复评论列表的数据
    isComment: {
      type: Boolean,
      default: true
    }
    // article: {
    //   type: Object,
    //   default: () => {}
    // },
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      comments: [],
      offset: null
    }
  },
  computed: {
    articleId () {
      return this.$route.params.articleId
    }
  },
  created () {},
  methods: {
    // 显示回复评论
    handleRplay (item) {
      // 触发事件回复评论组件，将该条评论的信息传递给回复评论
      eventBus.$emit('isShow', item)
    },
    async onLoad () {
      // 延时
      this.$sleep(800)
      const data = await getCommont({
        source: this.source,
        offset: this.offset,
        isComment: this.isComment
      })
      // console.log(data)
      // 没有数据
      if (!data.results.length) {
        // 加载完成
        this.loading = false
        this.finished = true
      }
      // 有数据
      if (data.results.length) {
        // 把10个数据添加给列表
        this.comments.push(...data.results)
        // 更新页面=> 设置偏移量offset
        this.offset = data.last_id
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>
