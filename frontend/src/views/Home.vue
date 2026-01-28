<template>
  <div
    class="homepage min-h-screen bg-gray-50 px-6 pt-30 pb-16 flex flex-col items-center gap-12"
  >
    <!-- Hero principal -->
    <section class="text-center max-w-4xl mx-auto flex flex-col gap-4">
      <h1 class="text-5xl font-extrabold text-gray-900">
        FIBFA — Fédération Internationale de Baby-Foot Association
      </h1>
      <p class="text-lg text-gray-700">
        Gérez vos tournois officiels de baby‑foot, créez des équipes, suivez les
        matchs et les classements facilement.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <RouterLink
          to="/signin"
          class="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          S’inscrire
        </RouterLink>
        <RouterLink
          to="/login"
          class="bg-white border border-orange-500 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition"
        >
          Se connecter
        </RouterLink>
      </div>
    </section>

    <!-- Section fonctionnalités clés en grille -->
    <section
      class="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div
        class="bg-white p-6 rounded-xl shadow-md flex flex-col gap-2 hover:shadow-lg transition"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Créez et organisez vos tournois
        </h3>
        <p class="text-gray-700 text-sm">
          Ajoutez un tournoi en quelques clics, définissez la date, la
          description et commencez à y inscrire des équipes.
        </p>
      </div>

      <div
        class="bg-white p-6 rounded-xl shadow-md flex flex-col gap-2 hover:shadow-lg transition"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Gestion automatisée des matchs
        </h3>
        <p class="text-gray-700 text-sm">
          Génération instantanée des matchs et suivi des scores, avec planning
          automatique.
        </p>
      </div>

      <div
        class="bg-white p-6 rounded-xl shadow-md flex flex-col gap-2 hover:shadow-lg transition"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Inscription et rôle utilisateur
        </h3>
        <p class="text-gray-700 text-sm">
          Créez une équipe, choisissez un coéquipier, et gérez vos
          participations aux tournois officiels.
        </p>
      </div>

      <div
        class="bg-white p-6 rounded-xl shadow-md flex flex-col gap-2 hover:shadow-lg transition"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Classements et statistiques
        </h3>
        <p class="text-gray-700 text-sm">
          Suivez les résultats des matchs, mettez à jour les scores et consultez
          le classement en temps réel.
        </p>
      </div>
    </section>

    <!-- CTA bas de page -->
    <section class="text-center flex flex-col gap-4">
      <h2 class="text-3xl font-bold text-gray-900">Prêt à commencer ?</h2>
      <p class="text-gray-700">
        Inscrivez‑vous gratuitement et lancez votre premier tournoi aujourd’hui
        !
      </p>

      <RouterLink
        to="/signin"
        class="bg-orange-500 text-white px-10 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
      >
        Commencer maintenant
      </RouterLink>
    </section>
  </div>
</template>
