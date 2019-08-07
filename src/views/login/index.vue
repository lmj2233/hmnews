<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <!-- 用户名和密码 输入框 -->
    <!-- <input v-validate="'required|email'" type="text" name="email">
    <span v-show="errors.has('email')">{{ errors.first('email') }}</span> -->
    <form action="/">
      <van-cell-group>
        <!-- <van-field v-model="user.mobile" label="手机号" placeholder="请输入手机号" /> -->
        <van-field v-validate="'required|mobile'" v-model="user.mobile" name="phone" :error-message="errors.first('phone')" label="手机号" placeholder="请输入手机号" />

        <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" type="password" />
      </van-cell-group>
      <van-button type="info" :loading="loadingLogin"  block @click.prevent="handelLogin">登录</van-button>
    </form>
  </div>
</template>

<script>
// import axios from 'axios'
import { login } from '@/api/user.js'
// import { setUser } from '@/utils/auth.js'
// import { mapMutations } from 'vuex'

export default {
  name: 'loginindex',
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      },
      loadingLogin: false
    }
  },
  methods: {
    async handelLogin () {
      // 开启加载效果
      this.loadingLogin = true
      // 1.如果验证失败就 return
      this.$validator.validate().then(async valid => {
        if (!valid) {
          // 关闭加载效果
          this.loadingLogin = false
          console.log('验证失败了')
          return
        }
        // 2.验证成功才能进入下面的程序
        try {
          const data = await login(this.user)
          console.log(data)
          // 登录时，重新获取token，更新token
          this.$store.commit('setUsertoken', data)
          console.log('----')
          // 登录成功，跳转到首页
          this.$router.push({ path: '/' })
        } catch (error) {
          this.loadingLogin = false
          console.log(error)
        }
      })
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
