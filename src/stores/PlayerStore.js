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
      const uri = process.env.VUE_APP_BGT_BASE_URL + "/player/" + id;
      const res = await fetch(uri, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      this.player = data;
    },
    async checkIfPlayerAlreadyExists(name) {
      // this wasn't working cause I was fetching for this.players
      // and this.players is empty by default
      // I tried to fetch the updated players with async/await
      // but it also doesn't work

      /* console.log("players array", this.players);
      console.log("name to check: " + name);

      let currentPlayers = await this.getPlayers();
      console.log("currentPlayers", currentPlayers);

      let filteredArray = this.players.filter((player) => {
        if (player.name === name) {
          console.log("the name " + name + " is in the array");
        } else {
          console.log("the name " + name + " is NOT in the array");
        }
      });
      console.log(filteredArray);
 */
      this.players.filter((player) => {
        // if it matches, it's already in players
        return player.name === name;
      });
      // if it returns true, the player name
      // is already in players[]
      // return result.length > 0;
      this.players.find((player) => {
        console.log("player", player);
        if (player.name === name) {
          return console.log("There already is a player named " + name);
        } else {
          return console.log("There is no player named " + name);
        }
      });
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
