"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Star, Send } from "lucide-react"
import ReviewCard from "@/components/review-card"

type Review = {
  id: number
  userName: string
  rating: number
  date: string
  comment: string
}

type Dish = {
  id: number
  name: string
  restaurant: string
  image: string
  rating: number
  reviews: number
}

export default function ReviewsPageContent({
  dish,
  reviews,
}: {
  dish: Dish
  reviews: Review[]
}) {
  const router = useRouter()
  const [newReview, setNewReview] = useState("")
  const [userRating, setUserRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleBack = () => {
    router.back()
  }

  const handleSubmitReview = () => {
    if (newReview.trim() === "" || userRating === 0) {
      alert("Please enter a review and select a rating")
      return
    }

    // In a real app, this would send the review to a server
    alert(`Review submitted: ${userRating} stars - ${newReview}`)

    // Reset form
    setNewReview("")
    setUserRating(0)
  }

  // Generate star rating input
  const renderStarInput = () => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setUserRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none"
          >
            <Star
              className={`h-8 w-8 ${
                (hoveredRating || userRating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  // Calculate average rating
  const averageRating =
    reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white p-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{dish.name}</h1>
            <p className="text-sm text-gray-500">{dish.restaurant}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="flex items-center mb-4">
          <div className="relative h-16 w-16 rounded-lg overflow-hidden mr-4">
            <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-2">{averageRating.toFixed(1)}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : i < Math.ceil(averageRating) && i >= Math.floor(averageRating)
                          ? "fill-yellow-400 text-yellow-400 opacity-50"
                          : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500">{reviews.length} reviews</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="font-bold mb-2">Write a Review</h2>
          <div className="mb-3">{renderStarInput()}</div>
          <Textarea
            placeholder="Share your experience with this dish..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="mb-3"
            rows={3}
          />
          <Button onClick={handleSubmitReview} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Send className="h-4 w-4 mr-2" />
            Submit Review
          </Button>
        </div>

        <h2 className="font-bold text-lg mb-4">All Reviews</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </main>
    </div>
  )
}
