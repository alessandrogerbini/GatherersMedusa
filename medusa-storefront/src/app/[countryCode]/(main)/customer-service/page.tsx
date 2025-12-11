import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Customer Service - Gatherer's Granola | FAQs & Support",
  description:
    "Find answers to frequently asked questions about Gatherer's Granola products, shipping, returns, and more. We're here to help!",
}

export default async function CustomerServicePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-gradient-to-br from-gatherers-green to-gatherers-green-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 content-container h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Customer Service
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
            We&apos;re here to help! Find answers to your questions below
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="section-container bg-white">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-section text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {/* Shipping & Delivery */}
              <div className="bg-gatherers-cream rounded-lg p-6 md:p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gatherers-brown mb-4">
                  Shipping & Delivery
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gatherers-brown mb-2">
                      What are your shipping times?
                    </h4>
                    <p className="text-gatherers-brown-light">
                      We typically process and ship orders within 1-2 business days. 
                      Delivery times vary based on your location, typically 3-7 business days 
                      within the continental United States. You&apos;ll receive a tracking number 
                      via email once your order ships.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gatherers-brown mb-2">
                      Do you offer free shipping?
                    </h4>
                    <p className="text-gatherers-brown-light">
                      Yes! We offer free shipping on orders over a certain amount. 
                      Check your cart to see if you qualify for free shipping. 
                      Shipping costs are calculated at checkout based on your location and order size.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gatherers-brown mb-2">
                      Do you ship internationally?
                    </h4>
                    <p className="text-gatherers-brown-light">
                      Currently, we ship within the United States. If you&apos;re interested 
                      in international shipping, please contact us and we&apos;ll see what we can arrange.
                    </p>
                  </div>
                </div>
              </div>

              {/* Orders & Returns */}
              <div className="bg-gatherers-cream rounded-lg p-6 md:p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gatherers-brown mb-4">
                  Orders & Returns
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gatherers-brown mb-2">
                      What is your return policy?
                    </h4>
                    <p className="text-gatherers-brown-light">
                      We stand behind our products 100%. If you&apos;re not completely satisfied 
                      with your purchase, please contact us within 30 days for a full refund or replacement. 
                      Products must be unopened and in their original packaging for returns.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gatherers-brown mb-2">
                      How do I track my order?
                    </h4>
                    <p className="text-gatherers-brown-light">
                      Once your order ships, you&apos;ll receive an email with a tracking number. 
                      You can also check your order status by logging into your account and 
                      visiting the Orders section.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gatherers-brown mb-2">
                      Can I modify or cancel my order?
                    </h4>
                    <p className="text-gatherers-brown-light">
                      If you need to modify or cancel your order, please contact us as soon as possible. 
                      Once an order has been processed and shipped, we cannot cancel it, but you can 
                      return it using our return policy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="bg-gatherers-cream rounded-lg p-6 md:p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gatherers-brown mb-4">
                  Products
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gatherers-brown mb-2">
                      Do you have allergen information?
                    </h4>
                    <p className="text-gatherers-brown-light">
                      Yes! Detailed allergen information is available on each product page. 
                      Our granola is made in a facility that processes nuts, dairy, and gluten. 
                      If you have specific concerns, please contact us directly.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gatherers-brown mb-2">
                      How should I store my granola?
                    </h4>
                    <p className="text-gatherers-brown-light">
                      For best freshness, store your granola in a cool, dry place. Once opened, 
                      keep it sealed tightly. Our granola stays fresh for several months when 
                      stored properly.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gatherers-brown mb-2">
                      Are your products organic?
                    </h4>
                    <p className="text-gatherers-brown-light">
                      We use high-quality, natural ingredients in all our products. 
                      Specific certifications and ingredient details are listed on each product page.
                    </p>
                  </div>
                </div>
              </div>

              {/* Wholesale */}
              <div className="bg-gatherers-cream rounded-lg p-6 md:p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gatherers-brown mb-4">
                  Wholesale & Business
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gatherers-brown mb-2">
                      Do you offer wholesale pricing?
                    </h4>
                    <p className="text-gatherers-brown-light mb-3">
                      Yes! We work with retailers, cafes, and other businesses. 
                      Create a wholesale account to access special pricing and benefits.
                    </p>
                    <LocalizedClientLink
                      href="/wholesale/register"
                      className="inline-block text-gatherers-green hover:text-gatherers-green-dark font-semibold underline"
                    >
                      Apply for Wholesale Account →
                    </LocalizedClientLink>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gatherers-brown mb-2">
                      What are the benefits of a wholesale account?
                    </h4>
                    <p className="text-gatherers-brown-light">
                      Wholesale accounts receive special pricing, dedicated support, 
                      flexible payment terms, and access to bulk ordering options. 
                      Perfect for retailers, cafes, and food service businesses.
                    </p>
                  </div>
                </div>
              </div>

              {/* Account & Payment */}
              <div className="bg-gatherers-cream rounded-lg p-6 md:p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gatherers-brown mb-4">
                  Account & Payment
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gatherers-brown mb-2">
                      What payment methods do you accept?
                    </h4>
                    <p className="text-gatherers-brown-light">
                      We accept all major credit cards, debit cards, and PayPal. 
                      All payments are processed securely through our encrypted payment system.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gatherers-brown mb-2">
                      Is my payment information secure?
                    </h4>
                    <p className="text-gatherers-brown-light">
                      Absolutely. We use industry-standard encryption and secure payment processing. 
                      We never store your full payment information on our servers.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gatherers-brown mb-2">
                      How do I update my account information?
                    </h4>
                    <p className="text-gatherers-brown-light">
                      You can update your account information, including shipping addresses and 
                      payment methods, by logging into your account and visiting the Profile section.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-container bg-gatherers-cream">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-section mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gatherers-brown-light mb-8 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Our customer service team is here to help. 
              Reach out to us and we&apos;ll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocalizedClientLink
                href="/contact"
                className="inline-block btn-primary text-lg"
              >
                Contact Us
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/account"
                className="inline-block btn-secondary text-lg"
              >
                View My Account
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}





