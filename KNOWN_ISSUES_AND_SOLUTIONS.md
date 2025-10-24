# Medusa V2 Known Issues & Solutions

**Date**: Thursday, October 23, 2025  
**Target Environment**: Windows 10, Node.js v22.19.0, PostgreSQL 17.6

---

## 🚨 Critical Issues to Avoid

### 1. Server Unresponsiveness (GitHub Issue #13636)

**Symptom**: Both frontend and backend servers fail to load or crash, even with all modules disabled or a clean database.

**Our Prevention Strategy**:
- ✅ Using verified PostgreSQL 17 connection
- ✅ Using correct port (5433, not default 5432)
- ✅ Installing with `--no-browser` flag to prevent auto-launch issues
- ✅ Using `--seed` flag for demo data to ensure proper database setup

**If This Occurs**:
```powershell
# Stop all running processes
# Navigate to medusa-backend directory
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"

# Clean install
rm -r node_modules
npm install

# Reset database
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\dropdb.exe" -U postgres -h localhost -p 5433 medusa-backend --if-exists
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\createdb.exe" -U postgres -h localhost -p 5433 medusa-backend

# Run migrations
npx medusa migrations run

# Restart server
npm run dev
```

---

## 🔧 PostgreSQL Connection Issues

### Issue 1: "Couldn't connect to PostgreSQL"

**Causes**:
- PostgreSQL service not running
- Incorrect credentials
- Wrong port number
- Network/firewall blocking connection

**Our Prevention**:
- ✅ PostgreSQL service verified running (`postgresql-x64-17`)
- ✅ Credentials tested and confirmed (postgres/empty password)
- ✅ Port 5433 confirmed listening
- ✅ Connection tested successfully

**Solution If It Occurs**:
```powershell
# Verify service is running
Get-Service postgresql-x64-17

# If not running, start it
Start-Service postgresql-x64-17

# Test connection manually
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 -c "SELECT version();"
```

### Issue 2: "Permission denied to create database"

**Cause**: PostgreSQL user lacks `CREATEDB` privilege

**Our Prevention**:
- ✅ Verified `postgres` user has Superuser privileges
- ✅ Confirmed `Create DB` permission exists

**Solution If It Occurs**:
```sql
ALTER USER postgres WITH CREATEDB;
```

Run this command:
```powershell
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 -c "ALTER USER postgres WITH CREATEDB;"
```

### Issue 3: "ERR_INVALID_URL" - Invalid Database URL

**Causes**:
- Malformed connection string
- Special characters in password not encoded
- Missing port or host information

**Correct Format**:
```
postgres://postgres:@localhost:5433/medusa-backend
```

**Common Mistakes**:
- ❌ `postgres://postgres@localhost/medusa-backend` (missing port)
- ❌ `postgres://postgres:@localhost:5432/medusa-backend` (wrong port)
- ❌ `postgres://user:pass@word@localhost:5433/db` (unencoded special chars)

**Our Setup** (Verified Correct):
```
postgres://postgres:@localhost:5433/medusa-backend
```

---

## ⚠️ Port Configuration Issues

### Issue: Using Wrong Port (5432 instead of 5433)

**Critical**: Port 5432 is occupied by Odoo PostgreSQL 12 installation!

**Our PostgreSQL 17 Port**: **5433**

**What Will Happen if You Use 5432**:
- Connection will succeed BUT to the wrong PostgreSQL instance (version 12)
- Medusa might install but fail with version incompatibilities
- Database will be created in Odoo's PostgreSQL, not your Medusa PostgreSQL

**Always Use Port 5433**:
```bash
# Correct connection string
postgres://postgres:@localhost:5433/medusa-backend

# Correct psql command
psql -U postgres -h localhost -p 5433

# Verify you're on the right instance
psql -U postgres -h localhost -p 5433 -c "SELECT version();"
# Should return: PostgreSQL 17.6
```

---

## 🪟 Windows-Specific Issues

### Issue 1: Path with Spaces

**Problem**: Windows paths with spaces can cause issues in terminal commands

**Our Path**: `G:\FastGrams program files\GG Medusa V2 website`

**Solutions**:
```powershell
# Always use quotes around paths
cd "G:\FastGrams program files\GG Medusa V2 website"

# Or use backticks before spaces (PowerShell)
cd G:\FastGrams` program` files\GG` Medusa` V2` website
```

### Issue 2: Long Path Names

**Problem**: Windows has 260 character path limit (can be extended)

**Prevention**:
- Keep project names short
- Install in root directories when possible
- Enable long paths in Windows if needed

**Enable Long Paths** (Run as Administrator):
```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

### Issue 3: PowerShell Execution Policy

**Problem**: Scripts might be blocked by execution policy

**Solution**:
```powershell
# Check current policy
Get-ExecutionPolicy

# If Restricted, temporarily allow scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 🌐 CORS Issues

### Issue: Admin Dashboard CORS Errors

**Symptoms**:
- Admin loads but can't connect to backend
- Console shows CORS policy errors
- API requests blocked

**Prevention** (Configure in `medusa-config.ts`):
```typescript
module.exports = defineConfig({
  projectConfig: {
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:9000,http://localhost:7001",
      authCors: process.env.AUTH_CORS || "http://localhost:9000,http://localhost:7001",
    },
  },
})
```

**Solution If It Occurs**:
1. Check `medusa-config.ts` CORS settings
2. Verify `.env` file has correct CORS origins
3. Restart Medusa server after changes

---

## 📦 Node.js & NPM Issues

### Issue 1: Node Version Mismatch

**Requirement**: Node.js v20+

**Our Version**: ✅ v22.19.0 (Compatible)

**If Using Wrong Version**:
```powershell
# Check version
node --version

# Use nvm (Node Version Manager) to switch versions if needed
nvm install 22
nvm use 22
```

### Issue 2: NPM Cache Issues

**Symptoms**:
- Installation fails mid-way
- Package resolution errors
- Corrupted dependencies

**Solution**:
```powershell
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock
rm -r node_modules
rm package-lock.json

# Reinstall
npm install
```

### Issue 3: EACCES Permission Errors

**Windows Solution**:
```powershell
# Run terminal as Administrator
# Or fix npm permissions
npm config set prefix %APPDATA%\npm
```

---

## 🗄️ Database Migration Issues

### Issue: Migrations Fail or Don't Run

**Symptoms**:
- Database tables not created
- Missing columns errors
- "relation does not exist" errors

**Solution**:
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"

# Run migrations manually
npx medusa migrations run

# If migrations fail, check connection
npx medusa migrations show

# Reset and rerun (DESTRUCTIVE - only for development)
npx medusa migrations revert --all
npx medusa migrations run
```

---

## 🔐 Authentication Issues

### Issue: pg_hba.conf Authentication Method

**Problem**: PostgreSQL might reject password authentication

**Our Current Setup**: Empty password authentication working ✅

**If Authentication Fails**:

1. Locate `pg_hba.conf`:
   ```
   G:\FastGrams program files\Postgresql 17\data\pg_hba.conf
   ```

2. Check authentication method:
   ```conf
   # Look for this line
   host    all             all             127.0.0.1/32            scram-sha-256
   ```

3. Change to `trust` or `md5` if needed (for local development):
   ```conf
   host    all             all             127.0.0.1/32            trust
   ```

4. Restart PostgreSQL service:
   ```powershell
   Restart-Service postgresql-x64-17
   ```

---

## 🚀 Installation Best Practices

### Recommended Installation Command

**Method 1: Using Database URL (RECOMMENDED)**
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website"
npx create-medusa-app@latest medusa-backend --db-url "postgres://postgres:@localhost:5433/medusa-backend" --no-browser --seed
```

**Method 2: Interactive (if Method 1 fails)**
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website"
npx create-medusa-app@latest medusa-backend --no-browser --seed

# When prompted:
# - Next.js Storefront: No
# - Username: postgres
# - Password: (press Enter - leave blank)
# - Host: localhost
# - Port: 5433
```

**Method 3: Skip DB Setup (manual configuration)**
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website"
npx create-medusa-app@latest medusa-backend --skip-db --no-browser

# Then manually configure medusa-config.ts and run migrations
```

---

## 🔍 Diagnostic Commands

### Pre-Installation Checks

```powershell
# Check Node.js
node --version  # Should be v20+

# Check NPM
npm --version

# Check Git
git --version

# Check PostgreSQL service
Get-Service postgresql-x64-17

# Test PostgreSQL connection
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 -c "SELECT version();"

# Check port availability
netstat -ano | Select-String "5433"
```

### Post-Installation Checks

```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"

# Check if database was created
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 -l | Select-String "medusa"

# Verify migrations ran
npx medusa migrations show

# Test server start
npm run dev
```

---

## 📋 Troubleshooting Checklist

Before reporting an issue, verify:

- [ ] PostgreSQL service is running (`Get-Service postgresql-x64-17`)
- [ ] Using correct port 5433 (not 5432)
- [ ] Node.js version is v20+ (`node --version`)
- [ ] Database exists and user has permissions
- [ ] Connection string format is correct
- [ ] No firewall blocking port 5433
- [ ] Terminal running with adequate permissions
- [ ] Path names are quoted when containing spaces
- [ ] `.env` file exists and has correct values
- [ ] Migrations have been run (`npx medusa migrations show`)

---

## 🆘 Getting Help

### Official Resources
- [Medusa Documentation](https://docs.medusajs.com/)
- [Medusa GitHub Issues](https://github.com/medusajs/medusa/issues)
- [Medusa Discord Community](https://discord.gg/medusajs)

### Common Error Search
```
site:github.com/medusajs/medusa [your error message]
```

### Log Files
```powershell
# Check Medusa logs
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
cat .medusa/server.log

# Check PostgreSQL logs
cd "G:\FastGrams program files\Postgresql 17\data\log"
ls | Sort-Object LastWriteTime -Descending | Select-Object -First 1
```

---

## ✅ Our Preventive Measures Summary

What we've already done to prevent issues:

1. ✅ Verified all prerequisites are installed correctly
2. ✅ Tested PostgreSQL connection with correct credentials
3. ✅ Confirmed PostgreSQL is running on port 5433
4. ✅ Verified postgres user has superuser privileges
5. ✅ Documented correct connection string format
6. ✅ Prepared multiple installation methods
7. ✅ Created comprehensive troubleshooting guide
8. ✅ Identified Windows-specific considerations

**We are well-prepared to proceed with installation!**

