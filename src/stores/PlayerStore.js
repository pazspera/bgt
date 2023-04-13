import { defineStore } from "pinia";

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    // array of objects for the players
    players: [],
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
    async getPlayers() {
      const res = await fetch("http://localhost:3000/players");
      const data = await res.json();

      this.players = data;
    },
    async addPlayer(player) {
      // add a new id to player, if not it doesn't post it
      console.log(player);
      this.players.push(player);

      const res = await fetch("http://localhost:3000/players", {
        method: "POST",
        body: JSON.stringify(player),
        headers: { "Content-Type": "application/json" },
      });

      if (res.error) {
        console.log(res.error);
      }
    },
    async deletePlayer(id) {
      this.players = this.players.filter((p) => {
        return p.id !== id;
      });

      const res = await fetch(`http://localhost:3000/players/${id}`, {
        method: "DELETE",
      });

      if (res.error) {
        console.log(res.error);
      }
    },
  },
});
