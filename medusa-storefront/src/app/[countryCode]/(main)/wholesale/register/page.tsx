import { Metadata } from "next"
import WholesaleRegister from "@modules/account/components/wholesale-register"

export const metadata: Metadata = {
  title: "Create Wholesale Account - Gatherer's",
  description:
    "Create your wholesale account and apply for special pricing in one step.",
}

export default function WholesaleRegisterPage() {
  return (
    <div className="content-container py-12">
      <WholesaleRegister />
    </div>
  )
}

