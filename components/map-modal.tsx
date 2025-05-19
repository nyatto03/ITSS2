"use client"

import { useState } from "react"
import { X, Plus, Minus, Navigation, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

type MapModalProps = {
  isOpen: boolean
  onClose: () => void
  restaurantName: string
  restaurantAddress?: string
}

export default function MapModal({
  isOpen,
  onClose,
  restaurantName,
  restaurantAddress = "123 Food Street, Foodville",
}: MapModalProps) {
  const [zoom, setZoom] = useState(14)

  if (!isOpen) return null

  const handleZoomIn = () => {
    if (zoom < 20) setZoom(zoom + 1)
  }

  const handleZoomOut = () => {
    if (zoom > 10) setZoom(zoom - 1)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg">Directions to {restaurantName}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative flex-1 min-h-[400px] bg-gray-100">
          {/* Mock Map */}
          <div
            className="absolute inset-0 bg-blue-50"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23bbd6e8' fillOpacity='0.4' fillRule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: `${zoom * 10}px`,
            }}
          >
            {/* Mock Streets */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300"></div>
              <div className="absolute top-0 bottom-0 left-1/4 w-2 bg-gray-300"></div>
              <div className="absolute top-0 bottom-0 left-3/4 w-2 bg-gray-300"></div>
              <div className="absolute top-1/4 left-0 right-0 h-2 bg-gray-300"></div>
              <div className="absolute top-3/4 left-0 right-0 h-2 bg-gray-300"></div>
            </div>

            {/* User Location */}
            <div className="absolute left-1/4 top-3/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -top-1 -left-1 w-6 h-6 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
                <div className="relative z-10 bg-blue-500 text-white rounded-full p-2">
                  <Navigation className="h-4 w-4" />
                </div>
                <div className="mt-1 bg-white px-2 py-1 rounded text-xs font-semibold shadow-md">You</div>
              </div>
            </div>

            {/* Restaurant Location */}
            <div className="absolute left-3/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <MapPin className="h-8 w-8 text-red-500" />
                <div className="mt-1 bg-white px-2 py-1 rounded text-xs font-semibold shadow-md">{restaurantName}</div>
              </div>
            </div>

            {/* Route Line */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
              <path d="M25,75 C25,50 75,50 75,25" stroke="#3b82f6" strokeWidth="4" fill="none" strokeDasharray="8 4" />
            </svg>

            {/* Distance Indicator */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium">
              1.2 miles • 8 min
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button variant="secondary" size="icon" onClick={handleZoomIn} className="rounded-full shadow-md">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={handleZoomOut} className="rounded-full shadow-md">
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 border-t">
          <div className="mb-4">
            <h3 className="font-semibold">{restaurantName}</h3>
            <p className="text-sm text-gray-500">{restaurantAddress}</p>
          </div>
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Start Navigation</Button>
        </div>
      </div>
    </div>
  )
}
