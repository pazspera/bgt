import { defineStore } from "pinia";

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    // array of objects for the players
    players: [
      {
        id: 1,
        name: "Zeuchi",
      },
      {
        id: 2,
        name: "Mareita",
      },
      {
        id: 3,
        name: "Bruce",
      },
      {
        id: 4,
        name: "Clark",
      },
      {
        id: 5,
        name: "Diana",
      },
      {
        name: "Test",
        id: 6,
      },
      {
        name: "Bruce",
        id: 7,
      },
      {
        name: "Clark",
        id: 8,
      },
    ],
    name: "Bruce",
  }),
  getters: {
    // can't use "this" inside the arrow function
    // we need to pass the state as an argument
    totalCount: (state) => {
      return state.players.length;
    },
  },
  actions: {
    addPlayer(player) {
      this.players.push(player);
    },
    deletePlayer(id) {
      this.players = this.players.filter((p) => {
        return p.id !== id;
      });
    },
  },
});
