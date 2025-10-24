# 🚀 Medusa Startup Commands - Quick Reference

**All the ways to start your Medusa services**

---

## 🎯 ONE-CLICK AUTOMATED STARTUP (Recommended)

### Method 1: Double-Click
Just double-click the file in Windows Explorer:
- `Start-MedusaFull.ps1` (Full stack - Backend + Storefront)
- `Start-Medusa.ps1` (Backend only)

### Method 2: Terminal - From Anywhere
```powershell
& "G:\FastGrams program files\GG Medusa V2 website\Start-MedusaFull.ps1"
```

### Method 3: Terminal - From Project Directory (Shortest)
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website"
.\start.ps1
```

**⏱️ Total Time**: 70-90 seconds (handles timing automatically)

---

## ⚡ MANUAL STARTUP (For Advanced Users)

### Backend First (Terminal 1)
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
npm run dev
```
**⏳ WAIT 40 seconds** and verify ready:
```powershell
Invoke-WebRequest http://localhost:9000/app
```

### Storefront Second (Terminal 2 - Only After Backend Ready)
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront"
npm run dev
```
**⏳ WAIT 30 seconds** for compilation

---

## 🔧 BACKEND ONLY

### One-Click
```powershell
& "G:\FastGrams program files\GG Medusa V2 website\Start-Medusa.ps1"
```

### Manual
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
npm run dev
```

---

## 🛑 STOPPING SERVICES

### Stop from Terminal
Press `Ctrl + C` in each terminal window

### Kill Processes (if stuck)
```powershell
# Find and kill backend
Get-Process -Id (Get-NetTCPConnection -LocalPort 9000).OwningProcess | Stop-Process -Force

# Find and kill storefront
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process -Force
```

---

## ✅ VERIFICATION COMMANDS

### Check PostgreSQL
```powershell
Get-Service postgresql-x64-17
```

### Check Backend is Ready (Correct Method)
```powershell
Invoke-WebRequest http://localhost:9000/app
# Must return: StatusCode 200
```

### Check Storefront is Ready
```powershell
Invoke-WebRequest http://localhost:8000
# Must return: StatusCode 200
```

### Test Database Connection
```powershell
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 medusa-backend -c "SELECT 1;"
```

---

## 🌐 ACCESS URLS

| Service | URL |
|---------|-----|
| **Admin Dashboard** | http://localhost:9000/app |
| **Backend API** | http://localhost:9000 |
| **Storefront** | http://localhost:8000 |

### Login Credentials
- **Email**: admin@medusa.com
- **Password**: supersecret

---

## 💡 QUICK TIPS

### Copy-Paste Quick Start
```powershell
# From anywhere - starts everything
& "G:\FastGrams program files\GG Medusa V2 website\Start-MedusaFull.ps1"
```

### Open Admin Dashboard
```powershell
Start-Process "http://localhost:9000/app"
```

### Open Storefront
```powershell
Start-Process "http://localhost:8000"
```

---

## ⚠️ CRITICAL REMINDERS

1. **Backend MUST be ready before starting storefront** (40 seconds minimum)
2. **Don't use `/health` to verify** - it gives false positives
3. **Use `/app` endpoint** to verify backend is actually ready
4. **Be patient** - 70-90 seconds is normal
5. **Sequential not parallel** - never start both at once

---

## 🆘 QUICK TROUBLESHOOTING

### "fetch failed" in storefront
**Cause**: Started storefront before backend ready  
**Fix**: Stop storefront, wait for backend, then restart storefront

### Blank backend page
**Cause**: Backend still initializing  
**Fix**: Wait 40 seconds, refresh browser

### Port already in use
```powershell
# Find what's using the port
Get-Process -Id (Get-NetTCPConnection -LocalPort 9000).OwningProcess
# Kill it
Stop-Process -Id <PID> -Force
```

---

**Last Updated**: Thursday, October 23, 2025 at 9:25 PM EST  
**Status**: ✅ Tested and Working

