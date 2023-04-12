<template>
  <!-- Players list -->
  <div v-if="playerStore.totalCount" class="row row-cols-1 row-cols-md-2 g-3">
    <div v-for="player in playerStore.players" :key="player.id">
      <PlayerCard :player="player" />
    </div>
  </div>

  <!-- Loading message -->
  <div v-if="!playerStore.totalCount" class="row">
    <div class="col">
      <LoadingSpinner />
    </div>
  </div>
</template>

<script>
import { usePlayerStore } from "@/stores/PlayerStore";
import PlayerCard from "@/components/Players/PlayerCard.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "PlayersList",
  components: { PlayerCard, LoadingSpinner },
  mounted() {
    document.title = "Jugadores - Board Game Tracker";
  },
  setup() {
    const playerStore = usePlayerStore();

    console.log(playerStore.totalCount);

    return { playerStore };
  },
};
</script>

<style></style>
