"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [startTime, setStartTime] = useState("12:00")
  const [endTime, setEndTime] = useState("13:00")

  const handleFindRestaurants = () => {
    const encodedTimeRange = encodeURIComponent(`${startTime} — ${endTime}`)
    router.push(`/restaurants?timeRange=${encodedTimeRange}`)
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div
        className="w-full max-w-md px-6 py-12 flex flex-col items-center justify-center flex-1"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=800')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundOpacity: 0.1,
        }}
      >
        <div className="w-full max-w-xs flex flex-col items-center space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">EatSmart</h1>
            <p className="text-lg">
              Find food that fits
              <br />
              your schedule
            </p>
          </div>

          <div className="w-full space-y-4 mt-8">
            <div className="relative">
              <label htmlFor="startTime" className="block text-sm font-medium mb-1">
                Start time
              </label>
              <div className="relative">
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="pr-10 text-right"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="endTime" className="block text-sm font-medium mb-1">
                End time
              </label>
              <div className="relative">
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="pr-10 text-right"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <Button
              onClick={handleFindRestaurants}
              className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Find Restaurants
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
