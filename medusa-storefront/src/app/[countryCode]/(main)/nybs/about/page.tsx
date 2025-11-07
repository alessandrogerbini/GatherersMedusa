import { Metadata } from "next"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import NYBSNewsletterSection from "@modules/nybs/components/newsletter-signup"

export const metadata: Metadata = {
  title: "About NYBS - Our NYC Story | New York's Best Snacks",
  description:
    "Learn about NYBS, the snack brand born in the heart of New York City. Bold flavors, authentic attitude, and 100% NYC pride.",
}

export default async function NYBSAboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="newsprint-bg py-16 md:py-24">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <div className="tabloid-banner text-center mb-8">
              <p className="text-2xl md:text-3xl italic">SPECIAL EDITION</p>
            </div>
            
            <div className="bg-white border-8 border-nybs-black p-8 md:p-12">
              <div className="text-center mb-8">
                <Image
                  src="/images/brand/nybs/NYBS header.png"
                  alt="NYBS"
                  width={600}
                  height={150}
                  className="w-full max-w-xl mx-auto mb-6"
                />
                <div className="border-y-4 border-nybs-black py-4">
                  <h1 className="nybs-heading-section">
                    THE NYBS STORY:
                    <br />
                    BORN IN NYC
                  </h1>
                </div>
              </div>

              <div className="space-y-6 nybs-text-body">
                <p className="text-xl font-bold first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:text-nybs-red">
                  It started with a simple observation: New Yorkers are impossible to please when it comes to food. 
                  We grew up with the best bagels, pizza, and deli sandwiches on every corner. Our standards? Sky high. 
                  Our patience for mediocre food? Nonexistent.
                </p>

                <p>
                  So when we looked at the snack aisle and saw bland, boring options marketed as "bold," we knew 
                  something had to change. If anyone was going to make snacks with real attitude and authentic flavor, 
                  it had to be New Yorkers.
                </p>

                <p>
                  And that&apos;s exactly what we did.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Mission Section */}
      <section className="section-container bg-white">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <div className="newsprint-card p-8 md:p-12">
              <h2 className="nybs-heading-section text-center mb-8">OUR MISSION</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border-l-4 border-nybs-red pl-6">
                  <h3 className="font-black uppercase text-2xl mb-4">Authentic Flavor</h3>
                  <p className="nybs-text-body mb-4">
                    Every NYBS flavor is inspired by real New York City foods and experiences. We&apos;re not 
                    making this up for marketing – these are the tastes we actually eat and love.
                  </p>
                  <p className="nybs-text-body">
                    From Everything Bagel to Pizza Party, each snack captures something essential about 
                    NYC food culture. No gimmicks, no fake flavors, just the real deal.
                  </p>
                </div>

                <div className="border-l-4 border-nybs-red pl-6">
                  <h3 className="font-black uppercase text-2xl mb-4">Real Attitude</h3>
                  <p className="nybs-text-body mb-4">
                    We&apos;re New Yorkers. We&apos;re confident, direct, and we know what we bring to the table. 
                    That same energy goes into every bag.
                  </p>
                  <p className="nybs-text-body">
                    We don&apos;t apologize for being bold. We don&apos;t tone it down for anyone. If you want 
                    subtle, there&apos;s plenty of other options. If you want NYC? You found it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-container newsprint-bg">
        <div className="content-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="nybs-heading-section text-center mb-12">WHAT WE STAND FOR</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border-4 border-nybs-black p-6 text-center">
                <span className="text-6xl font-black block mb-4 text-nybs-red">★</span>
                <h3 className="font-black uppercase text-xl mb-3">NYC PRIDE</h3>
                <p className="text-sm font-bold">
                  We&apos;re proud of where we&apos;re from. New York shaped our taste, our standards, 
                  and our attitude. That pride shows in every product.
                </p>
              </div>

              <div className="bg-white border-4 border-nybs-black p-6 text-center">
                <span className="text-6xl font-black block mb-4 text-nybs-red">★</span>
                <h3 className="font-black uppercase text-xl mb-3">NO COMPROMISE</h3>
                <p className="text-sm font-bold">
                  We don&apos;t cut corners. If it&apos;s not up to our standards (which are high), 
                  it doesn&apos;t leave our kitchen.
                </p>
              </div>

              <div className="bg-white border-4 border-nybs-black p-6 text-center">
                <span className="text-6xl font-black block mb-4 text-nybs-red">★</span>
                <h3 className="font-black uppercase text-xl mb-3">BOLD EVERYTHING</h3>
                <p className="text-sm font-bold">
                  From flavor to packaging to attitude – we go all in. Life&apos;s too short 
                  for boring snacks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-container bg-white">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-nybs-black text-white border-4 border-nybs-red p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-6">
                MADE BY NEW YORKERS,
                <br />
                FOR EVERYONE
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Our team is 100% NYC natives who take snacks (and pizza arguments) very seriously. 
                We test every flavor until it&apos;s perfect. Our standards are high because yours should be too.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-bold">
                <span className="bg-white text-nybs-black px-6 py-2">Manhattan</span>
                <span className="bg-white text-nybs-black px-6 py-2">Brooklyn</span>
                <span className="bg-white text-nybs-black px-6 py-2">Queens</span>
                <span className="bg-white text-nybs-black px-6 py-2">Bronx</span>
                <span className="bg-white text-nybs-black px-6 py-2">Staten Island</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container newsprint-bg">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="newsprint-card p-8 md:p-12">
              <h2 className="nybs-heading-section mb-6">
                READY TO TASTE
                <br />
                THE DIFFERENCE?
              </h2>
              <p className="text-xl font-bold mb-8 text-nybs-black-ink">
                Join thousands of snack lovers who already know: NYBS hits different.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LocalizedClientLink href="/store">
                  <button className="btn-nybs-primary text-lg px-10 py-4 w-full sm:w-auto">
                    Shop Now
                  </button>
                </LocalizedClientLink>
                <LocalizedClientLink href="/contact">
                  <button className="btn-nybs-secondary text-lg px-10 py-4 w-full sm:w-auto">
                    Contact Us
                  </button>
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NYBSNewsletterSection />
    </>
  )
}

