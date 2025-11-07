import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      )
    }

    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
    const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
    const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_SERVER_PREFIX) {
      console.error("Mailchimp environment variables are not configured")
      return NextResponse.json(
        { error: "Newsletter service is not configured. Please contact support." },
        { status: 500 }
      )
    }

    const data = {
      email_address: email,
      status: "subscribed",
    }

    const response = await fetch(
      `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      // Handle already subscribed
      if (result.title === "Member Exists") {
        return NextResponse.json(
          { error: "You're already subscribed to our newsletter!" },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { error: result.detail || "Something went wrong. Please try again." },
        { status: response.status }
      )
    }

    return NextResponse.json(
      { message: "Successfully subscribed to our newsletter!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    )
  }
}


