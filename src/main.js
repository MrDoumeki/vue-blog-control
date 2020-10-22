import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'ant-design-vue/dist/antd.css'
import './plugins/antd.js'
import './permission.js'
import BaiduMap from 'vue-baidu-map'

Vue.component('chart', ECharts)
Vue.config.productionTip = false
Vue.use(BaiduMap, { ak: 'AlR0aLBqyB9pwG8N03314mdBgYeHmLzX' })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
