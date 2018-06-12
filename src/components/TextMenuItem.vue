<template>
  <router-link :to="href" class="jtm-item">
      <div class="detail">
          <div class="label">{{data.label}}</div>
      </div>
  </router-link>
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
  data() {
    return {
      href: "",
    };
  },
  created() {
    // somehow the props passed down is binded to other props as well
    // demit

    this.href = getNaviInternalUrl(this.data);
    //console.log(this.data.url);
  },
  methods: {}
};
</script>
