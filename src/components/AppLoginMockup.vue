<template>
  <div>
    <JpnHeader :loggedIn="false"></JpnHeader>
    <div v-bind:style="{backgroundImage:backgroundImage}" class="jpn-login jpn-daftar-masuk">

      <div class="daftar-masuk">
          <img class="logo"
            :src="require('../image/jpn-logo-sm.jpg')" 
            style="height: 100px; margin:0 10px;" />
        <h2>Sila Daftar Masuk</h2>
        <div class="my-input">
          <input placeholder="Id Pengguna" type="text" v-model="idPengguna" />
        </div>

        <div class="my-input">
          <input placeholder="Kata Laluan" type="password" v-model="kataLaluan" />
        </div>

        <button @click="onClickLogin" class="btn btn-primary btn-lg">Daftar Masuk</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import { AuthHelper, AuthErr } from "../helper/auth-helper";
import { getRequest } from "../helper/api-helper";
import { Domain, isProd } from "../config/app-config";
export default {
  data() {
    return {
      idPengguna: "",
      kataLaluan: "",
      username: "",
      pass: "",
      err: "",
      user_id: "",
      pc_id: "",
      loading: true,
      backgroundImage: `url('${require(`../image/content-bg.jpg`)}')`
    };
  },
  methods: {
    onClickLogin() {
      //console.log("login", this.idPengguna, this.kataLaluan);
      if (this.idPengguna != "") {
        this.$router.replace(
          this.$route.query.redirect || `/login/${this.idPengguna}-021`
        );
      }
    },
    redirectToHome() {
      this.$router.replace(this.$route.query.redirect || "/");
    }
  }
};
</script>

<style lang="scss" scoped>
.jpn-daftar-masuk {
  //background: #f0f3f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .daftar-masuk {
    width: 400px;
    max-width: 90vw;
    margin-top: -80px;
    padding: 70px 30px;
    background: white;
    box-shadow: 3px 7px 13px -4px rgba(0, 0, 0, 0.5);
    .my-input {
      margin: 40px 10px;
      input {
        font-size: 16px;
        border: none;
        border-bottom: solid 1px gray;
        padding: 5px 0px;
        width: 100%;
      }
    }
  }
}
</style>


