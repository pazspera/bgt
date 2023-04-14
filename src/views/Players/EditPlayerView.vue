<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" v-model.trim="newPlayerName" class="form-control" required />
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
    let currentPlayerData = ref("");
    currentPlayerData = playerStore.getPlayer(props.id);

    onMounted(() => {
      console.log("When is onMounted running?");
      newPlayerName.value = currentPlayerData.value.name;
    });
    console.log("saaaaaaaa");

    return { newPlayerName, playerStore };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
