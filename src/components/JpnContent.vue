<template>
<div v-bind:style="{backgroundImage:backgroundImage}" class="jpn-content" id="jpn-content">
    <div v-if="loading">
        <br>
        <i class='fa fa-spinner fa-pulse fa-4x'></i>
        <div style="margin:10px">Sila Tunggu Sebentar</div>
    </div>
    <div v-else> 
      <!-- Image Menu -->
      <div v-if="type==this.TYPE_IMG_MENU">
        <ImageMenu :parentId="page" :title="params.title" :data="params.data"></ImageMenu>
      </div>
      <div v-if="type==this.TYPE_POPUP">
        <h3><small>Window popup is currently opened for page</small><br>{{title}}</h3>
      </div>
      <!-- Default - Not Found -->
      <div v-else>
        <!-- <iframe :src="this.iframe_url"></iframe>  -->
         <!-- <span v-html="this.content"></span> -->
      </div>
    </div>
</div>
</template>

<script>
import { _GET, openWindowPopup, closeWindowPopup } from "../helper/util-helper";
import {
  getNavigationById,
  getMapNavi,
  getCurrentPage
} from "../helper/navi-helper";
import { getRequest } from "../helper/api-helper";

export default {
  name: "JpnContent",
  data() {
    return {
      TYPE_IMG_MENU: "img-menu",
      TYPE_POPUP: "popup",
      loading: true,
      page: "",
      type: null,
      content: "Empty Content",
      title: "",
      params: {},
      iframe_url: "",
      backgroundImage: `url('${require(`../image/content-bg.jpg`)}')`
    };
  },
  watch: {
    $route(to, from) {
      this.loadPage();
    }
  },
  created() {
    this.MENU_ITEM = ["menu-utama", "urusniaga-utama"];
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      closeWindowPopup();
      // parsing url parameter
      //var code = _GET("code");
      //var page = _GET("page");
      this.content = "";
      this.loading = true;

      // get page
      var page = getCurrentPage(this.$route);
      this.page = page;

      var naviObj = getNavigationById(page);
      this.title = naviObj.label;

      if (this.MENU_ITEM.indexOf(page) >= 0) {
        this.type = this.TYPE_IMG_MENU;
        this.params.data = naviObj.children;
        this.params.title = naviObj.label;
        this.loading = false;
        // load internal page
      } else {
        this.type = this.TYPE_POPUP;
        naviObj.url = "http://localhost:8080/JPN/COOP.T3861501.TC.html";
        //naviObj.url = "http://localhost/jpn-vue/public/test.html";
        //this.iframe_url = naviObj.url;
        this.loading = false;
        openWindowPopup(naviObj.url);
        return;
        // getRequest(
        //   naviObj.url,
        //   res => {
        //     console.log("ORI", res);
        //     res = res.replaceAll("gen/", "/JPN/gen/");
        //     console.log("REPLACE", res);
        //     this.content = res;
        //     this.loading = false;
        //   },
        //   err => {
        //     this.content = "Failed to load " + naviObj.url;
        //     this.loading = false;
        //   }
        // );
        //get request end
      }
    }
  }
};
</script>
