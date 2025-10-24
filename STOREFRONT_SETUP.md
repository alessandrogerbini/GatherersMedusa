# 🛍️ Medusa V2 Storefront - Setup Complete

**Date**: Friday, October 24, 2025  
**Storefront**: Next.js Starter  
**Status**: ✅ Installed and Configured

---

## 📦 What Was Installed

✅ **Next.js Starter Storefront** - Official Medusa storefront template  
✅ **Environment Configuration** - Connected to backend  
✅ **Publishable API Key** - Configured for backend communication  

---

## 🌐 Access Your Storefront

**URL**: `http://localhost:8000`  
**Backend API**: Connected to `http://localhost:9000`  
**Status**: Running in development mode

---

## 📂 Installation Location

**Storefront Directory**:
```
G:\FastGrams program files\GG Medusa V2 website\medusa-storefront\
```

**Directory Structure**:
```
medusa-storefront/
├── src/
│   ├── app/            ← Next.js 14 App Router pages
│   ├── lib/            ← Utility functions and data fetching
│   ├── modules/        ← Feature modules (cart, checkout, products, etc.)
│   └── styles/         ← Global styles
├── public/             ← Static assets
├── .env.local          ← Environment configuration
├── next.config.js      ← Next.js configuration
└── package.json        ← Dependencies
```

---

## ⚙️ Environment Configuration

**File**: `.env.local`

```env
# Medusa Backend URL (for server-side/middleware) - REQUIRED!
MEDUSA_BACKEND_URL=http://localhost:9000

# Medusa Backend URL (for client-side)
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000

# Publishable API Key (from backend)
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_d3f72b8d59e3da35369fa2fc583a61586e5c04ab3cc378ecafe92530a5da6a9a

# Base URL for the storefront
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

**Important**: The Next.js starter requires **both** `MEDUSA_BACKEND_URL` (for middleware/server-side) and `NEXT_PUBLIC_MEDUSA_BACKEND_URL` (for client-side).

**Key Details**:
- Backend URL points to Medusa backend on port 9000
- Publishable API key authenticates storefront requests
- Region auto-detects based on available regions in backend

---

## 🚀 How to Start the Storefront

### Start Command
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront"
npm run dev
```

### Stop Storefront
- Press `Ctrl+C` in the terminal where storefront is running
- Or close the terminal window

---

## 🔗 Backend Connection

### CORS Configuration
The backend is already configured to allow requests from the storefront:

**In `medusa-backend/.env`**:
```
STORE_CORS=http://localhost:8000
```

### API Key
The publishable API key is retrieved from the backend database:
```sql
SELECT token FROM api_key WHERE type = 'publishable';
```

**Current Key**: `pk_d3f72b8d59e3da35369fa2fc583a61586e5c04ab3cc378ecafe92530a5da6a9a`

---

## 🗄️ Available Regions

The storefront will automatically detect available regions from the backend.

**Current Region**:
- **Name**: Europe
- **Currency**: EUR
- **ID**: `reg_01K89RCZH1E1G0G79VVP08T9TP`

To add more regions, use the Medusa Admin dashboard.

---

## 🛠️ Common Commands

### Development
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront"

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Clear Cache
```powershell
# Clear Next.js cache
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront"
Remove-Item -Path ".next" -Recurse -Force
```

---

## 🎨 Storefront Features

### Customer Features
- ✅ Product browsing and search
- ✅ Product detail pages with variants
- ✅ Shopping cart management
- ✅ Checkout process
- ✅ Customer account creation and login
- ✅ Order history
- ✅ Address management
- ✅ Multiple payment methods support
- ✅ Shipping options

### Technical Features
- ✅ Next.js 14 with App Router
- ✅ Server-Side Rendering (SSR)
- ✅ Optimized image loading
- ✅ Responsive design (mobile-friendly)
- ✅ SEO optimized
- ✅ Tailwind CSS styling
- ✅ TypeScript support

---

## 🧪 Testing the Connection

### Verify Backend Connection
```powershell
# Test backend health
Invoke-WebRequest http://localhost:9000/health

# Test regions API (requires publishable key header)
$headers = @{"x-publishable-api-key"="pk_d3f72b8d59e3da35369fa2fc583a61586e5c04ab3cc378ecafe92530a5da6a9a"}
Invoke-WebRequest -Uri "http://localhost:9000/store/regions" -Headers $headers
```

### Access Storefront
1. Open browser to http://localhost:8000
2. You should see the homepage with products
3. Try browsing products
4. Add items to cart
5. Test checkout flow

---

## 🔧 Customization

### Styling
- Located in: `src/styles/globals.css`
- Uses Tailwind CSS
- Modify `tailwind.config.js` for theme customization

### Components
- All components in: `src/modules/`
- Modify existing or add new components
- Follow Next.js 14 App Router conventions

### Pages
- Located in: `src/app/[countryCode]/`
- Dynamic routing based on country/region
- Add new routes by creating new directories

### Data Fetching
- Functions in: `src/lib/data/`
- Uses Medusa JS SDK
- Modify to add custom data fetching logic

---

## 📱 Demo Products

The storefront displays products seeded in the backend:
- Browse all products at: http://localhost:8000/store
- Products automatically displayed on homepage
- Filter and search functionality included

---

## 🆘 Troubleshooting

### Error: "MEDUSA_BACKEND_URL environment variable not defined"

**Symptom**: Middleware error about missing `MEDUSA_BACKEND_URL`

**Solution**: The Next.js starter requires `MEDUSA_BACKEND_URL` (not just the public version)

```powershell
# Stop storefront
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process -Force

# Update .env.local to include BOTH variables:
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront"

# Ensure .env.local has BOTH:
# MEDUSA_BACKEND_URL=http://localhost:9000
# NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000

# Restart
npm run dev
```

### Storefront won't start
```powershell
# Check if port 8000 is available
netstat -ano | Select-String "8000"

# Kill process on port 8000
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process -Force

# Clear cache and restart
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront"
Remove-Item -Path ".next" -Recurse -Force
npm run dev
```

### Can't connect to backend
```powershell
# Verify backend is running
Invoke-WebRequest http://localhost:9000/health

# Check .env.local file
Get-Content "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront\.env.local"

# Restart both backend and storefront
```

### Products not showing
1. Verify backend has products: http://localhost:9000/app → Products
2. Check region is configured correctly
3. Verify publishable API key is correct
4. Check browser console for errors

### Build errors
```powershell
# Reinstall dependencies
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront"
Remove-Item -Path "node_modules" -Recurse -Force
npm install
npm run dev
```

---

## 🔄 Running Both Backend and Storefront

### Manual Start (Two Terminals)

**Terminal 1 - Backend**:
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
npm run dev
```

**Terminal 2 - Storefront**:
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront"
npm run dev
```

### Using Scripts
See `Start-MedusaFull.ps1` for automated startup of both services.

---

## 📊 Service Ports

| Service | Port | URL |
|---------|------|-----|
| **Backend API** | 9000 | http://localhost:9000 |
| **Admin Dashboard** | 9000 | http://localhost:9000/app |
| **Storefront** | 8000 | http://localhost:8000 |
| **PostgreSQL** | 5433 | localhost:5433 |

---

## 🔐 API Authentication

### Publishable API Key
- **Purpose**: Authenticates storefront requests to backend
- **Location**: `.env.local` file
- **Header**: `x-publishable-api-key`
- **Scope**: Store API endpoints only (not admin)

### Customer Authentication
- Handled automatically by storefront
- JWT tokens stored in cookies
- Session management included

---

## 📚 Documentation References

### Official Documentation
- [Medusa Storefront Development](https://docs.medusajs.com/resources/storefront-development)
- [Next.js Starter Documentation](https://docs.medusajs.com/resources/nextjs-starter)
- [Store API Reference](https://docs.medusajs.com/api/store)
- [Next.js 14 Documentation](https://nextjs.org/docs)

### Our Documentation
- `STARTUP_GUIDE.md` - Daily startup instructions
- `INSTALLATION_COMPLETE.md` - Backend setup
- `QUICK_REFERENCE.md` - Command reference

---

## ⚠️ Important Notes

### Development vs Production
- Currently running in development mode
- For production: run `npm run build` then `npm start`
- Configure proper environment variables for production
- Set up proper domain and SSL certificates

### Environment Variables
- All storefront environment variables must start with `NEXT_PUBLIC_`
- Changes to `.env.local` require storefront restart
- Never commit `.env.local` to version control

### Performance
- First page load may be slow (Next.js compilation)
- Subsequent loads are faster with hot module replacement
- Production build is significantly faster

---

## ✅ Installation Checklist

- [x] Next.js Starter installed
- [x] Environment variables configured
- [x] Publishable API key set up
- [x] Backend connection verified
- [x] CORS configured correctly
- [x] Region auto-detection enabled
- [x] Storefront accessible at http://localhost:8000

---

## 🌟 Next Steps

1. **Browse the storefront** - Check out the homepage and products
2. **Test the cart** - Add products and test checkout
3. **Customize styling** - Modify Tailwind config and styles
4. **Add custom features** - Extend components and pages
5. **Configure payment** - Set up payment providers in admin
6. **Set up shipping** - Configure shipping options in admin

---

**Storefront Setup Completed**: Friday, October 24, 2025  
**Template**: Next.js Starter for Medusa  
**Status**: ✅ Ready for development!

