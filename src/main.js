import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入Vant
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible/index.min.js'
import VeeValidate, { Validator } from 'vee-validate'
// 中文
import ZH_CN from 'vee-validate/dist/locale/zh_CN'
// 导入路由懒加载图片
import VueLazyload from 'vue-lazyload'
// 导入dayjs 时间
import dayjs from 'dayjs'
// import 'dayjs/locale/es'
// import advancedFormat from 'dayjs/plugin/advancedFormat'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
// dayjs.extend(advancedFormat)

// 测试
// console.log(dayjs().from(dayjs('1990')))
// console.log(dayjs().fromNow())

Validator.extend('mobile', {
  getMessage: field => '请输入正确的手机号',
  validate: value =>
    value.length === 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/.test(value)
})
Vue.use(VueLazyload)
Vue.use(VeeValidate)
Vue.use(Vant)
Validator.localize('ZH_CN', ZH_CN)

// 加载延时，在Vue原型上挂载 time
Vue.prototype.$sleep = (time) => {
  return new Promise((resolve) => {
    setInterval(() => {
      resolve()
    }, time)
  })
}
// 过滤器处理时间
Vue.filter('relativeTime', (val) => {
  return dayjs().fromNow()
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
