import type {
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/framework"
import { NEW_CLIENT_PROMOTIONS_MODULE } from "../modules/new-client-promotions"
import { Modules } from "@medusajs/framework/utils"
import { NOTIFICATION_MODULE } from "../modules/notification"

export default async function customerCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const customerId = data.id

  try {
    // Resolve services
    const customerModuleService = container.resolve(Modules.CUSTOMER)
    const newClientPromotionsService = container.resolve(NEW_CLIENT_PROMOTIONS_MODULE)
    const promotionModuleService = container.resolve(Modules.PROMOTION)
    const notificationService = container.resolve(NOTIFICATION_MODULE)

    // Retrieve customer details
    const customer = await customerModuleService.retrieveCustomer(customerId, {
      select: ["id", "email", "first_name", "last_name"],
    })

    // Skip if customer email is not available
    if (!customer.email) {
      console.warn(`Customer ${customerId} created without email, skipping welcome promotion`)
      return
    }

    console.log(`Processing welcome promotion for new customer: ${customer.email}`)

    // Create the 5% off promotion code (pass promotion service)
    const promotionCode = await newClientPromotionsService.createWelcomePromotion(
      customer.id,
      customer.email,
      promotionModuleService
    )

    // Send welcome email with the promotion code (pass notification service)
    await newClientPromotionsService.sendWelcomeEmail(
      customer.email,
      customer.first_name || null,
      promotionCode,
      notificationService
    )

    console.log(`Welcome promotion created and email sent for customer ${customer.email}`)
  } catch (error: any) {
    console.error(`Failed to process welcome promotion for customer ${customerId}:`, error)
    // Don't throw - we don't want to block customer creation if promotion fails
  }
}

export const config: SubscriberConfig = {
  event: "customer.created",
}











