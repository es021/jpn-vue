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
import TextMenu from '@/components/TextMenu'
import TextMenuItem from '@/components/TextMenuItem'
import ManageNavi from '@/components/ManageNavi'
import TableData from '@/components/TableData'
import AppPopup from '@/components/AppPopup'
import Form from '@/components/Form'
import AdminConsole from '@/components/AdminConsole'

Vue.component('JpnHeader', JpnHeader);
Vue.component('JpnFooter', JpnFooter);
Vue.component('JpnLeftBar', JpnLeftBar);
Vue.component('JpnLeftBarItem', JpnLeftBarItem);
Vue.component('JpnContent', JpnContent);
Vue.component('ImageMenu', ImageMenu);
Vue.component('ImageMenuItem', ImageMenuItem);
Vue.component('TextMenu', TextMenu);
Vue.component('TextMenuItem', TextMenuItem);
Vue.component('ManageNavi', ManageNavi);
Vue.component('TableData', TableData);
Vue.component('AppPopup', AppPopup);
Vue.component('Form', Form);
Vue.component('AdminConsole', AdminConsole);

//import all style
const scss = ["app", "form", "button", "content"
  , "general", "header", "image-menu", "left-bar"
  , "table", "popup","text-menu"];

scss.map((d, i) => {
  require(`./style/${d}.scss`);
})

const css = ["fontawesome-all.min"];
css.map((d, i) => {
  require(`./style/css/${d}.css`);
})

console.log(process.env.NODE_ENV);

// vuex setup
import Vuex from 'vuex';
Vue.use(Vuex);
import storeObj from './store/index';
const store = new Vuex.Store(storeObj);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // provide the store using the "store" option.
  // this will inject the store instance to all child components.
  store,
  router,
  components: { App },
  template: '<App/>'
})
