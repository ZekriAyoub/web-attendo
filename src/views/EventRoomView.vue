<script>
import Breadcrumb from '@/components/BreadCrumb.vue'
import FormComponent from '@/components/FormComponent.vue'
import RoomCard from '@/components/RoomCard.vue'
import { useToast } from 'vue-toastification'

import { getEventLabel } from '@/services/eventService.js'
import { getAvailableRooms } from '@/services/roomService.js'
import { getRoomsForEvent, addRoomToEvent } from '@/services/examinationRoomService.js'

export default {
  components: {
    Breadcrumb,
    FormComponent,
    RoomCard
  },
  props: ['sessionId', 'ue', 'eventId'],
  data() {
    return {
      rooms: [],
      availableRooms: [],
      selectedRoom: '',
      eventLabel: '',
      toast: useToast()
    }
  },
  async created() {
    await this.fetchEventLabel()
    await this.loadData()
  },
  methods: {
    async fetchEventLabel() {
      try {
        const label = await getEventLabel(this.eventId)
        this.eventLabel = `${label} - ${this.ue}`
      } catch (error) {
        console.error('Erreur récupération label épreuve', error)
        this.toast.error("Erreur lors du chargement de l’épreuve.")
        this.eventLabel = 'Épreuve inconnue'
      }
    },
    async loadData() {
      try {
        this.rooms = await getRoomsForEvent(this.eventId)
        this.availableRooms = await getAvailableRooms(this.eventId)
        this.selectedRoom = ''
      } catch (e) {
        console.error('Erreur chargement locaux', e)
        this.toast.error('Erreur lors du chargement des locaux.')
      }
    },
    async add() {
      if (!this.selectedRoom) return
      try {
        await addRoomToEvent(this.eventId, this.selectedRoom)
        this.toast.success('Local ajouté avec succès.')
        await this.loadData()
      } catch (e) {
        console.error('Erreur ajout local', e)
        this.toast.error("Erreur lors de l'ajout du local.")
      }
    }
  }
}
</script>

<template>
  <Breadcrumb />

  <div class="p-4">
    <h2 class="text-2xl text-blue-700 font-semibold mb-6">
      Liste des locaux pour <strong>{{ eventLabel }}</strong>
    </h2>

    <div v-if="rooms.length !== 0" class="flex flex-wrap gap-4 mb-8 ml-20">
      <RoomCard v-for="room in rooms" :key="room.id" :label="room.room.label" :capacity="room.room.capacity"
        :supervisor="room.supervisor?.acro" :present="room.presentCount" :to="{
          name: 'attendance',
          params: { sessionId, ue, eventId, examinationRoomId: room.id }
        }" />
    </div>

    <p v-else class="mb-10 ml-5">
      Aucun local n'a été prévu pour l'évaluation. Veuillez en ajouter !
    </p>

    <FormComponent title="Ajouter un local" labelText="Local" type="select" :options="availableRooms.map(r => r.label)"
      v-model="selectedRoom" buttonText="Ajouter" @submit="add" selectPlaceholder="Choisissez un local" />
  </div>
</template>
