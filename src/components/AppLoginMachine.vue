<template>
  <div>
    <JpnHeader :loggedIn="false"></JpnHeader>

    <div v-bind:style="{backgroundImage:backgroundImage}" class="jpn-login">
      <h2>Daftar Masuk</h2>
      <div v-if="loading">
        Logging In With PC No {{machine_no}} ...
      </div>
      <div v-else>
        <div v-if="err != ''" class="error">
          <span v-html="err"></span>
        </div>
        <div v-else>
          Successfully Logged In
        </div>
      </div>
    </div>
    <!--
    <div v-bind:style="{backgroundImage:backgroundImage}" class="jpn-login">
      <h2>Daftar Masuk</h2>
      <p v-if="$route.query.redirect">
        You need to login first.
      </p>
      <form class="jpn-form" @submit.prevent="login">
         <div class="form-item">
            <div class="form-label">Machine No *</div>
            <div class="form-input">
              <input ref="machine_no" v-model="machine_no" placeholder="" type="text">        
            </div>
        </div>
        <div v-if="err != ''" class="form-item error">
          <span v-html="err"></span>
        </div>
        <div class="form-item submit">
          <button class="btn btn-lg btn-blue" :disabled="loading" type="submit">
            <span v-if="loading">Logging In..</span>
            <span v-else>Login</span>
           </button>
        </div>
      </form>
    </div>
    !-->
  </div>
</template>

<script>
import { AuthHelper, AuthErr } from "../helper/auth-helper";
export default {
  data() {
    return {
      username: "",
      pass: "",
      err: "",
      machine_no: "",
      loading: true,
      backgroundImage: `url('${require(`../image/content-bg.jpg`)}')`
    };
  },
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.machine_no = this.$route.params.machine_no;
      //console.log(this.$route.params);

      if (this.machine_no != null) {
        if (AuthHelper.loggedIn()) {
          this.loading = false;
          this.redirectToHome();
        } else {
          this.login();
        }
      } else {
        this.loading = false;
        this.err = "No Machine No Was Provided";
      }
    },
    redirectToHome() {
      //console.log("Redirect To Home");
      this.$router.replace(this.$route.query.redirect || "/");
    },
    login() {
      this.loading = true;
      this.err = "";

      AuthHelper.loginWithMachineNo(this.machine_no, res => {
        this.loading = false;
        if (!res.authenticated) {
          switch (res.err) {
            case AuthErr.INVALID_MACHINE_NO:
              this.err = `No valid user session found for <b>PC Number ${
                this.machine_no
              }</b>`;
              break;
            default:
              this.err = res.err;
              break;
          }
        } else {
          this.redirectToHome();
        }
      });
    }
  }
};
</script>

