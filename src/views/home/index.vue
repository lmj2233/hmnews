<template>
  <div class="home">
    <!-- 导航 -->
    <van-nav-bar title="首页" fixed />
    <!-- 标签栏 tab -->
    <van-tabs v-model="activeIndex" class="channels-tabs">

      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 列表数据必须要放到刷新标签里面 -->
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>-->

        <van-pull-refresh v-model="item.downPullLoading" @refresh="onRefresh" :success-text="item.successRefreshText">
          <van-list
            v-model="item.upPullLoading"
            :finished="item.upPullFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="item in activeChannel.articles" :key="item.art_id.toString()" :title="item.title">
              <div slot="label">
                <template >
                  <van-grid :border="false" :column-num="3" v-show="item.cover.type!=0">
                    <van-grid-item v-for="(val,index) in item.cover.images" :key="index">
                      <van-image :src="val" lazy-load />
                    </van-grid-item>
                  </van-grid>
                  <p>
                    <span>作者:{{item.aut_name}}</span>
                    &nbsp;
                    <span>评论 :{{item.comm_count}}</span>
                    &nbsp;
                    <span>时间:{{item.pubdate | relativeTime}}</span>
                    &nbsp;
                  <van-icon name="cross" @click="handleShowMoreAction(item)"/>
                  </p>
                </template>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 更多操作 -->
    <more-action v-model="isShow" :currentArticle="currentArticle" @dislike-success="handleDislikeSuccess"></more-action>
  </div>
</template>

<script>
import store from '@/store.js'
// 导入频道列表
import { getChannels } from '@/api/channel.js'
// 导入文章列表
import { getArticles } from '@/api/article.js'
// 导入 mapstore
import { mapState } from 'vuex'
// 导入组件 更多操作
import MoreAction from '@/views/home/components/more-action.vue'

export default {
  name: 'homeindex',
  components: { MoreAction },
  data () {
    return {
      // 默认选中的列表项的下标
      activeIndex: 0,
      // 列表数据
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      channels: [],
      isShow: false,
      // 当前文章
      currentArticle: null
    }
  },
  created () {
    this.loadChannels()
  },
  computed: {
    // 声明复杂数据类型
    // 获取当前文章的频道, 当获取当前频道的id，默认选中和id一样,
    activeChannel () {
      return this.channels[this.activeIndex]
    },
    // user
    ...mapState(['user'])
  },
  watch: {
    // 监视，检测数据变化 user中的数据是否发生变化
    user (newV, oldV) {
      // 重新获取频道列表
      this.loadChannels()
      // 手动触发下拉列表布尔值为true——下拉状态获取数据
      this.activeChannel.downPullLoading = true
      // 手动更新文章列表数据
      this.loadArticles()
    }
  },
  methods: {
    // 更新视图，将不喜欢的文章删除
    handleDislikeSuccess () {
      // 在所有文章中寻找当前文章的id
      const AllArticles = this.activeChannel.articles
      const disIndex = AllArticles.findIndex(item => item === this.currentArticle)
      // 将该文章对应的文章删除
      AllArticles.splice(disIndex, 1)
    },
    // 更多操作-打开弹框
    handleShowMoreAction (item) {
      this.currentArticle = item
      this.isShow = true
    },
    // 获取频道列表
    async loadChannels () {
      // const { user } = store.state
      // // 用户没有登录
      // if (!user) {
      // 获取本地存储的频道
      //   const localChannel = JSON.parse(window.localStorage.getItem('channels'))
      //   console.log(localChannel)
      //   if (localChannel) {
      //     // 有本地存储
      //     this.channels = localChannel
      //   } else {
      //     // 没有本地存储
      //     const data = await getChannels()
      //     // console.log(data)
      //     this.channels = data.channels
      //   }
      // } else {
      //   // 用户登录了
      //   const data = await getChannels()
      //   // console.log(data)
      //   this.channels = data.channels
      //   console.log(this.channels)
      // }
      // 简化
      // 获取本地存储
      const localChannel = JSON.parse(window.localStorage.getItem('channels'))
      const { user } = store.state
      // 用户没有登录 && 有本地存储
      if (!user && localChannel) {
        this.channels = localChannel
      }
      // 用户没有登录,获取默认频道 || (没有本地存储 && 登录了)
      if (!user || (!localChannel && user)) {
        const data = await getChannels()
        // 设计，创建符合频道要求的新数据
        data.channels.forEach(item => {
          item.articles = [] // 当前频道的文章列表所有数据
          item.downPullLoading = false // 当前频道下拉状态
          item.upPullLoading = false // 当前频道上拉加载更多
          item.upPullFinished = false // 当前频道加载完毕
          item.timestamp = Date.now() // 用来保存每个频道item自己的文章列表数据对应的时间戳
          item.successRefreshText = '' // 下拉成功的文本提示
        })
        this.channels = data.channels
        // console.log(this.channels)
      }
    },
    async onRefresh () {
      // 下拉刷新获取最新数据
      // 可以简化代码
      // const { activeChannel } = this
      // 获取最新的时间戳
      this.activeChannel.timestamp = Date.now()
      // 根据最新时间戳发送请求获取最新数据
      const data = await this.loadArticles()
      // console.log(data)   => pre_timestamp  results

      if (data.results.length) {
        // 如果有最新数据，就进行刷新重置数据，
        this.activeChannel.articles = data.results
        // 更新时间戳
        this.activeChannel.timestamp = data.pre_timestamp
        // 进行更新成功的提示
        this.activeChannel.successRefreshText = '刷新成功'
      } else {
        // 没有最新数据，就提示已经是最新数据
        this.activeChannel.successRefreshText = '已经是最新数据'
      }
      // 关闭动画
      this.activeChannel.downPullLoading = false

      // setTimeout(() => {
      //   this.$toast('刷新成功')
      //   // 修改loading的值
      //   this.activeChannel.downPullLoading = false
      //   // this.count++
      // }, 500)
    },
    // 获取当前激活的文章列表
    async loadArticles () {
      // 获取当前的id 调用计算属性中获取的id
      const { id: channel_id, timestamp } = this.activeChannel
      const data = await getArticles({
        channel_id,
        timestamp,
        with_top: 1
      })
      // console.log(data)
      return data
    },
    // 列表加载，自动执行
    // 上拉加载更多
    async onLoad () {
      // 加载延时
      await this.$sleep(800)

      // 发送请求当前激活的文章数据 loadArticles()
      let data = []
      data = await this.loadArticles()
      // console.log(data)
      // 如果没有数据，就配置时间戳，将之前的历史时间戳
      if (data.pre_timestamp && data.results.length === 0) {
        // 将之前的时间戳赋值给当前激活的文章列表
        this.activeChannel.timestamp = data.pre_timestamp
        // 更新data文章数据
        data = await this.loadArticles()
        // console.log('-------')
        // console.log(data)
      }

      // 当没有数据时，显示已加载完毕,(属性对应，关闭文章列表自定义添加的属性)
      if (!data.pre_timestamp && !data.results.length) {
        this.activeChannel.upPullLoading = false // 当前频道上拉加载更多
        this.activeChannel.upPullFinished = true // 当前频道加载完毕
        return
      }

      // 更新时间戳,更新频道列表的时间戳
      this.activeChannel.timestamp = data.pre_timestamp
      // 将 data 中获取到的历史数据添加到articles 中，才能够显示在页面上
      this.activeChannel.articles.push(...data.results)
      // 取消加载更多动画
      this.activeChannel.upPullLoading = false

      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #1989fa;
  // margin-bottom: 100px;
  // background-color: #e64e74;
  .van-nav-bar__title {
    color: #fff;
  }
}
.channels-tabs {
  // margin-top: 100px;
  // box-sizing: border-box;
  margin-bottom: 100px;
}
.channels-tabs /deep/ .van-tabs__wrap {
  // position: relative;
  // top:92px;
  // margin-top: 92px;
  // box-sizing: border-box;
  // position: fixed;
  width: 100%;
  position: fixed;
  top: 92px;
  z-index: 1;
}
.channels-tabs /deep/ .van-tabs__content {
  // box-sizing: border-box;
  // margin-top: 100px;
  // margin-bottom: 92px;
  margin-top: 184px;
}
</style>
