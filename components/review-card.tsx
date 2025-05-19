import { Star } from "lucide-react"

type Review = {
  id: number
  userName: string
  rating: number
  date: string
  comment: string
}

export default function ReviewCard({ review }: { review: Review }) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-bold">{review.userName}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  )
}
