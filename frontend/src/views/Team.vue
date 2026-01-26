<template>
  <div class="team-page min-h-screen flex items-center justify-center">
    <div class="flex w-full max-w-6xl h-full">
      <div class="w-1/2 flex flex-col justify-center px-12">
        <h1 class="text-5xl font-bold mb-4">Gestionnaire des équipes</h1>
        <p class="text-gray-700 text-xl">
          Rejoignez toutes les équipes disponibles
        </p>
      </div>
      <div
        class="w-1/2 bg-orange-500 flex flex-col justify-center items-center p-12"
      >
        <div
          v-if="!userTeam"
          class="bg-white rounded-lg p-8 w-full max-w-md flex flex-col gap-4 shadow-lg"
        >
          <h2 class="text-2xl font-bold mb-4 text-orange-500">
            Créer votre équipe
          </h2>

          <div class="flex flex-col gap-1">
            <label class="text-black font-semibold">Nom de l'équipe</label>
            <input
              type="text"
              placeholder="Nom de l'équipe"
              class="border border-grey-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              v-model="newTeamName"
            />
          </div>

          <div>
            <label class="block font-semibold mb-1" for="member1"
              >Membre 1</label
            >
            <select
              id="member1"
              class="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="1">Alice</option>
              <option value="2">Bob</option>
              <option value="3">Charlie</option>
            </select>
          </div>

          <div>
            <label class="block font-semibold mb-1" for="member2"
              >Membre 2</label
            >
            <select
              id="member2"
              class="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="4">Diana</option>
              <option value="5">Eve</option>
              <option value="6">Frank</option>
            </select>
          </div>

          <button
            class="bg-white text-orange-500 font-semibold px-4 py-2 rounded-lg border border-orange-500 hover:bg-orange-100 transition mt-2"
          >
            Créer l'équipe
          </button>
        </div>

        <div v-if="userTeam" class="w-full max-w-4xl flex flex-col gap-8">
          <div
            class="bg-white rounded-lg p-8 shadow-lg w-full flex flex-col items-left"
          >
            <h2 class="text-xl font-bold mb-2">
              <span class="text-black">Nom de l'équipe : </span>
              <span class="text-orange-500">{{ userTeam.name }}</span>
            </h2>
            <h2 class="text-xl font-bold mb-2">
              <span class="text-black">Partenaire : </span>
              <span class="text-orange-500">{{ userTeam.name }}</span>
            </h2>
          </div>

          <button class="bg-red-500 text-white">Supprimer l'équipe</button>

          <!-- Section tournois -->
          <div class="w-full flex flex-col gap-4">
            <h3 class="text-2xl font-bold mb-2">
              Participe aux tournois suivants :
            </h3>

            <div class="flex flex-col gap-4">
              <div
                v-for="tournament in tournaments"
                :key="tournament.id"
                class="bg-orange-200 p-4 rounded-lg shadow-md flex flex-col gap-2 w-full"
              >
                <h4 class="text-xl font-bold">{{ tournament.name }}</h4>
                <RouterLink
                  :to="`/tournament/${tournament.id}`"
                  class="mt-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition w-max"
                >
                  Voir le classement
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isAuthenticated = ref(true);
const userTeam = ref({ name: "Test", partner: "Louis" });
const newTeamName = ref();

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
    id: 4,
    name: "Liga",
    date: "2026-02-10",
    description: "Tournoi officiel pour les équipes espagnoles.",
    teamsCount: 2,
  },
]);
</script>
