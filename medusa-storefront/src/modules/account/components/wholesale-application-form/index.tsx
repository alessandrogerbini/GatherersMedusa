"use client"

import { useState } from "react"
import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import ErrorMessage from "@modules/checkout/components/error-message"
import { submitWholesaleApplication } from "@lib/data/wholesale"

type FormState = {
  success: boolean
  message: string
  error?: string
} | null

const WholesaleApplicationForm = () => {
  const [formState, setFormState] = useState<FormState>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormState(null)

    const formData = new FormData(e.currentTarget)

    const data = {
      business_name: formData.get("business_name") as string,
      business_type: formData.get("business_type") as string,
      tax_id: formData.get("tax_id") as string,
      website: formData.get("website") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postal_code: formData.get("postal_code") as string,
      country: formData.get("country") as string,
      additional_info: formData.get("additional_info") as string,
    }

    const result = await submitWholesaleApplication(data)
    setFormState(result)
    setIsSubmitting(false)

    if (result.success) {
      // Reset form
      e.currentTarget.reset()
    }
  }

  return (
    <div className="w-full" data-testid="wholesale-application-form">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Apply for Wholesale Account</h1>
        <p className="text-base-regular">
          Fill out the form below to apply for a wholesale account. Once
          approved, you&apos;ll gain access to wholesale pricing and special
          ordering options.
        </p>
      </div>

      {formState?.success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800">{formState.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Business Name"
            name="business_name"
            required
            autoComplete="organization"
            data-testid="business-name-input"
          />
          <Input
            label="Business Type"
            name="business_type"
            required
            placeholder="e.g., Restaurant, Café, Retailer"
            data-testid="business-type-input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Tax ID / VAT Number"
            name="tax_id"
            placeholder="Optional"
            data-testid="tax-id-input"
          />
          <Input
            label="Website"
            name="website"
            type="url"
            placeholder="https://www.example.com"
            data-testid="website-input"
          />
        </div>

        <Input
          label="Business Phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          data-testid="phone-input"
        />

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Business Address</h3>
          <div className="flex flex-col gap-4">
            <Input
              label="Street Address"
              name="address"
              autoComplete="street-address"
              data-testid="address-input"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                autoComplete="address-level2"
                data-testid="city-input"
              />
              <Input
                label="State / Province"
                name="state"
                autoComplete="address-level1"
                data-testid="state-input"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Postal Code"
                name="postal_code"
                autoComplete="postal-code"
                data-testid="postal-code-input"
              />
              <Input
                label="Country"
                name="country"
                autoComplete="country-name"
                data-testid="country-input"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <label className="block text-sm font-medium mb-2">
            Additional Information
          </label>
          <textarea
            name="additional_info"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gatherers-orange"
            placeholder="Tell us more about your business and why you'd like a wholesale account..."
            data-testid="additional-info-input"
          />
        </div>

        {formState && !formState.success && (
          <ErrorMessage
            error={formState.error || formState.message}
            data-testid="wholesale-error"
          />
        )}

        <SubmitButton
          className="w-full md:w-auto"
          data-testid="submit-wholesale-application"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </SubmitButton>
      </form>
    </div>
  )
}

export default WholesaleApplicationForm

