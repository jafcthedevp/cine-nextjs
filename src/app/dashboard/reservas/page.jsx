"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ticket, Calendar, Clock, ImageOff } from "lucide-react"
import { useState } from "react"

export default function ReservasPage() {
  const [imageErrors, setImageErrors] = useState({})

  const handleImageError = (id) => {
    setImageErrors((prev) => ({
      ...prev,
      [id]: true,
    }))
  }

  return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white">Mis Reservas</h2>
        </div>

        <Tabs defaultValue="activas" className="space-y-4">
          <TabsList className="bg-gray-900">
            <TabsTrigger value="activas">Activas</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="activas" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: 1,
                  title: "Dune: Part Two",
                  date: "Hoy - 20:30",
                  cinema: "CineMax Centro",
                  seats: "F12, F13",
                  image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
                },
                {
                  id: 2,
                  title: "Deadpool & Wolverine",
                  date: "Mañana - 18:15",
                  cinema: "CineMax Norte",
                  seats: "D5, D6",
                  image: "https://image.tmdb.org/t/p/w500/kqFqzUYzZQ8L4Pa3A6UFJt9RvNG.jpg",
                },
              ].map((reservation) => (
                  <Card key={reservation.id} className="overflow-hidden bg-gray-900 border-gray-800">
                    <div className="aspect-video w-full">
                      {!imageErrors[reservation.id] ? (
                          <img
                              src={reservation.image || "/placeholder.svg?height=200&width=300"}
                              alt={reservation.title}
                              className="h-full w-full object-cover"
                              onError={() => handleImageError(reservation.id)}
                          />
                      ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-800">
                            <div className="flex flex-col items-center text-gray-400">
                              <ImageOff className="h-10 w-10 mb-2" />
                              <span className="text-sm">Imagen no disponible</span>
                            </div>
                          </div>
                      )}
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-white">{reservation.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-300">{reservation.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-300">Asientos: {reservation.seats}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-300">{reservation.cinema}</span>
                      </div>
                      <div className="pt-3 flex gap-2">
                        <a
                            href="#"
                            className="flex-1 rounded-md bg-red-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-600"
                        >
                          Ver Ticket
                        </a>
                        <a
                            href="#"
                            className="flex-1 rounded-md bg-gray-800 px-3 py-2 text-center text-sm font-medium text-white hover:bg-gray-700"
                        >
                          Cancelar
                        </a>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="historial" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Historial de Reservas</CardTitle>
                <CardDescription>Tus reservas anteriores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 3,
                      title: "Oppenheimer",
                      date: "15 de marzo, 2024 - 19:00",
                      cinema: "CineMax Centro",
                      seats: "H8, H9",
                      image: "https://image.tmdb.org/t/p/w500/ncKCQVXgk3rK4GQrLI4YaSKzGIl.jpg",
                    },
                    {
                      id: 4,
                      title: "The Batman",
                      date: "2 de marzo, 2024 - 21:30",
                      cinema: "CineMax Sur",
                      seats: "C12",
                      image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
                    },
                    {
                      id: 5,
                      title: "Gladiator II",
                      date: "25 de febrero, 2024 - 18:45",
                      cinema: "CineMax Norte",
                      seats: "E7, E8, E9",
                      image: "https://image.tmdb.org/t/p/w500/aUqxnuQZTjLXAvoJmjMVBxn5JWX.jpg",
                    },
                  ].map((reservation) => (
                      <div key={reservation.id} className="flex items-center gap-4 rounded-lg border border-gray-800 p-3">
                        {!imageErrors[reservation.id] ? (
                            <img
                                src={reservation.image || "/placeholder.svg?height=60&width=120"}
                                alt={reservation.title}
                                className="h-16 w-16 rounded object-cover"
                                onError={() => handleImageError(reservation.id)}
                            />
                        ) : (
                            <div className="h-16 w-16 rounded flex items-center justify-center bg-gray-800">
                              <ImageOff className="h-6 w-6 text-gray-500" />
                            </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-white">{reservation.title}</h4>
                          <div className="text-sm text-gray-400">{reservation.date}</div>
                          <div className="text-sm text-gray-400">
                            {reservation.cinema} - Asientos: {reservation.seats}
                          </div>
                        </div>
                        <a
                            href="#"
                            className="ml-auto rounded-md bg-gray-800 px-3 py-1 text-xs font-medium text-white hover:bg-gray-700"
                        >
                          Ver Detalles
                        </a>
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}

