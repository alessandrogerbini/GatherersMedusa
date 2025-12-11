import { MedusaService } from "@medusajs/framework/utils"
import EmailLog from "./models/email-log"

class NotificationModuleService extends MedusaService({
  EmailLog,
}) {
  async sendEmail(data: {
    to: string
    from: string
    subject: string
    html: string
    type: string
    metadata?: any
  }) {
    try {
      // In a production environment, you would integrate with an email service
      // like SendGrid, Mailgun, AWS SES, etc.
      // For now, we'll log the email and mark it as sent
      
      console.log("=== EMAIL NOTIFICATION ===")
      console.log(`To: ${data.to}`)
      console.log(`From: ${data.from}`)
      console.log(`Subject: ${data.subject}`)
      console.log(`Type: ${data.type}`)
      console.log(`HTML: ${data.html}`)
      console.log("=========================")

      // Log the email
      const emailLog = await this.createEmailLogs({
        to: data.to,
        from: data.from,
        subject: data.subject,
        type: data.type,
        status: "sent",
        metadata: data.metadata || {},
      })

      return emailLog
    } catch (error: any) {
      // Log the error
      const emailLog = await this.createEmailLogs({
        to: data.to,
        from: data.from,
        subject: data.subject,
        type: data.type,
        status: "failed",
        error_message: error.message,
        metadata: data.metadata || {},
      })

      throw error
    }
  }
}

export default NotificationModuleService
















