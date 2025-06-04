<script>
import FormComponent from '@/components/FormComponent.vue'
import CardComponent from '@/components/CardComponent.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
import { useToast } from 'vue-toastification'
import { getSessionCompoId } from '@/services/sessionCompoService.js'
import { getEventsBySessionCompoId, addEvent, updateEventCompleted } from '@/services/eventService.js'
import { getSessionLabel } from '@/services/sessionService.js'

export default {
  props: ['sessionId', 'ue'],
  components: {
    FormComponent,
    CardComponent,
    BreadCrumb
  },
  data() {
    return {
      sessionLabel: '',
      ueLabel: this.ue,
      sessionCompoId: null,
      events: [],
      newLabel: '',
      toast: useToast()
    }
  },
  async created() {
    await this.fetchSessionLabel()
    await this.fetchEvents()
  },
  methods: {
    async fetchSessionLabel() {
      try {
        this.sessionLabel = await getSessionLabel(this.sessionId)
      } catch (e) {
        console.error('Erreur récupération session', e)
        this.toast.error('Erreur lors du chargement de la session')
      }
    },
    async fetchEvents() {
      try {
        this.sessionCompoId = await getSessionCompoId(this.sessionId, this.ue)
        this.events = await getEventsBySessionCompoId(this.sessionCompoId)
      } catch (error) {
        console.error('Erreur chargement épreuves', error)
        this.toast.error("Erreur lors du chargement des épreuves")
      }
    },
    async add() {
      if (!this.newLabel.trim() || !this.sessionCompoId) return
      try {
        await addEvent(this.sessionCompoId, this.newLabel)
        this.toast.success("Épreuve ajoutée avec succès")
        this.newLabel = ''
        await this.fetchEvents()
      } catch (error) {
        console.error('Erreur ajout épreuve', error)
        this.toast.error("Erreur lors de l’ajout de l’épreuve")
      }
    },
    async toggleCompleted(eventId, value) {
      try {
        await updateEventCompleted(eventId, value)
        this.toast.success("Statut mis à jour")
        await this.fetchEvents()
      } catch (error) {
        console.error('Erreur maj statut', error)
        this.toast.error("Erreur lors de la mise à jour du statut")
      }
    }
  }
}
</script>

<template>
  <BreadCrumb />
  <div class="p-3">
    <h2 class="text-2xl text-blue-600 italic mb-6">
      Liste des épreuves de {{ ueLabel }} (session : {{ sessionLabel }})
    </h2>

    <div v-if="events.length" class="flex flex-wrap gap-4 mb-8 ml-40">
      <CardComponent v-for="event in events" :key="event.id" :label="event.label"
        :to="{ name: 'event-rooms', params: { sessionId, ue, eventId: event.id } }" :completed="event.completed"
        :toggleable="true" @toggle="toggleCompleted(event.id, $event)" />
    </div>

    <p v-else class="ml-12 text-xl m-5">Aucune épreuve prévue</p>

    <FormComponent title="Ajouter une épreuve" labelText="Nom de l’épreuve" placeholder="bilan, projet, examen..."
      v-model="newLabel" @submit="add" />
  </div>
</template>
