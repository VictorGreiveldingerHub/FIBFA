<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6"
  >
    <div class="flex flex-row flex-wrap gap-6 justify-center items-stretch">
      <div
        v-for="tournament in tournaments"
        :key="tournament.id"
        class="bg-white p-6 rounded-xl w-72 flex flex-col gap-4 text-center shadow-md hover:shadow-lg transition transform hover:-translate-y-1 flex-1 min-h-[360px]"
      >
        <!-- Nom -->
        <h3 class="text-2xl font-bold text-gray-800 truncate">
          {{ tournament.name }}
        </h3>

        <!-- Date -->
        <p class="text-gray-500 text-sm">{{ tournament.date }}</p>

        <!-- Description -->
        <p class="text-gray-700 text-base line-clamp-3">
          {{ tournament.description }}
        </p>

        <!-- Équipes inscrites -->
        <span
          class="inline-block border border-orange-500 px-3 py-1 rounded-full mt-2"
        >
          <span class="text-orange-500 font-semibold"
            >{{ tournament.teamCount }} / 8</span
          >
          <span class="text-gray-700"> équipes inscrites</span>
        </span>

        <!-- Boutons -->
        <div class="flex flex-col gap-2 mt-auto">
          <RouterLink
            :to="`/tournament/${tournament.id}`"
            class="bg-white border border-orange-500 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition"
          >
            Voir le tournoi
          </RouterLink>

          <button
            @click="deleteTournament(tournament.id)"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold shadow-sm"
          >
            Supprimer le tournoi
          </button>
        </div>
      </div>
    </div>

    <!-- Bouton création tournoi -->
    <div class="flex justify-center mt-8">
      <RouterLink
        to="/tournament/create"
        class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold shadow-md"
      >
        Créer un nouveau tournoi
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";

const tournaments = ref([]);

const getAllTournaments = async () => {
  try {
    const res = await api.get("/tournament");

    tournaments.value = res.data;
  } catch (error) {
    alert(error.response.data.error);
  }
};

const deleteTournament = async (tournamentId) => {
  try {
    await api.delete(`/tournament/${tournamentId}`);
    tournaments.value = tournaments.value.filter(
      (tournament) => tournament.id !== tournamentId,
    );
  } catch (error) {
    alert(error.response.data.error);
  }
};

onMounted(() => {
  getAllTournaments();
});
</script>
