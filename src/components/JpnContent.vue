<template>
<div v-bind:style="{backgroundImage:backgroundImage}" class="jpn-content" id="jpn-content">
    <div v-if="loading">
        <br>
        <i class='fa fa-spinner fa-pulse fa-4x'></i>
        <div style="margin:10px">Sila Tunggu Sebentar</div>
    </div>
    <div v-else> 
      <div v-if="parentObj !== null" class="button-back">
        <router-link :to="parentUrl" class="btn btn-xs btn-blue">
        <i class="fa fa-chevron-circle-left left"></i><b>{{parentObj.label}}</b>
        </router-link>
        </div>
      <!-- Image Menu -->
      <div v-if="type==this.TYPE_IMG_MENU">
        <ImageMenu :parentId="page" :title="imgMenuObj.title" :data="imgMenuObj.data"></ImageMenu>
      </div>
      <!-- Text Menu -->
      <div v-if="type==this.TYPE_TEXT_MENU">
        <TextMenu :parentId="page" :title="imgMenuObj.title" :data="imgMenuObj.data"></TextMenu>
      </div>
      <!-- Window Popup -->
      <div v-if="type==this.TYPE_POPUP">
        <h1>{{title}}</h1>
        <h3><small><i>Window Popup is currently opened for this page</i><br></small><u>{{naviObj.url}}</u></h3>
        <div v-if="!this.popupObj.closed">
          <div class="btn btn-lg btn-blue" @click="focusPopup">
            <i class="far fa-window-restore left"></i>
            Show Window Popup
          </div>
        </div>
        <div v-else>
          Window Popup has <b>already been closed</b><br>Please <b>refresh page</b> to open new window popup. 
          <br><br>
          <div class="btn btn-lg" @click="refresh">
            <i class="fas fa-sync-alt left"></i>
            Refresh Page
          </div>
        </div>
      </div>
      <!-- I Frame -->
      <div v-if="type==this.TYPE_FRAME">
        <div>
          <span v-if="iframeObj.loading">
            Loading page <br><b>{{naviObj.label}}</b>
          </span>
          <span v-else>
          </span>
          <div :class="iframeObj.class">
            <iframe ref="iframe" :title="title" :src="naviObj.url" @load="frameOnLoad"></iframe>
          </div>
        </div>      
      </div>
      <!-- MANAGE NAVI -->
      <div v-if="type==this.TYPE_MANAGE_NAVI">
        <ManageNavi></ManageNavi>       
      </div>
      <!-- ADMIN -->
      <div v-if="type==this.TYPE_ADMIN_CONSOLE">
        <AdminConsole></AdminConsole>       
      </div>
      <!-- INVALID ROUTE -->
      <div v-if="type==this.TYPE_INVALID">
        <h3>
          <small>Page Not Found</small>
          <br>{{page}}
        </h3>
      </div>
      <!-- Default - Not Found -->
      <div v-else>
         <span v-html="this.content"></span>
      </div>
    </div>
</div>
</template>

<script>
import { openWindowPopup } from "../helper/util-helper";
import { mapGetters } from "vuex";

import {
  getNavigationById,
  getMapNavi,
  getCurrentPage,
  getParentObject
} from "../helper/navi-helper";

import { formatUrl, isImageMenu, isTextMenu } from "../helper/url-helper";
import { getRequest } from "../helper/api-helper";
import { Domain } from "../config/app-config";

export default {
  name: "JpnContent",
  data() {
    return {
      TYPE_IMG_MENU: "img-menu",
      TYPE_TEXT_MENU: "text-menu",
      TYPE_POPUP: "popup",
      TYPE_FRAME: "i-frame",
      TYPE_MANAGE_NAVI: "manage-navi",
      TYPE_ADMIN_CONSOLE: "admin-console",
      TYPE_NOT_AUTH: "not-auth",
      TYPE_INVALID: "invalid",
      TYPE_CUSTOM: "custom-page",

      loading: true,
      page: "",
      type: null,
      content: "Empty Content",
      title: "",
      parentObj: null,
      parentUrl: "",
      naviObj: null,
      imgMenuObj: {
        data: null,
        title: null
      },
      iframeObj: {
        class: "has-border",
        loading: false
      },
      popupObj: {
        windowPopup: null,
        closed: false
      },
      backgroundImage: `url('${require(`../image/content-bg.jpg`)}')`
    };
  },
  computed: {
    ...mapGetters({
      serverState: "serverState"
    })
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        this.loadPage();
      }
    }
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    refresh() {
      this.loadPage();
      //location.reload();
    },
    focusPopup() {
      if (!this.popupObj.windowPopup.closed) {
        this.popupObj.closed = false;
      } else {
        this.popupObj.closed = true;
      }
      this.popupObj.windowPopup.focus();
    },
    frameOnLoad() {
      this.iframeObj.loading = false;
      //console.log(this.$refs.iframe.style.height);
      // to toggle between has border and not
      var interval = setInterval(() => {
        this.iframeObj.class =
          this.iframeObj.class == "has-border" ? "no-border" : "has-border";
        //console.log(this.iframeObj.class);
      }, 1000);

      // clear toggling after 10 seconds
      setTimeout(() => {
        clearInterval(interval);
      }, 10000);
    },
    isCustomWindowId() {
      var c = ["idata"];
      return c.indexOf(this.page) >= 0;
    },
    useFrame(naviObj) {
      // currently not used
      return false;
      var FRAME = ["kelahiran", "kematian"];
      return FRAME.indexOf(naviObj.id) >= 0;
    },
    // useMenuItem(url) {
    //   // var MENU_ITEM = ["menu-utama", "urusniaga-utama"];
    //   // return MENU_ITEM.indexOf(this.page) >= 0;
    // },
    setParentObj(id) {
      var obj = getParentObject(id);
      if (obj !== null) {
        this.parentUrl = obj.id != "" ? `/page/${obj.id}` : "/";
        this.parentObj = obj;
      }
    },
    authenticate() {
      if (this.serverState.overrideAuth) {
        return true;
      }
      var pass = prompt("Enter Password");
      return pass == "wzs21";
    },
    redirectCustomPage(page) {
      var needAuth = false;
      var ret = false;
      // admin only page
      if (page == this.TYPE_MANAGE_NAVI || page == this.TYPE_ADMIN_CONSOLE) {
        this.type = page;
        this.loading = false;
        needAuth = true;
        ret = true;
      }

      if (ret && needAuth) {
        if (!this.authenticate()) {
          this.type = "";
          this.content = "<h2>Authentication Failed</h2><br>Wrong Password";
        }
      }
      return ret;
    },
    loadPage() {
      this.content = "";
      this.loading = true;
      this.parentObj = null;

      // get page
      var page = getCurrentPage(this.$route);
      this.page = page;

      if (this.redirectCustomPage(this.page)) {
        return;
      }

      let naviObj = getNavigationById(page);
      // 1. check if page route invalid
      if (typeof naviObj === "undefined") {
        this.type = this.TYPE_INVALID;
        this.loading = false;
        return;
      }

      this.title = naviObj.label;
      naviObj.url = formatUrl(naviObj.url);
      this.naviObj = naviObj;

      this.setParentObj(this.page);

      if (isImageMenu(this.naviObj.url) || page == "menu-utama") {
        // load image menu item
        this.type = this.TYPE_IMG_MENU;
        this.imgMenuObj.data = this.naviObj.children;
        this.imgMenuObj.title = this.naviObj.label;
      } else if (isTextMenu(this.naviObj.url)) {
        // load text menu item
        this.type = this.TYPE_TEXT_MENU;
        this.imgMenuObj.data = this.naviObj.children;
        this.imgMenuObj.title = this.naviObj.label;
      } else if (this.useFrame(this.naviObj)) {
        // load i frame
        this.type = this.TYPE_FRAME;
        this.iframeObj.loading = true;
      } else if (this.naviObj.url) {
        // load window popup
        this.type = this.TYPE_POPUP;
        this.popupObj.closed = false;
        this.popupObj.windowPopup = openWindowPopup(
          this.naviObj.url,
          this.isCustomWindowId()
        );
      } else {
        this.type = "";
        this.content = "<h2>" + this.title + "</h2>";
        this.content += "<h4>This Page Is Currently Not Available</h4>";
      }
      this.loading = false;
    }
  }
};

// debug for url
// if (
//   naviObj.url == "" ||
//   naviObj.url == null ||
//   typeof naviObj.url === "undefined"
// ) {
//   //naviObj.url = `http://192.168.0.240:8080/JPN/COOP.T3861501.TC.html`;
//   //naviObj.url = `nowhere`;
// }
</script>
