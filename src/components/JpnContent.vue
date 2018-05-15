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
      <div v-if="type==this.TYPE_FRAME">
        <div>
          <span v-if="frameLoading">
            Loading page
          </span>
          <span v-else>
            Successfully loaded page
          </span>
          <br>
          <b>{{naviObj.label}}</b>
        </div>
        <iframe ref="iframe" :title="title" :src="naviObj.url" @load="frameOnLoad"></iframe>
      </div>
      <div v-else>
         <!-- <span v-html="this.content"></span> -->
      </div>
    </div>
</div>
</template>

<script>
import { openWindowPopup } from "../helper/util-helper";
import {
  getNavigationById,
  getMapNavi,
  getCurrentPage
} from "../helper/navi-helper";

import { getRequest } from "../helper/api-helper";
import { Domain } from "../config/app-config";

export default {
  name: "JpnContent",
  data() {
    return {
      TYPE_IMG_MENU: "img-menu",
      TYPE_POPUP: "popup",
      TYPE_FRAME: "i-frame",
      loading: true,
      page: "",
      type: null,
      content: "Empty Content",
      title: "",
      naviObj: null,
      params: {},
      windowPopup: null,
      frameLoading: false,
      backgroundImage: `url('${require(`../image/content-bg.jpg`)}')`
    };
  },
  watch: {
    $route(to, from) {
      this.loadPage();
    }
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    frameOnLoad() {
      this.frameLoading = false;
      console.log("frame loaded",this.$refs.iframe);
      // try {
      //   var iframe = this.$refs.iframe;
      //   // Displays the first 50 chars in the innerHTML of the
      //   // body of the page that the iframe is showing.
      //   // EDIT 2012-04-17: for wider support, fallback to contentWindow.document
      //   var doc = iframe.contentDocument || iframe.contentWindow.document;
      //   alert(doc.body.innerHTML.substring(0, 50));
      // } catch (e) {
      //   // This can happen if the src of the iframe is
      //   // on another domain
      //   alert("exception: " + e);
      // }
    },
    useFrame(naviObj) {
      return false;
      var FRAME = ["kelahiran"];
      return FRAME.indexOf(naviObj.id) >= 0;
    },
    useMenuItem() {
      var MENU_ITEM = ["menu-utama", "urusniaga-utama"];
      return MENU_ITEM.indexOf(this.page) >= 0;
    },
    loadPage() {
      //closeWindowPopup();
      // parsing url parameter
    
      this.content = "";
      this.loading = true;

      // get page
      var page = getCurrentPage(this.$route);
      this.page = page;
      var naviObj = getNavigationById(page);
      console.log("naviObj url", naviObj.url);

      this.title = naviObj.label;

      // debug for url
      if (
        naviObj.url == "" ||
        naviObj.url == null ||
        typeof naviObj.url === "undefined"
      ) {
        naviObj.url = `http://192.168.0.240:8080/JPN/COOP.T3861501.TC.html`;
      }

      this.naviObj = naviObj;

      if (this.useMenuItem()) {
        // load menu item
        this.type = this.TYPE_IMG_MENU;
        this.params.data = naviObj.children;
        this.params.title = naviObj.label;
        this.loading = false;
      } else if (this.useFrame(naviObj)) {
        // load i frame
        this.type = this.TYPE_FRAME;
        this.loading = false;
        this.frameLoading = true;
      } else {
        // load window popup

        this.type = this.TYPE_POPUP;

        //naviObj.url = "http://localhost/test-close/";
        // if (page == "integrasi") {
        //   naviObj.url = "http://localhost/cf-app/auth";
        // }

        // naviObj.url =
        //   "https://www.google.com/search?client=ubuntu&channel=fs&q=" +
        //   page +
        //   "&ie=utf-8&oe=utf-8";

        //naviObj.url = "http://localhost/jpn-vue/public/test.html";
        //this.iframe_url = naviObj.url;

        this.loading = false;
        this.windowPopup = openWindowPopup(naviObj.url);
        // console.log(this.windowPopup);
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
