<template>
  <div id="app bg-gray-100">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ipc from "@/mixins/ipc";

export default Vue.extend({
  name: "App",
  mixins: [ipc]
});
</script>

<style src="./assets/styles/tailwind.css" />

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
