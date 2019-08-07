import Vue from 'vue'
import Router from 'vue-router'
// 懒加载，只有大哥跳转到该组件，才加载对应的该组件
// import Home from '@/views/home'
// import Login from '@/views/login'
// import { homedir } from 'os'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'home',
      // component: Home,
      component: () =>
        import('@/views/tabbar-layout'),
      children: [
        { path: '/', name: 'home', component: () => import('@/views/home') },
        { path: '/mine', name: 'mine', component: () => import('@/views/mine') }

      ]
    },
    { path: '/login', name: 'login', component: () => import('@/views/login') },
    { path: '/search', name: 'search', component: () => import('@/views/search') },
    { path: '/search-result/:queryText', name: 'search-result', component: () => import('@/views/search/search-result.vue') },
    { path: '/article/:articleId', name: 'article', component: () => import('@/views/article') },
    { path: '/user-profile', name: 'user-profile', component: () => import('@/views/mine/components/user-profile.vue') }

  ]
})
