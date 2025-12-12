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
    const { name, phone, email, company, subject, question } = req.body

    // Validate input
    if (!name || !email || !subject || !question) {
      return res.status(400).json({
        error: "All required fields must be filled in",
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
        <title>Thank You for Your Contract Manufacturing Inquiry</title>
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
            <h1>Thank You for Your Inquiry!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>We've received your contract manufacturing inquiry and we're excited to learn more about your project. Our team will review your request and get back to you as soon as possible, typically within 1-2 business days.</p>
            
            <div class="message-box">
              <h3>Your Inquiry Details:</h3>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Question:</strong></p>
              <p>${question.replace(/\n/g, '<br>')}</p>
            </div>

            <p>We're committed to helping you find the right manufacturing solution for your brand. If you have any urgent questions, feel free to reach out to us directly.</p>
            
            <p>Best regards,<br>The Gatherer's Granola Contract Manufacturing Team</p>
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
        <title>New Contract Manufacturing Inquiry</title>
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
            <h1>New Contract Manufacturing Inquiry</h1>
          </div>
          <div class="content">
            <div class="details">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Question:</strong></p>
              <p>${question.replace(/\n/g, '<br>')}</p>
            </div>
            <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send emails (if service available)
    if (notificationService) {
      try {
        // Send confirmation email to customer
        await notificationService.sendEmail({
          to: email,
          from: process.env.EMAIL_FROM || "info@gatherersgranola.com",
          subject: "Thank you for your contract manufacturing inquiry",
          html: customerEmailHtml,
          type: "contract_manufacturing_inquiry",
          metadata: {
            name,
            company: company || "",
            subject,
          },
        })
      } catch (emailError: any) {
        // If email_log table doesn't exist, log but don't fail
        if (emailError.message && emailError.message.includes("email_log")) {
          console.warn("Email log table not available, skipping email logging")
        } else {
          console.warn("Could not send customer email:", emailError.message)
        }
      }

      try {
        // Send notification to business
        await notificationService.sendEmail({
          to: process.env.CONTACT_EMAIL || process.env.CONTRACT_MANUFACTURING_EMAIL || "info@gatherersgranola.com",
          from: process.env.EMAIL_FROM || "info@gatherersgranola.com",
          subject: `New Contract Manufacturing Inquiry: ${subject}`,
          html: businessEmailHtml,
          type: "contract_manufacturing_notification",
          metadata: {
            customer_name: name,
            customer_email: email,
            customer_phone: phone || "",
            customer_company: company || "",
            subject,
          },
        })
      } catch (businessEmailError: any) {
        // Log but don't fail the request
        console.warn("Could not send business notification:", businessEmailError.message)
      }
    }

    res.status(200).json({
      success: true,
      message: "Thank you for your inquiry! We'll get back to you soon.",
    })
  } catch (error: any) {
    console.error("Contract manufacturing form error:", error)
    res.status(500).json({
      error: "Failed to send inquiry. Please try again later.",
    })
  }
}






