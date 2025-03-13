import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ticket, Calendar, Clock } from "lucide-react"

export default function ReservasPage() {
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
                title: "Dune: Part Two",
                date: "Hoy - 20:30",
                cinema: "CineMax Centro",
                seats: "F12, F13",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                title: "Deadpool & Wolverine",
                date: "Mañana - 18:15",
                cinema: "CineMax Norte",
                seats: "D5, D6",
                image: "/placeholder.svg?height=200&width=300",
              },
            ].map((reservation, i) => (
              <Card key={i} className="overflow-hidden bg-gray-900 border-gray-800">
                <div className="aspect-video w-full">
                  <img
                    src={reservation.image || "/placeholder.svg"}
                    alt={reservation.title}
                    className="h-full w-full object-cover"
                  />
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
                    title: "Oppenheimer",
                    date: "15 de marzo, 2024 - 19:00",
                    cinema: "CineMax Centro",
                    seats: "H8, H9",
                    image: "/placeholder.svg?height=60&width=120",
                  },
                  {
                    title: "The Batman",
                    date: "2 de marzo, 2024 - 21:30",
                    cinema: "CineMax Sur",
                    seats: "C12",
                    image: "/placeholder.svg?height=60&width=120",
                  },
                  {
                    title: "Gladiator II",
                    date: "25 de febrero, 2024 - 18:45",
                    cinema: "CineMax Norte",
                    seats: "E7, E8, E9",
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

