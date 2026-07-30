"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"

type Props = {
  images: string[]
  title: string
}

export function PropertyImageGallery({ images, title }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!images || images.length === 0) {
    return <div className="h-96 bg-muted rounded-2xl" />
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div
          className="relative aspect-video w-full overflow-hidden rounded-3xl cursor-pointer group"
          onClick={() => setSelectedImage(images[0])}
        >
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            priority
          />
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.slice(1).map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer border-2 border-transparent hover:border-primary transition-all"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${title} ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedImage && (
            <div className="relative aspect-video w-full">
              <Image
                src={selectedImage}
                alt={title}
                fill
                className="object-contain bg-black"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}