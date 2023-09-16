<template>
  <v-card class="d-grid flex-column px-3 py-3 h-100" color="white">
    <v-img :src="boardGame.image" class="mb-3 boardGame__img" cover></v-img>
    <p class="mb-2 boardGame-name flex-grow-1">{{ boardGame.name }}</p>

    <div class="d-flex align-center justify-content-around">
      <v-btn class="btn-add align-self-end justify-self-end" color="primary">
        <v-icon icon="mdi:mdi-plus"></v-icon>
        <span>Agregar partida</span>
      </v-btn>
      <span @click="confirmDelete(boardGame.id, boardGame.name)" class="material-icons">delete</span>
    </div>
  </v-card>
</template>

<script>
import Swal from "sweetalert2";
import { useBoardGameStore } from "@/stores/BoardGameStore";

export default {
  name: "BoardgameCard",
  props: ["boardGame"],

  data() {
    return {
      btnText: "Agregar partida",
      btnRoute: "Home",
    };
  },

  setup(props, { emit }) {
    const boardgameStore = useBoardGameStore();

    const updateBoardgameList = () => {
      emit("updateBoardgames");
    };

    const confirmDelete = (id, name) => {
      Swal.fire({
        title: "¿Estás segurx?",
        text: "Todas las partidas asociadas a este juego desapareceran. Esta acción no puede revertirse.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, quiero continuar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          boardgameStore.deleteBoardgame(id);
          boardgameStore.getBoardgames();
          /* playerStore.deletePlayer(id);
          playerStore.getPlayers(); */
          /* emitFunction(); */
          updateBoardgameList();
          Swal.fire("¡Éxito!", name + " fue borrado de la ludoteca", "success");
          console.log(`${id} ${name} borrado`);
        }
      });
    };

    return { confirmDelete };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.boardGame__img {
  max-height: 248px;
  max-width: 248px;
}

.boardGame-name {
  font-size: $size5;
  min-height: 40px;
}

.btn-add {
  max-width: fit-content;
}
</style>
