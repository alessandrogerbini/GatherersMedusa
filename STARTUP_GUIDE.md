# 🚀 Medusa V2 - Quick Startup Guide

**For starting Medusa Backend and Storefront after a fresh PC boot**

---

## ⚡ Quick Start - Full Stack (All Services)

⚠️ **CRITICAL**: Backend must be fully ready before storefront starts!  
**Total startup time**: 70-90 seconds (be patient!)

### One-Click Startup 🎯

**Option 1: Double-click** the file: `Start-MedusaFull.ps1`

**Option 2: Run from terminal:**
```powershell
& "G:\FastGrams program files\GG Medusa V2 website\Start-MedusaFull.ps1"
```

**Option 3: Short version** (from project directory):
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website"
.\start.ps1
```

**This will:**
- ✅ Check and start PostgreSQL
- ✅ Start Backend (Admin + API) + **wait 40s & verify**
- ✅ Start Storefront (only after backend ready) + **wait 30s**
- ✅ Open both in your browser

**The script handles proper timing automatically!**

---

## ⚡ Manual Start (3 Steps Per Service)

### Backend Only

### 1️⃣ Verify PostgreSQL is Running

```powershell
# Check PostgreSQL service status
Get-Service postgresql-x64-17
```

**If stopped, start it**:
```powershell
Start-Service postgresql-x64-17
```

---

### 2️⃣ Start Medusa Server

```powershell
# Navigate to Medusa directory
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"

# Start development server
npm run dev
```

**Expected output**:
```
info:    Admin URL → http://localhost:9000/app
√ Server is ready on port: 9000
```

---

### 3️⃣ Access Admin Dashboard

Open your browser and go to:

**🌐 http://localhost:9000/app**

**Login**:
- **Email**: `admin@medusa.com`
- **Password**: `supersecret`

---

### Storefront Only

### 1️⃣ **CRITICAL: Ensure Backend is FULLY Running**

⚠️ **The storefront requires the backend to be FULLY READY (not just started)!**

**Wait at least 40 seconds after starting backend, then verify**:
```powershell
# ❌ WRONG: Health check gives false positive!
# Invoke-WebRequest http://localhost:9000/health  # DON'T USE THIS

# ✅ CORRECT: Test actual admin page
Invoke-WebRequest http://localhost:9000/app
# MUST return: StatusCode = 200
```

**Why this matters**:
- Health endpoint responds immediately but app may not be ready
- Storefront middleware needs backend Store API fully initialized
- Starting storefront too early causes "fetch failed" errors

---

### 2️⃣ Start Storefront (Only After Backend Verified)

```powershell
# Navigate to storefront directory
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront"

# Start development server
npm run dev
```

**Expected output**:
```
✓ Ready in X.Xs
○ Compiling / ...
✓ Compiled / in X.Xs
```

**Wait 30 seconds** for Next.js to compile on first start.

---

### 3️⃣ Access Storefront

Open your browser and go to:

**🌐 http://localhost:8000**

You should see the storefront homepage with products!

**⏱️ Total Time**: Backend (40s) + Storefront (30s) = **~70-90 seconds**

---

## ✅ Verification Checks

### Check PostgreSQL
```powershell
Get-Service postgresql-x64-17
# Should show: Status = Running
```

### Check Backend is FULLY Ready (Correct Method)
```powershell
# ✅ CORRECT: Test admin page (actual app)
Invoke-WebRequest http://localhost:9000/app
# Should show: StatusCode = 200

# ❌ WRONG: Health endpoint gives false positive
# Invoke-WebRequest http://localhost:9000/health  # DON'T USE THIS
```

⚠️ **Why health check is unreliable**:
- `/health` endpoint responds immediately when port opens
- But backend app may still be compiling/initializing
- `/app` endpoint only works when backend is fully ready

### Test Database Connection
```powershell
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 medusa-backend -c "SELECT 1;"
# Should return: 1
```

---

## 🛑 Stopping the Server

**In the terminal where Medusa is running**:
- Press `Ctrl + C`
- Or close the terminal window

**PostgreSQL** (if you want to stop it):
```powershell
Stop-Service postgresql-x64-17
```

---

## 🔄 One-Liner Startup

For the fastest startup, use this single command:

```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"; npm run dev
```

Then open browser to: **http://localhost:9000/app**

---

## 🆘 Troubleshooting

### Problem: Storefront shows "fetch failed" error
**Cause**: Started storefront before backend was fully ready

**Solution**:
1. Stop storefront (Ctrl+C)
2. Wait for backend admin page to load: http://localhost:9000/app
3. Verify backend ready: `Invoke-WebRequest http://localhost:9000/app`
4. Wait 40 seconds from backend start
5. Then start storefront

**Prevention**: Always start backend first, wait 40s, verify, then start storefront.

---

### Problem: Backend shows blank page
**Cause**: Backend still initializing even though port is open

**Solution**:
1. Wait 40 seconds from when you started `npm run dev`
2. Check terminal output - should see "Server is ready on port: 9000"
3. Refresh browser
4. If still blank after 60s, restart backend

**Don't use `/health` to check** - it gives false positive!

---

### Problem: PostgreSQL not running
```powershell
Start-Service postgresql-x64-17
```

---

### Problem: Port 9000 already in use
```powershell
# Find what's using port 9000
Get-Process -Id (Get-NetTCPConnection -LocalPort 9000).OwningProcess

# Kill the process (replace PID with actual ID)
Stop-Process -Id <PID> -Force
```

---

### Problem: Server won't start
```powershell
# Clean install
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
rm -r node_modules
npm install
npm run dev
```

---

### Problem: Database connection error
```powershell
# Restart PostgreSQL
Restart-Service postgresql-x64-17

# Verify connection
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 -c "SELECT version();"
```

---

## 📋 Startup Checklist

### Backend
- [ ] PostgreSQL service is running
- [ ] Navigated to medusa-backend directory
- [ ] Ran `npm run dev`
- [ ] **WAIT 40 seconds**
- [ ] Server shows "ready on port: 9000" in terminal
- [ ] Verified: `Invoke-WebRequest http://localhost:9000/app` returns 200
- [ ] Opened browser to http://localhost:9000/app
- [ ] Successfully logged into admin dashboard

### Storefront (Only After Backend Ready)
- [ ] Backend is confirmed working (admin page loads)
- [ ] Navigated to medusa-storefront directory
- [ ] Ran `npm run dev`
- [ ] **WAIT 30 seconds** for Next.js compilation
- [ ] Opened browser to http://localhost:8000
- [ ] Storefront shows products

**⏱️ Total Time: 70-90 seconds**

---

## ⚙️ Optional: Auto-Start PostgreSQL

To make PostgreSQL start automatically with Windows:

```powershell
# Set to automatic startup (run as Administrator)
Set-Service -Name postgresql-x64-17 -StartupType Automatic
```

Then PostgreSQL will start automatically when you boot your PC!

---

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| **Admin Dashboard** | http://localhost:9000/app |
| **Backend API** | http://localhost:9000 |
| **Health Check** | http://localhost:9000/health |

---

## 📝 Key Information

| Item | Value |
|------|-------|
| **Project Location** | `G:\FastGrams program files\GG Medusa V2 website\medusa-backend` |
| **PostgreSQL Port** | 5433 ⚠️ (not 5432) |
| **PostgreSQL Service** | `postgresql-x64-17` |
| **Server Port** | 9000 |
| **Admin Email** | admin@medusa.com |
| **Admin Password** | supersecret |

---

## 💡 Quick Tips

### Start Medusa from anywhere:
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend" && npm run dev
```

### Open admin in browser (from PowerShell):
```powershell
Start-Process "http://localhost:9000/app"
```

### Full startup with browser open:
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"; npm run dev; Start-Sleep -Seconds 10; Start-Process "http://localhost:9000/app"
```

---

## 📚 Additional Documentation

For more details, see:
- `INSTALLATION_COMPLETE.md` - Full installation guide
- `QUICK_REFERENCE.md` - Command reference
- `KNOWN_ISSUES_AND_SOLUTIONS.md` - Troubleshooting

---

**Last Updated**: Thursday, October 23, 2025 at 9:15 PM EST  
**Status**: ✅ Tested and Working  
**Important**: Sequential startup with proper wait times is critical for reliability

