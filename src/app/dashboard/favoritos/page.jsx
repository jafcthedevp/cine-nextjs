"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart, Trash2, Filter } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function FavoritosPage() {
  // En una implementación real, estos datos vendrían de Supabase
  const initialFavorites = [
    {
      id: 1,
      title: "Dune: Part Two",
      director: "Denis Villeneuve",
      genre: "Sci-Fi, Drama",
      year: 2024,
      rating: 4.8,
      poster: "/placeholder.svg?height=200&width=150",
    },
    {
      id: 2,
      title: "Oppenheimer",
      director: "Christopher Nolan",
      genre: "Drama, Historia",
      year: 2023,
      rating: 4.9,
      poster: "/placeholder.svg?height=200&width=150",
    },
    {
      id: 3,
      title: "The Batman",
      director: "Matt Reeves",
      genre: "Acción, Crimen",
      year: 2022,
      rating: 4.5,
      poster: "/placeholder.svg?height=200&width=150",
    },
    {
      id: 4,
      title: "Everything Everywhere All at Once",
      director: "Daniels",
      genre: "Sci-Fi, Comedia",
      year: 2022,
      rating: 4.7,
      poster: "/placeholder.svg?height=200&width=150",
    },
    {
      id: 5,
      title: "Interstellar",
      director: "Christopher Nolan",
      genre: "Sci-Fi, Drama",
      year: 2014,
      rating: 4.8,
      poster: "/placeholder.svg?height=200&width=150",
    },
    {
      id: 6,
      title: "The Godfather",
      director: "Francis Ford Coppola",
      genre: "Crimen, Drama",
      year: 1972,
      rating: 4.9,
      poster: "/placeholder.svg?height=200&width=150",
    },
  ]

  const [favorites, setFavorites] = useState(initialFavorites)
  const [filter, setFilter] = useState("all")

  const filteredFavorites = filter === "all" 
    ? favorites 
    : favorites.filter(movie => movie.genre.toLowerCase().includes(filter.toLowerCase()))

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(movie => movie.id !== id))
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Mis Películas Favoritas</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
            <DropdownMenuItem onClick={() => setFilter("all")}>
              Todos los géneros
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("sci-fi")}>
              Ciencia Ficción
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("drama")}>
              Drama
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("acción")}>
              Acción
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("comedia")}>
              Comedia
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredFavorites.map((movie) => (
          <Card key={movie.id} className="bg-gray-900 border-gray-800">
            <div className="flex p-4">
              <img
                src={movie.poster || "/placeholder.svg"}
                alt={movie.title}
                className="h-[150px] w-[100px] object-cover rounded"
              />
              <div className="ml-4 flex flex-col justify-between flex-1">
                <div>
                  <CardTitle className="text-white text-lg">{movie.title}</CardTitle>
                  <p className="text-sm text-gray-400 mt-1">{movie.director}</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-300">{movie.rating}/5</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{movie.genre}</p>
                  <p className="text-sm text-gray-400">{movie.year}</p>
                </div>
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-red-500 hover:text-red-400 hover:bg-gray-800"
                    onClick={() => removeFromFavorites(movie.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredFavorites.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Heart className="h-16 w-16 text-gray-700 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No hay películas favoritas</h3>
          <p className="text-gray-400 text-center max-w-md">
            {filter === "all" 
              ? "Aún no has añadido ninguna película a tus favoritos." 
              : `No tienes películas favoritas del género "${filter}".`}
          </p>
          {filter !== "all" && (
            <Button 
              variant="outline" 
              className="mt-4 border-gray-700 hover:bg-gray-800"
              onClick={() => setFilter("all")}
            >
              Ver todos los géneros
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

