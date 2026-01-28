<template>
  <div class="tournament-details min-h-screen p-6 pt-24 flex flex-col gap-10">
    <h1 class="text-4xl font-bold text-center text-orange-600">
      {{ tournament }}
    </h1>

    <div class="flex flex-col lg:flex-row gap-6">
      <!-- LISTE DES MATCHES -->
      <div
        class="w-full lg:w-1/2 bg-orange-50 rounded-xl p-6 flex flex-col gap-4 shadow-lg"
      >
        <h2 class="text-xl font-bold mb-4 text-gray-800">Matchs du tournoi</h2>
        <div class="flex-1 overflow-y-auto max-h-[600px]">
          <ul class="flex flex-col gap-4">
            <li
              v-for="match in matches"
              :key="match.id"
              class="bg-white px-4 py-4 rounded-xl shadow-sm flex flex-col gap-3 hover:shadow-md transition"
            >
              <!-- EQUIPES + SCORE -->

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <span class="font-semibold text-gray-800">{{
                    match.teams[0].name
                  }}</span>
                  <span class="text-xl font-bold text-orange-500">{{
                    match.teams[0].MatchTeam.score
                  }}</span>
                  <span class="text-gray-400 font-bold">-</span>
                  <span class="text-xl font-bold text-orange-500">{{
                    match.teams[1].MatchTeam.score
                  }}</span>
                  <span class="font-semibold text-gray-800">{{
                    match.teams[1].name
                  }}</span>
                </div>
                <!-- STATUS DU MATCHe -->

                <span
                  class="px-3 py-1 rounded-full text-sm font-semibold"
                  :class="
                    match.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  "
                >
                  {{ match.status }}
                </span>
              </div>

              <div
                v-if="match.status === 'PENDING'"
                class="flex items-center gap-4 bg-orange-50 p-3 rounded-lg"
              >
                <div class="flex items-center gap-2">
                  <span class="text-sm font-semibold">{{
                    match.teams[0].name
                  }}</span>
                  <input
                    type="number"
                    min="0"
                    v-model="match.newScoreTeam1"
                    class="w-16 border border-gray-300 rounded-lg px-2 py-1 text-center shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <span class="font-bold">-</span>

                <div class="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    v-model="match.newScoreTeam2"
                    class="w-16 border border-gray-300 rounded-lg px-2 py-1 text-center shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <span class="text-sm font-semibold">{{
                    match.teams[1].name
                  }}</span>
                </div>
                <!-- VALIDATION SCORE -->
                <button
                  @click="updateScore(match)"
                  class="ml-auto bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition shadow-md"
                >
                  Valider
                </button>
              </div>
            </li>
          </ul>
        </div>
        <!-- GENERATION DES MATCHS -->
        <div class="flex justify-end mt-4">
          <button
            @click="generateMatches"
            :disabled="matches.length > 0"
            :class="
              matches.length > 0
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            "
            class="px-6 py-2 rounded-lg transition shadow-md"
          >
            <span v-if="matches.length === 0">Générer les matchs</span>
            <span v-else>Matchs déjà générés</span>
          </button>
        </div>
      </div>
      <!-- CLASSEMENTS TOURNOIS -->
      <div class="w-full lg:w-1/2 flex flex-col gap-4">
        <div class="bg-orange-50 rounded-xl p-6 flex-1 shadow-lg">
          <h2 class="text-xl font-bold mb-4 text-gray-800">Classement</h2>
          <div class="flex-1 overflow-y-auto max-h-[300px]">
            <ul class="flex flex-col gap-2">
              <li
                v-for="(team, index) in ranking"
                :key="team.team.id"
                class="flex justify-between items-center px-4 py-3 rounded-xl shadow-sm bg-white hover:shadow-md hover:bg-orange-50 transition"
              >
                <div
                  class="w-8 h-8 flex items-center justify-center rounded-full font-bold text-white bg-orange-500 mr-3 flex-shrink-0"
                >
                  {{ index + 1 }}
                </div>
                <span class="font-semibold text-gray-800 flex-1">{{
                  team.team.name
                }}</span>
                <span class="text-orange-500 font-bold"
                  >{{ team.points }} pts</span
                >
              </li>
            </ul>
          </div>
          <!-- RECHARGEMENT  -->
          <div class="flex justify-end mt-4">
            <button
              @click="reloadRanking"
              class="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition shadow-md"
            >
              Recharger le classement
            </button>
          </div>
        </div>
        <!-- LISTE EQUIPE -->
        <div class="bg-orange-50 rounded-xl p-6 shadow-lg">
          <h2 class="text-xl font-bold mb-4 text-gray-800">
            Équipes inscrites
          </h2>
          <div class="flex-1 overflow-y-auto max-h-[200px]">
            <ul class="flex flex-col gap-3">
              <li
                v-for="(team, index) in tournamentTeams"
                :key="team.id"
                class="bg-white px-4 py-3 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition"
              >
                <div
                  class="w-8 h-8 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full"
                >
                  {{ index + 1 }}
                </div>
                <span class="font-semibold text-gray-800">{{ team.name }}</span>
              </li>
            </ul>
          </div>
          <!-- FORMULAIRE D4AJOUT D4UNE TEAM -->
          <div class="flex gap-3 items-center mt-3">
            <select
              v-model="selectedTeamId"
              class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option disabled value="">Choisir une équipe</option>
              <option
                v-for="team in availableTeams"
                :key="team.id"
                :value="team.id"
              >
                {{ team.name }}
              </option>
            </select>
            <button
              @click="addTeam"
              class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition shadow-md"
            >
              Ajouter
            </button>
          </div>
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
    tournament.value = res.data.name;
    tournamentTeams.value = res.data.teams;
    matches.value = res.data.matchs.map((m) => ({
      ...m,
      newScoreTeam1: "",
      newScoreTeam2: "",
    }));
  } catch (error) {
    alert(error.response.data.error);
  }
};

// Générer les matchs
const generateMatches = async () => {
  try {
    await api.post(`/tournament/${tournamentId}/generate`);
    await loadTournament();
  } catch (error) {
    alert(error.response?.data.error);
  }
};

// Récupérer les équipes disponibles
const getAvailableTeam = async () => {
  try {
    const res = await api.get("/team");
    console.log(res);
    availableTeams.value = res.data;
  } catch (error) {
    alert(error.response.data.error);
  }
};

// Ajouter une équipe
const addTeam = async () => {
  // Conversion parce que sinon mon back peut recevoir un Nan
  const id = Number(selectedTeamId.value);
  if (!id) return;

  try {
    await api.post(`/tournament/${tournamentId}/team`, {
      team_id: id,
    });

    selectedTeamId.value = "";
    await loadTournament();
  } catch (error) {
    alert(error.response.data.error);
  }
};

// Recharger le classement
const reloadRanking = async () => {
  try {
    const res = await api.get(`/tournament/${tournamentId}/ranking`);

    ranking.value = res.data;
  } catch (error) {
    alert(error.response.data.error);
  }
};

const updateScore = async (match) => {
  try {
    await api.put(`/match/${match.id}/score`, {
      team1Score: match.newScoreTeam1,
      team2Score: match.newScoreTeam2,
    });

    await loadTournament();
    await reloadRanking();
  } catch (error) {
    alert(error.response.data.error);
  }
};

onMounted(() => {
  loadTournament();
  reloadRanking();
  getAvailableTeam();
});
</script>
