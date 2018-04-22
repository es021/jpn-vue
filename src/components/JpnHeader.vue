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
    <div class="text-center h-right">
        <small>
            <i>Selamat Bertugas</i>
        </small>
        <br>
        <b id="hdr-name">{{user.name}}</b>
        <br>
        <small>
            <span id="hdr-office">{{user.office}}</span>
            <br>
            <i id="hdr-time">{{user.login_time}}</i>
        </small>
    </div>
</div>
</template>

<script>
import { AppRoot } from "../config/app-config";
export default {
  name: "JpnHeader",
  data() {
    return {
      user: {
        name: "Wan Zulsarhan",
        office: "JPN IBU PEJABAT PUTRAJAYA",
        login_time: "Month DD, YYY | HH:MM AM"
      }
    };
  },
  methods: {
    goToHome() {
      window.location = AppRoot;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../style/_constant.scss";
@import "../style/_mixin.scss";
.jpn-header {
  @include flex;
  @include flex-align(center);

  background: white;
  text-align: left;
  justify-content: space-between;

  padding: 0 10px;
  box-shadow: 3px 2px 6px rgba(0, 0, 0, 0.5);
  .h-left {
    @include flex;
    @include flex-align(center);

    img.logo {
      height: $HEADER-HEIGHT;
    }
    .title {
      color: $COLOR-BLUE;
      font-weight: bold;
      font-size: 25px;
    }
    .subtitle {
      opacity: 0.8;
    }

    .title,
    img.logo {
      cursor: pointer;
    }
    .title:hover,
    img.logo:hover {
      opacity: 0.7;
    }
    .title:active,
    img.logo:active {
      opacity: 1;
    }
  }

  .h-right {
    line-height: 15px;
    text-align: center;
    margin-right: 10px;
  }
}
</style>
