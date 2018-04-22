<template>
<div class="jpn-content">
    <div v-if="loading">
        <br>
        <i class='fa fa-spinner fa-pulse fa-4x'></i>
        <div style="margin:10px">Sila Tunggu Sebentar</div>
    </div>
    <div v-else> 
      <!-- Image Menu -->
      <div v-if="type=='image-menu'">
        <ImageMenu :title="params.title" :data="params.data"></ImageMenu>
      </div>
      <!-- Default - Not Found -->
      <div v-else>
        Page Not Found {{page}}
        <br>
        {{params}}
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
      params: {}
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      // parsing url parameter
      var code = _GET("code");
      var page = _GET("page");
      if (code !== null) {
        //load external page
      } else {
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

<style scoped lang="scss">
@import "../style/_constant.scss";

.jpn-content {
  background-image: url(require("../image/content-bg.jpg"));
  background-size: cover;
  background-position: center center;

  .content-body {
    padding: 10px;
  }

  .content-load {
    text-align: center;
    width: 100%;
    margin-top: 20px;
    color: $COLOR-BLUE;
  }
}
</style>
