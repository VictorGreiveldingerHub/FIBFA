import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Home from "./views/Home.vue";
import Signin from "./views/Signin.vue";
import Login from "./views/Login.vue";
import Tournament from "./views/Tournament.vue";
import Team from "./views/Team.vue";

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

createApp(App).use(router).mount("#app");
