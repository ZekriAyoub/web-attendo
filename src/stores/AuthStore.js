import { defineStore } from 'pinia'
import { supabase } from '../lib/supabaseClient.js'

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      user: null
    }
  },
  actions: {
    /**
     * Récupère l'utilisateur actuellement connecté (si session existante).
     */
    async fetchUser() {
      const { data } = await supabase.auth.getUser()
      this.user = data.user
    },
    /**
    * Démarre l'authentification via Google OAuth.
    */
    async signInWithGoogle() {
      await supabase.auth.signInWithOAuth({ provider: 'google' })
    },
    /**
    * Déconnecte l'utilisateur et réinitialise l'état.
    */
    async signOut() {
      await supabase.auth.signOut()
      this.user = null
    }
  }
})
