import { supabase } from '@/lib/supabaseClient.js'


/**
 * Récupère toutes les épreuves associées à un `session_compo`.
 * @param {number|string} sessionCompoId - ID de la liaison session/UE
 * @returns {Promise<Array>} Liste des épreuves { id, label, completed }
 * @throws {Error} en cas d’erreur Supabase
 */
export async function getEventsBySessionCompoId(sessionCompoId) {
  const { data, error } = await supabase
    .from('event')
    .select('id, label, completed')
    .eq('session_compo', sessionCompoId)

  if (error) throw error
  return data
}

/**
 * Ajoute une nouvelle épreuve à une session/UE.
 * @param {number|string} sessionCompoId - ID de la liaison session/UE
 * @param {string} label - Nom de l’épreuve (ex. "Projet", "Examen final")
 * @returns {Promise<Array>} L’épreuve insérée
 * @throws {Error} en cas d’échec d’insertion
 */
export async function addEvent(sessionCompoId, label) {
  const { data, error } = await supabase
    .from('event')
    .insert([{ session_compo: sessionCompoId, label }])

  if (error) throw error
  return data
}

/**
 * Met à jour le statut `completed` (terminé) d’une épreuve.
 * @param {number|string} eventId - ID de l’épreuve
 * @param {boolean} completed - Nouvel état (true ou false)
 * @returns {Promise<void>}
 * @throws {Error} en cas d’échec de la mise à jour
 */
export async function updateEventCompleted(eventId, completed) {
  const { error } = await supabase
    .from('event')
    .update({ completed })
    .eq('id', eventId)

  if (error) throw error
}

/**
 * Récupère uniquement le label (nom) d’une épreuve à partir de son ID.
 * @param {number|string} eventId - ID de l’épreuve
 * @returns {Promise<string>} Le nom de l’épreuve
 * @throws {Error} si l’épreuve n’existe pas
 */
export async function getEventLabel(eventId) {
  const { data, error } = await supabase
    .from('event')
    .select('label')
    .eq('id', eventId)
    .single()

  if (error) throw error
  return data.label
}
