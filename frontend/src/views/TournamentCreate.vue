<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <div
      class="bg-white rounded-lg shadow-lg p-10 w-full max-w-md flex flex-col gap-6"
    >
      <h1 class="text-4xl font-bold text-orange-500 text-center">
        Création d'un tournois
      </h1>
      <h2 class="text-xl font-semibold text-gray-800 text-center">
        En quelques clics
      </h2>

      <!-- Création d'un tournois -->
      <form @submit.prevent="createTournament" class="flex flex-col gap-4">
        <!-- NOM -->
        <div class="flex flex-col gap-1">
          <label class="text-gray-700 font-semibold">Nom du tournoi</label>
          <input
            type="text"
            placeholder="Saisissez un nom"
            v-model="name"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <!-- DATE -->
        <div class="flex flex-col gap-1">
          <label class="text-gray-700 font-semibold">Date du tournoi</label>
          <input
            type="date"
            v-model="date"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <!-- DESCRIPTION -->
        <div class="flex flex-col gap-1">
          <label class="text-gray-700 font-semibold">Description</label>
          <textarea
            placeholder="Saisissez une description"
            v-model="description"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          class="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition mt-2"
        >
          Créer le tournoi
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api";

const router = useRouter();

const name = ref("");
const date = ref("");
const description = ref("");

const createTournament = async () => {
  try {
    const res = await api.post("/tournament", {
      name: name.value,
      date: date.value,
      description: description.value,
    });

    // redirige vers le tournoi créé
    router.push(`/tournament/${res.data.id}`);
  } catch (error) {
    alert(error.response.data.error);
  }
};
</script>
