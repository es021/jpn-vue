<template>
    <ul :class="{ 'navi-list': true, 'parent': data.isParent }">
      
      <li class="li-item">
        <div class="expand" v-on:click="toggle">
          <i v-if="data.children != null" :class="`fa fa-chevron-circle-${isOpen ? 'down' : 'right'} left sm`"></i>
          <i v-else :class="`fa fa-dot-circle sm left text-muted`"></i>
        </div>

        <router-link 
          :title="`${data.auth}_${data.auth_level}`"
          :to="href" :class="{ 'link': true, 'active': isActive, 'blur':isBlur }">
          {{data.label}}
        </router-link>
        <!-- <a :class="{ 'link': true, 'active': isActive }" :href="href">
          {{data.label}}
        </a> -->
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
import { getNaviInternalUrl, getCurrentPage } from "../helper/navi-helper";

export default {
  name: "JpnLeftBarItem",
  props: {
    data: {
      type: Object
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.init();
      }
    }
  },
  data() {
    return {
      isActive: false,
      isOpen: false,
      isBlur: false,
      href: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.data.children == null && this.data.url == "") {
        this.isBlur = true;
      }

      this.isActive = false;
      this.href = getNaviInternalUrl(this.data);
      var page = getCurrentPage(this.$route);
      if (page == this.data.id) {
        this.isActive = true;
        this.isOpen = true;
        this.$emit("opened", page);
      }
    },
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
