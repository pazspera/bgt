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
    <div v-if="localPlayers.players.length" class="row row-cols-1 row-cols-md-2 g-3">
      <div v-for="player in localPlayers.players" :key="player.id" class="col">
        <PlayerCard :player="player" @delete="handleDelete(player.id)" />
      </div>
    </div>

    <!-- Loading message -->
    <div v-if="!localPlayers.players.length && !error" class="row">
      <div class="col">
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
/* Composables */
import getPlayers from "@/composables/getPlayers";
/* Components */
import PlayerCard from "@/components/Players/PlayerCard.vue";

export default {
  name: "PlayersView",
  components: { PlayerCard },
  setup() {
    let { players, error, load } = getPlayers();

    let localPlayers = reactive({ players: players });

    load();

    const handleDelete = (id) => {
      // Gets the deleted id from the PlayerCard
      // Then we filter the players array to remove the deleted player from the list
      localPlayers = localPlayers.value.filter((player) => {
        return player.id !== id;
      });

      load();
      localPlayers = players;
    };

    return { localPlayers, error, load, handleDelete };
  },
};
</script>

<style></style>
