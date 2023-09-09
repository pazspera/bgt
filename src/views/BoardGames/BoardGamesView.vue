<template>
  <HeroSection :title="heroTitle" :bg-class="bgClass" />
  <v-container class="height">
    <h1>BoardGames View</h1>
  </v-container>
  <BoardGamesList/>
  <HelpIcon />
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import HelpIcon from "@/components/HelpIcon.vue";
import BoardGamesList from './BoardGamesList.vue';

export default {
  name: "BoardGamesView",
  components: { HeroSection, HelpIcon, BoardGamesList },
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
