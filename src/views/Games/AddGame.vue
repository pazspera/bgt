<template>
  <div>
    <h1>The adding of the game</h1>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
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
  setup() {
    const boardGameStore = useBoardGameStore();
    /* const boardGameId = ref(null); */
    const gameStore = useGameStore();
    // The computed here keeps a sync copy of the value
    // of selectedBoardGameId
    const selectedBoardGameId = computed(() => gameStore.selectedBoardGameId);
    // This object is going to hold the boardgame
    const boardGame = ref(null);

    onMounted(async () => {
      console.log("Selected boardgame ID: " + selectedBoardGameId.value);
      try {
        boardGame.value = await boardGameStore.getBoardgame(selectedBoardGameId.value);
        console.log("The boardgame is: " + boardGame.value);
        console.log("Tipo de boardGame.value: " + typeof boardGame.value);

        if (boardGame.value) {
          console.log("BoardGame: " + boardGame.value.name);
        }
      } catch (err) {
        console.err("Error fetching boardgame:" + err);
      }
    });

    return {};
  },
};
</script>

<style></style>
