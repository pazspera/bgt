<template>
  <v-card class="d-flex px-3 py-2" color="white">
    <v-card-text class="d-flex justify-start player-name">{{ player.Name }}</v-card-text>
    <v-card-actions class="d-flex align-center">
      <router-link :to="{ name: 'EditPlayer', params: { id: player.Id } }">
        <span class="material-icons"> edit </span>
      </router-link>
      <span @click="confirmDelete(player.Id, player.Name)" class="material-icons mb-1"> delete </span>
    </v-card-actions>
  </v-card>
</template>

<script>
import { usePlayerStore } from "@/stores/PlayerStore";
import Swal from "sweetalert2";

export default {
  name: "PlayerCard",
  props: ["player"],
  setup(props, { emit }) {
    const playerStore = usePlayerStore();

    const emitFunction = () => {
      emit("updatePlayers");
    };

    const confirmDelete = (id, name) => {
      Swal.fire({
        title: "¿Estás segurx?",
        text: "Esta acción no puede revertirse",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, quiero continuar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          playerStore.deletePlayer(id);
          playerStore.getPlayers();
          emitFunction();
          Swal.fire("¡Éxito!", name + " fue eliminado", "success");
        }
      });
    };

    return { playerStore, confirmDelete };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

.player-card {
  border-radius: 0;
  border: none;
}

.player-name {
  font-size: $size5;
}
</style>
