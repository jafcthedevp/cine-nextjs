import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserAvatar({ user, size = "md" }) {
    // Determinar el tamaño del avatar
    const sizeClasses = {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-16 w-16",
        xl: "h-24 w-24",
    }

    const sizeClass = sizeClasses[size] || sizeClasses.md

    // Obtener las iniciales del usuario para el fallback
    const getInitials = () => {
        if (!user) return "?"

        if (user.user_metadata?.name) {
            return user.user_metadata.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .substring(0, 2)
        }

        return user.email?.charAt(0).toUpperCase() || "?"
    }

    return (
        <Avatar className={sizeClass}>
            <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.name || user?.email || "Usuario"} />
            <AvatarFallback className="bg-gray-800 text-white">{getInitials()}</AvatarFallback>
        </Avatar>
    )
}

