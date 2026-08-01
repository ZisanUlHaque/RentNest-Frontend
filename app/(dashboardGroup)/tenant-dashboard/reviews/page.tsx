import { Card } from "@/components/ui/card"
import { getMyReviews } from "../../_actions/review"
import { IReview } from "@/lib/types"
import { Star, MessageSquare } from "lucide-react"
import Link from "next/link"

type MyReview = IReview & {
  property?: {
    id: string
    title: string
    images?: string[]
    location?: string
  }
}

export default async function MyReviewsPage() {
  const res = await getMyReviews()
  const reviews: MyReview[] = res?.data ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Reviews</h1>
        <p className="text-muted-foreground mt-1">
          Reviews you&apos;ve given to properties
        </p>
      </div>

      {reviews.length === 0 ? (
        <Card className="p-20 text-center">
          <MessageSquare className="size-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-lg font-semibold">No reviews yet</p>
          <p className="text-sm text-muted-foreground">
            Complete a rental to leave a review
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <Link
                  href={`/properties/${review.property?.id}`}
                  className="font-semibold hover:text-primary line-clamp-1"
                >
                  {review.property?.title ?? "Property"}
                </Link>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`size-4 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                {review.comment ?? "No comment"}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}