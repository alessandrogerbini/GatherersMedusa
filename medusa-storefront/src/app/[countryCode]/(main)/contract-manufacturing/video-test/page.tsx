"use client"

import { useEffect, useRef, useState } from "react"

export default function VideoTestPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [status, setStatus] = useState({
    loaded: false,
    error: false,
    playing: false,
    errorMessage: "",
    videoInfo: "",
  })

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedMetadata = () => {
        setStatus((prev) => ({
          ...prev,
          loaded: true,
          videoInfo: `Video loaded: ${video.videoWidth}x${video.videoHeight}, Duration: ${video.duration}s`,
        }))
      }

      const handleCanPlay = () => {
        video
          .play()
          .then(() => {
            setStatus((prev) => ({ ...prev, playing: true }))
          })
          .catch((err) => {
            setStatus((prev) => ({
              ...prev,
              errorMessage: `Play error: ${err.message}`,
            }))
          })
      }

      const handleError = (e: Event) => {
        const error = video.error
        let message = "Unknown error"
        if (error) {
          switch (error.code) {
            case error.MEDIA_ERR_ABORTED:
              message = "Video loading aborted"
              break
            case error.MEDIA_ERR_NETWORK:
              message = "Network error loading video"
              break
            case error.MEDIA_ERR_DECODE:
              message = "Video decode error (format not supported)"
              break
            case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
              message = "Video format not supported by browser"
              break
            default:
              message = `Error code: ${error.code}`
          }
        }
        setStatus((prev) => ({
          ...prev,
          error: true,
          errorMessage: message,
        }))
      }

      const handlePlay = () => {
        setStatus((prev) => ({ ...prev, playing: true }))
      }

      const handlePause = () => {
        setStatus((prev) => ({ ...prev, playing: false }))
      }

      video.addEventListener("loadedmetadata", handleLoadedMetadata)
      video.addEventListener("canplay", handleCanPlay)
      video.addEventListener("error", handleError)
      video.addEventListener("play", handlePlay)
      video.addEventListener("pause", handlePause)

      // Try to load
      video.load()

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata)
        video.removeEventListener("canplay", handleCanPlay)
        video.removeEventListener("error", handleError)
        video.removeEventListener("play", handlePlay)
        video.removeEventListener("pause", handlePause)
      }
    }
  }, [])

  const testVideoPath = async (path: string) => {
    try {
      const response = await fetch(path, { method: "HEAD" })
      return {
        exists: response.ok,
        status: response.status,
        contentType: response.headers.get("content-type"),
      }
    } catch (error) {
      return {
        exists: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  const [pathTest, setPathTest] = useState<any>(null)
  const [userAgent, setUserAgent] = useState<string>("")
  const [formatSupport, setFormatSupport] = useState<{
    quicktime: string
    mp4: string
    webm: string
  } | null>(null)

  useEffect(() => {
    // Test all possible video paths
    Promise.all([
      testVideoPath("/storefront/granola movie.mp4"),
      testVideoPath("/videos/granola-manufacturing.mp4"),
      testVideoPath("/videos/granola-manufacturing.mov")
    ]).then(([storefrontMp4, videosMp4, mov]) => {
      setPathTest({
        storefrontMp4: storefrontMp4.exists ? "✅ Storefront MP4 exists" : "❌ Storefront MP4 not found",
        videosMp4: videosMp4.exists ? "✅ Videos MP4 exists" : "❌ Videos MP4 not found",
        mov: mov.exists ? "✅ MOV exists" : "❌ MOV not found",
        storefrontDetails: storefrontMp4,
        mp4Details: videosMp4,
        movDetails: mov
      })
    })
    if (typeof window !== "undefined") {
      setUserAgent(navigator.userAgent)
      if (videoRef.current) {
        setFormatSupport({
          quicktime: videoRef.current.canPlayType("video/quicktime") || "",
          mp4: videoRef.current.canPlayType("video/mp4") || "",
          webm: videoRef.current.canPlayType("video/webm") || "",
        })
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Video Test Page</h1>

        {/* File Path Test */}
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <h2 className="font-bold mb-2">File Path Test</h2>
          {pathTest ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Testing: <code>/storefront/granola movie.mp4</code>
                </p>
                <p>
                  <strong>Storefront MP4:</strong> {pathTest.storefrontMp4 || (pathTest.storefrontDetails?.exists ? "✅ Yes" : "❌ No")}
                </p>
                {pathTest.storefrontDetails?.status && (
                  <p className="text-sm text-gray-600">
                    HTTP Status: {pathTest.storefrontDetails.status}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Testing: <code>/videos/granola-manufacturing.mp4</code>
                </p>
                <p>
                  <strong>Videos MP4:</strong> {pathTest.videosMp4 || (pathTest.mp4Details?.exists ? "✅ Yes" : "❌ No")}
                </p>
                {pathTest.mp4Details?.status && (
                  <p className="text-sm text-gray-600">
                    HTTP Status: {pathTest.mp4Details.status}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Testing: <code>/videos/granola-manufacturing.mov</code>
                </p>
                <p>
                  <strong>MOV:</strong> {pathTest.mov || (pathTest.movDetails?.exists ? "✅ Yes" : "❌ No")}
                </p>
                {pathTest.movDetails?.status && (
                  <p className="text-sm text-gray-600">
                    HTTP Status: {pathTest.movDetails.status}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p>Testing...</p>
          )}
        </div>

        {/* Video Status */}
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <h2 className="font-bold mb-2">Video Status</h2>
          <p>
            <strong>Loaded:</strong> {status.loaded ? "✅ Yes" : "❌ No"}
          </p>
          <p>
            <strong>Playing:</strong> {status.playing ? "✅ Yes" : "❌ No"}
          </p>
          <p>
            <strong>Error:</strong> {status.error ? "❌ Yes" : "✅ No"}
          </p>
          {status.videoInfo && (
            <p>
              <strong>Info:</strong> {status.videoInfo}
            </p>
          )}
          {status.errorMessage && (
            <p className="text-red-600">
              <strong>Error Message:</strong> {status.errorMessage}
            </p>
          )}
        </div>

        {/* Video Element */}
        <div className="mb-6">
          <h2 className="font-bold mb-2">Video Element</h2>
          <div className="relative w-full h-96 bg-black rounded overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-contain"
              style={{ backgroundColor: "#000" }}
            >
              <source src="/storefront/granola movie.mp4" type="video/mp4" />
              <source src="/videos/granola-manufacturing.mp4" type="video/mp4" />
              <source src="/videos/granola-manufacturing.mov" type="video/quicktime" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Browser Info */}
        <div className="p-4 bg-gray-50 rounded">
          <h2 className="font-bold mb-2">Browser Information</h2>
          <p>
            <strong>User Agent:</strong> {userAgent || "Loading..."}
          </p>
          <p>
            <strong>Video Format Support:</strong>
          </p>
          {formatSupport ? (
            <ul className="list-disc list-inside ml-4">
              <li>
                QuickTime (.mov):{" "}
                {formatSupport.quicktime ? "✅ Supported" : "❌ Not Supported"}
              </li>
              <li>
                MP4: {formatSupport.mp4 ? "✅ Supported" : "❌ Not Supported"}
              </li>
              <li>
                WebM: {formatSupport.webm ? "✅ Supported" : "❌ Not Supported"}
              </li>
            </ul>
          ) : (
            <p className="text-gray-500">Loading format support...</p>
          )}
        </div>

        {/* Manual Controls */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => videoRef.current?.play()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Play
          </button>
          <button
            onClick={() => videoRef.current?.pause()}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Pause
          </button>
          <button
            onClick={() => {
              videoRef.current?.load()
              setStatus({
                loaded: false,
                error: false,
                playing: false,
                errorMessage: "",
                videoInfo: "",
              })
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  )
}










