import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue({
  data: () => ({ counter: 0 })
})

new Vue({
  render: h => h(App)
}).$mount('#app')
