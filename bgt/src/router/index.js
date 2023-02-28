import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlayersView from "@/views/Players/PlayersView.vue";
import AddPlayerView from "@/views/Players/AddPlayerView.vue";
import BoardGamesView from "@/views/BoardGames/BoardGamesView.vue";
import GamesView from "@/views/Games/GamesView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/jugadores",
    name: "Players",
    component: PlayersView,
  },
  {
    path: "/agregar-jugador",
    name: "AddPlayer",
    component: AddPlayerView,
  },
  {
    path: "/juegos",
    name: "BoardGames",
    component: BoardGamesView,
  },
  {
    path: "/partidas",
    name: "Games",
    component: GamesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
