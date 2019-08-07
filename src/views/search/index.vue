<template>
  <div>
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- 联想建议 -->
    <van-cell-group v-if="suggestData.length && searchText.length">
      <van-cell
        icon="search"
        v-for="(item,index) in suggestData"
        :key="index"
        @click="onSearch(item)"
      >
        <!-- <div slot="title" v-html="highKeyWord(item,searchText)"></div> -->
        <div slot="title" v-html="highKeywords(item,searchText)"></div>
      </van-cell>
    </van-cell-group>
    <!-- 历史搜索记录 -->
     <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon @click="isDeleteData=true" v-show="!isDeleteData" slot="right-icon" name="delete" style="line-height:inherit"></van-icon>
        <div v-show="isDeleteData">
          <span style="margin-right:10px" @click="searchHistories=[]">全部删除</span>
          <span @click="isDeleteData=false">完成</span>
        </div>
      </van-cell>
      <van-cell :title="item"  v-for="(item,index) in searchHistories" :key="index">
        <van-icon v-show="isDeleteData" @click="searchHistories.splice(index,1)" slot="right-icon" name="close" style="line-height:inherit"></van-icon>
      </van-cell>
     </van-cell-group>
  </div>
</template>

<script>
// 导入联想建议方法
import { getSuggestion } from '@/api/search.js'
// 导入 debounce防抖函数
import { debounce } from '@/utils/debounce.js'

export default {
  name: 'searchIndex',
  data () {
    return {
      searchText: '',
      suggestData: [],
      isDeleteData: false,
      searchHistories: [] || JSON.parse(window.localStorage.getItem('search-histories'))
    }
  },
  //   watch监测数据变化
  watch: {
    searchText: debounce(async function (newValue, oldValue) {
      // 输入框为空不发送请求 ？？？
      if (this.searchText.trim().length === 0) {
        return
      }
      //   console.log('111')
      try {
        const suggestData = await getSuggestion(this.searchText)
        // console.log(suggestData)
        // console.log('suss')
        this.suggestData = suggestData.options
        // console.log(this.suggestData)
      } catch (error) {
        console.dir(error)
      }
    }, 800)
  },
  methods: {
    //   高亮显示  span 的闭合标签写错了！！！
    highKeywords (cell, keywords) {
      //   console.log(cell, keywords)
      return cell
        .toLowerCase()
        .split(keywords)
        .join(`<span style="color:red">${keywords}</span>`)
    },
    //   搜索  queryText 联想建议
    onSearch (queryText) {
      // 存储历史记录
      // Set 集合容器，存储历史记录，但是不会保存重复数据
      const setTemp = new Set(this.searchHistories)
      // 向集合容器添加元素——历史记录——先添加
      setTemp.add(queryText)
      // 将集合容器转换为数组,存储到历史记录中——再转换
      this.searchHistories = Array.from(setTemp)

      // 设置历史记录
      window.localStorage.setItem('search-histories', JSON.stringify(this.searchHistories))

      // 跳转到搜索结果组件
      this.$router.push({
        name: 'search-result',
        params: { queryText }
      })
    },
    onCancel () {
      console.log('cancel')
      // 跳转回首页
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
