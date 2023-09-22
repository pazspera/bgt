import { defineStore } from "pinia";

export const useGameStore = defineStore("gameStore", {
  state: () => ({
    selectedBoardGameId: null,
  }),
  actions: {
    setSelectedBoardGameId(id) {
      this.selectedBoardGameId = id;
    },
  },
});
