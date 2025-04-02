"use client"

import { useAuth } from "@/services/auth-provider"
import { usePathname } from "next/navigation"
import { Film, Home, Ticket, Heart, Settings, LogOut, User, Calendar } from "lucide-react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import UserAvatar from "@/components/user-avatar"

export function DashboardSidebar() {
  const { user, signOut } = useAuth()
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
      isActive: pathname === "/dashboard",
    },
    {
      title: "Mis Reservas",
      icon: Ticket,
      href: "/dashboard/reservas",
      isActive: pathname === "/dashboard/reservas",
    },
    {
      title: "Próximos Estrenos",
      icon: Calendar,
      href: "/dashboard/estrenos",
      isActive: pathname === "/dashboard/estrenos",
    },
    {
      title: "Favoritos",
      icon: Heart,
      href: "/dashboard/favoritos",
      isActive: pathname === "/dashboard/favoritos",
    },
    {
      title: "Perfil",
      icon: User,
      href: "/dashboard/perfil",
      isActive: pathname === "/dashboard/perfil",
    },
    //{
    //  title: "Configuración",
    //  icon: Settings,
    //  href: "/dashboard/configuracion",
    //  isActive: pathname === "/dashboard/configuracion",
    //},
  ]

  return (
      <Sidebar>
        <SidebarHeader className="flex items-center p-4">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-red-500" />
            <span className="text-lg font-bold text-white">CineMax</span>
          </div>
          <SidebarTrigger className="ml-auto md:hidden" />
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex items-center gap-3 rounded-lg border border-gray-800 p-3 bg-gray-900/50">
            <UserAvatar user={user} size="md" />
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-white truncate">{user?.user_metadata?.name || user?.email}</span>
              <span className="text-xs text-gray-400 truncate">{user?.email}</span>
            </div>
            <button
                onClick={signOut}
                className="ml-auto rounded-full p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
                aria-label="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>
  )
}

