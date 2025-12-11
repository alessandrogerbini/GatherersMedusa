# Quick Reference: Running Tests in PowerShell

## 🚀 Most Common Commands

### Run All Integration HTTP Tests
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"; $env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --testPathPattern="integration-tests/http" --runInBand --forceExit
```

### Run Single Test File
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"; $env:NODE_OPTIONS="--experimental-vm-modules"
npx jest integration-tests/http/health.spec.ts --runInBand --forceExit
```

### Run with Coverage
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"; $env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --testPathPattern="integration-tests/http" --coverage --runInBand --forceExit
```

## 📋 Test Files Available

- `health.spec.ts` - Health check
- `products.spec.ts` - Products API (8 tests)
- `cart.spec.ts` - Cart API (9 tests)
- `checkout.spec.ts` - Checkout API (7 tests)
- `customers.spec.ts` - Customer API (10 tests)
- `custom-routes.spec.ts` - Custom routes (10 tests)
- `regions.spec.ts` - Regions API (5 tests)
- `new-client-promotions.spec.ts` - Promotions (5 tests)
- `nybs-products-seed.spec.ts` - NYBS seed (10 tests)

## ⚙️ Required Environment Variables

```powershell
$env:TEST_TYPE="integration:http"        # or "unit" or "integration:modules"
$env:NODE_OPTIONS="--experimental-vm-modules"
```

## 📖 Full Documentation

See `medusa-backend/RUN_TESTS_POWERSHELL.md` for complete guide.

