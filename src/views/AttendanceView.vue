<script>
import Breadcrumb from '@/components/BreadCrumb.vue'
import TableComponent from '@/components/TableComponent.vue'
import FormComponent from '@/components/FormComponent.vue'
import { useToast } from 'vue-toastification'

import {
  getPresentStudentIds,
  insertStudentPresence,
  removeStudentPresence,
  getStudentPresenceConflict
} from '@/services/examinationService.js'

import {
  getRoomCapacityAndEvent,
  getRoomDetails,
  updateSupervisorInRoom
} from '@/services/examinationRoomService.js'

import { getStudentsByUe } from '@/services/paeService.js'
import { getTeacherByAcro } from '@/services/teacherService.js'


export default {
  props: ['sessionId', 'ue', 'eventId', 'examinationRoomId'],
  components: {
    Breadcrumb,
    TableComponent,
    FormComponent
  },
  data() {
    return {
      students: [],
      selectedSupervisor: '',
      roomLabel: '',
      supervisorAcro: null,
      isCompleted: false,
      toast: useToast()
    }
  },
  async created() {
    await this.refreshAttendance()
  },
  methods: {
    async refreshAttendance() {
      try {
        const roomData = await getRoomDetails(this.examinationRoomId)
        this.roomLabel = roomData.label
        this.supervisorAcro = roomData.supervisor
        this.isCompleted = roomData.completed

        const [students, presentIds] = await Promise.all([
          getStudentsByUe(this.ue),
          getPresentStudentIds(this.examinationRoomId)
        ])

        this.students = students.map(s => ({ ...s, present: presentIds.includes(s.id) }))
      } catch (e) {
        console.error('Erreur chargement étudiants ou local :', e)
        this.toast.error("Erreur lors du chargement des données de présence.")
      }
    },
    async togglePresence(row) {
      if (this.isCompleted) return
      try {
        const { capacity, eventId } = await getRoomCapacityAndEvent(this.examinationRoomId)
        const presentIds = await getPresentStudentIds(this.examinationRoomId)

        const currentPresentCount = presentIds.length
        const alreadyElsewhere = await getStudentPresenceConflict(row.id, eventId, this.examinationRoomId)

        if (!row.present && alreadyElsewhere.length > 0) {
          throw new Error("Cet étudiant est déjà assigné à un autre local pour cette épreuve.")
        }

        if (!row.present && currentPresentCount >= capacity) {
          throw new Error("Capacité maximale atteinte. Impossible d’ajouter un étudiant supplémentaire.")
        }

        if (!row.present) {
          await insertStudentPresence(row.id, this.examinationRoomId)
        } else {
          await removeStudentPresence(row.id, this.examinationRoomId)
        }

        await this.refreshAttendance()
      } catch (e) {
        console.error('Erreur présence :', e)
        this.toast.error(e.message || "Erreur lors de la mise à jour de la présence.")
      }
    },
    async updateSupervisor() {
      if (this.isCompleted) return
      if(!this.selectedSupervisor.trim()) return

      try {
        const upperAcro = this.selectedSupervisor.trim().toUpperCase()

        const teacher = await getTeacherByAcro(upperAcro)
        if (!teacher) {
          throw new Error("Ce prof n'existe pas.")
        }

        await updateSupervisorInRoom(this.examinationRoomId, upperAcro)
        this.selectedSupervisor = ''
        await this.refreshAttendance()
        this.toast.success("Surveillant mis à jour avec succès.")
      } catch (e) {
        console.error('Erreur modification surveillant :', e)
        this.toast.error(e.message || "Erreur lors de la mise à jour du surveillant.")
      }
    }
  }
}
</script>

<template>
  <Breadcrumb />
  <div class="p-4">
    <h2 class="text-2xl font-semibold text-blue-700 mb-6">
      Prise de présence du local {{ roomLabel }}
      <span v-if="supervisorAcro"> par {{ supervisorAcro }}</span>
    </h2>

    <p v-if="isCompleted" class="text-red-600 text-sm mb-4 italic">
      Cette épreuve est terminée. Le tableau est en lecture seule.
    </p>

    <FormComponent v-if="!isCompleted" title="Modifier le surveillant" labelText="Surveillant"
      placeholder="Trigramme du prof" v-model="selectedSupervisor" buttonText="Modifier" @submit="updateSupervisor" />

    <TableComponent :headers="['MATRICULE', 'NOM', 'PRÉNOM']" :content="students"
      :attributes="['id', 'lastname', 'firstname']" :enableFilters="true"
      :row-class="row => row.present ? 'bg-blue-100' : ''" @rowClick="togglePresence">
      <template #row="{ item }">
        <td class="px-6 py-3 text-gray-700">{{ item.id }}</td>
        <td class="px-6 py-3 text-gray-700">{{ item.lastname }}</td>
        <td class="px-6 py-3 text-gray-700">{{ item.firstname }}</td>
      </template>
    </TableComponent>
  </div>
</template>
