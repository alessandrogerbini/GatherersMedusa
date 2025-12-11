"use client"

import { useState } from "react"
import { Button } from "@medusajs/ui"

const ContractManufacturingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    subject: "",
    question: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.question) {
      setStatus("error")
      setMessage("Please fill in all required fields")
      return
    }

    if (!formData.email.includes("@")) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/store/contract-manufacturing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message || "Thank you for your inquiry! We'll get back to you soon.")
        setFormData({ name: "", phone: "", email: "", company: "", subject: "", question: "" })
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again or contact us directly.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Please try again or contact us directly.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gatherers-brown mb-2"
          >
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={status === "loading"}
            className="w-full px-4 py-3 border border-gatherers-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gatherers-orange focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gatherers-brown mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={status === "loading"}
            className="w-full px-4 py-3 border border-gatherers-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gatherers-orange focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gatherers-brown mb-2"
          >
            Your Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === "loading"}
            className="w-full px-4 py-3 border border-gatherers-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gatherers-orange focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-semibold text-gatherers-brown mb-2"
          >
            Your Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            disabled={status === "loading"}
            className="w-full px-4 py-3 border border-gatherers-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gatherers-orange focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Company name"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-semibold text-gatherers-brown mb-2"
        >
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={status === "loading"}
          className="w-full px-4 py-3 border border-gatherers-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gatherers-orange focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Contract manufacturing inquiry"
          required
        />
      </div>

      <div>
        <label
          htmlFor="question"
          className="block text-sm font-semibold text-gatherers-brown mb-2"
        >
          Your Question *
        </label>
        <textarea
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          disabled={status === "loading"}
          rows={6}
          className="w-full px-4 py-3 border border-gatherers-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gatherers-orange focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          placeholder="Tell us about your project needs, product type, quantities, timeline, and any specific requirements..."
          required
          aria-describedby="question-help"
        />
        <p id="question-help" className="mt-2 text-sm text-gatherers-brown-light">
          Include details about your product, target quantities, timeline, and any certifications needed.
        </p>
      </div>

      <div className="bg-gatherers-cream rounded-lg p-4 text-sm text-gatherers-brown-light">
        <p>
          <strong className="text-gatherers-brown">What happens next?</strong> We&apos;ll review your inquiry and respond within 1-2 business days with a personalized quote and next steps.
        </p>
      </div>

      <div className="text-xs text-gatherers-brown-light">
        <p>
          We respect your privacy. Your information will only be used to respond to your inquiry and will never be shared with third parties.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            status === "success"
              ? "bg-gatherers-green-light text-gatherers-green-dark"
              : "bg-red-50 text-red-700"
          }`}
          role="alert"
          aria-live="polite"
        >
          {message}
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="w-full sm:w-auto bg-gatherers-orange hover:bg-gatherers-orange-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Get Your Free Quote"}
      </Button>
    </form>
  )
}

export default ContractManufacturingForm










