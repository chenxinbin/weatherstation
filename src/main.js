// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloFromVux'

import {LoadingPlugin, AjaxPlugin, ToastPlugin } from 'vux'

Vue.use(ToastPlugin)
Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(VueRouter)

Vue.prototype.API_ROOT = 'http://iot.xinditu.com'
Vue.prototype.STATIC_ROOT = 'http://iot.xinditu.com/outdoor/assets/'

const routes = [{
  path: '/',
  component: Home
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
