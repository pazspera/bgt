import { defineStore } from "pinia";

export const useBoardGameStore = defineStore("boardGameStore", {
  state: () => ({
    boardGames: [],
    name: "Testing the Store"
  }),
});
