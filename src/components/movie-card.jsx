"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Calendar, ImageOff } from "lucide-react"
import { useState } from "react"

export default function MovieCard({ movie, onClick }) {
    const [imageError, setImageError] = useState(false)

    const handleImageError = () => {
        setImageError(true)
    }

    return (
        <Card
            className="overflow-hidden bg-gray-900 border-gray-800 transition-transform hover:scale-105 cursor-pointer"
            onClick={onClick}
        >
            <div className="relative aspect-[2/3] w-full overflow-hidden">
                {!imageError ? (
                    <img
                        src={movie.poster_url || "/placeholder.svg?height=450&width=300"}
                        alt={movie.title}
                        className="h-full w-full object-cover transition-transform hover:scale-110"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-800">
                        <div className="flex flex-col items-center text-gray-400">
                            <ImageOff className="h-10 w-10 mb-2" />
                            <span className="text-xs text-center px-2">{movie.title}</span>
                        </div>
                    </div>
                )}
                <div className="absolute top-2 right-2">
                    <Badge className="bg-red-500 hover:bg-red-600">{movie.rating_mpaa || "PG-13"}</Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-white">{movie.rating || "8.5"}/10</span>
                    </div>
                </div>
            </div>
            <CardContent className="p-4">
                <h3 className="font-bold text-white line-clamp-1">{movie.title}</h3>
                <div className="mt-2 flex items-center text-sm text-gray-400">
                    <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                    <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : "2023"}</span>
                </div>
            </CardContent>
        </Card>
    )
}

