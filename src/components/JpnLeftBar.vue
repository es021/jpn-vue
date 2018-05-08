<template>
  <div id="jpn-left-bar" class="jpn-left-bar">
    <div class="lb-header">
      <router-link class="link" to="/" ><i class="fa fa-home left"></i>
        Menu Utama
      </router-link>
      <!-- <a class="link" v-on:click="goToHome" ><i class="fa fa-home left"></i>
      Menu Utama
      </a> -->
    </div>
    <JpnLeftBarItem v-for="d in data" 
      :data="d" 
      :key="d.id"/>
  </div>
</template>

<script>
import { getNavigation, goToHome } from "../helper/navi-helper";

export default {
  name: "JpnLeftBar",
  data() {
    return {
      data: []
    };
  },
  created: function() {
    this.data = getNavigation();
  },
  methods: {
    goToHome() {
      goToHome();
    }
  }
};
</script>


