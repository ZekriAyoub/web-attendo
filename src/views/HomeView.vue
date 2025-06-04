<script>
import { useAuthStore } from '../stores/AuthStore'

export default {
  data() {
    return {
      authStore: useAuthStore()
    }
  },
  computed: {
    user() {
      return this.authStore.user
    }
  },
  mounted() {
    this.authStore.fetchUser()
  }
}
</script>

<template>
  <div class="text-xl p-5">
    <p v-if="user">
      Bonjour,
      <span v-if="user.user_metadata?.full_name">{{ user.user_metadata.full_name }}</span>
      <span v-else>{{ user.email }}</span>
    </p>
    <p v-else>Bienvenue, veuillez vous connecter pour plus de contenu !</p>
  </div>
</template>

