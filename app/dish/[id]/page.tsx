"use client"

import { useRouter } from "next/navigation"
import DishDetail from "@/components/dish-detail"

// Sample data for dishes
const dishes = [
  {
    id: 1,
    name: "Spagetti Carbonara",
    restaurant: "Bella Italia",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 120,
    quote: "The sauce wa amzing!",
    relatedDishes: [
      {
        id: 101,
        name: "Cheeseburger",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 102,
        name: "Lasagna",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: 2,
    name: "Chicken Salad",
    restaurant: "Green Leaf",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.2,
    reviews: 85,
    quote: "So fresh and healthy!",
    relatedDishes: [
      {
        id: 201,
        name: "Caesar Salad",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 202,
        name: "Grilled Chicken",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: 3,
    name: "Margherita Pizza",
    restaurant: "Dragon Wok",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 150,
    quote: "Best pizza in town!",
    relatedDishes: [
      {
        id: 301,
        name: "Pepperoni Pizza",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 302,
        name: "Garlic Bread",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
]

export default function DishPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const dishId = Number.parseInt(params.id)

  // Find the dish by ID
  const dish = dishes.find((d) => d.id === dishId)

  if (!dish) {
    return <div>Dish not found</div>
  }

  return <DishDetail dish={dish} />
}
