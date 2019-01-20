import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import ExerciseList from './components/ExerciseList'
import SignIn from './components/SignIn'

Vue.component('ExerciseList', ExerciseList)
Vue.component('SignIn', SignIn)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
}).$mount('#app')
