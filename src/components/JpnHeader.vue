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
            <span id="hdr-office">{{user.office}}</span>
            <br>
            <i id="hdr-time">{{user.login_time}}</i>
        </small>
        <small>
            <div @click="logOut" class="link link-blue">Keluar <i class="fa fa-sign-out-alt"></i></div>
        </small>
    </div>
</div>
</template>

<script>
import { goToHome, redirect } from "../helper/navi-helper";
import { AuthHelper } from "../helper/auth-helper";
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
        //office: "TODO BRANCH OFFICE",
        office: "JPN IBU PEJABAT PUTRAJAYA",
        //login_time: "April 28, 2018 09:30 AM"
        login_time: ""
      }
    };
  },
  mounted() {
    if (this.loggedIn) {
      var user = AuthHelper.getUser();

      if (typeof user !== "undefined") {
        this.user.name = user.OPER_NAME;
        // TODO Branch
        this.user.login_time = user.OPER_LAST_SIGNON_DATE;
        this.user.login_time += " " + user.Oper_Last_Logon_Time;
      }
    }
  },
  methods: {
    goToHome() {
      goToHome();
    },
    logOut() {
      var res = confirm("Tekan 'OK' Untuk Keluar");
      if (res) {
        AuthHelper.logout(() => {
          redirect(this, "/exit");
        });
      }
    }
  }
};
</script>
