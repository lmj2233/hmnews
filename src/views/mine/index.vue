<template>
  <div>
    <un-login v-if="!$store.state.user" />
    <user-info v-else :user="user" />
  </div>
</template>

<script>
import UnLogin from './components/un-login'
import UserInfo from './components/user-info'
import { getCurrentUserInfo } from '@/api/user.js'

export default {
  name: 'MyIndex',
  components: {
    UnLogin,
    UserInfo
  },

  data () {
    return {
      user: {}
    }
  },

  created () {
    this.loadUserInfo()
    console.log('created')
  },

  methods: {
    async loadUserInfo () {
      const data = await getCurrentUserInfo()
      console.log(data)
      this.user = data
    }

  }
}
</script>

<style lang="less" scoped></style>
