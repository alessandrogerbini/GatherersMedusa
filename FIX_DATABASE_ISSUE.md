# Fix Database Authentication Issue - Quick Guide

**Problem**: Tests fail with `password authentication failed for user "aless"`  
**Solution**: Create the PostgreSQL user that the test runner expects

---

## 🚀 Quick Fix (One Command)

Run this in PowerShell:

```powershell
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 -c "CREATE USER aless WITH PASSWORD '' CREATEDB;"
```

This will:
- Create user "aless" with no password (empty password)
- Grant CREATEDB privilege (required for test database creation)
- Allow tests to run immediately

---

## ✅ Verify the Fix

### Check User Was Created

```powershell
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 -c "\du aless"
```

You should see output showing the "aless" user.

### Re-run Tests

```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"
$env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --testPathPattern="integration-tests/http" --runInBand --forceExit
```

Tests should now execute (though some may still fail for functional reasons).

---

## 🔍 Alternative: Check if User Already Exists

If you get an error that the user already exists, you can:

1. **Check existing users**:
```powershell
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 -c "\du"
```

2. **Grant CREATEDB if user exists but lacks permission**:
```powershell
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 -c "ALTER USER aless WITH CREATEDB;"
```

---

## 📝 What This Does

- **Creates user "aless"**: The user the test runner expects
- **Empty password**: Matches what the test runner likely expects
- **CREATEDB privilege**: Allows the user to create test databases
- **No impact on production**: This is only for test databases

---

## ⚠️ Security Note

This creates a user with no password. This is acceptable for:
- Local development
- Test environments
- Isolated test databases

**Do NOT use this in production!**

---

**After creating the user, re-run your tests and they should execute successfully!**







