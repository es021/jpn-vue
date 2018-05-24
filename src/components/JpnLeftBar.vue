<template>
  <div id="jpn-left-bar" class="jpn-left-bar">
    <div class="lb-header">
      <router-link class="link" to="/" ><i class="fa fa-home left"></i>
        Menu Utama
      </router-link>
      <div :class="`app-status ${appStatus}`">
        {{appStatus}}
      </div>
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
import { getRequest } from "../helper/api-helper";
import { WASPUrl } from "../config/app-config";

export default {
  name: "JpnLeftBar",
  data() {
    return {
      data: [],
      appStatus: "online"
    };
  },
  created: function() {
    this.data = getNavigation();
  },
  mounted() {

    return;
    this.checkAppStatus();
  },
  methods: {
    checkAppStatus() {
      getRequest(
        WASPUrl,
        res => {
          this.appStatus = "online";
        },
        err => {
          this.appStatus = "offline";
        }
      );
    },
    goToHome() {
      goToHome();
    }
  }
};
</script>


