import { supabase } from '@/lib/supabaseClient.js'

/**
 * Récupère toutes les salles (rooms) disponibles pour une épreuve donnée.
 * Une salle est considérée disponible si elle n'est pas déjà utilisée
 * dans la table examination_room pour cet eventId.
 *
 * @param {number|string} eventId - L'identifiant de l'épreuve (event)
 * @returns {Promise<Array>} Liste des salles disponibles
 * @throws {Error} en cas d’erreur de requête Supabase
 */
export async function getAvailableRooms(eventId) {
  const { data: usedRooms } = await supabase
    .from('examination_room')
    .select('room')
    .eq('event', eventId)

  const used = usedRooms.map(r => r.room)

  const { data, error } = await supabase
    .from('room')
    .select('*')

  if (error) throw error

    // Filtrer les salles utilisées
  const availableRooms = data.filter(room => !used.includes(room.label))
  return availableRooms
}
