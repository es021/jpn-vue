// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//register all component
import JpnHeader from '@/components/JpnHeader'
import JpnLeftBar from '@/components/JpnLeftBar'
import JpnLeftBarItem from '@/components/JpnLeftBarItem'
import JpnContent from '@/components/JpnContent'
import ImageMenu from '@/components/ImageMenu'
Vue.component('JpnHeader', JpnHeader);
Vue.component('JpnLeftBar', JpnLeftBar);
Vue.component('JpnLeftBarItem',JpnLeftBarItem);
Vue.component('JpnContent', JpnContent);
Vue.component('ImageMenu', ImageMenu);

//import all style
require('./style/fontawesome-all.min.css');
require('./style/app.scss');
require('./style/general.scss');

console.log(process.env.NODE_ENV);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
