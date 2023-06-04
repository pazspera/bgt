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
      <div class="col-12 col-lg-8 offset-lg-2 col-xxl-6 offset-xxl-3 mb-5">
          <router-link class="nav-link internal-nav-link" :to="{ name: 'PlayersList' }"> Todxs lxs jugadores </router-link>
          <router-link class="nav-link internal-nav-link" :to="{ name: 'AddPlayer' }">Agregar nuevx jugador</router-link>
        <nav class="nav nav-pills nav-justified">
        </nav>
      </div>
      <!-- <div class="col-12 mb-3">
        <router-link class="btn btn__primary" :to="{ name: 'AddPlayer' }">Agregar nuevx jugador</router-link>
      </div> -->

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

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
.internal-nav-link {
  color: $black !important;
  padding: 0.5rem 1rem;
  display: block;
  font-family: $font-text;
  font-weight: 700;
  letter-spacing: 0.1rem;
}

.router-link-exact-active {
  background-color: $primary-light;
  color: $white !important;
}

.nav-pills .nav-link {
  border-radius: 0;
}
</style>
