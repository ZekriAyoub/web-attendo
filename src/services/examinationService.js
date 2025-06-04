import { supabase } from '@/lib/supabaseClient.js'

/**
 * Récupère les IDs des étudiants déjà présents dans une salle d'examen.
 * @param {number|string} examinationRoomId - ID de la salle
 * @returns {Promise<Array<string>>} Liste des identifiants étudiants
 * @throws {Error} en cas d’erreur Supabase
 */
export async function getPresentStudentIds(examinationRoomId) {
  const { data, error } = await supabase
    .from('examination')
    .select('student')
    .eq('examination_room', examinationRoomId)

  if (error) throw error
  return data.map(e => e.student)
}

/**
 * Enregistre la présence d'un étudiant dans une salle.
 * @param {string} studentId - ID de l'étudiant
 * @param {number|string} examinationRoomId - ID de la salle
 * @returns {Promise<void>}
 * @throws {Error} en cas d’erreur d’insertion
 */
export async function insertStudentPresence(studentId, examinationRoomId) {
  const { error } = await supabase.from('examination').insert({
    student: studentId,
    examination_room: examinationRoomId
  })
  if (error) throw error
}

/**
 * Supprime la présence d’un étudiant dans une salle.
 * @param {string} studentId - ID de l’étudiant
 * @param {number|string} examinationRoomId - ID de la salle
 * @returns {Promise<void>}
 * @throws {Error} en cas d’erreur de suppression
 */
export async function removeStudentPresence(studentId, examinationRoomId) {
  const { error } = await supabase
    .from('examination')
    .delete()
    .eq('student', studentId)
    .eq('examination_room', examinationRoomId)

  if (error) throw error
}

/**
 * Vérifie si un étudiant est déjà présent dans une autre salle pour la même épreuve.
 * Utilise une jointure sur examination_room(event).
 *
 * @param {string} studentId - ID de l’étudiant
 * @param {number|string} eventId - ID de l’épreuve
 * @param {number|string} currentRoomId - Salle actuelle (à ignorer)
 * @returns {Promise<Array>} Résultats en conflit (longueur > 0 si conflit)
 * @throws {Error} en cas d’erreur de requête
 */
export async function getStudentPresenceConflict(studentId, eventId, currentRoomId) {
  const { data, error } = await supabase
    .from('examination')
    .select('id, examination_room!inner(event)')
    .eq('student', studentId)
    .eq('examination_room.event', eventId)
    .neq('examination_room', currentRoomId)

  if (error) throw error
  return data
}
