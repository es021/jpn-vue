<template>
  <span>
  <h1>{{title}}</h1>
  <div :class="`jpn-text-menu`">
    <TextMenuItem v-for="d in data" 
      :data="d" 
      :size="size"
      :parentId="parentId"
      :key="d.id"></TextMenuItem>
  </div>
  </span>
</template>

<script>
export default {
  name: "TextMenu",
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
  }
};
</script>
