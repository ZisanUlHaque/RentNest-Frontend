import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MessageSquare } from "lucide-react"
import { getReviewsByProperty } from "@/app/(dashboardGroup)/_actions/review"
import { IReview } from "@/lib/types"

type Props = {
  propertyId: string
}

export async function PropertyReviews({ propertyId }: Props) {
  const res = await getReviewsByProperty(propertyId)

  const reviews: IReview[] = res?.data?.reviews ?? []
  const averageRating: number = res?.data?.averageRating ?? 0
  const totalReviews: number = res?.data?.totalReviews ?? 0

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-5 text-primary" />
          <h2 className="text-xl font-semibold">Reviews ({totalReviews})</h2>
        </div>

        {totalReviews > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`size-4 ${
                    star <= Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold">{averageRating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="size-10 mx-auto mb-2 opacity-50" />
          <p>No reviews yet</p>
          <p className="text-sm">Be the first to review this property</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 rounded-xl border hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start gap-3 mb-2">
                <Avatar className="size-10">
                  <AvatarImage src={review.tenant?.profilePhoto ?? ""} />
                  <AvatarFallback>
                    {review.tenant?.name?.[0]?.toUpperCase() ?? "T"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">
                      {review.tenant?.name ?? "Anonymous"}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`size-3 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {review.comment && (
                <p className="text-sm text-muted-foreground mt-2 ml-13">
                  {review.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}