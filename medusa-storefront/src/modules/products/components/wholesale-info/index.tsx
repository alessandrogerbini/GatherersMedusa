import { getWholesaleStatus } from "@lib/data/wholesale"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const WholesaleInfo = async () => {
  const status = await getWholesaleStatus()

  if (!status || status.wholesale_status === "approved") {
    // If approved, they already see wholesale prices, no message needed
    return null
  }

  if (status.wholesale_status === "none") {
    return (
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800 mb-2">
          <strong>Looking for wholesale pricing?</strong>
        </p>
        <p className="text-sm text-blue-700 mb-3">
          Apply for a wholesale account to access special pricing and bulk
          ordering options.
        </p>
        <LocalizedClientLink
          href="/account/wholesale/apply"
          className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
        >
          Apply for Wholesale Account →
        </LocalizedClientLink>
      </div>
    )
  }

  if (status.wholesale_status === "pending") {
    return (
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-sm text-yellow-800">
          <strong>Your wholesale application is under review.</strong>
        </p>
        <p className="text-sm text-yellow-700 mt-1">
          Once approved, you&apos;ll see wholesale pricing on all products.
        </p>
      </div>
    )
  }

  return null
}

export default WholesaleInfo

