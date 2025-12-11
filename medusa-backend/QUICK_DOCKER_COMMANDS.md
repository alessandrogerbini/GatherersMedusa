# Quick Docker Commands - Directory Reference

## ⚠️ Important: Correct Directory

**All Docker commands must be run from:**
```
G:\FastGrams program files\GG Medusa V2 website\medusa-backend
```

## 📋 Commands from Parent Directory

If you're in `GG Medusa V2 website\`, use:

```powershell
# Change to medusa-backend first
cd medusa-backend

# Then run commands
Get-Content docker-build-output.log -Tail 20
```

Or use full paths:

```powershell
# Check build log
Get-Content "medusa-backend\docker-build-output.log" -Tail 20

# Check if build is still running
docker ps | Select-String "medusa"

# Check if image exists
docker images | Select-String "test-runner"
```

## 🚀 Quick Commands (from medusa-backend directory)

```powershell
# Navigate to correct directory
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"

# Check build log
Get-Content docker-build-output.log -Tail 20

# Check build progress (if log doesn't exist, build hasn't started)
if (Test-Path docker-build-output.log) {
    Write-Host "Build log found. Last 20 lines:" -ForegroundColor Green
    Get-Content docker-build-output.log -Tail 20
} else {
    Write-Host "No build log found. Starting build..." -ForegroundColor Yellow
    docker-compose -f docker-compose.test.yml build test-runner 2>&1 | Tee-Object -FilePath docker-build-output.log
}

# Check if PostgreSQL is running
docker ps | Select-String "medusa-test-postgres"

# Check if test runner image exists
docker images | Select-String "test-runner"
```

## 🔍 Check Build Status

From **any directory**, you can check Docker directly:

```powershell
# Check if build process is running
docker ps -a | Select-String "medusa"

# Check if image was built
docker images medusa-backend-test-runner

# Check PostgreSQL container
docker ps | Select-String "postgres"
```

## 📝 File Locations

- `docker-build-output.log` → `medusa-backend\docker-build-output.log`
- `docker-test-output.log` → `medusa-backend\docker-test-output.log`
- `docker-compose.test.yml` → `medusa-backend\docker-compose.test.yml`

