import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import JpnHeader from '@/components/JpnHeader'
import JpnLeftBar from '@/components/JpnLeftBar'
import JpnLeftBarItem from '@/components/JpnLeftBarItem'

// register Router
Vue.use(Router)
require('../style/fontawesome-all.min.css');
require('../style/app.scss');
require('../style/general.scss');

console.log(process.env.NODE_ENV);

//register basic component
Vue.component('JpnHeader', JpnHeader);
Vue.component('JpnLeftBar', JpnLeftBar);
Vue.component('JpnLeftBarItem', JpnLeftBarItem);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
