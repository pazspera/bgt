<template>
  <h1>The adding of the game</h1>
</template>

<script>
import { onMounted } from "vue";
import { useBoardGameStore } from "@/stores/BoardGameStore";

export default {
  name: "AddGame",
  mounted() {
    document.title = "Agregar Partida - Board Game Tracker";
  },
  props: {
    boardGame: {
      type: Object,
    },
  },
  setup(props) {
    const boardGameStore = useBoardGameStore();

    /* onMounted(async () => {
      await boardGameStore.getBoardgame(props.id);
    }); */

    onMounted(async () => {
      console.log(props.boardGame);
      const boardGame = await boardGameStore.getBoardgame("6");
      console.log(boardGame);
    });
  },
};
</script>

<style></style>
