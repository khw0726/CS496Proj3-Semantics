// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
// import $ from 'jquery'
import '../node_modules/semantic-ui-css/semantic.min.css'
import semantic from 'semantic'
import Vue from 'vue'
import App from './App'
import Vuefire from 'vuefire'


Vue.use(Vuefire)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
