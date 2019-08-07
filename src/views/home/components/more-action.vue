<template>
  <div>
    <van-dialog
      :showConfirmButton="false"
      closeOnClickOverlay
      :value="value"
      @input="$emit('input')"
    >
      <van-cell-group v-if="!isReport">
        <van-cell title="不感兴趣" icon="location-o" @click="handleDislike" />
        <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="isReport=true" />
        <van-cell title="拉黑作者" icon="location-o" />
      </van-cell-group>

      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isReport=false" />
        <van-cell
          v-for="item in reportTypes"
          :key="item.value"
          :title="item.title"
          @click="handleReportArticle(item.value)"
          icon="location-o"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { dislikeArticle, reportArticle } from '@/api/article.js';
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    currentArticle: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // 对话框在更多操作还是举报状态
      isReport: false,
      // 举报的选项内容
      reportTypes: [
        { value: 0, title: '其他问题' },
        { value: 1, title: '标题夸张' },
        { value: 2, title: '低俗色情' },
        { value: 3, title: '错别字多' },
        { value: 4, title: '旧闻重复' },
        { value: 5, title: '广告软文' },
        { value: 6, title: '内容不实' },
        { value: 7, title: '涉嫌违法犯罪' },
        { value: 8, title: '侵权' }
      ]
    }
  },
  methods: {
    // 举报文章
    async handleReportArticle (type) {
      try {
        // 发送举报文章请求
        await reportArticle({
          articleID: this.currentArticle.art_id,
          type: type
        })
        // 提示操作成功
        this.$toast('举报成功')
        // 关闭对话框
        this.$emit('input', false)
      } catch (error) {
        // 判断是否已经举报过
        if (error.response.status === 409) {
          this.$toast('已经举报过该用户')
          // 关闭对话框
          this.$emit('input', false)
        } else {
          this.$toast('举报失败')
          // 关闭对话框
          this.$emit('input', false)
        }
        // console.dir(error)
        // 将对话框的状态改为false，一开始初始状态和左侧返回按钮的值一样
        this.isReport = false
      }
    },
    // 对该文章不喜感兴趣
    async handleDislike () {
      try {
        // 发送对该文章不喜欢的请求
        // console.log(this.currentArticle.art_id)
        await dislikeArticle(this.currentArticle.art_id)

        this.$emit('input', false)
        // 更新视图，触发父元素中定义的方法 @后面的名字 dislike-success
        this.$emit('dislike-success')

        // 关闭对话框
        // vant提供的消息提示
        this.$toast('操作成功')
      } catch (error) {
        // 关闭对话框
        this.$emit('input', false)
        this.$toast('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
