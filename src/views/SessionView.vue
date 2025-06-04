<script>
import { fetchSessions, addSession } from '@/services/sessionService'
import TableComponent from '@/components/TableComponent.vue'
import FormComponent from '@/components/FormComponent.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
import { useToast } from 'vue-toastification'

export default {
  components: {
    TableComponent,
    FormComponent,
    BreadCrumb
  },
  data() {
    return {
      sessions: [],
      newLabel: '',
      toast: useToast()
    }
  },
  created() {
    this.loadSessions()
  },
  methods: {
    async loadSessions() {
      try {
        this.sessions = await fetchSessions()
      } catch (e) {
        console.error('Erreur chargement sessions:', e.message)
        this.toast.error('Erreur lors du chargement des sessions')
      }
    },
    async add() {
      if (!this.newLabel.trim()) return
      try {
        await addSession(this.newLabel)
        this.newLabel = ''
        await this.loadSessions()
        this.toast.success('Session ajoutée avec succès')
      } catch (e) {
        console.error('Erreur ajout session:', e.message)
        this.toast.error('Erreur lors de l’ajout de la session')
      }
    }
  }
}
</script>

<template>
  <BreadCrumb />
  <div class="p-3">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Sessions </h2>
    <TableComponent :headers="['SESSIONS']" :content="sessions" :attributes="['label']" :enableFilters="true">
      <template #row="{ item }">
        <td class="px-6 py-3 text-blue-600 cursor-pointer hover:underline">
          <RouterLink :to="`/session/${item.id}`">{{ item.label }}</RouterLink>
        </td>
      </template>
    </TableComponent>

    <FormComponent title="Ajouter une session" labelText="Nouvelle session" placeholder="juin"
      v-model="newLabel" @submit="add" />
  </div>
</template>
