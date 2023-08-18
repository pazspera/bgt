<template>
  <HeroSection :title="heroTitle" :bg-class="bgClass" />
  <h1>BoardGames View</h1>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";

export default {
  name: "BoardGamesView",
  components: { HeroSection },
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

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
