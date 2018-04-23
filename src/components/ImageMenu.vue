<template>
  <span>
  <h1>{{title}}</h1>
  <div :class="`jpn-img-menu ${size}`">
    <ImageMenuItem v-for="d in data" 
      :data="d" 
      :size="size"
      :parentId="parentId"
      :key="d.id"></ImageMenuItem>
  </div>
  </span>
</template>

<script>
export default {
  name: "ImageMenu",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: String
    },
    parentId: {
      type: String
    }
  },
  data() {
    return {
      size: ""
    };
  },
  created() {
    if (this.data.length > 8) {
      this.size = "md";
    }
  }
};
</script>
