import { Metadata } from "next"
import ContactForm from "@modules/contact/components/contact-form"
import ContactInfo from "@modules/contact/components/contact-info"

export const metadata: Metadata = {
  title: "Contact Us - Gatherer's Granola | Get in Touch",
  description:
    "Contact Gatherer's Granola for questions, wholesale inquiries, or feedback. We're here to help!",
}

export default async function ContactPage() {
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
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
            We&apos;re here to help and answer any questions you may have
          </p>
        </div>
      </div>

      {/* Contact Form & Info Section */}
      <section className="section-container bg-white">
        <div className="content-container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info - Left Sidebar */}
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>

            {/* Contact Form - Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-gatherers-cream rounded-2xl p-8 md:p-10 shadow-lg">
                <h2 className="text-3xl font-bold text-gatherers-brown mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-container bg-gatherers-cream">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-section text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gatherers-brown mb-3">
                  What are your shipping times?
                </h3>
                <p className="text-gatherers-brown-light">
                  We typically process and ship orders within 1-2 business days. 
                  Delivery times vary based on your location, typically 3-7 business days 
                  within the continental United States.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gatherers-brown mb-3">
                  Do you offer wholesale pricing?
                </h3>
                <p className="text-gatherers-brown-light mb-3">
                  Yes! We work with retailers, cafes, and other businesses. 
                  Create a wholesale account to access special pricing and benefits.
                </p>
                <a
                  href="/wholesale/register"
                  className="inline-block text-blue-600 hover:text-blue-800 font-semibold underline"
                >
                  Apply for Wholesale Account →
                </a>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gatherers-brown mb-3">
                  What is your return policy?
                </h3>
                <p className="text-gatherers-brown-light">
                  We stand behind our products 100%. If you&apos;re not completely satisfied 
                  with your purchase, please contact us within 30 days for a full refund or replacement.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gatherers-brown mb-3">
                  Do you have allergen information?
                </h3>
                <p className="text-gatherers-brown-light">
                  Yes! Detailed allergen information is available on each product page. 
                  Our granola is made in a facility that processes nuts, dairy, and gluten. 
                  If you have specific concerns, please contact us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


