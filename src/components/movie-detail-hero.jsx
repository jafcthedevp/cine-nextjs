"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Star, Heart } from "lucide-react"

export default function MovieDetailHero({ movie, isFavorite, onToggleFavorite }) {
    return (
        <div className="relative">
            {/* Imagen de fondo con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
            <div
                className="h-[600px] w-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${movie.backdrop_url || "/placeholder.svg?height=600&width=1920"})`,
                }}
            />

            {/* Contenido */}
            <div className="relative z-20 mx-auto max-w-7xl px-4">
                <div className="flex flex-col md:flex-row md:items-start md:space-x-8 -mt-72">
                    {/* Póster */}
                    <div className="shrink-0">
                        <img
                            src={movie.poster_url || "/placeholder.svg?height=450&width=300"}
                            alt={movie.title}
                            className="h-[300px] w-[200px] md:h-[450px] md:w-[300px] rounded-lg shadow-lg object-cover border-2 border-gray-800"
                        />
                    </div>

                    {/* Información */}
                    <div className="mt-4 md:mt-0">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {movie.genres?.split(",").map((genre, index) => (
                                <Badge key={index} className="bg-red-500 hover:bg-red-600">
                                    {genre.trim()}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-4xl font-bold text-white md:text-5xl">{movie.title}</h1>
                        <p className="mt-2 text-xl text-gray-300">{movie.tagline}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-4">
                            <div className="flex items-center">
                                <Star className="h-5 w-5 text-yellow-500" />
                                <span className="ml-1 text-white">{movie.rating || "8.5"}/10</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-5 w-5 text-gray-400" />
                                <span className="ml-1 text-white">{movie.runtime || 120} min</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <span className="ml-1 text-white">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : "2023"}
                </span>
                            </div>
                        </div>
                        <p className="mt-4 text-gray-300 max-w-2xl">{movie.overview}</p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <Button className="bg-red-500 hover:bg-red-600">Reservar Entradas</Button>
                            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                                Ver Trailer
                            </Button>
                            <Button variant="outline" className="border-gray-700 hover:bg-gray-800" onClick={onToggleFavorite}>
                                <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                                {isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

