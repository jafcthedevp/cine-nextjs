import { supabase } from "./client"

// Funciones para películas
export async function getMovies() {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .order('release_date', { ascending: false })
  
  if (error) {
    console.error('Error fetching movies:', error)
    return []
  }
  
  return data || []
}

export async function getUpcomingMovies() {
  const today = new Date().toISOString().split('T')[0]
  
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .gt('release_date', today)
    .order('release_date', { ascending: true })
  
  if (error) {
    console.error('Error fetching upcoming movies:', error)
    return []
  }
  
  return data || []
}

export async function getFavoriteMovies(userId) {
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      id,
      movie_id,
      movies (*)
    `)
    .eq('user_id', userId)
  
  if (error) {
    console.error('Error fetching favorite movies:', error)
    return []
  }
  
  return data?.map(item => item.movies) || []
}

export async function addFavoriteMovie(userId, movieId) {
  const { data, error } = await supabase
    .from('favorites')
    .insert([
      { user_id: userId, movie_id: movieId }
    ])
  
  if (error) {
    console.error('Error adding favorite movie:', error)
    return false
  }
  
  return true
}

export async function removeFavoriteMovie(userId, movieId) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .match({ user_id: userId, movie_id: movieId })
  
  if (error) {
    console.error('Error removing favorite movie:', error)
    return false
  }
  
  return true
}

// Funciones para reservas
export async function getReservations(userId) {
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      id,
      movie_id,
      movies (*),
      cinema,
      date,
      seats,
      created_at
    `)
    .eq('user_id', userId)
    .order('date', { ascending: true })
  
  if (error) {
    console.error('Error fetching reservations:', error)
    return []
  }
  
  return data || []
}

export async function getActiveReservations(userId) {
  const today = new Date().toISOString()
  
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      id,
      movie_id,
      movies (*),
      cinema,
      date,
      seats,
      created_at
    `)
    .eq('user_id', userId)
    .gte('date', today)
    .order('date', { ascending: true })
  
  if (error) {
    console.error('Error fetching active reservations:', error)
    return []
  }
  
  return data || []
}

export async function getPastReservations(userId) {
  const today = new Date().toISOString()
  
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      id,
      movie_id,
      movies (*),
      cinema,
      date,
      seats,
      created_at
    `)
    .eq('user_id', userId)
    .lt('date', today)
    .order('date', { ascending: false })
  
  if (error) {
    console.error('Error fetching past reservations:', error)
    return []
  }
  
  return data || []
}

export async function createReservation(reservation) {
  const { data, error } = await supabase
    .from('reservations')
    .insert([reservation])
  
  if (error) {
    console.error('Error creating reservation:', error)
    return null
  }
  
  return data?.[0] || null
}

export async function cancelReservation(reservationId) {
  const { error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', reservationId)
  
  if (error) {
    console.error('Error canceling reservation:', error)
    return false
  }
  
  return true
}

// Funciones para perfil de usuario
export async function updateUserProfile(userId, profile) {
  const { error } = await supabase.auth.updateUser({
    data: profile
  })
  
  if (error) {
    console.error('Error updating user profile:', error)
    return false
  }
  
  return true
}

export async function getUserStats(userId) {
  // Obtener estadísticas del usuario (películas vistas, favoritas, etc.)
  const [moviesWatched, favorites, totalReservations] = await Promise.all([
    getPastReservations(userId),
    getFavoriteMovies(userId),
    getReservations(userId)
  ])
  
  return {
    moviesWatched: moviesWatched.length,
    favorites: favorites.length,
    totalReservations: totalReservations.length
  }
}

