<template>
  <div v-for="player in players" :key="player.id">
    <PlayerCard :player="player" />
  </div>
</template>

<script>
/* Components */
import PlayerCard from "@/components/Players/PlayerCard.vue";

export default {
  name: "PlayerList",
  components: { PlayerCard },
  props: ["players"],
  setup(props) {
    console.log(props.players);
    console.log("player list");
  },
};
</script>

<style></style>
