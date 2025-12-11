import LocalizedClientLink from "@modules/common/components/localized-client-link"

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gatherers-brown mb-6">
          Get in Touch
        </h3>
        <p className="text-body mb-6">
          Have a question or feedback? We&apos;d love to hear from you! 
          Fill out the form and we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      {/* Wholesale Inquiry */}
      <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
        <h4 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
          <span>🏪</span> Wholesale Inquiries
        </h4>
        <p className="text-sm text-blue-800 mb-4">
          Buying for a business? Create a wholesale account to access special pricing and benefits!
        </p>
        <LocalizedClientLink
          href="/wholesale/register"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          Create Wholesale Account
        </LocalizedClientLink>
      </div>

      {/* Social Media */}
      <div>
        <h4 className="font-semibold text-gatherers-brown mb-3">Follow Us</h4>
        <div className="flex gap-4">
          <a
            href="https://www.gatherersgranola.com/website/social/facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gatherers-orange rounded-full flex items-center justify-center text-white hover:bg-gatherers-orange-dark transition-colors"
            aria-label="Facebook"
          >
            <span className="text-xl">f</span>
          </a>
          <a
            href="https://www.gatherersgranola.com/website/social/instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gatherers-orange rounded-full flex items-center justify-center text-white hover:bg-gatherers-orange-dark transition-colors"
            aria-label="Instagram"
          >
            <span className="text-xl">📷</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo


