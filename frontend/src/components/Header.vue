<template>
  <header
    class="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50"
  >
    <RouterLink to="/" class="text-orange-500 text-xl font-bold">
      FIBFA
    </RouterLink>

    <div class="flex gap-8">
      <RouterLink to="/tournament">Tournois</RouterLink>
      <RouterLink to="/team">Équipe</RouterLink>
    </div>

    <div class="flex gap-4 items-center">
      <template v-if="!isAuthenticated">
        <RouterLink to="/login" class="text-orange-500 font-semibold">
          Connexion
        </RouterLink>
        <RouterLink to="/signin" class="text-orange-500 font-semibold">
          Inscription
        </RouterLink>
      </template>

      <template v-else>
        <span class="font-semibold">Bonjour {{ user.pseudo }}</span>
        <button
          @click="handleLogout"
          class="bg-red-500 text-white px-3 py-1 rounded"
        >
          Déconnexion
        </button>
      </template>
    </div>
  </header>
</template>

<script setup>
import { user, isAuthenticated, fetchUser, logout } from "../stores/auth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  fetchUser();
});

const handleLogout = async () => {
  try {
    await logout();

    router.push("/login");
  } catch (error) {
    alert(error);
  }
};
</script>
<style scoped></style>
