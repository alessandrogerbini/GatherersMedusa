import NewsletterSignup from "@modules/common/components/mailchimp-signup"

const NewsletterSection = () => {
  return (
    <section className="section-container bg-white">
      <div className="content-container">
        <div className="max-w-4xl mx-auto bg-gatherers-cream rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="flex flex-col items-center">
            <NewsletterSignup
              title="Stay Connected"
              description="Get exclusive recipes, special offers, and updates delivered straight to your inbox. Join the Gatherer's family today!"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection


