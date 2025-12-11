# Running Tests in PowerShell - Step-by-Step Guide

**Date**: December 8, 2025  
**Environment**: Windows PowerShell  
**Location**: `medusa-backend/` directory

---

## 🚀 Quick Start

### Run All Integration HTTP Tests
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"
$env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --testPathPattern="integration-tests/http" --runInBand --forceExit
```

---

## 📋 Prerequisites

### 1. Navigate to Backend Directory
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
```

### 2. Verify You're in the Right Directory
```powershell
Test-Path "package.json"
Test-Path "jest.config.js"
Test-Path "integration-tests/http"
```

All should return `True`.

---

## 🧪 Running Tests

### Option 1: Run All Integration HTTP Tests

**Step-by-Step:**
```powershell
# 1. Navigate to backend directory
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"

# 2. Set environment variables
$env:TEST_TYPE="integration:http"
$env:NODE_OPTIONS="--experimental-vm-modules"

# 3. Run tests
npx jest --testPathPattern="integration-tests/http" --runInBand --forceExit
```

**One-Liner:**
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"; $env:TEST_TYPE="integration:http"; $env:NODE_OPTIONS="--experimental-vm-modules"; npx jest --testPathPattern="integration-tests/http" --runInBand --forceExit
```

### Option 2: Run Specific Test File

**Run Health Check Test:**
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"
$env:NODE_OPTIONS="--experimental-vm-modules"
npx jest integration-tests/http/health.spec.ts --runInBand --forceExit
```

**Run Products Tests:**
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"
$env:NODE_OPTIONS="--experimental-vm-modules"
npx jest integration-tests/http/products.spec.ts --runInBand --forceExit
```

**Run Cart Tests:**
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"
$env:NODE_OPTIONS="--experimental-vm-modules"
npx jest integration-tests/http/cart.spec.ts --runInBand --forceExit
```

### Option 3: Run All Test Types

**Run Unit Tests:**
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="unit"
$env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --runInBand --forceExit --silent
```

**Run Integration Module Tests:**
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:modules"
$env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --runInBand --forceExit
```

---

## 📊 Running Tests with Coverage

### Generate Coverage Report for Unit Tests
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="unit"
$env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --coverage --runInBand --forceExit --silent
```

### Generate Coverage Report for Integration Tests
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"
$env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --testPathPattern="integration-tests/http" --coverage --runInBand --forceExit
```

### View Coverage Report
After running coverage, open the HTML report:
```powershell
Start-Process "coverage\lcov-report\index.html"
```

---

## 🔧 Environment Variables Explained

### Required Variables

**TEST_TYPE**
- `"integration:http"` - Run HTTP integration tests
- `"integration:modules"` - Run module integration tests
- `"unit"` - Run unit tests

**NODE_OPTIONS**
- `"--experimental-vm-modules"` - Required for Jest with ES modules

### Setting Variables (Choose One Method)

**Method 1: Set for Current Session**
```powershell
$env:TEST_TYPE="integration:http"
$env:NODE_OPTIONS="--experimental-vm-modules"
```

**Method 2: Set for Single Command**
```powershell
$env:TEST_TYPE="integration:http"; $env:NODE_OPTIONS="--experimental-vm-modules"; npx jest ...
```

**Method 3: Clear After Use**
```powershell
$env:TEST_TYPE="integration:http"
$env:NODE_OPTIONS="--experimental-vm-modules"
npx jest ...
Remove-Item Env:\TEST_TYPE
Remove-Item Env:\NODE_OPTIONS
```

---

## 📝 Complete Test Execution Examples

### Example 1: Run All Integration HTTP Tests (Verbose)
```powershell
# Navigate to directory
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"

# Set environment
$env:TEST_TYPE="integration:http"
$env:NODE_OPTIONS="--experimental-vm-modules"

# Run tests with output
npx jest --testPathPattern="integration-tests/http" --runInBand --forceExit --verbose
```

### Example 2: Run Single Test File (Quick)
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"; $env:NODE_OPTIONS="--experimental-vm-modules"
npx jest integration-tests/http/health.spec.ts --runInBand --forceExit
```

### Example 3: Run Tests with Coverage (Full Report)
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"
$env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --testPathPattern="integration-tests/http" --coverage --runInBand --forceExit
Write-Host "Coverage report: coverage\lcov-report\index.html" -ForegroundColor Green
```

---

## 🎯 Common Test Scenarios

### Scenario 1: Quick Test Check
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"; $env:NODE_OPTIONS="--experimental-vm-modules"
npx jest integration-tests/http/health.spec.ts --runInBand --forceExit
```

### Scenario 2: Test Specific Feature
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"; $env:NODE_OPTIONS="--experimental-vm-modules"
npx jest integration-tests/http/cart.spec.ts --runInBand --forceExit
```

### Scenario 3: Test All Products-Related
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"; $env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --testPathPattern="products" --runInBand --forceExit
```

### Scenario 4: Generate Coverage Report
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="unit"
$env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --coverage --runInBand --forceExit --silent
Start-Process "coverage\lcov-report\index.html"
```

---

## 🐛 Troubleshooting

### Issue: "TEST_TYPE is not recognized"
**Solution**: Set environment variable in PowerShell:
```powershell
$env:TEST_TYPE="integration:http"
```

### Issue: "experimental-vm-modules" warning
**Solution**: This is expected, not an error. Tests will still run.

### Issue: Tests timeout
**Solution**: Increase timeout in test file or add to command:
```powershell
npx jest --testTimeout=180000 --runInBand --forceExit
```

### Issue: Database connection errors
**Solution**: Ensure PostgreSQL is running and accessible:
```powershell
Get-Service postgresql-x64-17
```

### Issue: "Cannot find module"
**Solution**: Install dependencies:
```powershell
npm install
```

---

## 📊 Understanding Test Output

### Successful Test Run
```
PASS integration-tests/http/health.spec.ts
  Ping
    ✓ ping the server health endpoint (1234 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

### Failed Test Run
```
FAIL integration-tests/http/health.spec.ts
  Ping
    ✕ ping the server health endpoint (1 ms)
```

### Coverage Output
```
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |    75.5 |     68.2 |    72.3 |    75.1 |
```

---

## 🔄 Running Tests in Sequence

### Run All Test Suites One After Another
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"

# Unit tests
Write-Host "Running unit tests..." -ForegroundColor Cyan
$env:TEST_TYPE="unit"; $env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --runInBand --forceExit --silent

# Integration module tests
Write-Host "Running integration module tests..." -ForegroundColor Cyan
$env:TEST_TYPE="integration:modules"; $env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --runInBand --forceExit

# Integration HTTP tests
Write-Host "Running integration HTTP tests..." -ForegroundColor Cyan
$env:TEST_TYPE="integration:http"; $env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --testPathPattern="integration-tests/http" --runInBand --forceExit

Write-Host "All tests completed!" -ForegroundColor Green
```

---

## 💡 Pro Tips

### Tip 1: Create a PowerShell Function
Add to your PowerShell profile for quick access:
```powershell
function Run-MedusaTests {
    param([string]$TestType = "integration:http")
    cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
    $env:TEST_TYPE=$TestType
    $env:NODE_OPTIONS="--experimental-vm-modules"
    if ($TestType -eq "integration:http") {
        npx jest --testPathPattern="integration-tests/http" --runInBand --forceExit
    } else {
        npx jest --runInBand --forceExit
    }
}

# Usage:
# Run-MedusaTests
# Run-MedusaTests -TestType "unit"
```

### Tip 2: Watch Mode (Auto-rerun on Changes)
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"; $env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --testPathPattern="integration-tests/http" --watch --runInBand
```

### Tip 3: Run Only Failed Tests
```powershell
npx jest --testPathPattern="integration-tests/http" --onlyFailures --runInBand --forceExit
```

---

## 📚 Available Test Files

Run any of these specific test files:

```powershell
# Health check
npx jest integration-tests/http/health.spec.ts

# Products API
npx jest integration-tests/http/products.spec.ts

# Cart API
npx jest integration-tests/http/cart.spec.ts

# Checkout API
npx jest integration-tests/http/checkout.spec.ts

# Customers API
npx jest integration-tests/http/customers.spec.ts

# Custom routes
npx jest integration-tests/http/custom-routes.spec.ts

# Regions API
npx jest integration-tests/http/regions.spec.ts

# New client promotions
npx jest integration-tests/http/new-client-promotions.spec.ts

# NYBS products seed
npx jest integration-tests/http/nybs-products-seed.spec.ts
```

**Remember**: Always set `$env:TEST_TYPE="integration:http"` and `$env:NODE_OPTIONS="--experimental-vm-modules"` before running!

---

**Last Updated**: December 8, 2025







