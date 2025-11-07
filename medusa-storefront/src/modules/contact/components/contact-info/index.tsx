const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gatherers-brown mb-6">
          Get in Touch
        </h3>
        <p className="text-body mb-6">
          Have a question, feedback, or wholesale inquiry? We&apos;d love to hear from you! 
          Fill out the form or reach us through any of the methods below.
        </p>
      </div>

      <div className="space-y-6">
        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gatherers-orange rounded-lg flex items-center justify-center">
            <span className="text-2xl text-white">✉️</span>
          </div>
          <div>
            <h4 className="font-semibold text-gatherers-brown mb-1">Email Us</h4>
            <a
              href="mailto:hello@gatherersgranola.com"
              className="text-gatherers-orange hover:text-gatherers-orange-dark transition-colors"
            >
              hello@gatherersgranola.com
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gatherers-green rounded-lg flex items-center justify-center">
            <span className="text-2xl text-white">📞</span>
          </div>
          <div>
            <h4 className="font-semibold text-gatherers-brown mb-1">Call Us</h4>
            <a
              href="tel:+1234567890"
              className="text-gatherers-orange hover:text-gatherers-orange-dark transition-colors"
            >
              (123) 456-7890
            </a>
            <p className="text-sm text-gatherers-brown-light mt-1">
              Mon-Fri: 9am - 5pm EST
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gatherers-brown rounded-lg flex items-center justify-center">
            <span className="text-2xl text-white">📍</span>
          </div>
          <div>
            <h4 className="font-semibold text-gatherers-brown mb-1">Visit Us</h4>
            <p className="text-gatherers-brown-light">
              [Your Address]<br />
              [City, State ZIP]<br />
              United States
            </p>
          </div>
        </div>
      </div>

      {/* Wholesale Inquiry */}
      <div className="mt-8 p-6 bg-gatherers-cream rounded-lg border-2 border-gatherers-orange/20">
        <h4 className="text-lg font-bold text-gatherers-brown mb-2 flex items-center gap-2">
          <span>🏪</span> Wholesale Inquiries
        </h4>
        <p className="text-sm text-gatherers-brown-light mb-3">
          Interested in carrying Gatherer&apos;s Granola in your store? We&apos;d love to partner with you!
        </p>
        <a
          href="mailto:wholesale@gatherersgranola.com"
          className="text-gatherers-orange hover:text-gatherers-orange-dark transition-colors font-semibold"
        >
          wholesale@gatherersgranola.com
        </a>
      </div>

      {/* Social Media */}
      <div>
        <h4 className="font-semibold text-gatherers-brown mb-3">Follow Us</h4>
        <div className="flex gap-4">
          <a
            href="#"
            className="w-10 h-10 bg-gatherers-orange rounded-full flex items-center justify-center text-white hover:bg-gatherers-orange-dark transition-colors"
            aria-label="Facebook"
          >
            <span className="text-xl">f</span>
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-gatherers-orange rounded-full flex items-center justify-center text-white hover:bg-gatherers-orange-dark transition-colors"
            aria-label="Instagram"
          >
            <span className="text-xl">📷</span>
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-gatherers-orange rounded-full flex items-center justify-center text-white hover:bg-gatherers-orange-dark transition-colors"
            aria-label="Twitter"
          >
            <span className="text-xl">🐦</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo


