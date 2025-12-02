import { Metadata } from "next"
import WholesaleApplicationForm from "@modules/account/components/wholesale-application-form"

export const metadata: Metadata = {
  title: "Apply for Wholesale Account",
  description: "Apply for a wholesale account to access special pricing.",
}

export default function WholesaleApplicationPage() {
  return <WholesaleApplicationForm />
}

