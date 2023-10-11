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
      return this.players;
    },
    async getPlayer(id) {
      const uri = process.env.VUE_APP_BGT_BASE_URL + "/player/" + id;
      const res = await fetch(uri, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      this.player = data;
      return this.player;
    },
    checkIfPlayerAlreadyExists(name) {
      // It loops through the players, if the new name
      // matches a player already recorded, it returns true

      // I'm creating a new array where if the name is already
      // in players, that player is added on checkArray

      // Then I see checkArray's lenght, if it's > 0 there name
      // is already on players so its's true that the player
      // already exists

      let checkArray = [];

      this.players.filter((player) => {
        if (player.Name === name) {
          checkArray.push(player);
        }
      });

      return checkArray.length > 0;

      // if it returns true, the player name
      // is already in players[]
      // return result.length > 0;
      /* this.players.find((player) => {
        // return player.Name === name ? true : false;

        if (player.Name === name) {
          return console.log("player", player, "player.name", player.Name, "name", name, "result", player.Name === name);
        } else {
          return console.log("player", player, "player.name", player.Name, "name", name, player.Name === name);
        }
      }); */
    },
    async addPlayer(player) {
      // before adding the player, check if it's already on players
      // this should be on another action so I can call it
      // when I edit and check if the new name is in players

      this.players.push(player);
      const uri = process.env.VUE_APP_BGT_BASE_URL + "/player/create";

      const res = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(player),
        headers: { "Content-Type": "application/json" },
      });
      debugger;
      /* 
        Buscar en la res el id en el json que pasa la api
      */
      if (res.error) {
        console.log(res.error);
      }
    },
    async deletePlayer(id) {
      this.players = this.players.filter((p) => {
        return p.id !== id;
      });

      const uri = process.env.VUE_APP_BGT_BASE_URL + "/player/" + id;

      const res = await fetch(uri, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.error) {
        console.log(res.error);
      }
    },
    async updatePlayer(player, newName) {
      const res = await fetch(process.env.VUE_APP_BGT_BASE_URL + "/player/update/" + player.Id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: player.Id,
          name: newName,
        }),
      });

      if (res.error) {
        console.log(res.error);
      }

      this.getPlayers();
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
