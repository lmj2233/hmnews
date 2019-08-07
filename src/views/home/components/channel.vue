<template>
  <!-- 频道编辑列表的数据 -->
  <div>
    <van-popup :value="value" @input="$emit('input')" position="bottom" :style="{ height: '95%' }">
      <div class="channel">
        <div class="channel-head">
          <div>
            <span class="title">我的频道</span>
            <span class="desc">点击进入频道</span>
          </div>
          <div>
            <van-button type="danger" plain size="mini" @click="isEdit=!isEdit">{{!isEdit?'编辑':'完成'}}</van-button>
          </div>
        </div>
        <van-grid class="channel-content" :gutter="10" clickable>
          <van-grid-item v-for="(item,index) in channels" :key="item.id" text="文字" @click="handleClickChannel(item,index)">
            <span class="text" :class="{active:index === activeChannelIndex && !isEdit}">{{item.name}}</span>
            <van-icon class="close-icon" name="close" v-show="isEdit && index!=0"/>
          </van-grid-item>
        </van-grid>
      </div>

      <div class="channel">
        <div class="channel-head">
          <div>
            <span class="title">频道推荐</span>
            <span class="desc">点击添加频道</span>
          </div>
        </div>
        <van-grid class="channel-content" :gutter="10" clickable>
          <van-grid-item v-for="(item,index) in restChannels" :key="index" text="文字" @click="handleAddChannel(item,index)">
            <div class="info">
              <span class="text">{{item.name}}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 导入全部频道 解构！！！
import { getAllChannels, resetUserChannels, deleChannelById } from '@/api/channel.js'
import { mapState } from 'vuex'
export default {
  name: 'ChannelIndex',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    channels: {
      type: Array,
      default: () => []
    },
    activeChannelIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allChannels: [],
      // 编辑按钮的默认状态
      isEdit: false
    }
  },
  computed: {
    //   获取user
    ...mapState(['user']),
    restChannels () {
    // 从allChannel中筛选出非channels数据
    // 取出channels数组中每一个元素的id map
      const ids = this.channels.map((item, index) => {
        return item.id
      })
      //   console.log(ids)
      // filter筛选出符合条件的
      return this.allChannels.filter((item, index) => {
        return !ids.includes(item.id)
        // console.log(!ids.includes(item.id))
      })
    }
  },
  created () {
    this.loadAllChannel()
    // console.log(this.restChannels)
  },
  methods: {

    // 编辑频道
    async handleClickChannel (item, index) {
      // 编辑
      if (!this.isEdit) {
        // 进入频道
        await this.changeChannel(item, index)
      } else {
        // 删除频道
        await this.deleteChannel(item, index)
      }
    },
    // 进入频道
    changeChannel (item, index) {
      console.log('change----')
      // 修改父组件的激活index
      this.$emit('update:active-index', index)
      // 关闭对话框  传给父组件的isShow=false
      this.$emit('input', false)
    },
    // 删除频道
    async deleteChannel (item, index) {
      this.channels.splice(index, 1)
      // 子传父，告诉父组件，频道被删除了
      this.$emit('delete-success')
      // 如果用户登录
      if (this.user) {
        try {
          await deleChannelById(item.id)
          console.log(item.id)
        } catch (error) {
          console.dir(error)
        }
        return
      } else {
        // 本地删除
        window.localStorage.setItem('channels', JSON.stringify(this.channels))
      }
      // 关闭对话框
      this.$emit('input', false)
    },
    //   添加频道
    async handleAddChannel (item, index) {
      // console.log(item)
      //   判断用户是登录
      this.channels.push(item)
      // console.log(this.channels)
      //   登录
      if (this.user) {
        const channels = this.channels.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        // console.log('====')
        // 持久化添加
        await resetUserChannels(channels)
        return false
      } else {
        //   未登录
        window.localStorage.setItem('channels', JSON.stringify(this.channels))
      }
    },
    //   获取全部频道
    async  loadAllChannel () {
      const data = await getAllChannels()
      //   console.log(data)
      data.channels.forEach(item => {
        item.articles = [] // 当前频道的文章列表所有数据
        item.downPullLoading = false // 当前频道下拉状态
        item.upPullLoading = false // 当前频道上拉加载更多
        item.upPullFinished = false // 当前频道加载完毕
        item.timestamp = Date.now() // 用来保存每个频道item自己的文章列表数据对应的时间戳
        item.successRefreshText = '' // 下拉成功的文本提示
      })
      this.allChannels = data.channels
    //   console.log(data.channels)
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
    }
    .action {
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
