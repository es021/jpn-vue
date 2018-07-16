<template>
  <div id="jpn-header" class="jpn-header">
    <div class="h-left">
        <router-link to="/">
          <img class="logo"
            :src="require('../image/jpn-logo-sm.jpg')" 
            style="height: 60px; margin:0 10px;" />
        </router-link>
        <div class="detail">
            <router-link class="title" to="/">
                Jabatan Pendaftaran Negara
            </router-link>
            <div class="subtitle">
                Kementerian Dalam Negeri
            </div>
        </div>
    </div>
    <div v-if="loggedIn" class="text-right h-right">
        <b id="hdr-name" class="text-blue">{{user.name}}</b>
        <br>
        <small>
            <div id="hdr-office" style="margin-bottom: 2px;">{{user.office}}</div>
            <i id="hdr-time">Logged in at <b>{{user.login_time}}</b></i>
        </small>
        <small>
            <div @click="logOut" class="link link-blue">Log Keluar <i class="fa fa-sign-out-alt"></i></div>
        </small>
    </div>
</div>
</template>

<script>
import { goToHome, redirect } from "../helper/navi-helper";
import { AuthHelper } from "../helper/auth-helper";
import { getTimeString } from "../helper/time-helper";

console.log(AuthHelper.getUser());

export default {
  name: "JpnHeader",
  props: {
    loggedIn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      user: {
        name: "",
        office: "",
        login_time: ""
      }
    };
  },
  mounted() {
    if (this.loggedIn) {
      var store = AuthHelper.getStore();
      var user = store.user;

      if (typeof user !== "undefined") {
        this.user.name = user.OPER_NAME;
        this.user.office = `${user.BRANCH_NAME} (${user.BRANCH_CODE})`;
        //+ " " + user.BRANCH_NAME + " " + user.BRANCH_ADD1;
        //+ " " + user.BRANCH_ADD1
        this.user.login_time = getTimeString(store.login_time);
      }
    }
  },
  methods: {
    goToHome() {
      goToHome();
    },
    logOut() {
      var res = confirm("Tekan 'OK' untuk Log Keluar");
      if (res) {
        AuthHelper.logout(() => {
          redirect(this, "/exit");
        });
      }
    }
  }
};
</script>
