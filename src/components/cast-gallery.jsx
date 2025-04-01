import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function CastGallery({ cast }) {
    if (!cast || cast.length === 0) {
        return <div className="text-center py-8 text-gray-400">No hay información del reparto disponible.</div>
    }

    return (
        <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 pb-4">
                {cast.map((actor) => (
                    <div key={actor.id} className="w-[150px] shrink-0">
                        <div className="overflow-hidden rounded-md">
                            <img
                                src={actor.photo_url || "/placeholder.svg?height=225&width=150"}
                                alt={actor.name}
                                className="h-[225px] w-[150px] object-cover transition-transform hover:scale-105"
                            />
                        </div>
                        <div className="mt-2">
                            <h4 className="font-medium text-white truncate">{actor.name}</h4>
                            <p className="text-sm text-gray-400 truncate">{actor.character_name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

