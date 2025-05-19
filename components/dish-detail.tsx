"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Star, Map } from "lucide-react"
import Link from "next/link"
import MapModal from "./map-modal"

type RelatedDish = {
  id: number
  name: string
  image: string
}

type Dish = {
  id: number
  name: string
  restaurant: string
  image: string
  rating: number
  reviews: number
  quote: string
  relatedDishes: RelatedDish[]
}

export default function DishDetail({ dish }: { dish: Dish }) {
  const router = useRouter()
  const [isMapOpen, setIsMapOpen] = useState(false)

  const handleBack = () => {
    router.back()
  }

  const handleOpenMap = () => {
    setIsMapOpen(true)
  }

  const handleCloseMap = () => {
    setIsMapOpen(false)
  }

  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-5 w-5 text-yellow-400" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-5 w-5 text-yellow-400" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">{dish.name}</h1>
      </header>

      <main className="flex-1">
        <div className="relative w-full h-64">
          <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-cover" />
        </div>

        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-2">{dish.rating}</span>
              {renderStars(dish.rating)}
            </div>
            <Link href={`/dish/${dish.id}/reviews`} className="text-sm text-gray-500 underline">
              See all {dish.reviews} reviews
            </Link>
          </div>

          <div className="py-2">
            <blockquote className="text-xl italic">"{dish.quote}"</blockquote>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold">Other Dishes from This Restaurant</h2>
            <div className="grid grid-cols-2 gap-4">
              {dish.relatedDishes.map((relatedDish) => (
                <Link href={`/dish/${relatedDish.id}`} key={relatedDish.id}>
                  <div className="space-y-2">
                    <div className="relative h-32 w-full rounded-lg overflow-hidden">
                      <Image
                        src={relatedDish.image || "/placeholder.svg"}
                        alt={relatedDish.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="font-medium text-center">{relatedDish.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Add the fixed position directions button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3"
            onClick={handleOpenMap}
          >
            <Map className="h-5 w-5 mr-2" />
            Get Directions to {dish.restaurant}
          </Button>
        </div>
      </main>

      {/* Map Modal */}
      <MapModal isOpen={isMapOpen} onClose={handleCloseMap} restaurantName={dish.restaurant} />
    </div>
  )
}
