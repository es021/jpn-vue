import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import JpnHeader from '@/components/JpnHeader'

// register Router
Vue.use(Router)

//register basic component
Vue.component('JpnHeader', JpnHeader);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
