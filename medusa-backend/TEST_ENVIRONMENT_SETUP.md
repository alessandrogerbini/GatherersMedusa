# Test Environment Setup Guide

This guide helps you configure the test environment for running the comprehensive test suite.

---

## 📋 Prerequisites

### Required Software
- **Node.js**: >= 20.0.0
- **PostgreSQL**: 17.x (or compatible version)
- **npm** or **yarn**: Package manager

### Verify Installation
```powershell
node --version    # Should be >= 20.0.0
psql --version    # Should show PostgreSQL version
npm --version     # Should show npm version
```

---

## 🔧 Environment Configuration

### 1. Database Setup

The tests use the Medusa test runner which creates isolated test databases. However, you need:

1. **PostgreSQL Running**: Ensure PostgreSQL service is running
   ```powershell
   # Check if PostgreSQL is running
   Get-Service -Name postgresql*
   ```

2. **Database Connection**: The test runner will use environment variables or default to a test database

### 2. Environment Variables

Create a `.env.test` file in `medusa-backend/` directory (optional - tests can run without it):

```env
# Database Configuration
DATABASE_URL=postgres://postgres@localhost:5433/medusa-backend-test

# Optional: If you need specific test configuration
NODE_ENV=test
```

**Note**: The `medusaIntegrationTestRunner` handles most environment setup automatically. The `.env.test` file is optional.

### 3. Test Configuration

The test suite uses:
- **Jest** for test running
- **@medusajs/test-utils** for integration test utilities
- **In-app test runner** for isolated test environments

---

## 🚀 Running Tests

### Option 1: Using npm scripts (Recommended)

**Integration HTTP Tests**:
```powershell
cd medusa-backend
npm run test:integration:http
```

**Integration Module Tests**:
```powershell
cd medusa-backend
npm run test:integration:modules
```

**Unit Tests**:
```powershell
cd medusa-backend
npm run test:unit
```

### Option 2: Using PowerShell Environment Variables

```powershell
cd medusa-backend
$env:TEST_TYPE="integration:http"
$env:NODE_OPTIONS="--experimental-vm-modules"
npx jest --runInBand --forceExit
```

### Option 3: Using the Test Script

```powershell
cd medusa-backend
.\scripts\run-tests.ps1
```

---

## ✅ Environment Validation

Before running tests, validate your environment:

```powershell
cd medusa-backend
.\scripts\validate-test-environment.ps1
```

This script checks:
- ✅ Node.js version
- ✅ PostgreSQL availability
- ✅ Required npm packages
- ✅ Test configuration files

---

## 🐛 Troubleshooting

### Issue: "Cannot find module" errors
**Solution**: Install dependencies
```powershell
cd medusa-backend
npm install
```

### Issue: Database connection errors
**Solution**: Ensure PostgreSQL is running and accessible
```powershell
# Check PostgreSQL service
Get-Service postgresql*

# Test connection
psql -U postgres -h localhost -p 5433 -c "SELECT version();"
```

### Issue: "experimental-vm-modules" errors
**Solution**: Ensure NODE_OPTIONS is set correctly
```powershell
$env:NODE_OPTIONS="--experimental-vm-modules"
```

### Issue: Tests timeout
**Solution**: Increase timeout in test files or jest config
```typescript
jest.setTimeout(180 * 1000) // 3 minutes
```

---

## 📊 Test Coverage

To generate coverage reports:

```powershell
cd medusa-backend
npm run test:coverage
```

Coverage reports will be generated in `coverage/` directory.

---

## 🔄 CI/CD Integration

For automated testing, see `.github/workflows/tests.yml` for GitHub Actions configuration.

---

## 📝 Notes

- Tests use isolated test databases (created automatically)
- Each test suite runs in its own container
- Tests clean up after themselves
- No manual database setup required for most tests

---

**Last Updated**: December 8, 2025





