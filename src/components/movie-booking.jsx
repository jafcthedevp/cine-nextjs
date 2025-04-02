"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/services/auth-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createReservation } from "@/supabase/supabase-service"

export default function MovieBooking({ movie, onSuccess }) {
    const { user } = useAuth()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [selectedCinema, setSelectedCinema] = useState("")
    const [selectedSeats, setSelectedSeats] = useState([])
    const [availableDates, setAvailableDates] = useState([])
    const [availableTimes, setAvailableTimes] = useState([])
    const [availableCinemas, setAvailableCinemas] = useState([])
    const [seatMap, setSeatMap] = useState([])

    // Precio por asiento
    const SEAT_PRICE = 12.99

    // Generar fechas disponibles (próximos 7 días)
    useEffect(() => {
        const dates = []
        const now = new Date()

        for (let i = 0; i < 7; i++) {
            const date = new Date(now)
            date.setDate(now.getDate() + i)
            dates.push({
                value: date.toISOString().split('T')[0],
                label: date.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                })
            })
        }

        setAvailableDates(dates)
        if (dates.length > 0) {
            setSelectedDate(dates[0].value)
        }
    }, [])

    // Generar horarios disponibles
    useEffect(() => {
        if (selectedDate) {
            // En una implementación real, estos horarios vendrían de la base de datos
            const times = [
                { value: "14:30", label: "14:30" },
                { value: "17:00", label: "17:00" },
                { value: "19:30", label: "19:30" },
                { value: "22:00", label: "22:00" },
            ]

            setAvailableTimes(times)
            if (times.length > 0) {
                setSelectedTime(times[0].value)
            }
        }
    }, [selectedDate])

    // Generar cines disponibles
    useEffect(() => {
        if (selectedDate && selectedTime) {
            // En una implementación real, estos cines vendrían de la base de datos
            const cinemas = [
                { value: "CineMax Centro", label: "CineMax Centro" },
                { value: "CineMax Norte", label: "CineMax Norte" },
                { value: "CineMax Sur", label: "CineMax Sur" },
            ]

            setAvailableCinemas(cinemas)
            if (cinemas.length > 0) {
                setSelectedCinema(cinemas[0].value)
            }
        }
    }, [selectedDate, selectedTime])

    // Generar mapa de asientos
    useEffect(() => {
        if (selectedDate && selectedTime && selectedCinema) {
            // En una implementación real, la disponibilidad de asientos vendría de la base de datos
            const rows = 8
            const seatsPerRow = 10
            const map = []

            for (let row = 0; row < rows; row++) {
                const rowSeats = []
                const rowLabel = String.fromCharCode(65 + row) // A, B, C, ...

                for (let seat = 1; seat <= seatsPerRow; seat++) {
                    // Simulamos algunos asientos ocupados aleatoriamente
                    const isOccupied = Math.random() < 0.3
                    rowSeats.push({
                        id: `${rowLabel}${seat}`,
                        row: rowLabel,
                        number: seat,
                        isOccupied,
                    })
                }

                map.push(rowSeats)
            }

            setSeatMap(map)
            setSelectedSeats([])
        }
    }, [selectedDate, selectedTime, selectedCinema])

    const toggleSeatSelection = (seat) => {
        if (seat.isOccupied) return

        setSelectedSeats(prev => {
            const seatIndex = prev.findIndex(s => s.id === seat.id)

            if (seatIndex >= 0) {
                // Deseleccionar asiento
                return prev.filter(s => s.id !== seat.id)
            } else {
                // Seleccionar asiento
                return [...prev, seat]
            }
        })
    }

    const getTotalPrice = () => {
        return selectedSeats.length * SEAT_PRICE
    }

    const handleBooking = async () => {
        if (!user) {
            toast({
                title: "Error",
                description: "Debes iniciar sesión para reservar entradas",
                variant: "destructive",
            })
            return
        }

        if (selectedSeats.length === 0) {
            toast({
                title: "Error",
                description: "Debes seleccionar al menos un asiento",
                variant: "destructive",
            })
            return
        }

        setLoading(true)

        try {
            const reservation = {
                user_id: user.id,
                movie_id: movie.id,
                cinema: selectedCinema,
                date: `${selectedDate}T${selectedTime}:00`,
                seats: selectedSeats.map(seat => seat.id).join(", "),
                amount: getTotalPrice(),
            }

            const result = await createReservation(reservation)

            if (result) {
                toast({
                    title: "Reserva completada",
                    description: "Tu reserva ha sido completada con éxito",
                })

                if (onSuccess) {
                    onSuccess(result)
                }
            } else {
                throw new Error("No se pudo completar la reserva")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "No se pudo completar la reserva",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-white">Reservar entradas para {movie.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="date">Fecha</Label>
                        <Select value={selectedDate} onValueChange={setSelectedDate}>
                            <SelectTrigger id="date" className="bg-gray-800 border-gray-700">
                                <SelectValue placeholder="Selecciona una fecha" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                                {availableDates.map(date => (
                                    <SelectItem key={date.value} value={date.value}>
                                        {date.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="time">Hora</Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                            <SelectTrigger id="time" className="bg-gray-800 border-gray-700">
                                <SelectValue placeholder="Selecciona una hora" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                                {availableTimes.map(time => (
                                    <SelectItem key={time.value} value={time.value}>
                                        {time.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cinema">Cine</Label>
                        <Select value={selectedCinema} onValueChange={setSelectedCinema}>
                            <SelectTrigger id="cinema" className="bg-gray-800 border-gray-700">
                                <SelectValue placeholder="Selecciona un cine" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                                {availableCinemas.map(cinema => (
                                    <SelectItem key={cinema.value} value={cinema.value}>
                                        {cinema.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {seatMap.length > 0 && (
                    <div className="space-y-4">
                        <div className="text-center">
                            <div className="w-1/2 h-2 bg-gray-700 mx-auto mb-8 rounded-lg"></div>
                            <p className="text-sm text-gray-400 mb-4">PANTALLA</p>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                            {seatMap.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex space-x-2">
                                    <div className="w-6 flex items-center justify-center text-gray-400">
                                        {row[0].row}
                                    </div>
                                    {row.map(seat => (
                                        <button
                                            key={seat.id}
                                            className={`w-8 h-8 rounded-t-lg flex items-center justify-center text-xs ${
                                                seat.isOccupied
                                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                                    : selectedSeats.some(s => s.id === seat.id)
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            }`}
                                            onClick={() => toggleSeatSelection(seat)}
                                            disabled={seat.isOccupied}
                                        >
                                            {seat.number}
                                        </button>
                                    ))}
                                    <div className="w-6 flex items-center justify-center text-gray-400">
                                        {row[0].row}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center space-x-8 mt-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-sm bg-gray-800"></div>
                                <span className="text-sm text-gray-400">Disponible</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-sm bg-red-500"></div>
                                <span className="text-sm text-gray-400">Seleccionado</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-sm bg-gray-700"></div>
                                <span className="text-sm text-gray-400">Ocupado</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Película:</span>
                        <span className="text-white font-medium">{movie.title}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Fecha y hora:</span>
                        <span className="text-white font-medium">
              {selectedDate && new Date(selectedDate).toLocaleDateString('es-ES')} {selectedTime}
            </span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Cine:</span>
                        <span className="text-white font-medium">{selectedCinema}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Asientos:</span>
                        <span className="text-white font-medium">
              {selectedSeats.length > 0
                  ? selectedSeats.map(seat => seat.id).join(", ")
                  : "Ninguno seleccionado"}
            </span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Precio por asiento:</span>
                        <span className="text-white font-medium">${SEAT_PRICE.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-4 pt-4 border-t border-gray-700">
                        <span className="text-gray-300">Total:</span>
                        <span className="text-red-500">${getTotalPrice().toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full bg-red-500 hover:bg-red-600"
                    disabled={selectedSeats.length === 0 || loading}
                    onClick={handleBooking}
                >
                    {loading ? "Procesando..." : "Completar reserva"}
                </Button>
            </CardFooter>
        </Card>
    )
}

