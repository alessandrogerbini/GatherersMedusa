import { isWholesaleCustomer } from "@lib/data/wholesale"

const WholesaleBadge = async () => {
  try {
    const isWholesale = await isWholesaleCustomer()

    if (!isWholesale) {
      return null
    }

    return (
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
        <svg
          className="w-4 h-4 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        Wholesale Pricing Active
      </div>
    )
  } catch (error) {
    // Silently fail - don't show badge if there's an error
    return null
  }
}

export default WholesaleBadge

