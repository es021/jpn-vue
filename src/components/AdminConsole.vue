<template>
<div>
    <h2>Admin Console</h2>
    <div v-bind:style="style">
      <div v-bind:style="styleItem">
        <h4>Server Status</h4>
        {{serverState}}
      </div>
      <div v-bind:style="styleItem">
        <h4>Server Action</h4>
        <button class="btn btn-blue" @click="toogleOverrideOnline">Toogle Override Offline</button>
        <button class="btn btn-blue"  @click="toogleOverrideAuth">Toogle Override Auth</button>
      </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AdminConsole",
  data() {
    return {
      style: {
        display: "flex",
        justifyContent: "center"
      },
      styleItem: {
        maxWidth: "400px"
      }
    };
  },
  computed: {
    ...mapGetters({
      serverState: "serverState"
    })
  },
  created() {},
  methods: {
    ...mapMutations({
      updateOverrideOffline: "updateOverrideOffline",
      updateOverrideAuth: "updateOverrideAuth"
    }),
    toogleOverrideOnline() {
      var newState = { status: !this.serverState.overrideOffline };
      this.updateOverrideOffline(newState);
    },
    toogleOverrideAuth() {
      var newState = { status: !this.serverState.overrideAuth };
      this.updateOverrideAuth(newState);
    }
  }
};
</script>
