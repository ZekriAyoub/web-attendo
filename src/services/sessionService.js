import { supabase } from '@/lib/supabaseClient.js'

/**
 * Récupère toutes les sessions existantes depuis la base de données.
 * Les sessions sont triées par ID de manière croissante.
 * @returns {Promise<Array>} Liste des sessions
 * @throws {Error} en cas d’erreur de requête Supabase
 */
export async function fetchSessions() {
  const { data, error } = await supabase.from('session').select('*').order('id', { ascending: true })
  if (error) throw error
  return data
}

/**
 * Ajoute une nouvelle session à la base de données.
 * @param {string} label - Nom de la session (ex. : "juin", "rattrapage")
 * @returns {Promise<Array>} La session ajoutée (tableau contenant un objet)
 * @throws {Error} en cas d’échec d’insertion
 */
export async function addSession(label) {
  const { data, error } = await supabase.from('session').insert([{ label }])
  if (error) throw error
  return data
}

/**
 * Récupère uniquement le label (nom) d'une session à partir de son ID.
 * Utile pour afficher un titre ou une information de session.
 * @param {number|string} sessionId - L'identifiant unique de la session
 * @returns {Promise<string>} Le label de la session
 * @throws {Error} si la session n'existe pas ou en cas d'erreur
 */
export async function getSessionLabel(sessionId) {
  const { data, error } = await supabase
    .from('session')
    .select('label')
    .eq('id', sessionId)
    .single()

  if (error) throw error
  return data.label
}
