"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"
import { Text, IconButton } from "@medusajs/ui"
import { CheckCircleMiniSolid, XCircleSolid } from "@medusajs/icons"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)
  const router = useRouter()
  const { countryCode } = useParams()
  const isSubmittingRef = useRef(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // If we submitted and message is null (no error), signup succeeded
    if (isSubmittingRef.current && message === null) {
      setShowSuccess(true)
      // Delay redirect to show success message
      const redirectTimer = setTimeout(() => {
        router.push(`/${countryCode}/account`)
        router.refresh()
        isSubmittingRef.current = false
      }, 2000) // 2 second delay to show success message
      
      return () => clearTimeout(redirectTimer)
    } else if (typeof message === 'string') {
      // If there's an error message, reset submission tracking
      isSubmittingRef.current = false
      setShowSuccess(false)
    }
  }, [message, router, countryCode])

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase mb-6">
        Become a Gatherer's Member
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        Create your Gatherer's Member profile, and get access to an enhanced
        shopping experience.
      </p>
      <form 
        className="w-full flex flex-col" 
        action={formAction}
        onSubmit={() => {
          isSubmittingRef.current = true
        }}
      >
        <div className="flex flex-col w-full gap-y-2">
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
        <ErrorMessage error={message} data-testid="register-error" />
        {showSuccess && (
          <div className="flex justify-between p-4 bg-neutral-50 shadow-borders-base w-full self-stretch items-center mt-4">
            <div className="flex gap-x-2 items-center">
              <CheckCircleMiniSolid className="w-4 h-4 text-emerald-500" />
              <div className="flex flex-col gap-y-1">
                <Text className="text-medium-plus text-neutral-950">
                  Account created successfully!
                </Text>
                <Text className="text-base-regular text-neutral-600">
                  Redirecting to your account...
                </Text>
              </div>
            </div>
            <IconButton
              variant="transparent"
              className="h-fit"
              onClick={() => setShowSuccess(false)}
            >
              <XCircleSolid className="w-4 h-4 text-neutral-500" />
            </IconButton>
          </div>
        )}
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          By creating an account, you agree to Gatherer's{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          Join
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default Register
