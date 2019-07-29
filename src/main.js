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
Validator.extend('mobile', {
  getMessage: field => '请输入正确的手机号',
  validate: value =>
    value.length === 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/.test(value)
})
Vue.use(VeeValidate)
Vue.use(Vant)
Validator.localize('ZH_CN', ZH_CN)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
