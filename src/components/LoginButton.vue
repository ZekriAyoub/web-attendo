<script>
import { useAuthStore } from '@/stores/AuthStore'
import { useToast } from 'vue-toastification'

export default {
  data() {
    return {
      authStore: useAuthStore(),
      toast : useToast()
    }
  },
  computed: {
    user() {
      return this.authStore.user
    }
  },
  methods: {
    login() {
      this.authStore.signInWithGoogle()
    },
    logout() {
      this.authStore.signOut().then(() => {
        this.$router.push({ name: 'home' })
      })
      this.toast.success("Déconnexion réussie.")
    }
  }
}
</script>

<template>
  <button v-if="user" @click="logout"
    class="p-2 rounded-full border border-gray-300 hover:bg-gray-300 transition-colors" title="Déconnexion">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="w-6 h-6 text-gray-600 hover:text-black">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25
              2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0
              2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
  </button>

  <button v-else @click="login" class="flex items-center gap-2 border px-3 py-1 rounded hover:bg-gray-300">
    <img src="@/components/icons/google-logo.png" alt="Google Logo" class="w-5 h-5" />
    Connexion avec Google
  </button>

</template>
