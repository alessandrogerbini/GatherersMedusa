import { Metadata } from "next"
import WholesaleStatus from "@modules/account/components/wholesale-status"

export const metadata: Metadata = {
  title: "Wholesale Account",
  description: "Manage your wholesale account and access wholesale pricing.",
}

export default async function WholesalePage() {
  return <WholesaleStatus />
}

