# Mailchimp Newsletter Integration Setup

This storefront includes a newsletter subscription feature integrated with Mailchimp.

## Required Environment Variables

Add the following variables to your `.env.local` file in the `medusa-storefront` directory:

```env
# Mailchimp Configuration
MAILCHIMP_API_KEY=your_mailchimp_api_key_here
MAILCHIMP_AUDIENCE_ID=your_audience_id_here
MAILCHIMP_SERVER_PREFIX=us1
```

## Getting Your Mailchimp Credentials

### 1. API Key
1. Log in to your Mailchimp account
2. Go to **Account** → **Extras** → **API keys**
3. Create a new API key or copy an existing one
4. Add it to your `.env.local` as `MAILCHIMP_API_KEY`

### 2. Audience ID
1. In Mailchimp, go to **Audience** → **All contacts**
2. Click **Settings** → **Audience name and defaults**
3. Look for **Audience ID** in the right sidebar
4. Add it to your `.env.local` as `MAILCHIMP_AUDIENCE_ID`

### 3. Server Prefix
1. Look at your Mailchimp dashboard URL
2. It will be something like: `https://us1.admin.mailchimp.com/...`
3. The server prefix is the part before `.admin.mailchimp.com` (e.g., `us1`, `us2`, `us19`, etc.)
4. Add it to your `.env.local` as `MAILCHIMP_SERVER_PREFIX`

## Usage

The newsletter signup component is available in two variants:

### Default Variant (Full Featured)
```tsx
import NewsletterSignup from "@modules/common/components/mailchimp-signup"

<NewsletterSignup 
  title="Join Our Community"
  description="Sign up for exclusive recipes and special offers."
/>
```

### Compact Variant (For Footer/Sidebar)
```tsx
import NewsletterSignup from "@modules/common/components/mailchimp-signup"

<NewsletterSignup 
  variant="compact"
  title="Newsletter"
/>
```

## Features

- Email validation
- GDPR-compliant consent checkbox
- Success/error messaging
- Handles duplicate subscriptions
- Loading states
- Responsive design
- Brand-consistent styling

## Troubleshooting

### "Newsletter service is not configured"
- Check that all three environment variables are set in `.env.local`
- Restart your Next.js development server after adding the variables

### "Member Exists"
- The email is already subscribed to your list
- This is a normal response and doesn't indicate an error

### API Key Issues
- Make sure you're using a valid Mailchimp API key
- Check that the key has the necessary permissions
- Verify the server prefix matches your account

## Testing

To test without a real Mailchimp account, you can temporarily modify the API route to return mock responses. However, for production use, you'll need valid Mailchimp credentials.

## Security Note

Never commit your `.env.local` file to version control. The `.env.local.example` file is provided for reference only.


