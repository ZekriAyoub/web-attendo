import { supabase } from '@/lib/supabaseClient.js'

/**
 * Récupère un enseignant par son acronyme.
 * @param {string} acro - Acronyme du prof (ex: ABE)
 * @returns {Promise<Object|null>} Prof trouvé ou null
 */
export async function getTeacherByAcro(acro) {
  const { data, error } = await supabase
    .from('teacher')
    .select('*')
    .eq('acro', acro)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data || null
}
