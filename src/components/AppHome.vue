
<template>
<span>
    <JpnHeader></JpnHeader>
    <div class="jpn-bar-content">
      <JpnLeftBar></JpnLeftBar>
      <JpnContent></JpnContent>
    </div>
    <JpnFooter></JpnFooter>
</span>
</template>

<script>
import { AuthHelper } from "../helper/auth-helper";
import { redirect } from "../helper/navi-helper";

export default {
  name: "AppHome",
  created() {
    //postRequest(this);
  },
  mounted() {
    if (!AuthHelper.loggedIn()) {
      redirect(this, "/exit");
      return;
    }
  }
};
</script>
