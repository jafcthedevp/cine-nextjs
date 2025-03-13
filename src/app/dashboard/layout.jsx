"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/services/auth-provider"
import { DashboardSidebar } from "./components/dashboard-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Proteger la ruta - redirigir si no está autenticado
  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return null // No renderizar nada mientras redirige
  }

  return (
    <div className="min-h-screen bg-black">
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <div className="flex flex-col">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

