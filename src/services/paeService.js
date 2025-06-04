import { supabase } from '@/lib/supabaseClient.js'

/**
 * Récupère la liste des étudiants inscrits à une UE donnée.
 * Chaque étudiant est extrait depuis la table `pae`, avec ses informations de base.
 *
 * @param {string} ue - Code de l’UE (ex : "4WEB1")
 * @returns {Promise<Array<{ id: string, firstname: string, lastname: string }>>}
 * @throws {Error} en cas d’erreur Supabase
 */
export async function getStudentsByUe(ue) {
  const { data, error } = await supabase
    .from('pae')
    .select('student(student_id, firstname, lastname)')
    .eq('ue', ue)

  if (error) throw error

  return data.map(pae => ({
    id: pae.student.student_id,
    firstname: pae.student.firstname,
    lastname: pae.student.lastname
  }))
}
