<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" v-model.trim="playerStore.player.name" class="form-control" required />
            <p>name: {{ playerStore.player.name }}</p>
            <p>does the player have a name: {{ playerStore.playerLoaded }}</p>
          </div>
          <button type="submit" class="btn btn__primary">Editar jugador</button>
        </form>
      </div>
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-4">
        <div v-if="error" class="alert alert-warning" role="alert">
          <p class="mb-0">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { usePlayerStore } from "@/stores/PlayerStore";
export default {
  name: "EditPlayerView",
  mounted() {
    document.title = "Editar Jugador - Board Game Tracker";
  },
  props: ["id"],
  setup(props) {
    const playerStore = usePlayerStore();
    const newPlayerName = ref("");

    console.log(newPlayerName.value);

    console.log(props.id);

    onMounted(async () => {
      await playerStore.getPlayer(props.id);
    });

    /* watchEffect(() => {
      const player = playerStore.getPlayer(props.id);
      if (player) {
        currentPlayerData.value = player.name;
      }
    });

    watchEffect(() => {
      console.log(currentPlayerData.value);
    }); */

    return { newPlayerName, playerStore, name };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
