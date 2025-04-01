"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/services/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { getPastReservations, getFavoriteMovies } from "@/supabase/supabase-service"

// Importamos la biblioteca de gráficos
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'

export default function AnalyticsCharts() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [genreData, setGenreData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [timeData, setTimeData] = useState([])
  
  // Colores para los gráficos
  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6', '#ec4899']
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return
      
      setLoading(true)
      
      try {
        // Obtener datos de reservas pasadas y películas favoritas
        const [pastReservations, favorites] = await Promise.all([
          getPastReservations(user.id),
          getFavoriteMovies(user.id)
        ])
        
        // Procesar datos para el gráfico de géneros
        const genreCounts = {}
        
        // Contar géneros de películas vistas
        pastReservations.forEach(reservation => {
          const movie = reservation.movies
          if (movie && movie.genres) {
            movie.genres.split(',').forEach(genre => {
              const genreTrimmed = genre.trim()
              genreCounts[genreTrimmed] = (genreCounts[genreTrimmed] || 0) + 1
            })
          }
        })
        
        // Contar géneros de películas favoritas
        favorites.forEach(movie => {
          if (movie && movie.genres) {
            movie.genres.split(',').forEach(genre => {
              const genreTrimmed = genre.trim()
              genreCounts[genreTrimmed] = (genreCounts[genreTrimmed] || 0) + 1
            })
          }
        })
        
        // Convertir a formato para el gráfico
        const genreChartData = Object.entries(genreCounts)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 7) // Tomar los 7 géneros más populares
        
        setGenreData(genreChartData)
        
        const monthlyReservations = {}
        const now = new Date()
        
        for (let i = 5; i >= 0; i--) {
          const month = new Date(now.getFullYear(), now.getMonth() - i, 1)
          const monthKey = month.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })
          monthlyReservations[monthKey] = 0
        }
        
        pastReservations.forEach(reservation => {
          const reservationDate = new Date(reservation.date)
          const monthKey = reservationDate.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })
          
          if (monthlyReservations[monthKey] !== undefined) {
            monthlyReservations[monthKey]++
          }
        })
        
        const monthlyChartData = Object.entries(monthlyReservations)
          .map(([name, value]) => ({ name, value }))
        
        setMonthlyData(monthlyChartData)
        
        const timeCounts = {
          'Mañana (10-14h)': 0,
          'Tarde (14-18h)': 0,
          'Noche (18-22h)': 0,
          'Madrugada (22-02h)': 0
        }
        
        pastReservations.forEach(reservation => {
          const reservationDate = new Date(reservation.date)
          const hour = reservationDate.getHours()
          
          if (hour >= 10 && hour < 14) {
            timeCounts['Mañana (10-14h)']++
          } else if (hour >= 14 && hour < 18) {
            timeCounts['Tarde (14-18h)']++
          } else if (hour >= 18 && hour < 22) {
            timeCounts['Noche (18-22h)']++
          } else {
            timeCounts['Madrugada (22-02h)']++
          }
        })
        
        const timeChartData = Object.entries(timeCounts)
          .map(([name, value]) => ({ name, value }))
        
        setTimeData(timeChartData)
        
      } catch (error) {
        console.error("Error fetching analytics data:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos de análisis",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [user, toast])
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
      </div>
    )
  }
  
  return (
    <Tabs defaultValue="genres" className="space-y-4">
      <TabsList className="bg-gray-900">
        <TabsTrigger value="genres">Géneros</TabsTrigger>
        <TabsTrigger value="monthly">Mensual</TabsTrigger>
        <TabsTrigger value="time">Horarios</TabsTrigger>
      </TabsList>
      
      <TabsContent value="genres">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Distribución por géneros</CardTitle>
            <CardDescription>
              Análisis de tus géneros favoritos basado en tus películas vistas y favoritas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              {genreData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genreData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {genreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} películas`, 'Cantidad']}
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                      itemStyle={{ color: '#f3f4f6' }}
                    />
                    <Legend 
                      formatter={(value) => <span style={{ color: '#f3f4f6' }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-400">No hay suficientes datos para mostrar el gráfico</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="monthly">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Actividad mensual</CardTitle>
            <CardDescription>
              Número de películas vistas por mes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#f3f4f6' }}
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis tick={{ fill: '#f3f4f6' }} />
                    <Tooltip 
                      formatter={(value) => [`${value} películas`, 'Vistas']}
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                      itemStyle={{ color: '#f3f4f6' }}
                    />
                    <Legend 
                      formatter={(value) => <span style={{ color: '#f3f4f6' }}>{value}</span>}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      name="Películas vistas"
                      stroke="#ef4444" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-400">No hay suficientes datos para mostrar el gráfico</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="time">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Preferencia de horarios</CardTitle>
            <CardDescription>
              Distribución de tus visitas al cine por franjas horarias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              {timeData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" tick={{ fill: '#f3f4f6' }} />
                    <YAxis tick={{ fill: '#f3f4f6' }} />
                    <Tooltip 
                      formatter={(value) => [`${value} visitas`, 'Cantidad']}
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                      itemStyle={{ color: '#f3f4f6' }}
                    />
                    <Legend 
                      formatter={(value) => <span style={{ color: '#f3f4f6' }}>{value}</span>}
                    />
                    <Bar 
                      dataKey="value" 
                      name="Visitas" 
                      fill="#ef4444" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-400">No hay suficientes datos para mostrar el gráfico</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

