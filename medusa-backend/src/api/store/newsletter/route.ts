import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const { email } = req.body

    // Validate input
    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      })
    }

    // Basic email validation
    if (!email.includes("@")) {
      return res.status(400).json({
        error: "Invalid email address",
      })
    }

    // Resolve the notification service
    const notificationService = req.scope.resolve("notificationModuleService")

    // Send confirmation email to subscriber
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Our Newsletter!</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #8B4513; color: white; padding: 30px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; }
          .welcome-box { background-color: white; padding: 20px; margin: 20px 0; border-radius: 5px; text-align: center; }
          .benefits { background-color: white; padding: 20px; margin: 20px 0; border-radius: 5px; }
          .benefit-item { margin: 10px 0; padding-left: 25px; position: relative; }
          .benefit-item:before { content: "✓"; position: absolute; left: 0; color: #ff6b35; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .discount-code { background-color: #ff6b35; color: white; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to the Family!</h1>
          </div>
          <div class="content">
            <div class="welcome-box">
              <h2>Thank You for Subscribing!</h2>
              <p>You're now part of the Gatherer's Granola community and will be the first to know about:</p>
            </div>
            
            <div class="benefits">
              <div class="benefit-item">New product launches and flavors</div>
              <div class="benefit-item">Exclusive subscriber-only discounts</div>
              <div class="benefit-item">Behind-the-scenes stories</div>
              <div class="benefit-item">Special promotions and giveaways</div>
              <div class="benefit-item">Recipes and snack inspiration</div>
            </div>

            <div class="discount-code">
              <p style="margin: 0; font-size: 14px;">Use code at checkout:</p>
              <p style="margin: 5px 0;">WELCOME10</p>
              <p style="margin: 0; font-size: 14px;">for 10% off your first order!</p>
            </div>

            <p style="text-align: center;">We can't wait to share our journey with you!</p>
            
            <p style="text-align: center;">Best regards,<br>The Gatherer's Granola Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Gatherer's Granola. All rights reserved.</p>
            <p>Family Recipes. Hand Stirred.</p>
            <p style="font-size: 10px; margin-top: 10px;">
              You're receiving this email because you signed up for our newsletter.<br>
              Don't want these emails? You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send notification to business
    const businessNotificationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Newsletter Subscriber</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #333; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Newsletter Subscriber</h1>
          </div>
          <div class="content">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subscribed on:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send confirmation email to subscriber
    await notificationService.sendEmail({
      to: email,
      from: process.env.EMAIL_FROM || "newsletter@gatherersgranola.com",
      subject: "Welcome to Gatherer's Granola Newsletter! 🎉",
      html: confirmationEmailHtml,
      type: "newsletter_signup",
      metadata: {
        email,
      },
    })

    // Send notification to business
    await notificationService.sendEmail({
      to: process.env.NEWSLETTER_NOTIFICATION_EMAIL || "info@gatherersgranola.com",
      from: process.env.EMAIL_FROM || "newsletter@gatherersgranola.com",
      subject: "New Newsletter Subscriber",
      html: businessNotificationHtml,
      type: "newsletter_signup_notification",
      metadata: {
        subscriber_email: email,
      },
    })

    res.status(200).json({
      success: true,
      message: "You're subscribed! Check your inbox for a welcome email.",
    })
  } catch (error: any) {
    console.error("Newsletter signup error:", error)
    res.status(500).json({
      error: "Failed to subscribe. Please try again later.",
    })
  }
}


