<template>
  <HeroSection :title="heroTitle" :bg-class="bgClass" />
  <div class="container my-5">
    <!-- Nav tabs -->
    <div class="row">
      <div class="col-12 col-lg-10 offset-lg-1 col-xxl-8 offset-xxl-2 mb-3">
        <nav class="nav nav-pills nav-justified">
          <a class="nav-link active" aria-current="page" href="#">Todes les jugadores</a>
          <router-link class="nav-link" :to="{ name: 'AddPlayer' }">Agregar nuevo jugador</router-link>
        </nav>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="row">
      <div class="col">
        <p>{{ error }}</p>
      </div>
    </div>

    <!-- We're showing the players here -->
    <div v-if="players.length" class="row row-cols-1 row-cols-md-2 g-3">
      <div v-for="player in players" :key="player.id" class="col">
        <PlayerCard :player="player" @deletePlayer="handleDelete(player.id)" />
      </div>
    </div>

    <!-- Loading message -->
    <div v-if="!players.length && !error" class="row">
      <div class="col">
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
/* Components */
import PlayerCard from "@/components/Players/PlayerCard.vue";
import HeroSection from "@/components/HeroSection.vue";

export default {
  name: "PlayersView",
  components: { PlayerCard, HeroSection },
  data() {
    return {
      players: [],
      error: "",
      heroTitle: "Jugadores",
      bgClass: "playersBg",
    };
  },
  mounted() {
    this.getPlayers();
    document.title = "Jugadores - Board Game Tracker";
  },
  methods: {
    handleDelete(id) {
      this.players = this.players.filter((player) => {
        return player.id !== id;
      });
    },
    async getPlayers() {
      try {
        fetch("http://localhost:3000/players")
          .then((res) => res.json())
          .then((data) => (this.players = data));
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
