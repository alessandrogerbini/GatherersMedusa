# Wholesale Accounts System Guide

## Overview

The wholesale accounts system allows businesses to apply for special wholesale pricing and access. This system includes:

1. **Customer application process** - Customers can apply for wholesale accounts
2. **Admin review & approval** - Admins can review and approve/reject applications
3. **Wholesale pricing** - Approved customers see wholesale prices
4. **Status tracking** - Customers can track their application status

---

## System Architecture

### Customer Metadata Structure

Wholesale data is stored in the customer's `metadata` field:

```typescript
{
  wholesale_status: "none" | "pending" | "approved" | "rejected"
  wholesale_application: {
    business_name: string
    business_type: string
    tax_id?: string
    website?: string
    phone: string
    address?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
    additional_info?: string
    applied_at: string (ISO date)
  }
  wholesale_approved_at?: string (ISO date)
  wholesale_rejected_at?: string (ISO date)
  wholesale_rejection_reason?: string
}
```

---

## API Endpoints

### Storefront API Routes

#### Submit Wholesale Application
**POST** `/store/wholesale/apply`

**Auth Required:** Yes (customer must be logged in)

**Body:**
```json
{
  "business_name": "string",
  "business_type": "string",
  "tax_id": "string (optional)",
  "website": "string (optional)",
  "phone": "string",
  "address": "string (optional)",
  "city": "string (optional)",
  "state": "string (optional)",
  "postal_code": "string (optional)",
  "country": "string (optional)",
  "additional_info": "string (optional)"
}
```

**Response:**
```json
{
  "message": "Wholesale application submitted successfully...",
  "customer": {...}
}
```

#### Get Wholesale Status
**GET** `/store/wholesale/status`

**Auth Required:** Yes

**Response:**
```json
{
  "wholesale_status": "none" | "pending" | "approved" | "rejected",
  "wholesale_application": {...}
}
```

### Admin API Routes

#### Get Pending Applications
**GET** `/admin/wholesale/applications`

**Auth Required:** Yes (admin)

**Response:**
```json
{
  "applications": [
    {
      "id": "customer_id",
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "wholesale_status": "pending",
      "wholesale_application": {...}
    }
  ]
}
```

#### Approve Application
**POST** `/admin/wholesale/:id/approve`

**Auth Required:** Yes (admin)

**Response:**
```json
{
  "message": "Wholesale application approved successfully.",
  "customer": {...}
}
```

#### Reject Application
**POST** `/admin/wholesale/:id/reject`

**Auth Required:** Yes (admin)

**Body:**
```json
{
  "reason": "string (optional)"
}
```

---

## Frontend Components

### Storefront Components

#### 1. **WholesaleApplicationForm**
Location: `src/modules/account/components/wholesale-application-form/index.tsx`

Full application form for customers to apply for wholesale accounts.

#### 2. **WholesaleStatus**
Location: `src/modules/account/components/wholesale-status/index.tsx`

Displays the current wholesale status (none, pending, approved, rejected) with appropriate messaging and actions.

#### 3. **WholesaleBadge**
Location: `src/modules/products/components/wholesale-badge/index.tsx`

Shows "Wholesale Pricing Active" badge on product pages for approved wholesale customers.

#### 4. **WholesaleInfo**
Location: `src/modules/products/components/wholesale-info/index.tsx`

Displays promotional information about wholesale accounts on product pages for non-wholesale customers.

### Admin Components

#### **WholesaleApplicationsWidget**
Location: `medusa-backend/src/admin/widgets/wholesale-applications.tsx`

Admin widget that displays all pending wholesale applications with approve/reject actions.

- **Zone:** `customer.list.before` (appears above customer list in admin)
- **Features:**
  - View all pending applications
  - Approve applications with one click
  - Reject applications with optional reason
  - Auto-refresh after actions

---

## Customer Journey

### 1. Application Process

1. Customer creates a regular account and logs in
2. Customer navigates to **Account → Wholesale**
3. Customer sees application prompt and clicks "Apply for Wholesale Account"
4. Customer fills out the wholesale application form:
   - Business name (required)
   - Business type (required)
   - Phone (required)
   - Tax ID, website, address (optional)
   - Additional information (optional)
5. Customer submits application
6. Status changes to "pending"

### 2. Admin Review

1. Admin logs into Medusa Admin (http://localhost:9000/app)
2. Admin sees "Wholesale Applications" widget above customer list
3. Admin reviews application details:
   - Customer information
   - Business details
   - Application date
4. Admin either:
   - **Approves** → Customer gets wholesale access
   - **Rejects** → Customer receives rejection notice

### 3. Post-Approval

Once approved:
- Customer sees "Wholesale Account Active" status in their account
- "Wholesale Pricing Active" badge appears on product pages
- Customer sees wholesale prices (when price lists are configured)
- Customer can browse products with wholesale pricing

---

## Setting Up Wholesale Pricing

To implement actual wholesale pricing, you need to create **Price Lists** in Medusa Admin:

### Step-by-Step:

1. **Create a Customer Group** (optional but recommended):
   - Go to Medusa Admin → Customers → Groups
   - Create a "Wholesale" customer group
   - Manually add approved wholesale customers to this group

2. **Create a Price List**:
   - Go to Medusa Admin → Pricing → Price Lists
   - Click "Create Price List"
   - Name: "Wholesale Pricing"
   - Type: "Sale" or "Override"
   - Customer Groups: Select "Wholesale" group
   - Start Date: Set to current date
   - No End Date (or set as needed)

3. **Add Products to Price List**:
   - In the price list, add products
   - Set wholesale prices for each product/variant
   - Save

4. **Result**:
   - Customers in the Wholesale group will see the special prices
   - The system automatically applies the best available price

---

## Testing the System

### Test as Customer:

1. Create a customer account at http://localhost:8000
2. Navigate to Account → Wholesale
3. Fill out and submit wholesale application
4. Check application status

### Test as Admin:

1. Log into admin at http://localhost:9000/app
   - Email: `admin@medusa.com`
   - Password: `supersecret`
2. Check for the "Wholesale Applications" widget
3. Approve or reject test application
4. Verify customer status updates

### Test Wholesale Pricing:

1. Create a price list for wholesale customers
2. Log in as approved wholesale customer
3. Browse products and verify wholesale prices display

---

## File Structure

```
medusa-backend/
├── src/
│   ├── api/
│   │   ├── admin/
│   │   │   └── wholesale/
│   │   │       ├── route.ts           # List applications
│   │   │       └── [id]/
│   │   │           ├── approve/
│   │   │           │   └── route.ts   # Approve application
│   │   │           └── reject/
│   │   │               └── route.ts   # Reject application
│   │   └── store/
│   │       └── wholesale/
│   │           └── route.ts           # Apply & check status
│   └── admin/
│       └── widgets/
│           └── wholesale-applications.tsx

medusa-storefront/
├── src/
│   ├── app/
│   │   └── [countryCode]/(main)/account/@dashboard/
│   │       └── wholesale/
│   │           ├── page.tsx                  # Wholesale status page
│   │           └── apply/
│   │               └── page.tsx              # Application form page
│   ├── lib/
│   │   └── data/
│   │       └── wholesale.ts                  # Wholesale data functions
│   └── modules/
│       ├── account/
│       │   └── components/
│       │       ├── wholesale-application-form/
│       │       │   └── index.tsx
│       │       ├── wholesale-status/
│       │       │   └── index.tsx
│       │       ├── account-nav/
│       │       │   └── index.tsx             # Updated with wholesale link
│       │       └── overview/
│       │           └── index.tsx             # Updated with wholesale status
│       └── products/
│           ├── components/
│           │   ├── wholesale-badge/
│           │   │   └── index.tsx
│           │   └── wholesale-info/
│           │       └── index.tsx
│           └── templates/
│               └── product-actions-wrapper/
│                   └── index.tsx             # Updated with wholesale components
```

---

## Customization Options

### Styling
All components use Tailwind CSS classes and can be customized by modifying the class names.

### Validation
Add custom validation in the backend API routes:
- Minimum order quantities
- Specific business types only
- Geographic restrictions
- Tax ID verification

### Notifications
To add email notifications:
1. Create a subscriber in `medusa-backend/src/subscribers/`
2. Listen for customer metadata updates
3. Send emails on status changes

### Advanced Pricing
- Create multiple price lists for different wholesale tiers
- Add customer groups for different business types
- Implement volume-based pricing

---

## Troubleshooting

### Application Not Submitting
- Check browser console for errors
- Verify customer is logged in
- Check network tab for API response

### Admin Widget Not Showing
- Restart Medusa backend: `npm run dev` in medusa-backend
- Clear browser cache
- Check admin console for errors

### Wholesale Prices Not Showing
- Verify customer is approved (check metadata)
- Verify price list is created and active
- Verify customer is in the correct customer group
- Check that products have wholesale prices set

### Status Not Updating
- Clear cache: logout and login again
- Check customer metadata in admin
- Verify API endpoints are returning correct data

---

## Future Enhancements

Possible additions to the system:

1. **Wholesale Order Form** - Special bulk ordering interface
2. **Minimum Order Quantities** - Enforce minimums for wholesale orders
3. **Quote Requests** - Allow customers to request custom quotes
4. **Volume Discounts** - Automatic tiered pricing based on quantity
5. **Net Terms** - Payment terms for established wholesale customers
6. **Territory Management** - Restrict wholesale customers by region
7. **Automatic Approval** - Auto-approve based on criteria
8. **Application Analytics** - Track application conversion rates

---

## Support

For questions or issues:
- Check Medusa documentation: https://docs.medusajs.com
- Review this guide
- Check the code comments in the implementation files

