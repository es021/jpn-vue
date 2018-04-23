<template>
  <div class="jpn-header">
    <div class="h-left">
        <img class="logo" v-on:click="goToHome" 
          :src="require('../image/jpn-logo-sm.jpg')" 
          style="height: 60px; margin:0 10px;" />
        <div class="detail">
            <div class="title" v-on:click="goToHome">
                Jabatan Pendaftaran Negara
            </div>
            <div class="subtitle">
                Kementerian Dalam Negeri
            </div>
        </div>
    </div>
    <div class="text-right h-right">
        <b id="hdr-name" class="text-blue">{{user.name}}</b>
        <br>
        <small>
            <span id="hdr-office">{{user.office}}</span>
            <br>
            <i id="hdr-time">{{user.login_time}}</i>
        </small>
        <small>
            <div class="link link-blue">Keluar <i class="fa fa-sign-out-alt"></i></div>
        </small>
    </div>
</div>
</template>

<script>
import { goToHome } from "../helper/navi-helper";
export default {
  name: "JpnHeader",
  data() {
    return {
      user: {
        name: "Wan Zulsarhan",
        office: "JPN IBU PEJABAT PUTRAJAYA",
        login_time: "April 28, 2018 09:30 AM"
      }
    };
  },
  methods: {
    goToHome(){
      goToHome();
    }
  }
};
</script>
