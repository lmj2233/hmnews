<template>
  <div>
    <!-- 标签栏 tab -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <!-- 底部标签栏 tabbar -->
    <van-tabbar v-model="active" :route="true">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/mine">{{$store.state.user? '我的': '未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tabbarIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
</style>
