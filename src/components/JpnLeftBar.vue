<template>
  <div class="jpn-left-bar">
    <div class="lb-header">
      <a class="link" href="/"><i class="fa fa-home left"></i>
      Menu Utama
      </a>
    </div>
    <JpnLeftBarItem v-for="d in data" 
      :data="d" 
      :key="d.id"/>
  </div>
</template>

<script>
import { getNavigation } from "../helper/navi-helper";

export default {
  name: "JpnLeftBar",
  data() {
    return {
      data: []
    };
  },
  created: function() {
    this.data = getNavigation();
  }
};
</script>


