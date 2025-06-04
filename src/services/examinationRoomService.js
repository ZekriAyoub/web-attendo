import { supabase } from '@/lib/supabaseClient.js'

/**
 * Récupère toutes les salles liées à une épreuve.
 * Chaque objet retourné contient la salle, le surveillant, et le nombre d'étudiants.
 * @param {number|string} eventId - ID de l'épreuve
 * @returns {Promise<Array>} Liste des salles avec compteur de présents
 */
export async function getRoomsForEvent(eventId) {
  const { data, error } = await supabase
    .from('examination_room')
    .select(`id, room:room(label, capacity), supervisor:supervisor(acro), examination(id, student)`)
    .eq('event', eventId)

  if (error) throw error

  return data.map(room => ({
    ...room,
    presentCount: room.examination ? room.examination.length : 0
  }))
}

/**
 * Ajoute un local à une épreuve donnée.
 * @param {number|string} eventId - ID de l'épreuve
 * @param {string} roomLabel - Nom du local
 */
export async function addRoomToEvent(eventId, roomLabel) {
  const { error } = await supabase
    .from('examination_room')
    .insert([{ event: eventId, room: roomLabel }])

  if (error) throw error
}

/**
 * Récupère les détails d’un local (label, surveillant, statut terminé).
 * @param {number|string} examinationRoomId - ID du local
 * @returns {Promise<Object>} { label, supervisor, completed }
 */
export async function getRoomDetails(examinationRoomId) {
  const { data, error } = await supabase
    .from('examination_room')
    .select('room(label), supervisor, event(completed)')
    .eq('id', examinationRoomId)
    .single()

  if (error) throw error

  return {
    label: data.room.label,
    supervisor: data.supervisor,
    completed: data.event?.completed || false
  }
}

/**
 * Fonction interne : récupère l’ID de l’épreuve liée à une salle.
 * @param {number|string} examinationRoomId
 * @returns {Promise<number|string>} ID de l'épreuve
 */
async function getEventIdFromRoom(examinationRoomId) {
  const { data, error } = await supabase
    .from('examination_room')
    .select('event')
    .eq('id', examinationRoomId)
    .single()

  if (error) throw error
  return data.event
}

/**
 * Fonction interne : vérifie si un surveillant est déjà assigné à une autre salle
 * de la même épreuve (event).
 * @param {number|string} eventId
 * @param {string} supervisorAcro
 * @param {number|string} currentRoomId
 * @returns {Promise<boolean>}
 */
async function isSupervisorAlreadyUsed(eventId, supervisorAcro, currentRoomId) {
  const { data, error } = await supabase
    .from('examination_room')
    .select('id')
    .eq('event', eventId)
    .eq('supervisor', supervisorAcro)
    .neq('id', currentRoomId)

  if (error) throw error
  return data.length > 0
}

/**
 * Met à jour le surveillant d’un local d’examen.
 * Assure qu’un surveillant n’est pas assigné à plusieurs salles pour la même épreuve.
 * @param {number|string} examinationRoomId
 * @param {string} supervisorAcro
 */
export async function updateSupervisorInRoom(examinationRoomId, supervisorAcro) {
  const eventId = await getEventIdFromRoom(examinationRoomId)

  const alreadyUsed = await isSupervisorAlreadyUsed(eventId, supervisorAcro, examinationRoomId)
  if (alreadyUsed) {
    throw new Error('Ce surveillant est déjà assigné à un autre local pour cette épreuve.')
  }

  const { error } = await supabase
    .from('examination_room')
    .update({ supervisor: supervisorAcro })
    .eq('id', examinationRoomId)

  if (error) throw error
}

/**
 * Récupère la capacité d'une salle et l’ID de l’épreuve à laquelle elle est liée.
 * @param {number|string} examinationRoomId
 * @returns {Promise<Object>} { capacity, eventId }
 */
export async function getRoomCapacityAndEvent(examinationRoomId) {
  const { data, error } = await supabase
    .from('examination_room')
    .select('room(capacity), event')
    .eq('id', examinationRoomId)
    .single()

  if (error) throw error
  return {
    capacity: data.room.capacity,
    eventId: data.event
  }
}
