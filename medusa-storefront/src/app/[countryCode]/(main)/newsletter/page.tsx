import { Metadata } from "next"
import NewsletterSignupForm from "@modules/newsletter/components/newsletter-signup-form"

export const metadata: Metadata = {
  title: "Newsletter Signup - Gatherer's Granola | Stay Connected",
  description:
    "Subscribe to the Gatherer's Granola newsletter for exclusive deals, new product announcements, and more!",
}

export default function NewsletterPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full bg-gradient-to-br from-gatherers-orange to-gatherers-orange-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 content-container h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Join Our Newsletter
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
            Get exclusive deals, new product announcements, and delicious inspiration delivered to your inbox
          </p>
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <section className="section-container bg-white">
        <div className="content-container">
          <div className="max-w-3xl mx-auto">
            {/* Benefits */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gatherers-brown text-center mb-8">
                Why Subscribe?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gatherers-cream rounded-lg p-6">
                  <div className="text-3xl mb-3">🎁</div>
                  <h3 className="text-xl font-bold text-gatherers-brown mb-2">
                    Exclusive Deals
                  </h3>
                  <p className="text-gatherers-brown-light">
                    Get subscriber-only discounts and early access to sales
                  </p>
                </div>
                <div className="bg-gatherers-cream rounded-lg p-6">
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="text-xl font-bold text-gatherers-brown mb-2">
                    New Products First
                  </h3>
                  <p className="text-gatherers-brown-light">
                    Be the first to try new flavors and limited editions
                  </p>
                </div>
                <div className="bg-gatherers-cream rounded-lg p-6">
                  <div className="text-3xl mb-3">📖</div>
                  <h3 className="text-xl font-bold text-gatherers-brown mb-2">
                    Behind the Scenes
                  </h3>
                  <p className="text-gatherers-brown-light">
                    Learn about our process and the stories behind our products
                  </p>
                </div>
                <div className="bg-gatherers-cream rounded-lg p-6">
                  <div className="text-3xl mb-3">🍴</div>
                  <h3 className="text-xl font-bold text-gatherers-brown mb-2">
                    Recipes & Tips
                  </h3>
                  <p className="text-gatherers-brown-light">
                    Get creative recipes and ways to enjoy our products
                  </p>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <div className="bg-gatherers-cream rounded-2xl p-8 md:p-10 shadow-lg">
              <h2 className="text-3xl font-bold text-gatherers-brown mb-6 text-center">
                Sign Up Today
              </h2>
              <NewsletterSignupForm />
            </div>

            {/* Privacy Notice */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gatherers-brown-light">
                We respect your privacy. No spam, just snacks. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-container bg-gatherers-cream">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-section text-center mb-12">
              What Our Subscribers Say
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-gatherers-orange text-2xl mb-3">★★★★★</div>
                <p className="text-gatherers-brown-light italic mb-4">
                  &quot;Love getting updates about new flavors! The exclusive discounts are amazing.&quot;
                </p>
                <p className="text-sm font-semibold text-gatherers-brown">
                  - Sarah M.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-gatherers-orange text-2xl mb-3">★★★★★</div>
                <p className="text-gatherers-brown-light italic mb-4">
                  &quot;The recipes they share are fantastic! I look forward to every newsletter.&quot;
                </p>
                <p className="text-sm font-semibold text-gatherers-brown">
                  - Michael R.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-gatherers-orange text-2xl mb-3">★★★★★</div>
                <p className="text-gatherers-brown-light italic mb-4">
                  &quot;Best newsletter I get. Short, sweet, and always has something valuable.&quot;
                </p>
                <p className="text-sm font-semibold text-gatherers-brown">
                  - Emily T.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


