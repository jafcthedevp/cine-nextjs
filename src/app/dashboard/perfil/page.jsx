"use client"

import { useState } from "react"
import { useAuth } from "@/services/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import UserAvatar from "@/components/user-avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/supabase/client"

export default function PerfilPage() {
    const { user } = useAuth()
    const { toast } = useToast()

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: user?.user_metadata?.name || "",
        email: user?.email || "",
        phone: user?.user_metadata?.phone || "",
    })

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPasswordData({
            ...passwordData,
            [name]: value,
        })
    }

    const updateProfile = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    name: formData.name,
                    phone: formData.phone,
                },
            })

            if (error) throw error

            toast({
                title: "Perfil actualizado",
                description: "Tu información ha sido actualizada correctamente",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const updatePassword = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast({
                title: "Error",
                description: "Las contraseñas no coinciden",
                variant: "destructive",
            })
            setLoading(false)
            return
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: passwordData.newPassword,
            })

            if (error) throw error

            toast({
                title: "Contraseña actualizada",
                description: "Tu contraseña ha sido actualizada correctamente",
            })

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-white">Mi Perfil</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-7">
                <Card className="col-span-3 bg-gray-900 border-gray-800">
                    <CardHeader>
                        <div className="flex flex-col items-center">
                            <UserAvatar user={user} size="xl" />
                            <CardTitle className="mt-4 text-white">{formData.name || user?.email}</CardTitle>
                            <CardDescription className="text-gray-400">{user?.email}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-400">Miembro desde</span>
                                <span className="text-sm text-white">
                  {new Date(user?.created_at).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                  })}
                </span>
                            </div>
                            <Separator className="bg-gray-800" />
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-400">Películas vistas</span>
                                <span className="text-sm text-white">12</span>
                            </div>
                            <Separator className="bg-gray-800" />
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-400">Películas favoritas</span>
                                <span className="text-sm text-white">7</span>
                            </div>
                            <Separator className="bg-gray-800" />
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-400">Reservas totales</span>
                                <span className="text-sm text-white">23</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-red-500 hover:bg-red-600">Actualizar foto de perfil</Button>
                    </CardFooter>
                </Card>

                <div className="col-span-4">
                    <Tabs defaultValue="info" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-gray-900">
                            <TabsTrigger value="info">Información personal</TabsTrigger>
                            <TabsTrigger value="security">Seguridad</TabsTrigger>
                        </TabsList>
                        <TabsContent value="info">
                            <Card className="bg-gray-900 border-gray-800">
                                <CardHeader>
                                    <CardTitle className="text-white">Información personal</CardTitle>
                                    <CardDescription>Actualiza tu información personal</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={updateProfile}>
                                        <div className="grid gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Nombre completo</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-800 border-gray-700"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Correo electrónico</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    disabled
                                                    className="bg-gray-800 border-gray-700"
                                                />
                                                <p className="text-xs text-gray-400">El correo electrónico no se puede cambiar</p>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="phone">Teléfono</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-800 border-gray-700"
                                                />
                                            </div>
                                        </div>
                                        <Button type="submit" className="mt-4 bg-red-500 hover:bg-red-600" disabled={loading}>
                                            {loading ? "Guardando..." : "Guardar cambios"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="security">
                            <Card className="bg-gray-900 border-gray-800">
                                <CardHeader>
                                    <CardTitle className="text-white">Seguridad</CardTitle>
                                    <CardDescription>Actualiza tu contraseña</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={updatePassword}>
                                        <div className="grid gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="currentPassword">Contraseña actual</Label>
                                                <Input
                                                    id="currentPassword"
                                                    name="currentPassword"
                                                    type="password"
                                                    value={passwordData.currentPassword}
                                                    onChange={handlePasswordChange}
                                                    className="bg-gray-800 border-gray-700"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="newPassword">Nueva contraseña</Label>
                                                <Input
                                                    id="newPassword"
                                                    name="newPassword"
                                                    type="password"
                                                    value={passwordData.newPassword}
                                                    onChange={handlePasswordChange}
                                                    className="bg-gray-800 border-gray-700"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                                                <Input
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    type="password"
                                                    value={passwordData.confirmPassword}
                                                    onChange={handlePasswordChange}
                                                    className="bg-gray-800 border-gray-700"
                                                />
                                            </div>
                                        </div>
                                        <Button type="submit" className="mt-4 bg-red-500 hover:bg-red-600" disabled={loading}>
                                            {loading ? "Actualizando..." : "Actualizar contraseña"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

