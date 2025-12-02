# Email Confirmation System Setup Guide

This document explains the email confirmation system that has been implemented for your Gatherer's Granola website.

## Overview

Email confirmations have been set up for:
1. **Order Placements** - Customers receive an order confirmation email when they complete a purchase
2. **Contact Form Submissions** - Customers receive a confirmation when they submit the contact form
3. **Newsletter Signups** - Subscribers receive a welcome email when they join the newsletter

Additionally, a newsletter opt-in link has been added to the footer on all pages.

## What's Been Implemented

### Backend Components

#### 1. Notification Module (`medusa-backend/src/modules/notification/`)
- **Purpose**: Handles all email sending functionality
- **Components**:
  - `models/email-log.ts` - Database model to track sent emails
  - `service.ts` - Service for sending emails and logging
  - `index.ts` - Module definition

#### 2. Order Placed Subscriber (`medusa-backend/src/subscribers/order-placed.ts`)
- **Purpose**: Automatically sends order confirmation emails when orders are placed
- **Event**: Listens to `order.placed` event
- **Email Content**: Includes order details, shipping address, order total

#### 3. Contact Form API (`medusa-backend/src/api/store/contact/route.ts`)
- **Endpoint**: `POST /api/store/contact`
- **Purpose**: Handles contact form submissions and sends confirmation emails
- **Emails Sent**:
  - Confirmation to customer
  - Notification to business email

#### 4. Newsletter Signup API (`medusa-backend/src/api/store/newsletter/route.ts`)
- **Endpoint**: `POST /api/store/newsletter`
- **Purpose**: Handles newsletter signups and sends welcome emails
- **Emails Sent**:
  - Welcome email to subscriber (includes WELCOME10 discount code)
  - Notification to business email

### Frontend Components

#### 1. Updated Contact Form (`medusa-storefront/src/modules/contact/components/contact-form/index.tsx`)
- Now sends data to `/api/store/contact` endpoint
- Displays success/error messages to users

#### 2. Updated Newsletter Signup (`medusa-storefront/src/modules/nybs/components/newsletter-signup/index.tsx`)
- Now sends data to `/api/store/newsletter` endpoint
- Used in NYBS pages

#### 3. Newsletter Signup Page (`medusa-storefront/src/app/[countryCode]/(main)/newsletter/page.tsx`)
- Dedicated page for newsletter signups
- Shows benefits of subscribing
- Includes testimonials

#### 4. Newsletter Signup Form Component (`medusa-storefront/src/modules/newsletter/components/newsletter-signup-form/index.tsx`)
- Reusable component for newsletter signups
- Can be used on any page

#### 5. Updated Footer (`medusa-storefront/src/modules/layout/templates/footer/index.tsx`)
- Added newsletter opt-in link in the Account section
- Added newsletter subscription link in the bottom section

## Current Setup (Development)

Currently, the email system **logs emails to the console** instead of actually sending them. This is intentional for development purposes.

### What Happens Now:
1. When an email is "sent", it's logged to the console with all details
2. Email records are saved to the database with status "sent"
3. Users see success messages on the frontend

### Email Logs Format:
```
=== EMAIL NOTIFICATION ===
To: customer@example.com
From: info@gatherersgranola.com
Subject: Order Confirmation - Order #1234
Type: order_confirmation
HTML: [full HTML content]
=========================
```

## Production Setup (Required Steps)

To actually send emails in production, you'll need to:

### 1. Choose an Email Service Provider

Popular options:
- **SendGrid** - Reliable, good free tier
- **Mailgun** - Developer-friendly
- **AWS SES** - Cost-effective for high volume
- **Postmark** - Great for transactional emails
- **Mailchimp Transactional** (formerly Mandrill)

### 2. Install Email Service Package

For example, with SendGrid:
```bash
cd medusa-backend
npm install @sendgrid/mail
```

### 3. Add Environment Variables

Add to `medusa-backend/.env`:
```env
# Email Configuration
EMAIL_FROM=noreply@gatherersgranola.com
CONTACT_EMAIL=info@gatherersgranola.com
NEWSLETTER_NOTIFICATION_EMAIL=newsletter@gatherersgranola.com

# SendGrid (or your chosen provider)
SENDGRID_API_KEY=your_api_key_here
```

### 4. Update the Notification Service

Edit `medusa-backend/src/modules/notification/service.ts`:

```typescript
import { MedusaService } from "@medusajs/framework/utils"
import EmailLog from "./models/email-log"
import sgMail from "@sendgrid/mail" // Add this

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
      // Initialize SendGrid
      sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

      // Send the email
      await sgMail.send({
        to: data.to,
        from: data.from,
        subject: data.subject,
        html: data.html,
      })

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
```

## Email Templates

All email templates use inline HTML with styling. They include:

### Order Confirmation Email
- Branded header with company colors
- Order details (order number, date, total)
- Shipping address
- Professional footer

### Contact Form Confirmation Email
- Thanks the customer for contacting
- Shows their submitted message
- Professional branded design

### Newsletter Welcome Email
- Warm welcome message
- List of benefits
- **WELCOME10 discount code** (10% off first order)
- Unsubscribe information

## Testing

### Development Testing
1. Start the backend: `npm run dev` (in medusa-backend)
2. Start the frontend: `npm run dev` (in medusa-storefront)
3. Check console logs for email output

### Production Testing
1. Set up test email addresses
2. Complete test transactions
3. Verify emails are received
4. Check email deliverability and spam scores

## Customization

### Changing Email Design
Edit the HTML templates in:
- `medusa-backend/src/subscribers/order-placed.ts` - Order emails
- `medusa-backend/src/api/store/contact/route.ts` - Contact form emails
- `medusa-backend/src/api/store/newsletter/route.ts` - Newsletter emails

### Adding More Email Types
1. Create new email type in the service
2. Add new subscriber or API endpoint
3. Define email template
4. Update email log types

### Newsletter Integration
For advanced newsletter features:
- Consider integrating with Mailchimp, ConvertKit, or similar
- Use their API in the newsletter signup endpoint
- Keep the confirmation email functionality

## Monitoring

The `email_log` table in your database tracks:
- All sent emails
- Status (sent/failed)
- Error messages (if any)
- Metadata (order IDs, etc.)

Query this table to:
- Monitor email delivery
- Debug issues
- Track email history

## Support

If you encounter issues:
1. Check console logs for error messages
2. Verify environment variables are set
3. Test email service credentials
4. Check email_log table for failed emails
5. Verify CORS settings allow API calls

## Newsletter Opt-in Locations

The newsletter signup is now available at:
1. **Footer** - Every page has a newsletter link
2. **Dedicated Page** - `/newsletter` with full signup form
3. **NYBS Pages** - Newsletter section with brand-specific styling
4. **Contact Page** - Can be added if desired

All forms send confirmation emails to subscribers.

## Important Notes

- ✅ Email logs are saved to database for audit trail
- ✅ All emails use responsive HTML design
- ✅ Privacy notice included in newsletter emails
- ✅ Error handling implemented for all email sending
- ⚠️ Remember to verify your sending domain with your email provider
- ⚠️ Set up SPF and DKIM records for better deliverability
- ⚠️ Test thoroughly before going live

## Next Steps

1. Choose and set up an email service provider
2. Configure environment variables
3. Update the notification service with actual email sending
4. Test all email flows
5. Monitor delivery rates
6. Consider adding email templates in a design tool like Beefree or Mailchimp

---

**Need Help?** If you need assistance with any of these steps, consult your email service provider's documentation or reach out for support.


