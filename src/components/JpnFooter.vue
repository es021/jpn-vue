<template>
 <div class="jpn-footer">
   <div class="navi-ver">
     Version : {{naviVer}} {{test}}
   </div>
</div>
</template>

<script>
import { getNaviCurrentVer } from "../helper/navi-helper";

export default {
  name: "JpnFooter",
  props: {
    test: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      naviVer: ""
    };
  },
  created() {
    this.naviVer = getNaviCurrentVer();
  }
};
</script>

<style lang="scss" scoped>
.jpn-footer {
  .navi-ver {
    opacity: 0.8;
    font-size: 13px;
  }
}
</style>
