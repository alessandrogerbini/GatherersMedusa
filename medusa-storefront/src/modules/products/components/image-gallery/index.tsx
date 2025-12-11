"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState } from "react"
import X from "@modules/common/icons/x"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  const openZoom = (imageUrl: string) => {
    setZoomedImage(imageUrl)
  }

  const closeZoom = () => {
    setZoomedImage(null)
  }

  return (
    <>
      <div className="flex items-start relative">
        <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
          {images.map((image, index) => {
            return (
              <Container
                key={image.id}
                className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle cursor-pointer hover:opacity-90 transition-opacity"
                id={image.id}
                onClick={() => image.url && openZoom(image.url)}
              >
                {!!image.url && (
                  <Image
                    src={image.url}
                    priority={index <= 2 ? true : false}
                    className="absolute inset-0 rounded-rounded"
                    alt={`Product image ${index + 1}`}
                    fill
                    sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                )}
              </Container>
            )
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={closeZoom}
        >
          <button
            onClick={closeZoom}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close zoom"
          >
            <X size={32} />
          </button>
          <div
            className="relative max-w-full max-h-full w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={zoomedImage}
              alt="Zoomed product image"
              width={1200}
              height={1600}
              className="max-w-full max-h-full object-contain"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ImageGallery
