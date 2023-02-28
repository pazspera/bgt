<template>
  <h1>Players View</h1>
  <div class="container">
    <!-- Nav tabs -->
    <div class="row">
      <div class="col-6 offset-3 mb-3">
        <nav class="nav nav-pills nav-justified">
          <a class="nav-link active" aria-current="page" href="#">Todes les jugadores</a>
          <a class="nav-link" href="#">Agregar nuevo jugador</a>
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

export default {
  name: "PlayersView",
  components: { PlayerCard },
  data() {
    return {
      players: [],
      error: "",
    };
  },
  mounted() {
    fetch("http://localhost:3000/players")
      .then((res) => res.json())
      .then((data) => (this.players = data))
      .catch((err) => {
        console.log(err);
        this.error = err;
      });
  },
  methods: {
    handleDelete(id) {
      this.players = this.players.filter((player) => {
        return player.id !== id;
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
