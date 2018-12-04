
<template>
<span>
    <div v-if="loading">
      <br>
      <i class="fa fa-spinner fa-pulse fa-2x"></i>
      <br>
      Loading App Configuration...
    <div style="color:red;" v-if="err !='' ">
      <div v-if="doRefresh">
        Refresh Page
      </div>
      <div v-else>
        <br>
        <b>ERROR</b><br>
        {{err}}
      </div>
    </div>
    </div>
    <span v-else>
      <AppPopup></AppPopup>
      <JpnHeader></JpnHeader>
      <div class="jpn-bar-content">
        <JpnLeftBar></JpnLeftBar>
        <JpnContent></JpnContent>
      </div>
      <JpnFooter></JpnFooter>
    </span>
</span>
</template>

<script>
import { AuthHelper } from "../helper/auth-helper";
import { redirect, loadNaviFromDB } from "../helper/navi-helper";

export default {
  name: "AppHome",
  data() {
    return {
      loading: true,
      err: ""
    };
  },
  created() {
    // load initial configuration
    this.doRefresh = false;
    loadNaviFromDB(
      res => {
        this.loading = false;
      },
      err => {
        console.log(err);
        if (typeof err === "string") {
          this.err = err;
        } else {
          console.log(err);
          this.doRefresh = true;
          //this.err = "Refreshing Page";
          location.reload();
        }
      }
    );
  },
  mounted() {
    this.checkUserSession();
  },
  watch: {
    $route(to, from) {
      this.checkUserSession();
    }
  },
  methods: {
    checkUserSession() {
      if (!AuthHelper.loggedIn(this.goToExit)) {
        this.goToExit();
        return;
      }
      // else if (AuthHelper.isSessionExpired()) {
      //   AuthHelper.logout(() => {
      //     redirect(this, "/exit");
      //   });
      //   return;
      // }
    },
    goToExit() {
      redirect(this, "/exit");
    }
  }
};
</script>
