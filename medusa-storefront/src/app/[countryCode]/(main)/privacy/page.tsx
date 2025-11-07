import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Gatherer's Granola",
  description: "Privacy Policy for Gatherer's Granola website and services.",
}

export default async function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gatherers-cream py-12 border-b border-gatherers-cream-dark">
        <div className="content-container">
          <h1 className="text-4xl md:text-5xl font-bold text-gatherers-brown mb-4">
            Privacy Policy
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
                <p className="text-lg">
                  At Gatherer&apos;s Granola, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  1. Information We Collect
                </h2>
                <h3 className="text-xl font-semibold text-gatherers-brown mb-3 mt-4">
                  Personal Information
                </h3>
                <p>
                  We collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Make a purchase or place an order</li>
                  <li>Create an account</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us via email or contact form</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p className="mt-3">
                  This information may include: name, email address, phone number, shipping address, billing address, and payment information.
                </p>

                <h3 className="text-xl font-semibold text-gatherers-brown mb-3 mt-6">
                  Automatically Collected Information
                </h3>
                <p>
                  When you visit our website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device. We also collect information about your browsing behavior and purchase history.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  2. How We Use Your Information
                </h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders and provide customer service</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve and optimize our website</li>
                  <li>Detect and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  3. Sharing Your Information
                </h2>
                <p>
                  We may share your information with third parties to help us use your information as described above. For example:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Payment processors to handle transactions</li>
                  <li>Shipping carriers to deliver your orders</li>
                  <li>Email service providers to send newsletters and marketing communications</li>
                  <li>Analytics providers to help us understand website usage</li>
                </ul>
                <p className="mt-3">
                  We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  4. Cookies and Tracking Technologies
                </h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are small data files that are placed on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  5. Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission or storage system is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  6. Your Rights
                </h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>The right to access and receive a copy of your personal information</li>
                  <li>The right to request correction of inaccurate information</li>
                  <li>The right to request deletion of your information</li>
                  <li>The right to opt-out of marketing communications</li>
                  <li>The right to object to processing of your information</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  7. Email Marketing
                </h2>
                <p>
                  With your permission, we may send you emails about our products, special offers, and other updates. You can unsubscribe from these emails at any time by clicking the &quot;unsubscribe&quot; link in any email or by contacting us directly.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  8. Children&apos;s Privacy
                </h2>
                <p>
                  Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  9. Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gatherers-brown mb-4">
                  10. Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <p className="mt-3">
                  Email: <a href="mailto:privacy@gatherersgranola.com" className="text-gatherers-orange hover:text-gatherers-orange-dark">privacy@gatherersgranola.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


