import { Metadata } from "next"
import StorySection from "@modules/about/components/story-section"
import ValuesGrid from "@modules/about/components/values-grid"
import NewsletterSignup from "@modules/common/components/mailchimp-signup"

export const metadata: Metadata = {
  title: "About Us - Gatherer's Granola | Our Story & Values",
  description:
    "Learn about Gatherer's Granola story, our commitment to quality, and the family recipes that make our handcrafted granola special.",
}

export default async function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full bg-gradient-to-br from-gatherers-orange to-gatherers-orange-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 content-container h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            About Gatherer&apos;s Granola
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed">
            Handcrafted with love, made with care, and delivered with pride.
          </p>
        </div>
      </div>

      <StorySection />
      <ValuesGrid />

      {/* CTA Section */}
      <section className="section-container bg-white">
        <div className="content-container">
          <div className="max-w-4xl mx-auto bg-gatherers-cream rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-gatherers-brown mb-6">
              Ready to Try Our Granola?
            </h2>
            <p className="text-lg text-gatherers-brown-light mb-8 max-w-2xl mx-auto">
              Experience the difference that handcrafted quality and family recipes make. 
              Shop our collection and taste tradition in every bite.
            </p>
            <a
              href="/store"
              className="inline-block btn-primary text-lg"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-container bg-gatherers-cream">
        <div className="content-container">
          <div className="max-w-3xl mx-auto">
            <NewsletterSignup
              title="Stay in Touch"
              description="Join our community and get exclusive recipes, behind-the-scenes stories, and special offers."
            />
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="section-container bg-white" aria-labelledby="social-heading">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="social-heading" className="text-3xl font-bold text-gatherers-brown mb-4">
              Follow Us
            </h2>
            <p className="text-lg text-gatherers-brown-light mb-8">
              Stay connected with Gatherer&apos;s Granola on social media
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://www.gatherersgranola.com/website/social/facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gatherers-orange rounded-full flex items-center justify-center text-white hover:bg-gatherers-orange-dark transition-colors"
                aria-label="Facebook"
              >
                <span className="text-xl font-bold">f</span>
              </a>
              <a
                href="https://www.gatherersgranola.com/website/social/instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gatherers-orange rounded-full flex items-center justify-center text-white hover:bg-gatherers-orange-dark transition-colors"
                aria-label="Instagram"
              >
                <span className="text-xl">📷</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


