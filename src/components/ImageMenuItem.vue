<template>
  <a :href="data.url" v-bind:style="{backgroundImage:backgroundImage}" class="jim-item">
      <div class="detail">
          <div class="label">{{data.label}}</div>
          <div class="desc">{{data.desc}}</div>
      </div>
  </a>
</template>

<script>
import { getNaviUrl } from "../helper/navi-helper";
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
      backgroundImage: `url('${require(`../image/${this.parentId}/${
        this.data.id
      }.jpg`)}')`
    };
  },
  created() {
    this.data.url = getNaviUrl(this.data);
    console.log(this.data.url);
  },
  methods: {}
};
</script>
