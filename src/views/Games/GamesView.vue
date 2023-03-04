<template>
  <HeroSection :title="heroTitle" :bg-class="bgClass" />
  <h1>Games View</h1>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";

export default {
  name: "GamesView",
  components: { HeroSection },
  data() {
    return {
      heroTitle: "Partidas",
      bgClass: "gamesBg",
    };
  },
  mounted() {
    document.title = "Partidas - Board Game Tracker";
  },
};
</script>

<style></style>
