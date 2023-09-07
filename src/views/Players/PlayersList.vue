<template>
  <!-- Players list -->
  <div v-if="playerStore.totalCount" class="row row-cols-1 row-cols-md-2 g-3">
    <div v-for="player in playerStore.players" :key="player.id">
      <PlayerCard :player="player" />
    </div>
  </div>
  <p>playerStore.totalCount: {{ playerStore.totalCount }}</p>

  <!-- Loading message -->
  <div v-if="!playerStore.totalCount" class="row">
    <div class="col">
      <LoadingSpinner />
    </div>
  </div>
</template>

<script>
import { usePlayerStore } from "@/stores/PlayerStore";
/* import { storeToRefs } from "pinia"; */
import PlayerCard from "@/components/Players/PlayerCard.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { ref, watch } from "vue";

export default {
  name: "PlayersList",
  components: { PlayerCard, LoadingSpinner },
  mounted() {
    document.title = "Jugadores - Board Game Tracker";
  },
  setup() {
    const playerStore = usePlayerStore();

    // fetch players

    playerStore.getPlayers();

    const currentPlayers = ref(playerStore.totalCount);
    console.log(currentPlayers.value);

    playerStore.$subscribe((mutation, state) => {
      console.log("A change happened");
      console.log(mutation, state);
    });

    watch(playerStore.totalCount, () => {
      console.log("the amount of players changed");
    });

    return { playerStore };
  },
};
</script>

<style></style>
