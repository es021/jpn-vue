// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

//register all component
import JpnHeader from '@/components/JpnHeader'
import JpnFooter from '@/components/JpnFooter'
import JpnLeftBar from '@/components/JpnLeftBar'
import JpnLeftBarItem from '@/components/JpnLeftBarItem'
import JpnContent from '@/components/JpnContent'
import ImageMenu from '@/components/ImageMenu'
import ImageMenuItem from '@/components/ImageMenuItem'

Vue.component('JpnHeader', JpnHeader);
Vue.component('JpnFooter', JpnFooter);
Vue.component('JpnLeftBar', JpnLeftBar);
Vue.component('JpnLeftBarItem', JpnLeftBarItem);
Vue.component('JpnContent', JpnContent);
Vue.component('ImageMenu', ImageMenu);
Vue.component('ImageMenuItem', ImageMenuItem);

//import all style
const scss = ["app", "content", "general", "header", "image-menu", "left-bar"];
scss.map((d, i) => {
  require(`./style/${d}.scss`);
})

const css = ["fontawesome-all.min"];
css.map((d, i) => {
  require(`./style/css/${d}.css`);
})

console.log(process.env.NODE_ENV);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
