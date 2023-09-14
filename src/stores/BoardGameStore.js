import { defineStore } from "pinia";

export const useBoardGameStore = defineStore("boardGameStore", {
  state: () => ({
    boardGames: [
      {
        id: 1,
        name: "Dominion (2008)",
        boardGameGeekId: 64777,
        description: "Base original edition 2008",
        image: "https://cf.geekdo-images.com/j6iQpZ4XkemZP07HNCODBA__itemrep/img/_QiaiFj-LGZoqdatE-wVqNaYWx8=/fit-in/246x300/filters:strip_icc()/pic394356.jpg",
      },
      {
        id: 2,
        name: "Dominion: Seaside (2009)",
        boardGameGeekId: 51811,
        description: "Terramar expansion 2009",
        image: "https://cf.geekdo-images.com/n1_bOankhLYghTFscRAG8A__itemrep/img/wBuYKmIc3CXprCMdK2UjqDNfsyA=/fit-in/246x300/filters:strip_icc()/pic543471.jpg",
      },
      {
        id: 3,
        name: "Dominion: Dark Ages (2012)",
        boardGameGeekId: 125403,
        description: "Dark Ages expansion 2012",
        image: "https://cf.geekdo-images.com/ewZazg5StWU8_kOWh0dqNg__itemrep/img/5r1h9UzLCZzO1bCW4MdGrgHSl1k=/fit-in/246x300/filters:strip_icc()/pic1321190.jpg",
      },
      {
        id: 4,
        name: "Wiz-War (Eighth Edition) (2012)",
        boardGameGeekId: 104710,
        description: "Wiz War, Wiz War, Party time, Excellent",
        image: "https://cf.geekdo-images.com/yXbWhfIuwKFJfPNg5SgPOQ__itemrep/img/LmRLwSH8LhTMqtCbvEYJ3eFCpho=/fit-in/246x300/filters:strip_icc()/pic1222733.jpg",
      },
    ],
    name: "Testing the Store",
  }),
  getters: {
    totalCount: (state) => {
      return state.boardGames.length;
    },
  },
});
