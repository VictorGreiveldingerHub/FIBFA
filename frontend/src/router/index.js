import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Signin from "../views/Signin.vue";
import Login from "../views/Login.vue";
import Tournament from "../views/Tournament.vue";
import Team from "../views/Team.vue";

// Création du router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/login", name: "Connexion", component: Login },
    { path: "/signin", name: "Inscription", component: Signin },
    { path: "/tournament", name: "Tournois", component: Tournament },
    { path: "/team", name: "Equipe", component: Team },
  ],
});

export default router;
