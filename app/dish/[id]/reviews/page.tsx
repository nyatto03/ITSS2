"use client"
import { useParams } from "next/navigation"
import ReviewsPageContent from "@/components/reviews-page"

// Sample review data
const reviewsData = {
  1: [
    {
      id: 1,
      userName: "FoodLover22",
      rating: 5,
      date: "2023-04-15",
      comment:
        "The sauce was amazing! Perfect balance of flavors and the pasta was cooked to perfection. Will definitely order again.",
    },
    {
      id: 2,
      userName: "PastaFanatic",
      rating: 4,
      date: "2023-03-28",
      comment:
        "Really enjoyed this dish. The carbonara sauce was creamy and delicious. Could use a bit more pepper though.",
    },
    {
      id: 3,
      userName: "ItalianCuisineExpert",
      rating: 5,
      date: "2023-02-10",
      comment: "Authentic carbonara! Reminds me of my trip to Rome. The chef knows what they're doing.",
    },
    {
      id: 4,
      userName: "WeekendFoodie",
      rating: 4,
      date: "2023-01-22",
      comment: "Great portion size and flavor. Delivery was quick and the food was still hot.",
    },
    {
      id: 5,
      userName: "TastyMeals",
      rating: 3,
      date: "2022-12-15",
      comment: "Decent carbonara. A bit too salty for my taste but otherwise good quality ingredients.",
    },
  ],
  2: [
    {
      id: 1,
      userName: "HealthyEater",
      rating: 5,
      date: "2023-04-10",
      comment: "So fresh and healthy! The chicken was perfectly grilled and the vegetables were crisp.",
    },
    {
      id: 2,
      userName: "SaladLover",
      rating: 4,
      date: "2023-03-22",
      comment: "Great salad with a nice balance of ingredients. The dressing was light and flavorful.",
    },
    {
      id: 3,
      userName: "FitnessFoodie",
      rating: 3,
      date: "2023-02-18",
      comment: "Good protein content but I wish there was more variety in the vegetables.",
    },
  ],
  3: [
    {
      id: 1,
      userName: "PizzaFan",
      rating: 5,
      date: "2023-04-05",
      comment: "Best pizza in town! The crust was perfect - thin and crispy yet chewy.",
    },
    {
      id: 2,
      userName: "ItalianFoodLover",
      rating: 5,
      date: "2023-03-15",
      comment: "Authentic Margherita pizza. Simple ingredients but incredible flavor.",
    },
    {
      id: 3,
      userName: "WeekendTreater",
      rating: 4,
      date: "2023-02-28",
      comment: "Really good pizza. The tomato sauce was fresh and flavorful.",
    },
    {
      id: 4,
      userName: "FoodCritic101",
      rating: 5,
      date: "2023-01-10",
      comment: "Perfect balance of cheese, sauce, and basil. A true classic done right!",
    },
  ],
}

// Sample dish data
const dishes = [
  {
    id: 1,
    name: "Spagetti Carbonara",
    restaurant: "Bella Italia",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: "Chicken Salad",
    restaurant: "Green Leaf",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.2,
    reviews: 85,
  },
  {
    id: 3,
    name: "Margherita Pizza",
    restaurant: "Dragon Wok",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 150,
  },
]

export default function ReviewsPage() {
  const params = useParams()
  const dishId = Number(params.id)

  // Find the dish by ID
  const dish = dishes.find((d) => d.id === dishId)

  if (!dish) {
    return <div className="p-4">Dish not found</div>
  }

  // Get reviews for this dish
  const reviews = reviewsData[dishId as keyof typeof reviewsData] || []

  return <ReviewsPageContent dish={dish} reviews={reviews} />
}
