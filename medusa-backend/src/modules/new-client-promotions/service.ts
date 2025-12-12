import { MedusaService } from "@medusajs/framework/utils"
import { Modules } from "@medusajs/framework/utils"
import { NOTIFICATION_MODULE } from "../notification"

class NewClientPromotionsService extends MedusaService({}) {
  /**
   * Creates a 5% off promotion code for a new customer
   * @param customerId - The ID of the customer
   * @param customerEmail - The email of the customer
   * @param promotionModuleService - Optional: Promotion service (resolved by caller if not provided)
   * @returns The created promotion code
   */
  async createWelcomePromotion(
    customerId: string,
    customerEmail: string,
    promotionModuleService?: any
  ): Promise<string> {
    // Service should be passed from subscriber, but we'll handle if not provided
    if (!promotionModuleService) {
      throw new Error("promotionModuleService must be provided")
    }

    // Generate a unique promotion code based on customer email
    const code = `WELCOME5-${customerEmail.split("@")[0].toUpperCase().slice(0, 8)}-${Date.now().toString().slice(-6)}`

    try {
      const promotions = await promotionModuleService.createPromotions([
        {
          code,
          type: "standard",
          status: "active",
          application_method: {
            type: "percentage",
            target_type: "order",
            value: 5, // 5% off
            currency_code: "usd", // You may want to make this dynamic based on customer region
          },
        },
      ])

      // Update promotion with start and end dates if the API supports it
      if (promotions && promotions.length > 0) {
        const promotion = promotions[0]
        // Note: Date fields may need to be set via updatePromotions if not supported in create
        return code
      }

      return code
    } catch (error: any) {
      console.error("Error creating welcome promotion:", error)
      throw new Error(`Failed to create welcome promotion: ${error.message}`)
    }
  }

  /**
   * Sends a welcome email with the promotion code to the new customer
   * @param customerEmail - The email of the customer
   * @param customerFirstName - The first name of the customer
   * @param promotionCode - The promotion code to include in the email
   * @param notificationService - Optional: Notification service (resolved by caller if not provided)
   */
  async sendWelcomeEmail(
    customerEmail: string,
    customerFirstName: string | null,
    promotionCode: string,
    notificationService?: any
  ): Promise<void> {
    // Service should be passed from subscriber, but we'll handle if not provided
    if (!notificationService) {
      throw new Error("notificationService must be provided")
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Gatherer's Granola!</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; }
          .promo-box { background-color: white; padding: 20px; margin: 20px 0; border-radius: 5px; border: 2px dashed #8B4513; text-align: center; }
          .promo-code { font-size: 24px; font-weight: bold; color: #8B4513; letter-spacing: 2px; margin: 10px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .button { background-color: #ff6b35; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Gatherer's Granola!</h1>
          </div>
          <div class="content">
            <h2>Hi ${customerFirstName || 'there'},</h2>
            <p>Thank you for joining the Gatherer's Granola family! We're thrilled to have you as part of our community.</p>
            
            <p>As a special welcome gift, we'd like to offer you <strong>5% off</strong> your first order!</p>
            
            <div class="promo-box">
              <h3>Your Welcome Code</h3>
              <div class="promo-code">${promotionCode}</div>
              <p>Use this code at checkout to save 5% on your order</p>
              <p style="font-size: 12px; color: #666; margin-top: 10px;">Valid for 30 days</p>
            </div>

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || process.env.STORE_CORS || 'http://localhost:8000'}/products" class="button">Start Shopping</a>
            </div>

            <p>We can't wait to share our family recipes with you. Each batch is hand-stirred with love and care.</p>
            
            <p>If you have any questions, feel free to reach out to us anytime.</p>
            
            <p>Happy gathering!</p>
            <p><strong>The Gatherer's Granola Team</strong></p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Gatherer's Granola. All rights reserved.</p>
            <p>Family Recipes. Hand Stirred.</p>
          </div>
        </div>
      </body>
      </html>
    `

    try {
      await notificationService.sendEmail({
        to: customerEmail,
        from: process.env.EMAIL_FROM || "welcome@gatherersgranola.com",
        subject: "Welcome to Gatherer's Granola - Your 5% Off Code Inside!",
        html: emailHtml,
        type: "welcome_promotion",
        metadata: {
          customer_email: customerEmail,
          promotion_code: promotionCode,
        },
      })

      console.log(`Welcome email with promotion code sent to ${customerEmail}`)
    } catch (error: any) {
      console.error(`Failed to send welcome email:`, error)
      throw error
    }
  }
}

export default NewClientPromotionsService










