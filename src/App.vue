<template>
  <v-app>
    <v-app-bar class="bg-neutral-800">
      <v-container>
        <v-row>
          <v-app-bar-nav-icon><img src="@/assets/img/logo_dark.png" /></v-app-bar-nav-icon>
          <v-app-bar-title>Hello</v-app-bar-title>
        </v-row>
      </v-container>
    </v-app-bar>
    <!-- <NavBar /> -->
    <router-view />
    <i class="fa-solid fa-magnifying-glass"></i>
    <v-icon icon="mdi:mdi-minus" />
  </v-app>
</template>

<script>
/* import NavBar from "@/components/NavBar.vue"; */

export default {
  name: "App",
  components: {
    /* NavBar */
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
