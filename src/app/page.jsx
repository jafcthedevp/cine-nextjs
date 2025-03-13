import { Button } from "@/components/ui/button"
import { Film, Popcorn, Ticket } from "lucide-react"
import UserProfile from "@/components/user-profile"

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className="border-b border-gray-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold text-white">CineMax</span>
          </div>
          <UserProfile />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div
          className="h-[600px] w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=600&width=1920')",
          }}
        >
          <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">Experience the Magic of Cinema</h1>
            <p className="mb-8 max-w-2xl text-lg text-gray-300">
              Discover the latest blockbusters and timeless classics in our state-of-the-art theaters.
            </p>
            <Button size="lg" className="bg-red-500 text-white hover:bg-red-600">
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-800 p-6 text-center">
              <Ticket className="mx-auto mb-4 h-12 w-12 text-red-500" />
              <h3 className="mb-2 text-xl font-semibold text-white">Online Booking</h3>
              <p className="text-gray-400">Reserve your seats in advance with our easy booking system</p>
            </div>
            <div className="rounded-lg border border-gray-800 p-6 text-center">
              <Popcorn className="mx-auto mb-4 h-12 w-12 text-red-500" />
              <h3 className="mb-2 text-xl font-semibold text-white">Snack Bar</h3>
              <p className="text-gray-400">Enjoy fresh popcorn and refreshments during your movie</p>
            </div>
            <div className="rounded-lg border border-gray-800 p-6 text-center">
              <Film className="mx-auto mb-4 h-12 w-12 text-red-500" />
              <h3 className="mb-2 text-xl font-semibold text-white">Premium Screens</h3>
              <p className="text-gray-400">Experience movies in stunning 4K with Dolby Atmos sound</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

