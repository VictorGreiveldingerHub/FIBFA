<template>
  <div
    class="login min-h-screen flex items-center justify-center bg-gray-50 p-6"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-10 w-full max-w-md flex flex-col gap-6"
    >
      <h1 class="text-4xl font-bold text-orange-500 text-center">FIBFA</h1>
      <h2 class="text-2xl font-semibold text-gray-800 text-center">
        Connectez-vous
      </h2>

      <p class="text-center">
        <span class="text-black">Vous n'avez pas encore de compte ? </span>
        <RouterLink to="/signin" class="text-orange-500 font-semibold">
          Inscrivez-vous
        </RouterLink>
      </p>

      <form @submit.prevent="login" class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label class="text-gray-700 font-semibold">Adresse e-mail</label>
          <input
            type="email"
            v-model="email"
            placeholder="Saisissez votre e-mail"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-gray-700 font-semibold">Mot de passe</label>
          <input
            type="password"
            v-model="password"
            placeholder="Saisissez votre mot de passe"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

        <button
          type="submit"
          class="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition mt-2"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import api from "../api";

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
  error.value = "";

  try {
    const res = await api.post("/login", {
      email: email.value,
      password: password.value,
    });

    // On stocke le token
    localStorage.setItem("token", res.data.token);

    // On configure axios pour envoyer le token automatiquement
    api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

    // Redirection après connexion
    router.push("/");
  } catch (err) {
    error.value = err.response?.data || "Email ou mot de passe incorrect";
  }
};
</script>
