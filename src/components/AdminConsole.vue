<template>
<div>
    <h2>Admin Console</h2>
    <div v-bind:style="style">
      <div v-bind:style="styleItem">
        <h4>Server Toogle</h4>
        {{serverState.overrideOffline}} - <button class="btn btn-blue" @click="toogleByKey('overrideOffline')">Toogle Override Offline</button>
        <br>
        {{serverState.overrideAuth}} - <button class="btn btn-blue"  @click="toogleByKey('overrideAuth')">Toogle Override Auth</button>
        <h4>Server Update</h4>
        Ping Interval : <input ref="pingInterval" type="number" :value="serverState.pingInterval"/>
        <br>
        Ping Timeout : <input ref="pingTimeout" type="number" :value="serverState.pingTimeout"/>
        <br>
        WASP Url : <input ref="WASPUrl" type="text" :value="serverState.WASPUrl"/>
        <br>
        <button class="btn btn-blue" @click="updateAll">Update</button>
      </div>
      <div v-bind:style="styleItem">
        <h4>Server Status</h4>
        {{serverState}}
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
        maxWidth: "400px",
        textAlign:"left",
        margin:"10px"
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
      updateOverrideServerState: "updateOverrideServerState"
    }),
    updateAll() {
      var newState = {};
      for (var key in this.$refs) {
        var r = this.$refs[key];
        newState[key] = r.value;
      }
      var param = { newState: newState };
      this.updateOverrideServerState(param);
    },
    toogleByKey(key) {
      var newState = {};
      newState[key] = !this.serverState[key];
      var param = { newState: newState };
      this.updateOverrideServerState(param);
    }
  }
};
</script>
