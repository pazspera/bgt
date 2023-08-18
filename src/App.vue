<template>
  <NavBar />
  <router-view />
  <i class="fa-solid fa-magnifying-glass"></i>
  <v-icon icon="mdi:mdi-minus" />
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: { NavBar },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
#app {
  text-align: center;
  background-color: $gray-light;
}
</style>
