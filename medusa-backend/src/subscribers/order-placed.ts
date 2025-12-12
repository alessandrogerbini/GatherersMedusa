import type {
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/framework"
import { NOTIFICATION_MODULE } from "../modules/notification"

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const orderId = data.id

  // Resolve the notification service
  const notificationService = container.resolve(NOTIFICATION_MODULE)
  
  // Get order details
  const orderModuleService = container.resolve("order")
  const order = await orderModuleService.retrieveOrder(orderId, {
    relations: ["items", "shipping_address", "billing_address"],
  })

  // Generate email HTML
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; }
        .order-details { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button { background-color: #ff6b35; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Order!</h1>
        </div>
        <div class="content">
          <h2>Hi ${order.shipping_address?.first_name || 'there'},</h2>
          <p>We've received your order and we're getting it ready. You'll receive another email when your order ships!</p>
          
          <div class="order-details">
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> ${order.display_id}</p>
            <p><strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
            <p><strong>Order Total:</strong> $${((order.total || 0) / 100).toFixed(2)}</p>
          </div>

          <div class="order-details">
            <h3>Shipping Address</h3>
            <p>
              ${order.shipping_address?.first_name} ${order.shipping_address?.last_name}<br>
              ${order.shipping_address?.address_1}<br>
              ${order.shipping_address?.address_2 ? order.shipping_address.address_2 + '<br>' : ''}
              ${order.shipping_address?.city}, ${order.shipping_address?.province} ${order.shipping_address?.postal_code}<br>
              ${order.shipping_address?.country_code?.toUpperCase()}
            </p>
          </div>

          <p>If you have any questions about your order, please don't hesitate to contact us.</p>
          
          <p>Thank you for choosing Gatherer's Granola!</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Gatherer's Granola. All rights reserved.</p>
          <p>Family Recipes. Hand Stirred.</p>
        </div>
      </div>
    </body>
    </html>
  `

  // Send confirmation email
  try {
    await notificationService.sendEmail({
      to: order.email,
      from: process.env.EMAIL_FROM || "orders@gatherersgranola.com",
      subject: `Order Confirmation - Order #${order.display_id}`,
      html: emailHtml,
      type: "order_confirmation",
      metadata: {
        order_id: order.id,
        order_display_id: order.display_id,
      },
    })

    console.log(`Order confirmation email sent for order ${order.display_id}`)
  } catch (error) {
    console.error(`Failed to send order confirmation email:`, error)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
















