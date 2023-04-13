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
    checkIfPlayerAlreadyExists(name) {
      let result = this.players.filter((player) => {
        return player.name !== name;
      });
      return console.log(`check if player exists: ${result}`);
    },
    async addPlayer(player) {
      // before adding the player, check if it's already on players
      // this should be on another action so I can call it
      // when I edit and check if the new name is in players
      this.checkIfPlayerAlreadyExists(player.name);

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
