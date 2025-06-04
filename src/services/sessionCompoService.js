import { supabase } from '@/lib/supabaseClient.js'

/**
 * Récupère l'ID unique de l'association entre une session et une UE.
 * (table : session_compo)
 * @param {number|string} sessionId - L'identifiant de la session
 * @param {string} ue - Le code de l'UE concernée
 * @returns {Promise<number>} L'identifiant de la ligne dans session_compo
 * @throws {Error} si la combinaison session/UE n'existe pas ou en cas d'erreur
 */
export async function getSessionCompoId(sessionId, ue) {
  const { data, error } = await supabase
    .from('session_compo')
    .select('id')
    .eq('session', sessionId)
    .eq('ue', ue)
    .single()

  if (error) throw error
  return data.id
}

/**
 * Récupère toutes les UE associées à une session donnée.
 * @param {number|string} sessionId - L'identifiant de la session
 * @returns {Promise<Array<string>>} Liste des codes UE associés à la session
 * @throws {Error} en cas d’échec de la requête
 */
export async function getUesBySession(sessionId) {
  const { data, error } = await supabase
    .from('session_compo')
    .select('ue')
    .eq('session', sessionId)

  if (error) throw error
  return data.map(row => row.ue)
}

/**
 * Ajoute une UE à une session dans la table session_compo.
 * @param {number|string} sessionId - L'identifiant de la session
 * @param {string} ue - Le code de l'UE à associer
 * @returns {Promise<Array>} La ligne insérée (retournée par Supabase)
 * @throws {Error} en cas d’échec d’insertion
 */
export async function addUeToSession(sessionId, ue) {
  const { data, error } = await supabase
    .from('session_compo')
    .insert([{ session: sessionId, ue }])

  if (error) throw error
  return data
}
