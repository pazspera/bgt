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
    <v-bottom-navigation class="bg-neutral-800" style="height: 72px">
      <router-link class="nav-link" :to="{ name: 'BoardGames' }">
        <v-btn value="ludoteca">
          <i class="fa-solid fa-dice"></i>
          <span>Ludoteca</span>
        </v-btn>
      </router-link>

      <router-link class="nav-link" :to="{ name: 'Players' }">
        <v-btn value="jugadores">
          <i class="fa-solid fa-users"></i>
          <span>Jugadores</span>
        </v-btn>
      </router-link>

      <router-link class="nav-link" :to="{ name: 'Games' }">
        <v-btn value="partidas">
          <i class="fa-solid fa-box-archive"></i>
          <span>Partidas</span>
        </v-btn>
      </router-link>
    </v-bottom-navigation>
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
