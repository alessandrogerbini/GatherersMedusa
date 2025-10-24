# 📸 WORKING STATE SNAPSHOT

**Date/Time**: Thursday, October 23, 2025 at 8:40 PM EST  
**Status**: ✅ **FULLY FUNCTIONAL - TESTED AND VERIFIED**

---

## 🎯 Purpose

This document captures the exact working state of the Medusa V2 installation **before machine restart**. Use this as a restore point if any issues occur after restart.

---

## ✅ VERIFIED WORKING COMPONENTS

### 1. Backend (Medusa V2)
- **Status**: ✅ Running and operational
- **Port**: 9000
- **URL**: http://localhost:9000
- **Admin URL**: http://localhost:9000/app
- **Credentials**: admin@medusa.com / supersecret
- **Database**: Connected to PostgreSQL 17 on port 5433
- **Database Name**: medusa-backend
- **API Endpoints**: All responding (200 OK)
- **Store API**: Functional with publishable key authentication

### 2. Storefront (Next.js 15)
- **Status**: ✅ Running and operational
- **Port**: 8000
- **URL**: http://localhost:8000
- **Framework**: Next.js 15.5.6 (Turbopack)
- **Connection to Backend**: ✅ Verified working
- **Products Loading**: ✅ Yes (from backend)
- **Region Detection**: ✅ Working (Europe/EUR)

### 3. PostgreSQL Database
- **Version**: 17.6
- **Service**: postgresql-x64-17
- **Status**: ✅ Running
- **Port**: 5433 (NOT 5432!)
- **Database**: medusa-backend
- **User**: postgres
- **Password**: (empty)
- **Location**: G:\FastGrams program files\Postgresql 17\

### 4. Connection Verification
- **Backend ↔ Database**: ✅ Verified
- **Storefront ↔ Backend**: ✅ Verified
- **API Authentication**: ✅ Working
- **CORS Configuration**: ✅ Working
- **Data Flow**: ✅ End-to-end operational

---

## 🔧 CRITICAL CONFIGURATION FILES

### Backend Environment (.env)
**Location**: `G:\FastGrams program files\GG Medusa V2 website\medusa-backend\.env`

**Contents** (verified working):
```env
DATABASE_URL=postgres://postgres@localhost:5433/medusa-backend
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:9000,http://localhost:7001
AUTH_CORS=http://localhost:9000,http://localhost:7001
JWT_SECRET=supersecret_change_in_production
COOKIE_SECRET=supersecret_change_in_production
MEDUSA_ADMIN_BACKEND_URL=http://localhost:9000
MEDUSA_BACKEND_URL=http://localhost:9000
NODE_ENV=development
```

### Storefront Environment (.env.local)
**Location**: `G:\FastGrams program files\GG Medusa V2 website\medusa-storefront\.env.local`

**Contents** (verified working):
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

**⚠️ CRITICAL**: Both `MEDUSA_BACKEND_URL` and `NEXT_PUBLIC_MEDUSA_BACKEND_URL` are required!

---

## 📊 WORKING SERVICES

| Service | Port | Status | Command to Check |
|---------|------|--------|------------------|
| PostgreSQL 17 | 5433 | ✅ Running | `Get-Service postgresql-x64-17` |
| Medusa Backend | 9000 | ✅ Running | `Invoke-WebRequest http://localhost:9000/health` |
| Next.js Storefront | 8000 | ✅ Running | `netstat -ano \| Select-String "8000"` |

---

## 🔑 AUTHENTICATION CREDENTIALS

### Admin Dashboard
- **Email**: admin@medusa.com
- **Password**: supersecret

### Database
- **User**: postgres
- **Password**: (empty/blank)
- **Connection String**: postgres://postgres@localhost:5433/medusa-backend

### API Key
- **Publishable Key**: pk_d3f72b8d59e3da35369fa2fc583a61586e5c04ab3cc378ecafe92530a5da6a9a
- **Retrieved from**: Database table `api_key` where `type = 'publishable'`

---

## 📂 PROJECT STRUCTURE

```
G:\FastGrams program files\GG Medusa V2 website\
├── medusa-backend/              ✅ Backend installed
│   ├── .env                     ✅ Configured
│   ├── medusa-config.ts         ✅ Configured
│   ├── src/                     ✅ Ready for customization
│   └── node_modules/            ✅ Dependencies installed
│
├── medusa-storefront/           ✅ Storefront installed
│   ├── .env.local               ✅ Configured (both variables!)
│   ├── next.config.js           ✅ Configured
│   ├── src/                     ✅ Ready for customization
│   └── node_modules/            ✅ Dependencies installed
│
├── Start-Medusa.ps1             ✅ Backend startup script
├── Start-MedusaFull.ps1         ✅ Full stack startup script
│
└── [Documentation files]        ✅ Complete
```

---

## 🚀 STARTUP PROCEDURE (VERIFIED WORKING)

### Before This Restart (What's Currently Running)

**Terminal 1** - Backend:
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
npm run dev
```
Status: ✅ Running successfully

**Terminal 2** - Storefront:
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront"
npm run dev
```
Status: ✅ Running successfully

### After Restart (What to Test)

#### Option 1: One-Click Startup (RECOMMENDED)
```powershell
# Double-click this file:
Start-MedusaFull.ps1
```

#### Option 2: Manual Startup
```powershell
# Step 1: Verify PostgreSQL
Get-Service postgresql-x64-17
# If not running: Start-Service postgresql-x64-17

# Step 2: Start Backend (Terminal 1)
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
npm run dev

# Step 3: Start Storefront (Terminal 2)
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront"
npm run dev

# Step 4: Wait 15-20 seconds for compilation

# Step 5: Open browser
# http://localhost:9000/app (Admin)
# http://localhost:8000 (Storefront)
```

---

## 🧪 VERIFICATION TESTS (TO RUN AFTER RESTART)

### Test 1: PostgreSQL Status
```powershell
Get-Service postgresql-x64-17
# Expected: Status = Running
```

### Test 2: PostgreSQL Connection
```powershell
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 medusa-backend -c "SELECT 1;"
# Expected: Returns 1
```

### Test 3: Backend Health
```powershell
Invoke-WebRequest http://localhost:9000/health
# Expected: StatusCode = 200
```

### Test 4: Store API
```powershell
$headers = @{"x-publishable-api-key"="pk_d3f72b8d59e3da35369fa2fc583a61586e5c04ab3cc378ecafe92530a5da6a9a"}
Invoke-WebRequest -Uri "http://localhost:9000/store/regions" -Headers $headers
# Expected: StatusCode = 200, Returns Europe region
```

### Test 5: Storefront
```powershell
Invoke-WebRequest http://localhost:8000
# Expected: StatusCode = 200, Content > 90,000 bytes
```

### Test 6: Admin Dashboard
```powershell
Start-Process "http://localhost:9000/app"
# Expected: Login page loads, can log in with admin@medusa.com
```

### Test 7: Storefront Products
```powershell
Start-Process "http://localhost:8000"
# Expected: Homepage with products visible
```

---

## 📈 CURRENT PERFORMANCE METRICS

From verified logs:
- Backend startup: ~30ms
- Store API /regions: ~14ms (excellent)
- Store API /products: ~129ms (good, includes joins)
- Store API /collections: ~10ms (excellent)
- Storefront load: ~1.3s first load (Next.js compilation)
- Storefront subsequent: <500ms (fast)

---

## 🗄️ DATABASE STATE

### Tables Created
- ✅ All 164 migrations completed
- ✅ 19 module link tables created
- ✅ Demo data seeded

### Products
- ✅ Multiple demo products loaded
- ✅ Product images uploaded
- ✅ Variants configured
- ✅ Inventory tracked

### Regions
- ✅ Europe region (EUR currency)
- ✅ ID: reg_01K89RCZH1E1G0G79VVP08T9TP

### Users
- ✅ Admin user: admin@medusa.com

---

## 🔍 KNOWN WORKING FEATURES

### Backend/Admin
- ✅ Login/authentication
- ✅ Product management
- ✅ Product creation with images
- ✅ Variant management
- ✅ Inventory tracking
- ✅ Store configuration
- ✅ API endpoints
- ✅ Database queries
- ✅ File uploads

### Storefront
- ✅ Homepage loading
- ✅ Product listings from backend
- ✅ Product images from backend
- ✅ Region-based routing
- ✅ Collection displays
- ✅ Category displays
- ✅ Navigation menu
- ✅ Responsive design
- ✅ API authentication

### Integration
- ✅ Backend → Database queries
- ✅ Storefront → Backend API calls
- ✅ Admin → Backend API calls
- ✅ CORS working
- ✅ Authentication working
- ✅ Image serving working

---

## ⚠️ CRITICAL NOTES FOR RESTORE

### If PostgreSQL Won't Start
1. Check service: `Get-Service postgresql-x64-17`
2. Start manually: `Start-Service postgresql-x64-17`
3. Verify port: `netstat -ano | Select-String "5433"`
4. Full path: `G:\FastGrams program files\Postgresql 17\bin\postgres.exe`

### If Backend Won't Start
1. Check PostgreSQL is running first
2. Verify .env file exists and has correct DATABASE_URL
3. Try: `npm install` then `npm run dev`
4. Check port 9000 is available

### If Storefront Won't Start
1. Check backend is running first
2. Verify .env.local has BOTH environment variables:
   - `MEDUSA_BACKEND_URL=http://localhost:9000`
   - `NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000`
3. Clear cache: `Remove-Item -Path ".next" -Recurse -Force`
4. Try: `npm install` then `npm run dev`
5. Check port 8000 is available

### If Connection Fails
1. Verify publishable API key is correct in .env.local
2. Check CORS settings in backend .env
3. Restart both backend and storefront
4. Check backend logs for errors

---

## 📋 QUICK RESTORE CHECKLIST

If something breaks after restart:

- [ ] PostgreSQL service running?
- [ ] PostgreSQL on port 5433?
- [ ] Backend .env file present and correct?
- [ ] Storefront .env.local file present with BOTH variables?
- [ ] Backend dependencies installed? (node_modules exists)
- [ ] Storefront dependencies installed? (node_modules exists)
- [ ] Ports 9000 and 8000 available?
- [ ] Can connect to database manually?
- [ ] Backend health endpoint responds?
- [ ] Store API regions endpoint works?

---

## 🆘 EMERGENCY RESTORE COMMANDS

### Recreate Backend .env
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
@"
DATABASE_URL=postgres://postgres@localhost:5433/medusa-backend
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:9000,http://localhost:7001
AUTH_CORS=http://localhost:9000,http://localhost:7001
JWT_SECRET=supersecret_change_in_production
COOKIE_SECRET=supersecret_change_in_production
MEDUSA_ADMIN_BACKEND_URL=http://localhost:9000
MEDUSA_BACKEND_URL=http://localhost:9000
NODE_ENV=development
"@ | Out-File -FilePath ".env" -Encoding utf8
```

### Recreate Storefront .env.local
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront"
@"
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_d3f72b8d59e3da35369fa2fc583a61586e5c04ab3cc378ecafe92530a5da6a9a
NEXT_PUBLIC_BASE_URL=http://localhost:8000
"@ | Out-File -FilePath ".env.local" -Encoding utf8 -Force
```

### Retrieve Publishable Key (if needed)
```powershell
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 medusa-backend -t -c "SELECT token FROM api_key WHERE type = 'publishable' LIMIT 1;"
```

---

## 📚 REFERENCE DOCUMENTATION

All documentation verified and up-to-date:
- ✅ README.md - Project overview
- ✅ STARTUP_GUIDE.md - Daily startup instructions
- ✅ STOREFRONT_SETUP.md - Storefront configuration
- ✅ CONNECTION_VERIFIED.md - Connection verification (just created)
- ✅ INSTALLATION_COMPLETE.md - Backend installation details
- ✅ POSTGRESQL_VERIFICATION.md - Database verification
- ✅ KNOWN_ISSUES_AND_SOLUTIONS.md - Troubleshooting guide
- ✅ QUICK_REFERENCE.md - Command reference

---

## 🎯 NEXT TEST: RESTART VERIFICATION

**What You're About To Do**:
1. Restart Windows machine
2. After boot, test startup scripts
3. Verify all services start correctly
4. Confirm connection still works

**Expected Outcome**:
- PostgreSQL should auto-start (if configured)
- `Start-MedusaFull.ps1` should start everything
- All services should be accessible
- Connection should work exactly as before restart

**If It Works**: Great! The quickstart procedure is validated.

**If It Doesn't Work**: Use this document to restore to working state.

---

## ✅ SNAPSHOT STATUS

**Captured At**: 8:40 PM EST, October 23, 2025  
**Components**: All verified working  
**Configuration Files**: Backed up in this document  
**Tests**: All passing  
**Ready for**: Machine restart test  

**This is your restore point!** 📸

---

**Good luck with the restart test! See you on the other side! 🚀**

