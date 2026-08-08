
"use client"

import Image from "next/image"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Camera, Grid3x3 } from "lucide-react"

type Props = {
  images: string[]
  title: string
}

export function PropertyImageGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-2xl bg-muted">
        <Camera className="size-16 text-muted-foreground/50" />
      </div>
    )
  }

  const displayImages = images.slice(0, 5)
  const remainingCount = images.length - 5

  return (
    <>
      <div className="grid grid-cols-4 gap-2 h-[400px] rounded-2xl overflow-hidden">
        {/* Main Large Image - Takes 2 columns and full height */}
        <div
          className="relative col-span-4 sm:col-span-3 row-span-2 cursor-pointer group overflow-hidden"
          onClick={() => {
            setActiveIndex(0)
            setIsOpen(true)
          }}
        >
          <Image
            src={displayImages[0]}
            alt={title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/10" />
        </div>

        {/* Right Side - 2 stacked images (Desktop only) */}
        <div className="hidden sm:grid col-span-1 row-span-2 grid-rows-2 gap-2">
          {displayImages[1] && (
            <div
              className="relative cursor-pointer group overflow-hidden"
              onClick={() => {
                setActiveIndex(1)
                setIsOpen(true)
              }}
            >
              <Image
                src={displayImages[1]}
                alt={`${title} 2`}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          {displayImages[2] && (
            <div
              className="relative cursor-pointer group overflow-hidden"
              onClick={() => {
                if (remainingCount > 0) {
                  setActiveIndex(2)
                  setIsOpen(true)
                } else {
                  setActiveIndex(2)
                  setIsOpen(true)
                }
              }}
            >
              <Image
                src={displayImages[2]}
                alt={`${title} 3`}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* View More Overlay */}
              {remainingCount > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <div className="text-center text-white">
                    <Grid3x3 className="size-6 mx-auto mb-1" />
                    <p className="text-sm font-bold">View All {images.length}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
            <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
              {activeIndex + 1} / {images.length}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Main Image */}
          <div className="relative size-full max-h-[85vh] max-w-[90vw] mx-4">
            <Image
              src={images[activeIndex]}
              alt={`${title} - Image ${activeIndex + 1}`}
              fill
              unoptimized
              className="object-contain"
            />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveIndex(
                    (i) => (i - 1 + images.length) % images.length
                  )
                }
                className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                onClick={() =>
                  setActiveIndex((i) => (i + 1) % images.length)
                }
                className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto rounded-2xl border border-white/20 bg-black/50 p-2 backdrop-blur-md">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative size-16 shrink-0 overflow-hidden rounded-lg transition-all ${
                  index === activeIndex
                    ? "ring-2 ring-white"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}