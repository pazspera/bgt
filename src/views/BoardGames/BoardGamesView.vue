<template>
  <HeroSection :title="heroTitle" :bg-class="bgClass" />
  <v-container class="height">
    <h1>BoardGames View</h1>
    <AddGameButtonVue />
  </v-container>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import AddGameButtonVue from "@/components/AddGameButton.vue";

export default {
  name: "BoardGamesView",
  components: { HeroSection, AddGameButtonVue },
  data() {
    return {
      heroTitle: "Ludoteca",
      bgClass: "boardGamesBg",
    };
  },
  mounted() {
    document.title = "Juegos - Board Game Tracker";
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.height {
  min-height: 100vh;
}

</style>
