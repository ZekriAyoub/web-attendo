<script>
import LoginButton from './LoginButton.vue';
import { useAuthStore } from '../stores/AuthStore.js'

export default {
  components: {
    LoginButton
  },
  created() {
    const authStore = useAuthStore()
    authStore.fetchUser()
  }
}
</script>

<template>
  <header>
    <h1 class="bg-black text-purple-400 text-4xl text-center p-6">Attendo</h1>
  </header>
  <nav class="flex justify-between items-center p-2 bg-gray-100 border-b-2 border-black">
    <ul class="flex space-x-4">
      <li>
        <RouterLink :to="{ name: 'home' }">Accueil</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'sessions' }">Sessions</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'about' }">À propos</RouterLink>
      </li>
    </ul>
    <LoginButton />
  </nav>

</template>
