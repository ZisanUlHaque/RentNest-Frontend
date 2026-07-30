import Image from "next/image";
import { MapPin, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IProperty } from "@/lib/types";

type PropertyCardProps = {
  post: IProperty;
};

export function PropertyCard({ post }: PropertyCardProps) {
  const reviewCount = post._count?.reviews ?? post.reviews?.length ?? 0;

  return (
    <Card className="overflow-hidden pt-0">
      <div className="relative h-56 w-full">
        <Image
          src={post.images[0]}
          alt={post.title}
          fill
          unoptimized
          className="object-cover"
        />

        <Badge className="absolute top-3 right-3">
          {post.status}
        </Badge>
      </div>

      <CardContent className="space-y-4 p-4">
        <div>
          <h3 className="line-clamp-1 text-lg font-semibold">
            {post.title}
          </h3>

          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {post.location}
          </div>
        </div>

        <p className="line-clamp-3 text-sm text-muted-foreground">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {post.amenities.slice(0, 3).map((item) => (
            <Badge key={item} variant="secondary">
              {item}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-primary">
              ৳{post.rentPerMonth.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {reviewCount} Reviews
          </div>
        </div>
      </CardContent>
    </Card>
  );
}