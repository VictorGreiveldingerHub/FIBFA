<template>
  <div class="tournament-details min-h-screen p-8 pt-24 flex flex-col gap-10">
    <!-- Titre du tournoi -->
    <h1 class="text-4xl font-bold text-center">
      {{ tournament.name }}
    </h1>

    <!-- Zone des matchs -->
    <div class="flex flex-col gap-4">
      <div class="bg-orange-200 rounded-xl p-6 w-full min-h-[200px]">
        <h2 class="text-xl font-bold mb-4">Matchs du tournoi</h2>
        <ul class="flex flex-col gap-2">
          <li
            v-for="match in matches"
            :key="match.id"
            class="bg-white px-3 py-2 rounded-lg shadow-sm"
          >
            {{ match.teams[0].name }} {{ match.teams[0].MatchTeam.score }} -
            {{ match.teams[1].name }} {{ match.teams[1].MatchTeam.score }}
          </li>
        </ul>
      </div>

      <!-- Bouton génération matchs -->
      <div class="flex justify-end">
        <button
          @click="generateMatches"
          class="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Générer les matchs
        </button>
      </div>
    </div>

    <!-- Section du bas : équipes + classement -->
    <div class="flex gap-6">
      <!-- Équipes du tournoi -->
      <div class="w-1/2 flex flex-col gap-4">
        <div class="bg-orange-200 rounded-xl p-6">
          <h2 class="text-xl font-bold mb-4">Équipes inscrites</h2>
          <ul class="flex flex-col gap-2">
            <li
              v-for="team in tournamentTeams"
              :key="team.id"
              class="bg-white px-3 py-2 rounded-lg shadow-sm"
            >
              {{ team.name }}
            </li>
          </ul>
        </div>

        <!-- Ajout d'équipe -->
        <div class="flex gap-3 items-center">
          <select class="flex-1 border border-gray-300 rounded-lg px-3 py-2">
            <option disabled selected>Choisir une équipe</option>
            <option v-for="team in availableTeams" :key="team.id">
              {{ team.name }}
            </option>
          </select>
          <button
            class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Ajouter
          </button>
        </div>
      </div>

      <!-- Classement -->
      <div class="w-1/2 flex flex-col gap-4">
        <div class="bg-orange-200 rounded-xl p-6">
          <h2 class="text-xl font-bold mb-4">Classement</h2>
          <ul class="flex flex-col gap-2">
            <li
              v-for="team in ranking"
              :key="team.id"
              class="flex justify-between bg-white px-3 py-2 rounded-lg shadow-sm"
            >
              <span class="font-semibold">{{ team.name }}</span>
              <span class="text-orange-500 font-bold"
                >{{ team.score }} pts</span
              >
            </li>
          </ul>
        </div>

        <!-- Bouton recharger classement -->
        <div class="flex justify-end">
          <button
            class="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Recharger le classement
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../api";

const route = useRoute();
const tournamentId = route.params.id;

const tournament = ref({});
const tournamentTeams = ref([]);
const availableTeams = ref([]);
const matches = ref([]);
const ranking = ref([]);
const selectedTeamId = ref("");

// Charger les données
const loadTournament = async () => {
  try {
    const res = await api.get(`/tournament/${tournamentId}`);
    tournament.value = res.data;
    tournamentTeams.value = res.data.teams;
    matches.value = res.data.matchs;
    console.log(matches.value);
  } catch (error) {
    console.error("Erreur chargement tournoi", error);
  }
};

// Générer les matchs
const generateMatches = async () => {
  try {
    await api.post(`/tournament/${tournamentId}/generate`);
    // Ensuite on recharge les matchs depuis le back
    await loadTournament();
  } catch (error) {
    console.error("Erreur génération matchs", error);
  }
};

// Ajouter une équipe
const addTeam = async () => {
  if (!selectedTeamId.value) return;
  try {
    await api.post(`/tournament/${tournamentId}/team`, {
      teamId: selectedTeamId.value,
    });
    selectedTeamId.value = "";
    await loadTournament();
  } catch (error) {
    console.error("Erreur ajout équipe", error);
  }
};

// Recharger le classement
const reloadRanking = async () => {
  try {
    const res = await api.get(`/tournament/${tournamentId}/ranking`);
    ranking.value = res.data;
  } catch (error) {
    console.error("Erreur rechargement classement", error);
  }
};

onMounted(() => {
  loadTournament();
});
</script>
