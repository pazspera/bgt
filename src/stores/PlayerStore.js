import { defineStore } from "pinia";

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    // array of objects for the players
    players: [],
    name: "bruce",
    player: {},
  }),
  getters: {
    // can't use "this" inside the arrow function
    // we need to pass the state as an argument
    totalCount: (state) => {
      return state.players.length;
    },
    playerLoaded: (state) => {
      return "name" in state.player;
    },
  },
  actions: {
    async getPlayers() {
      const uri = process.env.VUE_APP_BGT_BASE_URL + "/player/all";
      /* const res = await fetch(uri);
      const data = await res.json(); */

      const res = await fetch(uri, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      this.players = data;
    },
    async getPlayer(id) {
      const res = await fetch(process.env.VUE_APP_PLAYERS_URL + id);
      const data = await res.json();
      this.player = data;
    },
    checkIfPlayerAlreadyExists(name) {
      let result = this.players.filter((player) => {
        // if it matches, it's already in players
        return player.name === name;
      });
      // if it returns true, the player name
      // is already in players[]
      return result.length > 0;
    },
    async addPlayer(player) {
      // before adding the player, check if it's already on players
      // this should be on another action so I can call it
      // when I edit and check if the new name is in players

      this.players.push(player);

      const res = await fetch(process.env.VUE_APP_PLAYERS_URL, {
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

      const res = await fetch(process.env.VUE_APP_PLAYERS_URL + id, {
        method: "DELETE",
      });

      if (res.error) {
        console.log(res.error);
      }
    },
    async updatePlayer(player, newName) {
      const res = await fetch(process.env.VUE_APP_PLAYERS_URL + player.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
        }),
      });

      if (res.error) {
        console.log(res.error);
      }
    },
    capitalizeName: (string) => {
      let arrayOfWords = string.split(/[\s,\t,\n]+/);
      let capitalizedString;

      let capitalizeWord = (string) => {
        let firstLetter = string[0].toUpperCase();
        let rest = string.slice(1).toLowerCase();
        return firstLetter + rest;
      };

      capitalizedString = arrayOfWords.map(capitalizeWord).join(" ");

      return capitalizedString;
    },
  },
});
