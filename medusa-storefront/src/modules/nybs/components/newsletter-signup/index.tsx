"use client"

import { useState } from "react"

const NYBSNewsletterSection = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/mailchimp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("You're subscribed! Check your inbox for snack news.")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Connection failed. Please try again.")
    }

    setTimeout(() => {
      setStatus("idle")
      setMessage("")
    }, 5000)
  }

  return (
    <section className="section-container newsprint-bg">
      <div className="content-container">
        <div className="max-w-5xl mx-auto">
          {/* Newspaper Header Style */}
          <div className="bg-white border-8 border-nybs-black p-8 md:p-12 shadow-2xl">
            {/* Banner */}
            <div className="tabloid-banner text-center mb-8">
              <p className="text-2xl md:text-3xl italic">THE DAILY SNACKER</p>
            </div>

            {/* Main Headline */}
            <div className="text-center mb-8">
              <div className="border-y-4 border-nybs-black py-4 mb-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none text-nybs-black">
                  SUBSCRIBE NOW!
                  <br />
                  GET THE SCOOP
                </h2>
              </div>
              <p className="text-xl md:text-2xl font-bold text-nybs-black-ink">
                Breaking News, Hot Deals, and Snack Gossip Delivered to Your Inbox
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Left Column - Benefits */}
              <div className="space-y-4">
                <div className="border-2 border-nybs-black p-4 bg-nybs-newsprint-light">
                  <h3 className="font-black uppercase text-lg mb-2 flex items-center gap-2">
                    <span className="text-nybs-red">★</span>
                    What You Get:
                  </h3>
                  <ul className="space-y-2 text-sm font-bold">
                    <li className="flex items-start gap-2">
                      <span className="text-nybs-red mt-0.5">▪</span>
                      <span>Exclusive new flavor announcements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nybs-red mt-0.5">▪</span>
                      <span>VIP access to limited editions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nybs-red mt-0.5">▪</span>
                      <span>Subscriber-only discounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nybs-red mt-0.5">▪</span>
                      <span>NYC snack scene updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nybs-red mt-0.5">▪</span>
                      <span>Behind-the-scenes stories</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-nybs-black text-white p-4 text-center">
                  <p className="font-black uppercase text-sm">
                    Join 10,000+ Snack Insiders
                  </p>
                </div>
              </div>

              {/* Right Column - Form */}
              <div>
                <div className="border-4 border-nybs-black p-6 bg-white">
                  <h3 className="font-black uppercase text-xl mb-4 text-center">
                    Sign Up Today
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="nybs-email" className="block text-sm font-bold uppercase mb-2">
                        Email Address:
                      </label>
                      <input
                        type="email"
                        id="nybs-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border-2 border-nybs-black focus:outline-none focus:border-nybs-red font-bold"
                        disabled={status === "loading"}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full btn-nybs-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? "SUBSCRIBING..." : "SUBSCRIBE NOW"}
                    </button>

                    {message && (
                      <div
                        className={`p-4 border-2 text-center font-bold text-sm ${
                          status === "success"
                            ? "bg-green-100 border-green-600 text-green-800"
                            : "bg-red-100 border-red-600 text-red-800"
                        }`}
                      >
                        {message}
                      </div>
                    )}
                  </form>

                  <p className="text-xs text-center mt-4 text-gray-600">
                    We respect your inbox. No spam, just snacks. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Section - Testimonial */}
            <div className="border-t-4 border-nybs-black pt-6">
              <div className="bg-nybs-newsprint p-6 text-center">
                <blockquote className="text-lg md:text-xl font-black italic mb-3">
                  &quot;Best newsletter I get. And I&apos;m subscribed to the actual New York Post.&quot;
                </blockquote>
                <cite className="text-sm font-bold not-italic">
                  - Maria L., Brooklyn
                </cite>
              </div>
            </div>

            {/* Breaking News Banner */}
            <div className="mt-8 bg-nybs-red text-white p-4 border-4 border-nybs-black text-center">
              <p className="font-black uppercase text-sm md:text-base">
                ★ Subscribe Today &amp; Get 10% Off Your First Order! ★
              </p>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="text-center mt-8">
            <p className="text-sm font-bold text-nybs-black-ink bg-white inline-block px-6 py-3 border-2 border-nybs-black">
              Already a subscriber? We see you. You&apos;re the real MVP.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NYBSNewsletterSection

