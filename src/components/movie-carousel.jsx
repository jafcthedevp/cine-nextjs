"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function MovieCarousel({ movies }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Autoplay
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [movies.length])

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
    }

    if (!movies || movies.length === 0) {
        return null
    }

    const currentMovie = movies[currentIndex]

    return (
        <div className="relative h-[600px] w-full overflow-hidden">
            {/* Imagen de fondo con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out scale-105"
                style={{
                    backgroundImage: `url(${currentMovie.backdrop_url || "/placeholder.svg?height=600&width=1920"})`,
                }}
            />

            {/* Contenido del carrusel */}
            <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-4 pb-20">
                <div className="flex items-center space-x-4 mb-4">
                    {currentMovie.genres
                        ?.split(",")
                        .slice(0, 3)
                        .map((genre, index) => (
                            <span key={index} className="bg-red-500 px-2 py-1 rounded text-xs text-white">
                {genre.trim()}
              </span>
                        ))}
                </div>
                <h1 className="mb-2 text-5xl font-bold text-white md:text-6xl max-w-2xl">{currentMovie.title}</h1>
                <p className="mb-6 max-w-2xl text-lg text-gray-300">
                    {currentMovie.overview?.substring(0, 150)}
                    {currentMovie.overview?.length > 150 ? "..." : ""}
                </p>
                <div className="flex space-x-4">
                    <Button size="lg" className="bg-red-500 text-white hover:bg-red-600">
                        Ver Detalles
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                        Ver Trailer
                    </Button>
                </div>
            </div>

            {/* Controles del carrusel */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
                <ChevronLeft className="h-8 w-8" />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
                <ChevronRight className="h-8 w-8" />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-8 rounded-full ${index === currentIndex ? "bg-red-500" : "bg-gray-500"}`}
                    />
                ))}
            </div>
        </div>
    )
}

