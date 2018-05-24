import Vue from 'vue'
import Router from 'vue-router'
import AppHome from '@/components/AppHome'
//import AppLogin from '@/components/AppLogin'
//import AppLoginMachine from '@/components/AppLoginMachine'
import AppLoginUser from '@/components/AppLoginUser'
import AppExit from '@/components/AppExit'

// register Router
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppHome',
      component: AppHome
    },
    //http://localhost:8081/#/page/selenggara-id
    {
      path: '/page/:page_id',
      name: 'AppHome',
      component: AppHome
    },
    // {
    //   path: '/login',
    //   name: 'AppLogin',
    //   component: AppLogin
    // },
    {
      path: '/login/:user_id',
      name: 'AppLoginUser',
      component: AppLoginUser
    },
    /*
    {
      path: '/login/:machine_no',
      name: 'AppLoginMachine',
      component: AppLoginMachine
    },
    */
    {
      path: '/exit',
      name: 'AppExit',
      component: AppExit
    }
  ]
})
