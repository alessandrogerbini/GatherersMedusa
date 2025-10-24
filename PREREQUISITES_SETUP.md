# Medusa V2 Backend Setup - Prerequisites Documentation

**Date**: Thursday, October 23, 2025
**Workspace Location**: `G:\FastGrams program files\GG Medusa V2 website`

---

## ✅ Prerequisites Status

All required prerequisites for Medusa V2 installation have been verified and are properly installed.

---

## 1. Node.js

**Status**: ✅ Installed and Verified  
**Version**: v22.19.0  
**Required Version**: v20+ (Requirement Met)  
**Installation Path**: `G:\FastGrams program files\Node js\`  
**Executable Path**: `G:\FastGrams program files\Node js\node.exe`  
**NPM Included**: Yes  

**Verification Command**:
```powershell
node --version
# Output: v22.19.0
```

**Path to Executable**:
```powershell
where.exe node
# Output: G:\FastGrams program files\Node js\node.exe
```

---

## 2. Git CLI Tool

**Status**: ✅ Installed and Verified  
**Version**: 2.50.1.windows.1  
**Required Version**: Any recent version (Requirement Met)  
**Installation Path**: `G:\Git\`  
**Executable Path**: `G:\Git\cmd\git.exe`  

**Verification Command**:
```powershell
git --version
# Output: git version 2.50.1.windows.1
```

**Path to Executable**:
```powershell
where.exe git
# Output: G:\Git\cmd\git.exe
```

---

## 3. PostgreSQL

**Status**: ✅ Installed and Verified  
**Version**: 17.6  
**Required Version**: PostgreSQL (any recent version, Requirement Met)  
**Installation Path**: `G:\FastGrams program files\Postgresql 17\`  
**Binary Directory**: `G:\FastGrams program files\Postgresql 17\bin\`  
**Data Directory**: `G:\FastGrams program files\Postgresql 17\data\`  
**PSQL Executable**: `G:\FastGrams program files\Postgresql 17\bin\psql.exe`  

**Verification Command**:
```powershell
& "G:\FastGrams program files\Postgresql 17\bin\psql.exe" --version
# Output: psql (PostgreSQL) 17.6
```

**Important Note**: PostgreSQL is NOT in the system PATH. You need to use the full path to access PostgreSQL commands or add the bin directory to your PATH environment variable.

---

## ✅ Installation Method Decision

**RECOMMENDED**: Standard Installation (Non-Docker)  
**Reference**: See `INSTALLATION_RECOMMENDATION.md` for detailed analysis

**Why Standard Installation**:
- All prerequisites verified and tested
- Simpler setup for development
- Better performance (native execution)
- Comprehensive troubleshooting docs prepared
- Direct access to code and PostgreSQL

**Alternative**: Docker installation available (see `INSTALLATION_RECOMMENDATION.md`)

---

## Next Steps for Medusa Installation

### ✅ Verified Database Configuration:

**PostgreSQL 17 Connection Details** (Tested and Confirmed):
1. **PostgreSQL Username**: `postgres`
2. **PostgreSQL Password**: *(empty/blank password)*
3. **PostgreSQL Host**: `localhost`
4. **PostgreSQL Port**: `5433` ⚠️ **NOTE: NOT the default 5432!**

**Important**: Port 5432 is being used by your Odoo PostgreSQL 12 installation, so PostgreSQL 17 is running on port 5433.

**Connection String for Medusa**:
```
postgres://postgres:@localhost:5433/medusa-backend
```

**Test Connection Results**:
- ✅ Service Status: Running (`postgresql-x64-17`)
- ✅ User Authentication: Successful
- ✅ Database Creation: Verified
- ✅ Database Deletion: Verified
- ✅ User Privileges: Superuser with full permissions

### Installation Command:
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website"
npx create-medusa-app@latest medusa-backend --no-browser --seed
```

### Alternative Installation Options:

#### Option 1: Using Database URL (✅ RECOMMENDED - Uses verified credentials)
```powershell
npx create-medusa-app@latest medusa-backend --db-url "postgres://postgres:@localhost:5433/medusa-backend" --no-browser --seed
```

#### Option 2: Skip Database Setup Initially
```powershell
npx create-medusa-app@latest medusa-backend --skip-db --no-browser
```

#### Option 3: Interactive Installation (will prompt for credentials)
```powershell
npx create-medusa-app@latest medusa-backend --no-browser --seed
# When prompted:
# - Next.js Storefront: No
# - Username: postgres
# - Password: (press Enter - leave blank)
# - Host: localhost
# - Port: 5433
```

---

## System Information

**Operating System**: Windows 10 (Build 19045)  
**Shell**: PowerShell  
**Shell Path**: `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`  

---

## File Structure

Current workspace directory structure:
```
G:\FastGrams program files\GG Medusa V2 website\
├── GG Medusa V2 website.code-workspace
└── PREREQUISITES_SETUP.md (this file)
```

After Medusa installation, the structure will be:
```
G:\FastGrams program files\GG Medusa V2 website\
├── medusa-backend/           (Medusa application directory)
│   ├── src/                  (Custom development)
│   ├── medusa-config.ts      (Configuration file)
│   ├── package.json
│   └── ...
├── GG Medusa V2 website.code-workspace
└── PREREQUISITES_SETUP.md
```

---

## Troubleshooting

### PostgreSQL Not in PATH
If you need to add PostgreSQL to your system PATH:
1. Open System Properties → Environment Variables
2. Edit the "Path" variable
3. Add: `G:\FastGrams program files\Postgresql 17\bin`
4. Restart your terminal

### Checking PostgreSQL Service
To verify PostgreSQL is running:
```powershell
Get-Service | Where-Object {$_.DisplayName -like "*PostgreSQL*"}
```

---

## Documentation Reference

Official Medusa V2 Installation Guide:
- https://docs.medusajs.com/learn/installation

