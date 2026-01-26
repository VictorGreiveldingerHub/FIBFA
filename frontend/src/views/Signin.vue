<template>
  <div
    class="signin min-h-screen flex items-center justify-center bg-gray-50 p-6"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-10 w-full max-w-md flex flex-col gap-6"
    >
      <!-- Titre et sous-titre -->
      <h1 class="text-4xl font-bold text-orange-500 text-center">FIBFA</h1>
      <h2 class="text-2xl font-semibold text-gray-800 text-center">
        Inscrivez-vous
      </h2>

      <!-- Lien connexion -->
      <p class="text-center">
        <span class="text-black">Déjà un compte ? </span>
        <RouterLink to="/login" class="text-orange-500 font-semibold"
          >Connectez-vous</RouterLink
        >
      </p>

      <!-- Formulaire -->
      <form class="flex flex-col gap-4">
        <!-- Pseudo -->
        <div class="flex flex-col gap-1">
          <label class="text-gray-700 font-semibold">Pseudo</label>
          <input
            type="text"
            placeholder="Saisissez votre pseudo"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <!-- Adresse e-mail -->
        <div class="flex flex-col gap-1">
          <label class="text-gray-700 font-semibold">Adresse e-mail</label>
          <input
            type="email"
            placeholder="Saisissez votre adresse e-mail"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <!-- Mot de passe -->
        <div class="flex flex-col gap-1">
          <label class="text-gray-700 font-semibold">Mot de passe</label>
          <input
            type="password"
            placeholder="Saisissez votre mot de passe"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <!-- Bouton inscription -->
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
