import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import i18n from '@/i18n' // Internation
import '@/utils/error-log'

Vue.use(ElementUI, {
  size: store.getters.size // set element-ui default size
})

Vue.config.productionTip = false

// Markdown Editor
// https://juejin.im/post/5adab398f265da0b9671ca25#heading-11
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
