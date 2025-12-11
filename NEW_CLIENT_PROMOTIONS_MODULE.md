# New Client Promotions Module

## Overview

The New Client Promotions module automatically rewards new customer signups with a 5% off coupon code that is emailed to them upon registration.

## Features

- **Automatic Promotion Creation**: When a new customer signs up, a unique 5% off promotion code is automatically generated
- **Welcome Email**: New customers receive a beautifully formatted welcome email containing their promotion code
- **30-Day Validity**: Promotion codes are valid for 30 days from creation
- **Unique Codes**: Each customer receives a unique promotion code based on their email and timestamp

## Module Structure

```
medusa-backend/src/modules/new-client-promotions/
├── index.ts          # Module definition and export
└── service.ts        # Service containing promotion creation and email logic
```

## Subscriber

The module uses a subscriber (`customer-created.ts`) that listens to the `customer.created` event:

```
medusa-backend/src/subscribers/customer-created.ts
```

## How It Works

1. **Customer Registration**: When a customer signs up through the storefront, Medusa emits a `customer.created` event
2. **Event Handler**: The `customer-created.ts` subscriber catches this event
3. **Promotion Creation**: The service creates a unique 5% off promotion code
4. **Email Delivery**: A welcome email is sent to the customer containing:
   - Personalized greeting
   - The promotion code
   - Instructions on how to use it
   - Link to start shopping

## Promotion Code Format

Promotion codes follow this format:
```
WELCOME5-{EMAIL_PREFIX}-{TIMESTAMP}
```

Example: `WELCOME5-JOHNDOE-123456`

## Configuration

The module is automatically registered in `medusa-config.ts`:

```typescript
modules: [
  {
    resolve: "./src/modules/new-client-promotions",
  },
]
```

## Environment Variables

The following environment variables are used (optional):

- `EMAIL_FROM`: Email address to send from (defaults to "welcome@gatherersgranola.com")
- `NEXT_PUBLIC_BASE_URL` or `STORE_CORS`: Storefront URL for email links (defaults to "http://localhost:8000")

## Email Template

The welcome email includes:
- Branded header with Gatherer's Granola styling
- Personalized greeting with customer's first name
- Prominent display of the promotion code
- Call-to-action button to start shopping
- 30-day validity notice
- Brand footer

## Error Handling

- If promotion creation fails, the error is logged but customer creation is not blocked
- If email sending fails, the error is logged but the promotion code is still created
- All errors are logged to the console for debugging

## Testing

To test the module:

1. Start the Medusa backend
2. Register a new customer account through the storefront
3. Check the console logs for confirmation messages
4. Verify the customer receives the welcome email with the promotion code
5. Test the promotion code at checkout

## Future Enhancements

Potential improvements:
- Support for multiple currencies
- Configurable discount percentage
- Configurable expiration period
- Admin dashboard to view sent promotions
- Analytics on promotion usage
- A/B testing for email templates










