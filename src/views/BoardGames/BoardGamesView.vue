<template>
  <HeroSection :title="heroTitle" :bg-class="bgClass" />
  <v-container class="height">
    <h1>BoardGames View</h1>
  </v-container>
  <HelpIcon />
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import HelpIcon from "@/components/HelpIcon.vue";

export default {
  name: "BoardGamesView",
  components: { HeroSection, HelpIcon },
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
</style>
