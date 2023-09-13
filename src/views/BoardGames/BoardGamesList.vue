<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
    <div v-for="boardGame in boardGameStore.boardGames" :key="boardGame.id">
      <BoardgameCard :boardGame="boardGame" />
    </div>
  </div>
</template>

<script>
import { useBoardGameStore } from "@/stores/BoardGameStore";
import BoardgameCard from "@/components/BoardGames/BoardgameCard.vue";

export default {
  name: "BoardGameList",
  components: { BoardgameCard },
 
  setup() {
    const boardGameStore = useBoardGameStore();

    return { boardGameStore };
  },
};
</script>

<style></style>
