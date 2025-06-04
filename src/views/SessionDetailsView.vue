<script>
import TableComponent from '@/components/TableComponent.vue'
import FormComponent from '@/components/FormComponent.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
import { useToast } from 'vue-toastification'
import { getSessionLabel } from '@/services/sessionService.js'
import { getUesBySession, addUeToSession } from '@/services/sessionCompoService.js'
import { getAllUes } from '@/services/ueService.js'

export default {
  props: ['sessionId'],
  components: {
    TableComponent,
    FormComponent,
    BreadCrumb
  },
  data() {
    return {
      sessionLabel: '',
      sessionUes: [],
      allUes: [],
      availableUes: [],
      selectedUe: '',
      toast: useToast()
    }
  },
  async created() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const [uesInSession, allUeObjects] = await Promise.all([
          getUesBySession(this.sessionId),
          getAllUes()
        ])

        this.sessionUes = uesInSession.map(ue => ({ label: ue }))
        this.allUes = allUeObjects.map(u => u.ue)
        this.availableUes = this.allUes.filter(ue => !uesInSession.includes(ue))
        this.selectedUe = ''

        this.sessionLabel = await getSessionLabel(this.sessionId)
      } catch (error) {
        console.error('Erreur chargement données session :', error)
        this.toast.error('Erreur lors du chargement des données.')
      }
    },
    async add() {
      if (!this.selectedUe) return
      try {
        await addUeToSession(this.sessionId, this.selectedUe)
        this.toast.success('UE ajoutée avec succès !')
        this.selectedUe = ''
        await this.loadData()
      } catch (error) {
        console.error('Erreur ajout UE :', error)
        this.toast.error("Erreur lors de l'ajout de l'UE.")
      }
    }
  }
}
</script>

<template>
  <BreadCrumb />
  <div class="p-3">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">
      Session <span class="italic text-blue-600">{{ sessionLabel }}</span>
    </h2>

    <TableComponent :headers="['UE']" :content="sessionUes" :attributes="['label']" :enableFilters="true">
      <template #row="{ item }">
        <td class="px-6 py-3 text-blue-600 hover:underline cursor-pointer">
          <RouterLink :to="`/session/${sessionId}/ue/${item.label}`">
            {{ item.label }}
          </RouterLink>
        </td>
      </template>
    </TableComponent>

    <FormComponent title="Ajouter une UE dans la session" labelText="Ajouter" type="select" :options="availableUes"
      v-model="selectedUe" selectPlaceholder="Sélectionnez une ue" buttonText="Ajouter l'UE" @submit="add" />
  </div>
</template>
