<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";

import Vue from "vue";

export default Vue.extend({
  name: "ViewHome",
  components: {
    HelloWorld
  }
});
</script>
