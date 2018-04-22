<template>
  <div>
    <h1>{{title}}</h1>
    <br>
    {{data}}
  </div>
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
    }
  },
  data() {
    return {
      stuff: {}
    };
  }
};
</script>
