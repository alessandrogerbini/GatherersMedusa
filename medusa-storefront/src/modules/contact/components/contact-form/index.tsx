"use client"

import { useState } from "react"
import { Button } from "@medusajs/ui"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error")
      setMessage("Please fill in all fields")
      return
    }

    if (!formData.email.includes("@")) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")
    setMessage("")

    // Simulate form submission (you can replace this with actual API call)
    try {
      // TODO: Replace with actual contact form submission endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      setStatus("success")
      setMessage("Thank you for your message! We'll get back to you soon.")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Please try again or email us directly.")
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
            Name *
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
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gatherers-brown mb-2"
          >
            Email *
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
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={status === "loading"}
          className="w-full px-4 py-3 border border-gatherers-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gatherers-orange focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="wholesale">Wholesale/Business Inquiry</option>
          <option value="product">Product Question</option>
          <option value="order">Order Support</option>
          <option value="feedback">Feedback</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-gatherers-brown mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={status === "loading"}
          rows={6}
          className="w-full px-4 py-3 border border-gatherers-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gatherers-orange focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          placeholder="Tell us how we can help..."
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
        className="w-full sm:w-auto bg-gatherers-orange hover:bg-gatherers-orange-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Send Message"}
      </Button>
    </form>
  )
}

export default ContactForm


