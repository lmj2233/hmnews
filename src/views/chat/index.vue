<template>
  <div class="chat">
    <van-nav-bar fixed title="聊天" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>

    <div class="chat-window" ref="chat-window">
      <van-cell :class="item.from!=='myself'?'left':'right'" v-for="(item,index) in msgs" :key="index" :value="item.msg" />
      <div class="clear"></div>
    </div>

    <van-cell-group border class="sendmsg">
      <van-field border v-model="msg" center>
        <van-button slot="button" size="small" type="primary" @click="sendMsg">发送</van-button>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'Chat',
  components: {},
  data () {
    return {
      msg: '你好,小智机器人',
      msgs: [],
      socket: null
    }
  },
  watch: {},
  methods: {
    //  点击发送按钮
    sendMsg () {
      // 调用，实现申请连接，重新发送数据=>发送消息=>接收消息=> 关闭连接(每次都是新的请求)
      this.setSocket()
    },
    //   发送消息
    sendRabotmsg () {
      this.socket.emit('message', {
        msg: this.msg,
        timestamp: Date.now()
      })
      //   更新视图
      this.msgs.push({
        msg: this.msg,
        from: 'myself'
      })
      this.msg = ''
      //   接收消息
      this.reMsg()
    },
    // 接收消息
    reMsg () {
      this.socket.on('message', (data) => {
        this.msgs.push({
          msg: data.msg,
          from: 'yourself'
        })
      })
    },
    //   申请连接=>发送请求=> 文档中要求的接口和参数=> 通信相关机器人
    // (每次都是新的请求)
    setSocket () {
      this.socket = io('http://ttapi.research.itcast.cn', {
        query: {
        //   msg: this.msg,
        //   timestamp: Date.now()
        // token和id 必须传一个
          token: this.$store.state.user.token
        }
      })
      this.socket.on('connect', () => {
        console.log('连接成功')
        // 第一次发送消息
        this.sendRabotmsg()
      })
    }
  },
  created () {
    //   如果登录了,有用户名，就发送消息
    if (this.$store.state.user) {
      this.setSocket()
    }
    // console.log(this.$store.state.user.token)
  }
}
</script>

<style lang='less' scoped>
.van-nav-bar {
  background-color: #1989fa;
  .van-nav-bar__title {
    color: #ffffff;
  }
}

.sendmsg {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.sendmsg /deep/ .van-cell {
  border: 1px solid black;
}

.chat .chat-window {
  position: relative;
  top: 92px;
  font-size: 14px;
}
.chat /deep/ .van-nav-bar__text {
  color: #ffffff;
}
.clear {
  height: 102px;
}
.chat-window /deep/ .left .van-cell__value {
  color: red;
}
.chat-window /deep/ .right .van-cell__value {
  color: green;
}
</style>
