<template>
  <div
    class="homepage min-h-screen flex flex-row gap-8 p-6 items-center justify-center"
  >
    <div class="left-panel flex-1 max-w-lg">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-4xl font-bold mb-4">
          FIBFA - Fédération Internationale de Baby Foot Association
        </h2>
        <span class="text-gray-700 text-lg">
          Vous présente l'application de gestion de tournois de baby-foot
          officiel.
        </span>
        <div class="p-6 rounded-lg max-w-xl mx-auto mt-10">
          <div class="flex flex-col gap-4">
            <!-- Point 1 -->
            <div class="flex items-start gap-3">
              <div class="text-orange-500 font-bold text-xl">1.</div>
              <p class="text-gray-800">
                Inscrivez-vous pour créer votre équipe et participer aux
                tournois officiels.
              </p>
            </div>

            <!-- Point 2 -->
            <div class="flex items-start gap-3">
              <div class="text-orange-500 font-bold text-xl">2.</div>
              <p class="text-gray-800">
                Consultez votre classement pour suivre vos performances dans les
                tournois.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-8">
        <button class="bg-orange-500 text-white mt-4 px-6 py-2 rounded-lg">
          Créer un tournoi
        </button>

        <button class="bg-orange-500 text-white mt-4 px-6 py-2 rounded-lg">
          Créer une équipe
        </button>
      </div>
    </div>
    <div class="right-panel flex flex-col gap-6">
      <div class="bg-orange-200 p-6 rounded-lg">
        <h4 class="text-left font-bold text-lg mb-4">Création rapide</h4>
        <div class="flex flex-col gap-2">
          <span
            class="inline-block bg-orange-500 text-white px-3 py-1 rounded-xl"
          >
            En quelques clics
          </span>
          <span
            class="inline-block bg-orange-500 text-white px-3 py-1 rounded-xl"
          >
            Gestion automatique des matchs du tournoi
          </span>
        </div>
      </div>

      <div class="bg-orange-200 p-6 rounded-lg">
        <h4 class="text-left font-bold text-lg mb-4">Classement</h4>
        <div class="flex flex-col gap-2">
          <span
            class="inline-block bg-orange-500 text-white px-3 py-1 rounded-xl"
          >
            Visualisation des scores
          </span>
          <span
            class="inline-block bg-orange-500 text-white px-3 py-1 rounded-xl"
          >
            Statistiques
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
