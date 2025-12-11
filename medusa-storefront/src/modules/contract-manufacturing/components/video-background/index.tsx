"use client"

import { useEffect, useRef, useState } from "react"

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Set video properties
      video.muted = true
      video.loop = true
      video.playsInline = true
      
      // Handle video load success
      const handleLoadedData = () => {
        console.log("Video loaded successfully")
        setVideoLoaded(true)
        setVideoError(false)
        // Try to play
        video.play().catch((error) => {
          console.log("Autoplay prevented, will play on interaction:", error)
        })
      }

      // Handle video errors
      const handleError = (e: Event) => {
        const video = videoRef.current
        if (video?.error) {
          // Only log meaningful errors
          if (video.error.code === video.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {
            console.warn("Video format not supported by browser. Check that MP4 file exists at /videos/granola-manufacturing.mp4")
          } else if (video.error.code === video.error.MEDIA_ERR_DECODE) {
            console.warn("Video decode error - format may not be supported by this browser.")
          } else if (video.error.code === video.error.MEDIA_ERR_NETWORK) {
            console.warn("Network error loading video. File may not exist or server needs restart.")
          }
        }
        setVideoError(true)
        setVideoLoaded(false)
      }

      // Handle canplay event
      const handleCanPlay = () => {
        video.play().catch(() => {
          // Autoplay blocked, will play on user interaction
        })
      }

      video.addEventListener("loadeddata", handleLoadedData)
      video.addEventListener("error", handleError)
      video.addEventListener("canplay", handleCanPlay)

      // Try to load the video
      video.load()

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData)
        video.removeEventListener("error", handleError)
        video.removeEventListener("canplay", handleCanPlay)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          videoLoaded ? "opacity-30" : "opacity-0"
        }`}
        style={{ 
          objectFit: "cover", 
          minWidth: "100%", 
          minHeight: "100%",
          width: "100%",
          height: "100%",
          zIndex: 0
        }}
        onLoadedData={() => {
          console.log("Video loaded - dimensions:", videoRef.current?.videoWidth, "x", videoRef.current?.videoHeight)
        }}
        onError={(e) => {
          // Handle errors silently - the handleError function in useEffect will log meaningful errors
          setVideoError(true)
        }}
      >
        <source src="/storefront/granola movie.mp4" type="video/mp4" />
        <source src="/videos/granola-manufacturing.mp4" type="video/mp4" />
        <source src="/videos/granola-manufacturing.mov" type="video/quicktime" />
      </video>
      {/* Gradient overlay - z-index 1 so it's above video but below content */}
      <div className="absolute inset-0 bg-gradient-to-br from-gatherers-orange/70 to-gatherers-orange-dark/70" style={{ zIndex: 1 }} />
    </div>
  )
}










