import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/jugadores",
    name: "Players",
    component: () => import(/* webpackChunkName: "Players" */ "@/views/Players/PlayersView.vue"),
  },
  {
    path: "/agregar-jugador",
    name: "AddPlayer",
    component: () => import(/* webpackChunkName: "AddPlayer" */ "@/views/Players/AddPlayerView.vue"),
  },
  {
    path: "/juegos",
    name: "BoardGames",
    component: () => import(/* webpackChunkName: "BoardGames */ "@/views/BoardGames/BoardGamesView.vue"),
  },
  {
    path: "/partidas",
    name: "Games",
    component: () => import(/* webpackChunkName: "Games" */ "@/views/Games/GamesView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
