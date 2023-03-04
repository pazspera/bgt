<template>
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
</template>

<script>
import PlayerCard from "@/components/Players/PlayerCard.vue";

export default {
  name: "PlayersList",
  components: { PlayerCard },
  data() {
    return {
      players: [],
      error: "",
    };
  },
  mounted() {
    this.getPlayers();
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

<style></style>
