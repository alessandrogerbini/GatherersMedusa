# 🔧 QUICK RESTORE INSTRUCTIONS

**Use if quickstart fails after restart**

---

## 🎯 ONE-CLICK RESTORE (Easiest)

### From Terminal:
```powershell
& "G:\FastGrams program files\GG Medusa V2 website\Start-MedusaFull.ps1"
```

**Or from project directory:**
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website"
.\Start-MedusaFull.ps1
```

**Or use the short version:**
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website"
.\start.ps1
```

This handles everything automatically (PostgreSQL check, sequential startup, proper timing, browser opening).

---

## ⚡ MANUAL RESTORE (Run These in Order)

### 1. Check PostgreSQL
```powershell
Get-Service postgresql-x64-17
# If stopped: Start-Service postgresql-x64-17
```

### 2. Verify Database Connection
```powershell
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 medusa-backend -c "SELECT 1;"
# Should return: 1
```

### 3. Start Backend (Terminal 1)
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
npm run dev
```
**Wait for**: "Server is ready on port: 9000"

### 4. **CRITICAL: WAIT 40 Seconds & Verify Backend Ready**
```powershell
# Test admin page (not just health endpoint!)
Invoke-WebRequest http://localhost:9000/app
# Must return: HTTP 200 OK
```
**DO NOT start storefront until backend admin page responds!**

### 5. Start Storefront (Terminal 2 - Only After Backend Ready)
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront"
npm run dev
```
**Wait for**: "Ready in X.Xs"

### 6. Wait 30 Seconds for Storefront to Compile
Next.js needs time to compile on first start.

### 7. Test Both Services
- Open: http://localhost:9000/app (Admin)
- Open: http://localhost:8000 (Storefront)

**Total Time**: ~70-90 seconds

---

## 🆘 IF THAT DOESN'T WORK

See **`WORKING_STATE_SNAPSHOT.md`** for:
- Complete configuration file contents
- Emergency restore commands
- Detailed troubleshooting
- All working settings

---

**Snapshot Created**: 8:40 PM EST, October 23, 2025  
**Status Before Restart**: ✅ FULLY FUNCTIONAL


