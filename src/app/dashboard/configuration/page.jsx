"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Bell, Mail, CreditCard, Languages, Moon, Sun, LogOut } from 'lucide-react'
import { useAuth } from "@/components/auth-provider"

export default function ConfiguracionPage() {
  const { toast } = useToast()
  const { signOut } = useAuth()
  
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    marketing: false,
    newReleases: true,
    promotions: false,
  })

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "04/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "5555",
      expiry: "08/26",
      isDefault: false,
    },
  ])

  const [preferences, setPreferences] = useState({
    language: "es",
    theme: "dark",
    subtitles: true,
    autoplay: true,
  })

  const handleNotificationChange = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    })
  }

  const setDefaultPaymentMethod = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    )
  }

  const removePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  const handlePreferenceChange = (key, value) => {
    setPreferences({
      ...preferences,
      [key]: value,
    })
  }

  const saveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias han sido actualizadas correctamente",
    })
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Configuración</h2>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-gray-900">
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="payment">Métodos de pago</TabsTrigger>
          <TabsTrigger value="preferences">Preferencias</TabsTrigger>
          <TabsTrigger value="account">Cuenta</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Notificaciones</CardTitle>
              <CardDescription>
                Configura cómo quieres recibir notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Canales de notificación</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <Label htmlFor="email-notifications" className="text-white">Correo electrónico</Label>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.email}
                    onCheckedChange={() => handleNotificationChange("email")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-gray-400" />
                    <Label htmlFor="push-notifications" className="text-white">Notificaciones push</Label>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notificationSettings.push}
                    onCheckedChange={() => handleNotificationChange("push")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <Label htmlFor="marketing-emails" className="text-white">Correos de marketing</Label>
                  </div>
                  <Switch
                    id="marketing-emails"
                    checked={notificationSettings.marketing}
                    onCheckedChange={() => handleNotificationChange("marketing")}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Tipos de notificaciones</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-releases" className="text-white">Nuevos estrenos</Label>
                  <Switch
                    id="new-releases"
                    checked={notificationSettings.newReleases}
                    onCheckedChange={() => handleNotificationChange("newReleases")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="promotions" className="text-white">Promociones y descuentos</Label>
                  <Switch
                    id="promotions"
                    checked={notificationSettings.promotions}
                    onCheckedChange={() => handleNotificationChange("promotions")}
                  />
                </div>
              </div>

              <Button className="bg-red-500 hover:bg-red-600" onClick={saveSettings}>
                Guardar preferencias
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Métodos de pago</CardTitle>
              <CardDescription>
                Administra tus métodos de pago para reservas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Tarjetas guardadas</h3>
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border border-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">{method.type} •••• {method.last4}</p>
                        <p className="text-sm text-gray-400">Expira: {method.expiry}</p>
                      </div>
                      {method.isDefault && (
                        <span className="px-2 py-1 text-xs bg-red-500/20 text-red-500 rounded-full">
                          Predeterminada
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {!method.isDefault && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-700 hover:bg-gray-800"
                          onClick={() => setDefaultPaymentMethod(method.id)}
                        >
                          Establecer como predeterminada
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-400 hover:bg-gray-800"
                        onClick={() => removePaymentMethod(method.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="bg-red-500 hover:bg-red-600">
                Añadir nuevo método de pago
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Preferencias</CardTitle>
              <CardDescription>
                Personaliza tu experiencia en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Idioma</h3>
                <RadioGroup 
                  value={preferences.language}
                  onValueChange={(value) => handlePreferenceChange("language", value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="es" id="es" />
                    <Label htmlFor="es" className="text-white">Español</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="en" id="en" />
                    <Label htmlFor="en" className="text-white">English</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fr" id="fr" />
                    <Label htmlFor="fr" className="text-white">Français</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Tema</h3>
                <div className="flex items-center space-x-4">
                  <Button
                    variant={preferences.theme === "dark" ? "default" : "outline"}
                    className={preferences.theme === "dark" 
                      ? "bg-red-500 hover:bg-red-600" 
                      : "border-gray-700 hover:bg-gray-800"}
                    onClick={() => handlePreferenceChange("theme", "dark")}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Oscuro
                  </Button>
                  <Button
                    variant={preferences.theme === "light" ? "default" : "outline"}
                    className={preferences.theme === "light" 
                      ? "bg-red-500 hover:bg-red-600" 
                      : "border-gray-700 hover:bg-gray-800"}
                    onClick={() => handlePreferenceChange("theme", "light")}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Claro
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Reproducción</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="subtitles" className="text-white">Subtítulos por defecto</Label>
                  <Switch
                    id="subtitles"
                    checked={preferences.subtitles}
                    onCheckedChange={(checked) => handlePreferenceChange("subtitles", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoplay" className="text-white">Reproducción automática de trailers</Label>
                  <Switch
                    id="autoplay"
                    checked={preferences.autoplay}
                    onCheckedChange={(checked) => handlePreferenceChange("autoplay", checked)}
                  />
                </div>
              </div>

              <Button className="bg-red-500 hover:bg-red-600" onClick={saveSettings}>
                Guardar preferencias
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Cuenta</CardTitle>
              <CardDescription>
                Administra tu cuenta y sesión
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Acciones de cuenta</h3>
                <div className="grid gap-4">
                  <Button 
                    variant="outline" 
                    className="border-gray-700 hover:bg-gray-800 justify-start"
                    onClick={() => window.location.href = "/dashboard/perfil"}
                  >
                    <span className="mr-2">👤</span>
                    Editar perfil
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-gray-700 hover:bg-gray-800 justify-start"
                  >
                    <span className="mr-2">📥</span>
                    Descargar mis datos
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-red-900 text-red-500 hover:bg-red-900/20 justify-start"
                  >
                    <span className="mr-2">⚠️</span>
                    Eliminar mi cuenta
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Sesión</h3>
                <Button 
                  variant="default" 
                  className="w-full bg-red-500 hover:bg-red-600"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

