<template>
  <div class="card player-card p-2">
    <div class="card-body d-flex justify-content-between align-items-center">
      <p class="m-0 player-name">{{ player.Name }}</p>
      <div class="icons">
        <router-link :to="{ name: 'EditPlayer', params: { id: player.Id } }">
          <span class="material-icons"> edit </span>
        </router-link>
        <span @click="playerStore.deletePlayer(player.Id)" class="material-icons"> delete </span>
      </div>
    </div>
  </div>
</template>

<script>
import { usePlayerStore } from "@/stores/PlayerStore";

export default {
  name: "PlayerCard",
  props: ["player"],
  setup() {
    const playerStore = usePlayerStore();

    return { playerStore };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

.material-icons {
  cursor: pointer;
  color: $gray-darker;

  &:hover {
    color: $gray-dark;
    opacity: 0.6;
  }
}
.player-card {
  border-radius: 0;
  border: none;
}

.player-name {
  font-size: $size5;
}
</style>
