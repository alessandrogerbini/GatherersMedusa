import { Metadata } from "next"
import { retrieveCustomer } from "@lib/data/customer"
import { getWholesaleStatus } from "@lib/data/wholesale"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import WholesaleApplicationForm from "@modules/account/components/wholesale-application-form"

export const metadata: Metadata = {
  title: "Wholesale - Gatherer's Granola",
  description:
    "Join our wholesale program and access special pricing for your business. Apply today or sign in to your wholesale account.",
}

export default async function WholesalePage() {
  const customer = await retrieveCustomer().catch(() => null)
  const wholesaleStatus = customer ? await getWholesaleStatus() : null

  // If not logged in, show sign in prompt and info
  if (!customer) {
    return (
      <div className="content-container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gatherers-brown mb-4">
              Wholesale Program
            </h1>
            <p className="text-xl text-gatherers-brown-light">
              Partner with Gatherer&apos;s Granola for your business
            </p>
          </div>

          {/* Account Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">
                New to Gatherer's?
              </h2>
              <p className="text-blue-800 mb-4 text-sm">
                Create a wholesale account with your business information to get
                started.
              </p>
              <LocalizedClientLink
                href="/wholesale/register"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Create Wholesale Account
              </LocalizedClientLink>
            </div>

            <div className="bg-gatherers-cream border border-gatherers-cream-dark rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gatherers-brown mb-3">
                Already Have an Account?
              </h2>
              <p className="text-gatherers-brown-light mb-4 text-sm">
                Sign in to apply for wholesale access or manage your wholesale
                account.
              </p>
              <LocalizedClientLink
                href="/account"
                className="inline-block px-6 py-2.5 bg-gatherers-orange text-white rounded-md hover:bg-gatherers-brown transition-colors font-medium text-sm"
              >
                Sign In to Your Account
              </LocalizedClientLink>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gatherers-brown mb-6">
              Wholesale Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gatherers-brown mb-2">
                    Wholesale Pricing
                  </h3>
                  <p className="text-sm text-gatherers-brown-light">
                    Access special wholesale pricing on all our products
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gatherers-brown mb-2">
                    Bulk Ordering
                  </h3>
                  <p className="text-sm text-gatherers-brown-light">
                    Convenient bulk ordering options for your business needs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gatherers-brown mb-2">
                    Priority Support
                  </h3>
                  <p className="text-sm text-gatherers-brown-light">
                    Dedicated support for all your wholesale needs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gatherers-brown mb-2">
                    Flexible Terms
                  </h3>
                  <p className="text-sm text-gatherers-brown-light">
                    Payment terms available for qualified businesses
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Who Should Apply */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              Who Should Apply?
            </h2>
            <p className="text-blue-800 mb-4">
              Our wholesale program is perfect for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-blue-700">
              <li>Cafés and Coffee Shops</li>
              <li>Restaurants and Hotels</li>
              <li>Specialty Food Retailers</li>
              <li>Health Food Stores</li>
              <li>Gift Shops and Tourist Locations</li>
              <li>Corporate Catering Services</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center bg-gatherers-brown text-white rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="mb-6 text-gatherers-cream">
              Create a wholesale account to begin your application
            </p>
            <LocalizedClientLink
              href="/wholesale/register"
              className="inline-block px-8 py-3 bg-gatherers-orange text-white rounded-md hover:bg-white hover:text-gatherers-brown transition-colors font-medium"
            >
              Create Wholesale Account
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    )
  }

  // If logged in but no wholesale status or status is "none", show application form
  if (!wholesaleStatus || wholesaleStatus.wholesale_status === "none") {
    return (
      <div className="content-container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gatherers-brown mb-4">
              Apply for Wholesale Access
            </h1>
            <p className="text-lg text-gatherers-brown-light">
              Welcome, {customer.first_name}! Complete the form below to apply for
              wholesale pricing.
            </p>
          </div>
          <WholesaleApplicationForm />
        </div>
      </div>
    )
  }

  // If pending, show pending status
  if (wholesaleStatus.wholesale_status === "pending") {
    return (
      <div className="content-container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gatherers-brown mb-4">
              Wholesale Application
            </h1>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-yellow-900 mb-4">
              Application Under Review
            </h2>
            <p className="text-yellow-800 mb-4">
              Thank you for your wholesale application! Our team is currently
              reviewing your submission.
            </p>
            {wholesaleStatus.wholesale_application?.applied_at && (
              <p className="text-sm text-yellow-700 mb-4">
                <strong>Applied on:</strong>{" "}
                {new Date(
                  wholesaleStatus.wholesale_application.applied_at
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
            {wholesaleStatus.wholesale_application?.business_name && (
              <p className="text-sm text-yellow-700 mb-4">
                <strong>Business:</strong>{" "}
                {wholesaleStatus.wholesale_application.business_name}
              </p>
            )}
            <p className="text-yellow-700">
              We typically review applications within 1-2 business days. You&apos;ll
              receive an email notification once your application has been processed.
            </p>
          </div>

          <div className="mt-8 text-center">
            <LocalizedClientLink
              href="/account"
              className="text-gatherers-orange hover:text-gatherers-brown underline"
            >
              ← Back to Account
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    )
  }

  // If approved, show success and shop link
  if (wholesaleStatus.wholesale_status === "approved") {
    return (
      <div className="content-container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gatherers-brown mb-4">
              Wholesale Account
            </h1>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <div className="text-center mb-6">
              <svg
                className="w-16 h-16 text-green-600 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-green-900 mb-2">
                Wholesale Account Active
              </h2>
            </div>
            <p className="text-green-800 text-center mb-6">
              Your wholesale account is active! You now have access to special
              wholesale pricing on all our products.
            </p>
            {wholesaleStatus.wholesale_application?.business_name && (
              <div className="bg-white rounded-md p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Business:</strong>{" "}
                  {wholesaleStatus.wholesale_application.business_name}
                </p>
                {wholesaleStatus.wholesale_application?.business_type && (
                  <p className="text-sm text-gray-700 mt-1">
                    <strong>Type:</strong>{" "}
                    {wholesaleStatus.wholesale_application.business_type}
                  </p>
                )}
              </div>
            )}
            <div className="flex justify-center gap-4">
              <LocalizedClientLink
                href="/store"
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Browse Products
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/account"
                className="inline-block px-6 py-3 bg-white border border-green-600 text-green-700 rounded-md hover:bg-green-50 transition-colors font-medium"
              >
                My Account
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // If rejected
  if (wholesaleStatus.wholesale_status === "rejected") {
    return (
      <div className="content-container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gatherers-brown mb-4">
              Wholesale Application
            </h1>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-red-900 mb-4">
              Application Status
            </h2>
            <p className="text-red-800 mb-4">
              Thank you for your interest in our wholesale program. Unfortunately,
              we&apos;re unable to approve your application at this time.
            </p>
            {wholesaleStatus.wholesale_application?.wholesale_rejection_reason && (
              <div className="bg-white rounded-md p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Reason:</strong>{" "}
                  {wholesaleStatus.wholesale_application.wholesale_rejection_reason}
                </p>
              </div>
            )}
            <p className="text-red-700 mb-6">
              If you have questions about this decision or would like to discuss your
              application, please contact our wholesale team.
            </p>
            <LocalizedClientLink
              href="/contact"
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
            >
              Contact Us
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    )
  }

  return null
}

