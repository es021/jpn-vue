<template>
  <!-- <router-link :to="href" :class="{ 'jtm-item': true, 'blur':isBlur }" :disabled="isBlur">
      <div class="detail">
          <div class="icon"><i class="fa fa-chevron-circle-right left"></i></div>
          <div class="label">{{data.label}}</div>
      </div>
  </router-link> -->

  <AppLink :href="href" :styleObj="{backgroundImage:backgroundImage}"  
     :disabled="isBlur"
     :classObj="{ 'jtm-item': true, 'blur':isBlur }">
     <div class="detail">
          <div class="icon"><i class="fa fa-chevron-circle-right left"></i></div>
          <div class="label">{{data.label}}</div>
      </div>
  </AppLink> 
</template>

<script>
import { getNaviInternalUrl } from "../helper/navi-helper";
export default {
  name: "TextMenuItem",
  props: {
    data: {
      type: Object
    },
    parentId: {
      type: String
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.init();
      }
    }
  },
  data() {
    return {
      href: "",
      isBlur: false
    };
  },
  created() {
    // somehow the props passed down is binded to other props as well
    // demit
    this.href = getNaviInternalUrl(this.data);
    //console.log(this.data.url);
    this.init();
  },
  methods: {
    init() {
      if (this.data.children == null && this.data.url == "") {
        this.isBlur = true;
      }
    }
  }
};
</script>
