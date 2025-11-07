import NewsletterSignup from "@modules/common/components/mailchimp-signup"

const OrginNewsletterSection = () => {
  return (
    <section className="section-container botanical-bg">
      <div className="content-container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-orgin-green/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-orgin-green-dark mb-4" style={{fontFamily: 'var(--font-playfair)'}}>
                Stay Rooted With Us
              </h2>
              <p className="text-lg text-orgin-earth-brown max-w-2xl mx-auto" style={{fontFamily: 'var(--font-bree)'}}>
                Join our community of organic food lovers. Get exclusive offers, 
                new flavor launches, sustainability updates, and tips for living an 
                earth-conscious lifestyle.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <NewsletterSignup
                variant="default"
                title=""
                description=""
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-orgin-earth-brown/70" style={{fontFamily: 'var(--font-bree)'}}>
                By subscribing, you&apos;re supporting organic agriculture and sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrginNewsletterSection

