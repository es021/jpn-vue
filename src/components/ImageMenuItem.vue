<template>
   <!-- <router-link :to="href"  v-bind:style="{backgroundImage:backgroundImage}" class="jim-item">
      <div :class="`detail`">
          <div class="label">{{data.label}}</div>
          <div class="desc">{{data.desc}}</div>
      </div>
  </router-link>    -->
  <AppLink :href="href" :styleObj="{backgroundImage:backgroundImage}" :classObj="{'jim-item': true}">
    <div :class="`detail`">
          <div class="label">{{data.label}}</div>
          <div class="desc">{{data.desc}}</div>
      </div>
  </AppLink> 
</template>

<script>
import { getNaviInternalUrl } from "../helper/navi-helper";
export default {
  name: "ImageMenuItem",
  props: {
    data: {
      type: Object
    },
    parentId: {
      type: String
    }
  },
  data() {
    return {
      extraClass: "",
      href: "",
      backgroundImage: `url('${require(`../image/general-list.jpg`)}')`
    };
  },
  created() {
    // somehow the props passed down is binded to other props as well
    // demit
    this.href = getNaviInternalUrl(this.data);
    this.backgroundImage = `url('${require(`../image/${this.parentId}/${
      this.data.id
    }.jpg`)}')`;
  },
  methods: {}
};
</script>
