<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <!-- 用户名和密码 输入框 -->
    <form action="/">
      <van-cell-group>
        <van-field v-model="user.mobile" label="手机号" placeholder="请输入手机号" />

        <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" type="password" />
      </van-cell-group>
      <van-button type="info" block @click.prevent="handelLogin">登录</van-button>
    </form>
  </div>
</template>

<script>
// import axios from 'axios'
import { login } from '@/api/user.js'
export default {
  name: 'loginindex',
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      }
    }
  },
  methods: {
    async handelLogin () {
      try {
        const data = await login(this.user)
        console.log(data)
        // 更新token
        this.$store.commit('setUsertoken', data)
      } catch (error) {
        console.log(error)
      }
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
