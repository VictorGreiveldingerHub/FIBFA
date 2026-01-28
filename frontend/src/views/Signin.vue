<template>
  <div
    class="signin min-h-screen flex items-center justify-center bg-gray-50 p-6"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-10 w-full max-w-md flex flex-col gap-6"
    >
      <h1 class="text-4xl font-bold text-orange-500 text-center">FIBFA</h1>
      <h2 class="text-2xl font-semibold text-gray-800 text-center">
        Inscrivez-vous
      </h2>

      <p class="text-center">
        <span class="text-black">Déjà un compte ? </span>
        <RouterLink to="/login" class="text-orange-500 font-semibold"
          >Connectez-vous</RouterLink
        >
      </p>
      <!-- FORMULAIRE -->
      <form class="flex flex-col gap-4" @submit.prevent="signin">
        <!-- PSEUDO -->
        <div class="flex flex-col gap-1">
          <label class="text-gray-700 font-semibold">Pseudo</label>
          <input
            required
            v-model="pseudo"
            type="text"
            placeholder="Saisissez votre pseudo"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <!-- EMAIL -->
        <div class="flex flex-col gap-1">
          <label class="text-gray-700 font-semibold">Adresse e-mail</label>
          <input
            required
            v-model="email"
            type="email"
            placeholder="Saisissez votre adresse e-mail"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <!-- MDP -->
        <div class="flex flex-col gap-1">
          <label class="text-gray-700 font-semibold">Mot de passe</label>
          <input
            required
            v-model="password"
            type="password"
            placeholder="Saisissez votre mot de passe"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <button
          type="submit"
          class="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition mt-2"
        >
          S'inscrire
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api";
import { useRouter } from "vue-router";
import { fetchUser } from "../stores/auth";

const router = useRouter();

const pseudo = ref("");
const email = ref("");
const password = ref("");

const signin = async () => {
  try {
    await api.post("/signin", {
      pseudo: pseudo.value,
      email: email.value,
      password: password.value,
    });

    await fetchUser();
    router.push(`/`);
  } catch (error) {
    alert(error.response.data.error);
  }
};
</script>
