"use client"

import { useState } from "react"
import { Button } from "@medusajs/ui"

interface NewsletterSignupProps {
  variant?: "default" | "compact"
  title?: string
  description?: string
}

const NewsletterSignup = ({
  variant = "default",
  title,
  description,
}: NewsletterSignupProps) => {
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    if (!consent) {
      setStatus("error")
      setMessage("Please agree to receive emails from us")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message || "Thank you for subscribing!")
        setEmail("")
        setConsent(false)
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An unexpected error occurred. Please try again later.")
    }
  }

  const isCompact = variant === "compact"

  return (
    <div className={`w-full ${isCompact ? "max-w-md" : "max-w-2xl"}`}>
      {!isCompact && (
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gatherers-brown mb-3">
            {title || "Join Our Community"}
          </h3>
          <p className="text-base text-gatherers-brown-light">
            {description ||
              "Sign up for exclusive recipes, special offers, and updates from Gatherer's Granola."}
          </p>
        </div>
      )}

      {isCompact && title && (
        <h4 className="text-lg font-semibold text-gatherers-brown mb-3">
          {title}
        </h4>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={`flex ${isCompact ? "flex-col gap-2" : "flex-col sm:flex-row gap-3"}`}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === "loading" || status === "success"}
            className={`flex-1 px-4 py-3 border border-gatherers-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gatherers-orange focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
              isCompact ? "text-sm" : ""
            }`}
            aria-label="Email address"
          />
          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={`bg-gatherers-orange hover:bg-gatherers-orange-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isCompact ? "py-2 px-4 text-sm" : "px-8 py-3"
            }`}
          >
            {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
          </Button>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center h-4">
            <input
              type="checkbox"
              id="newsletter-consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={status === "loading" || status === "success"}
              className="w-4 h-4 text-gatherers-orange border-gatherers-brown-light rounded focus:ring-gatherers-orange disabled:opacity-50"
            />
          </div>
          <label
            htmlFor="newsletter-consent"
            className={`text-gatherers-brown-light leading-normal flex items-center ${isCompact ? "text-xs" : "text-sm"}`}
          >
            I agree to receive emails from Gatherer&apos;s Granola. You can unsubscribe at any time.
          </label>
        </div>

        {message && (
          <div
            className={`p-3 rounded-lg ${
              status === "success"
                ? "bg-gatherers-green-light text-gatherers-green-dark"
                : "bg-red-50 text-red-700"
            } ${isCompact ? "text-sm" : ""}`}
            role="alert"
          >
            {message}
          </div>
        )}
      </form>
    </div>
  )
}

export default NewsletterSignup


