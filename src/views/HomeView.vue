<template>
  <div class="home">
    <HeroSection :title="heroTitle" :bg-class="bgClass"/>
    <h1>Home</h1>
    <p>En el home van a estar las partidas</p>
    <p>O puede ser que estén las últimas partidas. Con un btn que lleve al registro de todas las partidas</p>
    <p>Entonces partidas tiene que tener su propia view</p>
  </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";

export default {
  name: "HomeView",
  components: { HeroSection },
  data() {
    return {
      heroTitle: "Board Game Tracker",
      bgClass: "indexBg",
    };
  },
  mounted() {
    document.title = "Home - Board Game Tracker";
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
