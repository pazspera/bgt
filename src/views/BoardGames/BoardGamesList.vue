<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
    <div v-for="boardGame in boardGameStore.boardGames" :key="boardGame.id">
      <BoardgameCard :boardGame="boardGame" @updateBoardgames="updateBoardgames" />
    </div>
  </div>

  <!-- Loading message -->
  <div v-if="!boardGameStore.totalCount" class="row">
    <div class="col">
      <LoadingSpinner />
    </div>
  </div>
</template>

<script>
import { useBoardGameStore } from "@/stores/BoardGameStore";
import BoardgameCard from "@/components/BoardGames/BoardgameCard.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "BoardGameList",
  components: { BoardgameCard, LoadingSpinner },

  setup() {
    const boardGameStore = useBoardGameStore();

    boardGameStore.getBoardgames();

    // Here it listens to the child component that
    // emits the event when the users confirms the
    // deletion of a boardgame.
    const updateBoardgames = () => {
      boardGameStore.getBoardgames();
    };

    return { boardGameStore, updateBoardgames };
  },
};
</script>

<style></style>
