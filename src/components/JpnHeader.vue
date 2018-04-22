<template>
  <div class="jpn-header">
    <div class="h-left">
        <img class="logo" src="/test-e/asset/image/jpn-logo-sm.jpg" style="height: 60px; margin:0 10px;" />
        <div class="detail">
            <div class="title">
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
  }
};
</script>

<style scoped lang="scss">
@import "../style/_constant.scss";
.jpn-header {
  /*    display: -webkit-box;    
    display: -moz-box;     
    display: -ms-flexbox;   
    display: -webkit-flex; 
    display: flex;*/

  background: white;
  text-align: left;
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding: 0 10px;
  box-shadow: 3px 2px 6px rgba(0, 0, 0, 0.5);
  .h-left {
    align-items: center;
    display: flex;
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
