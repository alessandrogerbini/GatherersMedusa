import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Playfair_Display, Bree_Serif, Bangers } from "next/font/google"
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

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={`${playfairDisplay.variable} ${breeSerif.variable} ${bangers.variable}`}>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
