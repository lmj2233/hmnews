<template>
  <div>
    <van-nav-bar fixed title="搜索结果" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-list
      class="search-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in searchResult" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
// 导入获取搜索结果方法
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'search-result',
  data () {
    return {
      searchResult: [],
      page: 1,
      per_page: 10,
      loading: false,
      finished: false
    }
  },
  computed: {
    // 获取关键字q
    q () {
      return this.$route.params.queryText
    }
  },
  created () {
    this.loadSearchResult()
  },
  deactivated () {
    // 销毁keep-active的组件缓存问题
    this.$destroy()
  },
  methods: {
    // onload函数
    async onLoad () {
      // 异步更新数据
      // 延时加载
      await this.$sleep(800)
      // 调用搜索结果方法
      const data = await this.loadSearchResult()
      // 如果有数据就追加
      if (data.results) {
        // 将新获取的数据追加到数组
        this.searchResult.push(...data.results)
        // 关闭动画
        this.loading = false
      } else {
      }
      // 获取新一页的数据，page+1,放到最下面，
      // 等这一页都加载完成之后，再进来之前页面+1，就会重新加载新的数据
      this.page++
    },
    // 获取搜索结果
    async loadSearchResult () {
      const data = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      // console.log(data)
      // this.searchResult = data.results
      return data
    }
  }
}
</script>

<style lang="less" scoped>
.search-list {
  margin-top: 92px;
}
</style>
