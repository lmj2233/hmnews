<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
      @click-right="handleSave"
    />

    <van-cell-group>
      <van-cell is-link title="头像" @click="isUploadPhotoShow=true">
        <div slot="default">
          <img width="30" :src="user.photo" alt />
        </div>
      </van-cell>
      <van-cell is-link title="昵称" :value="user.name" />
      <van-cell is-link title="介绍" :value="user.intro" />
    </van-cell-group>

    <van-cell-group>
      <van-cell is-link title="性别" :value="user.gender === 0 ? '男' : '女'" />
      <van-cell is-link title="生日" :value="user.birthday" />
    </van-cell-group>

    <!-- 使用对话框组件 -->
    <upload-photo v-model="isUploadPhotoShow" @setBase64Success="handleSetSuccess" @upload-success="handleUploadSuccess"></upload-photo>
  </div>
</template>

<script>
import { getCurrentUserProfile, editCurrentUserProfile } from '@/api/user'
// 导入上传图片组件
import UploadPhoto from './upload-photo.vue'

export default {
  name: 'UserProfile',
  components: {
    UploadPhoto
  },
  data () {
    return {
      user: {},
      //   默认关闭对话框
      isUploadPhotoShow: false,
      base64Img: null
    }
  },

  created () {
    this.loadUserProfile()
  },

  methods: {
    //   两个选一个格式就可以了
    //  更新图片 url格式的图片
    handleUploadSuccess (photo) {
      this.user.photo = photo
    },
    // 更新图片 base64图片格式
    handleSetSuccess (base64Img) {
    //   this.base64Img = base64Img
    },
    // 保存
    async handleSave () {
      console.log('----')
      // 名字和之前的一样报错
      try {
        await editCurrentUserProfile({
        // name: 'kjajjlwain'
          photo: this.user.photo
        })
        console.log('===')
        this.$toast('修改成功')
      } catch (error) {
        console.dir(error)
      }
    },
    // 获取当前用户信息
    async loadUserProfile () {
      try {
        const data = await getCurrentUserProfile()
        this.user = data
      } catch (err) {
        this.$toast.fail('加载用户信息失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
