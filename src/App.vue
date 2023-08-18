<template>
  <v-app>
    <!-- <v-app-bar>
      <v-app-bar-title>Hello</v-app-bar-title>
    </v-app-bar> -->
    <NavBar />
    <router-view />
    <i class="fa-solid fa-magnifying-glass"></i>
    <v-icon icon="mdi:mdi-minus" />
  </v-app>
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
