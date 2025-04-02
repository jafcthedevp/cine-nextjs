"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ImageOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function EstrenosPage() {
  const [imageErrors, setImageErrors] = useState({})

  const handleImageError = (id) => {
    setImageErrors((prev) => ({
      ...prev,
      [id]: true,
    }))
  }

  // En una implementación real, estos datos vendrían de Supabase
  const proximosEstrenos = [
    {
      id: 1,
      title: "Dune: Messiah",
      director: "Denis Villeneuve",
      genre: "Sci-Fi, Drama",
      releaseDate: "2025-10-15",
      duration: "155 min",
      rating: "PG-13",
      description: "La continuación de la saga de Dune, siguiendo el ascenso de Paul Atreides como líder mesiánico.",
      poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
      trailer: "#",
    },
    {
      id: 2,
      title: "The Batman 2",
      director: "Matt Reeves",
      genre: "Acción, Crimen",
      releaseDate: "2025-03-22",
      duration: "170 min",
      rating: "PG-13",
      description: "Batman se enfrenta a nuevas amenazas en Gotham mientras profundiza en la corrupción de la ciudad.",
      poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      trailer: "#",
    },
    {
      id: 3,
      title: "Mission: Impossible 8",
      director: "Christopher McQuarrie",
      genre: "Acción, Aventura",
      releaseDate: "2025-05-23",
      duration: "145 min",
      rating: "PG-13",
      description: "Ethan Hunt regresa para una última misión imposible que pondrá a prueba todos sus límites.",
      poster: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
      trailer: "#",
    },
    {
      id: 4,
      title: "Avengers: Secret Wars",
      director: "Russo Brothers",
      genre: "Acción, Aventura, Sci-Fi",
      releaseDate: "2026-05-01",
      duration: "180 min",
      rating: "PG-13",
      description: "Los héroes del universo Marvel se unen para enfrentar la mayor amenaza multiversal hasta la fecha.",
      poster: "https://image.tmdb.org/t/p/w500/kqFqzUYzZQ8L4Pa3A6UFJt9RvNG.jpg",
      trailer: "#",
    },
  ]

  return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white">Próximos Estrenos</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {proximosEstrenos.map((movie) => (
              <Card key={movie.id} className="overflow-hidden bg-gray-900 border-gray-800">
                <div className="relative">
                  {!imageErrors[movie.id] ? (
                      <img
                          src={movie.poster || "/placeholder.svg?height=400&width=300"}
                          alt={movie.title}
                          className="h-[350px] w-full object-cover"
                          onError={() => handleImageError(movie.id)}
                      />
                  ) : (
                      <div className="h-[350px] w-full flex items-center justify-center bg-gray-800">
                        <div className="flex flex-col items-center text-gray-400">
                          <ImageOff className="h-12 w-12 mb-2" />
                          <span className="text-sm text-center px-4">{movie.title}</span>
                        </div>
                      </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-red-500 hover:bg-red-600">{movie.rating}</Badge>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-white">{movie.title}</CardTitle>
                  <CardDescription className="text-gray-400">{movie.director}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-gray-300">
                    {new Date(movie.releaseDate).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-gray-300">{movie.duration}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-3">{movie.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="font-semibold">Género:</span> {movie.genre}
                  </div>
                  <div className="pt-3 flex gap-2">
                    <Button className="flex-1 bg-red-500 hover:bg-red-600">Recordatorio</Button>
                    <Button variant="outline" className="flex-1 border-gray-700 hover:bg-gray-800">
                      Ver Trailer
                    </Button>
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>
      </div>
  )
}

