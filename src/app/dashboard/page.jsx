import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Film, Ticket, Calendar, TrendingUp, Heart } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gray-900">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          <TabsTrigger value="reports">Informes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Tarjetas de resumen */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Películas Vistas</CardTitle>
                <Film className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">12</div>
                <p className="text-xs text-gray-400">+2 desde el mes pasado</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Reservas Activas</CardTitle>
                <Ticket className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">2</div>
                <p className="text-xs text-gray-400">Para los próximos 7 días</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Películas Favoritas</CardTitle>
                <Heart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">7</div>
                <p className="text-xs text-gray-400">+3 desde el mes pasado</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Próximos Estrenos</CardTitle>
                <Calendar className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">24</div>
                <p className="text-xs text-gray-400">En los próximos 30 días</p>
              </CardContent>
            </Card>
          </div>

          {/* Próximas reservas */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Mis Próximas Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Dune: Part Two",
                      date: "Hoy - 20:30",
                      seats: "F12, F13",
                      image: "/placeholder.svg?height=60&width=120",
                    },
                    {
                      title: "Deadpool & Wolverine",
                      date: "Mañana - 18:15",
                      seats: "D5, D6",
                      image: "/placeholder.svg?height=60&width=120",
                    },
                  ].map((reservation, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-lg border border-gray-800 p-3">
                      <img
                        src={reservation.image || "/placeholder.svg"}
                        alt={reservation.title}
                        className="h-16 w-16 rounded object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{reservation.title}</h4>
                        <div className="text-sm text-gray-400">{reservation.date}</div>
                        <div className="text-sm text-gray-400">Asientos: {reservation.seats}</div>
                      </div>
                      <a
                        href="#"
                        className="ml-auto rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
                      >
                        Ver Ticket
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3 bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Películas Recomendadas</CardTitle>
                <CardDescription>Basado en tus gustos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "The Batman",
                      genre: "Acción, Drama",
                      rating: "8.5/10",
                      image: "/placeholder.svg?height=60&width=120",
                    },
                    {
                      title: "Oppenheimer",
                      genre: "Drama, Historia",
                      rating: "9.0/10",
                      image: "/placeholder.svg?height=60&width=120",
                    },
                    {
                      title: "Gladiator II",
                      genre: "Acción, Drama",
                      rating: "8.8/10",
                      image: "/placeholder.svg?height=60&width=120",
                    },
                  ].map((movie, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-lg border border-gray-800 p-3">
                      <img
                        src={movie.image || "/placeholder.svg"}
                        alt={movie.title}
                        className="h-16 w-16 rounded object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{movie.title}</h4>
                        <div className="text-sm text-gray-400">{movie.genre}</div>
                        <div className="text-sm text-gray-400">{movie.rating}</div>
                      </div>
                      <a
                        href="#"
                        className="ml-auto rounded-md bg-gray-800 px-3 py-1 text-xs font-medium text-white hover:bg-gray-700"
                      >
                        Reservar
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Análisis de Visualización</CardTitle>
              <CardDescription>Tus géneros y películas más vistos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-800 rounded-lg">
                <p className="text-gray-400">Gráfico de análisis (simulado)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Historial de Actividad</CardTitle>
              <CardDescription>Tu actividad reciente en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Reserva completada",
                    details: "Dune: Part Two - 2 entradas",
                    date: "Hoy, 14:30",
                  },
                  {
                    action: "Película añadida a favoritos",
                    details: "The Batman",
                    date: "Ayer, 20:15",
                  },
                  {
                    action: "Valoración enviada",
                    details: "Oppenheimer - 5 estrellas",
                    date: "Hace 2 días",
                  },
                  {
                    action: "Reserva completada",
                    details: "Deadpool & Wolverine - 2 entradas",
                    date: "Hace 3 días",
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-lg border border-gray-800 p-3">
                    <div className="rounded-full bg-gray-800 p-2">
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{activity.action}</h4>
                      <div className="text-sm text-gray-400">{activity.details}</div>
                      <div className="text-xs text-gray-500">{activity.date}</div>
                    </div>
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

