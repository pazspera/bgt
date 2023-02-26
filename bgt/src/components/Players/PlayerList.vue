<template>
  <div v-for="player in localPlayers" :key="player.id">
    <PlayerCard :player="player" @delete="handleDelete" />
  </div>
</template>

<script>
import { reactive } from "vue";
/* Components */
import PlayerCard from "@/components/Players/PlayerCard.vue";

export default {
  name: "PlayerList",
  components: { PlayerCard },
  props: ["players"],
  setup(props) {
    // Saving the players prop on to a separate variable
    // That way, once a player is deleted, I can filter it out of
    // the array without getting unexpected mutation error
    let localPlayers = reactive(props.players);

    console.log(props.players);
    console.log("player list");

    const handleDelete = (id) => {
      // Gets the deleted id from the PlayerCard
      // Then we filter the players array to remove the deleted player from the list
      localPlayers = localPlayers.value.filter((player) => {
        return player.id !== id;
      });
    };

    return { localPlayers, handleDelete };
  },
};
</script>

<style></style>
