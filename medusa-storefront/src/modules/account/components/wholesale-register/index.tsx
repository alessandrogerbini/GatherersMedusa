"use client"

import { useState } from "react"
import Input from "@modules/common/components/input"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import ErrorMessage from "@modules/checkout/components/error-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"
import { submitWholesaleApplication } from "@lib/data/wholesale"

const WholesaleRegister = () => {
  const [message, setMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)

    // First, create the account
    const signupResult = await signup(null, formData)

    // If signup returns a string, it's an error
    if (typeof signupResult === "string") {
      setMessage(signupResult)
      setIsSubmitting(false)
      return
    }

    // Account created successfully, now submit wholesale application
    const wholesaleData = {
      business_name: formData.get("company_name") as string,
      business_type: formData.get("business_type") as string,
      website: formData.get("website") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postal_code: formData.get("postal_code") as string,
      country: formData.get("country") as string || "US",
    }

    const wholesaleResult = await submitWholesaleApplication(wholesaleData)

    if (wholesaleResult.success) {
      setSuccess(true)
    } else {
      setMessage(
        wholesaleResult.error ||
          "Account created but wholesale application failed. Please apply again from your account page."
      )
    }

    setIsSubmitting(false)
  }

  if (success) {
    return (
      <div
        className="max-w-2xl mx-auto flex flex-col items-center"
        data-testid="wholesale-register-success"
      >
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-6 w-full">
          <div className="text-center mb-4">
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
              Application Submitted!
            </h2>
          </div>
          <p className="text-green-800 text-center mb-4">
            Your wholesale account has been created and your application has been
            submitted for review.
          </p>
          <p className="text-green-700 text-center text-sm">
            We&apos;ll review your application and notify you via email within 1-2
            business days.
          </p>
        </div>
        <LocalizedClientLink
          href="/account"
          className="inline-block px-6 py-3 bg-gatherers-orange text-white rounded-md hover:bg-gatherers-brown transition-colors font-medium"
        >
          Go to My Account
        </LocalizedClientLink>
      </div>
    )
  }

  return (
    <div
      className="max-w-2xl mx-auto flex flex-col items-center"
      data-testid="wholesale-register-page"
    >
      <h1 className="text-large-semi uppercase mb-6 text-center">
        Create Wholesale Account
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Create your wholesale account and apply for special pricing in one step.
      </p>
      <form className="w-full flex flex-col" onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
            Personal Information
          </h2>
          <div className="flex flex-col w-full gap-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First name"
                name="first_name"
                required
                autoComplete="given-name"
                data-testid="first-name-input"
              />
              <Input
                label="Last name"
                name="last_name"
                required
                autoComplete="family-name"
                data-testid="last-name-input"
              />
            </div>
            <Input
              label="Email"
              name="email"
              required
              type="email"
              autoComplete="email"
              data-testid="email-input"
            />
            <Input
              label="Phone"
              name="phone"
              required
              type="tel"
              autoComplete="tel"
              data-testid="phone-input"
            />
            <Input
              label="Password"
              name="password"
              required
              type="password"
              autoComplete="new-password"
              data-testid="password-input"
            />
          </div>
        </div>

        {/* Business Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
            Business Information
          </h2>
          <div className="flex flex-col w-full gap-y-4">
            <Input
              label="Company Name"
              name="company_name"
              required
              autoComplete="organization"
              data-testid="company-name-input"
            />
            <Input
              label="Business Type"
              name="business_type"
              required
              data-testid="business-type-input"
            />
            <Input
              label="Company Website"
              name="website"
              required
              type="url"
              data-testid="website-input"
            />
          </div>
        </div>

        {/* Business Address */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
            Business Address
          </h2>
          <div className="flex flex-col w-full gap-y-4">
            <Input
              label="Street Address"
              name="address"
              required
              autoComplete="street-address"
              data-testid="address-input"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                required
                autoComplete="address-level2"
                data-testid="city-input"
              />
              <Input
                label="State / Province"
                name="state"
                required
                autoComplete="address-level1"
                data-testid="state-input"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Postal Code"
                name="postal_code"
                required
                autoComplete="postal-code"
                data-testid="postal-code-input"
              />
              <Input
                label="Country"
                name="country"
                autoComplete="country-name"
                placeholder="US"
                data-testid="country-input"
              />
            </div>
          </div>
        </div>

        <ErrorMessage error={message} data-testid="register-error" />

        <span className="text-center text-ui-fg-base text-small-regular mt-4 mb-6">
          By creating an account, you agree to Gatherer's{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink href="/content/terms-of-use" className="underline">
            Terms of Use
          </LocalizedClientLink>
          .
        </span>

        <SubmitButton
          className="w-full mt-2"
          data-testid="wholesale-register-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Wholesale Account"}
        </SubmitButton>
      </form>

      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already have an account?{" "}
        <LocalizedClientLink href="/account" className="underline font-semibold">
          Sign in
        </LocalizedClientLink>
      </span>
    </div>
  )
}

export default WholesaleRegister

