import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from "./router"
import moment from 'moment';

import Dashboard from './components/dashboard.vue'

window.BootstrapVue = require('bootstrap-vue');

Vue.filter('formatDate', (value) => moment(value).format('MMMM Do YYYY, h:mm a'));

// eslint-disable-next-line no-undef
Vue.use(BootstrapVue);




new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
