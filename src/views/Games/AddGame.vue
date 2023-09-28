<template>
  <div>
    <h1>The adding of the game</h1>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted /* ref */ } from "vue";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import { useGameStore } from "@/stores/GameStore";

export default {
  name: "AddGame",
  mounted() {
    document.title = "Agregar Partida - Board Game Tracker";
  },
  setup() {
    const boardGameStore = useBoardGameStore();
    /* const boardGameId = ref(null); */
    const gameStore = useGameStore();
    // The computed here keeps a sync copy of the value
    // of selectedBoardGameId
    const selectedBoardGameId = computed(() => gameStore.selectedBoardGameId);
    // This object is going to hold the boardgame
    /* const boardGame = ref(null); */
    /* const testBoardGame = ref(null); */
    /* const fetchedBoardGame = ref(null); */
    let otraVariable = null;

    onBeforeMount(async () => {
      console.log("onBeforeMount");
      console.log("Selected boardgame ID: " + selectedBoardGameId.value);

      /* try {
        boardGame.value = await boardGameStore.getBoardgame(selectedBoardGameId.value);
        console.log("The boardgame is: " + boardGame.value);
        console.log("Tipo de boardGame.value: " + typeof boardGame.value);

        if (boardGame.value) {
          console.log("BoardGame: " + boardGame.value.name);
        }
      } catch (err) {
        console.err("Error fetching boardgame:" + err);
      } */

      // trying to fetch a fixed id 5
      /* try {
        console.log("Before fetch, testBoardGame.value ", testBoardGame.value);
        testBoardGame.value = await boardGameStore.getBoardgame(5);
        console.log("After fetch, testBoardGame.value ", testBoardGame.value);

        if (testBoardGame.value) {
          console.log("testBoardGame: " + testBoardGame.value.name);
        }
      } catch (err) {
        console.err("Error fetching boardgame:" + err);
      } */

      // still trying to fetch fixed id 5
      try {
        // fetchedBoardGame.value = await boardGameStore.getBoardgame(5);
        otraVariable = await boardGameStore.getBoardgame(5);
        debugger;
        console.log("otravariable", otraVariable);
        /* console.log("fetched board game: ", fetchedBoardGame.value); */
      } catch (error) {
        console.log("error fetching boardgame: ", error);
      }
    });

    onMounted(async () => {
      console.log("onMounted");
      console.log("Selected boardgame ID: " + selectedBoardGameId.value);
    });

    return {};
  },
};
</script>

<style></style>
