# ✅ Pre-Deployment Checklist

**Purpose**: Complete these tasks before starting deployment to production  
**Status**: 🟡 In Progress  
**Last Updated**: [Auto-updated during progress]

---

## 🔐 Security & Secrets

### Critical Security Tasks

- [ ] **Generate Production JWT_SECRET**
  - **Status**: ⬜ Not Started
  - **Why**: Used for authentication tokens - must be unique and secure
  - **How**: 
    ```powershell
    node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
    ```
  - **Action**: Copy the output and save securely (will use in Phase 3)
  - **Length**: 128 characters minimum
  - **Storage**: Password manager or secure note (NOT in code)

- [ ] **Generate Production COOKIE_SECRET**
  - **Status**: ⬜ Not Started
  - **Why**: Used for session cookies - must be unique and secure
  - **How**: 
    ```powershell
    node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
    ```
  - **Action**: Generate different value from JWT_SECRET
  - **Length**: 128 characters minimum
  - **Storage**: Password manager or secure note

- [ ] **Change Admin Password**
  - **Status**: ⬜ Not Started
  - **Current**: `admin@medusa.com` / `supersecret`
  - **Action**: Change after backend is deployed (Phase 3)
  - **Requirement**: Strong password (16+ characters, mixed case, numbers, symbols)
  - **Location**: Production admin panel (after deployment)

- [ ] **Review .env File Security**
  - **Status**: ✅ Complete
  - **Verification**: Confirmed .env files are in .gitignore
  - **Files Checked**:
    - `medusa-backend/.env` ✅
    - `medusa-storefront/.env.local` ✅
  - **Action**: Never commit .env files to Git

---

## 💻 Code Preparation

### Build & Configuration

- [ ] **Create Production Environment Templates**
  - **Status**: ⬜ Not Started
  - **Files to Create**:
    - `medusa-backend/.env.production.example`
    - `medusa-storefront/.env.production.example`
  - **Purpose**: Document required variables without exposing secrets
  - **Action**: Copy current .env structure, replace values with placeholders

- [ ] **Test Backend Production Build**
  - **Status**: ⬜ Not Started
  - **Commands**:
    ```powershell
    cd medusa-backend
    npm run build
    npm start
    ```
  - **Expected**: Build succeeds without errors
  - **Verify**: Backend starts and responds on port 9000
  - **Notes**: If build fails, fix before deployment

- [ ] **Test Frontend Production Build**
  - **Status**: ⬜ Not Started
  - **Commands**:
    ```powershell
    cd medusa-storefront
    npm run build
    npm start
    ```
  - **Expected**: Build succeeds, Next.js compiles without errors
  - **Verify**: Storefront loads on port 8000
  - **Notes**: Production build may reveal issues not seen in dev mode

- [ ] **Update Next.js Config for Production**
  - **Status**: ⬜ Not Started
  - **File**: `medusa-storefront/next.config.js`
  - **Action**: Add production backend domain to `images.remotePatterns`
  - **Example**:
    ```javascript
    {
      protocol: "https",
      hostname: "your-backend.onrender.com",
    },
    {
      protocol: "https",
      hostname: "yourdomain.com",
    }
    ```
  - **Why**: Next.js needs explicit permission to load images from external domains

- [ ] **Verify Package.json Scripts**
  - **Status**: ⬜ Pending Review
  - **Backend**: 
    - `build`: `medusa build` ✅
    - `start`: `medusa start` ✅
  - **Frontend**:
    - `build`: `next build` ✅
    - `start`: `next start -p 8000` ✅
  - **Action**: Ensure all scripts are correct for production

---

## 🗄️ Database Preparation

### Data Backup & Migration

- [ ] **Create Full Database Backup**
  - **Status**: ⬜ Not Started
  - **Command**:
    ```powershell
    pg_dump -h localhost -p 5433 -U postgres medusa-backend > backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').sql
    ```
  - **Location**: Save backup file securely
  - **Verify**: Check file size (should be > 0 KB)
  - **Notes**: This is your recovery point if anything goes wrong

- [ ] **Verify All Migrations Applied**
  - **Status**: ⬜ Not Started
  - **Command**: `npx medusa db:migrate` (in medusa-backend)
  - **Expected**: "No pending migrations" or all migrations succeed
  - **Action**: Ensure database schema is up to date

- [ ] **Document Database Contents**
  - **Status**: ⬜ Not Started
  - **Check**:
    - Number of products
    - Number of collections
    - Number of regions
    - Number of admin users
    - Any custom data
  - **Purpose**: Verify after migration that nothing is missing

- [ ] **Test Database Connection String Format**
  - **Status**: ⬜ Not Started
  - **Format**: `postgres://user:password@host:port/database`
  - **Action**: Render will provide connection string, verify format matches
  - **Notes**: May need URL encoding for special characters

---

## 📁 File Storage Preparation

### Product Images & Assets

- [ ] **Audit All Image Locations**
  - **Status**: ⬜ Not Started
  - **Locations**:
    - `medusa-backend/static/` - Product images uploaded via admin
    - `Brand Assets/` - Brand logos, marketing materials
    - Database references - URLs stored in product records
  - **Action**: Create list of all images that need to be accessible in production

- [ ] **Choose File Storage Provider**
  - **Status**: ⬜ Not Started
  - **Options**:
    - **AWS S3** (Recommended) - Full control, reliable
    - **Cloudinary** - Image optimization built-in
    - **Render Static Sites** - Simple but limited
  - **Decision Needed**: Which provider to use?
  - **Action**: Research and decide before deployment

- [ ] **Plan Image Migration Strategy**
  - **Status**: ⬜ Not Started
  - **Considerations**:
    - Upload all static images to chosen provider
    - Update product records with new image URLs
    - Configure Medusa to use S3/storage provider
    - Set up CORS for image access
  - **Action**: Document migration steps

- [ ] **Verify Image URLs in Database**
  - **Status**: ⬜ Not Started
  - **Action**: Check if product images use relative paths or absolute URLs
  - **Impact**: May need to update image paths after migration
  - **Notes**: Medusa typically stores image paths relative to backend URL

---

## 🔗 Environment Variables Preparation

### Backend Variables (for Render)

- [ ] **Document Required Backend Variables**
  - **Status**: ⬜ Not Started
  - **Variables Needed**:
    ```
    DATABASE_URL=<from Render PostgreSQL>
    STORE_CORS=https://yourdomain.com
    ADMIN_CORS=https://yourdomain.com,https://admin.yourdomain.com
    AUTH_CORS=https://yourdomain.com,https://admin.yourdomain.com
    JWT_SECRET=<generated secret>
    COOKIE_SECRET=<generated secret>
    MEDUSA_ADMIN_BACKEND_URL=https://api.yourdomain.com
    MEDUSA_BACKEND_URL=https://api.yourdomain.com
    NODE_ENV=production
    ```
  - **Action**: Create template file for easy copy-paste during deployment

### Frontend Variables (for Vercel)

- [ ] **Document Required Frontend Variables**
  - **Status**: ⬜ Not Started
  - **Variables Needed**:
    ```
    MEDUSA_BACKEND_URL=https://api.yourdomain.com
    NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.yourdomain.com
    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<from production backend>
    NEXT_PUBLIC_BASE_URL=https://yourdomain.com
    ```
  - **Action**: Create template file for easy copy-paste during deployment
  - **Note**: Publishable key will be obtained after backend is deployed

---

## 🌐 Domain & DNS Planning

- [ ] **Decide on Domain Structure**
  - **Status**: ⬜ Not Started
  - **Options**:
    - **Option A**: `yourdomain.com` (frontend) + `api.yourdomain.com` (backend)
    - **Option B**: Use Render/Vercel default domains initially, add custom later
  - **Recommendation**: Start with Option B for testing, add custom domain later
  - **Action**: Make decision before Phase 5

- [ ] **Verify Domain Registrar Access**
  - **Status**: ⬜ Not Started
  - **Action**: Ensure you can access domain DNS settings
  - **Required**: Access to add A/CNAME records
  - **Notes**: If you don't have a domain yet, you can use Render/Vercel URLs initially

---

## 📚 Documentation & Knowledge

- [ ] **Review Render Documentation**
  - **Status**: ⬜ Not Started
  - **Links**:
    - Render Quick Start: https://render.com/docs/deploy-node-express
    - Render PostgreSQL: https://render.com/docs/databases
    - Render Environment Variables: https://render.com/docs/environment-variables
  - **Action**: Familiarize yourself with Render dashboard and deployment process

- [ ] **Review Vercel Documentation**
  - **Status**: ⬜ Not Started
  - **Links**:
    - Vercel Next.js Guide: https://vercel.com/docs/frameworks/nextjs
    - Vercel Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables
    - Vercel Domains: https://vercel.com/docs/concepts/projects/domains
  - **Action**: Understand Vercel deployment workflow

- [ ] **Create Deployment Runbook**
  - **Status**: ⬜ Not Started
  - **File**: `DEPLOYMENT_RUNBOOK.md`
  - **Contents**: Step-by-step commands for each phase
  - **Purpose**: Reference guide during actual deployment

---

## ✅ Final Pre-Deployment Verification

- [ ] **All Security Secrets Generated**
  - JWT_SECRET ✅
  - COOKIE_SECRET ✅

- [ ] **All Builds Test Successfully**
  - Backend build ✅
  - Frontend build ✅

- [ ] **Database Backup Created**
  - Backup file exists ✅
  - Backup verified ✅

- [ ] **Environment Variables Documented**
  - Backend variables template ✅
  - Frontend variables template ✅

- [ ] **Git Repository Ready**
  - Code committed ✅
  - Pushed to GitHub ✅
  - .env files excluded ✅

- [ ] **Documentation Reviewed**
  - Render docs reviewed ✅
  - Vercel docs reviewed ✅
  - Deployment workflow understood ✅

---

## 📋 Checklist Summary

**Total Items**: 30+  
**Completed**: 2  
**In Progress**: 1  
**Remaining**: 27+

**Estimated Time to Complete**: 2-4 hours  
**Priority**: Complete before starting Phase 1 deployment

---

## 🚨 Critical Path Items

These items **MUST** be completed before deployment:

1. ✅ .env files in .gitignore (Complete)
2. ⬜ Generate JWT_SECRET and COOKIE_SECRET
3. ⬜ Test production builds locally
4. ⬜ Create database backup
5. ⬜ Document environment variables

**Once these 5 items are complete, you're ready to proceed to Phase 1!**

---

**Next Steps After Completion**:
1. Review this checklist one final time
2. Mark all items as complete
3. Proceed to Phase 1: Code Repository Setup in `DEPLOYMENT_WORKFLOW.md`

