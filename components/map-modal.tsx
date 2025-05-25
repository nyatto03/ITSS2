"use client"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

type MapModalProps = {
  isOpen: boolean
  onClose: () => void
  restaurantName: string
  restaurantAddress?: string
  restaurantLat?: number // truyền kinh độ vĩ độ của nhà hàng lên
  restaurantLng?: number
}

export default function MapModal({
  isOpen,
  onClose,
  restaurantName,
  restaurantAddress = "123 Food Street, Foodville",
  restaurantLat = 20.9992396,
  restaurantLng = 105.8174867,
}: MapModalProps) {
  const [origin, setOrigin] = useState<{ lat: number; lng: number } | null>(null)
  const [tracking, setTracking] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isOpen) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      },
      (err) => {
        console.error("Error getting location", err)
        setOrigin({ lat: 21.0215663, lng: 105.8471009 })
      }
    )
  }, [isOpen])

  useEffect(() => {
    if (tracking) {
      intervalRef.current = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setOrigin({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            })
          },
          (err) => console.error("Error updating location", err)
        )
      }, 3000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [tracking])

  if (!isOpen || !origin) return null

  const googleMapsSrc = `https://www.google.com/maps/embed/v1/directions?origin=${origin.lat},${origin.lng}&destination=${restaurantLat},${restaurantLng}&key=AIzaSyC-5CY9mOCeg5Y3IhPqi_Yd0-DZtWrJl-E&avoid=tolls|highways&mode=walking`
  console.log(googleMapsSrc)
  return (    
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl h-[90vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg">Directions to {restaurantName}</h2>
          <Button variant="ghost" size="icon" onClick={() => {onClose(); setTracking(false)}}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Google Map */}
        <div className="flex-1">
          <iframe
            key={googleMapsSrc} // Bắt buộc render lại khi src thay đổi
            src={googleMapsSrc}
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="border-0 w-full h-full"
          ></iframe>
        </div>

        <div className="p-4 border-t">
          <div className="mb-4">
            <h3 className="font-semibold">{restaurantName}</h3>
            <p className="text-sm text-gray-500">{restaurantAddress}</p>
          </div>
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => setTracking(true)}
            disabled={tracking}
          >
            {tracking ? "Navigating..." : "Start Navigation"}
          </Button>
        </div>
      </div>
    </div>
  )
}
