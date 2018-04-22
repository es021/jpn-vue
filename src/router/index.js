import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App'
import JpnHeader from '@/components/JpnHeader'
import JpnLeftBar from '@/components/JpnLeftBar'
import JpnLeftBarItem from '@/components/JpnLeftBarItem'
import JpnContent from '@/components/JpnContent'
import ImageMenu from '@/components/ImageMenu'

// register Router
Vue.use(Router)
require('../style/fontawesome-all.min.css');
require('../style/app.scss');
require('../style/general.scss');

console.log(process.env.NODE_ENV);

//register basic component
Vue.component('JpnHeader', JpnHeader);
Vue.component('JpnLeftBar', JpnLeftBar);
Vue.component('JpnLeftBarItem',JpnLeftBarItem);
Vue.component('JpnContent', JpnContent);
Vue.component('ImageMenu', ImageMenu);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    }
  ]
})
