<script setup></script>

<template>
  <header
    class="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center"
  >
    <RouterLink to="/" class="text-orange-500 text-xl font-bold"
      >FIBFA</RouterLink
    >
    <div class="flex gap-8">
      <RouterLink to="/tournament">Tournois</RouterLink>
      <RouterLink to="/team">Equipe</RouterLink>
    </div>
    <div class="flex gap-8">
      <template v-if="!isAuthenticated">
        <RouterLink to="/login" class="text-orange-500">Connexion</RouterLink>
        <RouterLink to="/signin" class="text-orange-500"
          >Inscription</RouterLink
        >
      </template>

      <button v-else @click="logout">Déconnexion</button>
    </div>
  </header>
</template>

<style scoped></style>
