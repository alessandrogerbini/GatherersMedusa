"use client"

import { useState } from "react"
import { Button } from "@medusajs/ui"

const NewsletterSignupForm = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    // Validation
    if (!email) {
      setStatus("error")
      setMessage("Please enter your email address")
      return
    }

    if (!email.includes("@")) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    try {
      const response = await fetch("/api/store/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message || "You're subscribed! Check your inbox for a welcome email.")
        setEmail("")
        setName("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Connection failed. Please try again.")
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      if (status === "success") {
        setStatus("idle")
        setMessage("")
      }
    }, 5000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="newsletter-name"
          className="block text-sm font-semibold text-gatherers-brown mb-2"
        >
          Name (Optional)
        </label>
        <input
          type="text"
          id="newsletter-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className="w-full px-4 py-3 border border-gatherers-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gatherers-orange focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="newsletter-email"
          className="block text-sm font-semibold text-gatherers-brown mb-2"
        >
          Email Address *
        </label>
        <input
          type="email"
          id="newsletter-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          required
          className="w-full px-4 py-3 border border-gatherers-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gatherers-orange focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="your@email.com"
        />
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            status === "success"
              ? "bg-gatherers-green-light text-gatherers-green-dark"
              : "bg-red-50 text-red-700"
          }`}
          role="alert"
        >
          {message}
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="w-full bg-gatherers-orange hover:bg-gatherers-orange-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed! ✓" : "Subscribe to Newsletter"}
      </Button>

      {status === "success" && (
        <div className="text-center">
          <p className="text-sm text-gatherers-brown-light">
            Welcome to the family! 🎉 Check your email for a special welcome offer.
          </p>
        </div>
      )}
    </form>
  )
}

export default NewsletterSignupForm


