"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, MapPin, Star, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import RestaurantCard from "@/components/restaurant-card"

// Sample data for the restaurants
const restaurants = [
  {
    id: 1,
    name: "Bella Italia",
    dish: "Spicy Ramen",
    image: "/placeholder.svg?height=100&width=100",
    timeToEat: 30,
  },
  {
    id: 2,
    name: "Green Leaf",
    dish: "Chicken Salad",
    image: "/placeholder.svg?height=100&width=100",
    timeToEat: 30,
  },
  {
    id: 3,
    name: "Dragon Wok",
    dish: "Margherita Pizza",
    image: "/placeholder.svg?height=100&width=100",
    timeToEat: 30,
  },
]

type FilterOption = "nearby" | "popular" | "rating"

export default function RestaurantList({ timeRange }: { timeRange: string }) {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<FilterOption>("nearby")

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white p-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">
            Top Picks for
            <br />
            {timeRange}
          </h1>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className={cn("rounded-full", activeFilter === "nearby" && "bg-gray-100")}
            onClick={() => setActiveFilter("nearby")}
          >
            <MapPin className="h-4 w-4 mr-1" />
            Nearby
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn("rounded-full", activeFilter === "popular" && "bg-gray-100")}
            onClick={() => setActiveFilter("popular")}
          >
            <Zap className="h-4 w-4 mr-1" />
            Popular
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn("rounded-full", activeFilter === "rating" && "bg-gray-100")}
            onClick={() => setActiveFilter("rating")}
          >
            <Star className="h-4 w-4 mr-1" />
            Rating
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="space-y-4">
          {restaurants.map((restaurant) => (
            <Link href={`/dish/${restaurant.id}`} key={restaurant.id}>
              <RestaurantCard restaurant={restaurant} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
