import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Playfair_Display, Bree_Serif, Bangers, IBM_Plex_Sans_Condensed, Fraunces, DM_Sans } from "next/font/google"
import "styles/globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const breeSerif = Bree_Serif({
  subsets: ["latin"],
  variable: "--font-bree",
  weight: ["400"],
})

const bangers = Bangers({
  subsets: ["latin"],
  variable: "--font-bangers",
  weight: ["400"],
})

const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  variable: "--font-ibm-plex-condensed",
  weight: ["200", "400", "600"],
})

// Gatherer's Granola brand fonts
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={`${playfairDisplay.variable} ${breeSerif.variable} ${bangers.variable} ${ibmPlexSansCondensed.variable} ${fraunces.variable} ${dmSans.variable}`}>
      <body className="font-dm-sans">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
