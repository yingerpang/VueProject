import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import Moment from 'moment'
import 'ant-design-vue/dist/antd.css'
import store from './store'
import zhLocale from 'ant-design-vue/lib/locale/zh_CN'
// 引入form-create 表单生成器
import formCreate from "@form-create/ant-design-vue"
import './assets/css/common.less'

Vue.config.productionTip = false
Vue.use(Antd,{zhLocale})
Vue.use(formCreate);
Vue.prototype.$moment = Moment
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

function run() {
  document.cookie = 'haishu-sc=' + 'A4836971316F3669C86F330D606A2125E0489656391489F87E1C9C90D9F1B8F90FBE54AF034E5B76BFA36AC26FD0A23939B4190CD70246B347469E13289DD6F43D204007734800DF11A57DA6BE0CA5E9';
}
run()
