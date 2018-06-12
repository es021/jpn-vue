<template>
  <div>
    <JpnHeader :loggedIn="false"></JpnHeader>
    <div v-bind:style="{backgroundImage:backgroundImage}" class="jpn-login">
      <h2>Daftar Masuk</h2>
      <p v-if="$route.query.redirect">
        You need to login first.
      </p>
      <form class="jpn-form" @submit.prevent="login">
        <!-- Username -->
        <div class="form-item">
          <div class="form-label">Username *</div>
          <div class="form-input">
            <input ref="username" v-model="username" placeholder="Username">
          </div>
        </div>
        <!-- Password -->
         <div class="form-item">
            <div class="form-label">Password *</div>
            <div class="form-input">
              <input ref="pass" v-model="pass" placeholder="*****" type="password">        
            </div>
        </div>
        <!-- Error -->
        <div v-if="err != ''" class="form-item error">
          <span v-html="err"></span>
        </div>
        <!-- Submit -->
        <div class="form-item submit">
          <button class="btn btn-lg btn-blue" :disabled="loading" type="submit">
            <span v-if="loading">Logging In..</span>
            <span v-else>Login</span>
           </button>
        </div>
      </form>
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
      loading: false,
      backgroundImage: `url('${require(`../image/content-bg.jpg`)}')`
    };
  },
  mounted() {
    this.redirectToHomeIfLoggedIn();
  },
  watch: {
    $route(to, from) {
      this.redirectToHomeIfLoggedIn();
    }
  },
  methods: {
    redirectToHomeIfLoggedIn() {
      if (AuthHelper.loggedIn()) {
        console.log("Redirect To Home");
        this.$router.replace(this.$route.query.redirect || "/");
      } else {
        console.log("not logged in");
      }
    },
    login() {
      if (this.username == "") {
        this.$refs.username.focus();
        this.err = "Username cannot be blank";
        return;
      }

      if (this.pass == "") {
        this.$refs.pass.focus();
        this.err = "Password cannot be blank";
        return;
      }

      this.loading = true;
      this.err = "";

      AuthHelper.login(this.username, this.pass, res => {
        this.loading = false;

        if (!res.authenticated) {
          switch (res.err) {
            case AuthErr.INVALID_USER:
              this.err = `Username <b>${this.username}</b> does not exist`;
              break;
            case AuthErr.WRONG_PASSWORD:
              this.err = `Invalid Password`;
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

