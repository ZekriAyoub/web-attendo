import { supabase } from '@/lib/supabaseClient.js'

/**
 * Récupère la liste complète de toutes les UE présentes en base.
 * @returns {Promise<Array>} Tableau contenant toutes les UE
 * @throws {Error} en cas d’erreur de requête Supabase
 */
export async function getAllUes() {
  const { data, error } = await supabase
    .from('ue')
    .select('*')

  if (error) throw error
  return data
}
