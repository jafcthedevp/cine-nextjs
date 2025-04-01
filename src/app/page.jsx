"use client"

import { Button } from "@/components/ui/button"
import { Film, Popcorn, Ticket } from "lucide-react"
import UserProfile from "@/components/user-profile"
import MovieCarousel from "@/components/movie-carousel"
import MovieCard from "@/components/movie-card"

// Datos de ejemplo para el carrusel
const featuredMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    overview:
        "Paul Atreides se une a los Fremen y comienza un viaje espiritual y político para vengar la caída de su familia, mientras enfrenta un futuro que solo él puede prever.",
    backdrop_url: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    poster_url: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    genres: "Ciencia ficción, Aventura, Drama",
    rating: 8.7,
    release_date: "2024-03-01",
  },
  {
    id: 2,
    title: "Oppenheimer",
    overview:
        "La historia del científico estadounidense J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.",
    backdrop_url: "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
    poster_url: "https://image.tmdb.org/t/p/w500/ncKCQVXgk3rK4GQrLI4YaSKzGIl.jpg",
    genres: "Drama, Historia, Thriller",
    rating: 8.9,
    release_date: "2023-07-21",
  },
  {
    id: 3,
    title: "Gladiator II",
    overview:
        "Años después de presenciar la muerte de Máximo, Lucius se ve obligado a entrar en el Coliseo mientras el Imperio Romano está en decadencia.",
    backdrop_url: "https://image.tmdb.org/t/p/original/8GnWDLn2AhnmkQ7hlQ9NJUYobSS.jpg",
    poster_url: "https://image.tmdb.org/t/p/w500/aUqxnuQZTjLXAvoJmjMVBxn5JWX.jpg",
    genres: "Acción, Aventura, Drama",
    rating: 8.5,
    release_date: "2024-11-22",
  },
]

// Datos de ejemplo para las películas en cartelera
const nowPlayingMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    poster_url: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    rating: 8.7,
    rating_mpaa: "PG-13",
    release_date: "2024-03-01",
  },
  {
    id: 4,
    title: "Deadpool & Wolverine",
    poster_url: "https://image.tmdb.org/t/p/w500/kqFqzUYzZQ8L4Pa3A6UFJt9RvNG.jpg",
    rating: 8.3,
    rating_mpaa: "R",
    release_date: "2024-07-26",
  },
  {
    id: 5,
    title: "Furiosa: A Mad Max Saga",
    poster_url: "https://image.tmdb.org/t/p/w500/6lLqUmSXA9LN3dgNZXUUZdIxURm.jpg",
    rating: 7.9,
    rating_mpaa: "R",
    release_date: "2024-05-24",
  },
  {
    id: 6,
    title: "The Fall Guy",
    poster_url: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    rating: 7.5,
    rating_mpaa: "PG-13",
    release_date: "2024-05-03",
  },
]

export default function Home() {
  return (
      <div className="min-h-screen bg-black">
        {/* Navbar */}
        <nav className="border-b border-gray-800">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold text-white">CineMax</span>
            </div>
            <UserProfile />
          </div>
        </nav>

        {/* Hero Carousel */}
        <MovieCarousel movies={featuredMovies} />

        {/* En Cartelera */}
        <div className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">En Cartelera</h2>
              <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                Ver Todos
              </Button>
            </div>
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {nowPlayingMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onClick={() => console.log(`Clicked on ${movie.title}`)} />
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-gray-950">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border border-gray-800 p-6 text-center">
                <Ticket className="mx-auto mb-4 h-12 w-12 text-red-500" />
                <h3 className="mb-2 text-xl font-semibold text-white">Online Booking</h3>
                <p className="text-gray-400">Reserve your seats in advance with our easy booking system</p>
              </div>
              <div className="rounded-lg border border-gray-800 p-6 text-center">
                <Popcorn className="mx-auto mb-4 h-12 w-12 text-red-500" />
                <h3 className="mb-2 text-xl font-semibold text-white">Snack Bar</h3>
                <p className="text-gray-400">Enjoy fresh popcorn and refreshments during your movie</p>
              </div>
              <div className="rounded-lg border border-gray-800 p-6 text-center">
                <Film className="mx-auto mb-4 h-12 w-12 text-red-500" />
                <h3 className="mb-2 text-xl font-semibold text-white">Premium Screens</h3>
                <p className="text-gray-400">Experience movies in stunning 4K with Dolby Atmos sound</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

