<template>
  <v-app>
    <!-- <NavBar /> -->
    <ToolBar />
    <v-main>
      <router-view />
    </v-main>
    <BottomNavigation />
  </v-app>
</template>

<script>
import BottomNavigation from "./components/BottomNavigation.vue";
import ToolBar from "./components/ToolBar.vue";
/* import NavBar from "@/components/NavBar.vue"; */

export default {
  name: "App",
  components: {
    /* NavBar */
    BottomNavigation,
    ToolBar,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
#app {
  text-align: center;
  background-color: $gray-light;
}
</style>
