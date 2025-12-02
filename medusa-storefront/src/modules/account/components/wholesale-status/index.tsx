import { getWholesaleStatus } from "@lib/data/wholesale"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const WholesaleStatus = async () => {
  const wholesaleStatus = await getWholesaleStatus()

  if (!wholesaleStatus) {
    return null
  }

  const { wholesale_status, wholesale_application } = wholesaleStatus

  if (wholesale_status === "none") {
    return (
      <div
        className="bg-blue-50 border border-blue-200 rounded-lg p-6"
        data-testid="wholesale-status-none"
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Interested in Wholesale?
        </h3>
        <p className="text-blue-800 mb-4">
          Apply for a wholesale account to access special pricing and bulk
          ordering options.
        </p>
        <LocalizedClientLink
          href="/account/wholesale/apply"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply for Wholesale Account
        </LocalizedClientLink>
      </div>
    )
  }

  if (wholesale_status === "pending") {
    return (
      <div
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
        data-testid="wholesale-status-pending"
      >
        <h3 className="text-lg font-semibold text-yellow-900 mb-2">
          Application Under Review
        </h3>
        <p className="text-yellow-800 mb-2">
          Your wholesale application is being reviewed by our team.
        </p>
        {wholesale_application?.applied_at && (
          <p className="text-sm text-yellow-700">
            Applied on:{" "}
            {new Date(wholesale_application.applied_at).toLocaleDateString()}
          </p>
        )}
        <p className="text-sm text-yellow-700 mt-2">
          We&apos;ll contact you at your registered email address once
          we&apos;ve made a decision.
        </p>
      </div>
    )
  }

  if (wholesale_status === "approved") {
    return (
      <div
        className="bg-green-50 border border-green-200 rounded-lg p-6"
        data-testid="wholesale-status-approved"
      >
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          ✓ Wholesale Account Active
        </h3>
        <p className="text-green-800 mb-2">
          Your wholesale account is active! You now have access to wholesale
          pricing.
        </p>
        {wholesale_application?.business_name && (
          <p className="text-sm text-green-700">
            Business: {wholesale_application.business_name}
          </p>
        )}
        <div className="mt-4">
          <LocalizedClientLink
            href="/store"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Browse Products with Wholesale Pricing
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  if (wholesale_status === "rejected") {
    return (
      <div
        className="bg-red-50 border border-red-200 rounded-lg p-6"
        data-testid="wholesale-status-rejected"
      >
        <h3 className="text-lg font-semibold text-red-900 mb-2">
          Application Not Approved
        </h3>
        <p className="text-red-800 mb-2">
          Unfortunately, your wholesale application was not approved at this
          time.
        </p>
        {wholesale_application?.wholesale_rejection_reason && (
          <p className="text-sm text-red-700 mb-3">
            Reason: {wholesale_application.wholesale_rejection_reason}
          </p>
        )}
        <p className="text-sm text-red-700">
          If you have questions or would like to discuss this decision, please
          contact our support team.
        </p>
      </div>
    )
  }

  return null
}

export default WholesaleStatus

