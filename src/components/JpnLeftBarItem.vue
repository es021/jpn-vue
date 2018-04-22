<template>
    <ul :class="{ 'navi-list': true, 'parent': data.isParent }">
      
      <li class="li-item">
        <div class="expand" v-on:click="toggle">
          <i v-if="data.children != null" :class="`fa fa-chevron-circle-${isOpen ? 'down' : 'right'} left sm`"></i>
          <i v-else :class="`fa fa-dot-circle sm left text-muted`"></i>
        </div>
        <a :class="{ 'link': true, 'active': isActive }" :href="href">
          {{data.label}}
        </a>
      </li>

      <div class="children" :hidden="!isOpen">
        <JpnLeftBarItem v-for="c in data.children" 
          @opened="onChildOpened" 
          :key=c.id 
          :data="c"/>
      </div>

    </ul>
</template>

<script>
import { getNaviUrl } from "../helper/navi-helper";
import { _GET } from "../helper/util-helper";

export default {
  name: "JpnLeftBarItem",
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      isActive: false,
      isOpen: false,
      href: ""
    };
  },
  created() {
    this.href = getNaviUrl(this.data);
    var page = _GET("page"); 
    if (page == this.data.id) {
      this.isActive = true;
      this.isOpen = true;
      this.$emit("opened", page);
    }
  },
  methods: {
    onChildOpened: function(page) {
      this.$emit("opened", page);
      return (this.isOpen = true);
    },
    toggle: function(event) {
      return (this.isOpen = !this.isOpen);
    }
  }
};
</script>
