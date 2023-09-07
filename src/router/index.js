import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import BoardGamesView from "../views/BoardGames/BoardGamesView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: BoardGamesView,
  },
  {
    path: "/jugadores",
    name: "Players",
    /* redirect: { name: "PlayersList" }, */
    component: () => import(/* webpackChunkName: "Players"*/ "@/views/Players/PlayersView.vue"),

  },
  {
    path: "/editar-jugador/:id?",
    name: "EditPlayer",
    component: () => import(/*webpackChunkName: "EditPlayer"*/ "@/views/Players/EditPlayer.vue"),
    props: true,
  },
  {
    path: "/agregar-jugador",
    name: "AddPlayer",
    component: () => import(/* webpackChunkName: "AddPlayer"*/ "@/views/Players/AddPlayer.vue"),
  },
  {
    path: "/ludoteca",
    name: "BoardGames",
    component: () => import(/*webpackChunkName: "BoardGames"*/ "@/views/BoardGames/BoardGamesView.vue"),
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
