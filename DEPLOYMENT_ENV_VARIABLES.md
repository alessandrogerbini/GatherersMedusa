# 🔐 Deployment Environment Variables Reference

**Purpose**: Template for all environment variables needed for production deployment  
**Hosting**: Render (Backend + Database) + Vercel (Frontend)  
**⚠️ WARNING**: Never commit actual secrets to Git!

---

## Backend Environment Variables (Render)

### Required Variables

These variables must be set in the Render dashboard for your backend service.

```env
# Database Connection (from Render PostgreSQL)
DATABASE_URL=postgres://username:password@hostname:5432/database_name

# CORS Configuration (your production domains)
STORE_CORS=https://yourdomain.com
ADMIN_CORS=https://yourdomain.com,https://admin.yourdomain.com
AUTH_CORS=https://yourdomain.com,https://admin.yourdomain.com

# Security Secrets (GENERATE NEW STRONG VALUES!)
JWT_SECRET=your-128-character-random-hex-string-here
COOKIE_SECRET=your-128-character-random-hex-string-here

# Backend URLs (your Render backend URL)
MEDUSA_ADMIN_BACKEND_URL=https://your-backend-service.onrender.com
MEDUSA_BACKEND_URL=https://your-backend-service.onrender.com

# Environment
NODE_ENV=production
```

### Optional Variables

```env
# File Storage (if using S3)
MEDUSA_CLOUD_S3_HOSTNAME=your-bucket.s3.amazonaws.com
MEDUSA_CLOUD_S3_PATHNAME=/uploads/*

# Redis (if using Redis for caching/queues)
REDIS_URL=redis://username:password@hostname:6379

# Email Service (if using SMTP)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
SMTP_FROM=noreply@yourdomain.com
```

### How to Set in Render

1. Go to your service dashboard
2. Click **Environment** in the left sidebar
3. Click **Add Environment Variable**
4. Enter key and value
5. Click **Save Changes**
6. Service will automatically restart

---

## Frontend Environment Variables (Vercel)

### Required Variables

These variables must be set in the Vercel dashboard for your frontend project.

```env
# Backend URL (for server-side/middleware)
MEDUSA_BACKEND_URL=https://your-backend-service.onrender.com

# Backend URL (for client-side - must match above)
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-backend-service.onrender.com

# Publishable API Key (get from production backend admin)
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_production_key_here

# Base URL (your production frontend URL)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### How to Set in Vercel

1. Go to your project dashboard
2. Click **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter key and value
5. Select environment (Production, Preview, Development)
6. Click **Save**
7. Redeploy for changes to take effect

### Getting the Publishable API Key

1. Deploy backend first (Phase 3)
2. Access admin panel: `https://your-backend.onrender.com/app`
3. Login with admin credentials
4. Navigate to **Settings** → **Publishable API Keys**
5. Copy the key (starts with `pk_`)
6. Add to Vercel environment variables

---

## Environment Variable Generation Commands

### Generate JWT_SECRET

**PowerShell:**
```powershell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Output**: 128-character hex string  
**Example**: `a1b2c3d4e5f6...` (128 chars)

### Generate COOKIE_SECRET

**PowerShell:**
```powershell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Output**: 128-character hex string (different from JWT_SECRET)  
**Example**: `f6e5d4c3b2a1...` (128 chars)

---

## Variable Dependencies

### Deployment Order Matters

1. **Database** → Get `DATABASE_URL`
2. **Backend** → Deploy with database URL → Get backend URL
3. **Backend Admin** → Login → Get `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`
4. **Frontend** → Deploy with backend URL and publishable key

### URL Dependencies

- `MEDUSA_BACKEND_URL` → Must match actual Render backend URL
- `NEXT_PUBLIC_BASE_URL` → Must match actual Vercel frontend URL
- `STORE_CORS`, `ADMIN_CORS`, `AUTH_CORS` → Must include frontend domain(s)

---

## Security Checklist

- [ ] All secrets generated using secure random methods
- [ ] No secrets committed to Git (verify .gitignore)
- [ ] JWT_SECRET and COOKIE_SECRET are different values
- [ ] Secrets are at least 64 bytes (128 hex characters)
- [ ] Production secrets differ from development secrets
- [ ] Secrets stored securely (password manager)
- [ ] Environment variables set in hosting provider dashboard (not code)

---

## Testing Environment Variables

### Test Backend Connection

```powershell
# Test health endpoint
Invoke-WebRequest https://your-backend.onrender.com/health

# Should return 200 OK
```

### Test Frontend Connection to Backend

1. Open browser DevTools (F12)
2. Go to Network tab
3. Visit your frontend URL
4. Check for requests to backend
5. Verify no CORS errors
6. Verify products load successfully

---

## Troubleshooting

### Backend Won't Start

- Check `DATABASE_URL` format is correct
- Verify database is accessible from Render
- Check all required variables are set
- Review Render build logs for errors

### Frontend Can't Connect to Backend

- Verify `NEXT_PUBLIC_MEDUSA_BACKEND_URL` matches actual backend URL
- Check CORS settings include frontend domain
- Verify publishable API key is correct
- Check browser console for CORS errors

### Images Not Loading

- Verify image domains in `next.config.js`
- Check image URLs in product data
- Verify file storage is configured (if using S3)

---

## Quick Reference

### Backend (Render) - Minimum Required

```env
DATABASE_URL=postgres://...
STORE_CORS=https://yourdomain.com
ADMIN_CORS=https://yourdomain.com
AUTH_CORS=https://yourdomain.com
JWT_SECRET=<128-char-hex>
COOKIE_SECRET=<128-char-hex>
MEDUSA_ADMIN_BACKEND_URL=https://backend.onrender.com
MEDUSA_BACKEND_URL=https://backend.onrender.com
NODE_ENV=production
```

### Frontend (Vercel) - Minimum Required

```env
MEDUSA_BACKEND_URL=https://backend.onrender.com
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://backend.onrender.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

**Remember**: Replace all placeholder values with your actual production values!

