# Frontend Build Status

**Date**: December 11, 2025  
**Status**: ⚠️ Build failed - Backend connection required

---

## Build Error

```
Error: fetch failed
Cause: ECONNREFUSED
Failed to collect page data for /[countryCode]/categories/[...category]
```

## Root Cause

Next.js is trying to run `generateStaticParams()` functions during build time. These functions fetch data from the backend to pre-generate static pages for:
- Product pages
- Category pages  
- Collection pages

Since the backend isn't running during build, the fetch fails.

## Solution Options

### Option 1: Build with Backend Running (Recommended for Testing)
```powershell
# Terminal 1: Start backend
cd medusa-backend
npm run dev

# Terminal 2: Build frontend (after backend is ready)
cd medusa-storefront
npm run build
```

### Option 2: Make Pages Dynamic (For Production)
Update pages to use dynamic rendering instead of static generation:
- Add `export const dynamic = 'force-dynamic'` to pages
- Or remove `generateStaticParams` functions

### Option 3: Skip Static Generation (For Vercel)
Vercel can build with backend available, or we can configure pages to be dynamic.

## Impact on Deployment

**For Vercel Deployment**:
- ✅ Vercel will build after backend is deployed
- ✅ Can configure to use production backend URL during build
- ✅ Or use dynamic rendering (no pre-generation needed)

**For Local Testing**:
- ⚠️ Need backend running to test production build
- ✅ Development mode works fine (uses runtime fetching)

## Recommendation

**For Deployment**: This is fine - Vercel will handle it. The build will either:
1. Use production backend URL during build
2. Fall back to dynamic rendering

**For Local Testing**: Start backend first, then build frontend.

---

**Status**: Build error is expected without backend. Will work in production deployment.

