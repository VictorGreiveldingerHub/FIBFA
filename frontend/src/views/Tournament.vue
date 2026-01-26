<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <div class="flex flex-row flex-wrap gap-6 justify-center items-center">
      <div
        v-for="tournament in tournaments"
        :key="tournament.id"
        class="bg-orange-200 p-6 rounded-lg w-72 flex flex-col gap-3 text-center shadow-md"
      >
        <h3 class="text-xl font-bold">{{ tournament.name }}</h3>
        <p class="text-gray-700 text-sm">{{ tournament.date }}</p>
        <p class="text-gray-800 text-base">{{ tournament.description }}</p>
        <span
          class="inline-block border border-orange-500 px-3 py-1 rounded-xl mt-2"
        >
          <span class="text-orange-500 font-bold"
            >{{ tournament.teamsCount }} / 8</span
          >
          <span class="text-gray-900"> équipes inscrites</span>
        </span>

        <RouterLink
          :to="`/tournament/${tournament.id}`"
          class="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Voir le tournoi
        </RouterLink>
      </div>
      <div class="flex justify-center mt-8">
        <RouterLink
          to="/tournament/create"
          class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
        >
          Créer un nouveau tournoi
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Test
const tournaments = ref([
  {
    id: 1,
    name: "Champion's League",
    date: "2026-02-10",
    description: "Tournoi officiel pour les équipes européennes.",
    teamsCount: 8,
  },
  {
    id: 2,
    name: "Ligue 1",
    date: "2026-03-05",
    description: "Tournoi officiel pour les équipes fraçaises.",
    teamsCount: 2,
  },
  {
    id: 1,
    name: "Liga",
    date: "2026-02-10",
    description: "Tournoi officiel pour les équipes espagnoles.",
    teamsCount: 2,
  },
]);
</script>
