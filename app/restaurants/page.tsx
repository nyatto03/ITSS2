"use client"

import { useSearchParams } from "next/navigation"
import RestaurantList from "@/components/restaurant-list"

export default function RestaurantsPage() {
  const searchParams = useSearchParams()
  const timeRange = searchParams.get("timeRange") || "12:00 — 13:00"

  return <RestaurantList timeRange={timeRange} />
}
