<template>
  <div id="jpn-left-bar" class="jpn-left-bar">
    <div class="lb-header">
      <router-link class="link" to="/" ><i class="fa fa-home left"></i>
        Menu Utama
      </router-link>
      <div :title="JSON.stringify(serverState)" :class="`app-status ${appStatus}`">
        {{appStatus}}
      </div>
      <!-- <a class="link" v-on:click="goToHome" ><i class="fa fa-home left"></i>
      Menu Utama
      </a> -->
    </div>
    <!-- <div class="lb-header">
       <router-link class="link" to="/" ><i class="fa fa-document left"></i>
        Pending Job
      </router-link>
    </div> -->
    <JpnLeftBarItem v-for="d in data" 
      :data="d" 
      :key="d.id"/>
  </div>
</template>

<script>
import { getNavigation, goToHome } from "../helper/navi-helper";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "JpnLeftBar",
  data() {
    return {
      data: [],
      appStatus: ""
    };
  },
  computed: {
    ...mapGetters({
      serverState: "serverState",
      isAppOnline: "isAppOnline"
    })
  },
  created: function() {
    this.data = getNavigation();
  },
  mounted() {
    this.updateAppStatus();
    this.localUpdateWasStatus();
  },
  methods: {
    ...mapMutations({
      updateWasStatus: "updateWasStatus",
      updateDb2Status: "updateDb2Status"
    }),
    updateAppStatus() {
      if (this.isAppOnline()) {
        this.appStatus = "online";
      } else {
        this.appStatus = "offline";
      }
    },
    goToHome() {
      goToHome();
    },
    localUpdateDb2Status() {
      var url = "http://10.23.191.124:8080/test/testDB2.jsp";
    },
    localUpdateWasStatus() {
      console.log("Assaasda");
      this.ping(this.serverState.WASPUrl, reachable => {
        this.updateWasStatus({ online: reachable });
        this.updateAppStatus();
      });

      setInterval(() => {
        this.ping(this.serverState.WASPUrl, reachable => {
          this.updateWasStatus({ online: reachable });
          this.updateAppStatus();
        });
      }, this.serverState.pingInterval);
    },
    ping(ip, callback) {
      var img = new Image();
      var reachable = false;
      img.onload = function() {
        callback(true);
        reachable = true;
      };
      img.onerror = function(err) {
        callback(true);
        reachable = true;
      };
      img.src = "http://" + ip + "/?ver=" + new Date().getTime();
      var timeout = setTimeout(() => {
        if (!reachable) {
          console.log("not reachable");
          callback(false);
        }
      }, this.serverState.pingTimeout);
    }
  }
};
</script>


