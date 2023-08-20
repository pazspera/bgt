<template>
  <v-app>
    <v-toolbar class="bg-neutral-800" :elevation="0">
      <v-container>
        <v-row>
          <v-app-bar-nav-icon><img src="@/assets/img/logo_dark.png" /></v-app-bar-nav-icon>
          <v-toolbar-title>Hello</v-toolbar-title>
        </v-row>
      </v-container>
    </v-toolbar>
    <!-- <NavBar /> -->
    <v-main>
      <router-view />
      <i class="fa-solid fa-magnifying-glass"></i>
      <v-icon icon="mdi:mdi-minus" />
    </v-main>
    <BottomNavigation />
  </v-app>
</template>

<script>
import BottomNavigation from "./components/BottomNavigation.vue";
/* import NavBar from "@/components/NavBar.vue"; */

export default {
  name: "App",
  components: {
    /* NavBar */
    BottomNavigation,
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
