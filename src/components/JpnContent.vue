<template>
<div v-bind:style="{backgroundImage:backgroundImage}" class="jpn-content">
    <div v-if="loading">
        <br>
        <i class='fa fa-spinner fa-pulse fa-4x'></i>
        <div style="margin:10px">Sila Tunggu Sebentar</div>
    </div>
    <div v-else> 
      <!-- Image Menu -->
      <div v-if="type=='image-menu'">
        <ImageMenu :parentId="page" :title="params.title" :data="params.data"></ImageMenu>
      </div>
      <!-- Default - Not Found -->
      <div v-else>
        Page Not Found<br><b>{{page}}</b>
      </div>

    </div>
</div>
</template>

<script>
import { _GET } from "../helper/util-helper";
import { getNavigationById, getMapNavi } from "../helper/navi-helper";

export default {
  name: "JpnContent",
  data() {
    return {
      loading: true,
      page: _GET("page"),
      type: null,
      params: {},
      backgroundImage: `url('${require(`../image/content-bg.jpg`)}')`
    };
  },
  created() {
    this.MENU_ITEM = ["menu-utama", "urusniaga-utama"];

    this.loadPage();
  },
  methods: {
    loadPage() {
      // parsing url parameter
      var code = _GET("code");
      var page = _GET("page");
      if (code !== null) {
        //load external page
      } else if ((this.MENU_ITEM.indexOf(page) >= 0)) {
        this.type = "image-menu";
        var naviObj = getNavigationById(page);
        this.params.data = naviObj.children;
        this.params.title = naviObj.label;
        // load internal page
      }

      this.loading = false;
    }
  }
};
</script>
