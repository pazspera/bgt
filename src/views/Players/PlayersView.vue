<template>
  <HeroSection :title="heroTitle" :bg-class="bgClass" />
  <div class="container my-5">
    <!-- Nav tabs -->
    <!-- <div class="row">
      <div class="col-12 col-lg-10 offset-lg-1 col-xxl-8 offset-xxl-2 mb-3">
        <nav class="nav nav-pills nav-justified">
          <a class="nav-link active" aria-current="page" href="#">Todes les jugadores</a>
          <router-link class="nav-link" :to="{ name: 'AddPlayer' }">Agregar nuevo jugador</router-link>
        </nav>
      </div>
    </div>

    <PlayerList /> -->

    <!-- Acá va la prueba con el nuevo router-link -->
    <div class="row">
      <div class="col-12 col-lg-10 offset-lg-1 col-xxl-8 offset-xxl-2 mb-3">
        <nav class="nav nav-pills nav-justified">
          <router-link class="nav-link" :to="{ name: 'PlayersList' }"> Todxs lxs jugadores </router-link>
          <router-link class="nav-link" :to="{ name: 'AddPlayer' }">Agregar nuevo jugador</router-link>
        </nav>
      </div>
      <div class="col-12">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
/* Components */
/* import PlayerList from "@/views/Players/PlayersList.vue"; */
import HeroSection from "@/components/HeroSection.vue";

export default {
  name: "PlayersView",
  components: { /* PlayerList, */ HeroSection },
  data() {
    return {
      heroTitle: "Jugadores",
      bgClass: "playersBg",
    };
  },
  mounted() {
    document.title = "Jugadores - Board Game Tracker";
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
