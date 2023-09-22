<template>
  <div @passSelectedBoardgame="getBoardgameId">
    <h1>The adding of the game</h1>
  </div>
</template>

<script>
import { computed, onMounted /* ref */ } from "vue";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import { useGameStore } from "@/stores/GameStore";

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
    /* const boardGameId = ref(null); */
    const gameStore = useGameStore();
    // The computed here keeps a sync copy of the value
    // of selectedBoardGameId
    const selectedBoardGameId = computed(() => gameStore.selectedBoardGameId);

    const getBoardgameId = () => {
      console.log("received boardgameID: " + props.boardGame.id);
    };

    onMounted(async () => {
      console.log("Selected boardgame ID: " + selectedBoardGameId.value);
      const boardGame = await boardGameStore.getBoardgame(selectedBoardGameId.value);
      console.log(boardGame);
    });

    return { getBoardgameId };
  },
};
</script>

<style></style>
