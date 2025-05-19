import Image from "next/image"

type Restaurant = {
  id: number
  name: string
  dish: string
  image: string
  timeToEat: number
}

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
      <div className="space-y-1">
        <h3 className="font-bold text-lg">{restaurant.name}</h3>
        <p className="text-gray-700">{restaurant.dish}</p>
        <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
          Fits your {restaurant.timeToEat} min break
        </div>
      </div>
      <div className="h-20 w-20 relative rounded-lg overflow-hidden">
        <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.dish} fill className="object-cover" />
      </div>
    </div>
  )
}
