import About from '@/views/AboutView.vue'
import Accueil from '@/views/HomeView.vue'
import Session from '@/views/SessionView.vue'
import SessionDetails from '@/views/SessionDetailsView.vue'
import SessionUeView from '@/views/SessionUeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import EventRoomView from '@/views/EventRoomView.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import { useToast } from 'vue-toastification'
import { supabase } from '../lib/supabaseClient.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', name: 'home', component: Accueil,
      meta: {
        breadcrumb: [
          { label: 'Accueil', to: '/' }
        ]
      }
    },
    {
      path: '/about', name: 'about', component: About,
      meta: {
        breadcrumb: [
          { label: 'A propos', to: '/about' }
        ]
      }
    },
    {
      path: '/sessions', name: 'sessions', component: Session,
      meta: {
        requiresAuth: true, breadcrumb: [
          { label: 'Accueil', to: '/' },
          { label: 'sessions', to: '/sessions' }
        ]
      }
    },
    {
      path: '/session/:sessionId', name: 'session-detail', component: SessionDetails, props: true,
      meta: {
        requiresAuth: true, breadcrumb: [
          { label: 'Accueil', to: '/' },
          { label: 'sessions', to: '/sessions' },
          { label: 'session', to: '' }
        ]
      }
    },
    {
      path: '/session/:sessionId/ue/:ue', name: 'session-ue-detail', component: SessionUeView, props: true,
      meta: {
        requiresAuth: true,
        breadcrumb: (route) => [
          { label: 'Accueil', to: '/' },
          { label: 'sessions', to: '/sessions' },
          { label: 'session', to: `/session/${route.params.sessionId}` },
          { label: 'ue', to: '' }
        ]
      }
    },
    {
      path: '/session/:sessionId/ue/:ue/event/:eventId',
      name: 'event-rooms',
      component: EventRoomView,
      props: true,
      meta: {
        requiresAuth: true,
        breadcrumb: route => [
          { label: 'Accueil', to: '/' },
          { label: 'sessions', to: '/sessions' },
          { label: 'session', to: `/session/${route.params.sessionId}` },
          { label: 'ue', to: `/session/${route.params.sessionId}/ue/${route.params.ue}` },
          { label: 'épreuve', to: '' }
        ]
      }
    },
    {
      path: '/session/:sessionId/ue/:ue/event/:eventId/examination/:examinationRoomId',
      name: 'attendance',
      component: AttendanceView,
      props: true,
      meta: {
        requiresAuth: true,
        breadcrumb: route => [
          { label: 'Accueil', to: '/' },
          { label: 'sessions', to: '/sessions' },
          { label: 'session', to: `/session/${route.params.sessionId}` },
          { label: 'ue', to: `/session/${route.params.sessionId}/ue/${route.params.ue}` },
          { label: 'épreuve', to: `/session/${route.params.sessionId}/ue/${route.params.ue}/event/${route.params.eventId}` },
          { label: 'local', to: '' }
        ]
      }
    }

  ]
})

// Guard d'authentification globale : redirige si l'utilisateur n'est pas connecté
router.beforeEach(async (to) => {
  const auth = useAuthStore()
  const toast = useToast()

  if (to.meta.requiresAuth) {
    if (!auth.user) {
      const { data } = await supabase.auth.getUser()
      auth.user = data.user
    }
    if (!auth.user) {
      toast.error('Vous devez être connecté pour accéder à cette section.')
      return { name: 'home' }
    }
  }
  return true
})

export default router
