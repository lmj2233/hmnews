<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input type="text" v-model="content">
    </div>
    <div class="more-wrap">
      <!-- <van-icon v-if="!articleId" :name="article.is_collected ? 'star' : 'star-o'" @click="handleCollect"></van-icon> -->
      <van-button type="primary" size="small" :disabled="!content.length" @click="handleAdd">发布</van-button>
    </div>
  </div>
</template>

<script>
import { addCommont } from '@/api/comment.js'

export default {
  name: 'AddComment',
  data () {
    return {
      content: ''
    }
  },
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    art_id: {
      type: [Number, String],
      default: null
    }
  },
  methods: {
    async handleAdd () {
      try {
        const data = await addCommont({
          target: this.target,
          content: this.content,
          art_id: this.art_id
        })
        this.$toast('发布成功')
        this.content = ''
        console.log(data)
      } catch (error) {
        console.dir(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-comment {
  width: 100%;
  background: #fff;
  padding: 20px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 30px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
