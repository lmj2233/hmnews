<template>
  <div class="auth-info">
    <div class="base-info">
      <img class="avatar" :src="article.aut_photo" alt="">
      <div>
        <p>{{article.aut_name}}</p>
        <p>{{article.pubdate | relativeTime}}</p>
      </div>
    </div>
    <div>
      <van-button @click="handleFlowerUser" :type="article.is_followed? 'default' :'danger'" :loading="isFollowLoading ">{{article.is_followed ? '已关注' : '关注'}}</van-button>
    </div>
  </div>
</template>

<script>
import { followUser, unfollowUser } from '@/api/user.js'
export default {
  name: 'AuthInfo',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // 按钮此时的状态
      isFollowLoading: false
    }
  },
  methods: {
    async handleFlowerUser () {
      this.isFollowLoading = true
      // 关注,此时未关注要关注
      if (!this.article.is_followed) {
        const data = await followUser(this.article.aut_id)
        this.article.is_followed = true
      } else {
        // 取消关注，此时关注了要取消关注
        const data = await unfollowUser(this.article.aut_id)
        this.article.is_followed = false
      }
      this.isFollowLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
}
</style>
