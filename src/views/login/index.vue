<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <!-- 用户名和密码 输入框 -->
    <form action="/">
      <van-cell-group>
        <van-field v-model="user.mobile" label="手机号" placeholder="请输入手机号" />

        <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" type="password" />
      </van-cell-group>
      <van-button type="info" block @click.prevent="login">登录</van-button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      }
    }
  },
  methods: {
    async login () {
      const res = await axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        data: this.user
      })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #1989fa;
  // background-color: #e64e74;
  .van-nav-bar__title {
    color: #fff;
  }
}
</style>
