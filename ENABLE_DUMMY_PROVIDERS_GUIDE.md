# 🧪 Enable Dummy Payment & Shipping Providers

**Quick Guide**: Activate test/dummy payment and shipping options for checkout testing

## 🌍 For Worldwide Shipping (Recommended for Testing)

If you're getting "No shipping options available for your location", run the worldwide shipping setup:

```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
npm run setup-worldwide-shipping
```

This creates shipping options that work for **ANY location** (100+ countries) for testing purposes.

---

## ✅ What This Does

This script will:
- ✅ Link `pp_system_default` (Manual Payment) to all existing regions
- ✅ Set up `manual_manual` (Manual Fulfillment) provider
- ✅ Create shipping options: "Standard Shipping" and "Express Shipping"
- ✅ Link stock locations to fulfillment providers

---

## 🚀 How to Run

### Option 1: Backend Running (Recommended)

1. **Make sure backend is running**:
   ```powershell
   cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
   npm run dev
   ```
   Wait for backend to fully start (about 40 seconds)

2. **In a NEW terminal**, run the script:
   ```powershell
   cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
   npm run enable-dummy-providers
   ```

### Option 2: Backend Not Running

The script should work even if the backend isn't running in dev mode, as long as:
- PostgreSQL is running
- Database connection is configured in `.env`

Just run:
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
npm run enable-dummy-providers
```

---

## 📋 Expected Output

You should see output like:
```
🔧 Enabling dummy payment and shipping providers...
Step 1: Setting up regions with payment providers...
Found 1 existing region(s). Updating...
Adding pp_system_default to region: Europe (reg_...)
✅ Payment provider added to region: Europe
Step 2: Setting up stock location and fulfillment provider...
...
✅ Successfully enabled dummy payment and shipping providers!
```

---

## 🧪 Testing

After running the script:

1. **Visit storefront**: http://localhost:8000
2. **Add items to cart**
3. **Go to checkout**
4. **You should see**:
   - ✅ Payment option: "Manual Payment" (pp_system_default)
   - ✅ Shipping options: "Standard Shipping" and "Express Shipping"

---

## 🔍 Verify It Worked

### Check Payment Providers

1. Go to Admin: http://localhost:9000/app
2. Navigate to **Settings** → **Regions**
3. Click on a region
4. Under **Payment Providers**, you should see `pp_system_default`

### Check Shipping Options

1. Go to Admin: http://localhost:9000/app
2. Navigate to **Settings** → **Shipping Options**
3. You should see:
   - Standard Shipping (manual_manual)
   - Express Shipping (manual_manual)

### Test in Checkout

1. Add items to cart on storefront
2. Go to checkout
3. Fill in shipping address
4. You should see shipping options appear
5. Select a shipping method
6. You should see "Manual Payment" as payment option

---

## ⚠️ Troubleshooting

### Script Fails with "Cannot connect to database"

- Make sure PostgreSQL is running: `Get-Service postgresql-x64-17`
- Check `.env` file has correct `DATABASE_URL`
- Try starting the backend first: `npm run dev`

### No Payment Options in Checkout

- Make sure you've added items to cart
- Make sure you've selected a shipping address
- Check browser console for errors
- Verify region has payment provider linked (Admin → Settings → Regions)

### No Shipping Options in Checkout

- Make sure cart has items
- Make sure shipping address is set
- Check that stock location is linked to fulfillment provider
- Verify shipping options exist (Admin → Settings → Shipping Options)

### Script Runs But Nothing Changes

- Check the output for any error messages
- Verify you have regions set up (Admin → Settings → Regions)
- Try running the full seed script: `npm run seed`

---

## 🔄 Re-running the Script

The script is **idempotent** - you can run it multiple times safely. It will:
- Skip regions that already have the payment provider
- Skip shipping options that already exist
- Only add what's missing

---

## 📝 What Gets Created

### Payment Provider
- **ID**: `pp_system_default`
- **Name**: Manual Payment
- **Type**: Test/Dummy (no real payment processing)

### Fulfillment Provider
- **ID**: `manual_manual`
- **Name**: Manual Fulfillment
- **Type**: Test/Dummy (no carrier integration)

### Shipping Options
- **Standard Shipping**: €10 / $10, 2-3 days
- **Express Shipping**: €20 / $20, 24 hours

---

## 🚨 Before Production

**IMPORTANT**: These are TEST providers only!

Before going live, follow the checklist in `PRE_LAUNCH_CHECKLIST.md` to:
- Replace `pp_system_default` with real payment provider (Stripe, PayPal, etc.)
- Replace `manual_manual` with real fulfillment provider
- Remove test shipping options or update with real rates

---

## 💡 Quick Reference

**Run Script**:
```powershell
cd medusa-backend
npm run enable-dummy-providers
```

**Check Status**:
- Admin → Settings → Regions → Check payment providers
- Admin → Settings → Shipping Options → Check options exist

**Test**:
- Storefront → Add to cart → Checkout → Should see payment & shipping options


