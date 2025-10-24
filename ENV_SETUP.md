# 🔐 Environment Variables Setup Guide

**IMPORTANT**: The `.env` files are NOT committed to git for security reasons.  
You must create these files manually after cloning the repository.

---

## 📁 Backend Environment Variables

**File**: `medusa-backend/.env`

```env
# Database Configuration
DATABASE_URL=postgres://postgres:@localhost:5433/medusa-backend

# CORS Configuration
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:9000,http://localhost:7001
AUTH_CORS=http://localhost:9000,http://localhost:7001

# Security Secrets (CHANGE IN PRODUCTION!)
JWT_SECRET=supersecret_change_in_production
COOKIE_SECRET=supersecret_change_in_production

# Backend URLs
MEDUSA_ADMIN_BACKEND_URL=http://localhost:9000
MEDUSA_BACKEND_URL=http://localhost:9000

# Environment
NODE_ENV=development
```

---

## 📁 Storefront Environment Variables

**File**: `medusa-storefront/.env.local`

```env
# Medusa Backend URL (for server-side/middleware)
MEDUSA_BACKEND_URL=http://localhost:9000

# Medusa Backend URL (for client-side)
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000

# Publishable API Key (get from backend admin)
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_key_here

# Base URL for the storefront
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

---

## 🔑 Getting the Publishable API Key

1. Start the backend: `npm run dev` in `medusa-backend/`
2. Open admin: http://localhost:9000/app
3. Login with: `admin@medusa.com` / `supersecret`
4. Navigate to: **Settings** → **Publishable API Keys**
5. Copy the key (starts with `pk_`)
6. Paste into `medusa-storefront/.env.local`

---

## ⚠️ Security Notes

### Critical Points:
1. **NEVER commit `.env` files to git**
2. **Change JWT_SECRET and COOKIE_SECRET in production**
3. **Use strong passwords for PostgreSQL in production**
4. **Keep publishable API keys private**

### Production Considerations:
- Use environment-specific values for production
- Store secrets in secure environment variable managers
- Use HTTPS for all CORS origins
- Update CORS to match your actual domain names

---

## 📋 Quick Setup Checklist

After cloning the repository:

- [ ] Create `medusa-backend/.env`
- [ ] Add database connection string
- [ ] Add CORS configuration
- [ ] Add security secrets
- [ ] Start backend
- [ ] Get publishable API key from admin
- [ ] Create `medusa-storefront/.env.local`
- [ ] Add backend URLs
- [ ] Add publishable API key
- [ ] Start storefront

---

**See Also**:
- `INSTALLATION_COMPLETE.md` - Full installation guide
- `WORKING_STATE_SNAPSHOT.md` - Complete configuration reference
- `STARTUP_GUIDE.md` - How to start services

---

**Last Updated**: Thursday, October 23, 2025 at 9:30 PM EST

