# 🚀 Deployment Workflow & Progress Tracker

**Project**: Gatherer's Gourmet / NYBS / Orgin E-Commerce Platform  
**Hosting Plan**: Render (Backend + Database) + Vercel (Frontend)  
**Repository**: https://github.com/alessandrogerbini/GatherersMedusa  
**Status**: 🟡 In Progress

---

## 📋 Deployment Phases Overview

| Phase | Task | Status | Notes |
|-------|------|--------|-------|
| **Phase 0** | Pre-Deployment Preparation | 🟡 In Progress | Current Phase |
| **Phase 1** | Code Repository Setup | ⬜ Not Started | |
| **Phase 2** | Database Setup | ⬜ Not Started | |
| **Phase 3** | Backend Deployment | ⬜ Not Started | |
| **Phase 4** | Frontend Deployment | ⬜ Not Started | |
| **Phase 5** | Domain & DNS Configuration | ⬜ Not Started | |
| **Phase 6** | Production Testing | ⬜ Not Started | |
| **Phase 7** | Go Live & Monitoring | ⬜ Not Started | |

**Legend**:  
- ✅ Complete
- 🟡 In Progress  
- ⬜ Not Started
- 🔴 Blocked
- ⚠️ Needs Attention

---

## Phase 0: Pre-Deployment Preparation

### Security & Secrets

- [ ] **Generate Strong JWT_SECRET**
  - Status: ⬜ Not Started
  - Action: Generate 64+ character random string
  - Command: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
  - Notes: Will be used in production backend .env

- [ ] **Generate Strong COOKIE_SECRET**
  - Status: ⬜ Not Started
  - Action: Generate 64+ character random string
  - Command: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
  - Notes: Will be used in production backend .env

- [ ] **Change Admin Password**
  - Status: ⬜ Not Started
  - Action: Change from `supersecret` to strong production password
  - Location: Production backend admin panel (after deployment)
  - Notes: Current: `admin@medusa.com` / `supersecret`

### Code Preparation

- [ ] **Review .gitignore Files**
  - Status: ✅ Complete
  - Notes: Verified .env files are excluded from all directories

- [ ] **Create Production Environment Templates**
  - Status: ⬜ Not Started
  - Files to Create:
    - `medusa-backend/.env.production.example`
    - `medusa-storefront/.env.production.example`
  - Notes: These will document required variables without exposing secrets

- [ ] **Update Next.js Config for Production**
  - Status: ⬜ Not Started
  - File: `medusa-storefront/next.config.js`
  - Action: Add production domain to `images.remotePatterns`
  - Notes: Currently only has localhost and test S3 hosts

- [ ] **Test Production Build Locally**
  - Status: ⬜ Not Started
  - Backend: `cd medusa-backend && npm run build && npm start`
  - Frontend: `cd medusa-storefront && npm run build && npm start`
  - Notes: Verify builds succeed without errors

### Database Preparation

- [ ] **Backup Local Database**
  - Status: ⬜ Not Started
  - Command: `pg_dump -h localhost -p 5433 -U postgres medusa-backend > backup_$(date +%Y%m%d).sql`
  - Notes: Save backup file securely

- [ ] **Review Database Schema**
  - Status: ⬜ Not Started
  - Action: Ensure all migrations are committed
  - Notes: Check for any pending migrations

- [ ] **Identify Static Files/Images**
  - Status: ⬜ Not Started
  - Action: List all product images, brand assets that need uploading
  - Location: `Brand Assets/` directory
  - Notes: Will need S3 or file storage solution

### File Storage Preparation

- [ ] **Choose File Storage Provider**
  - Status: ⬜ Not Started
  - Options: AWS S3, Cloudinary, or Render Static Sites
  - Recommendation: AWS S3 (most compatible with Medusa)
  - Notes: Product images need to be accessible from production

- [ ] **Plan Image Migration**
  - Status: ⬜ Not Started
  - Action: Document all image locations
  - Notes: Images in `medusa-backend/static/` and `Brand Assets/` folders

### Documentation

- [ ] **Create Production Environment Variables Reference**
  - Status: ⬜ Not Started
  - File: `DEPLOYMENT_ENV_VARIABLES.md`
  - Notes: Document all required env vars for Render and Vercel

- [ ] **Document Domain Structure**
  - Status: ⬜ Not Started
  - Decision Needed:
    - Option A: `yourdomain.com` (frontend) + `api.yourdomain.com` (backend)
    - Option B: `yourdomain.com` (frontend) + `yourdomain.com/api` (backend proxy)
  - Notes: Render supports custom domains, Vercel has excellent domain support

---

## Phase 1: Code Repository Setup

- [ ] **Initialize Git Repository**
  - Status: 🟡 In Progress
  - Current Branch: `master`
  - Action: Rename to `main` and push to GitHub
  - Repository: https://github.com/alessandrogerbini/GatherersMedusa.git

- [ ] **Stage All Files**
  - Status: ⬜ Pending
  - Action: Review and stage appropriate files
  - Notes: Exclude .env files, node_modules, build artifacts

- [ ] **Initial Commit**
  - Status: ⬜ Pending
  - Message: "Initial commit - Pre-production deployment preparation"

- [ ] **Push to GitHub**
  - Status: ⬜ Pending
  - Remote: `origin`
  - Branch: `main`
  - Notes: Repository is currently empty on GitHub

- [ ] **Verify .gitignore is Working**
  - Status: ⬜ Pending
  - Action: Confirm no .env files are in repository
  - Command: `git ls-files | grep -E "\.env$"`

---

## Phase 2: Database Setup (Render)

- [ ] **Create Render Account**
  - Status: ⬜ Not Started
  - URL: https://render.com
  - Notes: Free tier available for testing

- [ ] **Create PostgreSQL Database**
  - Status: ⬜ Not Started
  - Provider: Render
  - Plan: Starter ($7/month) or Free (limited)
  - Action: Create new PostgreSQL database
  - Notes: Save connection string securely

- [ ] **Configure Database Settings**
  - Status: ⬜ Not Started
  - Database Name: `medusa-backend` (or custom)
  - Region: Choose closest to your customers
  - Notes: Note the external connection string

- [ ] **Test Database Connection**
  - Status: ⬜ Not Started
  - Action: Test connection from local machine
  - Tool: psql or DBeaver
  - Notes: Verify connectivity before migration

- [ ] **Export Local Database**
  - Status: ⬜ Not Started
  - Command: `pg_dump -h localhost -p 5433 -U postgres medusa-backend > production_backup.sql`
  - Notes: Full database export with data

- [ ] **Import to Production Database**
  - Status: ⬜ Not Started
  - Method: Render dashboard or psql
  - Notes: May need to adjust connection string format

- [ ] **Verify Data Migration**
  - Status: ⬜ Not Started
  - Action: Check products, collections, users exist
  - Notes: Verify critical data is present

- [ ] **Run Database Migrations**
  - Status: ⬜ Not Started
  - Command: `npx medusa db:migrate` (on production backend)
  - Notes: After backend is deployed

---

## Phase 3: Backend Deployment (Render)

- [ ] **Create Backend Service on Render**
  - Status: ⬜ Not Started
  - Type: Web Service
  - Environment: Node
  - Root Directory: `medusa-backend`
  - Build Command: `npm install && npm run build`
  - Start Command: `npm start`

- [ ] **Connect GitHub Repository**
  - Status: ⬜ Not Started
  - Action: Connect Render to GitHub repo
  - Branch: `main`
  - Auto-Deploy: Enable (optional)

- [ ] **Configure Environment Variables**
  - Status: ⬜ Not Started
  - Variables Needed:
    - `DATABASE_URL` - From Render PostgreSQL
    - `STORE_CORS` - Production frontend URL
    - `ADMIN_CORS` - Admin panel URLs
    - `AUTH_CORS` - Authentication URLs
    - `JWT_SECRET` - Generated strong secret
    - `COOKIE_SECRET` - Generated strong secret
    - `MEDUSA_ADMIN_BACKEND_URL` - Backend URL
    - `MEDUSA_BACKEND_URL` - Backend URL
    - `NODE_ENV` - `production`

- [ ] **Configure Build Settings**
  - Status: ⬜ Not Started
  - Node Version: 20+ (check package.json engines)
  - Build Timeout: 1800 seconds
  - Health Check Path: `/health`

- [ ] **Deploy Backend**
  - Status: ⬜ Not Started
  - Action: Trigger first deployment
  - Notes: Monitor build logs for errors

- [ ] **Verify Backend Health**
  - Status: ⬜ Not Started
  - Endpoint: `https://your-backend-url.onrender.com/health`
  - Expected: 200 OK response
  - Notes: May take 2-3 minutes on free tier

- [ ] **Access Admin Panel**
  - Status: ⬜ Not Started
  - URL: `https://your-backend-url.onrender.com/app`
  - Action: Login and verify functionality
  - Notes: Change admin password immediately

- [ ] **Get Production Publishable API Key**
  - Status: ⬜ Not Started
  - Location: Admin → Settings → Publishable API Keys
  - Action: Copy key for frontend .env
  - Notes: Different from local development key

---

## Phase 4: Frontend Deployment (Vercel)

- [ ] **Create Vercel Account**
  - Status: ⬜ Not Started
  - URL: https://vercel.com
  - Notes: Free tier available

- [ ] **Import GitHub Project**
  - Status: ⬜ Not Started
  - Action: Import `GatherersMedusa` repository
  - Root Directory: `medusa-storefront`
  - Framework: Next.js (auto-detected)

- [ ] **Configure Build Settings**
  - Status: ⬜ Not Started
  - Build Command: `npm run build` (default)
  - Output Directory: `.next` (default)
  - Install Command: `npm install`
  - Node Version: 20+

- [ ] **Configure Environment Variables**
  - Status: ⬜ Not Started
  - Variables Needed:
    - `MEDUSA_BACKEND_URL` - Production backend URL
    - `NEXT_PUBLIC_MEDUSA_BACKEND_URL` - Production backend URL (public)
    - `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` - From production backend
    - `NEXT_PUBLIC_BASE_URL` - Production frontend URL

- [ ] **Update next.config.js**
  - Status: ⬜ Not Started
  - Action: Add production domain to `images.remotePatterns`
  - Notes: Allow images from production backend and S3

- [ ] **Deploy Frontend**
  - Status: ⬜ Not Started
  - Action: Trigger first deployment
  - Notes: Vercel automatically builds on push

- [ ] **Verify Frontend Deployment**
  - Status: ⬜ Not Started
  - URL: `https://your-project.vercel.app`
  - Action: Test homepage, products, checkout flow
  - Notes: Check browser console for errors

- [ ] **Test Backend Connection**
  - Status: ⬜ Not Started
  - Action: Verify products load from backend
  - Notes: Check network tab in browser DevTools

---

## Phase 5: Domain & DNS Configuration

- [ ] **Plan Domain Structure**
  - Status: ⬜ Not Started
  - Decision:
    - Frontend: `yourdomain.com` (Vercel)
    - Backend: `api.yourdomain.com` (Render)
    - Alternative: Use Render and Vercel subdomains initially

- [ ] **Configure Vercel Domain**
  - Status: ⬜ Not Started
  - Action: Add custom domain in Vercel dashboard
  - Location: Project Settings → Domains
  - Notes: Vercel provides DNS instructions

- [ ] **Configure Render Domain**
  - Status: ⬜ Not Started
  - Action: Add custom domain in Render dashboard
  - Location: Service Settings → Custom Domains
  - Notes: May require SSL certificate setup

- [ ] **Update DNS Records**
  - Status: ⬜ Not Started
  - Frontend: A record or CNAME pointing to Vercel
  - Backend: A record or CNAME pointing to Render
  - Notes: DNS propagation can take up to 48 hours (usually faster)

- [ ] **Update CORS Settings**
  - Status: ⬜ Not Started
  - Action: Update backend CORS with production domains
  - Files: Backend environment variables on Render
  - Notes: Must match actual domain URLs

- [ ] **Verify SSL Certificates**
  - Status: ⬜ Not Started
  - Action: Check HTTPS is enabled on both services
  - Notes: Vercel and Render provide free SSL

- [ ] **Test Domain Access**
  - Status: ⬜ Not Started
  - Frontend: `https://yourdomain.com`
  - Backend: `https://api.yourdomain.com/health`
  - Notes: Verify both accessible via custom domain

---

## Phase 6: Production Testing

### Functional Testing

- [ ] **Test Homepage**
  - Status: ⬜ Not Started
  - Action: Verify all sections load correctly
  - Notes: Check images, text, navigation

- [ ] **Test Product Pages**
  - Status: ⬜ Not Started
  - Action: Browse products, view details, add to cart
  - Notes: Verify images load from production

- [ ] **Test Cart & Checkout**
  - Status: ⬜ Not Started
  - Action: Complete test purchase
  - Notes: Use test payment method if available

- [ ] **Test Admin Panel**
  - Status: ⬜ Not Started
  - Action: Login, manage products, view orders
  - Notes: Verify all admin functions work

- [ ] **Test Multi-Brand Pages**
  - Status: ⬜ Not Started
  - Brands: Gatherer's Gourmet, NYBS, Orgin
  - Action: Verify all brand-specific pages load
  - Notes: Check routing and content

### Performance Testing

- [ ] **Test Page Load Times**
  - Status: ⬜ Not Started
  - Tool: Google PageSpeed Insights
  - Target: < 3 seconds initial load
  - Notes: Vercel CDN should help significantly

- [ ] **Test Image Optimization**
  - Status: ⬜ Not Started
  - Action: Verify Next.js image optimization works
  - Notes: Check images are served from CDN

- [ ] **Test Mobile Responsiveness**
  - Status: ⬜ Not Started
  - Action: Test on various devices/browsers
  - Notes: Verify responsive design works

### Security Testing

- [ ] **Verify HTTPS Everywhere**
  - Status: ⬜ Not Started
  - Action: Check all URLs use HTTPS
  - Notes: Verify no mixed content warnings

- [ ] **Test Environment Variable Security**
  - Status: ⬜ Not Started
  - Action: Verify no secrets in client-side code
  - Notes: Check browser DevTools → Sources

- [ ] **Test CORS Configuration**
  - Status: ⬜ Not Started
  - Action: Verify only allowed origins can access API
  - Notes: Test from unauthorized domain

---

## Phase 7: Go Live & Monitoring

- [ ] **Final Pre-Launch Checklist**
  - Status: ⬜ Not Started
  - [ ] All tests passing
  - [ ] Admin password changed
  - [ ] SSL certificates active
  - [ ] Domain DNS propagated
  - [ ] Backup strategy in place
  - [ ] Monitoring configured (optional)

- [ ] **Announce Launch**
  - Status: ⬜ Not Started
  - Action: Update social media, notify customers
  - Notes: Soft launch recommended

- [ ] **Monitor Initial Traffic**
  - Status: ⬜ Not Started
  - Tools: Vercel Analytics, Render Metrics
  - Action: Watch for errors, performance issues
  - Notes: First 24 hours critical

- [ ] **Set Up Error Monitoring**
  - Status: ⬜ Not Started
  - Options: Sentry, LogRocket (optional)
  - Notes: Helps catch issues early

- [ ] **Document Production Setup**
  - Status: ⬜ Not Started
  - File: `PRODUCTION_SETUP.md`
  - Notes: Document final configuration for future reference

---

## 📝 Notes & Decisions

### Current Decisions
- **Backend Hosting**: Render
- **Database Hosting**: Render PostgreSQL
- **Frontend Hosting**: Vercel
- **Repository**: GitHub (https://github.com/alessandrogerbini/GatherersMedusa)

### Pending Decisions
- Production domain name
- File storage provider (S3, Cloudinary, etc.)
- Email service provider (SendGrid, Mailgun, etc.)
- Monitoring/error tracking service

### Known Issues
- None yet (track as they arise)

### Lessons Learned
- (Will be updated during deployment)

---

## 🔗 Useful Links

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repository**: https://github.com/alessandrogerbini/GatherersMedusa
- **Medusa Documentation**: https://docs.medusajs.com
- **Next.js Documentation**: https://nextjs.org/docs

---

**Last Updated**: [Current Date]  
**Next Review**: After Phase 0 completion

