<template>
  <div
    class="team-page min-h-screen flex items-center justify-center bg-gray-50 p-6"
  >
    <div class="flex w-full max-w-6xl h-full gap-6">
      <!-- Colonne info / création -->
      <div class="w-1/2 flex flex-col justify-center px-12 gap-8">
        <h1 class="text-5xl font-bold mb-4">Gestionnaire des équipes</h1>
        <p class="text-gray-700 text-xl">
          Rejoignez toutes les équipes disponibles !
        </p>
        <br />
        <p class="text-gray-700 text-xl">
          Une fois votre équipe créée, un administrateur pourra vous ajouter
          manuellement dans un tournoi.
        </p>
      </div>

      <!-- Colonne équipe / tournois -->
      <div class="w-1/2 flex flex-col justify-center items-center p-12 gap-6">
        <!-- Création d'équipe -->
        <div
          v-if="!userTeam"
          class="bg-white rounded-lg p-8 w-full max-w-md flex flex-col gap-6 shadow-lg"
        >
          <h2 class="text-2xl font-bold mb-4 text-orange-500 text-center">
            Créer votre équipe
          </h2>

          <form @submit.prevent="submitTeam" class="flex flex-col gap-4">
            <!-- Nom équipe -->
            <div class="flex flex-col gap-2">
              <label class="text-gray-800 font-semibold">Nom de l'équipe</label>
              <input
                type="text"
                placeholder="Saisissez le nom de l'équipe"
                v-model="newTeamName"
                class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <!-- Choix du coéquipier -->
            <div class="flex flex-col gap-2">
              <label class="text-gray-800 font-semibold"
                >Choisir un coéquipier</label
              >
              <select
                v-model="selectedTeammateId"
                class="border border-gray-300 rounded-lg px-4 py-2"
                required
              >
                <option disabled value="">Sélectionnez un joueur</option>
                <option
                  v-for="user in availableUsers"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.pseudo }}
                </option>
              </select>
            </div>

            <!-- Messages -->
            <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
            <p v-if="success" class="text-green-500 text-sm">{{ success }}</p>

            <!-- Bouton -->
            <button
              type="submit"
              class="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition mt-2"
            >
              Créer l'équipe
            </button>
          </form>
        </div>

        <!-- Équipe existante -->
        <div v-if="userTeam" class="w-full flex flex-col gap-6">
          <!-- Carte équipe -->
          <div
            class="bg-white rounded-lg p-6 shadow-lg flex flex-col gap-4 w-full min-h-[200px]"
          >
            <h2 class="text-xl font-bold">
              <span class="text-gray-800">Nom de l'équipe : </span>
              <span class="text-orange-500">{{ userTeam.name }}</span>
            </h2>
            <h2 class="text-xl font-bold">
              <span class="text-gray-800">Partenaire : </span>
              <span class="text-orange-500">
                {{ userTeam.partner[1]?.pseudo || "Aucun" }}
              </span>
            </h2>

            <button
              @click="deleteTeam(userTeam.id)"
              class="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition w-max"
            >
              Supprimer l'équipe
            </button>
          </div>

          <!-- Tournois -->
          <div class="w-full flex flex-col gap-4">
            <h3 class="text-2xl font-bold mb-2">
              Participe aux tournois suivants :
            </h3>
            <div class="flex flex-col gap-4">
              <div
                v-for="tournament in tournaments"
                :key="tournament.id"
                class="bg-orange-200 p-4 rounded-lg shadow-md flex flex-col gap-2 w-full min-h-[120px]"
              >
                <h4 class="text-xl font-bold text-gray-800">
                  {{ tournament.name }}
                </h4>
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
import { ref, onMounted } from "vue";
import api from "../api";

const newTeamName = ref("");
const selectedTeammateId = ref("");
const availableUsers = ref([]);
const userTeam = ref(null);
const tournaments = ref([]);
const error = ref("");
const success = ref("");

// Charger les utilisateurs et tournois
const loadData = async () => {
  try {
    // 1️⃣ Vérifie si l'utilisateur a déjà une team
    const getMyTeam = await api.get("/team/me");
    console.log(getMyTeam.data);
    userTeam.value = getMyTeam.data; // null si pas de team
    tournaments.value = getMyTeam.data.tournaments;
    // 2️⃣ Si pas de team, charger les utilisateurs disponibles pour création
    if (!userTeam.value) {
      const usersRes = await api.get("/user");
      availableUsers.value = usersRes.data;
    }
  } catch (error) {
    alert(error.response.data.error);
  }
};

// Création équipe
const submitTeam = async () => {
  const id = Number(selectedTeammateId.value);
  error.value = "";
  success.value = "";
  try {
    const res = await api.post("/team", {
      name: newTeamName.value,
      teammate_id: id,
    });
    success.value = `Équipe "${res.data.name}" créée avec succès !`;
    userTeam.value = res.data;
    newTeamName.value = "";
    selectedTeammateId.value = "";

    // Ne pas recharger tous les tournois après création de team
    // await loadData();
    router.push(`/team/${res.data.id}`);
  } catch (error) {
    alert(error.response.data.error);
  }
};

// Suppression équipe
const deleteTeam = async (teamId) => {
  try {
    await api.delete(`/team/${teamId}`);
    userTeam.value = null;
    await loadData();
  } catch (error) {
    alert(error.response.data.error);
  }
};

onMounted(loadData);
</script>
