import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use - Gatherer's Granola",
  description: "Terms of Use for Gatherer's Granola website and services.",
}

export default async function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gatherers-cream py-12 border-b border-gatherers-cream-dark">
        <div className="content-container">
          <h1 className="text-4xl md:text-5xl font-bold text-gatherers-brown mb-4">
            Terms of Use
          </h1>
          <p className="text-lg text-gatherers-brown-light">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <section className="section-container bg-white">
        <div className="content-container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-8 text-gatherers-brown-light">
              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing and using the Gatherer&apos;s Granola website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  2. Use of Our Website
                </h2>
                <p>
                  You may use our website for lawful purposes only. You agree not to use our website:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>In any way that breaches any applicable local, national, or international law or regulation</li>
                  <li>In any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect</li>
                  <li>To transmit, or procure the sending of, any unsolicited or unauthorized advertising or promotional material</li>
                  <li>To knowingly transmit any data or material that contains viruses or other harmful components</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  3. Product Information
                </h2>
                <p>
                  We strive to ensure that all information on our website is accurate. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  4. Orders and Payment
                </h2>
                <p>
                  All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason. If your order is canceled after payment has been processed, we will issue a full refund.
                </p>
                <p className="mt-3">
                  Payment must be made at the time of purchase. We accept major credit cards and other payment methods as displayed on our website. All prices are in US dollars unless otherwise stated.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  5. Shipping and Delivery
                </h2>
                <p>
                  We will make every effort to deliver products within the estimated timeframe. However, delivery times are estimates only and we are not liable for any delays in delivery.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  6. Returns and Refunds
                </h2>
                <p>
                  We want you to be completely satisfied with your purchase. If you are not satisfied, please contact us within 30 days of receipt. Please refer to our return policy for detailed information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  7. Intellectual Property
                </h2>
                <p>
                  All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Gatherer&apos;s Granola and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  8. Limitation of Liability
                </h2>
                <p>
                  To the fullest extent permitted by law, Gatherer&apos;s Granola shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  9. Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following any changes constitutes acceptance of those changes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  10. Contact Information
                </h2>
                <p>
                  If you have any questions about these Terms of Use, please contact us at:
                </p>
                <p className="mt-3">
                  Email: <a href="mailto:legal@gatherersgranola.com" className="text-gatherers-orange hover:text-gatherers-orange-dark">legal@gatherersgranola.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


