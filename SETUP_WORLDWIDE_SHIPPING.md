# 🌍 Setup Worldwide Shipping for Testing

**Purpose**: Configure shipping options to work for ANY location during testing  
**Use Case**: When you see "No shipping options available for your location"

---

## 🚀 Quick Setup

Run this command to set up worldwide shipping:

```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
npm run setup-worldwide-shipping
```

---

## ✅ What This Does

1. **Creates Worldwide Fulfillment Set**
   - Covers 100+ countries
   - Works for any shipping address

2. **Creates Shipping Options**
   - **Standard Shipping (Worldwide)**: €10/$10, 2-3 days
   - **Express Shipping (Worldwide)**: €20/$20, 24 hours

3. **Links Everything Together**
   - Links stock location to fulfillment set
   - Ensures shipping options are available for all countries

---

## 📋 Expected Output

```
🌍 Setting up worldwide shipping options for testing...
Creating worldwide fulfillment set with all countries...
✅ Created worldwide fulfillment set: Worldwide Shipping (Test)
Linking stock location to worldwide fulfillment set...
✅ Linked stock location to worldwide fulfillment set
Creating worldwide shipping options...
✅ Created 2 worldwide shipping option(s)
✅ Successfully set up worldwide shipping options!
```

---

## 🧪 Testing

After running the script:

1. **Go to checkout**: http://localhost:8000/checkout
2. **Add shipping address** (any country)
3. **Shipping options should appear**:
   - Standard Shipping (Worldwide)
   - Express Shipping (Worldwide)
4. **Select a shipping method**
5. **Continue to payment** should work

---

## 🔍 Verify It Worked

### Check in Admin Panel

1. Go to Admin: http://localhost:9000/app
2. Navigate to **Settings** → **Shipping Options**
3. You should see:
   - Standard Shipping (Worldwide)
   - Express Shipping (Worldwide)

### Check Fulfillment Set

1. Navigate to **Settings** → **Fulfillment Sets** (if available)
2. Look for "Worldwide Shipping (Test)"
3. It should have a service zone with many countries

---

## ⚠️ Troubleshooting

### Script Fails

- Make sure backend is running or PostgreSQL is accessible
- Check `.env` has correct `DATABASE_URL`
- Try running: `npm run enable-dummy-providers` first

### Still No Shipping Options

1. **Clear browser cache** and try again
2. **Add a shipping address** first (shipping options require an address)
3. **Check browser console** for errors
4. **Verify in admin panel** that shipping options exist

### Shipping Options Don't Appear After Address

1. Make sure you've run the script successfully
2. Try refreshing the checkout page
3. Check that the address country is in the supported list
4. Run the script again to ensure everything is linked

---

## 🔄 Re-running

The script is **idempotent** - safe to run multiple times:
- Skips existing fulfillment sets
- Skips existing shipping options
- Only adds what's missing

---

## 📝 Countries Covered

The script includes 100+ countries covering:
- ✅ All of Europe (EU + UK + others)
- ✅ North America (US, Canada, Mexico)
- ✅ South America (major countries)
- ✅ Asia-Pacific (major countries)
- ✅ Middle East (major countries)
- ✅ Africa (major countries)
- ✅ Oceania (Australia, New Zealand, Pacific islands)

If your country isn't in the list, the script can be updated to add it.

---

## 🚨 Before Production

**IMPORTANT**: This is for TESTING only!

Before going live:
1. Remove worldwide shipping options
2. Set up proper shipping zones for your actual shipping areas
3. Configure real shipping rates based on location
4. Use real fulfillment providers

See `PRE_LAUNCH_CHECKLIST.md` for details.

---

## 💡 Quick Reference

**Run Script**:
```powershell
cd medusa-backend
npm run setup-worldwide-shipping
```

**Check Status**:
- Admin → Settings → Shipping Options
- Should see "Standard Shipping (Worldwide)" and "Express Shipping (Worldwide)"

**Test**:
- Storefront → Checkout → Add address → Shipping options should appear




