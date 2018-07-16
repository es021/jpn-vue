
<template>
  <span>
    <a v-if="isExternalUrl" :disabled="disabled" :title="title" :href="href" :style="styleObj" :class="classObj">
      <slot></slot>
    </a>
    <router-link v-else :to="href" :disabled="disabled" :title="title" :style="styleObj" :class="classObj">
      <slot></slot>
    </router-link>
  </span>
</template>

<script>
import { isExternalUrl } from "../helper/navi-helper";
export default {
  name: "AppLink",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    href: {
      type: String,
      default: ""
    },
    styleObj: {
      type: Object,
      default: () => {
        return {};
      }
    },
    classObj: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      isExternalUrl: false
    };
  },
  created() {
    this.isExternalUrl = isExternalUrl(this.href);
  }
};
</script>
