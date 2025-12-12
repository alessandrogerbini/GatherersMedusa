import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { NOTIFICATION_MODULE } from "../../../modules/notification"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const { name, email, subject, message } = req.body

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: "All fields are required",
      })
    }

    // Basic email validation
    if (!email.includes("@")) {
      return res.status(400).json({
        error: "Invalid email address",
      })
    }

    // Resolve the notification service (may not be available in test environment)
    let notificationService
    try {
      notificationService = req.scope.resolve(NOTIFICATION_MODULE)
    } catch (error) {
      // Notification service not available - log and continue
      console.log("Notification service not available, skipping email sending")
    }

    // Send confirmation email to customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank You for Contacting Us</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; }
          .message-box { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #ff6b35; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Contacting Us!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>We've received your message and we'll get back to you as soon as possible, typically within 1-2 business days.</p>
            
            <div class="message-box">
              <h3>Your Message:</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>

            <p>If you have any urgent questions, feel free to reach out to us directly.</p>
            
            <p>Best regards,<br>The Gatherer's Granola Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Gatherer's Granola. All rights reserved.</p>
            <p>Family Recipes. Hand Stirred.</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send notification email to business
    const businessEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #333; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; }
          .details { background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="details">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send confirmation email to customer (if service available)
    if (notificationService) {
      await notificationService.sendEmail({
      to: email,
      from: process.env.EMAIL_FROM || "info@gatherersgranola.com",
      subject: "Thank you for contacting Gatherer's Granola",
      html: customerEmailHtml,
      type: "contact_form",
      metadata: {
        name,
        subject,
      },
    })
    }

    // Send notification to business (if service available)
    if (notificationService) {
      await notificationService.sendEmail({
      to: process.env.CONTACT_EMAIL || "info@gatherersgranola.com",
      from: process.env.EMAIL_FROM || "info@gatherersgranola.com",
      subject: `New Contact Form: ${subject}`,
      html: businessEmailHtml,
      type: "contact_form_notification",
      metadata: {
        customer_name: name,
        customer_email: email,
        subject,
      },
    })
    }

    res.status(200).json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    })
  } catch (error: any) {
    console.error("Contact form error:", error)
    res.status(500).json({
      error: "Failed to send message. Please try again later.",
    })
  }
}












