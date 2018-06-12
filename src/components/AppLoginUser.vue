<template>
  <div>
    <JpnHeader :loggedIn="false"></JpnHeader>
    <div v-bind:style="{backgroundImage:backgroundImage}" class="jpn-login">
      <h2>Daftar Masuk</h2>
      <div v-if="loading">
        <i class="fa fa-spinner fa-pulse fa-3x"></i><br><br>
        Logging in as <b>{{user_id}}</b> from PC <b>{{pc_id}}</b>
      </div>
      <div v-else>
        <div v-if="err != ''" class="text-red">
          <span v-html="err"></span>
        </div>
        <div v-else>
          Successfully Logged In
        </div>
      </div>
    </div>
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
      user_id: "",
      pc_id: "",
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
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  methods: {
    init() {
      this.user_id = this.$route.params.user_id;

      if (this.user_id != null) {
        // user_id split into user_id and pc_id
        var params = this.user_id.split("-");
        this.user_id = params[0];
        this.pc_id = params[1];

        if (AuthHelper.loggedIn()) {
          // if logged in user is not same as user_id in param
          // , we need to logout first
          var user = AuthHelper.getUser();
          if (this.user_id.toUpperCase() != user.OPER_ID.toUpperCase()) {
            AuthHelper.logout();
            this.login();
          } else {
            this.loading = false;
            this.redirectToHome();
          }
        } else {
          this.login();
        }
      } else {
        this.loading = false;
        this.err = "No User Id Was Provided";
      }
    },
    redirectToHome() {
      this.$router.replace(this.$route.query.redirect || "/");
    },
    login() {
      this.loading = true;
      this.err = "";

      AuthHelper.loginWithUser(this.user_id, this.pc_id, res => {
        this.loading = false;
        if (!res.authenticated) {
          switch (res.err) {
            case AuthErr.INVALID_USER:
              this.err = `No valid user session found for <b>${
                this.user_id
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

