import { Button } from "@/components/ui/button";
import { Film, Popcorn, Ticket } from 'lucide-react';

const HomePage = () => {

  return (
    <div>
      <div className="min-h-screen bg-black">
        <nav className="border-b border-gray-800">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold text-white">CineMax</span>
            </div>
            <div className="flex items-center space-x-4">
                   <Button className="text-white hover:text-red-500" >
                      Login
                    </Button>
                  <Button className="bg-red-500 text-white hover:bg-red-600">
                      Register
                    </Button>
            </div>
          </div>
        </nav>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div
            className="h-[600px] w-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80')",
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
    </div>
  );
};

export default HomePage;
