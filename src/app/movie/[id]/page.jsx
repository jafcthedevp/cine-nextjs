"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/services/auth-provider"
import { ArrowLeft, Star } from "lucide-react"
import MovieBooking from "@/components/movie-booking"
import MovieDetailHero from "@/components/movie-detail-hero"
import CastGallery from "@/components/cast-gallery"
import { getMovies, addFavoriteMovie, removeFavoriteMovie, getFavoriteMovies } from "@/supabase/supabase-service"
import { Badge } from "@/components/ui/badge"

export default function MovieDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { id } = params
    const { user } = useAuth()
    const { toast } = useToast()

    const [movie, setMovie] = useState(null)
    const [cast, setCast] = useState([])
    const [loading, setLoading] = useState(true)
    const [isFavorite, setIsFavorite] = useState(false)
    const [favoriteLoading, setFavoriteLoading] = useState(false)

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true)
            try {
                // En una implementación real, obtendríamos la película por ID
                const movies = await getMovies()
                const foundMovie = movies.find((m) => m.id.toString() === id)

                if (foundMovie) {
                    setMovie(foundMovie)

                    // Simulamos datos del reparto
                    setCast([
                        {
                            id: 1,
                            name: "Actor 1",
                            character_name: "Personaje 1",
                            photo_url: "https://image.tmdb.org/t/p/w185/rLSUjr725ez1cK7SKVxC9udO03Y.jpg",
                        },
                        {
                            id: 2,
                            name: "Actor 2",
                            character_name: "Personaje 2",
                            photo_url: "https://image.tmdb.org/t/p/w185/kU3B75TyRiCgE270EyZnHjfivoq.jpg",
                        },
                        {
                            id: 3,
                            name: "Actor 3",
                            character_name: "Personaje 3",
                            photo_url: "https://image.tmdb.org/t/p/w185/euDPyqLnuwaWMHajcU3oZ9uZezR.jpg",
                        },
                        {
                            id: 4,
                            name: "Actor 4",
                            character_name: "Personaje 4",
                            photo_url: "https://image.tmdb.org/t/p/w185/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
                        },
                        {
                            id: 5,
                            name: "Actor 5",
                            character_name: "Personaje 5",
                            photo_url: "https://image.tmdb.org/t/p/w185/6lLqUmSXA9LN3dgNZXUUZdIxURm.jpg",
                        },
                    ])

                    // Verificar si la película está en favoritos
                    if (user) {
                        const favorites = await getFavoriteMovies(user.id)
                        setIsFavorite(favorites.some((f) => f.id.toString() === id))
                    }
                }
            } catch (error) {
                console.error("Error fetching movie:", error)
                toast({
                    title: "Error",
                    description: "No se pudo cargar la información de la película",
                    variant: "destructive",
                })
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchMovie()
        }
    }, [id, user, toast])

    const toggleFavorite = async () => {
        if (!user) {
            toast({
                title: "Error",
                description: "Debes iniciar sesión para añadir películas a favoritos",
                variant: "destructive",
            })
            return
        }

        setFavoriteLoading(true)

        try {
            if (isFavorite) {
                await removeFavoriteMovie(user.id, movie.id)
                setIsFavorite(false)
                toast({
                    title: "Película eliminada de favoritos",
                    description: `${movie.title} ha sido eliminada de tus favoritos`,
                })
            } else {
                await addFavoriteMovie(user.id, movie.id)
                setIsFavorite(true)
                toast({
                    title: "Película añadida a favoritos",
                    description: `${movie.title} ha sido añadida a tus favoritos`,
                })
            }
        } catch (error) {
            console.error("Error toggling favorite:", error)
            toast({
                title: "Error",
                description: "No se pudo actualizar tus favoritos",
                variant: "destructive",
            })
        } finally {
            setFavoriteLoading(false)
        }
    }

    const handleBookingSuccess = () => {
        toast({
            title: "Reserva completada",
            description: "Tu reserva ha sido completada con éxito. Puedes verla en tu dashboard.",
        })
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
            </div>
        )
    }

    if (!movie) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-black">
                <h2 className="text-2xl font-bold text-white">Película no encontrada</h2>
                <Button variant="outline" className="mt-4 border-gray-700 hover:bg-gray-800" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <MovieDetailHero movie={movie} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />

            {/* Content Section */}
            <div className="mx-auto max-w-7xl px-4 py-8">
                <Tabs defaultValue="booking" className="space-y-4">
                    <TabsList className="bg-gray-900">
                        <TabsTrigger value="booking">Reservar</TabsTrigger>
                        <TabsTrigger value="details">Detalles</TabsTrigger>
                        <TabsTrigger value="cast">Reparto</TabsTrigger>
                        <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                    </TabsList>

                    <TabsContent value="booking">
                        <MovieBooking movie={movie} onSuccess={handleBookingSuccess} />
                    </TabsContent>

                    <TabsContent value="details">
                        <Card className="bg-gray-900 border-gray-800">
                            <CardContent className="p-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-4">Información</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Director</span>
                                                <span className="text-white">{movie.director || "No disponible"}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Guionista</span>
                                                <span className="text-white">{movie.writer || "No disponible"}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Estreno</span>
                                                <span className="text-white">{new Date(movie.release_date).toLocaleDateString("es-ES")}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Duración</span>
                                                <span className="text-white">{movie.runtime} minutos</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Clasificación</span>
                                                <span className="text-white">{movie.rating_mpaa || "PG-13"}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Idioma original</span>
                                                <span className="text-white">{movie.original_language || "Inglés"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-4">Sinopsis</h3>
                                        <p className="text-gray-300">{movie.overview}</p>

                                        <h3 className="text-xl font-bold text-white mt-6 mb-4">Géneros</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {movie.genres?.split(",").map((genre, index) => (
                                                <Badge key={index} className="bg-gray-800 text-white hover:bg-gray-700">
                                                    {genre.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="cast">
                        <Card className="bg-gray-900 border-gray-800">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Reparto principal</h3>
                                <CastGallery cast={cast} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reviews">
                        <Card className="bg-gray-900 border-gray-800">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Reseñas de usuarios</h3>
                                <div className="space-y-4">
                                    {/* En una implementación real, estos datos vendrían de la base de datos */}
                                    {[1, 2, 3].map((review) => (
                                        <div key={review} className="border-b border-gray-800 pb-4 last:border-0">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <div className="h-10 w-10 rounded-full bg-gray-800 overflow-hidden">
                                                        <img
                                                            src={`https://i.pravatar.cc/40?img=${review}`}
                                                            alt="Usuario"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="font-medium text-white">Usuario {review}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Star className="h-4 w-4 text-yellow-500" />
                                                    <span className="ml-1 text-white">{Math.floor(Math.random() * 3) + 3}/5</span>
                                                </div>
                                            </div>
                                            <p className="mt-2 text-gray-300">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
                                                tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">{new Date().toLocaleDateString("es-ES")}</p>
                                        </div>
                                    ))}
                                </div>
                                <Button className="mt-4 bg-red-500 hover:bg-red-600">Escribir una reseña</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

