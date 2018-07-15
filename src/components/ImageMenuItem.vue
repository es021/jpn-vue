<template>
  <router-link :to="href" :href="href" v-bind:style="{backgroundImage:backgroundImage}" class="jim-item">
      <div :class="`detail`">
          <div class="label">{{data.label}}</div>
          <div class="desc">{{data.desc}}</div>
      </div>
  </router-link>
  <!-- <a :href="data.url" v-bind:style="{backgroundImage:backgroundImage}" class="jim-item">
      <div class="detail">
          <div class="label">{{data.label}}</div>
          <div class="desc">{{data.desc}}</div>
      </div>
  </a> -->
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
    //console.log(this.data.url);

    this.backgroundImage = `url('${require(`../image/${this.parentId}/${
      this.data.id
    }.jpg`)}')`;
  },
  methods: {}
};
</script>
