// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store';
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Mint from 'mint-ui';
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'

import '../static/reset.css'
import 'swiper/dist/css/swiper.css'
import './fliters'

fastClick.attach(document.body)

Vue.use(VueAwesomeSwiper)
Vue.use(Mint)

Vue.use(VueLazyload, {
  loading
})

import './mock/mockServer'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
