<template>
  <h1>Players View</h1>
  <div class="container">
    <!-- Nav tabs -->
    <div class="row">
      <div class="col-6 offset-3">
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
      <PlayerList :players="players" />
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
/* Composables */
import getPlayers from "@/composables/getPlayers";
/* Components */
import PlayerList from "@/components/Players/PlayerList.vue";

export default {
  name: "PlayersView",
  components: { PlayerList },
  setup() {
    const { players, error, load } = getPlayers();

    load();

    return { players, error, load };
  },
};
</script>

<style></style>
