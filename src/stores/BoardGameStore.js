import { defineStore } from "pinia";

export const useBoardGameStore = defineStore("boardGameStore", {
  state: () => ({
    boardGames: [],
    name: "Testing the Store",
    boardGame: {},
  }),
  getters: {
    totalCount: (state) => {
      return state.boardGames.length;
    },
  },
  actions: {
    async getBoardgames() {
      const uri = process.env.VUE_APP_BGT_BASE_URL + "/boardgame/all";

      const res = await fetch(uri, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      this.boardGames = data;
    },
    async getBoardgame(id) {
      try {
        const uri = process.env.VUE_APP_BGT_BASE_URL + "/boardgame/" + id;
        const res = await fetch(uri, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error("No se pudo recuperar boardgame");
        }

        const data = await res.json();
        console.log("data");
        console.log(data);
        this.boardGame = data;
        console.log("this.boardgame");
        console.log(this.boardGame);
        return this.boardGame;
      } catch (err) {
        console.error("Error fetcheando boardgame: " + err);
      }
    },
    async deleteBoardgame(id) {
      this.boardGames = this.boardGames.filter((b) => {
        return b.id !== id;
      });

      const uri = process.env.VUE_APP_BGT_BASE_URL + "/boardgame/" + id;

      const res = await fetch(uri, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.error) {
        console.log(res.error);
      }
    },
  },
});
